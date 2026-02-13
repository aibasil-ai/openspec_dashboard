# OpenSpec Dashboard（中文版）

這個專案是一個以 `Next.js + TypeScript` 建置的 OpenSpec 進度儀表板，重點是把 OpenSpec 專案中的 `changes`、`specs`、`config.yaml` 轉成可視化、可操作的管理介面，方便你快速掌握專案現況。

目前程式主體位於專案根目錄，OpenSpec 資料與規格樣本位於 `examples/openspec/`（並保留 `openspec -> examples/openspec` 相容連結）。

---

## 1. 你可以用它做什麼

- 開啟本機 OpenSpec 專案資料夾並直接檢視內容
- 匯入資料夾做唯讀瀏覽（fallback 模式）
- 追蹤 `進行中 / 規格 / 已封存` 的清單與明細
- 在 `Overview` 一次看到：
  - 進行中變更數
  - 規格數
  - 已封存變更數
  - 停滯（stalled）項目數
- 編輯並儲存 `openspec/config.yaml`（可寫模式下）
- 自動驗證 YAML 格式、提供 lint 建議
- 監控 OpenSpec 相關檔案更新並自動同步（可寫模式下）
- 刪除變更資料夾時自動做備份與刪除紀錄（本機儲存）

---

## 2. 核心功能與行為

### 2.1 分頁與內容

- `Overview`
  - 統計卡片（可點擊切換到對應分頁）
  - `staleDays`、`backupRetentionDays` 參數調整
  - `config.yaml` 編輯器（左編輯、右 Markdown 預覽）
- `In Progress`
  - 顯示進行中 change 清單
  - 可查看 `tasks / proposal`
  - `tasks` 會顯示 `done/total`
  - 可刪除（限可寫模式）
- `Specs`
  - 顯示 `openspec/specs/*/spec.md` 清單
  - 支援 Markdown 渲染
- `Archived`
  - 顯示封存 change 清單
  - 可切換 `proposal / design / tasks / specs`
  - `tasks` 顯示完成度
  - `specs` 顯示 `+added / ~modified / -removed`
  - 可刪除（限可寫模式）

### 2.2 即時同步（Auto Refresh）

系統會定期輪詢 OpenSpec 相關檔案（預設約每 `1.8s`），透過檔案 `path + lastModified` 產生 fingerprint：

- 比對 fingerprint 是否變化
- 套用 debounce（避免短時間重複刷新）
- 若有變更，重新載入專案並保留目前上下文

監控範圍：

- `openspec/config.yaml`
- `openspec/changes/`
- `openspec/specs/`

### 2.3 刪除與備份策略

刪除 change 前，系統會先把該 change 下的檔案內容備份到本機儲存，並寫入刪除日誌：

- Backup records：存放刪除前檔案快照
- Delete logs：存放刪除事件（時間、路徑、專案）
- 依 `backupRetentionDays` 清理過期資料

> 注意：備份存於瀏覽器端儲存，會受瀏覽器容量限制。

---

## 3. 瀏覽器模式

### Full Read/Write（建議）

- Chrome 109+
- Edge 109+

特性：

- 可使用 File System Access API
- 可直接寫回 `config.yaml`
- 可刪除 change 資料夾
- 可啟用本機檔案變動自動同步

### Fallback Read-only（Safari/Firefox 等）

特性：

- 以資料夾匯入方式讀取
- 僅能唯讀瀏覽
- 不支援直接寫回或刪除
- 檔案更新需重新匯入

---

## 4. OpenSpec 資料結構需求

專案至少需包含 `openspec/`。建議結構如下：

```text
openspec/
  config.yaml
  changes/
    <change-name>/
      proposal.md
      design.md
      tasks.md
      specs/**/spec.md
    archive/
      <archived-change-name>/
        proposal.md
        design.md
        tasks.md
        specs/**/spec.md
  specs/
    <capability>/
      spec.md
```

解析重點：

- `tasks.md` 會計算 `- [x]` / `- [ ]` 完成度
- 封存規格會統計 `ADDED / MODIFIED / REMOVED Requirements` 區塊數
- `staleDays` 用於計算停滯項目

---

## 5. 技術架構

### 5.1 前端與框架

- `Next.js 16`
- `React 19`
- `TypeScript`

### 5.2 Markdown 與安全

- `react-markdown`
- `remark-gfm`
- `rehype-sanitize`（避免不安全 HTML 注入）

### 5.3 設定驗證

- `yaml` 解析
- `ajv` schema 驗證

### 5.4 本機資料儲存

- `localStorage`
  - 使用者偏好（語言、主題、門檻值）
  - 最近開啟專案
  - 刪除備份與刪除日誌
- `IndexedDB`（透過 `idb-keyval`）
  - 專案快照（recent project reload）

---

## 6. 專案目錄（重點）

```text
.
├─ README.md
├─ app/
├─ components/
├─ lib/
├─ openspec -> examples/openspec
├─ public/
├─ package.json
└─ examples/
   └─ openspec/
      ├─ config.yaml
      ├─ changes/
      └─ specs/
```

`lib/` 主要職責：

- `fs-access.ts`：開啟/匯入/重載/刪除/寫檔
- `openspec-parser.ts`：OpenSpec 檔案解析與統計
- `realtime-refresh.ts`：fingerprint 與 debounce 判定
- `config-validation.ts`：YAML schema 驗證 + lint hints
- `storage.ts`：偏好設定、快照、備份、刪除日誌

---

## 7. 開發環境需求

- Node.js：建議 `20.x` 以上（LTS）
- npm：建議 `10.x` 以上
- OS：macOS / Linux / Windows 皆可

---

## 8. 快速開始

```bash
npm install
npm run dev
```

啟動後開啟：`http://localhost:3000`

---

## 9. 常用指令

在專案根目錄下執行：

```bash
# 開發模式
npm run dev

# 正式建置
npm run build

# 啟動 build 後版本
npm run start

# Lint
npm run lint

# 測試（一次性）
npm run test

# 測試（watch）
npm run test:watch

# Vitest UI
npm run test:ui
```

---

## 10. 測試覆蓋重點

目前測試涵蓋（位於 `app/__tests__` 與 `lib/__tests__`）：

- 解析器：統計是否正確（tasks/specs summary）
- 設定驗證：YAML 與 schema 驗證
- 即時同步工具：fingerprint/debounce 判斷
- UI 互動：
  - 開啟專案
  - 載入進度
  - 分頁路由
  - config 儲存
  - 變更刪除
  - 檔案更新觸發同步

---

## 11. 操作建議流程

1. 使用 Chrome/Edge 開啟儀表板
2. 點選「開啟本機專案」並選擇專案根目錄
3. 在 `Overview` 確認統計與停滯數
4. 視需要調整 `staleDays`、`backupRetentionDays`
5. 在 `In Progress` 與 `Archived` 檢視細節
6. 需要時編輯 `config.yaml` 並儲存
7. 若要刪除變更，先確認備份保留策略

---

## 12. 常見問題（FAQ）

### Q1：為什麼我不能儲存或刪除？

你目前在唯讀模式（fallback）。請改用 Chrome/Edge，並以可寫模式開啟資料夾。

### Q2：載入失敗顯示缺少 OpenSpec 結構

請確認專案包含 `openspec/` 目錄，且路徑層級正確。

### Q3：為什麼同步狀態一直在待命？

待命代表正在監控；只有偵測到檔案變更時才會進入同步狀態。

### Q4：刪除後可以復原嗎？

目前會保存本機備份紀錄，但沒有 UI 一鍵還原功能；如需還原，需自行從備份資料流程擴充。

---

## 13. Git 版控提醒

本專案已設定 `.gitignore`，常見建置輸出（如 `.next/`、`coverage/`）會被忽略。若你在本機重新建置，不需要把產物提交到 Git。

---

## 14. 後續可擴充方向

- 備份還原 UI
- 團隊共用設定同步
- 更多 OpenSpec 規則驗證
- 自訂儀表板卡片與篩選器
- 匯出報表（CSV/JSON）

---

## 15. 給新同事的 5 分鐘上手指南

目標：5 分鐘內把專案跑起來、看懂主要頁面、確認本機開發環境正常。

### 0:00 - 1:30 先把專案跑起來

```bash
npm install
npm run dev
```

打開 `http://localhost:3000`，看到 Dashboard 首頁就完成第一步。

### 1:30 - 2:30 開啟 OpenSpec 專案資料

1. 先用 Chrome 或 Edge（可寫模式）。
2. 點「開啟本機專案」。
3. 選擇專案根目錄（包含 `openspec/` 的那層）。

如果你只是在 Safari/Firefox 測試，會進入唯讀模式，屬於正常行為。

### 2:30 - 3:30 先看三個關鍵分頁

1. `Overview`：確認統計卡片、`staleDays`、`backupRetentionDays`。
2. `In Progress`：確認進行中 change 與 `tasks` 完成度。
3. `Archived`：確認封存內容與 `specs` 變更摘要。

### 3:30 - 4:30 做一次基本驗證

在另一個終端機（專案根目錄）跑：

```bash
npm run lint
npm run test
```

兩者都通過，表示核心開發流程可用。

### 4:30 - 5:00 新同事第一天建議

1. 先不要改大型流程，先從 `lib/openspec-parser.ts` 與 `lib/fs-access.ts` 讀起。
2. 修改前先確認目前是 `Full Read/Write` 還是 `Fallback Read-only`。
3. 若要刪除 change，先檢查 `backupRetentionDays`，避免備份太快被清掉。
