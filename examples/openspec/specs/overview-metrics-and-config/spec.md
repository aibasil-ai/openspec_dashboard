## Purpose

定義 `overview-metrics-and-config` capability 的功能需求。

## Requirements

### Requirement: 總覽頁需顯示 OpenSpec 狀態統計
系統 SHALL 在總覽頁提供「進行中」「規格」「已封存」「停滯中」四個統計卡片，且數值 MUST 依目前專案即時計算。

#### Scenario: 首次載入總覽頁
- **WHEN** 使用者開啟已載入專案的總覽頁
- **THEN** 系統 MUST 顯示四個統計卡片與對應數值

### Requirement: 停滯中判定門檻需可配置
系統 MUST 提供停滯中判定門檻設定（例如 N 天未更新），並以設定值重算停滯中數量。

#### Scenario: 更新停滯門檻後重算統計
- **WHEN** 使用者將停滯門檻由 14 天改為 7 天
- **THEN** 系統 SHALL 立即更新停滯中統計卡片數值

### Requirement: 統計卡片需支援導覽
系統 MUST 允許使用者點擊「進行中」「規格」「已封存」三個統計卡片，並導覽至對應頁籤。

#### Scenario: 點擊規格統計卡片
- **WHEN** 使用者在總覽頁點擊「規格」統計卡片
- **THEN** 系統 SHALL 切換至「規格」頁籤

### Requirement: 系統需提供 config.yaml 的 Markdown 檢視與編輯
系統 SHALL 在總覽頁下方顯示 `openspec/config.yaml` 內容，並提供可編輯區塊與 Markdown 格式預覽。

#### Scenario: 編輯 config 內容
- **WHEN** 使用者更新 config 內容並儲存
- **THEN** 系統 MUST 寫回 `openspec/config.yaml` 並更新顯示結果

### Requirement: config.yaml 編輯需提供 schema 驗證與即時 lint 提示
系統 MUST 在 `config.yaml` 編輯過程提供 schema 驗證與即時 lint 診斷，並在不合法時阻止儲存。

#### Scenario: 儲存不合法 config
- **WHEN** 使用者嘗試儲存不符合 schema 的 `config.yaml`
- **THEN** 系統 SHALL 顯示錯誤位置與原因，且不得寫入檔案
