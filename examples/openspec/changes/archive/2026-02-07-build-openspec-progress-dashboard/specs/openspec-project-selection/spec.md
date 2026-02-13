## ADDED Requirements

### Requirement: 使用者可以選擇本機 OpenSpec 專案資料夾
系統 MUST 提供資料夾選擇流程，讓使用者可指定本機專案根目錄並載入 `openspec/` 內容。

#### Scenario: 成功開啟有效專案資料夾
- **WHEN** 使用者在介面中選擇一個包含 `openspec/config.yaml` 的資料夾
- **THEN** 系統 SHALL 建立該資料夾的專案工作上下文並載入首頁資料

### Requirement: 資料夾開啟流程需使用 Browser File System Access API
系統 MUST 使用 Browser File System Access API 完成資料夾選取與讀寫授權，並處理拒絕授權狀況。

#### Scenario: 使用者拒絕授權
- **WHEN** 系統請求資料夾存取授權且使用者拒絕
- **THEN** 系統 SHALL 顯示授權失敗訊息並維持目前專案狀態

### Requirement: 系統需提供跨瀏覽器能力分級與 fallback
系統 MUST 對 Chrome/Edge 109+ 提供完整讀寫模式，並對不支援 File System Access API 的瀏覽器提供 fallback（匯入與唯讀預覽）。

#### Scenario: 在不支援 API 的瀏覽器開啟專案
- **WHEN** 使用者於 Safari 或 Firefox 開啟系統
- **THEN** 系統 SHALL 顯示 fallback 模式並限制為匯入與唯讀預覽流程



### Requirement: 系統需顯示瀏覽器模式提示 UI
系統 MUST 在專案開啟流程與設定區顯示目前瀏覽器模式（Chrome/Edge 完整讀寫模式、Safari/Firefox fallback 模式）。

#### Scenario: 以 Chrome 開啟系統時顯示模式提示
- **WHEN** 使用者在 Chrome 開啟系統並進入總覽頁
- **THEN** 系統 SHALL 顯示「完整讀寫模式」提示

#### Scenario: 以 Safari 開啟系統時顯示模式提示
- **WHEN** 使用者在 Safari 開啟系統並進入總覽頁
- **THEN** 系統 SHALL 顯示「fallback（匯入/唯讀）」提示

### Requirement: 系統需要驗證資料夾是否為有效 OpenSpec 專案
系統 MUST 在開啟流程中驗證必要結構，至少包含 `openspec/` 目錄。

#### Scenario: 使用者選擇非 OpenSpec 專案
- **WHEN** 使用者選擇的資料夾缺少 `openspec/` 目錄
- **THEN** 系統 SHALL 顯示錯誤訊息且不切換目前專案

### Requirement: 系統應顯示最近開啟專案並允許快速切換
系統 SHALL 保存最近開啟專案清單，並提供從清單中切換當前專案的能力。

#### Scenario: 從最近專案切換
- **WHEN** 使用者點擊最近開啟清單中的某個專案
- **THEN** 系統 MUST 載入該專案並更新頁面資料與頁籤內容
