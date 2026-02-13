## ADDED Requirements

### Requirement: 規格頁需顯示規格數量與規格清單
系統 SHALL 在規格頁顯示規格總數並列出現有規格項目。

#### Scenario: 進入規格頁
- **WHEN** 使用者切換到規格頁
- **THEN** 系統 MUST 顯示規格總數與規格項目列表

### Requirement: 規格項目需可點擊並顯示 Markdown 內容
系統 MUST 允許點擊規格項目，並在下方顯示該項目內容的 Markdown 呈現。

#### Scenario: 點擊某個規格項目
- **WHEN** 使用者點擊規格列表中的任一項目
- **THEN** 系統 SHALL 在下方顯示對應內容且以 Markdown 格式渲染

### Requirement: 進行中與已封存頁需具備一致的清單與細節框架
系統 SHALL 對進行中與已封存項目提供列表、選取與下方內容顯示區，且內容 MUST 支援 Markdown 呈現。

#### Scenario: 點擊進行中項目
- **WHEN** 使用者在進行中頁點擊某個項目
- **THEN** 系統 MUST 在下方細節區顯示該項目的可讀內容

