import Ajv from "ajv";
import YAML from "yaml";

const schema = {
  type: "object",
  properties: {
    staleDays: { type: "number", minimum: 1 },
    backupRetentionDays: { type: "number", minimum: 1 },
    language: { enum: ["zh-TW", "en"] },
    theme: { enum: ["light", "dark"] },
  },
  additionalProperties: true,
};

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

export interface ConfigValidationResult {
  valid: boolean;
  errors: string[];
  lintHints: string[];
  parsed: Record<string, unknown> | null;
}

export const validateConfigYaml = (raw: string): ConfigValidationResult => {
  if (!raw.trim()) {
    return {
      valid: false,
      errors: ["config.yaml is empty"],
      lintHints: ["Add at least one key-value pair"],
      parsed: null,
    };
  }

  try {
    const parsed = YAML.parse(raw) as Record<string, unknown>;
    const valid = validate(parsed);
    const errors = valid
      ? []
      : (validate.errors ?? []).map((error) => {
          const location = error.instancePath || "root";
          return `${location}: ${error.message ?? "invalid value"}`;
        });

    const lintHints: string[] = [];
    if (typeof parsed.staleDays !== "number") {
      lintHints.push("Recommend setting numeric staleDays");
    }
    if (typeof parsed.backupRetentionDays !== "number") {
      lintHints.push("Recommend setting numeric backupRetentionDays");
    }

    return {
      valid: errors.length === 0,
      errors,
      lintHints,
      parsed,
    };
  } catch (error) {
    return {
      valid: false,
      errors: [error instanceof Error ? error.message : "Invalid YAML"],
      lintHints: ["Fix YAML syntax before saving"],
      parsed: null,
    };
  }
};
