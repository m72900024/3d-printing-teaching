# A03「支撐與支撐介面設定」圖解提示詞

共通規格：`scientific-educational` 教學圖，1536×1024 橫式 3:2，活潑日系動漫課堂風格，粗黑漫畫線條、柔和 cel shading、亮米白背景、紫色／青綠／黃色重點色。畫面保留安全邊界，重要人物、模型、箭頭與文字不可貼近裁切邊緣。繁體中文大字必須逐字正確，只出現指定短標籤；不要簡體中文、日文、英文段落、品牌標誌、浮水印或密集小字。3D 印表機與 Bambu Studio 介面只做通用化教學示意，不複製商標或官方截圖。

## 1. `support-or-redesign.webp`

```text
Use case: scientific-educational
Asset type: 3D 列印課程段落圖解
Primary request: 教學生在開啟支撐前，先比較旋轉模型、橋接、倒角／分件與使用支撐。
Scene/backdrop: 明亮動漫 3D 列印教室，講師站在四格決策圖旁。
Subject: 同一個 L 形懸空模型的四種處理方式；旋轉後大面貼近平台、短跨距橋接、水平尖角改倒角或分件、最後才是下方有支撐的原方向。
Style/medium: 日系動漫教學海報，清楚的立體模型剖面與方向箭頭。
Composition/framing: 橫式四欄，左到右決策流程，所有內容留足邊界。
Text (verbatim): "先改方向", "橋接／倒角", "分件", "再用支撐"
Constraints: 文字逐字正確且每句只出現一次；支撐必須畫在懸空面下方；無商標、無浮水印。
Avoid: 簡體字、英文句子、錯誤支撐方向、細小密集文字。
```

## 2. `support-types.webp`

```text
Use case: scientific-educational
Asset type: 3D 列印課程段落圖解
Primary request: 對照一般支撐、樹狀支撐與手動支撐的適用形狀。
Scene/backdrop: 乾淨動漫切片教室，三座打印平台並排。
Subject: 第一座為大型平坦懸空面與規則柱狀一般支撐；第二座為角色曲面與分支狀樹狀支撐；第三座只在教師用筆指定的紅色局部產生支撐，旁邊另有遮蔽區。
Style/medium: 日系動漫科學圖解，模型與支撐使用不同顏色並有清楚輪廓。
Composition/framing: 橫式三欄等寬卡片，底部各一個大標籤。
Text (verbatim): "一般支撐", "樹狀支撐", "手動支撐"
Constraints: 文字逐字正確；樹狀分支從平台向上支撐曲面；無商標、無浮水印。
Avoid: 把一般支撐畫成樹狀、支撐穿過模型、簡體字、密集小字。
```

## 3. `threshold-preview.webp`

```text
Use case: scientific-educational
Asset type: 3D 列印課程段落圖解
Primary request: 解釋 Bambu Studio 臨界角度越大通常產生越多自動支撐，並強調每次都要看切片預覽。
Scene/backdrop: 動漫電腦教室，學生面前是三個通用切片預覽畫面。
Subject: 同一個斜坡模型以小、中、大三種臨界角度切片；支撐覆蓋由少到多，右側放大鏡檢查逐層預覽與支撐接觸位置。
Style/medium: 日系動漫資訊圖，角度弧線、支撐色塊和預覽圖例清楚。
Composition/framing: 左至右漸進三例，最右為大型預覽確認章。
Text (verbatim): "角度小", "角度大", "支撐較少", "支撐較多", "切片預覽確認"
Constraints: 箭頭清楚表達角度增加與支撐增加；文字逐字正確；無特定軟體商標、無浮水印。
Avoid: 把趨勢畫反、簡體字、英文 UI、小字參數表。
```

## 4. `interface-z-gap.webp`

```text
Use case: scientific-educational
Asset type: 3D 列印課程核心剖面圖
Primary request: 清楚區分支撐主體、支撐接觸面、模型與頂部 Z 距離，對照同材質下較大間距較好拆、較小間距底面較受承托但更黏。
Scene/backdrop: 乾淨米白科技教室背景，中央是放大的 3D 列印層線剖面。
Subject: 上方紫色模型、下方青色疏鬆支撐主體、最上方黃色緻密支撐接觸面；模型與接觸面之間用雙向箭頭標出垂直間隙。右側兩個放大鏡比較較大間距與較小間距。
Style/medium: 精準日系動漫科學剖面圖，層線清楚、箭頭醒目。
Composition/framing: 左側大剖面、右側上下兩個結果卡，所有標籤大且分離。
Text (verbatim): "模型", "支撐接觸面", "支撐主體", "頂部 Z 距離", "較好拆", "底面較完整", "可能更黏"
Constraints: 文字逐字正確；頂部 Z 距離箭頭只能位於接觸面頂部與模型底面之間；不提供固定毫米數字；無商標、無浮水印。
Avoid: 將層數、線距、Z 距離混成同一箭頭；簡體字；錯誤剖面；密集小字。
```

## 5. `support-test.webp`

```text
Use case: scientific-educational
Asset type: 3D 列印課程實驗流程圖
Primary request: 教學生用固定試片做支撐單一變因實驗，依序切片、只改一項、列印、冷卻拆除、評分與保存 3MF。
Scene/backdrop: 明亮動漫創客教室，學生與講師共同完成實驗紀錄。
Subject: 六步驟流程，固定 L 形支撐試片；切片記錄；一次只改一個滑桿；印表機列印；作品與平台旁有冷卻符號後再向外拆支撐；用四個大圖示評估底面、好拆度、材料、時間；最後存檔。
Style/medium: 日系動漫教學流程圖，粗線圖示與大編號。
Composition/framing: 橫式六步驟 S 型流程，箭頭清楚，人物手與工具保持安全姿勢。
Text (verbatim): "固定試片", "只改一項", "列印", "冷卻再拆", "比較結果", "保存 3MF"
Constraints: 文字逐字正確；拆除方向遠離手掌與臉部；無商標、無浮水印。
Avoid: 徒手拆熱件、工具朝向手掌、簡體字、額外英文、密集小字。
```
