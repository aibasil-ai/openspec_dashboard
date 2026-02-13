interface Window {
  showDirectoryPicker?: (options?: {
    id?: string;
    mode?: "read" | "readwrite";
    startIn?:
      | "desktop"
      | "documents"
      | "downloads"
      | "music"
      | "pictures"
      | "videos";
  }) => Promise<FileSystemDirectoryHandle>;
}

type FilePermissionStatus = "granted" | "denied" | "prompt";

interface FileSystemHandle {
  queryPermission?: (descriptor?: { mode?: "read" | "readwrite" }) => Promise<FilePermissionStatus>;
  requestPermission?: (descriptor?: { mode?: "read" | "readwrite" }) => Promise<FilePermissionStatus>;
}

interface FileSystemDirectoryHandle {
  entries(): AsyncIterableIterator<[string, FileSystemHandle]>;
  values(): AsyncIterableIterator<FileSystemHandle>;
  [Symbol.asyncIterator](): AsyncIterableIterator<[string, FileSystemHandle]>;
}
