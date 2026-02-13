import { describe, expect, it } from "vitest";
import { parseOpenSpecProject, summarizeSpecs, summarizeTasks } from "@/lib/openspec-parser";

const now = Date.now();

const files = {
  "openspec/config.yaml": {
    path: "openspec/config.yaml",
    content: "staleDays: 7\nbackupRetentionDays: 30\n",
    lastModified: now,
  },
  "openspec/specs/project-selection/spec.md": {
    path: "openspec/specs/project-selection/spec.md",
    content: "# spec",
    lastModified: now,
  },
  "openspec/changes/change-a/proposal.md": {
    path: "openspec/changes/change-a/proposal.md",
    content: "# proposal",
    lastModified: now,
  },
  "openspec/changes/change-a/tasks.md": {
    path: "openspec/changes/change-a/tasks.md",
    content: "- [x] done\n- [ ] todo",
    lastModified: now,
  },
  "openspec/changes/change-a/specs/x/spec.md": {
    path: "openspec/changes/change-a/specs/x/spec.md",
    content: "## ADDED Requirements\n## MODIFIED Requirements\n## REMOVED Requirements",
    lastModified: now,
  },
  "openspec/changes/archive/change-b/proposal.md": {
    path: "openspec/changes/archive/change-b/proposal.md",
    content: "# archived",
    lastModified: now,
  },
} as const;

describe("openspec-parser", () => {
  it("builds stats and lists", () => {
    const parsed = parseOpenSpecProject(files, 9999);

    expect(parsed.stats.inProgress).toBe(1);
    expect(parsed.stats.archived).toBe(1);
    expect(parsed.stats.specs).toBe(1);
    expect(parsed.inProgress[0].taskSummary).toEqual({ done: 1, total: 2 });
    expect(parsed.inProgress[0].specSummary).toEqual({ added: 1, modified: 1, removed: 1 });
  });

  it("summarizes tasks and specs", () => {
    expect(summarizeTasks("- [x] A\n- [ ] B")).toEqual({ done: 1, total: 2 });
    expect(summarizeSpecs("## ADDED Requirements\n## REMOVED Requirements")).toEqual({
      added: 1,
      modified: 0,
      removed: 1,
    });
  });
});
