# Course 06 A1 Illustrations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three original A1 teaching illustrations to Course 06 goal cards and matching lesson sections, with GPT labels, Bambu Lab Wiki references, and versioned prompts committed to GitHub.

**Architecture:** Generate three project-owned WebP assets that reuse the visual language of Courses 05–06 without copying Wiki images. Extend the existing Course 06 data and goal-art mapping; make the existing section manga label data-driven so only the new illustrations display `GPT 教學圖解`.

**Tech Stack:** Built-in image generation, WebP assets, static JavaScript course data, Node.js built-in tests and site builder.

## Global Constraints

- Generate exactly three 3:2 landscape images: preflight, four first-layer states, and five-step cooled removal.
- Reuse each image in one goal card and one full-width lesson section.
- Keep all long labels, captions, and citations in HTML rather than inside generated pixels.
- Do not copy, download, hotlink, or republish Bambu Lab Wiki images.
- Save final prompts and source URLs in `docs/image-prompts/course-06-a1-illustrations.md`.
- Keep all changes on `agent/course-06-a1` and update draft PR #26.

---

### Task 1: Define the illustration contract with a failing test

**Files:**
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildSite()` and generated `_site/course.js`, `_site/course-data.js`, and `_site/assets`.
- Produces: test `publishes Course 06 goal and lesson illustrations with credits`.

- [ ] **Step 1: Add the failing test**

```js
test("publishes Course 06 goal and lesson illustrations with credits", () => {
  const { outputDir } = buildTemporarySite("3d-course-a1-illustrations-");
  const courseScript = fs.readFileSync(path.join(outputDir, "course.js"), "utf8");
  const courseData = fs.readFileSync(path.join(outputDir, "course-data.js"), "utf8");
  const files = [
    "a1-preflight.webp",
    "first-layer-four-states.webp",
    "cooled-removal-five-steps.webp"
  ];

  for (const file of files) {
    assert.ok(fs.existsSync(path.join(outputDir, "assets/course-06/illustrations", file)));
    assert.match(courseScript, new RegExp(file));
    assert.match(courseData, new RegExp(file));
  }
  assert.equal((courseData.match(/label:\"GPT 教學圖解\"/g) || []).length, 3);
  assert.equal((courseData.match(/內容參考：Bambu Lab Wiki/g) || []).length, 3);
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test --test-name-pattern="Course 06 goal and lesson illustrations" tests/build-site.test.js`

Expected: FAIL because the three files and Course 06 mappings do not exist.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/build-site.test.js
git commit -m "test: define A1 lesson illustration contract"
```

---

### Task 2: Generate and document the three original illustrations

**Files:**
- Create: `assets/course-06/illustrations/a1-preflight.webp`
- Create: `assets/course-06/illustrations/first-layer-four-states.webp`
- Create: `assets/course-06/illustrations/cooled-removal-five-steps.webp`
- Create: `docs/image-prompts/course-06-a1-illustrations.md`

**Interfaces:**
- Consumes: Course 05 `slicer-workflow.webp` and Course 06 `first-print-first-layer.webp` as style references only.
- Produces: three 3:2 WebP assets and a Markdown provenance file with the final prompt for each.

- [ ] **Step 1: Generate the A1 preflight image**

Create a three-part visual showing A1 hardware, PLA/plate/nozzle checks, and a simplified slicer-ready confirmation. No long text, logo, or watermark.

- [ ] **Step 2: Generate the four-state first-layer image**

Create four equal panels whose filament geometry clearly distinguishes normal, too high, too low, and no adhesion. No long text, logo, or watermark.

- [ ] **Step 3: Generate the cooled-removal image**

Create five sequential panels: job complete, cooling wait, remove spring steel plate, gently flex, remove skirt and clean. Hands never approach a moving or hot print head.

- [ ] **Step 4: Inspect and persist the selected outputs**

Open every output at original detail, reject unreadable or unsafe imagery, then copy the selected results into `assets/course-06/illustrations/` as WebP.

- [ ] **Step 5: Record prompts and references**

Write `docs/image-prompts/course-06-a1-illustrations.md` with use case, output path, final prompt, reference-image role, and corresponding Bambu Lab Wiki URL for each asset.

- [ ] **Step 6: Commit the assets and prompt document**

```bash
git add assets/course-06/illustrations docs/image-prompts/course-06-a1-illustrations.md
git commit -m "assets: add A1 lesson illustrations"
```

---

### Task 3: Wire illustrations into goal cards and lesson sections

**Files:**
- Modify: `course.js`
- Modify: `course-data.js`
- Test: `tests/build-site.test.js`

**Interfaces:**
- Consumes: three asset paths from Task 2.
- Produces: Course 06 `goalArtByCourse["06"]`, three section `manga` objects, data-driven `manga.label`, and three source labels beginning `內容參考：Bambu Lab Wiki`.

- [ ] **Step 1: Add Course 06 goal art**

Add three `{ src, alt }` entries to `goalArtByCourse` using the new asset paths and specific Traditional Chinese alt text.

- [ ] **Step 2: Make the manga chip data-driven**

Change only the chip expression in `course.js`:

```js
<figcaption><span>${section.manga.label || "MANGA EXPLAINER"}</span>${section.manga.caption}</figcaption>
```

- [ ] **Step 3: Add the three section visuals and reference labels**

Add `manga:{ label:"GPT 教學圖解", src, alt, caption }` to Course 06 sections 1, 3, and 5. Rename the three existing source labels to begin with `內容參考：Bambu Lab Wiki｜`.

- [ ] **Step 4: Verify GREEN and regression suite**

Run:

```bash
node --test --test-name-pattern="Course 06 goal and lesson illustrations" tests/build-site.test.js
node --test tests/*.test.js
```

Expected: focused test passes and the full suite has zero failures.

- [ ] **Step 5: Commit the web integration**

```bash
git add course.js course-data.js
git commit -m "feat: illustrate A1 first print lesson"
```

---

### Task 4: Verify visually and update GitHub

**Files:**
- Verify: `_site/courses/06-first-print.html`
- Verify: `docs/image-prompts/course-06-a1-illustrations.md`

**Interfaces:**
- Consumes: all previous tasks.
- Produces: a verified update pushed to draft PR #26.

- [ ] **Step 1: Run final checks**

Run `node --check course-data.js`, `node --check course.js`, `node --check scripts/build-site.js`, `node --test tests/*.test.js`, and `node scripts/build-site.js`.

- [ ] **Step 2: Refresh the local preview and inspect the DOM**

Confirm three Course 06 goal images, three section images, three `GPT 教學圖解` labels, and three `內容參考：Bambu Lab Wiki` links.

- [ ] **Step 3: Inspect desktop and mobile screenshots**

Confirm the images are legible, goal-card crops preserve the subject, the four-state and five-step sequences remain understandable, and no image fails to load.

- [ ] **Step 4: Push and verify PR #26**

Push `agent/course-06-a1`, verify PR #26 still targets `main`, and update its body to mention the three generated illustrations and committed prompts.
