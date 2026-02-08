## Context

目前系統已具備專案開啟與資料解析流程，但使用者在 UI 上無法即時辨識「目前作用中的專案」，且在大型專案開啟時缺少可視化進度，容易誤判為系統無回應。本次變更需跨越檔案存取層、狀態管理層與前端顯示層，為同一條開啟流程補上可追蹤的身份與進度資訊。

主要限制：
- 需同時支援本機可寫模式與 fallback 匯入唯讀模式。
- 進度資訊需能在成功、失敗、中斷時正確收斂。
- 不破壞既有 open/import API 入口與互動流程。

## Goals / Non-Goals

**Goals:**
- 在主畫面提供一致且顯眼的「目前開啟專案」識別資訊（名稱、模式、最後開啟時間）。
- 建立標準化的開啟進度狀態模型，支援階段訊息與百分比進度。
- 讓本機開啟與 fallback 匯入共用同一套進度事件介面。
- 在失敗情況提供清楚錯誤資訊，並保留最後成功開啟的專案狀態。

**Non-Goals:**
- 不調整 OpenSpec 檔案格式與目錄規則。
- 不新增背景同步或多使用者即時協作。
- 不在此變更實作進度持久化歷史查詢（僅即時顯示當次開啟流程）。

## Decisions

### Decision: 建立 `ProjectLoadState` 有限狀態模型
- **選擇**：使用 `idle -> initializing -> scanning -> parsing -> ready | error` 狀態流，並附帶 `progressPercent` 與 `message`。
- **原因**：可明確描述開啟流程，避免不同階段用布林旗標造成狀態衝突。
- **替代方案**：僅用 `isLoading` + `error`（資訊不足，無法呈現階段感）。

### Decision: 進度回報採「階段權重 + 檔案數估算」混合模式
- **選擇**：初始化、掃描、解析各分配固定權重；掃描與解析階段再依已處理檔案數計算細分百分比。
- **原因**：在未知總耗時情境下仍可提供穩定且可理解的進度。
- **替代方案**：純時間估算（誤差大）；僅階段文字無百分比（回饋不足）。

### Decision: 當前專案識別資訊獨立為 `ActiveProjectBanner` 元件
- **選擇**：以獨立元件顯示 `projectName`、`sourceType`、`browserMode`、`openedAt`。
- **原因**：可在所有頁籤一致呈現，並避免分散在各頁邏輯造成不一致。
- **替代方案**：僅在設定區顯示（可見性不足）。

### Decision: 開啟失敗不覆蓋既有專案快照
- **選擇**：僅在流程成功進入 `ready` 後才更新 `currentSnapshot`；失敗時保留既有快照並顯示錯誤。
- **原因**：可避免使用者因一次失敗操作失去目前工作上下文。
- **替代方案**：一開始即清空目前專案（失敗時體驗差）。

## Risks / Trade-offs

- [Risk] 進度百分比與實際耗時不完全一致 → Mitigation：同時顯示階段文字，降低百分比誤讀。
- [Risk] 大量檔案掃描導致 UI 更新過頻 → Mitigation：進度更新節流（例如 100ms 合併更新）。
- [Risk] fallback 模式與可寫模式進度事件不一致 → Mitigation：定義共用 `LoadProgressEvent` 型別並在兩流程共用 mapper。
- [Trade-off] 增加狀態模型與事件轉換層會提高初期複雜度 → Mitigation：保持狀態欄位最小集合並集中在單一 store。

## Migration Plan

1. 定義 `ProjectLoadState` 與 `LoadProgressEvent` 型別，接入現有專案開啟流程。
2. 在檔案掃描與解析函式加入進度 callback，回報階段與百分比。
3. 實作 `ActiveProjectBanner` 與 `LoadProgressBar` 元件並掛到主畫面頂部。
4. 串接錯誤收斂邏輯：失敗顯示訊息、保留舊快照、重設可重試狀態。
5. 驗證本機開啟與 fallback 匯入兩流程的進度與識別資訊一致性。

Rollback：若新進度流程造成穩定性問題，可暫時退回僅顯示 loading spinner 與目前專案名稱（保留資料層變更）。

## Open Questions

- 進度條顯示是否要包含「剩餘預估時間」？若需，需再定義估算策略。
- 當使用者中途取消開啟流程時，是否要記錄為可觀測事件（telemetry）？
