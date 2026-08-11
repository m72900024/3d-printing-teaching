# A04 依作品需求選擇線材 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新增進階 A04「依作品需求選擇線材」，以七張功能性圖解、Bambu Lab Wiki 材料依據與 MakerWorld 實際作品連結，教學習者依作品需求選擇 PLA、PETG、ABS、ASA、TPU、PC、PA 與 CF／GF 複合材料。

**Architecture:** 延續既有 `advanced-course-data.js` 資料驅動課程與 `advanced/03-support-settings.html` 頁面殼層。七張圖存為本地 3:2 WebP；MakerWorld 例子使用既有 `section.examples` 介面，並補齊靜態建置器對例子連結的輸出，確保停用 JavaScript 時連結仍存在。

**Tech Stack:** 靜態 HTML、CSS、原生 JavaScript、Node.js `node:test`、既有 `scripts/build-site.js`、內建圖像生成、GitHub Pages。

## Global Constraints

- 所有教學正文、圖片文字、替代文字與導覽使用繁體中文。
- A04 使用七張 1536×1024、3:2、功能性動漫教學圖；圖片完整顯示，不裁切文字或主要作品。
- 材料特性以 Bambu Lab Wiki 為依據；MakerWorld 僅作社群實際應用例子，不宣稱為官方性能或安全認證。
- 不提供跨品牌通用溫度、食品接觸、生物相容或安全承重認證。
- CF／GF 主圖只呈現功能件；噴嘴與 AMS 相容性僅在正文簡短提醒並連回官方資料，不製作獨立檢查表。
- 不修改初階 12 堂或 A01–A03 正文，只同步進階課程總數與導覽殼層。
- 保留使用者未追蹤的 `_修改紀錄.md`，不加入提交。

---

### Task 1: 定義 A04 靜態輸出回歸測試

**Files:**
- Modify: `tests/build-site.test.js`
- Test: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildSite({ rootDir, outputDir })` 回傳 `{ advancedCourseCount, htmlCount }`。
- Produces: A04 課程數量、正文、七張圖、Wiki 引用、MakerWorld 連結與四堂導覽的可執行驗收條件。

- [ ] **Step 1: 將進階課程測試擴充為四堂**

在既有進階課程測試中讀取 `advanced/04-filament-selection.html`，並加入下列斷言：

```js
const filament = fs.readFileSync(path.join(outputDir, "advanced/04-filament-selection.html"), "utf8");

assert.equal(result.advancedCourseCount, 4);
assert.equal(result.htmlCount, 18);
assert.match(overview, /A04[\s\S]*依作品需求選擇線材/);
assert.match(filament, /PLA[\s\S]*PETG[\s\S]*ABS[\s\S]*ASA[\s\S]*TPU[\s\S]*PC[\s\S]*PA/);
assert.match(filament, /CF／GF/);
assert.match(filament, /社群案例[\s\S]*不等於官方性能認證/);
assert.match(filament, /makerworld\.com\/en\/models\/139371/);
assert.match(filament, /makerworld\.com\/en\/models\/721613/);
assert.match(filament, /data-course-total="4"/);
assert.equal((filament.match(/GPT 教學圖解/g) || []).length, 7);
assert.ok((filament.match(/內容參考：Bambu Lab Wiki/g) || []).length >= 7);
```

將首頁與既有進階頁面的 `3` 堂斷言更新為 `4`，並加入七個 A04 圖檔：

```js
"advanced-a04": [
  "needs-six-questions.webp",
  "material-function-map.webp",
  "pla-petg-applications.webp",
  "abs-asa-applications.webp",
  "tpu-flexibility.webp",
  "pc-pa-engineering.webp",
  "cf-gf-functional-parts.webp"
]
```

- [ ] **Step 2: 執行聚焦測試確認先失敗**

Run: `node --test --test-name-pattern="advanced courses" tests/build-site.test.js`

Expected: FAIL，原因為 `advanced/04-filament-selection.html` 尚不存在或進階課程數仍為 3。

- [ ] **Step 3: 提交失敗測試**

```bash
git add tests/build-site.test.js
git commit -m "test: define advanced filament selection output"
```

---

### Task 2: 產生七張功能性教學圖與提示詞

**Files:**
- Create: `docs/image-prompts/advanced-a04-illustrations.md`
- Create: `assets/advanced-a04/illustrations/needs-six-questions.webp`
- Create: `assets/advanced-a04/illustrations/material-function-map.webp`
- Create: `assets/advanced-a04/illustrations/pla-petg-applications.webp`
- Create: `assets/advanced-a04/illustrations/abs-asa-applications.webp`
- Create: `assets/advanced-a04/illustrations/tpu-flexibility.webp`
- Create: `assets/advanced-a04/illustrations/pc-pa-engineering.webp`
- Create: `assets/advanced-a04/illustrations/cf-gf-functional-parts.webp`

**Interfaces:**
- Consumes: 設計規格中的七張「作品＋特性實驗＋短標籤」構圖。
- Produces: `advanced-course-data.js` 可引用的七個 1536×1024 WebP 相對路徑。

- [ ] **Step 1: 撰寫七組完整提示詞**

提示詞文件逐張指定：繁體中文、3:2、活潑動漫教室風、同一位教師角色、實際作品占主畫面、最多 4–6 個短標籤、不可放大段文字、不可放品牌商標或虛構性能數字。

- [ ] **Step 2: 生成並逐張檢查七張圖片**

使用內建圖像生成，確認每張圖的作品用途與特性：

```text
01 需求六問：室內、戶外、受熱、受力、彈性、外觀
02 材料功能地圖：同一需求如何導向不同材料候選
03 PLA／PETG：展示模型、收納、卡扣與韌性對照
04 ABS／ASA：耐熱外殼、戶外支架、日曬雨淋
05 TPU：保護套、腳墊、密封圈、壓縮與回彈
06 PC／PA：耐衝擊外殼、齒輪、鉸鏈與吸濕提醒
07 CF／GF：治具、支架、機器手臂零件與剛性對照
```

- [ ] **Step 3: 轉換為 WebP 並驗證尺寸**

Run: `for file in assets/advanced-a04/illustrations/*.webp; do identify -format '%f %wx%h\n' "$file"; done`

Expected: 七個檔案皆為 `1536x1024`。

- [ ] **Step 4: 提交圖像與提示詞**

```bash
git add assets/advanced-a04 docs/image-prompts/advanced-a04-illustrations.md
git commit -m "assets: add advanced filament application illustrations"
```

---

### Task 3: 實作 A04 課程、實例連結與四堂導覽

**Files:**
- Create: `advanced/04-filament-selection.html`
- Modify: `advanced-course-data.js`
- Modify: `scripts/build-site.js`
- Modify: `advanced/index.html`
- Modify: `advanced/01-filament-drying.html`
- Modify: `advanced/02-quality-diagnostics.html`
- Modify: `advanced/03-support-settings.html`
- Modify: `advanced.css`
- Modify: `index.html`
- Test: `tests/build-site.test.js`

**Interfaces:**
- Consumes: 七個 `../assets/advanced-a04/illustrations/*.webp` 路徑與既有 `section.examples` 欄位 `{ icon, label, title, body, why, source, sourceLabel }`。
- Produces: `window.COURSES` 第四筆 A04 資料、四堂進階導覽、可在 JavaScript 與靜態建置中開啟的 MakerWorld 連結。

- [ ] **Step 1: 補齊靜態建置器的實例連結輸出**

在 `scripts/build-site.js` 新增：

```js
function renderExamples(examples) {
  if (!Array.isArray(examples) || examples.length === 0) return "";
  return '<div class="example-grid">' + examples.map(example =>
    '<article class="example-card"><small>' + escapeHtml(example.label) + '</small>' +
    '<h3>' + escapeHtml(example.title) + '</h3>' +
    '<p>' + escapeHtml(example.body) + '</p>' +
    '<p class="example-why">' + escapeHtml(example.why) + '</p>' +
    '<a href="' + escapeHtml(example.source) + '" target="_blank" rel="noopener noreferrer">' +
    escapeHtml(example.sourceLabel) + ' ↗</a></article>'
  ).join("") + "</div>";
}
```

從 `supplements` 移除 `section.examples`，並在 `renderSection()` 的 supplements 後加入 `renderExamples(section.examples)`，避免例子重複輸出。

- [ ] **Step 2: 新增 A04 資料與七段課文**

在 `advanced-course-data.js` 新增 `id:"A04"`，設定：

```js
slug:"04-filament-selection.html",
stage:"材料應用",
stageNo:"A",
duration:"40 分鐘",
type:"情境判讀＋選材實作",
title:"依作品需求選擇線材"
```

七段依規格撰寫繁體中文正文、圖解、相對特性、限制、Wiki sources 與 MakerWorld example。每段至少一筆 `label:"內容參考：Bambu Lab Wiki｜…"`；社群卡必須包含「社群案例不等於官方性能認證」或同義提醒。

- [ ] **Step 3: 新增 A04 HTML 殼層並同步四堂數量**

複製 A03 殼層結構建立 A04，改為：

```html
<body class="course-page" data-course="A04" data-track="advanced" data-progress-key="three-d-advanced-course-chapters" data-course-total="4">
```

將 A01–A03 的 `data-course-total`、側欄 `4 ADVANCED COURSES` 與 `0 / 4` 同步更新。

- [ ] **Step 4: 更新首頁與進階總覽**

在 `advanced/index.html` 加入 A04 卡片，首頁改為「4 堂課已開放」，並以「材料狀態、品質診斷、支撐與選材」概括進階內容。在 `advanced.css` 新增 `.advanced-filament` 卡片背景，沿用現有卡片布局。

- [ ] **Step 5: 執行聚焦測試確認通過**

Run: `node --test --test-name-pattern="advanced courses" tests/build-site.test.js`

Expected: PASS，1 test、0 fail。

- [ ] **Step 6: 提交課程實作**

```bash
git add advanced-course-data.js scripts/build-site.js advanced.css advanced/index.html advanced/01-filament-drying.html advanced/02-quality-diagnostics.html advanced/03-support-settings.html advanced/04-filament-selection.html index.html tests/build-site.test.js
git commit -m "feat: add advanced filament selection course"
```

---

### Task 4: 完整驗證、瀏覽器驗收與 GitHub Pages 發布

**Files:**
- Verify: `tests/build-site.test.js`
- Verify: `_site/advanced/04-filament-selection.html`

**Interfaces:**
- Consumes: 完整 A04 實作與靜態建置輸出。
- Produces: 經桌機與 390×844 手機版驗收、合併並部署的公開 A04 網址。

- [ ] **Step 1: 執行完整測試與建置**

Run: `git diff --check && node --test tests/build-site.test.js && node scripts/build-site.js`

Expected: 8 tests pass、0 fail；建置顯示 12 堂初階、4 堂進階、18 個 HTML 頁面。

- [ ] **Step 2: 驗收本機桌機畫面**

在 `http://127.0.0.1:4173/advanced/04-filament-selection.html` 檢查：七張圖片 natural size 為 1536×1024、`object-fit: contain`、七組 Wiki 引用、七張 MakerWorld 實例卡與四堂導覽。

- [ ] **Step 3: 驗收 390×844 手機畫面**

確認 `document.documentElement.scrollWidth === innerWidth`、圖解完整顯示、實例卡單欄排列、課程選單可開啟，完成後重設瀏覽器 viewport。

- [ ] **Step 4: 發布至 GitHub**

推送 `agent/add-advanced-filament-selection`，建立 PR，等待檢查通過後合併；等待 `Deploy static site to Pages` 完成，再開啟：

```text
https://m72900024.github.io/3d-printing-teaching/advanced/04-filament-selection.html
```

- [ ] **Step 5: 公開頁面最終驗收**

確認公開頁面標題為「A04 依作品需求選擇線材」、七張圖片載入完成、MakerWorld 連結帶有 `target="_blank" rel="noopener noreferrer"`，並將公開頁保留在右側瀏覽器。
