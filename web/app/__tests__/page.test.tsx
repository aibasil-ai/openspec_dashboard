import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const hoisted = vi.hoisted(() => {
  let currentTab = "overview";
  const replaceMock = vi.fn((next: string) => {
    const url = new URL(next, "http://localhost");
    currentTab = url.searchParams.get("tab") ?? currentTab;
  });

  return {
    getCurrentTab: () => currentTab,
    setCurrentTab: (tab: string) => {
      currentTab = tab;
    },
    replaceMock,
    openDirectoryProjectMock: vi.fn(),
    reloadDirectoryProjectMock: vi.fn(),
    scanDirectoryFileStampsMock: vi.fn(),
    saveTextFileMock: vi.fn(),
    deleteChangeDirectoryMock: vi.fn(),
  };
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: hoisted.replaceMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === "tab" ? hoisted.getCurrentTab() : null),
    toString: () => `tab=${hoisted.getCurrentTab()}`,
  }),
}));

vi.mock("@/lib/browser-mode", () => ({
  detectBrowserMode: () => "chrome-full",
  isFileSystemAccessSupported: () => true,
}));

vi.mock("@/lib/fs-access", () => ({
  openDirectoryProject: hoisted.openDirectoryProjectMock,
  reloadDirectoryProject: hoisted.reloadDirectoryProjectMock,
  scanDirectoryFileStamps: hoisted.scanDirectoryFileStampsMock,
  importReadonlyProject: vi.fn(),
  saveTextFile: hoisted.saveTextFileMock,
  deleteChangeDirectory: hoisted.deleteChangeDirectoryMock,
}));

vi.mock("@/lib/storage", () => ({
  defaultPreferences: {
    language: "zh-TW",
    theme: "dark",
    staleDays: 14,
    backupRetentionDays: 30,
  },
  loadPreferences: () => ({
    language: "zh-TW",
    theme: "dark",
    staleDays: 14,
    backupRetentionDays: 30,
  }),
  savePreferences: vi.fn(),
  loadRecentProjects: () => [],
  saveRecentProjects: vi.fn(),
  putSnapshot: vi.fn(),
  getSnapshot: vi.fn(),
  deleteSnapshot: vi.fn(),
  loadBackups: () => [],
  saveBackups: vi.fn(),
  loadDeleteLogs: () => [],
  saveDeleteLogs: vi.fn(),
  cleanupExpiredBackups: vi.fn(),
}));

import Home from "@/components/dashboard-page";

const toStamps = (files: Record<string, { path: string; lastModified: number }>) =>
  Object.fromEntries(
    Object.values(files).map((file) => [file.path, { path: file.path, lastModified: file.lastModified }])
  );

const sampleSnapshot = {
  id: "p1",
  name: "demo",
  type: "filesystem",
  writable: true,
  mode: "chrome-full",
  openedAt: Date.now(),
  rootHandle: {} as FileSystemDirectoryHandle,
  files: {
    "openspec/config.yaml": {
      path: "openspec/config.yaml",
      content: "staleDays: 14\nbackupRetentionDays: 30\n",
      lastModified: Date.now(),
    },
    "openspec/specs/spec-a/spec.md": {
      path: "openspec/specs/spec-a/spec.md",
      content: "# Spec A",
      lastModified: Date.now(),
    },
    "openspec/changes/change-1/proposal.md": {
      path: "openspec/changes/change-1/proposal.md",
      content: "# Proposal 1",
      lastModified: Date.now(),
    },
    "openspec/changes/change-1/tasks.md": {
      path: "openspec/changes/change-1/tasks.md",
      content: "- [x] done\n- [ ] todo",
      lastModified: Date.now(),
    },
    "openspec/changes/archive/change-2/proposal.md": {
      path: "openspec/changes/archive/change-2/proposal.md",
      content: "# Archived Proposal",
      lastModified: Date.now(),
    },
    "openspec/changes/archive/change-2/tasks.md": {
      path: "openspec/changes/archive/change-2/tasks.md",
      content: "- [x] done",
      lastModified: Date.now(),
    },
  },
};

describe("dashboard page", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    hoisted.setCurrentTab("overview");
    hoisted.replaceMock.mockClear();
    hoisted.openDirectoryProjectMock.mockResolvedValue(sampleSnapshot);
    hoisted.reloadDirectoryProjectMock.mockResolvedValue(sampleSnapshot);
    hoisted.scanDirectoryFileStampsMock.mockResolvedValue(toStamps(sampleSnapshot.files));
    hoisted.saveTextFileMock.mockClear();
    hoisted.deleteChangeDirectoryMock.mockClear();
    vi.spyOn(window, "confirm").mockReturnValue(true);
  });

  it("shows active project after opening", async () => {
    render(<Home />);
    expect(screen.getByTestId("active-project-banner")).toHaveTextContent("尚未開啟專案");

    fireEvent.click(screen.getByRole("button", { name: "開啟本機專案" }));

    await waitFor(() => {
      expect(screen.getByTestId("active-project-banner")).toHaveTextContent("demo");
    });
  });

  it("shows load progress while opening project", async () => {
    hoisted.openDirectoryProjectMock.mockImplementation(
      (onProgress?: (event: { stage: string; progressPercent: number; message: string }) => void) =>
        new Promise((resolve) => {
          setTimeout(() => {
            onProgress?.({ stage: "scanning", progressPercent: 45, message: "scan" });
            resolve(sampleSnapshot);
          }, 20);
        })
    );

    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "開啟本機專案" }));

    expect(screen.getByTestId("load-progress")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("active-project-banner")).toHaveTextContent("demo");
    });
  });

  it("routes from overview cards", async () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "開啟本機專案" }));

    await waitFor(() => {
      expect(screen.getByText("進行中")).toBeInTheDocument();
    });

    fireEvent.click(screen.getAllByRole("button", { name: "規格" })[0]);
    expect(hoisted.replaceMock).toHaveBeenCalled();
  });

  it("saves config", async () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "開啟本機專案" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "儲存" })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "儲存" }));

    await waitFor(() => {
      expect(hoisted.saveTextFileMock).toHaveBeenCalled();
    });
  });

  it("deletes change from in-progress tab", async () => {
    hoisted.setCurrentTab("in-progress");
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "開啟本機專案" }));

    await waitFor(() => {
      expect(screen.getByText("change-1")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "刪除" }));

    await waitFor(() => {
      expect(hoisted.deleteChangeDirectoryMock).toHaveBeenCalledWith({}, "in-progress", "change-1");
    });
  });

  it("auto refreshes on file updates and keeps context", async () => {
    const updatedSnapshot = {
      ...sampleSnapshot,
      files: {
        ...sampleSnapshot.files,
        "openspec/changes/change-1/tasks.md": {
          path: "openspec/changes/change-1/tasks.md",
          content: "- [x] done\n- [x] todo",
          lastModified: Date.now() + 3_000,
        },
        "openspec/changes/change-3/proposal.md": {
          path: "openspec/changes/change-3/proposal.md",
          content: "# Proposal 3",
          lastModified: Date.now() + 3_100,
        },
      },
    };

    hoisted.scanDirectoryFileStampsMock
      .mockResolvedValueOnce(toStamps(sampleSnapshot.files))
      .mockResolvedValue(toStamps(updatedSnapshot.files));
    hoisted.reloadDirectoryProjectMock.mockResolvedValue(updatedSnapshot);

    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "開啟本機專案" }));

    fireEvent.click(screen.getByRole("button", { name: "進行中" }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "提案" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "change-1" })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "提案" }));
    expect(screen.getByRole("button", { name: "提案" })).toHaveClass("active");
    expect(screen.getByRole("button", { name: "change-1" })).toHaveClass("active");

    await waitFor(() => {
      expect(hoisted.reloadDirectoryProjectMock).toHaveBeenCalled();
    }, { timeout: 4_000 });

    await waitFor(() => {
      expect(screen.getByText("change-3")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "提案" })).toHaveClass("active");
      expect(screen.getByRole("button", { name: "change-1" })).toHaveClass("active");
      expect(screen.getByRole("button", { name: "進行中" })).toHaveClass("active");
      expect(screen.getByTestId("sync-status")).toHaveTextContent("已同步");
    });
  }, 12_000);
});
