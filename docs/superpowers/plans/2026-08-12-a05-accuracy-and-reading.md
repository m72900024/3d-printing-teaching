# A05 Accuracy and Reading Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct three misleading A05 diagrams and make the long illustrated lesson easier to navigate and read on mobile.

**Architecture:** Keep lesson content in `advanced-course-data.js`, render matching static and JavaScript-enhanced markup from the existing builder and `course.js`, and isolate gallery/outline behavior in a small testable `course-media.js` module. Scope all new presentation rules to `body[data-course="A05"]` so other lessons retain their current behavior.

**Tech Stack:** Static HTML, CSS, browser JavaScript, Node.js built-in test runner, existing static site builder, GPT image editing.

## Global Constraints

- Traditional Chinese only for learner-facing copy and in-image labels.
- Preserve the existing cream, ink-black, and lime-green advanced-course visual language.
- Do not modify or stage `_修改紀錄.md`.
- Keep seven lesson sections, ten main lesson figures, and ten figure-guide blocks.
- Do not claim structural load capacity or applicability to safety-critical parts.

---

### Task 1: Define A05 static-output requirements

**Files:**
- Modify: `tests/build-site.test.js`
- Test: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildTemporarySite(prefix)` and generated `advanced/05-force-direction.html`.
- Produces: regression assertions for terminology, outline anchors, one goal illustration, branding, lightbox hook, and Covestro source.

- [ ] **Step 1: Write the failing test**

Extend the existing A05 test to require `單層擠出路徑`, `逐層堆疊方向`, `自攻／擠牙螺絲`, seven `lesson-section-*` IDs, seven `回到本課目錄` links, one A05 goal image, `3D 列印進階教室`, a `course-media.js` script, and the Covestro source URL.

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/build-site.test.js`

Expected: FAIL because the new A05 terms, navigation, and media script do not exist yet.

- [ ] **Step 3: Keep the failing assertions unchanged for Tasks 2–3**

Do not weaken counts or replace exact learner-facing terms with broad regular expressions.

### Task 2: Correct A05 lesson data and static rendering

**Files:**
- Modify: `advanced-course-data.js`
- Modify: `scripts/build-site.js`
- Modify: `advanced/05-force-direction.html`
- Modify: `course.js`

**Interfaces:**
- Consumes: A05 `goals`, `goalArt`, `sections`, `manga`, `detailFigures`, and `sources`.
- Produces: `#lessonOutline`, `#lesson-section-1` through `#lesson-section-7`, `.back-to-outline`, `.back-to-top`, balanced A05 title spans, and one summary goal image.

- [ ] **Step 1: Update the exact A05 teaching copy**

Change the XY/Z labels to distinguish layer-internal extrusion paths from Z build direction. Limit radial screw stress to direct thread-forming/self-tapping use, contrast inserts and nuts, and describe hook tension/compression at a selected root section rather than as a universal curve-wide state.

- [ ] **Step 2: Render stable section IDs and lesson outline**

Add deterministic IDs in both static builder and browser rendering. Render seven numbered outline links and a return link at each section end.

- [ ] **Step 3: Reduce duplicated goal art**

For A05 only, render one representative image followed by all six text goals. Leave every other course goal layout unchanged.

- [ ] **Step 4: Unify advanced branding and title wrapping**

Set advanced document titles to `3D 列印進階教室` and render two A05 title spans that remain inline on desktop and break into balanced lines on mobile.

- [ ] **Step 5: Run the A05 build test**

Run: `node --test tests/build-site.test.js`

Expected: remaining failure only for media behavior/script until Task 3 is complete.

### Task 3: Add accessible image enlargement and section tracking

**Files:**
- Create: `course-media.js`
- Create: `tests/course-media.test.js`
- Modify: `course.css`
- Modify: `scripts/build-site.js`
- Modify: `advanced/05-force-direction.html`
- Modify: `course.js`

**Interfaces:**
- Produces: `createGalleryState(count, onChange)` and `setupCourseMedia({ document, window })`.
- `createGalleryState` methods: `open(index)`, `next()`, `previous()`, `close()`, `handleKey(key)`.
- `setupCourseMedia` enhances `figure.manga-figure img` and `.lesson-outline` only when present.

- [ ] **Step 1: Write controller tests first**

Test open state, next/previous wrap, Escape close, and change notifications in `tests/course-media.test.js`.

- [ ] **Step 2: Run controller tests and verify RED**

Run: `node --test tests/course-media.test.js`

Expected: FAIL because `course-media.js` does not exist.

- [ ] **Step 3: Implement the minimal state controller**

Export the controller for Node and expose `window.setupCourseMedia` in browsers.

- [ ] **Step 4: Implement the DOM adapter**

Make each lesson image keyboard-focusable and open a modal dialog with original image, caption, counter, previous, next, and close controls. Restore focus and body scrolling on close. Update `aria-current="location"` on the visible outline link.

- [ ] **Step 5: Add scoped responsive styles**

Add A05-only styles for balanced title spans, compact outline, mobile horizontal outline scrolling, image zoom cursor/focus, modal layout, and fixed back-to-top control. Respect `prefers-reduced-motion`.

- [ ] **Step 6: Run controller and build tests**

Run: `node --test tests/course-media.test.js tests/build-site.test.js`

Expected: PASS.

### Task 4: Revise the three technical diagrams and prompt record

**Files:**
- Modify: `assets/advanced-a05/illustrations/xy-z-anisotropy.webp`
- Modify: `assets/advanced-a05/illustrations/hook-load-path.webp`
- Modify: `assets/advanced-a05/illustrations/screw-boss-detail.webp`
- Modify: `docs/image-prompts/advanced-a05-illustrations.md`

**Interfaces:**
- Consumes: approved source images at 1536×1024.
- Produces: corrected WebP assets with the same filenames and dimensions so no page paths change.

- [ ] **Step 1: Edit XY/Z diagram**

Replace `列印方向` with distinct `單層擠出路徑` and `逐層堆疊方向` labels while preserving the existing visual style and layout.

- [ ] **Step 2: Edit screw-boss diagram**

Label it as a self-tapping/thread-forming screw case, show radial stress only in engaged plastic, and add a compact contrast note for metal insert/nut fastening.

- [ ] **Step 3: Edit hook diagram**

Show a distributed clamped boundary, load contact point, root analysis section, and conditional initiation zone. Limit tension/compression labels to that section.

- [ ] **Step 4: Inspect every corrected image**

Verify Traditional Chinese, arrow direction, text legibility, unchanged 3:2 aspect ratio, and absence of cropped labels or watermarks.

- [ ] **Step 5: Update prompt documentation**

Record exact revised prompts and the technical invariants for future regeneration.

### Task 5: Full verification and publication

**Files:**
- Verify all modified files.

**Interfaces:**
- Produces: tested static output and public GitHub Pages deployment.

- [ ] **Step 1: Run complete automated verification**

Run: `node --test tests/*.test.js && node scripts/build-site.js && git diff --check`

Expected: all tests pass, 19 HTML pages build, and diff check exits 0.

- [ ] **Step 2: Run browser visual verification**

Check local static output at 1280×720 and 390×844. Verify no horizontal overflow, ten loaded figures, working modal keyboard controls, seven outline links, balanced title, and return-to-top behavior.

- [ ] **Step 3: Commit only scoped files**

Stage the implementation, tests, images, prompt documentation, and this plan. Leave `_修改紀錄.md` untracked.

- [ ] **Step 4: Push current branch and fast-forward `main`**

Fetch `origin/main`, confirm it is an ancestor of `HEAD`, then push the tested branch and `HEAD:main`.

- [ ] **Step 5: Verify the public page**

Open `https://m72900024.github.io/3d-printing-teaching/advanced/05-force-direction.html`, confirm the deployed asset fingerprints changed, and repeat image/load/overflow checks.
