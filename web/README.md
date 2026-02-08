# OpenSpec 進度儀表板（Web）

這是一個以 `Next.js + TypeScript` 開發的 OpenSpec Web 儀表板，目的在於把 OpenSpec 的檔案結構轉成可視化資訊，讓你快速掌握規格、變更、封存與設定狀態。

> 若你想看整個 repo 的說明，請先看根目錄 `README.md`。

---

## 1. 功能總覽

本應用可從 OpenSpec 專案讀取以下資料來源：

- `openspec/config.yaml`
- `openspec/changes/*`
- `openspec/changes/archive/*`
- `openspec/specs/*/spec.md`

並提供：

- 統計卡片（進行中 / 規格 / 已封存 / 停滯）
- 分頁式細節檢視（Overview / In Progress / Specs / Archived）
- Markdown 內容渲染
- `config.yaml` 編輯、預覽、驗證與儲存
- 最近開啟專案快速切換
- 多語系切換（繁中 / English）
- 主題切換（深色 / 淺色）
- 刪除 change（僅可寫模式）
- 刪除前本機備份 + 刪除紀錄
- 自動偵測檔案變更並同步（可寫模式）

---

## 2. 執行模式

### 2.1 可寫模式（推薦）

適用瀏覽器：

- Chrome 109+
- Edge 109+

特性：

- 使用 File System Access API 直接讀寫本機資料夾
- 可儲存 `config.yaml`
- 可刪除變更資料夾
- 可啟用檔案異動自動同步

### 2.2 唯讀模式（Fallback）

適用瀏覽器：

- Safari
- Firefox
- 其他不支援 `showDirectoryPicker` 的環境

特性：

- 透過「匯入資料夾」讀取檔案
- 只能檢視，無法寫回 / 刪除
- 本機檔案更新後需重新匯入

---

## 3. 介面說明

### 3.1 Header / Toolbar

- `開啟本機專案`
- `匯入資料夾（唯讀）`
- 語言切換
- 主題切換
- 瀏覽器模式顯示

### 3.2 Current Project 區塊

- 顯示目前開啟專案名稱
- 顯示開啟時間
- 顯示模式（full / fallback）

### 3.3 Load Progress 區塊

載入流程大致分為：

- initializing
- scanning
- parsing
- ready / error

### 3.4 Sync Status 區塊

狀態包含：

- idle（待命）
- syncing（同步中）
- success（已同步）
- error（同步失敗）

顯示最近同步時間，並在錯誤時提供提示訊息。

---

## 4. 分頁行為

### 4.1 Overview

- 顯示四張統計卡
- 調整 `staleDays`（停滯判斷天數）
- 調整 `backupRetentionDays`（備份保留天數）
- `config.yaml` 編輯器 + Markdown 預覽
- 儲存前執行 YAML/schema 驗證

### 4.2 In Progress

- 顯示 `openspec/changes/<change>/`
- 可看 `tasks` 與 `proposal`
- `tasks` 顯示 `done/total`
- 可刪除（可寫模式）

### 4.3 Specs

- 顯示 `openspec/specs/*/spec.md`
- 以 Markdown 檢視規格內容

### 4.4 Archived

- 顯示 `openspec/changes/archive/<change>/`
- 可看 `proposal / design / tasks / specs`
- 顯示任務完成度與規格差異摘要
- 可刪除（可寫模式）

---

## 5. OpenSpec 解析邏輯（摘要）

### 5.1 任務完成度

從 `tasks.md` 計算：

- `- [x]` 或 `- [X]`：已完成
- `- [ ]`：未完成

輸出 `done/total`。

### 5.2 規格差異摘要

從封存變更內的 specs Markdown 統計標題數：

- `## ADDED Requirements`
- `## MODIFIED Requirements`
- `## REMOVED Requirements`

輸出 `added / modified / removed`。

### 5.3 停滯項目（stalled）

以 `in-progress` 項目的最後更新時間對照 `staleDays` 判定。

---

## 6. 即時同步機制

監控範圍：

- `openspec/config.yaml`
- `openspec/changes/`
- `openspec/specs/`

機制：

1. 週期性掃描檔案時間戳
2. 產生 fingerprint（path + lastModified）
3. 比對與上次 fingerprint 是否不同
4. 套用 debounce
5. 重新讀取專案並刷新畫面

---

## 7. 本機儲存資料

### 7.1 localStorage

- 使用者偏好（語言、主題、天數）
- 最近專案清單（最多 8 筆）
- 刪除備份資料
- 刪除操作日誌

### 7.2 IndexedDB（idb-keyval）

- 專案快照（供 recent project 快速載入）

---

## 8. 開發環境需求

- Node.js `20+`（建議）
- npm `10+`（建議）

---

## 9. 快速啟動

```bash
cd web
npm install
npm run dev
```

開啟：`http://localhost:3000`

---

## 10. 指令列表

```bash
# 開發模式
npm run dev

# 正式建置
npm run build

# 啟動正式版
npm run start

# ESLint
npm run lint

# 單次測試
npm run test

# 持續測試
npm run test:watch

# Vitest UI
npm run test:ui
```

---

## 11. 測試內容

現有測試涵蓋：

- OpenSpec 解析器（統計與清單）
- config 驗證（YAML + schema）
- 即時同步工具（fingerprint / debounce）
- Dashboard UI 互動流程：
  - 開啟專案
  - 載入進度顯示
  - 分頁切換
  - 儲存 config
  - 刪除 change
  - 檔案變更自動同步

---

## 12. 常見問題

### Q1：儲存按鈕不能按

原因通常是：

- `config.yaml` 驗證未通過，或
- 目前是唯讀模式

### Q2：開啟資料夾後顯示結構錯誤

請確認資料夾內有 `openspec/` 根目錄。

### Q3：為何無法刪除 change

刪除只在可寫模式可用；fallback 匯入模式不支援。

---

## 13. 建議工作流程

1. 用 Chrome/Edge 開啟 app
2. 開啟本機 OpenSpec 專案
3. 在 Overview 檢查整體健康度
4. 在 In Progress 追任務完成度
5. 在 Archived 回顧規格差異
6. 必要時調整 config 並儲存
7. 定期檢查 stalled 與備份保留策略

---

## 14. 後續擴充建議

- 備份還原 UI
- 自訂卡片排序與篩選
- 匯出報表（CSV/JSON）
- 與外部系統整合（如 issue tracker）

