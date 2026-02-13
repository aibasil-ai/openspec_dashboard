import { describe, expect, it } from "vitest";
import { validateConfigYaml } from "@/lib/config-validation";

describe("validateConfigYaml", () => {
  it("validates a proper config", () => {
    const result = validateConfigYaml("staleDays: 14\nbackupRetentionDays: 30\nlanguage: zh-TW\n");
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("returns errors for invalid yaml", () => {
    const result = validateConfigYaml("staleDays: [");
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
