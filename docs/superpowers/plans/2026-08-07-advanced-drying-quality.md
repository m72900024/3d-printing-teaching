# Advanced Drying and Quality Courses Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 發布兩堂獨立進階課 A01「線材乾燥與保存」與 A02「品質問題診斷」，包含十張繁體中文動漫圖解、Bambu Lab Wiki 引用、靜態內容與獨立進度。

**Architecture:** 新增獨立 `advanced-course-data.js` 與 `advanced/` 路由，但沿用既有 `course.js`、`course.css`、手機選單與建置渲染器。透過頁面資料屬性設定進階進度鍵與總數，並讓共用課程渲染器優先讀取課程資料內的 `goalArt`，避免複製整套課程程式。

**Tech Stack:** HTML5、CSS、原生 JavaScript、Node.js `node:test`、既有靜態建置程式、Codex 內建圖片生成工具、WebP。

## Global Constraints

- 現有 12 堂初階課程內容、網址與 `three-d-course-chapters` 進度不變。
- 進階課程使用 `A01`、`A02` 與獨立 `three-d-advanced-course-chapters` 進度。
- 所有新增介面、教材、圖中文字與替代文字使用繁體中文。
- 每堂課製作五張原創圖解，共十張；不直接複製 Bambu Lab Wiki 圖片。
- 每個正文圖解附近標示「GPT 教學圖解」與相應 Bambu Lab Wiki 官方來源。
- A01 必須明確說明 A1／A1 mini 不可使用機器熱床乾燥線材，不提供繞過方式。
- A02 必須包含熱蠕變／熱堆積與 A1、P1S 散熱案例。
- 電氣、加熱平台、感測器或需專業量測的故障只教停機、紀錄與尋求支援。
- 關閉 JavaScript 時仍可閱讀完整核心正文、圖解、來源與前後導覽。

---

## File Map

- `tests/build-site.test.js`：驗證進階路由、靜態內容、十張圖、來源、安全提醒與獨立進度設定。
- `tests/advanced-progress.test.js`：驗證進階總覽的完成狀態與 `0 / 2` 計算。
- `advanced-course-data.js`：只保存 A01、A02 的內容、圖解、任務與來源。
- `advanced/index.html`：進階課程總覽與兩堂課入口。
- `advanced/01-filament-drying.html`、`advanced/02-quality-diagnostics.html`：沿用課程頁骨架的進階頁面。
- `advanced-app.js`：讀取進階完成狀態並更新總覽卡與進度。
- `advanced.css`：進階總覽專用版面，不污染課程正文樣式。
- `course.js`：支援資料驅動 `goalArt`、進度鍵與總數。
- `course.css`：支援 `data-track="advanced"` 的五張目標卡。
- `scripts/build-site.js`：建置第二套課程資料、靜態圖解與進階前後導覽。
- `index.html`、`styles.css`：將首頁進階卡改為可操作的兩堂課入口。
- `assets/advanced-a01/illustrations/*.webp`、`assets/advanced-a02/illustrations/*.webp`：十張原創圖解。
- `docs/image-prompts/advanced-a01-illustrations.md`、`docs/image-prompts/advanced-a02-illustrations.md`：十組最終提示詞。

### Task 1: Define the advanced publishing contract

**Files:**
- Modify: `tests/build-site.test.js`
- Create: `tests/advanced-progress.test.js`

**Interfaces:**
- Consumes: `buildSite({ rootDir, outputDir })` 與將建立的 `setupAdvancedProgress({ document, storage })`。
- Produces: 進階路由、內容、資產、引用及獨立進度的失敗測試。

- [ ] **Step 1: Add a failing build test**

在 `tests/build-site.test.js` 加入：

```js
test("publishes two advanced courses with static art and Bambu Wiki sources", () => {
  const { outputDir, result } = buildTemporarySite("3d-course-advanced-path-");
  const overview = fs.readFileSync(path.join(outputDir, "advanced/index.html"), "utf8");
  const drying = fs.readFileSync(path.join(outputDir, "advanced/01-filament-drying.html"), "utf8");
  const quality = fs.readFileSync(path.join(outputDir, "advanced/02-quality-diagnostics.html"), "utf8");

  assert.equal(result.advancedCourseCount, 2);
  assert.equal(result.htmlCount, 16);
  assert.match(overview, /A01[\s\S]*線材乾燥與保存/);
  assert.match(overview, /A02[\s\S]*品質問題診斷/);
  assert.match(drying, /A1／A1 mini[^。]*不可使用[^。]*熱床乾燥/);
  assert.match(quality, /熱蠕變／熱堆積/);
  assert.match(quality, /A1[\s\S]*P1S/);
  assert.match(drying, /three-d-advanced-course-chapters/);
  assert.match(quality, /data-course-total="2"/);
  assert.equal((drying.match(/GPT 教學圖解/g) || []).length, 5);
  assert.equal((quality.match(/GPT 教學圖解/g) || []).length, 5);
  assert.equal((drying.match(/內容參考：Bambu Lab Wiki/g) || []).length, 5);
  assert.equal((quality.match(/內容參考：Bambu Lab Wiki/g) || []).length, 5);

  for (const [folder, files] of Object.entries({
    "advanced-a01": ["dry-vs-damp.webp", "moisture-risk.webp", "drying-decision.webp", "drying-methods.webp", "storage-workflow.webp"],
    "advanced-a02": ["diagnostic-loop.webp", "extrusion-symptoms.webp", "warping-layer-cracks.webp", "bridge-seam-surface.webp", "a1-p1s-heat-creep.webp"]
  })) for (const file of files) {
    assert.ok(fs.existsSync(path.join(outputDir, "assets", folder, "illustrations", file)));
  }
});
```

- [ ] **Step 2: Add a failing progress unit test**

建立 `tests/advanced-progress.test.js`，使用最小 DOM stub 驗證 `setupAdvancedProgress`：

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const { setupAdvancedProgress } = require("../advanced-app");

test("reads only the independent advanced completion key", () => {
  const cards = ["A01", "A02"].map(id => ({
    dataset: { advancedCourse: id },
    classList: { toggle(name, active) { this[name] = active; } },
    querySelector() { return { textContent: "" }; }
  }));
  const progress = { textContent: "" };
  const document = {
    querySelectorAll() { return cards; },
    querySelector() { return progress; }
  };
  const storage = {
    getItem(key) {
      assert.equal(key, "three-d-advanced-course-chapters");
      return '["A01"]';
    }
  };

  setupAdvancedProgress({ document, storage });

  assert.equal(progress.textContent, "1 / 2");
  assert.equal(cards[0].classList.completed, true);
  assert.equal(cards[1].classList.completed, false);
});
```

- [ ] **Step 3: Run the focused tests and verify expected failures**

```bash
node --test --test-name-pattern="two advanced courses" tests/build-site.test.js
node --test tests/advanced-progress.test.js
```

Expected: 第一項因進階檔案不存在失敗；第二項因 `advanced-app.js` 不存在失敗。

- [ ] **Step 4: Commit the failing tests**

```bash
git add tests/build-site.test.js tests/advanced-progress.test.js
git commit -m "test: define advanced course publishing contract"
```

### Task 2: Extend the shared build and progress interfaces

**Files:**
- Modify: `scripts/build-site.js`
- Modify: `course.js`
- Modify: `course.css`
- Create: `advanced-app.js`

**Interfaces:**
- `buildSite()` returns `{ courseCount: 12, advancedCourseCount: 2, htmlCount: 16 }`。
- `course.js` consumes `document.body.dataset.progressKey`, `courseTotal`, `track` and optional `course.goalArt`。
- `setupAdvancedProgress({ document, storage })` updates `[data-advanced-course]` cards and `#advancedProgress`。

- [ ] **Step 1: Implement the advanced overview progress module**

建立可在瀏覽器與 Node 測試載入的 `advanced-app.js`：

```js
function setupAdvancedProgress({ document, storage }) {
  let completed;
  try {
    const saved = JSON.parse(storage.getItem("three-d-advanced-course-chapters") || "[]");
    completed = new Set(Array.isArray(saved) ? saved : []);
  } catch {
    completed = new Set();
  }

  const cards = [...document.querySelectorAll("[data-advanced-course]")];
  cards.forEach(card => {
    const isComplete = completed.has(card.dataset.advancedCourse);
    card.classList.toggle("completed", isComplete);
    if (isComplete) card.querySelector("b").textContent = "已完成 ✓";
  });
  document.querySelector("#advancedProgress").textContent = `${completed.size} / ${cards.length}`;
}

if (typeof module !== "undefined") module.exports = { setupAdvancedProgress };
if (typeof window !== "undefined") setupAdvancedProgress({ document, storage: localStorage });
```

- [ ] **Step 2: Run the progress test**

Run: `node --test tests/advanced-progress.test.js`

Expected: PASS.

- [ ] **Step 3: Make `course.js` track-aware**

將目標圖片選擇改為：

```js
const goalArt = course.goalArt || goalArtByCourse[course.id];
```

將進度常數改為：

```js
const storageKey = document.body.dataset.progressKey || "three-d-course-chapters";
const courseTotal = Number(document.body.dataset.courseTotal || courses.length);
```

並以 `${completed.size} / ${courseTotal}` 更新 `#lessonProgress`。

- [ ] **Step 4: Generalize the static builder**

在 `scripts/build-site.js`：

- 將 `loadCourses(rootDir)` 改為 `loadCourses(rootDir, dataFile = "course-data.js")`。
- 在 `PUBLIC_ENTRIES` 加入 `advanced-course-data.js`、`advanced-app.js`、`advanced.css`、`advanced`。
- 載入 `advanced-course-data.js` 並對 `advanced/*.html` 呼叫同一個 `injectCourse()`。
- 為 `injectCourse()` 增加 `{ homeHref, homeLabel }` 選項；初階維持 `../index.html`，進階使用 `index.html` 與「進階課程首頁」。
- 回傳 `advancedCourseCount`。

新增靜態圖解輸出函式並在 `renderSection()` 中呼叫：

```js
function renderManga(manga) {
  if (!manga) return "";
  return '<figure class="lesson-manga static-lesson-manga">' +
    '<span class="manga-label">' + escapeHtml(manga.label || "GPT 教學圖解") + "</span>" +
    '<img src="' + escapeHtml(manga.src) + '" alt="' + escapeHtml(manga.alt) + '" loading="lazy">' +
    '<figcaption>' + escapeHtml(manga.caption) + "</figcaption></figure>";
}
```

- [ ] **Step 5: Add advanced goal-card layout support**

在 `course.css` 沿用現有目標卡結構，新增：

```css
.course-page[data-track="advanced"] .goal-box ul{grid-template-columns:repeat(5,minmax(0,1fr))}
.course-page[data-track="advanced"] .goal-visual img{display:block;width:100%;height:100%;object-fit:cover}
```

在 980px 與 640px 斷點分別改為兩欄與一欄。

- [ ] **Step 6: Run syntax and focused unit tests**

```bash
node --check course.js
node --check advanced-app.js
node --check scripts/build-site.js
node --test tests/advanced-progress.test.js
```

Expected: all PASS.

- [ ] **Step 7: Commit the shared interfaces**

```bash
git add scripts/build-site.js course.js course.css advanced-app.js
git commit -m "feat: support independent advanced course track"
```

### Task 3: Generate ten illustrations and preserve their prompts

**Files:**
- Create: `assets/advanced-a01/illustrations/*.webp`
- Create: `assets/advanced-a02/illustrations/*.webp`
- Create: `docs/image-prompts/advanced-a01-illustrations.md`
- Create: `docs/image-prompts/advanced-a02-illustrations.md`

**Interfaces:**
- Produces: A01 與 A02 的 `goalArt` 及各 section `manga.src` 所引用的十張 1536×1024 WebP。

- [ ] **Step 1: Write the ten final prompts**

兩份文件各保存五組 `scientific-educational` 提示詞。共通約束：繁體中文大字標籤、日系動漫教學圖、機器與操作安全、無品牌標誌、無浮水印。圖名固定為：

```text
A01: dry-vs-damp, moisture-risk, drying-decision, drying-methods, storage-workflow
A02: diagnostic-loop, extrusion-symptoms, warping-layer-cracks, bridge-seam-surface, a1-p1s-heat-creep
```

- [ ] **Step 2: Generate A01 images one at a time**

使用內建圖片生成工具逐張產生五張不同內容的圖，不用一張提示詞變體替代五個主題。每張檢查繁體中文、材料／設備辨識、安全姿勢與流程方向。

- [ ] **Step 3: Generate A02 images one at a time**

逐張產生五張品質診斷圖。熱蠕變圖必須呈現線材在冷端上方軟化／送料受阻的概念，不畫成噴嘴外部著火或熔化機器。

- [ ] **Step 4: Convert selected outputs to WebP**

圖片工具回傳每張 PNG 的實際絕對路徑後，將該路徑指派給 `advanced_source_png`，再依十個固定輸出檔名逐張執行：

```bash
advanced_source_png='/圖片工具回傳的實際絕對路徑'
cwebp -quiet -q 88 "$advanced_source_png" -o assets/advanced-a01/illustrations/dry-vs-damp.webp
```

其餘九張只替換為圖片工具當次回傳的實際路徑與 File Map 已列出的固定輸出檔名。Expected: 每張 1536×1024、可讀且檔案大小合理。

- [ ] **Step 5: Inspect all ten final files**

逐張確認沒有簡體字、亂碼、危險操作、額外肢體、錯誤乾燥方式或不合理的機器結構。若只有文字錯誤，以同一構圖進行一次文字修正；不可把錯字留給 CSS 遮蓋。

- [ ] **Step 6: Commit prompts and assets**

```bash
git add assets/advanced-a01 assets/advanced-a02 docs/image-prompts/advanced-a01-illustrations.md docs/image-prompts/advanced-a02-illustrations.md
git commit -m "assets: add advanced drying and quality illustrations"
```

### Task 4: Author A01, A02, the advanced overview, and homepage entry

**Files:**
- Create: `advanced-course-data.js`
- Create: `advanced/index.html`
- Create: `advanced/01-filament-drying.html`
- Create: `advanced/02-quality-diagnostics.html`
- Create: `advanced.css`
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- `window.COURSES` in `advanced-course-data.js` contains exactly two course objects with the existing course schema plus `goalArt`。
- Advanced page bodies provide `data-progress-key="three-d-advanced-course-chapters" data-course-total="2" data-track="advanced"`。

- [ ] **Step 1: Create A01 and A02 data**

建立兩個完整課程物件。每課使用五個 goals、五個 sections、五個 `goalArt` 項目、任務與 checkpoint。每個 section 包含 `manga` 和至少一個 `sources`；來源標籤以 `內容參考：Bambu Lab Wiki｜` 開頭。

A01 必須出現以下原句或語意等價句：

```text
A1／A1 mini 是開放式機型，不可使用機器熱床乾燥線材。
```

A02 必須包含 `熱蠕變／熱堆積（Heat Creep）`、出料漸少、磨料、軟化變形、散熱風扇、腔體／環境溫度，以及 A1／P1S 案例。

- [ ] **Step 2: Create the two course page shells**

以現有課程骨架建立兩頁，差異為：

```html
<body class="course-page" data-course="A01" data-track="advanced"
  data-progress-key="three-d-advanced-course-chapters" data-course-total="2">
```

腳本順序為 `../advanced-course-data.js`、`../course-menu.js`、`../course.js`。

- [ ] **Step 3: Create the advanced overview**

總覽包含品牌、返回首頁、`#advancedProgress`、兩張 `[data-advanced-course]` 卡片、先備能力、安全邊界與兩堂課連結。引入 `../styles.css`、`../advanced.css`、`../advanced-app.js`。

- [ ] **Step 4: Activate the homepage entry**

將首頁進階卡改為 `<a href="advanced/index.html">`，狀態顯示「2 堂課已開放」，正文列出線材乾燥、品質診斷與熱蠕變／熱堆積；保留初階卡與 12 堂進度。

- [ ] **Step 5: Style the advanced overview and active homepage card**

`advanced.css` 沿用首頁青藍、珊瑚橘、明黃與紫色進階識別，提供桌機雙欄、980px 以下單欄、可見焦點與 `prefers-reduced-motion`。`styles.css` 只把 `.course-level-advanced` 從不可操作文章調整為可操作連結的 hover／focus 狀態。

- [ ] **Step 6: Run the focused build test**

Run: `node --test --test-name-pattern="two advanced courses" tests/build-site.test.js`

Expected: PASS.

- [ ] **Step 7: Commit the advanced course content**

```bash
git add advanced-course-data.js advanced advanced.css index.html styles.css
git commit -m "feat: publish advanced drying and quality courses"
```

### Task 5: Verify responsive behavior and the complete static site

**Files:**
- Modify only for advanced-course defects found during verification: files listed in Tasks 2–4.

**Interfaces:**
- Produces: deployable `_site` with 12 beginner courses, 2 advanced courses and 16 HTML pages.

- [ ] **Step 1: Run all syntax checks and tests**

```bash
node --check app.js
node --check course.js
node --check advanced-app.js
node --check advanced-course-data.js
node --test tests/*.test.js
```

Expected: all tests PASS.

- [ ] **Step 2: Build the site**

Run: `node scripts/build-site.js`

Expected: `Built 12 beginner and 2 advanced courses across 16 HTML pages.`

- [ ] **Step 3: Verify output assets and copy**

```bash
test -f _site/advanced/index.html
test -f _site/advanced/01-filament-drying.html
test -f _site/advanced/02-quality-diagnostics.html
rg -n '不可使用.*熱床乾燥|熱蠕變／熱堆積|內容參考：Bambu Lab Wiki' _site/advanced
```

Expected: every check succeeds.

- [ ] **Step 4: Inspect browser behavior**

在約 1440×900 與 390×844 檢查首頁、進階總覽、A01、A02：無水平溢出；五張目標卡不互相遮擋；側邊選單可開關；圖片中文字清楚；進階完成按鈕只更新 `0 / 2`。

- [ ] **Step 5: Run a clean final verification after any visual fixes**

重跑 Step 1–3。只有在所有命令零失敗時才完成分支。

### Task 6: Integrate through GitHub review and Pages

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: `agent/homepage-course-levels` 的首頁與進階課程提交。
- Produces: GitHub PR、`main` 合併與成功 Pages 部署（需使用者選擇／既有發布授權）。

- [ ] **Step 1: Push and create a pull request**

```bash
git push -u origin agent/homepage-course-levels
gh pr create --base main --head agent/homepage-course-levels --title "改版首頁並新增進階乾燥與品質課程" --body $'## 摘要\n- 改版首頁並區分初階、進階課程\n- 新增 A01 線材乾燥與保存、A02 品質問題診斷\n- 加入十張繁體中文原創教學圖與 Bambu Lab Wiki 引用\n\n## 驗證\n- node --test tests/*.test.js\n- node scripts/build-site.js'
```

- [ ] **Step 2: Wait for CI**

Run: `gh pr checks agent/homepage-course-levels --repo m72900024/3d-printing-teaching --watch`

Expected: build PASS.

- [ ] **Step 3: Merge only after integration choice**

依完成分支流程讓使用者選擇建立 PR、合併或保留分支；不要因先前曾發布其他改動而自動合併本次新教材。

- [ ] **Step 4: Verify Pages after merge**

等待 Pages workflow 成功，再確認首頁、進階總覽、A01 與 A02 公開網址皆回應 HTTP 200，並包含新圖與官方引用。
