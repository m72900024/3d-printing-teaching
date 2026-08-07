# Homepage Course Levels and Anime Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將首頁改成含網站介紹、動漫 3D 印表機主圖、初階 12 堂課入口與進階規劃中入口的繁體中文課程首頁。

**Architecture:** 保留純 HTML、CSS 與原生 JavaScript 架構，直接重整 `index.html` 的首頁資訊層級並在 `styles.css` 加入限定於首頁的新元件。靜態建置沿用 `scripts/build-site.js` 複製與資源指紋機制；測試從建置輸出驗證入口、文案、圖片與無死連結狀態。

**Tech Stack:** HTML5、CSS、原生 JavaScript、Node.js `node:test`、既有靜態建置程式、OpenAI 內建圖片生成工具、WebP。

## Global Constraints

- 現有 12 堂課全部歸入「初階課程」，課程頁內容與網址不變。
- 「進階課程」只顯示「規劃中」，不新增空白頁、假連結或承諾堂數。
- 全部新增介面文字與圖片替代文字使用繁體中文。
- 圖片內不生成文字、品牌標誌或操作警示；文字說明由 HTML 提供。
- 保留既有學習進度、課程完成狀態、鍵盤焦點、減少動態偏好與無 JavaScript 基本可用性。
- 不重構課程資料、課程頁或共用建置架構。

---

## File Map

- `tests/build-site.test.js`：新增首頁分級、文案與圖片資源的建置驗收測試。
- `assets/homepage/anime-3d-printing-classroom.webp`：首頁動漫 3D 列印教室主圖。
- `docs/image-prompts/homepage-anime-hero.md`：保存最終生圖提示詞與用途。
- `index.html`：重整導覽、主視覺、初階／進階入口與網站介紹。
- `styles.css`：加入動漫主圖、課程層級卡與網站介紹的響應式樣式，移除首頁不再使用的 CSS 印表機元件。
- `app.js`：只在首頁目標識別碼改變時做必要的滾動目標調整；進度資料格式不變。

### Task 1: Lock the homepage contract with a failing build test

**Files:**
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildTemporarySite(prefix)` 與 `buildSite({ rootDir, outputDir })`。
- Produces: 建置輸出首頁必須滿足的分級、主圖、介紹與連結契約。

- [ ] **Step 1: Write the failing test**

在 `tests/build-site.test.js` 加入：

```js
test("publishes the anime homepage with beginner and planned advanced paths", () => {
  const { outputDir } = buildTemporarySite("3d-course-homepage-levels-");
  const home = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");

  assert.match(home, /href="#beginner-courses">初階課程/);
  assert.match(home, /href="#advanced-courses">進階課程/);
  assert.match(home, /href="#about">網站介紹/);
  assert.match(home, /<strong>12<\/strong><span>堂初階課程<\/span>/);
  assert.match(home, /id="beginner-courses"/);
  assert.match(home, /初階課程[\s\S]*12 堂課/);
  assert.match(home, /id="advanced-courses"[\s\S]*規劃中/);
  assert.doesNotMatch(home, /href="[^"]*advanced[^"]*\.html"/);
  assert.match(home, /id="about"/);
  assert.match(home, /安全操作/);
  assert.match(home, /Bambu Studio/);
  assert.match(home, /assets\/homepage\/anime-3d-printing-classroom\.webp/);
  assert.match(home, /alt="[^\"]*3D 印表機[^\"]*"/);
  assert.ok(fs.existsSync(path.join(outputDir, "assets/homepage/anime-3d-printing-classroom.webp")));
});
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `node --test --test-name-pattern="anime homepage" tests/build-site.test.js`

Expected: FAIL because the new IDs, copy and image do not exist.

- [ ] **Step 3: Commit the test**

```bash
git add tests/build-site.test.js
git commit -m "test: define homepage course level contract"
```

### Task 2: Generate and document the anime hero illustration

**Files:**
- Create: `assets/homepage/anime-3d-printing-classroom.webp`
- Create: `docs/image-prompts/homepage-anime-hero.md`

**Interfaces:**
- Produces: 橫式 WebP 圖片供 `index.html` 的 `.anime-printer-stage img` 使用。

- [ ] **Step 1: Save the exact production prompt**

建立 `docs/image-prompts/homepage-anime-hero.md`，記錄以下提示詞：

```text
Use case: scientific-educational
Asset type: responsive homepage hero illustration for a Traditional Chinese 3D-printing course website
Primary request: Create a lively educational anime illustration that clearly introduces a desktop FDM 3D printer.
Scene/backdrop: bright modern maker classroom with a clean worktable and a soft uncluttered background
Subject: one enthusiastic young adult learner safely observing an open-frame FDM printer; clearly visible filament spool, gantry, print head, spring-steel build plate, and a small colorful object being printed
Style/medium: polished Japanese anime educational illustration, crisp linework, gentle cel shading, friendly rather than childish
Composition/framing: wide 3:2 composition; learner and printer are both fully visible; printer is the visual focus; generous breathing room around the subjects; safe for responsive center cropping
Lighting/mood: bright morning light, curious, welcoming, energetic
Color palette: cyan blue, coral orange, sunny yellow, clean white, deep navy outlines
Constraints: mechanically plausible open-frame FDM printer; safe posture; hands away from the nozzle and moving parts; no enclosure; no logos; no text; no labels; no watermark
Avoid: illegible interface screens, extra fingers, duplicated printer parts, photorealism, dark sci-fi laboratory, unsafe contact with hot or moving parts
```

- [ ] **Step 2: Generate the image with the built-in image tool**

使用 `image_gen` 依上述提示詞生成一張圖片。檢查人物手部、列印頭、平台與線材路徑；若有明顯機構或肢體錯誤，只針對該問題重做一次。

- [ ] **Step 3: Save and optimize the selected image**

將選定輸出複製到專案暫存位置，再執行：

```bash
mkdir -p assets/homepage
cwebp -q 88 <selected-image.png> -o assets/homepage/anime-3d-printing-classroom.webp
```

Expected: WebP 圖片可讀、長寬比接近 3:2，且不含文字或品牌標誌。

- [ ] **Step 4: Inspect the final WebP**

使用圖片檢視工具確認：人物與印表機未被裁掉、機構大致合理、沒有文字、手未接觸噴嘴或運動部件。

- [ ] **Step 5: Commit the image and prompt**

```bash
git add assets/homepage/anime-3d-printing-classroom.webp docs/image-prompts/homepage-anime-hero.md
git commit -m "assets: add anime homepage printer illustration"
```

### Task 3: Build the homepage hierarchy and responsive presentation

**Files:**
- Modify: `index.html`
- Modify: `styles.css`
- Modify if required: `app.js`

**Interfaces:**
- Consumes: `assets/homepage/anime-3d-printing-classroom.webp`。
- Produces: `#beginner-courses`、`#advanced-courses`、`#about` 三個導覽目標，並保留既有 12 個 `[data-course]` 連結供 `app.js` 更新完成狀態。

- [ ] **Step 1: Replace the top navigation and hero markup**

在 `index.html` 將頂部導覽改為：

```html
<nav class="top-nav" aria-label="主要導覽">
  <a href="#beginner-courses">初階課程</a>
  <a href="#advanced-courses">進階課程</a>
  <a href="#about">網站介紹</a>
</nav>
```

主視覺左側使用「從零開始，完成第一件 3D 列印作品」及安全操作、切片與實作說明；右側改為：

```html
<figure class="anime-printer-stage reveal">
  <img src="assets/homepage/anime-3d-printing-classroom.webp" alt="動漫風教學場景：學習者在安全距離觀察桌上型 FDM 3D 印表機製作作品">
  <figcaption><strong>看懂機器，也親手完成作品</strong><span>從線材、噴嘴與平台開始建立正確操作觀念。</span></figcaption>
</figure>
```

將統計文字改為 `12／堂初階課程`、`2／種學習層級`、`1／件結業作品`。

- [ ] **Step 2: Add the beginner and advanced entry cards**

在主視覺與既有 `#path` 之間加入 `course-levels` 區塊。初階使用可點擊的 `<a id="beginner-courses" href="#path">`，清楚顯示「12 堂課」；進階使用不可點擊的 `<article id="advanced-courses">`，顯示「規劃中」及校正、材料調校、設計最佳化與系統化實驗等方向。

- [ ] **Step 3: Add the website introduction**

在課程總覽前加入 `<section class="site-about section" id="about">`，用三段短項目說明「安全操作」、「Bambu Studio 切片」、「實作與排錯」，並說明本網站適合第一次接觸 FDM 3D 列印的學習者。

- [ ] **Step 4: Style the new homepage components**

在 `styles.css` 新增 `.anime-printer-stage`、`.course-level-grid`、`.course-level-card`、`.site-about` 等樣式。沿用現有色彩變數，加入珊瑚橘與青藍重點色；圖片使用 `aspect-ratio: 3 / 2`、`object-fit: cover`。桌機雙欄、980px 以下單欄、640px 以下縮小標題與內距；所有互動元素提供 `:focus-visible`。

移除只供舊首頁 CSS 印表機使用的 `.printer-stage`、`.printer`、`.orbit`、`.floating-card`、`.layer` 等規則，避免遺留未使用樣式；不碰課程頁樣式。

- [ ] **Step 5: Keep the progress button behavior intact**

保留 12 個 `[data-course]` 連結與 `#path`，使 `app.js` 無需改動。若首頁實作改變 `#path`，只把以下目標更新為實際初階課程總覽 ID：

```js
document.querySelector("#progressButton").addEventListener("click", () => {
  document.querySelector("#path").scrollIntoView({ behavior: "smooth" });
});
```

- [ ] **Step 6: Run the focused test**

Run: `node --test --test-name-pattern="anime homepage" tests/build-site.test.js`

Expected: PASS.

- [ ] **Step 7: Commit the homepage implementation**

```bash
git add index.html styles.css app.js
git commit -m "feat: organize homepage by course level"
```

### Task 4: Verify the complete static site

**Files:**
- Modify only if verification reveals a homepage-scoped defect: `index.html`, `styles.css`, `app.js`, `tests/build-site.test.js`

**Interfaces:**
- Consumes: 全部首頁改動與既有靜態建置流程。
- Produces: 可部署的 `_site` 與通過的測試結果。

- [ ] **Step 1: Run syntax and automated tests**

```bash
node --check app.js
node --test tests/*.test.js
```

Expected: all tests PASS.

- [ ] **Step 2: Build the site**

Run: `node scripts/build-site.js`

Expected: `Built 12 courses across 13 HTML pages.`

- [ ] **Step 3: Verify built homepage assets and links**

```bash
test -f _site/assets/homepage/anime-3d-printing-classroom.webp
rg -n '初階課程|進階課程|規劃中|網站介紹|anime-3d-printing-classroom' _site/index.html
```

Expected: all required copy and the image path are present.

- [ ] **Step 4: Inspect desktop and mobile screenshots**

在本機預覽中檢查約 1440×900 與 390×844：主圖不裁掉人物或印表機、文字不重疊、入口卡順序正確、進階卡沒有死連結、鍵盤焦點可見。

- [ ] **Step 5: Commit any verification-only fixes**

若 Step 1–4 發現首頁範圍問題，做最小修正後重新執行所有驗證，再提交：

```bash
git add index.html styles.css app.js tests/build-site.test.js
git commit -m "fix: polish responsive homepage presentation"
```

若無需修正，不建立空提交。

### Task 5: Publish through GitHub review and Pages

**Files:**
- No source changes expected.

**Interfaces:**
- Consumes: 已通過驗證的 `agent/homepage-course-levels` 分支。
- Produces: GitHub pull request 與成功的 Pages 部署。

- [ ] **Step 1: Push the branch and open a pull request**

```bash
git push -u origin agent/homepage-course-levels
gh pr create --base main --head agent/homepage-course-levels --title "改版首頁課程分級與動漫主視覺" --body-file <prepared-pr-body>
```

- [ ] **Step 2: Confirm CI passes**

Run: `gh pr checks <pr-number> --repo m72900024/3d-printing-teaching --watch`

Expected: build check PASS.

- [ ] **Step 3: Merge only with the user's publication authorization**

本次對話若使用者已明確要求同步或公開，可將 PR 轉為 ready 並使用 merge commit 合併；否則只回報 PR 網址等待授權。

- [ ] **Step 4: Verify GitHub Pages**

等待 `Deploy static site to Pages` 成功，然後確認首頁回應 HTTP 200，且公開 HTML 包含 `anime-3d-printing-classroom.webp`、`初階課程` 與 `進階課程`。
