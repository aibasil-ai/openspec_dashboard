import { describe, expect, it } from "vitest";
import {
  createOpenSpecFingerprint,
  debounceDelay,
  hasOpenSpecFingerprintChanged,
  isWatchedOpenSpecPath,
  shouldTriggerRefresh,
} from "@/lib/realtime-refresh";

describe("realtime-refresh utils", () => {
  it("filters watched paths and creates deterministic fingerprint", () => {
    const fp = createOpenSpecFingerprint({
      "a": { path: "README.md", content: "x", lastModified: 1 },
      "b": { path: "openspec/specs/a/spec.md", content: "y", lastModified: 2 },
      "c": { path: "openspec/config.yaml", content: "z", lastModified: 3 },
    });

    expect(fp).toContain("openspec/config.yaml:3");
    expect(fp).toContain("openspec/specs/a/spec.md:2");
    expect(fp).not.toContain("README.md");
  });

  it("detects fingerprint change", () => {
    expect(hasOpenSpecFingerprintChanged("a", "b")).toBe(true);
    expect(hasOpenSpecFingerprintChanged("same", "same")).toBe(false);
  });

  it("applies debounce checks", () => {
    expect(shouldTriggerRefresh(1000, 1800, 700)).toBe(true);
    expect(shouldTriggerRefresh(1000, 1500, 700)).toBe(false);
    expect(debounceDelay(1000, 1500, 700)).toBe(200);
  });

  it("matches watched open spec paths", () => {
    expect(isWatchedOpenSpecPath("openspec/config.yaml")).toBe(true);
    expect(isWatchedOpenSpecPath("openspec/changes/demo/tasks.md")).toBe(true);
    expect(isWatchedOpenSpecPath("notes/todo.md")).toBe(false);
  });
});
