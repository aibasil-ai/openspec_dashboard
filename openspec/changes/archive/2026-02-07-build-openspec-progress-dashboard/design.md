## Context

此變更要在 Next.js + TypeScript 專案中新增一個專注於 OpenSpec 開發追蹤的 Web 系統。系統需直接讀取本機專案資料夾中的 `openspec` 結構，並將變更狀態與 artifact 內容轉成可互動的 UI。主要限制為：

- 須支援本機資料夾開啟與多專案切換，需考慮權限與路徑有效性。
- 頁面需同時支援繁中/英文與深淺色主題。
- 大量內容需要 Markdown 呈現，且 `config.yaml` 需可編輯並保存。
- 需對進行中、規格、已封存資料提供一致分類、統計與刪除流程。

利害關係人為規格設計者、實作者與專案管理者，需求核心是快速掌握進度並降低手動查檔成本。

## Goals / Non-Goals

**Goals:**
- 建立統一資料層，將 `openspec/changes`、`openspec/changes/archive`、`openspec/specs`、`openspec/config.yaml` 解析成可供 UI 消費的模型。
- 建立四頁籤資訊架構（總覽、進行中、規格、已封存）與跨頁導覽行為。
- 建立細節檢視元件，支援多 artifact 分頁與 Markdown 顯示。
- 建立語系/主題偏好與最近開啟專案清單的持久化機制。
- 提供安全的刪除與儲存流程，並保持統計數據即時一致。

**Non-Goals:**
- 不實作遠端同步或多人即時協作。
- 不改變 OpenSpec CLI 行為與既有檔案格式定義。
- 不在此階段加入權限角色管理（RBAC）或審核流程。

## Decisions

### Decision: 採用「檔案掃描 + 衍生快取」雙層資料架構
- **選擇**：以 server-side API route 掃描檔案系統作為真實來源，並在前端維護衍生 view model（counts、status buckets、selected item detail）。
- **原因**：可保持與檔案系統一致，且避免每次切頁重掃所有內容。
- **替代方案**：僅前端直接掃描檔案（效能與安全風險較高）；建立完整資料庫（超出當前範圍）。

### Decision: 以路由查詢參數管理頁籤狀態
- **選擇**：使用 `?tab=overview|in-progress|specs|archived` 管理主頁籤，細節分頁以局部 state 管理。
- **原因**：可被分享與回復，且可直接由統計卡片導覽。
- **替代方案**：純 local state（無法深連結）；完整多頁路由（切換成本較高）。

### Decision: Markdown 內容採「唯讀渲染 + 受控編輯」策略
- **選擇**：一般內容採 Markdown renderer；`config.yaml` 使用文字編輯器 + Markdown 預覽雙欄。
- **原因**：兼顧閱讀與可編輯需求，避免對 YAML 做過度抽象造成資料遺失。
- **替代方案**：全 WYSIWYG 編輯（較重且對 YAML 不友善）；純文字模式（可讀性不足）。

### Decision: 偏好與最近專案資訊以本機儲存為主
- **選擇**：語系、主題、最近開啟專案使用 local storage 儲存，啟動時再套用。
- **原因**：實作簡單、符合單機工具情境。
- **替代方案**：儲存在專案檔案（會污染 repo）；使用後端 session（需額外基礎設施）。

### Decision: 刪除操作採軟確認與一致性刷新
- **選擇**：在進行中/已封存刪除前顯示確認，刪除後重新抓取受影響清單與總覽統計。
- **原因**：降低誤刪風險並確保顯示數據一致。
- **替代方案**：立即刪除無確認（風險高）；僅局部更新不重算（易產生不一致）。

## Risks / Trade-offs

- [Risk] 本機路徑存取在不同平台/瀏覽器能力差異大 → Mitigation：封裝統一檔案系統 adapter，先支援目標執行環境。
- [Risk] 大型專案掃描造成切頁延遲 → Mitigation：加入增量更新與快取失效策略（依檔案修改時間）。
- [Risk] Markdown 渲染可能帶來 XSS 風險 → Mitigation：啟用安全 sanitization 與受限渲染規則。
- [Risk] 刪除操作不可逆導致資料遺失 → Mitigation：增加二次確認並記錄操作提示，後續可擴充回收桶。
- [Trade-off] 使用查詢參數做頁籤管理增加 URL 複雜度 → Mitigation：封裝 tab router helper 降低維護成本。

## Migration Plan

1. 建立資料存取層與型別定義，完成 `openspec` 目錄掃描與分類。
2. 建立主框架與四頁籤 UI，先接上 mock view model 驗證互動。
3. 串接真實資料源，完成統計卡片、列表、細節與 Markdown 顯示。
4. 完成 `config.yaml` 編輯與儲存流程，加入基本錯誤處理。
5. 完成語系/主題/最近專案持久化與初始化流程。
6. 完成刪除流程與跨頁同步更新驗證。
7. 驗證核心使用情境後釋出。

Rollback 策略：以 feature flag 控制新 Dashboard，必要時可快速切回舊介面或僅保留唯讀模式。

## Resolved Decisions

- 本機資料夾開啟能力採 Browser File System Access API。
- Browser 支援策略：Chrome/Edge 109+ 為完整支援（可讀寫）；Safari 與 Firefox 採 fallback 模式（僅匯入/唯讀預覽，不提供直接寫回）。
- 「停滯中」判定規則需可配置（例如可設定 N 天未更新）。
- 刪除進行中/已封存項目需保留備份檔與操作日誌。
- 刪除備份檔保存期限與清理策略需可配置（預設保留 30 天，系統定期清理過期備份）。
- `config.yaml` 編輯需提供 schema 驗證與即時 lint 提示。

## Open Questions

- Safari/Firefox 的 fallback 模式是否需支援「下載後覆蓋上傳」以接近編輯體驗？
- 備份保留策略是否需提供專案級覆寫（例如高風險專案保留 90 天）？
