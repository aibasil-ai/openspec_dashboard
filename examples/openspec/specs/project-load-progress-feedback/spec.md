## Purpose

定義專案開啟流程中的進度回饋規則，讓使用者可判斷載入是否持續進行與最終成功/失敗狀態。

## Requirements

### Requirement: 系統需在專案開啟流程顯示進度狀態
系統 MUST 在專案開啟流程顯示進度回饋，至少包含當前階段訊息（例如初始化、掃描、解析、完成）。

#### Scenario: 開啟流程中顯示階段進度
- **WHEN** 使用者觸發專案開啟或 fallback 匯入
- **THEN** 系統 SHALL 顯示目前載入階段並隨流程更新

### Requirement: 系統需提供可視化百分比或等價進度值
系統 SHALL 在載入過程提供百分比或等價進度值，讓使用者可判斷流程是否持續推進。

#### Scenario: 讀取多檔案時更新進度值
- **WHEN** 系統逐步讀取並解析專案檔案
- **THEN** 系統 MUST 以遞增方式更新進度值直到完成

### Requirement: 載入完成或失敗需顯示終態
系統 MUST 在流程結束時顯示成功或失敗終態，並停止進度更新。

#### Scenario: 載入成功
- **WHEN** 專案開啟流程完成且資料可用
- **THEN** 系統 SHALL 顯示完成狀態並隱藏進行中的載入指示

#### Scenario: 載入失敗
- **WHEN** 專案開啟流程中發生錯誤
- **THEN** 系統 SHALL 顯示失敗狀態與錯誤說明，且不再更新進度值

### Requirement: 進度回饋需同時適用於本機開啟與 fallback 匯入
系統 MUST 對本機開啟與 fallback 匯入流程提供一致的進度事件與 UI 顯示規則。

#### Scenario: 使用 fallback 匯入資料夾
- **WHEN** 使用者使用 fallback 匯入流程開啟專案
- **THEN** 系統 SHALL 顯示與本機開啟一致的進度欄位與終態行為
