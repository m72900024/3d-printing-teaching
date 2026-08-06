# 2026-08-05 網站建置與修改細節

## 1. 專案目標

將 FDM 3D 列印內容整理成適合初學者的 GitHub Pages 教學網站，課程由淺入深，並符合以下原則：

- 一個課程一個分頁，避免全部內容擠在同一頁。
- 以圖解、動畫、漫畫和實際案例降低理解門檻。
- 中文說明放在網頁文字中，保持可讀性、可搜尋性與行動裝置適應性。
- 讓學習者從「第一次成功」逐步進入原理、調整與獨立完成作品。

## 2. 課程與網站架構

### 初始網站

建立首頁、全站樣式、互動程式、GitHub Pages 工作流程與 `.nojekyll`。網站以原生 HTML、CSS、JavaScript 製作，不需要額外建置工具。

### 獨立課程頁面

新增 `courses/01-introduction.html` 至 `courses/12-project.html`，並以以下共用檔案管理內容與畫面：

- `course-data.js`：課程文字、卡片、圖像與教學資料。
- `course.js`：課程頁面的產生、互動、動畫、進度與導覽。
- `course.css`：課程版面、圖片、動畫與手機響應式樣式。

課程完成狀態保存在瀏覽器的 `localStorage`，不會上傳個人學習資料。

## 3. 第一課修改過程

### 3.1 FDM 流程與逐層動畫

第一課加入線材從捲盤、送入擠出機、加熱、經噴嘴擠出，再逐層形成成品的流程圖解。

動畫最初只顯示有限數量的層，造成上方增加時下方消失。後續改為保留已完成的所有層，讓畫面符合 FDM 從底部向上持續累積的真實概念，並加入播放與重新播放控制。

### 3.2 案例、影片與閱讀版面

加入實際應用案例與教學影片區塊，並調整段落寬度、標題層級、卡片留白及內容順序，使長篇課程較容易掃讀。

### 3.3 學習目標插圖

四個學習目標分別使用獨立 WebP 圖片：

1. 加法製造的基本概念。
2. 線材從捲盤到成品的旅程。
3. FDM 與光固化的主要差異。
4. 判斷適合使用 3D 列印製作的物品。

圖片位於 `assets/course-01/goals/`。圖片只負責視覺提示，完整中文內容仍由 HTML 呈現，避免圖片內文字模糊或難以更新。

### 3.4 日系漫畫與傳統加工痛點

新增兩張教學漫畫：

- `assets/course-01/manga/additive-manufacturing-manga.webp`：以日系漫畫方式比較材料移除與逐層增加。
- `assets/course-01/manga/traditional-manufacturing-pain-points.webp`：說明開模前期成本、修改模具耗時，以及 CNC 切削材料、刀具路徑與複雜形狀限制。

第二張漫畫後續提高色彩飽和度，並把重點中文導讀放在圖片旁，方便教師投影與學生閱讀。

### 3.5 層紋、製程比較與應用判斷

第 04 至 07 段補充：

- 層紋是噴嘴擠出材料具有厚度所形成的自然製程特徵。
- 常見層高約 `0.08–0.28 mm`，實際範圍依噴嘴、機器與設定而異。
- FDM 使用熱塑性線材；光固化使用液態樹脂與光線成形，並需要手套、清洗及後固化。
- 3D 列印適合少量、客製、複雜形狀、原型與快速修改；大量相同的簡單物件通常應評估開模或其他量產方式。
- 教育、工程、生活與創作的常見案例，以及食品接觸、高溫受力、人身安全、戶外耐候等風險提醒。

## 4. 層紋實物比較圖

### 目的

讓學生實際看見「正常層紋」與「列印異常」不是同一件事，並能比較細層高與粗層高造成的表面差異。

### 產圖方式

使用 OpenAI 內建圖片生成功能製作寫實微距教學示意圖。這張圖是 AI 生成的實物風格示意圖，不是現場拍攝照片。

核心提示如下：

> Photorealistic macro educational studio image of FDM 3D-printed samples. Show three clear groups: a lime-green object with normal regular horizontal layer lines; two identical blue dome-shaped parts comparing fine and coarse layer heights; and an orange sample showing under-extrusion gaps, layer shift and partial delamination. Clean neutral background, soft studio lighting, high detail, no text, no logo, no watermark.

圖片處理結果：

- 網站檔案：`assets/course-01/layer-lines-realistic.webp`
- 尺寸：`1600 × 824 px`
- 檔案大小：約 `78 KB`
- 格式：WebP，兼顧清晰度與網頁載入速度。

### 網頁導讀

圖片下方以 HTML 分成三項說明：

- 左｜正常層紋：線條規律且連續，通常是正常製程痕跡。
- 中｜層高比較：細層高表面較平順，粗層高的階梯感更明顯。
- 右｜需要檢查：缺料縫隙、整層偏移或層間裂開屬於異常訊號。

## 5. 第 04 至 08 課圖文補充

為五個課程加入日系可愛漫畫圖解：

| 課程 | 圖片 | 教學重點 |
| --- | --- | --- |
| 04 模型檔案 | `assets/course-04/manga/model-files-detective.webp` | 辨認 STL、OBJ、3MF 與檔案檢查 |
| 05 切片軟體 | `assets/course-05/manga/slicer-workflow.webp` | 模型進入切片軟體後的設定流程 |
| 06 第一次列印 | `assets/course-06/manga/first-print-first-layer.webp` | 第一層附著與列印前確認 |
| 07 擺放方向 | `assets/course-07/manga/orientation-preview.webp` | 強度、支撐、表面與時間的取捨 |
| 08 參數調整 | `assets/course-08/manga/parameter-tradeoffs.webp` | 層高、速度、溫度與品質的關係 |

## 6. 驗證方式與結果

每次重要更新均依風險執行相應檢查：

- 使用 `node --check course-data.js` 與 `node --check course.js` 檢查 JavaScript 語法。
- 使用 `git diff --check` 檢查空白與差異格式。
- 以本機靜態伺服器開啟課程頁面，確認圖片、卡片與動畫載入。
- 桌機版確認沒有水平捲動，層紋圖片原始寬度正確讀取為 `1600 px`。
- 手機寬度 `390 px` 測試三欄說明會改成單欄，不會超出畫面。
- 合併 PR 後，在公開 GitHub Pages 再次確認 `.photo-study` 元件存在、圖片成功載入且版面無水平溢位。

## 7. 快取與發布

課程頁面的 CSS 與 JavaScript URL 使用版本參數。每次修改重要資源時提高版本號，避免瀏覽器繼續顯示舊快取。

發布流程：

1. 在獨立分支完成修改。
2. 檢查差異與語法。
3. 提交並推送到 GitHub。
4. 建立 Pull Request，留下修改目的與測試結果。
5. 合併到 `main`。
6. 由 `.github/workflows/pages.yml` 自動部署 GitHub Pages。
7. 在公開網址確認更新結果。

## 8. 對應提交紀錄

| Commit | 說明 |
| --- | --- |
| `f36a6a8` | 初始化專案籌備 |
| `3e48167` | 建立網站與 GitHub Pages |
| `6da5d3a` | 將 12 課改為獨立分頁 |
| `d1c7405` | 豐富第一課圖解與互動 |
| `08a8d6b` | 加入動畫播放控制 |
| `6de6c59` | 修正動畫由下往上堆疊 |
| `30cc193` | 加入真實案例與教學影片 |
| `9dd3d26` | 調整第一課閱讀版面 |
| `b98aaf9` | 改用 GPT 插畫呈現學習目標 |
| `04bf84f` | 加入第一課日系漫畫圖解 |
| `515df16` | 加入開模與 CNC 痛點漫畫 |
| `d9c2ad9` | 強化漫畫配色與中文導讀 |
| `069825e` | 豐富第 04 至 08 課圖文案例 |
| `b578b2c` | 補充第一課判讀與應用資料 |
| `1fb0dfa` | 加入層紋實物比較圖 |

Git 歷史保留每個版本的完整差異；本文件提供適合閱讀與教學交接的整理版本。
