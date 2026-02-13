import { detectBrowserMode } from "@/lib/browser-mode";
import { LoadProgressEvent, ProjectFile, ProjectSnapshot } from "@/lib/types";

const normalize = (path: string) => path.replaceAll("\\", "/");

type ProgressCallback = (event: LoadProgressEvent) => void;

interface ScanState {
  processed: number;
  estimated: number;
  lastPercent: number;
}

const emitProgress = (
  callback: ProgressCallback | undefined,
  event: LoadProgressEvent
) => {
  callback?.(event);
};

const nextScanPercent = (state: ScanState): number => {
  const ratio = state.processed / Math.max(1, state.estimated);
  const computed = 15 + Math.round(ratio * 55);
  const bounded = Math.max(state.lastPercent, Math.min(80, computed));
  state.lastPercent = bounded;
  return bounded;
};

const readDirectoryEntries = async (
  directoryHandle: FileSystemDirectoryHandle,
  scanState: ScanState,
  callback?: ProgressCallback,
  prefix = ""
): Promise<Record<string, ProjectFile>> => {
  const files: Record<string, ProjectFile> = {};

  for await (const [name, entry] of directoryHandle.entries()) {
    scanState.estimated += 1;
    const currentPath = prefix ? `${prefix}/${name}` : name;

    if (entry.kind === "file") {
      const fileHandle = entry as FileSystemFileHandle;
      const file = await fileHandle.getFile();
      files[normalize(currentPath)] = {
        path: normalize(currentPath),
        content: await file.text(),
        lastModified: file.lastModified,
      };
      scanState.processed += 1;
      emitProgress(callback, {
        stage: "scanning",
        progressPercent: nextScanPercent(scanState),
        message: "scan:file",
      });
    }

    if (entry.kind === "directory") {
      const nested = await readDirectoryEntries(
        entry as FileSystemDirectoryHandle,
        scanState,
        callback,
        currentPath
      );
      Object.assign(files, nested);
      scanState.processed += 1;
      emitProgress(callback, {
        stage: "scanning",
        progressPercent: nextScanPercent(scanState),
        message: "scan:dir",
      });
    }
  }

  return files;
};

const readDirectoryStamps = async (
  directoryHandle: FileSystemDirectoryHandle,
  prefix = ""
): Promise<Record<string, Pick<ProjectFile, "path" | "lastModified">>> => {
  const stamps: Record<string, Pick<ProjectFile, "path" | "lastModified">> = {};

  for await (const [name, entry] of directoryHandle.entries()) {
    const currentPath = prefix ? `${prefix}/${name}` : name;

    if (entry.kind === "file") {
      const fileHandle = entry as FileSystemFileHandle;
      const file = await fileHandle.getFile();
      stamps[normalize(currentPath)] = {
        path: normalize(currentPath),
        lastModified: file.lastModified,
      };
      continue;
    }

    if (entry.kind === "directory") {
      const nested = await readDirectoryStamps(
        entry as FileSystemDirectoryHandle,
        currentPath
      );
      Object.assign(stamps, nested);
    }
  }

  return stamps;
};

const ensureOpenSpecStructure = (files: Record<string, ProjectFile>) => {
  const hasOpenSpec = Object.keys(files).some((path) => normalize(path).startsWith("openspec/"));
  if (!hasOpenSpec) {
    throw new Error("Invalid OpenSpec project: missing openspec/");
  }
};

const loadDirectoryFiles = async (
  rootHandle: FileSystemDirectoryHandle,
  onProgress?: ProgressCallback,
  progressMessagePrefix = "open"
): Promise<Record<string, ProjectFile>> => {
  emitProgress(onProgress, {
    stage: "scanning",
    progressPercent: 15,
    message: `${progressMessagePrefix}:scanning`,
  });

  const scanState: ScanState = { processed: 0, estimated: 1, lastPercent: 15 };
  const files = await readDirectoryEntries(rootHandle, scanState, onProgress);

  emitProgress(onProgress, {
    stage: "parsing",
    progressPercent: 85,
    message: `${progressMessagePrefix}:parsing`,
  });

  ensureOpenSpecStructure(files);
  return files;
};

const getDirectoryHandleByPath = async (
  root: FileSystemDirectoryHandle,
  pathSegments: string[]
): Promise<FileSystemDirectoryHandle> => {
  let current = root;
  for (const segment of pathSegments) {
    current = await current.getDirectoryHandle(segment);
  }
  return current;
};

const getFileHandleByPath = async (
  root: FileSystemDirectoryHandle,
  pathSegments: string[],
  create: boolean
): Promise<FileSystemFileHandle> => {
  if (pathSegments.length === 0) {
    throw new Error("File path cannot be empty");
  }

  const fileName = pathSegments[pathSegments.length - 1];
  const directories = pathSegments.slice(0, -1);

  let current = root;
  for (const segment of directories) {
    current = await current.getDirectoryHandle(segment, { create });
  }

  return current.getFileHandle(fileName, { create });
};

export const openDirectoryProject = async (
  onProgress?: ProgressCallback
): Promise<ProjectSnapshot> => {
  if (typeof window.showDirectoryPicker !== "function") {
    throw new Error("showDirectoryPicker is not supported");
  }

  emitProgress(onProgress, {
    stage: "initializing",
    progressPercent: 5,
    message: "open:initializing",
  });

  const rootHandle = await window.showDirectoryPicker({ mode: "readwrite" });

  const permission = await rootHandle.requestPermission?.({ mode: "readwrite" });
  const writable = permission === "granted";

  const files = await loadDirectoryFiles(rootHandle, onProgress, "open");

  return {
    id: `${rootHandle.name}-${Date.now()}`,
    name: rootHandle.name,
    type: "filesystem",
    writable,
    mode: detectBrowserMode(),
    files,
    openedAt: Date.now(),
    rootHandle,
  };
};

export const reloadDirectoryProject = async (
  snapshot: Pick<ProjectSnapshot, "id" | "name" | "type" | "rootHandle">,
  onProgress?: ProgressCallback
): Promise<ProjectSnapshot> => {
  if (!snapshot.rootHandle) {
    throw new Error("Project root handle is missing");
  }

  const permission = await snapshot.rootHandle.queryPermission?.({ mode: "readwrite" });
  const files = await loadDirectoryFiles(snapshot.rootHandle, onProgress, "sync");

  return {
    id: snapshot.id,
    name: snapshot.name,
    type: snapshot.type,
    writable: permission === "granted",
    mode: detectBrowserMode(),
    files,
    openedAt: Date.now(),
    rootHandle: snapshot.rootHandle,
  };
};

export const scanDirectoryFileStamps = async (
  rootHandle: FileSystemDirectoryHandle
): Promise<Record<string, Pick<ProjectFile, "path" | "lastModified">>> =>
  readDirectoryStamps(rootHandle);

export const importReadonlyProject = async (
  fileList: FileList,
  onProgress?: ProgressCallback
): Promise<ProjectSnapshot> => {
  const files: Record<string, ProjectFile> = {};
  const now = Date.now();

  emitProgress(onProgress, {
    stage: "initializing",
    progressPercent: 5,
    message: "import:initializing",
  });

  const list = Array.from(fileList);

  for (let index = 0; index < list.length; index += 1) {
    const file = list[index];
    const relativePath = normalize(file.webkitRelativePath || file.name);
    files[relativePath] = {
      path: relativePath,
      content: await file.text(),
      lastModified: file.lastModified || now,
    };

    const ratio = (index + 1) / Math.max(1, list.length);
    emitProgress(onProgress, {
      stage: "scanning",
      progressPercent: 15 + Math.round(ratio * 65),
      message: "import:scanning",
    });
  }

  emitProgress(onProgress, {
    stage: "parsing",
    progressPercent: 85,
    message: "import:parsing",
  });

  const hasOpenSpec = Object.keys(files).some((path) => normalize(path).startsWith("openspec/"));
  if (!hasOpenSpec) {
    throw new Error("Invalid OpenSpec project: missing openspec/");
  }

  const first = list[0];
  const projectName = first?.webkitRelativePath.split("/")[0] || "imported-project";

  return {
    id: `${projectName}-${Date.now()}`,
    name: projectName,
    type: "fallback",
    writable: false,
    mode: "fallback-readonly",
    files,
    openedAt: now,
  };
};

export const saveTextFile = async (
  rootHandle: FileSystemDirectoryHandle,
  path: string,
  content: string
) => {
  const segments = normalize(path).split("/");
  const fileHandle = await getFileHandleByPath(rootHandle, segments, true);
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

export const deleteChangeDirectory = async (
  rootHandle: FileSystemDirectoryHandle,
  category: "in-progress" | "archived",
  name: string
) => {
  const baseSegments =
    category === "archived" ? ["openspec", "changes", "archive"] : ["openspec", "changes"];

  const parent = await getDirectoryHandleByPath(rootHandle, baseSegments);
  await parent.removeEntry(name, { recursive: true });
};
