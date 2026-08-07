# 第六課 A1 原創教學圖提示詞

本文件記錄第六課三張原創教學圖的用途、最終提示詞與內容參考來源。圖片使用 Codex 內建 `imagegen` 產生，再轉為 WebP；Bambu Lab Wiki 圖片未作為影像輸入、未下載進專案，也未被直接重製。

共同風格參考僅使用專案內既有圖片：

- `assets/course-05/manga/slicer-workflow.webp`：第五課的三段式流程、色彩與教室氣氛。
- `assets/course-06/manga/first-print-first-layer.webp`：第六課的學生、機器人、A1 配色與安全操作語言。

## 1. A1 列印前檢查

- 輸出：`assets/course-06/illustrations/a1-preflight.webp`
- 用途：第一個學習目標卡，以及「列印前檢查：先把條件固定」正文圖解。
- 內容參考：[Bambu Lab Wiki｜從 Bambu Studio 列印](https://wiki.bambulab.com/en/p1/manual/print-from-bambu-studio)

```text
Use case: scientific-educational
Asset type: 3:2 landscape teaching illustration for a beginner 3D-printing course website
Input images: Image 1 and Image 2 are style and character references only; generate a brand-new scene, do not edit or copy their compositions.
Primary request: Create an original three-part preflight-check illustration for a first print on a Bambu Lab A1-class open-frame bed-slinger 3D printer.
Scene/backdrop: warm bright maker classroom with cream paper texture.
Subject: the same cheerful student archetype with short dark hair, goggles on head, lime-green hoodie, plus the small dark-green teaching robot. Show three clear visual groups: (1) the A1 printer and empty correctly seated textured spring-steel build plate, (2) green PLA spool and a close-up 0.4 mm nozzle, (3) a computer slicer preview showing a small model ready to print with a standard layer profile. Use simple green check symbols and directional flow.
Style/medium: polished Japanese educational manga illustration, bold clean ink lines, warm cream background, deep forest green machinery, lime-green accents, orange and blue secondary markers, matching the provided course artwork.
Composition/framing: wide 3:2 canvas, three balanced panels or visual zones, readable when cropped to 16:10 for a goal card, important subjects centered with safe margins.
Constraints: mechanically plausible open-frame A1-style printer; textured plate clearly visible; student hands stay outside moving/hot areas; no long text, no UI copy that needs exact spelling, no brand logo, no watermark, no citation text. Avoid photorealism, clutter, illegible labels, duplicated fingers, unsafe gestures.
```

## 2. 四種第一層狀況

- 輸出：`assets/course-06/illustrations/first-layer-four-states.webp`
- 用途：第二個學習目標卡，以及「第一層判讀：看見地基再離開」正文圖解。
- 內容參考：[Bambu Lab Wiki｜辨認與修正第一層問題](https://wiki.bambulab.com/en/knowledge-sharing/identify-and-fix-first-layer-issues-with-a-test-print)

```text
Use case: scientific-educational
Asset type: 3:2 landscape diagnostic illustration for a beginner 3D-printing course website
Input images: Image 1 and Image 2 are style, palette, and character references only; generate a brand-new four-panel comparison, do not copy their layouts.
Primary request: Create an original four-panel close-up comparison of first-layer results on a textured spring-steel build plate for an A1-class FDM printer.
Required panels: (1) normal: evenly squished adjacent green filament lines with a smooth continuous rectangle; (2) nozzle too high: separated round strands with visible gaps and loose corners; (3) nozzle too low: overly flattened translucent-looking tracks, ridges, scraped waviness and material pushed sideways; (4) no adhesion: curling strand dragged by the nozzle and a loose spaghetti tangle.
Scene/backdrop: warm cream educational poster with four equal framed panels and small simple status icons only: green check for normal, orange caution for high and low, red pause for no adhesion.
Style/medium: polished Japanese educational manga infographic, bold clean ink lines, subtle paper grain, deep forest green machine parts, lime-green filament, orange and blue accents, matching the provided course art.
Composition/framing: wide 3:2 canvas, strict 2-by-2 grid, top-down or low oblique close-ups so filament geometry is large and unmistakable, safe margins for 16:10 cropping.
Constraints: physically plausible filament behavior; consistent build-plate texture and scale across all panels; one nozzle may appear above each sample but no hands near it; no long text, no letters, no brand logo, no watermark, no citation text. Avoid photorealism, clutter, tiny details, identical panels, unsafe hand placement.
```

## 3. 冷卻後安全取件

- 輸出：`assets/course-06/illustrations/cooled-removal-five-steps.webp`
- 用途：第三個學習目標卡，以及「完成後冷卻取件」正文五步驟圖解。
- 內容參考：[Bambu Lab Wiki｜列印完成後的取件與清潔](https://wiki.bambulab.com/en/filament-acc/acc/print-finish-adv)

```text
Use case: scientific-educational
Asset type: 3:2 landscape five-step safety illustration for a beginner 3D-printing course website
Input images: Image 1 and Image 2 are style, palette, and recurring-character references only; generate a brand-new five-panel sequence, do not edit or copy their compositions.
Primary request: Create an original five-step visual sequence for safely removing a finished PLA print from an A1-class textured spring-steel build plate.
Required sequence: (1) printer screen and status icon indicate the job is complete, print head parked and motion stopped; (2) student waits with hands away while a blue cooling symbol and fading heat waves show the plate cooling; (3) after cooling, student uses the front handle to lift the removable spring-steel plate away from the printer; (4) over a clear workbench, student gently flexes the plate with both hands and the small green print naturally releases; (5) student removes the loose skirt by hand and wipes the fully removed empty plate with a clean cloth according to classroom procedure.
Scene/backdrop: warm bright maker classroom with cream paper texture.
Style/medium: polished Japanese educational manga storyboard, bold clean ink lines, deep forest green A1-style machine, lime-green PLA object, orange and blue safety accents, same cheerful short-haired student with goggles and green hoodie, small dark-green teaching robot, matching the provided course art.
Composition/framing: wide 3:2 canvas, five numbered panels in a clear left-to-right then downward sequence, large actions readable at web size, strong arrows, safe margins for 16:10 cropping; keep the most important flex-and-release action near the center.
Constraints: every hand position anatomically plausible; no hands inside printer; print head visibly parked before plate handling; plate handled only after cooling; gentle flex not extreme bending; no scraper blade; no long text, no letters, no brand logo, no watermark, no citation text. Avoid photorealism, clutter, unsafe gestures, hot-touching, duplicated tools or fingers.
```
