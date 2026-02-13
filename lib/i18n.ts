import { BrowserMode, LoadStage, MainTab } from "@/lib/types";

type Lang = "zh-TW" | "en";

type Dict = Record<string, string>;

const ZH: Dict = {
  appTitle: "OpenSpec 專案追蹤面板",
  openProject: "開啟本機專案",
  importReadonly: "匯入資料夾（唯讀）",
  recentProjects: "最近開啟專案",
  noRecentProjects: "尚無最近專案",
  currentProject: "目前開啟專案",
  noActiveProject: "尚未開啟專案",
  openTime: "開啟時間",
  delete: "刪除",
  overview: "總覽",
  inProgress: "進行中",
  specs: "規格",
  archived: "已封存",
  stalled: "停滯中",
  configEditor: "config.yaml 編輯",
  save: "儲存",
  saving: "儲存中...",
  validationErrors: "驗證錯誤",
  lintHints: "Lint 提示",
  noSelection: "請先從清單選擇一個項目。",
  proposal: "提案",
  design: "設計",
  tasks: "任務",
  language: "語言",
  theme: "主題",
  dark: "黑底白字",
  light: "白底黑字",
  staleDays: "停滯天數門檻",
  backupRetentionDays: "備份保留天數",
  mode: "模式",
  modeChrome: "Chrome 完整讀寫",
  modeEdge: "Edge 完整讀寫",
  modeFallback: "Safari/Firefox fallback（匯入與唯讀）",
  readonlyHint: "目前為唯讀模式，部分功能（儲存/刪除）不可用。",
  configSaved: "config.yaml 已儲存",
  selectItem: "點擊上方項目可在此顯示內容",
  confirmDelete: "確定要刪除這個項目嗎？",
  cannotDeleteReadonly: "唯讀模式無法刪除",
  openFailed: "開啟資料夾失敗",
  invalidProject: "此資料夾缺少 openspec/ 結構",
  loadProgress: "載入進度",
  syncStatus: "即時同步",
  syncIdle: "待命中",
  syncSyncing: "同步中",
  syncSuccess: "已同步",
  syncError: "同步失敗",
  syncWatching: "監控中：偵測到檔案更新會自動同步。",
  syncFallbackInfo: "唯讀匯入模式：如本機檔案更新，請重新匯入以同步。",
  syncUpdateDetected: "偵測到檔案更新，正在同步...",
  syncUpdated: "檔案更新已同步。",
  syncFailedHint: "自動同步失敗，已保留最近一次成功資料。",
  lastSyncedAt: "最近同步時間",
  stageIdle: "待命中",
  stageInitializing: "初始化中",
  stageScanning: "掃描檔案中",
  stageParsing: "解析資料中",
  stageReady: "載入完成",
  stageError: "載入失敗",
};

const EN: Dict = {
  appTitle: "OpenSpec Project Progress Dashboard",
  openProject: "Open Local Project",
  importReadonly: "Import Folder (Read-only)",
  recentProjects: "Recent Projects",
  noRecentProjects: "No recent projects",
  currentProject: "Current Project",
  noActiveProject: "No active project",
  openTime: "Opened At",
  delete: "Delete",
  overview: "Overview",
  inProgress: "In Progress",
  specs: "Specs",
  archived: "Archived",
  stalled: "Stalled",
  configEditor: "config.yaml Editor",
  save: "Save",
  saving: "Saving...",
  validationErrors: "Validation Errors",
  lintHints: "Lint Hints",
  noSelection: "Select an item from the list first.",
  proposal: "Proposal",
  design: "Design",
  tasks: "Tasks",
  language: "Language",
  theme: "Theme",
  dark: "Dark",
  light: "Light",
  staleDays: "Stale Days Threshold",
  backupRetentionDays: "Backup Retention Days",
  mode: "Mode",
  modeChrome: "Chrome Full Read/Write",
  modeEdge: "Edge Full Read/Write",
  modeFallback: "Safari/Firefox Fallback (Import + Read-only)",
  readonlyHint: "Read-only mode: save/delete actions are disabled.",
  configSaved: "config.yaml saved",
  selectItem: "Click an item above to show content here",
  confirmDelete: "Delete this item?",
  cannotDeleteReadonly: "Delete is disabled in read-only mode",
  openFailed: "Failed to open folder",
  invalidProject: "This folder is missing openspec/ structure",
  loadProgress: "Load Progress",
  syncStatus: "Live Sync",
  syncIdle: "Idle",
  syncSyncing: "Syncing",
  syncSuccess: "Synced",
  syncError: "Sync Failed",
  syncWatching: "Watching files: changes sync automatically.",
  syncFallbackInfo: "Read-only import mode: re-import to sync external file changes.",
  syncUpdateDetected: "File updates detected, syncing...",
  syncUpdated: "File changes synced.",
  syncFailedHint: "Auto-sync failed. Keeping last successful data.",
  lastSyncedAt: "Last Synced At",
  stageIdle: "Idle",
  stageInitializing: "Initializing",
  stageScanning: "Scanning files",
  stageParsing: "Parsing data",
  stageReady: "Ready",
  stageError: "Failed",
};

const TABLE: Record<Lang, Dict> = {
  "zh-TW": ZH,
  en: EN,
};

export const t = (lang: Lang, key: string): string => TABLE[lang][key] ?? key;

export const tabLabel = (lang: Lang, tab: MainTab): string => {
  if (tab === "in-progress") {
    return t(lang, "inProgress");
  }
  return t(lang, tab);
};

export const modeLabel = (lang: Lang, mode: BrowserMode): string => {
  if (mode === "chrome-full") {
    return t(lang, "modeChrome");
  }
  if (mode === "edge-full") {
    return t(lang, "modeEdge");
  }
  return t(lang, "modeFallback");
};

export const stageLabel = (lang: Lang, stage: LoadStage): string => {
  if (stage === "initializing") {
    return t(lang, "stageInitializing");
  }
  if (stage === "scanning") {
    return t(lang, "stageScanning");
  }
  if (stage === "parsing") {
    return t(lang, "stageParsing");
  }
  if (stage === "ready") {
    return t(lang, "stageReady");
  }
  if (stage === "error") {
    return t(lang, "stageError");
  }
  return t(lang, "stageIdle");
};
