export type MainTab = "overview" | "in-progress" | "specs" | "archived";
export type DetailTab = "proposal" | "design" | "tasks" | "specs";

export type BrowserMode = "chrome-full" | "edge-full" | "fallback-readonly";

export type LoadStage =
  | "idle"
  | "initializing"
  | "scanning"
  | "parsing"
  | "ready"
  | "error";

export interface LoadProgressEvent {
  stage: LoadStage;
  progressPercent: number;
  message: string;
}

export interface ProjectLoadState extends LoadProgressEvent {
  error?: string;
}

export interface AppPreferences {
  language: "zh-TW" | "en";
  theme: "light" | "dark";
  staleDays: number;
  backupRetentionDays: number;
}

export interface ProjectFile {
  path: string;
  content: string;
  lastModified: number;
}

export interface RecentProject {
  id: string;
  name: string;
  type: "filesystem" | "fallback";
  openedAt: number;
}

export interface TaskSummary {
  done: number;
  total: number;
}

export interface SpecSummary {
  added: number;
  modified: number;
  removed: number;
}

export interface ChangeItem {
  name: string;
  category: "in-progress" | "archived";
  proposal?: string;
  design?: string;
  tasks?: string;
  specs?: string;
  updatedAt: number;
  taskSummary: TaskSummary;
  specSummary: SpecSummary;
}

export interface SpecItem {
  name: string;
  path: string;
  content: string;
  updatedAt: number;
}

export interface OverviewStats {
  inProgress: number;
  specs: number;
  archived: number;
  stalled: number;
}

export interface ParsedProject {
  configPath: string | null;
  configContent: string;
  configUpdatedAt: number;
  inProgress: ChangeItem[];
  archived: ChangeItem[];
  specs: SpecItem[];
  stats: OverviewStats;
}

export interface ProjectSnapshot {
  id: string;
  name: string;
  type: "filesystem" | "fallback";
  writable: boolean;
  mode: BrowserMode;
  files: Record<string, ProjectFile>;
  openedAt: number;
  rootHandle?: FileSystemDirectoryHandle;
}

export interface BackupRecord {
  id: string;
  path: string;
  deletedAt: number;
  files: ProjectFile[];
}

export interface DeleteLogRecord {
  id: string;
  path: string;
  deletedAt: number;
  projectId: string;
}
