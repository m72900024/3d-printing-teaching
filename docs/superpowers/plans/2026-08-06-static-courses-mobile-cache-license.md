# Static Courses, Mobile Menu, Cache, and License Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish all 12 courses with readable static core content, improve the mobile course menu, fingerprint local assets, and document the site licensing and repository metadata.

**Architecture:** A dependency-free Node.js build module copies public files to `_site`, pre-renders course data into the existing HTML placeholders, and fingerprints local CSS/JS references. A small standalone menu controller owns mobile navigation state and is loaded before `course.js`; both components are covered by Node's built-in test runner.

**Tech Stack:** Static HTML/CSS/JavaScript, Node.js built-ins (`node:test`, `assert`, `fs`, `path`, `vm`, `crypto`), GitHub Actions, GitHub Pages.

## Global Constraints

- Do not change the course durations shown on the home page.
- Do not introduce a front-end framework, package manager, or third-party build dependency.
- Keep existing visual styles and interactive course rendering.
- Code uses MIT; original teaching text and original/AI-assisted illustrations use CC BY 4.0; third-party materials remain excluded.
- Pull requests validate but do not deploy.

---

### Task 1: Static course build and fingerprinting

**Files:**
- Create: `tests/build-site.test.js`
- Create: `scripts/build-site.js`
- Create: `.gitignore`

**Interfaces:**
- Produces: `buildSite({ rootDir, outputDir }): { courseCount: number, htmlCount: number }`
- Produces: executable `node scripts/build-site.js` that writes `_site`.

- [ ] **Step 1: Write the failing integration test**

Use `node:test` to import `buildSite`, build the real repository into a temporary directory, and assert literal user-visible outcomes:

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { buildSite } = require("../scripts/build-site");

test("publishes twelve course pages with static core content", () => {
  const rootDir = path.resolve(__dirname, "..");
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "3d-course-site-"));
  const result = buildSite({ rootDir, outputDir });
  const first = fs.readFileSync(path.join(outputDir, "courses/01-introduction.html"), "utf8");
  const last = fs.readFileSync(path.join(outputDir, "courses/12-project.html"), "utf8");

  assert.equal(result.courseCount, 12);
  assert.match(first, /<h1 id="courseTitle">認識 3D 列印<\/h1>/);
  assert.match(first, /3D 列印到底做了什麼？/);
  assert.match(first, /切片想像實驗/);
  assert.match(last, /<h1 id="courseTitle">維護與成果挑戰<\/h1>/);
  assert.match(last, /我能獨立完成作品/);
});

test("fingerprints every local stylesheet and script reference", () => {
  const rootDir = path.resolve(__dirname, "..");
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), "3d-course-assets-"));
  buildSite({ rootDir, outputDir });

  for (const relative of ["index.html", "courses/01-introduction.html", "courses/12-project.html"]) {
    const html = fs.readFileSync(path.join(outputDir, relative), "utf8");
    const localAssets = [...html.matchAll(/(?:href|src)="([^"?]+\.(?:css|js))\?v=([a-f0-9]{12})"/g)];
    assert.ok(localAssets.length >= 2, relative + " should use fingerprinted assets");
    for (const [, asset, version] of localAssets) {
      assert.equal(version.length, 12);
      assert.ok(fs.existsSync(path.resolve(path.dirname(path.join(outputDir, relative)), asset)));
    }
  }
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/build-site.test.js`

Expected: FAIL because `../scripts/build-site` does not exist.

- [ ] **Step 3: Implement the minimal build module**

Create `scripts/build-site.js` with focused helpers:

```js
function loadCourses(rootDir) { /* evaluate course-data.js in a VM sandbox */ }
function renderStaticCourse(course, courses) { /* semantic core text and navigation */ }
function injectCourse(html, course, courses) { /* fill existing empty IDs */ }
function fingerprintHtmlAssets(htmlFile, outputDir) { /* SHA-256 first 12 chars */ }
function buildSite({ rootDir, outputDir }) { /* copy allowlist, inject, fingerprint */ }
module.exports = { buildSite };
```

Copy only `.nojekyll`, `index.html`, `styles.css`, `app.js`, `course.css`, `course-data.js`, `course-menu.js`, `course.js`, `assets`, and `courses`. Escape generated text and render section bodies plus the existing structured fields (`steps`, `cards`, `details`, `examples`, `points`, `compare`, `callout`, `sources`, `realCase`, task, checkpoint). When run directly, build `_site` and print the course/page counts.

- [ ] **Step 4: Ignore generated output and verify GREEN**

Add `_site/` to `.gitignore`, then run:

```bash
node --test tests/build-site.test.js
node scripts/build-site.js
```

Expected: two passing tests and `_site` containing 12 populated course pages.

- [ ] **Step 5: Commit**

```bash
git add .gitignore scripts/build-site.js tests/build-site.test.js
git commit -m "feat: pre-render static course pages"
```

---

### Task 2: Accessible mobile course menu

**Files:**
- Create: `tests/course-menu.test.js`
- Create: `course-menu.js`
- Modify: `course.js:283-290`
- Modify: `course.css:1-35`
- Modify: `courses/01-introduction.html`
- Modify: `courses/02-safety.html`
- Modify: `courses/03-workflow.html`
- Modify: `courses/04-files.html`
- Modify: `courses/05-studio.html`
- Modify: `courses/06-first-print.html`
- Modify: `courses/07-orientation.html`
- Modify: `courses/08-parameters.html`
- Modify: `courses/09-support.html`
- Modify: `courses/10-materials.html`
- Modify: `courses/11-troubleshooting.html`
- Modify: `courses/12-project.html`

**Interfaces:**
- Produces: `setupCourseMenu({ document, window }): { open(), close({ restoreFocus }) }`
- Consumes: `.menu-button`, `.course-sidebar`, and `.course-nav` from every course page.

- [ ] **Step 1: Write failing behavior tests**

Build a minimal event-target fixture in `tests/course-menu.test.js` and verify these observable outcomes:

```js
test("opens with an overlay and accessible expanded state", () => {
  const fixture = createMenuFixture();
  setupCourseMenu(fixture);
  fixture.menuButton.click();
  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "true");
  assert.equal(fixture.sidebar.classList.contains("open"), true);
  assert.equal(fixture.document.body.classList.contains("course-menu-open"), true);
  assert.equal(fixture.overlay.hidden, false);
});

test("overlay, navigation, Escape, and desktop transition close the menu", () => {
  for (const action of ["overlay", "navigation", "escape", "desktop"]) {
    const fixture = createMenuFixture();
    setupCourseMenu(fixture);
    fixture.menuButton.click();
    fixture.run(action);
    assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false", action);
    assert.equal(fixture.sidebar.classList.contains("open"), false, action);
  }
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test tests/course-menu.test.js`

Expected: FAIL because `course-menu.js` does not exist.

- [ ] **Step 3: Implement the menu controller**

Create a browser/CommonJS-compatible controller. It sets `id="courseSidebar"`, `aria-controls`, `aria-expanded`, creates a button overlay, centralizes `open`/`close`, listens for overlay click, delegated course navigation, Escape, and media-query changes, and restores focus only for direct dismissals.

Replace the single existing menu toggle listener in `course.js` with:

```js
window.setupCourseMenu({ document, window });
```

Load `course-menu.js` before `course.js` in all 12 source pages. Add overlay, body-scroll-lock, and focus-visible CSS while preserving the current 900px sidebar breakpoint.

- [ ] **Step 4: Run tests and verify GREEN**

Run:

```bash
node --test tests/course-menu.test.js
node --test tests/build-site.test.js
```

Expected: all menu and build tests pass; generated pages include fingerprinted `course-menu.js`.

- [ ] **Step 5: Commit**

```bash
git add course-menu.js course.js course.css courses tests/course-menu.test.js
git commit -m "feat: improve mobile course navigation"
```

---

### Task 3: Validation-first Pages workflow

**Files:**
- Modify: `.github/workflows/pages.yml`

**Interfaces:**
- Consumes: `node scripts/build-site.js` and `node --test tests/*.test.js`.
- Produces: `_site` Pages artifact only after validation passes.

- [ ] **Step 1: Run the exact local CI commands**

Run:

```bash
node --check scripts/build-site.js
node --check course-menu.js
node --check course.js
node --check course-data.js
node --test tests/*.test.js
node scripts/build-site.js
```

Expected: all commands exit 0 before the workflow is changed.

- [ ] **Step 2: Split build and deploy jobs**

Add `pull_request` for `main`. The `build` job checks out code, runs syntax checks, tests, and the site build, then uploads `_site` only outside pull requests. The `deploy` job uses `needs: build`, runs only outside pull requests, owns the `github-pages` environment, and calls `actions/deploy-pages@v4`.

- [ ] **Step 3: Review workflow semantics and commit**

Verify the artifact path is `_site`, `deploy` is skipped for `pull_request`, and push/manual events still deploy.

```bash
git add .github/workflows/pages.yml
git commit -m "ci: validate static site before Pages deploy"
```

---

### Task 4: Licensing and project documentation

**Files:**
- Create: `LICENSE.md`
- Modify: `README.md`

**Interfaces:**
- Produces: human-readable dual-license boundaries and current local build instructions.

- [ ] **Step 1: Add the approved dual-license notice**

Create `LICENSE.md` containing the full MIT grant for source code, a CC BY 4.0 notice and canonical license link for original teaching content/illustrations, and a clear third-party exclusion covering photos, videos, trademarks, and cited material.

- [ ] **Step 2: Update README**

Add the public site URL, `node scripts/build-site.js` plus `python -m http.server 4173 --directory _site` preview flow, `node --test tests/*.test.js` verification, and a link to `LICENSE.md`. Do not change the home-page course duration copy.

- [ ] **Step 3: Check prose and commit**

Run `git diff --check`, inspect the rendered Markdown structure, then:

```bash
git add LICENSE.md README.md
git commit -m "docs: clarify site licensing and local workflow"
```

---

### Task 5: Repository metadata, verification, and PR

**Files:**
- Verify all modified files; no new production files beyond Tasks 1-4.

**Interfaces:**
- GitHub About description: `給初學者的 FDM 3D 列印互動教學，從第一次成功到獨立完成。`
- Homepage: `https://m72900024.github.io/3d-printing-teaching/`
- Topics: `3d-printing`, `fdm`, `education`, `bambu-studio`, `github-pages`.

- [ ] **Step 1: Run full fresh verification**

```bash
rm -rf _site
node --check scripts/build-site.js
node --check course-menu.js
node --check course.js
node --check course-data.js
node --test tests/*.test.js
node scripts/build-site.js
git diff --check origin/main...HEAD
git status --short
```

Expected: syntax checks exit 0, all tests pass, build reports 12 courses, diff check is clean, and only `_site/` is ignored.

- [ ] **Step 2: Update GitHub About**

After confirming `gh auth status`, run `gh repo edit m72900024/3d-printing-teaching` with the approved description, homepage, and topics. If authentication lacks repository administration scope, report this one external limitation without weakening the code/PR handoff.

- [ ] **Step 3: Push and open a draft PR**

```bash
git push -u origin codex/static-courses-mobile-cache-license
```

Open a draft PR into `main` summarizing static content, mobile behavior, fingerprinting, workflow validation, and licensing. Do not merge it automatically.
