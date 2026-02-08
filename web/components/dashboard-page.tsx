"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import YAML from "yaml";
import MarkdownView from "@/components/markdown-view";
import { detectBrowserMode, isFileSystemAccessSupported } from "@/lib/browser-mode";
import { validateConfigYaml } from "@/lib/config-validation";
import {
  deleteChangeDirectory,
  importReadonlyProject,
  openDirectoryProject,
  reloadDirectoryProject,
  scanDirectoryFileStamps,
  saveTextFile,
} from "@/lib/fs-access";
import { modeLabel, stageLabel, t, tabLabel } from "@/lib/i18n";
import { parseOpenSpecProject } from "@/lib/openspec-parser";
import {
  createOpenSpecFingerprint,
  debounceDelay,
  hasOpenSpecFingerprintChanged,
  shouldTriggerRefresh,
} from "@/lib/realtime-refresh";
import {
  cleanupExpiredBackups,
  defaultPreferences,
  getSnapshot,
  loadBackups,
  loadDeleteLogs,
  loadPreferences,
  loadRecentProjects,
  putSnapshot,
  saveBackups,
  saveDeleteLogs,
  savePreferences,
  saveRecentProjects,
} from "@/lib/storage";
import {
  AppPreferences,
  BrowserMode,
  ChangeItem,
  LoadProgressEvent,
  MainTab,
  ParsedProject,
  ProjectFile,
  ProjectLoadState,
  ProjectSnapshot,
  RecentProject,
  SpecItem,
} from "@/lib/types";

const TABS: MainTab[] = ["overview", "in-progress", "specs", "archived"];

const normalize = (path: string) => path.replaceAll("\\", "/");

const toRecent = (snapshot: ProjectSnapshot): RecentProject => ({
  id: snapshot.id,
  name: snapshot.name,
  type: snapshot.type,
  openedAt: snapshot.openedAt,
});

const upsertRecent = (current: RecentProject[], snapshot: ProjectSnapshot): RecentProject[] => {
  const filtered = current.filter((item) => item.id !== snapshot.id);
  return [toRecent(snapshot), ...filtered].sort((a, b) => b.openedAt - a.openedAt).slice(0, 8);
};

const getConfigPath = (snapshot: ProjectSnapshot): string => {
  const configPath = Object.keys(snapshot.files).find(
    (path) => normalize(path) === "openspec/config.yaml"
  );
  return configPath ?? "openspec/config.yaml";
};

const applyTheme = (theme: AppPreferences["theme"]) => {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.dataset.theme = theme;
};

const extractConfigNumbers = (configText: string) => {
  try {
    const parsed = YAML.parse(configText) as Record<string, unknown>;
    return {
      staleDays: typeof parsed.staleDays === "number" ? parsed.staleDays : null,
      backupRetentionDays:
        typeof parsed.backupRetentionDays === "number" ? parsed.backupRetentionDays : null,
    };
  } catch {
    return { staleDays: null, backupRetentionDays: null };
  }
};

const INITIAL_LOAD_STATE: ProjectLoadState = {
  stage: "idle",
  progressPercent: 0,
  message: "",
};

type SyncState = {
  status: "idle" | "syncing" | "success" | "error";
  message: string;
  error?: string;
  lastSyncedAt: number | null;
};

const INITIAL_SYNC_STATE: SyncState = {
  status: "idle",
  message: "",
  lastSyncedAt: null,
};

const POLL_INTERVAL_MS = 1800;
const REFRESH_DEBOUNCE_MS = 800;

const applyProgressEvent = (
  current: ProjectLoadState,
  event: LoadProgressEvent
): ProjectLoadState => {
  const nextPercent = Math.max(current.progressPercent, event.progressPercent);
  return {
    stage: event.stage,
    progressPercent: Math.min(100, Math.max(0, nextPercent)),
    message: event.message,
  };
};

const formatOpenedAt = (timestamp: number, lang: AppPreferences["language"]): string => {
  if (!Number.isFinite(timestamp)) {
    return "-";
  }

  return new Date(timestamp).toLocaleString(lang === "zh-TW" ? "zh-TW" : "en-US", {
    hour12: false,
  });
};

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const importRef = useRef<HTMLInputElement>(null);
  const resetLoadRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapshotRef = useRef<ProjectSnapshot | null>(null);
  const fingerprintRef = useRef("");
  const lastTriggeredAtRef = useRef(0);
  const isRefreshingRef = useRef(false);
  const isScanningRef = useRef(false);

  const [prefs, setPrefs] = useState<AppPreferences>(defaultPreferences);
  const [mode, setMode] = useState<BrowserMode>("fallback-readonly");
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [snapshot, setSnapshot] = useState<ProjectSnapshot | null>(null);
  const [parsed, setParsed] = useState<ParsedProject | null>(null);
  const [configDraft, setConfigDraft] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [loadState, setLoadState] = useState<ProjectLoadState>(INITIAL_LOAD_STATE);
  const [syncState, setSyncState] = useState<SyncState>(INITIAL_SYNC_STATE);

  const [selectedSpec, setSelectedSpec] = useState<string>("");
  const [selectedInProgress, setSelectedInProgress] = useState<string>("");
  const [selectedArchived, setSelectedArchived] = useState<string>("");
  const [inProgressDetailTab, setInProgressDetailTab] = useState<"tasks" | "proposal">("tasks");
  const [archivedDetailTab, setArchivedDetailTab] = useState<
    "proposal" | "design" | "tasks" | "specs"
  >("proposal");

  useEffect(() => {
    const nextMode = detectBrowserMode();
    setMode(nextMode);
    const nextPrefs = loadPreferences();
    setPrefs(nextPrefs);
    applyTheme(nextPrefs.theme);
    setRecentProjects(loadRecentProjects());
    cleanupExpiredBackups(nextPrefs.backupRetentionDays);
  }, []);

  useEffect(() => {
    return () => {
      if (resetLoadRef.current) {
        clearTimeout(resetLoadRef.current);
      }
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    snapshotRef.current = snapshot;
    fingerprintRef.current = snapshot ? createOpenSpecFingerprint(snapshot.files) : "";
  }, [snapshot]);

  useEffect(() => {
    savePreferences(prefs);
    applyTheme(prefs.theme);
    cleanupExpiredBackups(prefs.backupRetentionDays);
  }, [prefs]);

  useEffect(() => {
    if (!snapshot) {
      setParsed(null);
      setConfigDraft("");
      return;
    }

    const nextParsed = parseOpenSpecProject(snapshot.files, prefs.staleDays);
    setParsed(nextParsed);
    setConfigDraft(nextParsed.configContent);

    setSelectedSpec((current) => {
      if (current && nextParsed.specs.some((item) => item.name === current)) {
        return current;
      }
      return nextParsed.specs[0]?.name ?? "";
    });

    setSelectedInProgress((current) => {
      if (current && nextParsed.inProgress.some((item) => item.name === current)) {
        return current;
      }
      return nextParsed.inProgress[0]?.name ?? "";
    });

    setSelectedArchived((current) => {
      if (current && nextParsed.archived.some((item) => item.name === current)) {
        return current;
      }
      return nextParsed.archived[0]?.name ?? "";
    });
  }, [snapshot, prefs.staleDays]);

  const lang = prefs.language;

  const activeTab = useMemo<MainTab>(() => {
    const value = searchParams.get("tab") as MainTab | null;
    return value && TABS.includes(value) ? value : "overview";
  }, [searchParams]);

  const setTab = (tab: MainTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/?${params.toString()}`);
  };

  const startLoad = (message: string) => {
    if (resetLoadRef.current) {
      clearTimeout(resetLoadRef.current);
      resetLoadRef.current = null;
    }
    setLoadState({ stage: "initializing", progressPercent: 5, message });
  };

  const completeLoad = (message: string) => {
    setLoadState({ stage: "ready", progressPercent: 100, message });
    resetLoadRef.current = setTimeout(() => {
      setLoadState(INITIAL_LOAD_STATE);
    }, 1500);
  };

  const failLoad = (errorMessage: string) => {
    setLoadState({
      stage: "error",
      progressPercent: 100,
      message: errorMessage,
      error: errorMessage,
    });
  };

  const onProgress = (event: LoadProgressEvent) => {
    setLoadState((current) => applyProgressEvent(current, event));
  };

  const updateSnapshot = useCallback(async (nextSnapshot: ProjectSnapshot) => {
    setSnapshot(nextSnapshot);
    await putSnapshot(nextSnapshot);

    setRecentProjects((current) => {
      const next = upsertRecent(current, nextSnapshot);
      saveRecentProjects(next);
      return next;
    });
  }, []);

  const setSyncIdle = useCallback(
    (nextSnapshot: ProjectSnapshot, lastSyncedAt: number | null = null) => {
      setSyncState({
        status: "idle",
        message: nextSnapshot.rootHandle ? t(lang, "syncWatching") : t(lang, "syncFallbackInfo"),
        error: undefined,
        lastSyncedAt,
      });
    },
    [lang]
  );

  const refreshProjectData = useCallback(async () => {
    const currentSnapshot = snapshotRef.current;
    if (!currentSnapshot?.rootHandle || isRefreshingRef.current) {
      return;
    }

    isRefreshingRef.current = true;
    setSyncState((current) => ({
      status: "syncing",
      message: t(lang, "syncUpdateDetected"),
      error: undefined,
      lastSyncedAt: current.lastSyncedAt,
    }));

    try {
      const reloaded = await reloadDirectoryProject(currentSnapshot);
      await updateSnapshot(reloaded);
      fingerprintRef.current = createOpenSpecFingerprint(reloaded.files);
      setSyncState({
        status: "success",
        message: t(lang, "syncUpdated"),
        error: undefined,
        lastSyncedAt: Date.now(),
      });
    } catch (error) {
      setSyncState((current) => ({
        status: "error",
        message: t(lang, "syncFailedHint"),
        error: error instanceof Error ? error.message : "unknown",
        lastSyncedAt: current.lastSyncedAt,
      }));
    } finally {
      isRefreshingRef.current = false;
    }
  }, [lang, updateSnapshot]);

  const openProject = async () => {
    startLoad("open:start");

    try {
      if (!isFileSystemAccessSupported()) {
        failLoad(`${t(lang, "openFailed")}: showDirectoryPicker unsupported`);
        return;
      }

      const next = await openDirectoryProject(onProgress);
      if (
        !next.files["openspec/config.yaml"] &&
        !Object.keys(next.files).some((file) => file.startsWith("openspec/"))
      ) {
        failLoad(t(lang, "invalidProject"));
        return;
      }

      setLoadState((current) =>
        applyProgressEvent(current, {
          stage: "parsing",
          progressPercent: 92,
          message: "open:finalize",
        })
      );

      await updateSnapshot(next);
      setSyncIdle(next, Date.now());
      completeLoad("open:ready");
    } catch (error) {
      failLoad(`${t(lang, "openFailed")}: ${error instanceof Error ? error.message : "unknown"}`);
    }
  };

  const importProject = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList || fileList.length === 0) {
      return;
    }

    startLoad("import:start");

    try {
      const next = await importReadonlyProject(fileList, onProgress);
      await updateSnapshot(next);
      setSyncIdle(next, Date.now());
      completeLoad("import:ready");
    } catch (error) {
      failLoad(`${t(lang, "openFailed")}: ${error instanceof Error ? error.message : "unknown"}`);
    } finally {
      event.target.value = "";
    }
  };

  const loadRecentProject = async (recent: RecentProject) => {
    startLoad("recent:start");

    const loaded = await getSnapshot(recent.id);
    if (!loaded) {
      failLoad(`${t(lang, "openFailed")}: snapshot not found`);
      return;
    }

    setLoadState((current) =>
      applyProgressEvent(current, {
        stage: "parsing",
        progressPercent: 85,
        message: "recent:parsing",
      })
    );

    await updateSnapshot({ ...loaded, openedAt: Date.now() });
    setSyncIdle({ ...loaded, openedAt: Date.now() }, Date.now());
    completeLoad("recent:ready");
  };

  const handleConfigSave = async () => {
    if (!snapshot || !parsed) {
      return;
    }

    const validation = validateConfigYaml(configDraft);
    if (!validation.valid) {
      return;
    }

    if (!snapshot.writable || !snapshot.rootHandle) {
      alert(t(lang, "readonlyHint"));
      return;
    }

    const configPath = getConfigPath(snapshot);

    await saveTextFile(snapshot.rootHandle, configPath, configDraft);

    const updatedFiles: Record<string, ProjectFile> = {
      ...snapshot.files,
      [normalize(configPath)]: {
        path: normalize(configPath),
        content: configDraft,
        lastModified: Date.now(),
      },
    };

    const nextSnapshot: ProjectSnapshot = {
      ...snapshot,
      files: updatedFiles,
      openedAt: Date.now(),
    };

    const extracted = extractConfigNumbers(configDraft);
    setPrefs((current) => ({
      ...current,
      staleDays: extracted.staleDays ?? current.staleDays,
      backupRetentionDays: extracted.backupRetentionDays ?? current.backupRetentionDays,
    }));

    await updateSnapshot(nextSnapshot);
    setSyncIdle(nextSnapshot, Date.now());
    setSaveMessage(t(lang, "configSaved"));
    setTimeout(() => setSaveMessage(""), 1800);
  };

  const deleteChange = async (category: "in-progress" | "archived", name: string) => {
    if (!snapshot) {
      return;
    }
    if (!snapshot.writable || !snapshot.rootHandle) {
      alert(t(lang, "cannotDeleteReadonly"));
      return;
    }

    const confirmed = window.confirm(t(lang, "confirmDelete"));
    if (!confirmed) {
      return;
    }

    const basePath =
      category === "archived" ? `openspec/changes/archive/${name}/` : `openspec/changes/${name}/`;

    const files = Object.values(snapshot.files).filter((file) =>
      normalize(file.path).startsWith(basePath)
    );

    const backupRecord = {
      id: `${name}-${Date.now()}`,
      path: basePath,
      deletedAt: Date.now(),
      files,
    };

    const deleteLog = {
      id: `log-${Date.now()}`,
      path: basePath,
      deletedAt: Date.now(),
      projectId: snapshot.id,
    };

    const backups = loadBackups();
    const logs = loadDeleteLogs();
    saveBackups([backupRecord, ...backups]);
    saveDeleteLogs([deleteLog, ...logs]);
    cleanupExpiredBackups(prefs.backupRetentionDays);

    await deleteChangeDirectory(snapshot.rootHandle, category, name);

    const nextFiles: Record<string, ProjectFile> = { ...snapshot.files };
    for (const file of files) {
      delete nextFiles[file.path];
    }

    const nextSnapshot = {
      ...snapshot,
      files: nextFiles,
      openedAt: Date.now(),
    };

    await updateSnapshot(nextSnapshot);
    setSyncIdle(nextSnapshot, Date.now());
  };

  useEffect(() => {
    if (!snapshot?.rootHandle) {
      return;
    }

    let canceled = false;

    const triggerRefresh = (fingerprint: string, now: number) => {
      lastTriggeredAtRef.current = now;
      fingerprintRef.current = fingerprint;
      void refreshProjectData();
    };

    const pollChanges = async () => {
      if (canceled || isRefreshingRef.current || isScanningRef.current) {
        return;
      }

      isScanningRef.current = true;

      try {
        const stamps = await scanDirectoryFileStamps(snapshot.rootHandle!);
        const nextFingerprint = createOpenSpecFingerprint(stamps);
        const previousFingerprint = fingerprintRef.current;

        if (!hasOpenSpecFingerprintChanged(previousFingerprint, nextFingerprint)) {
          return;
        }

        const now = Date.now();
        if (shouldTriggerRefresh(lastTriggeredAtRef.current, now, REFRESH_DEBOUNCE_MS)) {
          triggerRefresh(nextFingerprint, now);
          return;
        }

        const delay = debounceDelay(lastTriggeredAtRef.current, now, REFRESH_DEBOUNCE_MS);
        if (refreshTimerRef.current) {
          clearTimeout(refreshTimerRef.current);
        }
        refreshTimerRef.current = setTimeout(() => {
          if (canceled) {
            return;
          }
          triggerRefresh(nextFingerprint, Date.now());
        }, delay);
      } catch (error) {
        if (!canceled) {
          setSyncState((current) => ({
            status: "error",
            message: t(lang, "syncFailedHint"),
            error: error instanceof Error ? error.message : "unknown",
            lastSyncedAt: current.lastSyncedAt,
          }));
        }
      } finally {
        isScanningRef.current = false;
      }
    };

    const intervalId = setInterval(() => {
      void pollChanges();
    }, POLL_INTERVAL_MS);

    return () => {
      canceled = true;
      clearInterval(intervalId);
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
    };
  }, [lang, refreshProjectData, snapshot?.id, snapshot?.rootHandle]);

  const selectedSpecItem: SpecItem | undefined = parsed?.specs.find((item) => item.name === selectedSpec);
  const selectedInProgressItem: ChangeItem | undefined = parsed?.inProgress.find(
    (item) => item.name === selectedInProgress
  );
  const selectedArchivedItem: ChangeItem | undefined = parsed?.archived.find(
    (item) => item.name === selectedArchived
  );

  const configValidation = validateConfigYaml(configDraft);

  const syncStatusLabel =
    syncState.status === "syncing"
      ? t(lang, "syncSyncing")
      : syncState.status === "success"
        ? t(lang, "syncSuccess")
        : syncState.status === "error"
          ? t(lang, "syncError")
          : t(lang, "syncIdle");

  const syncMessage =
    syncState.message ||
    (!snapshot
      ? t(lang, "noActiveProject")
      : snapshot.rootHandle
        ? t(lang, "syncWatching")
        : t(lang, "syncFallbackInfo"));

  return (
    <div className="shell">
      <header className="header">
        <h1>{t(lang, "appTitle")}</h1>

        <div className="toolbar">
          <button type="button" onClick={openProject}>
            {t(lang, "openProject")}
          </button>

          <button type="button" onClick={() => importRef.current?.click()}>
            {t(lang, "importReadonly")}
          </button>

          <input
            ref={importRef}
            type="file"
            multiple
            className="hidden"
            onChange={importProject}
            // @ts-expect-error webkitdirectory is browser-specific
            webkitdirectory=""
          />

          <label>
            {t(lang, "language")}
            <select
              value={lang}
              onChange={(event) =>
                setPrefs((current) => ({
                  ...current,
                  language: event.target.value as AppPreferences["language"],
                }))
              }
            >
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
            </select>
          </label>

          <label>
            {t(lang, "theme")}
            <select
              value={prefs.theme}
              onChange={(event) =>
                setPrefs((current) => ({
                  ...current,
                  theme: event.target.value as AppPreferences["theme"],
                }))
              }
            >
              <option value="dark">{t(lang, "dark")}</option>
              <option value="light">{t(lang, "light")}</option>
            </select>
          </label>

          <span className="mode-badge">
            {t(lang, "mode")}: {modeLabel(lang, mode)}
          </span>
        </div>
      </header>

      <section className="active-project" data-testid="active-project-banner">
        <div>
          <strong>{t(lang, "currentProject")}</strong>
          <p>{snapshot ? snapshot.name : t(lang, "noActiveProject")}</p>
        </div>
        {snapshot && (
          <div className="active-project-meta">
            <span>{modeLabel(lang, snapshot.mode)}</span>
            <span>
              {t(lang, "openTime")}: {formatOpenedAt(snapshot.openedAt, lang)}
            </span>
          </div>
        )}
      </section>

      {loadState.stage !== "idle" && (
        <section className={`load-progress ${loadState.stage}`} data-testid="load-progress">
          <div className="load-progress-header">
            <strong>{t(lang, "loadProgress")}</strong>
            <span>
              {stageLabel(lang, loadState.stage)} · {loadState.progressPercent}%
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, loadState.progressPercent))}%` }}
            />
          </div>
          {loadState.error && <p className="progress-error">{loadState.error}</p>}
        </section>
      )}

      <section className="recent">
        <strong>{t(lang, "recentProjects")}</strong>
        <div className="recent-list">
          {recentProjects.length === 0 ? (
            <span className="muted">{t(lang, "noRecentProjects")}</span>
          ) : (
            recentProjects.map((project) => (
              <button
                type="button"
                key={project.id}
                className="recent-item"
                onClick={() => loadRecentProject(project)}
              >
                {project.name}
              </button>
            ))
          )}
        </div>
      </section>

      <section className="sync-status" data-testid="sync-status">
        <div className="sync-status-head">
          <strong>{t(lang, "syncStatus")}</strong>
          <span className={`sync-chip ${syncState.status}`}>{syncStatusLabel}</span>
        </div>
        <p className={syncState.status === "error" ? "sync-error" : "sync-message"}>{syncMessage}</p>
        <p className="muted">
          {t(lang, "lastSyncedAt")}: {formatOpenedAt(syncState.lastSyncedAt ?? Number.NaN, lang)}
        </p>
        {syncState.error && <p className="sync-error">{syncState.error}</p>}
      </section>

      <nav className="tabs" aria-label="main tabs">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setTab(tab)}
          >
            {tabLabel(lang, tab)}
          </button>
        ))}
      </nav>

      {!snapshot || !parsed ? (
        <div className="empty">Open or import an OpenSpec project to start.</div>
      ) : (
        <main className="content">
          {mode === "fallback-readonly" && <p className="warning">{t(lang, "readonlyHint")}</p>}

          {activeTab === "overview" && (
            <section className="panel">
              <div className="cards-grid">
                <button className="stat-card" onClick={() => setTab("in-progress")}>
                  <h3>{t(lang, "inProgress")}</h3>
                  <p>{parsed.stats.inProgress}</p>
                </button>
                <button className="stat-card" onClick={() => setTab("specs")}>
                  <h3>{t(lang, "specs")}</h3>
                  <p>{parsed.stats.specs}</p>
                </button>
                <button className="stat-card" onClick={() => setTab("archived")}>
                  <h3>{t(lang, "archived")}</h3>
                  <p>{parsed.stats.archived}</p>
                </button>
                <div className="stat-card">
                  <h3>{t(lang, "stalled")}</h3>
                  <p>{parsed.stats.stalled}</p>
                </div>
              </div>

              <div className="controls-row">
                <label>
                  {t(lang, "staleDays")}
                  <input
                    type="number"
                    min={1}
                    value={prefs.staleDays}
                    onChange={(event) =>
                      setPrefs((current) => ({
                        ...current,
                        staleDays: Math.max(1, Number.parseInt(event.target.value, 10) || 1),
                      }))
                    }
                  />
                </label>

                <label>
                  {t(lang, "backupRetentionDays")}
                  <input
                    type="number"
                    min={1}
                    value={prefs.backupRetentionDays}
                    onChange={(event) =>
                      setPrefs((current) => ({
                        ...current,
                        backupRetentionDays: Math.max(
                          1,
                          Number.parseInt(event.target.value, 10) || 1
                        ),
                      }))
                    }
                  />
                </label>
              </div>

              <h3>{t(lang, "configEditor")}</h3>
              <div className="editor-grid">
                <textarea
                  value={configDraft}
                  onChange={(event) => setConfigDraft(event.target.value)}
                  spellCheck={false}
                />
                <div className="preview">
                  <MarkdownView content={`\`\`\`yaml\n${configDraft}\n\`\`\``} />
                </div>
              </div>

              <div className="actions-row">
                <button
                  type="button"
                  onClick={handleConfigSave}
                  disabled={!configValidation.valid || !snapshot.writable}
                >
                  {t(lang, "save")}
                </button>
                {saveMessage && <span className="ok">{saveMessage}</span>}
              </div>

              {configValidation.errors.length > 0 && (
                <div className="validation">
                  <strong>{t(lang, "validationErrors")}</strong>
                  <ul>
                    {configValidation.errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {configValidation.lintHints.length > 0 && (
                <div className="validation">
                  <strong>{t(lang, "lintHints")}</strong>
                  <ul>
                    {configValidation.lintHints.map((hint) => (
                      <li key={hint}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {activeTab === "specs" && (
            <section className="panel two-column">
              <div>
                <h3>
                  {t(lang, "specs")} ({parsed.specs.length})
                </h3>
                <ul className="list">
                  {parsed.specs.map((item) => (
                    <li key={item.path}>
                      <button
                        className={selectedSpec === item.name ? "list-button active" : "list-button"}
                        onClick={() => setSelectedSpec(item.name)}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail">
                {selectedSpecItem ? (
                  <MarkdownView content={selectedSpecItem.content} />
                ) : (
                  <p className="muted">{t(lang, "selectItem")}</p>
                )}
              </div>
            </section>
          )}

          {activeTab === "in-progress" && (
            <section className="panel two-column">
              <div>
                <h3>
                  {t(lang, "inProgress")} ({parsed.inProgress.length})
                </h3>
                <ul className="list">
                  {parsed.inProgress.map((item) => (
                    <li key={item.name} className="list-row">
                      <button
                        className={
                          selectedInProgress === item.name ? "list-button active" : "list-button"
                        }
                        onClick={() => setSelectedInProgress(item.name)}
                      >
                        {item.name}
                      </button>
                      <button
                        className="danger"
                        disabled={!snapshot.writable}
                        onClick={() => deleteChange("in-progress", item.name)}
                      >
                        {t(lang, "delete")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail">
                {selectedInProgressItem ? (
                  <>
                    <div className="sub-tabs">
                      <button
                        className={inProgressDetailTab === "tasks" ? "tab active" : "tab"}
                        onClick={() => setInProgressDetailTab("tasks")}
                      >
                        {t(lang, "tasks")} ({selectedInProgressItem.taskSummary.done}/
                        {selectedInProgressItem.taskSummary.total})
                      </button>
                      <button
                        className={inProgressDetailTab === "proposal" ? "tab active" : "tab"}
                        onClick={() => setInProgressDetailTab("proposal")}
                      >
                        {t(lang, "proposal")}
                      </button>
                    </div>

                    <MarkdownView
                      content={
                        inProgressDetailTab === "tasks"
                          ? selectedInProgressItem.tasks ?? ""
                          : selectedInProgressItem.proposal ?? ""
                      }
                    />
                  </>
                ) : (
                  <p className="muted">{t(lang, "selectItem")}</p>
                )}
              </div>
            </section>
          )}

          {activeTab === "archived" && (
            <section className="panel two-column">
              <div>
                <h3>
                  {t(lang, "archived")} ({parsed.archived.length})
                </h3>
                <ul className="list">
                  {parsed.archived.map((item) => (
                    <li key={item.name} className="list-row">
                      <button
                        className={selectedArchived === item.name ? "list-button active" : "list-button"}
                        onClick={() => setSelectedArchived(item.name)}
                      >
                        {item.name}
                      </button>
                      <button
                        className="danger"
                        disabled={!snapshot.writable}
                        onClick={() => deleteChange("archived", item.name)}
                      >
                        {t(lang, "delete")}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail">
                {selectedArchivedItem ? (
                  <>
                    <div className="sub-tabs">
                      {(["proposal", "design", "tasks", "specs"] as const).map((tab) => (
                        <button
                          key={tab}
                          className={archivedDetailTab === tab ? "tab active" : "tab"}
                          onClick={() => setArchivedDetailTab(tab)}
                        >
                          {tab === "proposal" && t(lang, "proposal")}
                          {tab === "design" && t(lang, "design")}
                          {tab === "tasks" && (
                            <>
                              {t(lang, "tasks")} ({selectedArchivedItem.taskSummary.done}/
                              {selectedArchivedItem.taskSummary.total})
                            </>
                          )}
                          {tab === "specs" && (
                            <>
                              {t(lang, "specs")} (+{selectedArchivedItem.specSummary.added}/~
                              {selectedArchivedItem.specSummary.modified}/-
                              {selectedArchivedItem.specSummary.removed})
                            </>
                          )}
                        </button>
                      ))}
                    </div>

                    <MarkdownView
                      content={
                        archivedDetailTab === "proposal"
                          ? selectedArchivedItem.proposal ?? ""
                          : archivedDetailTab === "design"
                            ? selectedArchivedItem.design ?? ""
                            : archivedDetailTab === "tasks"
                              ? selectedArchivedItem.tasks ?? ""
                              : selectedArchivedItem.specs ?? ""
                      }
                    />
                  </>
                ) : (
                  <p className="muted">{t(lang, "selectItem")}</p>
                )}
              </div>
            </section>
          )}
        </main>
      )}
    </div>
  );
}
