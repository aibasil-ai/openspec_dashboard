(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/markdown-view.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MarkdownView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/index.js [app-client] (ecmascript) <export Markdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-gfm/lib/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rehype$2d$sanitize$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/rehype-sanitize/lib/index.js [app-client] (ecmascript)");
;
;
;
;
function MarkdownView({ content }) {
    if (!content.trim()) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "muted",
            children: "(empty)"
        }, void 0, false, {
            fileName: "[project]/components/markdown-view.tsx",
            lineNumber: 11,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "markdown-shell",
        "data-testid": "markdown-view",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Markdown__as__default$3e$__["default"], {
            remarkPlugins: [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$gfm$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
            ],
            rehypePlugins: [
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$rehype$2d$sanitize$2f$lib$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
            ],
            children: content
        }, void 0, false, {
            fileName: "[project]/components/markdown-view.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/markdown-view.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = MarkdownView;
var _c;
__turbopack_context__.k.register(_c, "MarkdownView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/browser-mode.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "detectBrowserMode",
    ()=>detectBrowserMode,
    "isFileSystemAccessSupported",
    ()=>isFileSystemAccessSupported
]);
const CHROME_PATTERN = /(Chrome|CriOS)/i;
const EDGE_PATTERN = /(Edg|EdgiOS|EdgA)/i;
const isFileSystemAccessSupported = ()=>("TURBOPACK compile-time value", "object") !== "undefined" && typeof window.showDirectoryPicker === "function";
const extractMajorVersion = (ua, token)=>{
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
const detectBrowserMode = ()=>{
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/config-validation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateConfigYaml",
    ()=>validateConfigYaml
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ajv$2f$dist$2f$ajv$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ajv/dist/ajv.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yaml$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/yaml/browser/index.js [app-client] (ecmascript) <locals>");
;
;
const schema = {
    type: "object",
    properties: {
        staleDays: {
            type: "number",
            minimum: 1
        },
        backupRetentionDays: {
            type: "number",
            minimum: 1
        },
        language: {
            enum: [
                "zh-TW",
                "en"
            ]
        },
        theme: {
            enum: [
                "light",
                "dark"
            ]
        }
    },
    additionalProperties: true
};
const ajv = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ajv$2f$dist$2f$ajv$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]({
    allErrors: true,
    strict: false
});
const validate = ajv.compile(schema);
const validateConfigYaml = (raw)=>{
    if (!raw.trim()) {
        return {
            valid: false,
            errors: [
                "config.yaml is empty"
            ],
            lintHints: [
                "Add at least one key-value pair"
            ],
            parsed: null
        };
    }
    try {
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yaml$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].parse(raw);
        const valid = validate(parsed);
        const errors = valid ? [] : (validate.errors ?? []).map((error)=>{
            const location = error.instancePath || "root";
            return `${location}: ${error.message ?? "invalid value"}`;
        });
        const lintHints = [];
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
            parsed
        };
    } catch (error) {
        return {
            valid: false,
            errors: [
                error instanceof Error ? error.message : "Invalid YAML"
            ],
            lintHints: [
                "Fix YAML syntax before saving"
            ],
            parsed: null
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/fs-access.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteChangeDirectory",
    ()=>deleteChangeDirectory,
    "importReadonlyProject",
    ()=>importReadonlyProject,
    "openDirectoryProject",
    ()=>openDirectoryProject,
    "reloadDirectoryProject",
    ()=>reloadDirectoryProject,
    "saveTextFile",
    ()=>saveTextFile,
    "scanDirectoryFileStamps",
    ()=>scanDirectoryFileStamps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/browser-mode.ts [app-client] (ecmascript)");
;
const normalize = (path)=>path.replaceAll("\\", "/");
const emitProgress = (callback, event)=>{
    callback?.(event);
};
const nextScanPercent = (state)=>{
    const ratio = state.processed / Math.max(1, state.estimated);
    const computed = 15 + Math.round(ratio * 55);
    const bounded = Math.max(state.lastPercent, Math.min(80, computed));
    state.lastPercent = bounded;
    return bounded;
};
const readDirectoryEntries = async (directoryHandle, scanState, callback, prefix = "")=>{
    const files = {};
    for await (const [name, entry] of directoryHandle.entries()){
        scanState.estimated += 1;
        const currentPath = prefix ? `${prefix}/${name}` : name;
        if (entry.kind === "file") {
            const fileHandle = entry;
            const file = await fileHandle.getFile();
            files[normalize(currentPath)] = {
                path: normalize(currentPath),
                content: await file.text(),
                lastModified: file.lastModified
            };
            scanState.processed += 1;
            emitProgress(callback, {
                stage: "scanning",
                progressPercent: nextScanPercent(scanState),
                message: "scan:file"
            });
        }
        if (entry.kind === "directory") {
            const nested = await readDirectoryEntries(entry, scanState, callback, currentPath);
            Object.assign(files, nested);
            scanState.processed += 1;
            emitProgress(callback, {
                stage: "scanning",
                progressPercent: nextScanPercent(scanState),
                message: "scan:dir"
            });
        }
    }
    return files;
};
const readDirectoryStamps = async (directoryHandle, prefix = "")=>{
    const stamps = {};
    for await (const [name, entry] of directoryHandle.entries()){
        const currentPath = prefix ? `${prefix}/${name}` : name;
        if (entry.kind === "file") {
            const fileHandle = entry;
            const file = await fileHandle.getFile();
            stamps[normalize(currentPath)] = {
                path: normalize(currentPath),
                lastModified: file.lastModified
            };
            continue;
        }
        if (entry.kind === "directory") {
            const nested = await readDirectoryStamps(entry, currentPath);
            Object.assign(stamps, nested);
        }
    }
    return stamps;
};
const ensureOpenSpecStructure = (files)=>{
    const hasOpenSpec = Object.keys(files).some((path)=>normalize(path).startsWith("openspec/"));
    if (!hasOpenSpec) {
        throw new Error("Invalid OpenSpec project: missing openspec/");
    }
};
const loadDirectoryFiles = async (rootHandle, onProgress, progressMessagePrefix = "open")=>{
    emitProgress(onProgress, {
        stage: "scanning",
        progressPercent: 15,
        message: `${progressMessagePrefix}:scanning`
    });
    const scanState = {
        processed: 0,
        estimated: 1,
        lastPercent: 15
    };
    const files = await readDirectoryEntries(rootHandle, scanState, onProgress);
    emitProgress(onProgress, {
        stage: "parsing",
        progressPercent: 85,
        message: `${progressMessagePrefix}:parsing`
    });
    ensureOpenSpecStructure(files);
    return files;
};
const getDirectoryHandleByPath = async (root, pathSegments)=>{
    let current = root;
    for (const segment of pathSegments){
        current = await current.getDirectoryHandle(segment);
    }
    return current;
};
const getFileHandleByPath = async (root, pathSegments, create)=>{
    if (pathSegments.length === 0) {
        throw new Error("File path cannot be empty");
    }
    const fileName = pathSegments[pathSegments.length - 1];
    const directories = pathSegments.slice(0, -1);
    let current = root;
    for (const segment of directories){
        current = await current.getDirectoryHandle(segment, {
            create
        });
    }
    return current.getFileHandle(fileName, {
        create
    });
};
const openDirectoryProject = async (onProgress)=>{
    if (typeof window.showDirectoryPicker !== "function") {
        throw new Error("showDirectoryPicker is not supported");
    }
    emitProgress(onProgress, {
        stage: "initializing",
        progressPercent: 5,
        message: "open:initializing"
    });
    const rootHandle = await window.showDirectoryPicker({
        mode: "readwrite"
    });
    const permission = await rootHandle.requestPermission?.({
        mode: "readwrite"
    });
    const writable = permission === "granted";
    const files = await loadDirectoryFiles(rootHandle, onProgress, "open");
    return {
        id: `${rootHandle.name}-${Date.now()}`,
        name: rootHandle.name,
        type: "filesystem",
        writable,
        mode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectBrowserMode"])(),
        files,
        openedAt: Date.now(),
        rootHandle
    };
};
const reloadDirectoryProject = async (snapshot, onProgress)=>{
    if (!snapshot.rootHandle) {
        throw new Error("Project root handle is missing");
    }
    const permission = await snapshot.rootHandle.queryPermission?.({
        mode: "readwrite"
    });
    const files = await loadDirectoryFiles(snapshot.rootHandle, onProgress, "sync");
    return {
        id: snapshot.id,
        name: snapshot.name,
        type: snapshot.type,
        writable: permission === "granted",
        mode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectBrowserMode"])(),
        files,
        openedAt: Date.now(),
        rootHandle: snapshot.rootHandle
    };
};
const scanDirectoryFileStamps = async (rootHandle)=>readDirectoryStamps(rootHandle);
const importReadonlyProject = async (fileList, onProgress)=>{
    const files = {};
    const now = Date.now();
    emitProgress(onProgress, {
        stage: "initializing",
        progressPercent: 5,
        message: "import:initializing"
    });
    const list = Array.from(fileList);
    for(let index = 0; index < list.length; index += 1){
        const file = list[index];
        const relativePath = normalize(file.webkitRelativePath || file.name);
        files[relativePath] = {
            path: relativePath,
            content: await file.text(),
            lastModified: file.lastModified || now
        };
        const ratio = (index + 1) / Math.max(1, list.length);
        emitProgress(onProgress, {
            stage: "scanning",
            progressPercent: 15 + Math.round(ratio * 65),
            message: "import:scanning"
        });
    }
    emitProgress(onProgress, {
        stage: "parsing",
        progressPercent: 85,
        message: "import:parsing"
    });
    const hasOpenSpec = Object.keys(files).some((path)=>normalize(path).startsWith("openspec/"));
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
        openedAt: now
    };
};
const saveTextFile = async (rootHandle, path, content)=>{
    const segments = normalize(path).split("/");
    const fileHandle = await getFileHandleByPath(rootHandle, segments, true);
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
};
const deleteChangeDirectory = async (rootHandle, category, name)=>{
    const baseSegments = category === "archived" ? [
        "openspec",
        "changes",
        "archive"
    ] : [
        "openspec",
        "changes"
    ];
    const parent = await getDirectoryHandleByPath(rootHandle, baseSegments);
    await parent.removeEntry(name, {
        recursive: true
    });
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "modeLabel",
    ()=>modeLabel,
    "stageLabel",
    ()=>stageLabel,
    "t",
    ()=>t,
    "tabLabel",
    ()=>tabLabel
]);
const ZH = {
    appTitle: "OpenSpec 專案追蹤面板",
    openProject: "開啟本機專案",
    importReadonly: "匯入資料夾（唯讀）",
    recentProjects: "最近開啟專案",
    noRecentProjects: "尚無最近專案",
    currentProject: "目前開啟專案",
    noActiveProject: "尚未開啟專案",
    openTime: "開啟時間",
    delete: "刪除",
    overview: "總覽",
    inProgress: "進行中",
    specs: "規格",
    archived: "已封存",
    stalled: "停滯中",
    configEditor: "config.yaml 編輯",
    save: "儲存",
    saving: "儲存中...",
    validationErrors: "驗證錯誤",
    lintHints: "Lint 提示",
    noSelection: "請先從清單選擇一個項目。",
    proposal: "提案",
    design: "設計",
    tasks: "任務",
    language: "語言",
    theme: "主題",
    dark: "黑底白字",
    light: "白底黑字",
    staleDays: "停滯天數門檻",
    backupRetentionDays: "備份保留天數",
    mode: "模式",
    modeChrome: "Chrome 完整讀寫",
    modeEdge: "Edge 完整讀寫",
    modeFallback: "Safari/Firefox fallback（匯入與唯讀）",
    readonlyHint: "目前為唯讀模式，部分功能（儲存/刪除）不可用。",
    configSaved: "config.yaml 已儲存",
    selectItem: "點擊上方項目可在此顯示內容",
    confirmDelete: "確定要刪除這個項目嗎？",
    cannotDeleteReadonly: "唯讀模式無法刪除",
    openFailed: "開啟資料夾失敗",
    invalidProject: "此資料夾缺少 openspec/ 結構",
    loadProgress: "載入進度",
    syncStatus: "即時同步",
    syncIdle: "待命中",
    syncSyncing: "同步中",
    syncSuccess: "已同步",
    syncError: "同步失敗",
    syncWatching: "監控中：偵測到檔案更新會自動同步。",
    syncFallbackInfo: "唯讀匯入模式：如本機檔案更新，請重新匯入以同步。",
    syncUpdateDetected: "偵測到檔案更新，正在同步...",
    syncUpdated: "檔案更新已同步。",
    syncFailedHint: "自動同步失敗，已保留最近一次成功資料。",
    lastSyncedAt: "最近同步時間",
    stageIdle: "待命中",
    stageInitializing: "初始化中",
    stageScanning: "掃描檔案中",
    stageParsing: "解析資料中",
    stageReady: "載入完成",
    stageError: "載入失敗"
};
const EN = {
    appTitle: "OpenSpec Project Progress Dashboard",
    openProject: "Open Local Project",
    importReadonly: "Import Folder (Read-only)",
    recentProjects: "Recent Projects",
    noRecentProjects: "No recent projects",
    currentProject: "Current Project",
    noActiveProject: "No active project",
    openTime: "Opened At",
    delete: "Delete",
    overview: "Overview",
    inProgress: "In Progress",
    specs: "Specs",
    archived: "Archived",
    stalled: "Stalled",
    configEditor: "config.yaml Editor",
    save: "Save",
    saving: "Saving...",
    validationErrors: "Validation Errors",
    lintHints: "Lint Hints",
    noSelection: "Select an item from the list first.",
    proposal: "Proposal",
    design: "Design",
    tasks: "Tasks",
    language: "Language",
    theme: "Theme",
    dark: "Dark",
    light: "Light",
    staleDays: "Stale Days Threshold",
    backupRetentionDays: "Backup Retention Days",
    mode: "Mode",
    modeChrome: "Chrome Full Read/Write",
    modeEdge: "Edge Full Read/Write",
    modeFallback: "Safari/Firefox Fallback (Import + Read-only)",
    readonlyHint: "Read-only mode: save/delete actions are disabled.",
    configSaved: "config.yaml saved",
    selectItem: "Click an item above to show content here",
    confirmDelete: "Delete this item?",
    cannotDeleteReadonly: "Delete is disabled in read-only mode",
    openFailed: "Failed to open folder",
    invalidProject: "This folder is missing openspec/ structure",
    loadProgress: "Load Progress",
    syncStatus: "Live Sync",
    syncIdle: "Idle",
    syncSyncing: "Syncing",
    syncSuccess: "Synced",
    syncError: "Sync Failed",
    syncWatching: "Watching files: changes sync automatically.",
    syncFallbackInfo: "Read-only import mode: re-import to sync external file changes.",
    syncUpdateDetected: "File updates detected, syncing...",
    syncUpdated: "File changes synced.",
    syncFailedHint: "Auto-sync failed. Keeping last successful data.",
    lastSyncedAt: "Last Synced At",
    stageIdle: "Idle",
    stageInitializing: "Initializing",
    stageScanning: "Scanning files",
    stageParsing: "Parsing data",
    stageReady: "Ready",
    stageError: "Failed"
};
const TABLE = {
    "zh-TW": ZH,
    en: EN
};
const t = (lang, key)=>TABLE[lang][key] ?? key;
const tabLabel = (lang, tab)=>{
    if (tab === "in-progress") {
        return t(lang, "inProgress");
    }
    return t(lang, tab);
};
const modeLabel = (lang, mode)=>{
    if (mode === "chrome-full") {
        return t(lang, "modeChrome");
    }
    if (mode === "edge-full") {
        return t(lang, "modeEdge");
    }
    return t(lang, "modeFallback");
};
const stageLabel = (lang, stage)=>{
    if (stage === "initializing") {
        return t(lang, "stageInitializing");
    }
    if (stage === "scanning") {
        return t(lang, "stageScanning");
    }
    if (stage === "parsing") {
        return t(lang, "stageParsing");
    }
    if (stage === "ready") {
        return t(lang, "stageReady");
    }
    if (stage === "error") {
        return t(lang, "stageError");
    }
    return t(lang, "stageIdle");
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/openspec-parser.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseOpenSpecProject",
    ()=>parseOpenSpecProject,
    "summarizeSpecs",
    ()=>summarizeSpecs,
    "summarizeTasks",
    ()=>summarizeTasks
]);
const normalize = (path)=>path.replaceAll("\\", "/");
const buildTaskSummary = (content)=>{
    if (!content) {
        return {
            done: 0,
            total: 0
        };
    }
    const lines = content.split("\n");
    const total = lines.filter((line)=>/^- \[[xX\s]\]/.test(line)).length;
    const done = lines.filter((line)=>/^- \[[xX]\]/.test(line)).length;
    return {
        done,
        total
    };
};
const buildSpecSummary = (content)=>{
    if (!content) {
        return {
            added: 0,
            modified: 0,
            removed: 0
        };
    }
    const lines = content.split("\n");
    const added = lines.filter((line)=>/^##\s+ADDED Requirements/.test(line)).length;
    const modified = lines.filter((line)=>/^##\s+MODIFIED Requirements/.test(line)).length;
    const removed = lines.filter((line)=>/^##\s+REMOVED Requirements/.test(line)).length;
    return {
        added,
        modified,
        removed
    };
};
const getFile = (files, targetPath)=>Object.values(files).find((file)=>normalize(file.path) === normalize(targetPath));
const collectByPrefix = (files, prefix)=>Object.values(files).filter((file)=>normalize(file.path).startsWith(normalize(prefix)));
const uniqueChangeRoots = (files, prefix)=>{
    const roots = new Set();
    Object.values(files).forEach((file)=>{
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
    return [
        ...roots
    ].sort();
};
const buildChangeItem = (files, category, changeName)=>{
    const basePath = category === "archived" ? `openspec/changes/archive/${changeName}` : `openspec/changes/${changeName}`;
    const proposal = getFile(files, `${basePath}/proposal.md`)?.content;
    const design = getFile(files, `${basePath}/design.md`)?.content;
    const tasks = getFile(files, `${basePath}/tasks.md`)?.content;
    const specFiles = collectByPrefix(files, `${basePath}/specs/`).filter((file)=>file.path.endsWith(".md")).map((file)=>file.content).join("\n\n");
    const relatedFiles = collectByPrefix(files, `${basePath}/`);
    const updatedAt = relatedFiles.length > 0 ? Math.max(...relatedFiles.map((file)=>file.lastModified)) : Date.now();
    return {
        name: changeName,
        category,
        proposal,
        design,
        tasks,
        specs: specFiles || undefined,
        updatedAt,
        taskSummary: buildTaskSummary(tasks),
        specSummary: buildSpecSummary(specFiles)
    };
};
const buildSpecs = (files)=>Object.values(files).filter((file)=>normalize(file.path).startsWith("openspec/specs/") && normalize(file.path).endsWith("/spec.md")).map((file)=>{
        const normalizedPath = normalize(file.path);
        const chunks = normalizedPath.split("/");
        const name = chunks[chunks.length - 2] ?? normalizedPath;
        return {
            name,
            path: normalizedPath,
            content: file.content,
            updatedAt: file.lastModified
        };
    }).sort((left, right)=>left.name.localeCompare(right.name));
const buildStats = (inProgress, archived, specs, staleDays)=>{
    const thresholdMs = staleDays * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const stalled = inProgress.filter((item)=>now - item.updatedAt > thresholdMs).length;
    return {
        inProgress: inProgress.length,
        specs: specs.length,
        archived: archived.length,
        stalled
    };
};
const parseOpenSpecProject = (files, staleDays)=>{
    const inProgressNames = uniqueChangeRoots(files, "openspec/changes/").filter((name)=>name !== "archive");
    const archivedNames = uniqueChangeRoots(files, "openspec/changes/archive/");
    const inProgress = inProgressNames.map((name)=>buildChangeItem(files, "in-progress", name));
    const archived = archivedNames.map((name)=>buildChangeItem(files, "archived", name));
    const specs = buildSpecs(files);
    const configFile = getFile(files, "openspec/config.yaml");
    return {
        configPath: configFile ? "openspec/config.yaml" : null,
        configContent: configFile?.content ?? "",
        configUpdatedAt: configFile?.lastModified ?? Date.now(),
        inProgress,
        archived,
        specs,
        stats: buildStats(inProgress, archived, specs, staleDays)
    };
};
const summarizeTasks = buildTaskSummary;
const summarizeSpecs = buildSpecSummary;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/realtime-refresh.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPEN_SPEC_WATCH_PREFIXES",
    ()=>OPEN_SPEC_WATCH_PREFIXES,
    "createOpenSpecFingerprint",
    ()=>createOpenSpecFingerprint,
    "debounceDelay",
    ()=>debounceDelay,
    "hasOpenSpecFingerprintChanged",
    ()=>hasOpenSpecFingerprintChanged,
    "isWatchedOpenSpecPath",
    ()=>isWatchedOpenSpecPath,
    "shouldTriggerRefresh",
    ()=>shouldTriggerRefresh
]);
const OPEN_SPEC_WATCH_PREFIXES = [
    "openspec/config.yaml",
    "openspec/changes/",
    "openspec/specs/"
];
const normalize = (path)=>path.replaceAll("\\", "/");
const isWatchedOpenSpecPath = (path)=>{
    const normalized = normalize(path);
    return OPEN_SPEC_WATCH_PREFIXES.some((prefix)=>prefix.endsWith("/") ? normalized.startsWith(prefix) : normalized === prefix);
};
const createOpenSpecFingerprint = (files)=>Object.values(files).filter((file)=>isWatchedOpenSpecPath(file.path)).sort((left, right)=>left.path.localeCompare(right.path)).map((file)=>`${normalize(file.path)}:${file.lastModified}`).join("|");
const hasOpenSpecFingerprintChanged = (previousFingerprint, nextFingerprint)=>previousFingerprint !== nextFingerprint;
const shouldTriggerRefresh = (lastTriggeredAt, now, debounceMs)=>now - lastTriggeredAt >= debounceMs;
const debounceDelay = (lastTriggeredAt, now, debounceMs)=>Math.max(0, debounceMs - (now - lastTriggeredAt));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/storage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanupExpiredBackups",
    ()=>cleanupExpiredBackups,
    "defaultPreferences",
    ()=>defaultPreferences,
    "deleteSnapshot",
    ()=>deleteSnapshot,
    "getSnapshot",
    ()=>getSnapshot,
    "loadBackups",
    ()=>loadBackups,
    "loadDeleteLogs",
    ()=>loadDeleteLogs,
    "loadPreferences",
    ()=>loadPreferences,
    "loadRecentProjects",
    ()=>loadRecentProjects,
    "putSnapshot",
    ()=>putSnapshot,
    "saveBackups",
    ()=>saveBackups,
    "saveDeleteLogs",
    ()=>saveDeleteLogs,
    "savePreferences",
    ()=>savePreferences,
    "saveRecentProjects",
    ()=>saveRecentProjects
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/idb-keyval/dist/index.js [app-client] (ecmascript)");
;
const PREFS_KEY = "opsx.preferences.v1";
const RECENT_KEY = "opsx.recent.v1";
const BACKUPS_KEY = "opsx.backups.v1";
const DELETE_LOGS_KEY = "opsx.delete.logs.v1";
const defaultPreferences = {
    language: "zh-TW",
    theme: "dark",
    staleDays: 14,
    backupRetentionDays: 30
};
const readJson = (key, fallback)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(key);
    if (!raw) {
        return fallback;
    }
    try {
        return JSON.parse(raw);
    } catch  {
        return fallback;
    }
};
const writeJson = (key, value)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.localStorage.setItem(key, JSON.stringify(value));
};
const loadPreferences = ()=>({
        ...defaultPreferences,
        ...readJson(PREFS_KEY, defaultPreferences)
    });
const savePreferences = (preferences)=>{
    writeJson(PREFS_KEY, preferences);
};
const loadRecentProjects = ()=>readJson(RECENT_KEY, []);
const saveRecentProjects = (projects)=>{
    writeJson(RECENT_KEY, projects.slice(0, 8));
};
const putSnapshot = async (snapshot)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["set"])(snapshot.id, snapshot);
};
const getSnapshot = async (id)=>await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["get"])(id);
const deleteSnapshot = async (id)=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2d$keyval$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["del"])(id);
};
const loadBackups = ()=>readJson(BACKUPS_KEY, []);
const saveBackups = (records)=>writeJson(BACKUPS_KEY, records);
const loadDeleteLogs = ()=>readJson(DELETE_LOGS_KEY, []);
const saveDeleteLogs = (records)=>writeJson(DELETE_LOGS_KEY, records);
const cleanupExpiredBackups = (retentionDays)=>{
    const now = Date.now();
    const maxAge = retentionDays * 24 * 60 * 60 * 1000;
    const backups = loadBackups();
    const logs = loadDeleteLogs();
    const kept = backups.filter((backup)=>now - backup.deletedAt <= maxAge);
    if (kept.length !== backups.length) {
        saveBackups(kept);
        saveDeleteLogs(logs.filter((entry)=>now - entry.deletedAt <= maxAge));
    }
    return kept;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/dashboard-page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yaml$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/yaml/browser/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/markdown-view.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/browser-mode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2d$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/config-validation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fs$2d$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/fs-access.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$openspec$2d$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/openspec-parser.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/realtime-refresh.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const TABS = [
    "overview",
    "in-progress",
    "specs",
    "archived"
];
const normalize = (path)=>path.replaceAll("\\", "/");
const toRecent = (snapshot)=>({
        id: snapshot.id,
        name: snapshot.name,
        type: snapshot.type,
        openedAt: snapshot.openedAt
    });
const upsertRecent = (current, snapshot)=>{
    const filtered = current.filter((item)=>item.id !== snapshot.id);
    return [
        toRecent(snapshot),
        ...filtered
    ].sort((a, b)=>b.openedAt - a.openedAt).slice(0, 8);
};
const getConfigPath = (snapshot)=>{
    const configPath = Object.keys(snapshot.files).find((path)=>normalize(path) === "openspec/config.yaml");
    return configPath ?? "openspec/config.yaml";
};
const applyTheme = (theme)=>{
    if (typeof document === "undefined") {
        return;
    }
    document.documentElement.dataset.theme = theme;
};
const extractConfigNumbers = (configText)=>{
    try {
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$yaml$2f$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].parse(configText);
        return {
            staleDays: typeof parsed.staleDays === "number" ? parsed.staleDays : null,
            backupRetentionDays: typeof parsed.backupRetentionDays === "number" ? parsed.backupRetentionDays : null
        };
    } catch  {
        return {
            staleDays: null,
            backupRetentionDays: null
        };
    }
};
const INITIAL_LOAD_STATE = {
    stage: "idle",
    progressPercent: 0,
    message: ""
};
const INITIAL_SYNC_STATE = {
    status: "idle",
    message: "",
    lastSyncedAt: null
};
const POLL_INTERVAL_MS = 1800;
const REFRESH_DEBOUNCE_MS = 800;
const applyProgressEvent = (current, event)=>{
    const nextPercent = Math.max(current.progressPercent, event.progressPercent);
    return {
        stage: event.stage,
        progressPercent: Math.min(100, Math.max(0, nextPercent)),
        message: event.message
    };
};
const formatOpenedAt = (timestamp, lang)=>{
    if (!Number.isFinite(timestamp)) {
        return "-";
    }
    return new Date(timestamp).toLocaleString(lang === "zh-TW" ? "zh-TW" : "en-US", {
        hour12: false
    });
};
function DashboardPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const importRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resetLoadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const refreshTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const snapshotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fingerprintRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])("");
    const lastTriggeredAtRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isRefreshingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const isScanningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [prefs, setPrefs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["defaultPreferences"]);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("fallback-readonly");
    const [recentProjects, setRecentProjects] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [snapshot, setSnapshot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [parsed, setParsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [configDraft, setConfigDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [saveMessage, setSaveMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loadState, setLoadState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_LOAD_STATE);
    const [syncState, setSyncState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(INITIAL_SYNC_STATE);
    const [selectedSpec, setSelectedSpec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedInProgress, setSelectedInProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedArchived, setSelectedArchived] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [inProgressDetailTab, setInProgressDetailTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("tasks");
    const [archivedDetailTab, setArchivedDetailTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("proposal");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            const nextMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectBrowserMode"])();
            setMode(nextMode);
            const nextPrefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadPreferences"])();
            setPrefs(nextPrefs);
            applyTheme(nextPrefs.theme);
            setRecentProjects((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadRecentProjects"])());
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanupExpiredBackups"])(nextPrefs.backupRetentionDays);
        }
    }["DashboardPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            return ({
                "DashboardPage.useEffect": ()=>{
                    if (resetLoadRef.current) {
                        clearTimeout(resetLoadRef.current);
                    }
                    if (refreshTimerRef.current) {
                        clearTimeout(refreshTimerRef.current);
                    }
                }
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            snapshotRef.current = snapshot;
            fingerprintRef.current = snapshot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOpenSpecFingerprint"])(snapshot.files) : "";
        }
    }["DashboardPage.useEffect"], [
        snapshot
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePreferences"])(prefs);
            applyTheme(prefs.theme);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanupExpiredBackups"])(prefs.backupRetentionDays);
        }
    }["DashboardPage.useEffect"], [
        prefs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (!snapshot) {
                setParsed(null);
                setConfigDraft("");
                return;
            }
            const nextParsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$openspec$2d$parser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseOpenSpecProject"])(snapshot.files, prefs.staleDays);
            setParsed(nextParsed);
            setConfigDraft(nextParsed.configContent);
            setSelectedSpec({
                "DashboardPage.useEffect": (current)=>{
                    if (current && nextParsed.specs.some({
                        "DashboardPage.useEffect": (item)=>item.name === current
                    }["DashboardPage.useEffect"])) {
                        return current;
                    }
                    return nextParsed.specs[0]?.name ?? "";
                }
            }["DashboardPage.useEffect"]);
            setSelectedInProgress({
                "DashboardPage.useEffect": (current)=>{
                    if (current && nextParsed.inProgress.some({
                        "DashboardPage.useEffect": (item)=>item.name === current
                    }["DashboardPage.useEffect"])) {
                        return current;
                    }
                    return nextParsed.inProgress[0]?.name ?? "";
                }
            }["DashboardPage.useEffect"]);
            setSelectedArchived({
                "DashboardPage.useEffect": (current)=>{
                    if (current && nextParsed.archived.some({
                        "DashboardPage.useEffect": (item)=>item.name === current
                    }["DashboardPage.useEffect"])) {
                        return current;
                    }
                    return nextParsed.archived[0]?.name ?? "";
                }
            }["DashboardPage.useEffect"]);
        }
    }["DashboardPage.useEffect"], [
        snapshot,
        prefs.staleDays
    ]);
    const lang = prefs.language;
    const activeTab = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[activeTab]": ()=>{
            const value = searchParams.get("tab");
            return value && TABS.includes(value) ? value : "overview";
        }
    }["DashboardPage.useMemo[activeTab]"], [
        searchParams
    ]);
    const setTab = (tab)=>{
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", tab);
        router.replace(`/?${params.toString()}`);
    };
    const startLoad = (message)=>{
        if (resetLoadRef.current) {
            clearTimeout(resetLoadRef.current);
            resetLoadRef.current = null;
        }
        setLoadState({
            stage: "initializing",
            progressPercent: 5,
            message
        });
    };
    const completeLoad = (message)=>{
        setLoadState({
            stage: "ready",
            progressPercent: 100,
            message
        });
        resetLoadRef.current = setTimeout(()=>{
            setLoadState(INITIAL_LOAD_STATE);
        }, 1500);
    };
    const failLoad = (errorMessage)=>{
        setLoadState({
            stage: "error",
            progressPercent: 100,
            message: errorMessage,
            error: errorMessage
        });
    };
    const onProgress = (event)=>{
        setLoadState((current)=>applyProgressEvent(current, event));
    };
    const updateSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[updateSnapshot]": async (nextSnapshot)=>{
            setSnapshot(nextSnapshot);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["putSnapshot"])(nextSnapshot);
            setRecentProjects({
                "DashboardPage.useCallback[updateSnapshot]": (current)=>{
                    const next = upsertRecent(current, nextSnapshot);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveRecentProjects"])(next);
                    return next;
                }
            }["DashboardPage.useCallback[updateSnapshot]"]);
        }
    }["DashboardPage.useCallback[updateSnapshot]"], []);
    const setSyncIdle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[setSyncIdle]": (nextSnapshot, lastSyncedAt = null)=>{
            setSyncState({
                status: "idle",
                message: nextSnapshot.rootHandle ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncWatching") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncFallbackInfo"),
                error: undefined,
                lastSyncedAt
            });
        }
    }["DashboardPage.useCallback[setSyncIdle]"], [
        lang
    ]);
    const refreshProjectData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[refreshProjectData]": async ()=>{
            const currentSnapshot = snapshotRef.current;
            if (!currentSnapshot?.rootHandle || isRefreshingRef.current) {
                return;
            }
            isRefreshingRef.current = true;
            setSyncState({
                "DashboardPage.useCallback[refreshProjectData]": (current)=>({
                        status: "syncing",
                        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncUpdateDetected"),
                        error: undefined,
                        lastSyncedAt: current.lastSyncedAt
                    })
            }["DashboardPage.useCallback[refreshProjectData]"]);
            try {
                const reloaded = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fs$2d$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["reloadDirectoryProject"])(currentSnapshot);
                await updateSnapshot(reloaded);
                fingerprintRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOpenSpecFingerprint"])(reloaded.files);
                setSyncState({
                    status: "success",
                    message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncUpdated"),
                    error: undefined,
                    lastSyncedAt: Date.now()
                });
            } catch (error) {
                setSyncState({
                    "DashboardPage.useCallback[refreshProjectData]": (current)=>({
                            status: "error",
                            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncFailedHint"),
                            error: error instanceof Error ? error.message : "unknown",
                            lastSyncedAt: current.lastSyncedAt
                        })
                }["DashboardPage.useCallback[refreshProjectData]"]);
            } finally{
                isRefreshingRef.current = false;
            }
        }
    }["DashboardPage.useCallback[refreshProjectData]"], [
        lang,
        updateSnapshot
    ]);
    const openProject = async ()=>{
        startLoad("open:start");
        try {
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$browser$2d$mode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFileSystemAccessSupported"])()) {
                failLoad(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "openFailed")}: showDirectoryPicker unsupported`);
                return;
            }
            const next = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fs$2d$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openDirectoryProject"])(onProgress);
            if (!next.files["openspec/config.yaml"] && !Object.keys(next.files).some((file)=>file.startsWith("openspec/"))) {
                failLoad((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "invalidProject"));
                return;
            }
            setLoadState((current)=>applyProgressEvent(current, {
                    stage: "parsing",
                    progressPercent: 92,
                    message: "open:finalize"
                }));
            await updateSnapshot(next);
            setSyncIdle(next, Date.now());
            completeLoad("open:ready");
        } catch (error) {
            failLoad(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "openFailed")}: ${error instanceof Error ? error.message : "unknown"}`);
        }
    };
    const importProject = async (event)=>{
        const fileList = event.target.files;
        if (!fileList || fileList.length === 0) {
            return;
        }
        startLoad("import:start");
        try {
            const next = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fs$2d$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["importReadonlyProject"])(fileList, onProgress);
            await updateSnapshot(next);
            setSyncIdle(next, Date.now());
            completeLoad("import:ready");
        } catch (error) {
            failLoad(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "openFailed")}: ${error instanceof Error ? error.message : "unknown"}`);
        } finally{
            event.target.value = "";
        }
    };
    const loadRecentProject = async (recent)=>{
        startLoad("recent:start");
        const loaded = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSnapshot"])(recent.id);
        if (!loaded) {
            failLoad(`${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "openFailed")}: snapshot not found`);
            return;
        }
        setLoadState((current)=>applyProgressEvent(current, {
                stage: "parsing",
                progressPercent: 85,
                message: "recent:parsing"
            }));
        await updateSnapshot({
            ...loaded,
            openedAt: Date.now()
        });
        setSyncIdle({
            ...loaded,
            openedAt: Date.now()
        }, Date.now());
        completeLoad("recent:ready");
    };
    const handleConfigSave = async ()=>{
        if (!snapshot || !parsed) {
            return;
        }
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2d$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateConfigYaml"])(configDraft);
        if (!validation.valid) {
            return;
        }
        if (!snapshot.writable || !snapshot.rootHandle) {
            alert((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "readonlyHint"));
            return;
        }
        const configPath = getConfigPath(snapshot);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fs$2d$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveTextFile"])(snapshot.rootHandle, configPath, configDraft);
        const updatedFiles = {
            ...snapshot.files,
            [normalize(configPath)]: {
                path: normalize(configPath),
                content: configDraft,
                lastModified: Date.now()
            }
        };
        const nextSnapshot = {
            ...snapshot,
            files: updatedFiles,
            openedAt: Date.now()
        };
        const extracted = extractConfigNumbers(configDraft);
        setPrefs((current)=>({
                ...current,
                staleDays: extracted.staleDays ?? current.staleDays,
                backupRetentionDays: extracted.backupRetentionDays ?? current.backupRetentionDays
            }));
        await updateSnapshot(nextSnapshot);
        setSyncIdle(nextSnapshot, Date.now());
        setSaveMessage((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "configSaved"));
        setTimeout(()=>setSaveMessage(""), 1800);
    };
    const deleteChange = async (category, name)=>{
        if (!snapshot) {
            return;
        }
        if (!snapshot.writable || !snapshot.rootHandle) {
            alert((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "cannotDeleteReadonly"));
            return;
        }
        const confirmed = window.confirm((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "confirmDelete"));
        if (!confirmed) {
            return;
        }
        const basePath = category === "archived" ? `openspec/changes/archive/${name}/` : `openspec/changes/${name}/`;
        const files = Object.values(snapshot.files).filter((file)=>normalize(file.path).startsWith(basePath));
        const backupRecord = {
            id: `${name}-${Date.now()}`,
            path: basePath,
            deletedAt: Date.now(),
            files
        };
        const deleteLog = {
            id: `log-${Date.now()}`,
            path: basePath,
            deletedAt: Date.now(),
            projectId: snapshot.id
        };
        const backups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadBackups"])();
        const logs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadDeleteLogs"])();
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveBackups"])([
            backupRecord,
            ...backups
        ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveDeleteLogs"])([
            deleteLog,
            ...logs
        ]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanupExpiredBackups"])(prefs.backupRetentionDays);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fs$2d$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteChangeDirectory"])(snapshot.rootHandle, category, name);
        const nextFiles = {
            ...snapshot.files
        };
        for (const file of files){
            delete nextFiles[file.path];
        }
        const nextSnapshot = {
            ...snapshot,
            files: nextFiles,
            openedAt: Date.now()
        };
        await updateSnapshot(nextSnapshot);
        setSyncIdle(nextSnapshot, Date.now());
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (!snapshot?.rootHandle) {
                return;
            }
            let canceled = false;
            const triggerRefresh = {
                "DashboardPage.useEffect.triggerRefresh": (fingerprint, now)=>{
                    lastTriggeredAtRef.current = now;
                    fingerprintRef.current = fingerprint;
                    void refreshProjectData();
                }
            }["DashboardPage.useEffect.triggerRefresh"];
            const pollChanges = {
                "DashboardPage.useEffect.pollChanges": async ()=>{
                    if (canceled || isRefreshingRef.current || isScanningRef.current) {
                        return;
                    }
                    isScanningRef.current = true;
                    try {
                        const stamps = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$fs$2d$access$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scanDirectoryFileStamps"])(snapshot.rootHandle);
                        const nextFingerprint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createOpenSpecFingerprint"])(stamps);
                        const previousFingerprint = fingerprintRef.current;
                        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasOpenSpecFingerprintChanged"])(previousFingerprint, nextFingerprint)) {
                            return;
                        }
                        const now = Date.now();
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shouldTriggerRefresh"])(lastTriggeredAtRef.current, now, REFRESH_DEBOUNCE_MS)) {
                            triggerRefresh(nextFingerprint, now);
                            return;
                        }
                        const delay = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$realtime$2d$refresh$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["debounceDelay"])(lastTriggeredAtRef.current, now, REFRESH_DEBOUNCE_MS);
                        if (refreshTimerRef.current) {
                            clearTimeout(refreshTimerRef.current);
                        }
                        refreshTimerRef.current = setTimeout({
                            "DashboardPage.useEffect.pollChanges": ()=>{
                                if (canceled) {
                                    return;
                                }
                                triggerRefresh(nextFingerprint, Date.now());
                            }
                        }["DashboardPage.useEffect.pollChanges"], delay);
                    } catch (error) {
                        if (!canceled) {
                            setSyncState({
                                "DashboardPage.useEffect.pollChanges": (current)=>({
                                        status: "error",
                                        message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncFailedHint"),
                                        error: error instanceof Error ? error.message : "unknown",
                                        lastSyncedAt: current.lastSyncedAt
                                    })
                            }["DashboardPage.useEffect.pollChanges"]);
                        }
                    } finally{
                        isScanningRef.current = false;
                    }
                }
            }["DashboardPage.useEffect.pollChanges"];
            const intervalId = setInterval({
                "DashboardPage.useEffect.intervalId": ()=>{
                    void pollChanges();
                }
            }["DashboardPage.useEffect.intervalId"], POLL_INTERVAL_MS);
            return ({
                "DashboardPage.useEffect": ()=>{
                    canceled = true;
                    clearInterval(intervalId);
                    if (refreshTimerRef.current) {
                        clearTimeout(refreshTimerRef.current);
                        refreshTimerRef.current = null;
                    }
                }
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], [
        lang,
        refreshProjectData,
        snapshot?.id,
        snapshot?.rootHandle
    ]);
    const selectedSpecItem = parsed?.specs.find((item)=>item.name === selectedSpec);
    const selectedInProgressItem = parsed?.inProgress.find((item)=>item.name === selectedInProgress);
    const selectedArchivedItem = parsed?.archived.find((item)=>item.name === selectedArchived);
    const configValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$config$2d$validation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateConfigYaml"])(configDraft);
    const syncStatusLabel = syncState.status === "syncing" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncSyncing") : syncState.status === "success" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncSuccess") : syncState.status === "error" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncError") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncIdle");
    const syncMessage = syncState.message || (!snapshot ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "noActiveProject") : snapshot.rootHandle ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncWatching") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncFallbackInfo"));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "appTitle")
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 619,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "toolbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: openProject,
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "openProject")
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 622,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>importRef.current?.click(),
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "importReadonly")
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 626,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: importRef,
                                type: "file",
                                multiple: true,
                                className: "hidden",
                                onChange: importProject,
                                // @ts-expect-error webkitdirectory is browser-specific
                                webkitdirectory: ""
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 630,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "language"),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: lang,
                                        onChange: (event)=>setPrefs((current)=>({
                                                    ...current,
                                                    language: event.target.value
                                                })),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "zh-TW",
                                                children: "繁體中文"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 651,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "en",
                                                children: "English"
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 652,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 642,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 640,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "theme"),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: prefs.theme,
                                        onChange: (event)=>setPrefs((current)=>({
                                                    ...current,
                                                    theme: event.target.value
                                                })),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "dark",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "dark")
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 667,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "light",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "light")
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 668,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 658,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 656,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mode-badge",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "mode"),
                                    ": ",
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modeLabel"])(lang, mode)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 672,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 621,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 618,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "active-project",
                "data-testid": "active-project-banner",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "currentProject")
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 680,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: snapshot ? snapshot.name : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "noActiveProject")
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 681,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 679,
                        columnNumber: 9
                    }, this),
                    snapshot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "active-project-meta",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["modeLabel"])(lang, snapshot.mode)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 685,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "openTime"),
                                    ": ",
                                    formatOpenedAt(snapshot.openedAt, lang)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 686,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 684,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 678,
                columnNumber: 7
            }, this),
            loadState.stage !== "idle" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: `load-progress ${loadState.stage}`,
                "data-testid": "load-progress",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "load-progress-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "loadProgress")
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 696,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stageLabel"])(lang, loadState.stage),
                                    " · ",
                                    loadState.progressPercent,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 697,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 695,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "progress-track",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "progress-fill",
                            style: {
                                width: `${Math.min(100, Math.max(0, loadState.progressPercent))}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard-page.tsx",
                            lineNumber: 702,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 701,
                        columnNumber: 11
                    }, this),
                    loadState.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "progress-error",
                        children: loadState.error
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 707,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 694,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "recent",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "recentProjects")
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 712,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "recent-list",
                        children: recentProjects.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "muted",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "noRecentProjects")
                        }, void 0, false, {
                            fileName: "[project]/components/dashboard-page.tsx",
                            lineNumber: 715,
                            columnNumber: 13
                        }, this) : recentProjects.map((project)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "recent-item",
                                onClick: ()=>loadRecentProject(project),
                                children: project.name
                            }, project.id, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 718,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 713,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 711,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "sync-status",
                "data-testid": "sync-status",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sync-status-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "syncStatus")
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 733,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `sync-chip ${syncState.status}`,
                                children: syncStatusLabel
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 734,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 732,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: syncState.status === "error" ? "sync-error" : "sync-message",
                        children: syncMessage
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 736,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "muted",
                        children: [
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "lastSyncedAt"),
                            ": ",
                            formatOpenedAt(syncState.lastSyncedAt ?? Number.NaN, lang)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 737,
                        columnNumber: 9
                    }, this),
                    syncState.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "sync-error",
                        children: syncState.error
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 740,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 731,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "tabs",
                "aria-label": "main tabs",
                children: TABS.map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: activeTab === tab ? "tab active" : "tab",
                        onClick: ()=>setTab(tab),
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["tabLabel"])(lang, tab)
                    }, tab, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 745,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 743,
                columnNumber: 7
            }, this),
            !snapshot || !parsed ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "empty",
                children: "Open or import an OpenSpec project to start."
            }, void 0, false, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 757,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "content",
                children: [
                    mode === "fallback-readonly" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "warning",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "readonlyHint")
                    }, void 0, false, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 760,
                        columnNumber: 44
                    }, this),
                    activeTab === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "cards-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "stat-card",
                                        onClick: ()=>setTab("in-progress"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "inProgress")
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 766,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: parsed.stats.inProgress
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 767,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 765,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "stat-card",
                                        onClick: ()=>setTab("specs"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "specs")
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 770,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: parsed.stats.specs
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 771,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 769,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "stat-card",
                                        onClick: ()=>setTab("archived"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "archived")
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 774,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: parsed.stats.archived
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 775,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 773,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stat-card",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "stalled")
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 778,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: parsed.stats.stalled
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 779,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 777,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 764,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "controls-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "staleDays"),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: 1,
                                                value: prefs.staleDays,
                                                onChange: (event)=>setPrefs((current)=>({
                                                            ...current,
                                                            staleDays: Math.max(1, Number.parseInt(event.target.value, 10) || 1)
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 786,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 784,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "backupRetentionDays"),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                min: 1,
                                                value: prefs.backupRetentionDays,
                                                onChange: (event)=>setPrefs((current)=>({
                                                            ...current,
                                                            backupRetentionDays: Math.max(1, Number.parseInt(event.target.value, 10) || 1)
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 801,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 799,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 783,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "configEditor")
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 818,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "editor-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: configDraft,
                                        onChange: (event)=>setConfigDraft(event.target.value),
                                        spellCheck: false
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 820,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "preview",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            content: `\`\`\`yaml\n${configDraft}\n\`\`\``
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard-page.tsx",
                                            lineNumber: 826,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 819,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "actions-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleConfigSave,
                                        disabled: !configValidation.valid || !snapshot.writable,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "save")
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 831,
                                        columnNumber: 17
                                    }, this),
                                    saveMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ok",
                                        children: saveMessage
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 838,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 830,
                                columnNumber: 15
                            }, this),
                            configValidation.errors.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "validation",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "validationErrors")
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 843,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: configValidation.errors.map((error)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: error
                                            }, error, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 846,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 844,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 842,
                                columnNumber: 17
                            }, this),
                            configValidation.lintHints.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "validation",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "lintHints")
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 854,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: configValidation.lintHints.map((hint)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: hint
                                            }, hint, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 857,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 855,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 853,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 763,
                        columnNumber: 13
                    }, this),
                    activeTab === "specs" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel two-column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "specs"),
                                            " (",
                                            parsed.specs.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 868,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list",
                                        children: parsed.specs.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: selectedSpec === item.name ? "list-button active" : "list-button",
                                                    onClick: ()=>setSelectedSpec(item.name),
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard-page.tsx",
                                                    lineNumber: 874,
                                                    columnNumber: 23
                                                }, this)
                                            }, item.path, false, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 873,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 871,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 867,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "detail",
                                children: selectedSpecItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    content: selectedSpecItem.content
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-page.tsx",
                                    lineNumber: 887,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "muted",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "selectItem")
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-page.tsx",
                                    lineNumber: 889,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 885,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 866,
                        columnNumber: 13
                    }, this),
                    activeTab === "in-progress" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel two-column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "inProgress"),
                                            " (",
                                            parsed.inProgress.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 898,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list",
                                        children: parsed.inProgress.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "list-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: selectedInProgress === item.name ? "list-button active" : "list-button",
                                                        onClick: ()=>setSelectedInProgress(item.name),
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard-page.tsx",
                                                        lineNumber: 904,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "danger",
                                                        disabled: !snapshot.writable,
                                                        onClick: ()=>deleteChange("in-progress", item.name),
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "delete")
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard-page.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, item.name, true, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 903,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 901,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 897,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "detail",
                                children: selectedInProgressItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sub-tabs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: inProgressDetailTab === "tasks" ? "tab active" : "tab",
                                                    onClick: ()=>setInProgressDetailTab("tasks"),
                                                    children: [
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "tasks"),
                                                        " (",
                                                        selectedInProgressItem.taskSummary.done,
                                                        "/",
                                                        selectedInProgressItem.taskSummary.total,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/dashboard-page.tsx",
                                                    lineNumber: 928,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: inProgressDetailTab === "proposal" ? "tab active" : "tab",
                                                    onClick: ()=>setInProgressDetailTab("proposal"),
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "proposal")
                                                }, void 0, false, {
                                                    fileName: "[project]/components/dashboard-page.tsx",
                                                    lineNumber: 935,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/dashboard-page.tsx",
                                            lineNumber: 927,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            content: inProgressDetailTab === "tasks" ? selectedInProgressItem.tasks ?? "" : selectedInProgressItem.proposal ?? ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard-page.tsx",
                                            lineNumber: 943,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "muted",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "selectItem")
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-page.tsx",
                                    lineNumber: 952,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 924,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 896,
                        columnNumber: 13
                    }, this),
                    activeTab === "archived" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "panel two-column",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: [
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "archived"),
                                            " (",
                                            parsed.archived.length,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 961,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "list",
                                        children: parsed.archived.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "list-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: selectedArchived === item.name ? "list-button active" : "list-button",
                                                        onClick: ()=>setSelectedArchived(item.name),
                                                        children: item.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard-page.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "danger",
                                                        disabled: !snapshot.writable,
                                                        onClick: ()=>deleteChange("archived", item.name),
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "delete")
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/dashboard-page.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, item.name, true, {
                                                fileName: "[project]/components/dashboard-page.tsx",
                                                lineNumber: 966,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/dashboard-page.tsx",
                                        lineNumber: 964,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 960,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "detail",
                                children: selectedArchivedItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "sub-tabs",
                                            children: [
                                                "proposal",
                                                "design",
                                                "tasks",
                                                "specs"
                                            ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: archivedDetailTab === tab ? "tab active" : "tab",
                                                    onClick: ()=>setArchivedDetailTab(tab),
                                                    children: [
                                                        tab === "proposal" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "proposal"),
                                                        tab === "design" && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "design"),
                                                        tab === "tasks" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "tasks"),
                                                                " (",
                                                                selectedArchivedItem.taskSummary.done,
                                                                "/",
                                                                selectedArchivedItem.taskSummary.total,
                                                                ")"
                                                            ]
                                                        }, void 0, true),
                                                        tab === "specs" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "specs"),
                                                                " (+",
                                                                selectedArchivedItem.specSummary.added,
                                                                "/~",
                                                                selectedArchivedItem.specSummary.modified,
                                                                "/-",
                                                                selectedArchivedItem.specSummary.removed,
                                                                ")"
                                                            ]
                                                        }, void 0, true)
                                                    ]
                                                }, tab, true, {
                                                    fileName: "[project]/components/dashboard-page.tsx",
                                                    lineNumber: 990,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard-page.tsx",
                                            lineNumber: 988,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$markdown$2d$view$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            content: archivedDetailTab === "proposal" ? selectedArchivedItem.proposal ?? "" : archivedDetailTab === "design" ? selectedArchivedItem.design ?? "" : archivedDetailTab === "tasks" ? selectedArchivedItem.tasks ?? "" : selectedArchivedItem.specs ?? ""
                                        }, void 0, false, {
                                            fileName: "[project]/components/dashboard-page.tsx",
                                            lineNumber: 1014,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "muted",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["t"])(lang, "selectItem")
                                }, void 0, false, {
                                    fileName: "[project]/components/dashboard-page.tsx",
                                    lineNumber: 1027,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/dashboard-page.tsx",
                                lineNumber: 985,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/dashboard-page.tsx",
                        lineNumber: 959,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/dashboard-page.tsx",
                lineNumber: 759,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/dashboard-page.tsx",
        lineNumber: 617,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "VqcztEMhC1SiC6ZCOkYgfavxcsU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_c2526258._.js.map