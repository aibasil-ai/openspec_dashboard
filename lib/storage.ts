import { del, get, set } from "idb-keyval";
import {
  AppPreferences,
  BackupRecord,
  DeleteLogRecord,
  ProjectSnapshot,
  RecentProject,
} from "@/lib/types";

const PREFS_KEY = "opsx.preferences.v1";
const RECENT_KEY = "opsx.recent.v1";
const BACKUPS_KEY = "opsx.backups.v1";
const DELETE_LOGS_KEY = "opsx.delete.logs.v1";

export const defaultPreferences: AppPreferences = {
  language: "zh-TW",
  theme: "dark",
  staleDays: 14,
  backupRetentionDays: 30,
};

const readJson = <T>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const loadPreferences = (): AppPreferences => ({
  ...defaultPreferences,
  ...readJson<AppPreferences>(PREFS_KEY, defaultPreferences),
});

export const savePreferences = (preferences: AppPreferences) => {
  writeJson(PREFS_KEY, preferences);
};

export const loadRecentProjects = (): RecentProject[] =>
  readJson<RecentProject[]>(RECENT_KEY, []);

export const saveRecentProjects = (projects: RecentProject[]) => {
  writeJson(RECENT_KEY, projects.slice(0, 8));
};

export const putSnapshot = async (snapshot: ProjectSnapshot) => {
  await set(snapshot.id, snapshot);
};

export const getSnapshot = async (id: string): Promise<ProjectSnapshot | undefined> =>
  (await get(id)) as ProjectSnapshot | undefined;

export const deleteSnapshot = async (id: string) => {
  await del(id);
};

export const loadBackups = (): BackupRecord[] => readJson<BackupRecord[]>(BACKUPS_KEY, []);

export const saveBackups = (records: BackupRecord[]) => writeJson(BACKUPS_KEY, records);

export const loadDeleteLogs = (): DeleteLogRecord[] =>
  readJson<DeleteLogRecord[]>(DELETE_LOGS_KEY, []);

export const saveDeleteLogs = (records: DeleteLogRecord[]) =>
  writeJson(DELETE_LOGS_KEY, records);

export const cleanupExpiredBackups = (retentionDays: number): BackupRecord[] => {
  const now = Date.now();
  const maxAge = retentionDays * 24 * 60 * 60 * 1000;
  const backups = loadBackups();
  const logs = loadDeleteLogs();

  const kept = backups.filter((backup) => now - backup.deletedAt <= maxAge);
  if (kept.length !== backups.length) {
    saveBackups(kept);
    saveDeleteLogs(
      logs.filter((entry) => now - entry.deletedAt <= maxAge)
    );
  }
  return kept;
};
