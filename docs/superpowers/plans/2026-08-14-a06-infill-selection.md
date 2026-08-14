# A06 Infill Selection Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish A06「依作品需求選擇填充」with seven illustrated sections, ten annotated teaching images, official supplemental links, responsive lesson navigation, and six-course advanced navigation across the site.

**Architecture:** Extend the existing data-driven advanced course system rather than creating an A06-only renderer. Generalize the A05 outline, summary-goal image, back links, and lightbox hooks to a small list of long illustrated courses so A05 remains unchanged while A06 reuses the same interface. Keep course copy in `advanced-course-data.js`, static generation in `scripts/build-site.js`, runtime enhancement in `course.js` and `course-media.js`, and all A06 image prompts in one reproducible document.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js built-in test runner, existing site builder, GPT Image built-in tool, WebP assets, GitHub Pages.

## Global Constraints

- All learner-facing copy, diagram labels, navigation, and alt text use Traditional Chinese.
- A06 has exactly seven lesson sections and ten 1536×1024 WebP teaching images.
- Density ranges are labeled 「本課建議起始值」 and never presented as Bambu Lab guarantees.
- External sources appear under the relevant section and open with `target="_blank" rel="noopener noreferrer"`.
- A06 reuses the A05 outline, per-section return links, back-to-top control, and accessible image lightbox.
- Desktop and 390×844 mobile layouts have no page-level horizontal overflow and do not crop diagram labels.
- Existing A01–A05 behavior and all current tests remain green.
- Do not modify or stage `_修改紀錄.md`.
- Do not use subagents; execute inline because the user explicitly requested no multi-agent work.

---

### Task 1: Define the A06 static output contract

**Files:**
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildTemporarySite(prefix)` and generated `_site` HTML from the existing test helper.
- Produces: one A06 regression test that defines the required page, course counts, copy, images, outline, sources, and navigation.

- [ ] **Step 1: Write the failing A06 build test**

Add a test that reads `advanced/06-infill-selection.html`, `advanced/index.html`, `index.html`, and `course.css`, then asserts:

```js
test("publishes the illustrated A06 infill selection course", () => {
  const { outputDir } = buildTemporarySite("3d-course-infill-selection-");
  const infill = fs.readFileSync(path.join(outputDir, "advanced/06-infill-selection.html"), "utf8");
  const overview = fs.readFileSync(path.join(outputDir, "advanced/index.html"), "utf8");
  const home = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");

  assert.match(infill, /<title>A06 依作品需求選擇填充｜3D 列印進階教室<\/title>/);
  assert.equal((infill.match(/id="lesson-section-[1-7]"/g) || []).length, 7);
  assert.equal((infill.match(/assets\/advanced-a06\/illustrations\/[^"]+\.webp/g) || []).length, 11);
  assert.equal(new Set(infill.match(/assets\/advanced-a06\/illustrations\/[^"]+\.webp/g)).size, 10);
  assert.match(infill, /展示模型[\s\S]*收納盒[\s\S]*支架[\s\S]*受壓/);
  assert.match(infill, /5–12%[\s\S]*10–18%[\s\S]*15–30%[\s\S]*25–40%/);
  assert.match(infill, /本課建議起始值/);
  assert.match(infill, /Lightning[\s\S]*Gyroid[\s\S]*Cubic[\s\S]*Triangles[\s\S]*Concentric/);
  assert.match(infill, /10%[\s\S]*20%[\s\S]*30%[\s\S]*單一變因/);
  assert.match(infill, /github\.com\/bambulab\/BambuStudio/);
  assert.match(infill, /help\.prusa3d\.com[\s\S]*ultimaker\.com/);
  assert.match(overview, /6 ADVANCED COURSES[\s\S]*A06[\s\S]*依作品需求選擇填充/);
  assert.match(home, /ADVANCED · 6 COURSES[\s\S]*A06[\s\S]*依作品需求選擇填充/);
});
```

The expected 11 references consist of one summary image plus ten lesson occurrences, with exactly ten unique assets.

- [ ] **Step 2: Run the A06 test and verify RED**

Run: `node --test tests/build-site.test.js`

Expected: FAIL because `advanced/06-infill-selection.html` does not exist.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/build-site.test.js
git commit -m "test: define A06 infill course output"
```

### Task 2: Add the A06 shell and seven-section course data

**Files:**
- Create: `advanced/06-infill-selection.html`
- Modify: `advanced-course-data.js`
- Modify: `course.js`
- Modify: `scripts/build-site.js`

**Interfaces:**
- Consumes: the existing `window.ADVANCED_COURSES` schema, `renderManga`, `renderSources`, `renderSection`, and `setupCourseMedia({ document, window })`.
- Produces: A06 course object with `goalArt`, seven `sections`, ten image references, `task`, and `pagination`; reusable `usesIllustratedOutline(course)` behavior for A05 and A06.

- [ ] **Step 1: Create the A06 HTML shell**

Copy the semantic structure of `advanced/05-force-direction.html`, then set:

```html
<body class="course-page" data-course="A06" data-track="advanced"
  data-progress-key="three-d-advanced-course-chapters" data-course-total="6">
```

Load `../course-media.js` before `../course.js`, keep fallback navigation and static placeholders, and set the source title to `A06 依作品需求選擇填充｜3D 列印進階教室`.

- [ ] **Step 2: Add the exact A06 course object**

Append A06 to `window.ADVANCED_COURSES` with seven sections in this order:

1. 填充不是把模型塞滿
2. 選填充前先回答四個問題
3. 七種常用填充圖樣
4. 依四種作品選擇
5. 為什麼不是密度越高越好
6. 在 Bambu Studio 實際設定
7. 單一變因填充實驗

Use the four density ranges from the spec and explicitly prefix the table/callout with `本課建議起始值`. Add Bambu Lab GitHub links to sections 1 and 6, Prusa links to sections 1 and 3, and UltiMaker links to sections 3 and 5.

- [ ] **Step 3: Generalize long-course rendering**

Add one shared predicate in both `course.js` and `scripts/build-site.js`:

```js
function usesIllustratedOutline(course) {
  return course.id === "A05" || course.id === "A06";
}
```

Use it for the summary goal image, seven-section outline, `lesson-section-*` IDs, seven return links, back-to-top control, balanced title spans where needed, and `setupCourseMedia`. Do not change A01–A04 output.

- [ ] **Step 4: Build and run the A06 test**

Run: `node --test tests/build-site.test.js`

Expected: the new test now advances to missing image/navigation assertions; existing tests remain green.

- [ ] **Step 5: Commit course structure**

```bash
git add advanced/06-infill-selection.html advanced-course-data.js course.js scripts/build-site.js
git commit -m "feat: add A06 infill selection lesson"
```

### Task 3: Update six-course navigation and overview content

**Files:**
- Modify: `index.html`
- Modify: `advanced/index.html`
- Modify: `advanced/01-filament-drying.html`
- Modify: `advanced/02-quality-diagnostics.html`
- Modify: `advanced/03-support-settings.html`
- Modify: `advanced/04-filament-selection.html`
- Modify: `advanced/05-force-direction.html`
- Modify: `advanced/06-infill-selection.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: `window.ADVANCED_COURSES` and builder injection for advanced navigation.
- Produces: consistent six-course fallback markup before JavaScript enhancement and an A06 overview card using class `advanced-infill`.

- [ ] **Step 1: Update homepage advanced navigation**

Change `ADVANCED · 5 COURSES` to `ADVANCED · 6 COURSES`, append the A06 link, change `5 堂課已開放` to `6 堂課已開放`, and update the summary to include填充策略 without removing A01–A05 topics.

- [ ] **Step 2: Add the overview card**

Append:

```html
<a class="advanced-course-card advanced-infill" href="06-infill-selection.html" data-advanced-course="A06">
  <span>A06</span><small>45 分鐘 · 切片策略</small>
  <h3>依作品需求選擇填充</h3>
  <p>從展示模型、收納盒、支架與受壓零件出發，選擇圖樣、密度與外殼配置，再用切片預覽和小件測試驗證。</p>
  <ul><li>七種常用填充</li><li>四種作品決策</li><li>十張標註圖解</li></ul><b>開始課程 →</b>
</a>
```

- [ ] **Step 3: Update fallback counts and sidebar links**

Change all advanced shells from `data-course-total="5"`, `5 ADVANCED COURSES`, and `0 / 5` to 6. Add the A06 fallback navigation link after A05. Let the builder continue to replace these values from data.

- [ ] **Step 4: Add A06 card styling**

Add `.advanced-infill` to the existing advanced card visual system with a distinct but compatible violet-green accent. Do not restyle other cards.

- [ ] **Step 5: Run navigation tests and commit**

Run: `node --test tests/build-site.test.js`

Expected: navigation/count assertions pass; only missing assets may remain.

```bash
git add index.html advanced/index.html advanced/*.html styles.css
git commit -m "feat: add A06 to advanced navigation"
```

### Task 4: Create the ten A06 teaching images and prompt record

**Files:**
- Create: `docs/image-prompts/advanced-a06-infill-selection.md`
- Create: `assets/advanced-a06/illustrations/infill-anatomy.webp`
- Create: `assets/advanced-a06/illustrations/density-comparison.webp`
- Create: `assets/advanced-a06/illustrations/decision-flow.webp`
- Create: `assets/advanced-a06/illustrations/pattern-matrix.webp`
- Create: `assets/advanced-a06/illustrations/path-crossing.webp`
- Create: `assets/advanced-a06/illustrations/display-lightning.webp`
- Create: `assets/advanced-a06/illustrations/storage-box.webp`
- Create: `assets/advanced-a06/illustrations/bracket-infill.webp`
- Create: `assets/advanced-a06/illustrations/compression-block.webp`
- Create: `assets/advanced-a06/illustrations/bambu-infill-preview.webp`

**Interfaces:**
- Consumes: exact figure subjects, labels, color roles, alt text, and 1536×1024 requirement from the approved spec.
- Produces: ten project-local WebP assets referenced by A06 and one reproducible prompt document.

- [ ] **Step 1: Write all ten production prompts first**

The prompt document begins with shared rules: scientific-educational, 1536×1024 landscape, cream background, deep-ink outlines, green sparse paths, purple layers, blue forces, red cautions, Traditional Chinese only, no watermark/logo/cropped text, 5–8 major labels per image, and no absolute strength claims.

Each image section includes filename, exact text, required geometry, avoid list, and alt text.

- [ ] **Step 2: Generate one image per built-in image tool call**

Use the built-in GPT Image tool, one call per image. For each result, inspect text accuracy and mechanical meaning, copy the selected output from `$CODEX_HOME/generated_images/...`, and convert it to the exact project WebP path at quality 92. Iterate only when labels, paths, or forces are wrong.

- [ ] **Step 3: Validate every image**

Run:

```bash
file assets/advanced-a06/illustrations/*.webp
```

Expected: exactly ten WebP images, each `1536x1024`.

Visually inspect all ten originals and reject Simplified Chinese, Japanese, clipped labels, unreadable mobile text, misleading force arrows, or patterns that do not match their names.

- [ ] **Step 4: Run A06 build tests and commit**

Run: `node --test tests/build-site.test.js`

Expected: A06 static page and image assertions pass.

```bash
git add docs/image-prompts/advanced-a06-infill-selection.md assets/advanced-a06/illustrations
git commit -m "assets: add A06 infill teaching diagrams"
```

### Task 5: Add A06-specific responsive presentation

**Files:**
- Modify: `course.css`
- Modify: `course-media.js`
- Modify: `tests/course-media.test.js`

**Interfaces:**
- Consumes: A06 semantic classes from course data and the existing `setupCourseMedia({ document, window })` adapter.
- Produces: reusable A05/A06 lightbox and outline state, A06 decision table/cards, density comparison, and mobile-safe diagrams.

- [ ] **Step 1: Extend media tests before implementation**

Add controller assertions showing gallery state works for a ten-image A06 page and outline state remains independent of gallery navigation. Reuse `createGalleryState` rather than adding an A06-specific controller.

- [ ] **Step 2: Add scoped A06 styles**

Scope new rules under `.course-page[data-course="A06"]`. Style the four-case decision table/cards, starting-value badge, pattern comparison, experiment table, one summary image, horizontal mobile outline, diagram zoom focus, and mobile typography. Reuse shared `.course-lightbox`, `.back-to-outline`, and `.back-to-top` rules.

- [ ] **Step 3: Verify unit and build tests**

Run:

```bash
node --test tests/course-media.test.js tests/build-site.test.js
```

Expected: all tests pass.

- [ ] **Step 4: Commit presentation**

```bash
git add course.css course-media.js tests/course-media.test.js
git commit -m "feat: add A06 responsive learning aids"
```

### Task 6: Full verification and publication

**Files:**
- Verify: generated `_site/**`
- Verify: public GitHub Pages deployment

**Interfaces:**
- Consumes: all previous tasks.
- Produces: green automated checks, verified desktop/mobile A06, pushed branch and main, and a public deliverable URL.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
node --check course.js
node --check course-media.js
node --test tests/*.test.js
git diff --check
```

Expected: all checks pass with zero failures.

- [ ] **Step 2: Build the production site**

Run: `node scripts/build-site.js`

Expected: `Built 12 beginner and 6 advanced courses across 20 HTML pages.`

- [ ] **Step 3: Desktop browser verification**

At the default desktop viewport verify: correct title, seven outline links, seven section IDs, ten loaded 1536×1024 figures, one summary image, all external sources, six-course sidebar, previous A05 link, zero console errors, no horizontal overflow, and working image next/previous/Escape/focus restoration.

- [ ] **Step 4: Mobile browser verification**

At 390×844 verify: balanced title wrapping, one-column cases, horizontally scrollable outline without page overflow, readable diagram labels via lightbox, fixed back-to-top control, and all ten figures loaded.

- [ ] **Step 5: Commit any narrowly scoped verification fixes**

If verification reveals a defect, add a failing regression assertion first, make the smallest A06-scoped fix, rerun the complete suite, then commit only those files with `fix: polish A06 infill course`.

- [ ] **Step 6: Publish with the already approved workflow**

Fetch `origin/main`, confirm it is an ancestor of `HEAD`, push the current branch, then push `HEAD:main` without force. Never stage `_修改紀錄.md`.

- [ ] **Step 7: Verify the public page**

Open `https://m72900024.github.io/3d-printing-teaching/advanced/06-infill-selection.html`, verify the same structural and image checks, leave it open as the deliverable tab, and report the commit plus public URL.
