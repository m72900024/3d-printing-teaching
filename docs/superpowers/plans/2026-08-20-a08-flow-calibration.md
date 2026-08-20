# A08 Flow Calibration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a complete Traditional Chinese A08 lesson that teaches Flow Dynamics, Flow Rate, profile recording, and one-variable verification for Bambu Lab A1 users.

**Architecture:** Add A08 through the existing `window.ADVANCED_COURSES` data model and generate its static HTML with the existing build script. Reuse the current advanced-course template and styling, add seven local teaching illustrations, and update only the overview, homepage count, navigation totals, and tests that must know the eighth course exists.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js built-in test runner, existing site build script, WebP teaching illustrations.

**Spec:** `docs/superpowers/specs/2026-08-20-advanced-courses-a08-a12-design.md`

## Global Constraints

- All learner-facing copy is Traditional Chinese.
- Primary operating context is Bambu Lab A1 and Bambu Studio.
- Do not provide a universal K value or universal flow-ratio value.
- Every instructional illustration is functional, clearly labeled, and stored locally as WebP.
- Interface images that are not authentic screenshots are labeled as teaching diagrams.
- Official references appear near the section they support.
- A08 must be fully usable before the public count changes from seven to eight.
- Do not modify or remove unrelated user files in the dirty worktree.

---

### Task 1: Add failing A08 publication tests

**Files:**
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildSite({ rootDir, outputDir })` from `scripts/build-site.js`.
- Produces: regression expectations for A08 static output, assets, references, navigation, and homepage counts.

- [ ] **Step 1: Add one focused test named `publishes A08 flow calibration with seven functional illustrations`**

The test must build a temporary site and assert:

```js
assert.equal(result.advancedCourseCount, 8);
assert.equal(result.htmlCount, 22);
assert.match(lesson, /流量校正與建立線材預設/);
assert.match(lesson, /Flow Dynamics[\s\S]*Flow Rate/);
assert.match(lesson, /不是通用數值/);
assert.match(lesson, /校正前[\s\S]*校正後/);
assert.match(lesson, /wiki\.bambulab\.com\/en\/software\/bambu-studio\/calibration_pa/);
assert.match(overview, /A08[\s\S]*流量校正與建立線材預設/);
assert.match(home, /8 堂課已開放/);
assert.match(lesson, /data-course-total="8"/);
```

The same test must assert that these seven files exist in the built output:

```js
[
  "calibration-decision.webp",
  "dynamics-vs-flow.webp",
  "dynamics-corners.webp",
  "flow-rate-surfaces.webp",
  "extrusion-cross-section.webp",
  "profile-naming.webp",
  "before-after-verification.webp"
]
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `node --test --test-name-pattern="publishes A08" tests/build-site.test.js`

Expected: FAIL because A08 data, HTML, overview entry, count, and assets do not exist.

- [ ] **Step 3: Commit the failing regression test**

```bash
git add tests/build-site.test.js
git commit -m "test: define A08 flow calibration lesson"
```

### Task 2: Add A08 course data and static page

**Files:**
- Modify: `advanced-course-data.js`
- Create: `advanced/08-flow-calibration.html`
- Modify: `scripts/build-site.js`

**Interfaces:**
- Consumes: existing advanced course object fields used by `injectCourse`.
- Produces: an A08 object with `id`, `slug`, `stage`, `duration`, `type`, `title`, `subtitle`, `lead`, `goals`, `goalArt`, `sections`, `task`, and `checkpoint`.

- [ ] **Step 1: Extend outline and goal rendering to A08**

In `scripts/build-site.js`, replace the repeated fixed course lists for `renderLessonOutline`, `renderStaticContent`, and `renderCourseGoals` with one local constant containing `A05`, `A06`, `A07`, and `A08`. Do not change beginner rendering.

- [ ] **Step 2: Append the complete A08 data object**

Create six sections matching the approved spec:

1. 校正前先判斷：現在真的需要校正嗎？
2. Flow Dynamics 與 Flow Rate 各自處理什麼？
3. Flow Dynamics：看速度改變時的轉角
4. Flow Rate：看穩態出料的表面
5. 保存可追溯的線材預設
6. 用固定小件驗證校正前後

Each section includes a local `manga` image, specific observable guidance, a safety or boundary callout where needed, and an official source. The final section teaches a fixed-model, fixed-orientation, fixed-material, fixed-nozzle comparison where only the material preset changes.

- [ ] **Step 3: Create the A08 HTML shell from the A07 page pattern**

Set `data-course="A08"`, retain accessible placeholders required by the builder, and set the page description to the A08 topic. Do not paste rendered lesson copy into the source shell; the build script owns static injection.

- [ ] **Step 4: Run the focused test**

Run: `node --test --test-name-pattern="publishes A08" tests/build-site.test.js`

Expected: still FAIL only for missing image files and unchanged overview/home counts.

- [ ] **Step 5: Commit course data and page**

```bash
git add advanced-course-data.js advanced/08-flow-calibration.html scripts/build-site.js
git commit -m "feat: add A08 flow calibration content"
```

### Task 3: Create A08 functional teaching illustrations

**Files:**
- Create: `docs/image-prompts/advanced-a08-illustrations.md`
- Create: `assets/advanced-a08/illustrations/calibration-decision.webp`
- Create: `assets/advanced-a08/illustrations/dynamics-vs-flow.webp`
- Create: `assets/advanced-a08/illustrations/dynamics-corners.webp`
- Create: `assets/advanced-a08/illustrations/flow-rate-surfaces.webp`
- Create: `assets/advanced-a08/illustrations/extrusion-cross-section.webp`
- Create: `assets/advanced-a08/illustrations/profile-naming.webp`
- Create: `assets/advanced-a08/illustrations/before-after-verification.webp`

**Interfaces:**
- Consumes: image paths and alt text declared in the A08 course object.
- Produces: 3:2 WebP illustrations that load without cropping in the existing `object-fit: contain` advanced layout.

- [ ] **Step 1: Write all seven reusable image prompts**

Use a shared visual direction: 3:2 landscape, lively anime classroom style, ivory background, deep purple and mint accents, large Traditional Chinese labels, clear arrows, no brand logo, and no imitation screenshot. Each prompt specifies the exact comparison or process from the approved image list.

- [ ] **Step 2: Generate the seven illustrations**

Generate each image independently so its labels and teaching focus remain legible. Save outputs under `assets/advanced-a08/illustrations/` using the exact filenames above.

- [ ] **Step 3: Inspect every image**

Check that each image is 3:2, contains Traditional Chinese rather than Japanese or Simplified Chinese, has no clipped labels, and visually matches its lesson section. Regenerate any failed image instead of hiding defects with CSS.

- [ ] **Step 4: Run the focused test**

Run: `node --test --test-name-pattern="publishes A08" tests/build-site.test.js`

Expected: still FAIL only for overview/home/count updates.

- [ ] **Step 5: Commit prompts and assets**

```bash
git add docs/image-prompts/advanced-a08-illustrations.md assets/advanced-a08/illustrations
git commit -m "feat: illustrate A08 flow calibration"
```

### Task 4: Update overview, navigation, and published counts

**Files:**
- Modify: `advanced/index.html`
- Modify: `index.html`
- Modify: `site-navigation.js`
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Consumes: A08 slug and title from the approved course data.
- Produces: visible A08 links and accurate eight-course counts throughout the site.

- [ ] **Step 1: Add A08 to the advanced overview**

Add an A08 course card after A07 with the title, 40-minute estimate, calibration category, short description, and three outcomes. Update the hero progress denominator and visible course count from 7 to 8. Label the three stages without reordering existing URLs.

- [ ] **Step 2: Update the homepage advanced entry**

Change both visible seven-course labels to eight and add A08 to the advanced directory. Update the overview description so it mentions calibration without promising A09–A12 are open.

- [ ] **Step 3: Update the shared navigation directory**

Add A08 under the second advanced stage in `site-navigation.js`. Preserve the existing beginner directory and all current link targets.

- [ ] **Step 4: Update old seven-course regression expectations**

Change only expectations that now legitimately become eight courses or 22 total HTML pages. Preserve content assertions for A01–A07.

- [ ] **Step 5: Run all tests**

Run: `node --test tests/*.test.js`

Expected: PASS with no skipped or failed tests.

- [ ] **Step 6: Commit navigation and count updates**

```bash
git add advanced/index.html index.html site-navigation.js tests/build-site.test.js
git commit -m "feat: publish A08 in course navigation"
```

### Task 5: Build and visually verify A08

**Files:**
- Generated verification output only; do not commit `tmp/` or `output/` unless explicitly requested.

**Interfaces:**
- Consumes: the completed source tree.
- Produces: evidence that generated pages, links, text, and images are usable on desktop and mobile.

- [ ] **Step 1: Build the static site into a temporary directory**

Run the existing build command used by the repository and confirm it reports 12 beginner courses, 8 advanced courses, and 22 HTML pages.

- [ ] **Step 2: Scan generated A08 for content errors**

Confirm all seven local images, all six section headings, official source links, previous-course link to A07, homepage link, and advanced overview link appear. Search learner-facing A08 content for Japanese scripts and obvious Simplified Chinese variants.

- [ ] **Step 3: Inspect desktop and mobile rendering**

At desktop and narrow mobile widths, verify no image is covered, captions remain attached to images, tables scroll or fit, the lesson outline is usable, and header links return home and to the advanced overview.

- [ ] **Step 4: Run final verification**

Run:

```bash
node --test tests/*.test.js
git diff --check
git status --short
```

Expected: all tests pass, no whitespace errors, and only known user-owned untracked files remain.

- [ ] **Step 5: Commit any verification-only fixes**

If visual inspection requires a scoped A08 fix, commit only the directly related files:

```bash
git add <A08-related-files>
git commit -m "fix: refine A08 lesson presentation"
```
