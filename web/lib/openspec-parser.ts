import {
  ChangeItem,
  OverviewStats,
  ParsedProject,
  ProjectFile,
  SpecItem,
  SpecSummary,
  TaskSummary,
} from "@/lib/types";

const normalize = (path: string) => path.replaceAll("\\", "/");

const buildTaskSummary = (content?: string): TaskSummary => {
  if (!content) {
    return { done: 0, total: 0 };
  }
  const lines = content.split("\n");
  const total = lines.filter((line) => /^- \[[xX\s]\]/.test(line)).length;
  const done = lines.filter((line) => /^- \[[xX]\]/.test(line)).length;
  return { done, total };
};

const buildSpecSummary = (content?: string): SpecSummary => {
  if (!content) {
    return { added: 0, modified: 0, removed: 0 };
  }
  const lines = content.split("\n");
  const added = lines.filter((line) => /^##\s+ADDED Requirements/.test(line)).length;
  const modified = lines.filter((line) => /^##\s+MODIFIED Requirements/.test(line)).length;
  const removed = lines.filter((line) => /^##\s+REMOVED Requirements/.test(line)).length;
  return { added, modified, removed };
};

const getFile = (files: Record<string, ProjectFile>, targetPath: string): ProjectFile | undefined =>
  Object.values(files).find((file) => normalize(file.path) === normalize(targetPath));

const collectByPrefix = (files: Record<string, ProjectFile>, prefix: string): ProjectFile[] =>
  Object.values(files).filter((file) => normalize(file.path).startsWith(normalize(prefix)));

const uniqueChangeRoots = (files: Record<string, ProjectFile>, prefix: string): string[] => {
  const roots = new Set<string>();
  Object.values(files).forEach((file) => {
    const normalizedPath = normalize(file.path);
    if (!normalizedPath.startsWith(prefix)) {
      return;
    }
    const tail = normalizedPath.slice(prefix.length);
    const [change] = tail.split("/");
    if (change && !change.startsWith(".")) {
      roots.add(change);
    }
  });
  return [...roots].sort();
};

const buildChangeItem = (
  files: Record<string, ProjectFile>,
  category: "in-progress" | "archived",
  changeName: string
): ChangeItem => {
  const basePath =
    category === "archived"
      ? `openspec/changes/archive/${changeName}`
      : `openspec/changes/${changeName}`;

  const proposal = getFile(files, `${basePath}/proposal.md`)?.content;
  const design = getFile(files, `${basePath}/design.md`)?.content;
  const tasks = getFile(files, `${basePath}/tasks.md`)?.content;

  const specFiles = collectByPrefix(files, `${basePath}/specs/`)
    .filter((file) => file.path.endsWith(".md"))
    .map((file) => file.content)
    .join("\n\n");

  const relatedFiles = collectByPrefix(files, `${basePath}/`);
  const updatedAt =
    relatedFiles.length > 0
      ? Math.max(...relatedFiles.map((file) => file.lastModified))
      : Date.now();

  return {
    name: changeName,
    category,
    proposal,
    design,
    tasks,
    specs: specFiles || undefined,
    updatedAt,
    taskSummary: buildTaskSummary(tasks),
    specSummary: buildSpecSummary(specFiles),
  };
};

const buildSpecs = (files: Record<string, ProjectFile>): SpecItem[] =>
  Object.values(files)
    .filter(
      (file) =>
        normalize(file.path).startsWith("openspec/specs/") &&
        normalize(file.path).endsWith("/spec.md")
    )
    .map((file) => {
      const normalizedPath = normalize(file.path);
      const chunks = normalizedPath.split("/");
      const name = chunks[chunks.length - 2] ?? normalizedPath;
      return {
        name,
        path: normalizedPath,
        content: file.content,
        updatedAt: file.lastModified,
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));

const buildStats = (
  inProgress: ChangeItem[],
  archived: ChangeItem[],
  specs: SpecItem[],
  staleDays: number
): OverviewStats => {
  const thresholdMs = staleDays * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const stalled = inProgress.filter((item) => now - item.updatedAt > thresholdMs).length;
  return {
    inProgress: inProgress.length,
    specs: specs.length,
    archived: archived.length,
    stalled,
  };
};

export const parseOpenSpecProject = (
  files: Record<string, ProjectFile>,
  staleDays: number
): ParsedProject => {
  const inProgressNames = uniqueChangeRoots(files, "openspec/changes/").filter(
    (name) => name !== "archive"
  );
  const archivedNames = uniqueChangeRoots(files, "openspec/changes/archive/");

  const inProgress = inProgressNames.map((name) =>
    buildChangeItem(files, "in-progress", name)
  );
  const archived = archivedNames.map((name) => buildChangeItem(files, "archived", name));
  const specs = buildSpecs(files);

  const configFile = getFile(files, "openspec/config.yaml");

  return {
    configPath: configFile ? "openspec/config.yaml" : null,
    configContent: configFile?.content ?? "",
    configUpdatedAt: configFile?.lastModified ?? Date.now(),
    inProgress,
    archived,
    specs,
    stats: buildStats(inProgress, archived, specs, staleDays),
  };
};

export const summarizeTasks = buildTaskSummary;
export const summarizeSpecs = buildSpecSummary;
