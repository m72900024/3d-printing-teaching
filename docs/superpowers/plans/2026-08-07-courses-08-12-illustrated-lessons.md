# Courses 08–12 Illustrated Lessons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete courses 08–12 with fifteen original teaching illustrations, expanded lesson copy, official Bambu Lab Wiki references, prompt provenance, responsive goal cards, automated tests, browser verification, and an updated GitHub pull request.

**Architecture:** Keep the existing data-driven static-site architecture. Add goal-card image metadata in `course.js`, section illustrations and sources in `course-data.js`, course-scoped responsive styles in `course.css`, and project-owned WebP assets plus Markdown prompt records. Extend the existing static build test instead of introducing a new test framework.

**Tech Stack:** Vanilla HTML/CSS/JavaScript, Node.js test runner, project static build script, built-in image generation, WebP assets, Git and GitHub CLI.

## Global Constraints

- Create exactly fifteen new WebP illustrations: three for each course from 08 through 12.
- Reuse each illustration in one learning-goal card and one corresponding lesson section.
- Label all fifteen section figures `GPT 教學圖解`.
- Add at least fifteen `內容參考：Bambu Lab Wiki` source labels across courses 08–12.
- Do not download, hotlink, or recreate Bambu Lab Wiki images; use official pages only as content references.
- All visible in-image copy must use correct Traditional Chinese only; reject Japanese, Simplified Chinese, English headings, illegible pseudo-text, and misspelled labels.
- Preserve existing course data architecture and unrelated assets.
- Verify at 1354×868 and 390×844 with no horizontal overflow.

---

### Task 1: Define the publication contract

**Files:**
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildTemporarySite(prefix)` and generated `course.js`, `course-data.js`, `course.css`.
- Produces: one regression test covering all fifteen filenames, goal/section references, credit labels, and responsive image containment.

- [ ] **Step 1: Write the failing test**

Add a test named `publishes illustrated lessons 08 through 12 with credits` with this exact filename map:

```js
const illustratedCourses = {
  "08": ["layer-height-comparison.webp", "walls-vs-infill.webp", "one-variable-experiment.webp"],
  "09": ["orientation-bridge-support.webp", "normal-vs-tree-support.webp", "adhesion-aids.webp"],
  "10": ["material-use-cases.webp", "printer-material-match.webp", "moisture-storage-drying.webp"],
  "11": ["symptom-map.webp", "five-step-troubleshooting.webp", "fault-paths.webp"],
  "12": ["routine-maintenance.webp", "ten-point-preflight.webp", "capstone-workflow.webp"]
};
```

For each filename, assert the built asset exists and both `course.js` and `course-data.js` contain it. Assert the data contains fifteen `label:"GPT 教學圖解"` entries for these five courses and at least fifteen `內容參考：Bambu Lab Wiki` labels. Assert `course.css` includes a scoped image rule for courses 08–12 with `width:100%`, `height:100%`, and `object-fit:cover`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test --test-name-pattern='illustrated lessons 08 through 12' tests/build-site.test.js`

Expected: FAIL because the new assets and mappings do not exist.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/build-site.test.js
git commit -m "test: define illustrated lessons 08 through 12"
```

### Task 2: Complete course 08

**Files:**
- Create: `assets/course-08/illustrations/layer-height-comparison.webp`
- Create: `assets/course-08/illustrations/walls-vs-infill.webp`
- Create: `assets/course-08/illustrations/one-variable-experiment.webp`
- Create: `docs/image-prompts/course-08-illustrations.md`
- Modify: `course.js`
- Modify: `course-data.js`

**Interfaces:**
- Consumes: the three existing course 08 goals and sections.
- Produces: three goal-art entries, three section `manga` entries, expanded parameter guidance, and three official source labels.

- [ ] **Step 1: Generate and inspect three original 3:2 illustrations**

Generate: layer-height surface/time comparison; wall-loop versus infill comparison; controlled one-variable slicer experiment. Use project course 05/06 art only as style references. Convert accepted outputs to the exact WebP paths above.

- [ ] **Step 2: Record exact prompts and official references**

Create `docs/image-prompts/course-08-illustrations.md` with the final prompts and links to Layer height, Slicing Parameter Table, and How to Create Custom Preset.

- [ ] **Step 3: Integrate course 08**

Add `goalArtByCourse["08"]`. Add one `manga` and one Bambu Lab Wiki `sources` entry to each section. Expand the three sections with comparison rows, decision points, and the fixed 0.12/0.20/0.28 mm experiment without claiming one universal best setting.

- [ ] **Step 4: Run the focused contract test**

Run: `node --test --test-name-pattern='illustrated lessons 08 through 12' tests/build-site.test.js`

Expected: still FAIL only for courses 09–12.

- [ ] **Step 5: Commit course 08**

```bash
git add assets/course-08/illustrations docs/image-prompts/course-08-illustrations.md course.js course-data.js
git commit -m "feat: illustrate course 08 parameter tradeoffs"
```

### Task 3: Complete course 09

**Files:**
- Create: `assets/course-09/illustrations/orientation-bridge-support.webp`
- Create: `assets/course-09/illustrations/normal-vs-tree-support.webp`
- Create: `assets/course-09/illustrations/adhesion-aids.webp`
- Create: `docs/image-prompts/course-09-illustrations.md`
- Modify: `course.js`
- Modify: `course-data.js`

**Interfaces:**
- Consumes: the course 09 goals and sections.
- Produces: three goal-art entries, three section figures, expanded support/adhesion decisions, and official source labels.

- [ ] **Step 1: Generate and inspect three original 3:2 illustrations**

Generate: orientation/bridge/support decision; normal versus tree support; Skirt/Brim/Raft decision chart. Convert accepted outputs to the exact WebP paths above.

- [ ] **Step 2: Record exact prompts and sources**

Create `docs/image-prompts/course-09-illustrations.md` using Auto Orientation, Slow Down for Overhangs, Brim, and Brim Ears.

- [ ] **Step 3: Integrate and deepen course 09**

Add goal art, section manga, source links, bridge versus overhang cues, support tradeoffs, and explicit Skirt/Brim/Raft selection rules.

- [ ] **Step 4: Commit course 09**

```bash
git add assets/course-09/illustrations docs/image-prompts/course-09-illustrations.md course.js course-data.js
git commit -m "feat: illustrate course 09 supports and adhesion"
```

### Task 4: Complete course 10

**Files:**
- Create: `assets/course-10/illustrations/material-use-cases.webp`
- Create: `assets/course-10/illustrations/printer-material-match.webp`
- Create: `assets/course-10/illustrations/moisture-storage-drying.webp`
- Create: `docs/image-prompts/course-10-illustrations.md`
- Modify: `course.js`
- Modify: `course-data.js`

**Interfaces:**
- Consumes: course 10 goals and sections.
- Produces: three material teaching figures, safe printer/material pairing, storage guidance, and official references.

- [ ] **Step 1: Generate and inspect three original 3:2 illustrations**

Generate: PLA/PETG/ABS-ASA use cases; A1/P1S/environment material match; dry-versus-moist filament plus storage/drying workflow. Convert to the exact WebP paths.

- [ ] **Step 2: Record prompts and official references**

Create `docs/image-prompts/course-10-illustrations.md` with PLA, PETG, ABS/ASA/PC, Filament Drying Recommendations, and Filament Guide Material Table links.

- [ ] **Step 3: Integrate and deepen course 10**

Add goal art, section manga, source links, material comparison rows, explicit ventilation/enclosure cautions, and moisture symptom guidance without inventing universal drying temperatures.

- [ ] **Step 4: Commit course 10**

```bash
git add assets/course-10/illustrations docs/image-prompts/course-10-illustrations.md course.js course-data.js
git commit -m "feat: illustrate course 10 material choices"
```

### Task 5: Complete course 11

**Files:**
- Create: `assets/course-11/illustrations/symptom-map.webp`
- Create: `assets/course-11/illustrations/five-step-troubleshooting.webp`
- Create: `assets/course-11/illustrations/fault-paths.webp`
- Create: `docs/image-prompts/course-11-illustrations.md`
- Modify: `course.js`
- Modify: `course-data.js`

**Interfaces:**
- Consumes: course 11 goals and sections.
- Produces: symptom categories, a deterministic five-step method, example diagnostic paths, and safety escalation rules.

- [ ] **Step 1: Generate and inspect three original 3:2 illustrations**

Generate: three-category symptom map; five-step troubleshooting loop; stringing/clog/warping/support-surface fault paths. Convert to the exact WebP paths.

- [ ] **Step 2: Record prompts and sources**

Create `docs/image-prompts/course-11-illustrations.md` with Print Quality Problems, How to Avoid Nozzle Clogs, Printed Model Warping, and First Layer Not Sticking.

- [ ] **Step 3: Integrate and deepen course 11**

Add goal art, section manga, sources, ordered checks, one-change-at-a-time records, and teacher escalation for hotend disassembly or electrical work.

- [ ] **Step 4: Commit course 11**

```bash
git add assets/course-11/illustrations docs/image-prompts/course-11-illustrations.md course.js course-data.js
git commit -m "feat: illustrate course 11 troubleshooting"
```

### Task 6: Complete course 12

**Files:**
- Create: `assets/course-12/illustrations/routine-maintenance.webp`
- Create: `assets/course-12/illustrations/ten-point-preflight.webp`
- Create: `assets/course-12/illustrations/capstone-workflow.webp`
- Create: `docs/image-prompts/course-12-illustrations.md`
- Modify: `course.js`
- Modify: `course-data.js`

**Interfaces:**
- Consumes: course 12 goals and sections.
- Produces: student-safe maintenance scope, ten-point preflight, capstone workflow, and official references.

- [ ] **Step 1: Generate and inspect three original 3:2 illustrations**

Generate: routine maintenance boundary; ten-point preflight; capstone plan/print/document/present workflow. Convert to the exact WebP paths.

- [ ] **Step 2: Record prompts and sources**

Create `docs/image-prompts/course-12-illustrations.md` with A1 Maintenance, Build Plates Overview, Project Based Workflow, and Work After Printing Finished.

- [ ] **Step 3: Integrate and deepen course 12**

Add goal art, section manga, sources, student-versus-teacher maintenance boundaries, ten explicit checks, and a five-field project explanation card.

- [ ] **Step 4: Commit course 12**

```bash
git add assets/course-12/illustrations docs/image-prompts/course-12-illustrations.md course.js course-data.js
git commit -m "feat: illustrate course 12 capstone workflow"
```

### Task 7: Responsive layout, final verification, and publication

**Files:**
- Modify: `course.css`
- Modify: `tests/build-site.test.js` only if the exact label count needs scoping correction.
- Generated preview: `_site/`

**Interfaces:**
- Consumes: all fifteen goal-art mappings and section figures.
- Produces: responsive cards, a green publication contract, rebuilt preview, synchronized branch, and updated PR.

- [ ] **Step 1: Add scoped responsive goal-card styles**

Use `.course-page:is([data-course="08"],[data-course="09"],[data-course="10"],[data-course="11"],[data-course="12"])` for the same desktop three-column and mobile 104/86 px image behavior proven in course 06. Include an exact image rule with `display:block;width:100%;height:100%;object-fit:cover`.

- [ ] **Step 2: Run focused and full tests**

```bash
node --test --test-name-pattern='illustrated lessons 08 through 12' tests/build-site.test.js
node --check course-data.js
node --check course.js
node --check scripts/build-site.js
node --test tests/*.test.js
node scripts/build-site.js
git diff origin/main...HEAD --check
```

Expected: all checks pass and the build reports 12 courses across 13 HTML pages.

- [ ] **Step 3: Verify browser output**

Open courses 08–12 in the in-app browser. At 1354×868 and 390×844, verify each page has three complete goal images, three complete section images, no broken assets, and `document.documentElement.scrollWidth === document.documentElement.clientWidth`.

- [ ] **Step 4: Commit responsive layout**

```bash
git add course.css tests/build-site.test.js
git commit -m "fix: contain illustrated goal cards for courses 08 through 12"
```

- [ ] **Step 5: Push and update PR 26**

Push `agent/course-06-a1`. Update PR 26 title to cover courses 06 and 08–12, and update the body with fifteen new images, five prompt files, official Wiki references, test count, build result, and viewport verification.
