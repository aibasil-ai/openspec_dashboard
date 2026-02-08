## Why

目前缺少一個可視化且可操作的 OpenSpec 專案管理介面，團隊難以快速掌握 change 在「進行中 / 規格 / 已封存 / 停滯」的實際狀態。現在建立網頁化追蹤系統，可讓規格推進、封存整理與跨語系協作更一致且可追蹤。

## What Changes

- 新增一個以 Next.js + TypeScript 實作的 OpenSpec 進度追蹤網頁系統，支援讀取本機專案中的 `openspec/` 結構與內容。
- 本機資料夾開啟流程以 Browser File System Access API 為主要能力，並處理授權流程。
- Browser 支援策略新增分級：Chrome/Edge 109+ 提供完整讀寫；Safari/Firefox 提供 fallback（匯入與唯讀預覽），並在 UI 顯示目前瀏覽器模式提示。
- 新增專案層操作能力：開啟本機資料夾、顯示與切換最近開啟專案。
- 新增應用層偏好能力：中英語系切換、深色/淺色主題切換。
- 新增四大頁籤：總覽、進行中、規格、已封存，並提供跨頁籤導覽。
- 在總覽頁提供統計卡片（進行中、規格、已封存、停滯中）與 `openspec/config.yaml` 檢視/編輯區。
- 新增「停滯中」可配置判定規則（例如超過 N 天未更新）。
- 統一以 Markdown 呈現可讀內容（含 config 與各項目的細節內容）。
- `config.yaml` 編輯流程新增 schema 驗證與即時 lint 提示。
- 在規格頁顯示規格總數、規格清單、點擊後下方內容預覽。
- 在已封存頁顯示已封存總數、封存清單、項目刪除、細節分頁（提案/設計/任務/規格），並顯示任務完成比與規格變更統計。
- 在進行中頁顯示進行中總數、清單、項目刪除、細節分頁（任務/提案）與 Markdown 內容預覽。
- 進行中與已封存刪除流程需保留備份檔與操作日誌。
- 備份檔保存期限與清理策略需可配置（預設 30 天並定期清理）。

## Capabilities

### New Capabilities
- `openspec-project-selection`: 提供本機 OpenSpec 專案資料夾開啟（Browser File System Access API）、跨瀏覽器 fallback、Chrome/Safari/Firefox 模式提示 UI、最近專案清單與切換能力。
- `overview-metrics-and-config`: 提供總覽統計卡片、停滯門檻設定、可編輯 `config.yaml` 區塊與 schema/lint 驗證，並可由統計卡片跳轉至對應頁籤。
- `change-list-and-detail-view`: 提供進行中、規格、已封存三類清單與點擊後 Markdown 細節檢視。
- `archive-and-inprogress-management`: 提供進行中與已封存項目的刪除、備份/日誌、保留策略與同步更新。
- `artifact-tabbed-inspection`: 提供項目細節分頁檢視（進行中：任務/提案；已封存：提案/設計/任務/規格）以及任務與規格統計顯示。
- `app-localization-and-theming`: 提供中英切換與深色/淺色主題切換，並可跨頁保留偏好設定。

### Modified Capabilities
- 無（目前 `openspec/specs/` 尚無既有 capability，無需修改既有需求）

## Impact

- 前端架構：新增多頁籤 Dashboard UI、狀態管理、Markdown render/editor 元件。
- 檔案系統整合：新增對本機 `openspec/config.yaml`、`openspec/changes/`、`openspec/changes/archive/`、`openspec/specs/` 的讀取與解析流程。
- 資料模型：新增 change 狀態分類、任務完成度統計、spec 新增/修改/刪除統計等 view model。
- 規則治理：新增停滯門檻配置、刪除備份/日誌策略與統計重算流程。
- 相容性治理：新增 Browser 能力分級與 fallback 行為定義。
- 使用者體驗：新增跨頁導覽、主題/語系偏好持久化、最近專案清單交互。
- 相依套件：可能引入 Markdown 顯示/編輯套件、YAML parser 與 config schema 驗證工具（視既有專案依賴而定）。
