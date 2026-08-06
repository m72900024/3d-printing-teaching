# 2026-08-06 FDM 與光固化影片補充

## 1. 修改目的

在第一課「FDM 與光固化有什麼不同？」加入可直接觀察的影片，協助初學者理解兩件事：

1. FDM 與光固化成品在層紋、細節和表面表現上的差異。
2. 光固化作品離開機器後，仍需要取件、清洗、乾燥與依材料要求後固化。

影片是輔助教材，原有比較表、安全提醒與延伸資料仍保留在頁面中。

## 2. 影片選擇

### 成品表面比較

- 標題：`Comparing Resolution: FDM vs SLA 3D Printers`
- 頻道：Formlabs
- YouTube ID：`BUR6Nyt7x_g`
- 網址：<https://www.youtube.com/watch?v=BUR6Nyt7x_g>
- 使用原因：短時間內直接並排呈現 FDM 層紋和 SLA 細節差異。
- 教學提醒：Formlabs 是 SLA 設備廠商，因此網頁明確提醒學生保留品牌立場，不把影片當作唯一比較依據。
- 觀看任務：觀察同一種細小特徵，在兩種製程中清楚度有何不同。

### 中文光固化操作示範

- 標題：`光固化 3D 列印機操作示範`
- 頻道：Teacher Xiao Huang／小黃老師
- YouTube ID：`QsiexLabCUA`
- 網址：<https://www.youtube.com/watch?v=QsiexLabCUA>
- 使用原因：以中文呈現樹脂列印、取件、清洗與後固化，有助於解釋光固化的列印後工作。
- 觀看任務：記下成品離開機器後，還要完成哪幾個步驟。

## 3. 網頁實作

### 資料

在 `course-data.js` 的第五段加入：

- `anchor: "fdm-resin-comparison"`，可直接連結到比較段落。
- `videoCompare`，保存區塊標題、導讀及兩支影片的 ID、標題、頻道、說明、觀看任務與外部連結。

### 顯示程式

在 `course.js` 新增通用的 `renderVideoCompare()`：

- 使用 `https://www.youtube-nocookie.com/embed/` 建立隱私強化播放器。
- iframe 使用描述性 `title`、延遲載入、嚴格來源政策與全螢幕支援。
- 每支影片保留「在 YouTube 開啟」連結；若嵌入播放受學校網路限制，仍可直接觀看原始頁面。
- 課程段落可使用資料中的 `anchor` 產生固定錨點。

### 版面

在 `course.css` 新增：

- 深色比較區塊，與原有延伸影片保持一致的視覺語言。
- 桌機使用兩欄影片卡片。
- 螢幕小於 `760 px` 時改為單欄。
- iframe 固定 `16:9` 比例，避免載入前後產生明顯版面跳動。
- 觀看任務使用獨立提示框，讓學生帶著問題觀看。

### 快取版本

`courses/01-introduction.html` 的 `course.css`、`course-data.js` 與 `course.js` 版本參數更新為 `20260806-01`，避免瀏覽器繼續使用前一天的快取。

## 4. 安全與來源處理

- 影片區塊下方保留液態與未完全固化樹脂的皮膚接觸、眼部防護、通風、溶劑加蓋與遠離火源等提醒。
- 保留 CDC／NIOSH 桌上型光固化安全圖解，以及 Formlabs 清洗與後固化流程連結。
- 影片來自外部頻道，網站不重新上傳、剪輯或複製影片內容，只使用 YouTube 嵌入播放器與原始連結。

## 5. 驗證結果

- `node --check course-data.js`：通過。
- `node --check course.js`：通過。
- `git diff --check`：通過。
- 本機頁面成功產生兩張影片卡片。
- 兩個 iframe 均使用 `youtube-nocookie.com`，並成功顯示 YouTube 播放按鈕。
- 桌機版兩欄顯示，頁面寬度與內容寬度一致，沒有水平溢位。
- 手機寬度 `390 px` 測試時改為單欄，頁面沒有水平溢位。
- `#fdm-resin-comparison` 可作為公開頁面的直接連結位置。

## 6. GitHub 紀錄

- 分支：`agent/add-fdm-resin-videos`
- Commit：`0217e87`，`加入 FDM 與光固化比較影片`
- Pull Request：`#18`，建立時為草稿，等待檢視與合併。
