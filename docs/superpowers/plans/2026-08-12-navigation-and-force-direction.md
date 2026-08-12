# Layered Navigation and A05 Force Direction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, accessible course directory across the site and publish A05「受力方向與列印方向」with ten clearly annotated Traditional Chinese teaching images.

**Architecture:** A new `site-navigation.js` enhances semantic fallback links in the homepage header into desktop dropdowns and a mobile accordion. Existing course data gains stable beginner/advanced globals while retaining `window.COURSES` compatibility; course pages reuse `course.js` and `course-menu.js` for grouped sidebars and explicit home/overview links. A05 follows the current data-driven course shell, with reusable image guides and optional detail figures rendered in both JavaScript and static builds.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js built-in test runner, existing static build script, WebP illustrations, GitHub Pages.

## Global Constraints

- All visible interface and course copy is Traditional Chinese.
- Beginner navigation is grouped exactly as 第一次成功 01–06, 理解與調整 07–09, 獨立完成 10–12.
- Advanced navigation lists A01–A05 directly.
- Every course page exposes distinct visible links for 網站首頁 and 初階課程總覽／進階課程總覽.
- A05 uses ten 3:2 WebP teaching images with 5–8 major labels, consistent force/layer symbols, and `object-fit: contain`.
- Image guides follow 外力 → 固定點 → 傳力 → 可能破壞面 and use 3–5 numbered explanations.
- Do not modify, stage, or commit the user-owned `_修改紀錄.md`.
- Do not use subagents.

---

### Task 1: Homepage layered navigation

**Files:**
- Create: `site-navigation.js`
- Create: `tests/site-navigation.test.js`
- Modify: `course-data.js`
- Modify: `advanced-course-data.js`
- Modify: `index.html`
- Modify: `styles.css`
- Modify: `app.js`
- Modify: `scripts/build-site.js`

**Interfaces:**
- Produces `window.BEGINNER_COURSES: Course[]` and `window.ADVANCED_COURSES: Course[]`; each data file continues assigning its array to `window.COURSES` for course-page compatibility.
- Produces `setupSiteNavigation({ document, window }): { closeAll(): void, closeMobile(options?): void } | null` through the same UMD pattern as `course-menu.js`.
- Consumes semantic elements with `[data-site-nav-toggle]`, `[data-site-nav-panel]`, `#siteNavMenuButton`, `#siteNavigation`, and `.site-nav-overlay`.

- [ ] **Step 1: Write failing homepage-navigation tests**

Add DOM-fixture tests proving:

```js
test("opens one desktop course directory at a time", () => {
  const fixture = createSiteNavigationFixture({ mobile: false });
  fixture.beginnerButton.click();
  assert.equal(fixture.beginnerButton.getAttribute("aria-expanded"), "true");
  fixture.advancedButton.click();
  assert.equal(fixture.beginnerButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.advancedButton.getAttribute("aria-expanded"), "true");
});

test("mobile menu and accordion close with Escape", () => {
  const fixture = createSiteNavigationFixture({ mobile: true });
  fixture.menuButton.click();
  fixture.beginnerButton.click();
  fixture.pressEscape();
  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.document.body.classList.contains("site-navigation-open"), false);
});
```

Extend `tests/build-site.test.js` to assert `site-navigation.js`, the three beginner group labels, all 12 beginner links, current A01–A04 links, and visible fallback navigation are copied and fingerprinted. Task 5 adds and tests the A05 entry.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/site-navigation.test.js tests/build-site.test.js`

Expected: FAIL because `site-navigation.js` and the new navigation markup do not exist.

- [ ] **Step 3: Add stable course globals**

Change `window.COURSES = [` at the beginning of `course-data.js` to `window.BEGINNER_COURSES = [`, then append `window.COURSES = window.BEGINNER_COURSES;` after the closing array. Do the equivalent in `advanced-course-data.js` with `window.ADVANCED_COURSES`; do not change any existing course object in this step.

```js
window.COURSES = window.BEGINNER_COURSES;
```

```js
window.COURSES = window.ADVANCED_COURSES;
```

- [ ] **Step 4: Add semantic fallback navigation to `index.html`**

Replace the simple `.top-nav` links with buttons and panels. The initial HTML includes real links for all available courses. Beginner links appear under exactly three `.site-nav-stage` headings; advanced links initially list A01–A04, and Task 5 appends A05 in the same panel. Add `☰ 導覽`, a close button, and an overlay. Load `course-data.js`, `advanced-course-data.js`, `site-navigation.js`, then `app.js` so the same source arrays can verify/enhance the fallback links.

- [ ] **Step 5: Implement `setupSiteNavigation`**

Implement mutually exclusive panels, desktop outside-click close, mobile menu/accordion behavior, Escape handling, overlay close, navigation-link close, focus restoration, and media-query cleanup. Every toggle sets `aria-controls` and `aria-expanded`; no interaction depends solely on hover.

- [ ] **Step 6: Style desktop dropdown and mobile accordion**

Use the current ink/acid-green/anime-classroom palette. Desktop panels are two-column “course map” cards aligned below the sticky header; mobile uses a full-width sheet below the header with 44px minimum targets. Add visible `:focus-visible`, reduced-motion handling, background scroll lock, and no horizontal overflow at 390px.

- [ ] **Step 7: Add the script to static publishing**

Add `site-navigation.js` to `PUBLIC_ENTRIES` and let the existing fingerprint pass version it.

- [ ] **Step 8: Run tests and commit**

Run: `node --test tests/site-navigation.test.js tests/build-site.test.js`

Expected: PASS.

Commit:

```bash
git add site-navigation.js tests/site-navigation.test.js tests/build-site.test.js course-data.js advanced-course-data.js index.html styles.css app.js scripts/build-site.js
git commit -m "feat: add layered course navigation"
```

### Task 2: Explicit course-page home hierarchy and grouped sidebar

**Files:**
- Modify: `course.js`
- Modify: `course-menu.js`
- Modify: `course.css`
- Modify: `courses/01-introduction.html` through `courses/12-project.html`
- Modify: `advanced/01-filament-drying.html` through `advanced/04-filament-selection.html`
- Test: `tests/course-menu.test.js`
- Test: `tests/build-site.test.js`

**Interfaces:**
- Produces `renderCourseNavigation(courses, currentCourse, track): string` in `course.js`.
- Beginner groups are derived from each course's existing `stage` field; advanced courses remain a flat list.
- Course headers expose `.site-home-link` and `.track-overview-link`; the sidebar exposes `.course-quick-links`.

- [ ] **Step 1: Add failing hierarchy assertions**

Assert built beginner and advanced pages contain:

```js
assert.match(beginner, /class="site-home-link"[^>]*href="\.\.\/index\.html"[^>]*>網站首頁/);
assert.match(beginner, /class="track-overview-link"[^>]*href="\.\.\/index\.html#path"[^>]*>初階課程總覽/);
assert.match(advanced, /class="track-overview-link"[^>]*href="index\.html"[^>]*>進階課程總覽/);
assert.match(beginner, /第一次成功[\s\S]*理解與調整[\s\S]*獨立完成/);
```

Extend `tests/course-menu.test.js` to prove quick links and grouped course links close the mobile drawer without stealing focus.

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test tests/course-menu.test.js tests/build-site.test.js`

Expected: FAIL on missing explicit links/group headings.

- [ ] **Step 3: Update all course shells**

Use the same topbar and sidebar quick-link markup in every course HTML. Beginner topbar links to `../index.html` and `../index.html#path`; advanced links to `../index.html` and `index.html`. Keep `#courseStage` as the right-side context.

- [ ] **Step 4: Render grouped beginner navigation**

In `course.js`, group beginner courses by first-seen `stage` and render:

```html
<section class="course-nav-group">
  <h2>第一次成功</h2>
  <a ...><span>01</span>認識 3D 列印</a>
</section>
```

Advanced output remains a direct list (A01–A04 at this task, automatically A01–A05 after Task 5 adds the course). Preserve active styling and add `aria-current="page"`.

- [ ] **Step 5: Extend drawer close targets and responsive styles**

`course-menu.js` listens to all sidebar anchors, including `.course-quick-links`. `course.css` keeps both topbar destinations visible at 390px using short explicit labels rather than the current generic `← 首頁` pseudo-content.

- [ ] **Step 6: Run tests and commit**

Run: `node --test tests/course-menu.test.js tests/build-site.test.js`

Expected: PASS.

Commit all 16 existing course shells plus JS/CSS/tests with message `feat: clarify course page navigation`.

### Task 3: Define A05 output contract

**Files:**
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Establishes A05 title, ten asset filenames, required lesson concepts, source labels, five-course totals, and image-guide output before production code exists.

- [ ] **Step 1: Write the failing A05 test**

Add expectations for:

```js
assert.equal(result.advancedCourseCount, 5);
assert.equal(result.htmlCount, 19);
assert.match(forceDirection, /受力方向與列印方向/);
assert.match(forceDirection, /拉伸[\s\S]*壓縮[\s\S]*彎曲[\s\S]*剪切[\s\S]*扭轉/);
assert.match(forceDirection, /XY[\s\S]*Z[\s\S]*層間/);
assert.match(forceDirection, /掛鉤[\s\S]*L 型支架[\s\S]*螺絲孔[\s\S]*卡扣/);
assert.match(forceDirection, /網站首頁[\s\S]*進階課程總覽/);
assert.equal((forceDirection.match(/GPT 教學圖解/g) || []).length, 10);
assert.ok((forceDirection.match(/圖解步驟/g) || []).length >= 10);
```

Assert the ten files listed in Task 4 exist and that homepage/advanced overview/course shells show five advanced courses.

- [ ] **Step 2: Run focused test and verify RED**

Run: `node --test --test-name-pattern="force direction" tests/build-site.test.js`

Expected: FAIL because `advanced/05-force-direction.html` and its assets do not exist.

- [ ] **Step 3: Commit the red contract**

```bash
git add tests/build-site.test.js
git commit -m "test: define advanced force direction course"
```

### Task 4: Generate ten annotated A05 teaching images

**Files:**
- Create: `docs/image-prompts/advanced-a05-illustrations.md`
- Create: `assets/advanced-a05/illustrations/force-types.webp`
- Create: `assets/advanced-a05/illustrations/xy-z-anisotropy.webp`
- Create: `assets/advanced-a05/illustrations/bracket-orientations.webp`
- Create: `assets/advanced-a05/illustrations/hook-load-path.webp`
- Create: `assets/advanced-a05/illustrations/fastener-snap-fit.webp`
- Create: `assets/advanced-a05/illustrations/bambu-preview.webp`
- Create: `assets/advanced-a05/illustrations/break-test.webp`
- Create: `assets/advanced-a05/illustrations/screw-boss-detail.webp`
- Create: `assets/advanced-a05/illustrations/snap-fit-sequence.webp`
- Create: `assets/advanced-a05/illustrations/preview-fracture-match.webp`

**Interfaces:**
- Every output is exactly 1536×1024 WebP.
- All share blue force arrows, yellow fixed points, green load paths, purple layer lines, red dashed failure planes, and an XY/Z legend.
- Images 1–7 are core figures; images 8–10 are detail figures embedded after sections 4, 6, and 7.

- [ ] **Step 1: Write complete prompts**

Document the shared art direction, exact allowed Traditional Chinese labels, diagram geometry, legend, forbidden elements, and alt text for each image. Limit each main figure to 5–8 labels and use numbered callouts `1`–`5` where detailed prose will live below the image.

- [ ] **Step 2: Generate and inspect every image**

Use the image generation skill one image at a time. After each result, inspect at original resolution. Reject or precisely edit any image with Simplified Chinese, malformed text, reversed arrow direction, missing legend, intersecting labels, or an incorrect layer/failure relationship.

- [ ] **Step 3: Convert selected PNGs to WebP**

Use `cwebp -q 88` for all ten selected files, then run:

```bash
identify -format '%f %wx%h\n' assets/advanced-a05/illustrations/*.webp
```

Expected: ten lines, each `1536x1024`.

- [ ] **Step 4: Commit image assets and prompts**

```bash
git add assets/advanced-a05 docs/image-prompts/advanced-a05-illustrations.md
git commit -m "assets: add force direction teaching diagrams"
```

### Task 5: Implement A05 data, detail figures, sources, and course counts

**Files:**
- Create: `advanced/05-force-direction.html`
- Modify: `advanced-course-data.js`
- Modify: `course.js`
- Modify: `scripts/build-site.js`
- Modify: `course.css`
- Modify: `advanced/index.html`
- Modify: `advanced.css`
- Modify: `advanced/01-filament-drying.html` through `advanced/04-filament-selection.html`
- Modify: `index.html`

**Interfaces:**
- A manga object may contain `guides: Array<{ number: string, title: string, text: string }>`.
- A section may contain `detailFigures: Manga[]`.
- `renderMangaFigure(manga, loading): string` renders image, caption, and `.figure-guide` list in browser JS.
- Static builder `renderManga(manga)` emits equivalent guide markup and `renderDetailFigures(section.detailFigures)`.

- [ ] **Step 1: Add guide/detail rendering with the minimal A05 shell**

Refactor the current inline manga markup in `course.js` into `renderMangaFigure`. Add `renderDetailFigures` without changing existing course output when `guides` and `detailFigures` are absent. Mirror the same output in `scripts/build-site.js`.

- [ ] **Step 2: Add seven-section A05 data**

Create A05 with the exact seven section sequence in the approved spec. Each core manga includes 3–5 numbered guides. Sections 4, 6, and 7 include one detail figure each, bringing the total to ten. Explain uncertainty honestly: orientation affects performance, but material, temperature, moisture, geometry, walls, raster, and print quality also matter.

- [ ] **Step 3: Add authoritative sources**

Link the relevant section directly to UltiMaker FFF design guidance, Stratasys FDM design considerations, Prusa structural-orientation/infill documentation, BambuStudio official repository/settings, and peer-reviewed orientation research. Label source type accurately; do not call a non-Wiki source “Bambu Lab Wiki”.

- [ ] **Step 4: Update counts and overview cards**

Update all advanced shells to `data-course-total="5"`, `5 ADVANCED COURSES`, and `0 / 5`. Add the A05 card to `advanced/index.html`; update homepage copy/status to `5 堂課已開放`; add `.advanced-force` styling.

- [ ] **Step 5: Style image guides and detail figures**

Add a responsive numbered guide grid below figures, strong color-key chips, and mobile one-column guides. Preserve `.course-page[data-track="advanced"] .manga-figure img { aspect-ratio: 3/2; object-fit: contain; }`.

- [ ] **Step 6: Run focused tests and commit**

Run: `node --test --test-name-pattern="force direction|advanced courses|homepage" tests/build-site.test.js`

Expected: PASS.

Commit production files with message `feat: add advanced force direction course`.

### Task 6: Full verification, visual QA, and publication

**Files:**
- Verify all modified files; no new production files unless QA exposes a specific defect.

**Interfaces:**
- Public deliverable: `https://m72900024.github.io/3d-printing-teaching/advanced/05-force-direction.html`.

- [ ] **Step 1: Run full automated verification**

Run:

```bash
git diff --check
node --test tests/*.test.js
node scripts/build-site.js
```

Expected: all tests pass; build reports 12 beginner, 5 advanced, 19 HTML pages.

- [ ] **Step 2: Inspect desktop navigation and A05**

At 1440×900, verify homepage beginner groups, advanced A01–A05, outside-click/Escape, course-page home/overview links, ten loaded 1536×1024 images, readable callouts, working sources, and zero horizontal overflow.

- [ ] **Step 3: Inspect mobile navigation and A05**

At 390×844, verify menu focus/overlay/Escape, one accordion open at a time, explicit 網站首頁 and 課程總覽 labels, 44px targets, one-column guides, complete images, and zero horizontal overflow. Reset the viewport afterward.

- [ ] **Step 4: Publish and merge**

Explicitly stage only in-scope files, leaving `_修改紀錄.md` untouched. Push `agent/improve-navigation-and-force-direction-course`, open a PR to `main`, wait for checks, merge after success, and wait for the Pages workflow.

- [ ] **Step 5: Verify the public deployment**

Open the public A05 URL and verify title, ten images, source links, five-course navigation, and zero overflow. Leave the public A05 page open as the user-facing deliverable.
