import { ProjectFile } from "@/lib/types";

export type FingerprintFile = Pick<ProjectFile, "path" | "lastModified">;

export const OPEN_SPEC_WATCH_PREFIXES = [
  "openspec/config.yaml",
  "openspec/changes/",
  "openspec/specs/",
] as const;

const normalize = (path: string) => path.replaceAll("\\", "/");

export const isWatchedOpenSpecPath = (path: string): boolean => {
  const normalized = normalize(path);
  return OPEN_SPEC_WATCH_PREFIXES.some((prefix) =>
    prefix.endsWith("/") ? normalized.startsWith(prefix) : normalized === prefix
  );
};

export const createOpenSpecFingerprint = (
  files: Record<string, FingerprintFile>
): string =>
  Object.values(files)
    .filter((file) => isWatchedOpenSpecPath(file.path))
    .sort((left, right) => left.path.localeCompare(right.path))
    .map((file) => `${normalize(file.path)}:${file.lastModified}`)
    .join("|");

export const hasOpenSpecFingerprintChanged = (
  previousFingerprint: string,
  nextFingerprint: string
): boolean => previousFingerprint !== nextFingerprint;

export const shouldTriggerRefresh = (
  lastTriggeredAt: number,
  now: number,
  debounceMs: number
): boolean => now - lastTriggeredAt >= debounceMs;

export const debounceDelay = (
  lastTriggeredAt: number,
  now: number,
  debounceMs: number
): number => Math.max(0, debounceMs - (now - lastTriggeredAt));
