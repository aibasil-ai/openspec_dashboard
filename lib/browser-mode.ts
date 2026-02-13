import { BrowserMode } from "@/lib/types";

const CHROME_PATTERN = /(Chrome|CriOS)/i;
const EDGE_PATTERN = /(Edg|EdgiOS|EdgA)/i;

export const isFileSystemAccessSupported = () =>
  typeof window !== "undefined" &&
  typeof window.showDirectoryPicker === "function";

const extractMajorVersion = (ua: string, token: RegExp): number | null => {
  const match = ua.match(token);
  if (!match) {
    return null;
  }
  const parts = match[0].split("/");
  if (parts.length < 2) {
    return null;
  }
  const major = Number.parseInt(parts[1], 10);
  return Number.isFinite(major) ? major : null;
};

export const detectBrowserMode = (): BrowserMode => {
  if (typeof navigator === "undefined") {
    return "fallback-readonly";
  }

  const ua = navigator.userAgent;
  const support = isFileSystemAccessSupported();

  if (support && EDGE_PATTERN.test(ua)) {
    const version = extractMajorVersion(ua, /Edg\/\d+/i);
    if (!version || version >= 109) {
      return "edge-full";
    }
  }

  if (support && CHROME_PATTERN.test(ua) && !EDGE_PATTERN.test(ua)) {
    const version = extractMajorVersion(ua, /(Chrome|CriOS)\/\d+/i);
    if (!version || version >= 109) {
      return "chrome-full";
    }
  }

  return "fallback-readonly";
};
