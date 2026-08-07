# 第 8–12 課圖解深化設計

## 目標

依照第六課完成版的模式，將第 8–12 課擴充成可直接教學的完整單元。每課製作三張原創教學圖解，分別出現在課程首頁的三個學習目標卡，以及三個對應正文單元；所有圖解都附 Bambu Lab Wiki 內容參考標示，完整生圖提示詞一併提交至 GitHub。

## 範圍

- 第 8 課：品質、強度與時間
- 第 9 課：支撐與平台附著
- 第 10 課：認識列印材料
- 第 11 課：系統化問題排除
- 第 12 課：維護與成果挑戰
- 每課三張全新 WebP，共十五張。
- 深化既有三個正文單元，使文字、比較表、步驟與圖解互相對應。
- 不下載、不熱連結、不重製 Bambu Lab Wiki 圖片；官方頁面只作內容參考。

## 教學與圖解配置

### 第 8 課：品質、強度與時間

1. 比較 0.12、0.20、0.28 mm 層高的表面、層數與時間。
2. 比較增加外殼與提高填充的效果，避免「填充 100% 才最強」的單一答案。
3. 用相同模型建立一次只改一個參數的切片實驗紀錄。

官方參考：Layer height、Slicing Parameter Table、How to Create Custom Preset。

### 第 9 課：支撐與平台附著

1. 以同一模型比較改變方向、橋接與支撐三種選擇。
2. 比較一般支撐與樹狀支撐的接觸、材料與拆除情境。
3. 比較 Skirt、Brim、Raft 的用途與成本。

官方參考：Auto Orientation、Slow Down for Overhangs、Brim、Brim Ears。

### 第 10 課：認識列印材料

1. 以室內模型、耐水功能件與戶外／耐熱件比較 PLA、PETG、ABS／ASA。
2. 依 A1、P1S、通風與封閉環境做材料配對；不把開放式 A1 當作 ABS／ASA 初學教學機。
3. 呈現線材受潮症狀、密封保存與依官方建議乾燥的流程。

官方參考：PLA Usage Guide、PETG Usage Guide、ABS / ASA / PC Usage Guide、Filament Drying Recommendations、Filament Guide Material Table。

### 第 11 課：系統化問題排除

1. 將症狀分成第一層、表面／出料、結構／支撐三類。
2. 固定使用「觀察症狀、列原因、先檢查、只改一項、重新測試」五步驟。
3. 用拉絲、堵塞、翹曲與支撐面粗糙示範排查路徑，危險或需拆機的工作交由教師處理。

官方參考：Print Quality Problems and Solutions、How to Avoid Nozzle Clogs、Printed Model Warping、First Layer Not Sticking。

### 第 12 課：維護與成果挑戰

1. 區分學生可執行的清潔／保存與需由教師執行的熱端、拆機、電氣維護。
2. 建立列印前十項檢核與開始後第一層確認。
3. 建立結業作品的用途、尺寸、材料、方向、參數、測試與發表流程。

官方參考：A1 Maintenance and How To Guides、Build Plates Overview、Project Based Workflow、Work After Printing Finished。

## 視覺方向

- 延續第五、六課既有日系教學漫畫語言：奶油紙張底色、森林綠機器、萊姆綠重點、橘色警示、藍色冷卻／資訊符號。
- 使用短髮、護目鏡、綠色連帽衣學生與深綠小型教學機器人作為系列角色。
- 3:2 橫式構圖，重要內容置於 16:10 安全裁切範圍。
- 圖內避免依賴長文字；用清楚的步驟數字、狀態符號、箭頭與可辨識的材料／模型差異傳達資訊。
- 不出現商標、水印、官方 UI 複製品或危險操作姿勢。

## 資料與呈現方式

- `course.js` 的 `goalArtByCourse` 增加第 8–12 課，每課三張圖片。
- `course-data.js` 每課三個 section 各增加一個 `manga` 物件，標籤固定為「GPT 教學圖解」。
- 每個 section 使用 `sources` 放置「內容參考：Bambu Lab Wiki｜…」連結。
- `course.css` 為第 8–12 課提供與第六課相同的桌機三欄、平板／手機單欄目標卡，圖片必須完整收在卡片內且頁面不得橫向溢位。
- `docs/image-prompts/` 每課一份提示詞文件，記錄三張圖的用途、最終提示詞、輸出路徑與來源網址。

## 驗證標準

- 十五張 WebP 全部存在於 `assets/course-08/illustrations/` 至 `assets/course-12/illustrations/`。
- 每張圖都在相應目標卡與正文各被引用一次。
- `course-data.js` 新增十五個「GPT 教學圖解」與十五組 Bambu Lab Wiki 參考標示。
- 靜態建置成功，既有測試與新增圖解契約測試全部通過。
- 第 8–12 課在桌機 1354×868 與手機 390×844 實際檢查，圖片無破圖、無卡片溢位、頁面無橫向捲動。
- 分支推送後更新既有 PR 的標題與說明，列出五課、十五張圖、提示詞文件與驗證結果。

## 非目標

- 不重構其他課程資料架構。
- 不刪除與本次任務無關的既有圖片或樣式。
- 不新增登入、後端、動畫框架或額外套件。
