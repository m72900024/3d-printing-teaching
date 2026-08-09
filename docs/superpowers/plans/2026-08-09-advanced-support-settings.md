# Advanced Support Settings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish A03「支撐與支撐介面設定」as the third advanced course with five Traditional Chinese illustrations, Bambu Lab Wiki citations, responsive layout, tests, and GitHub Pages deployment.

**Architecture:** Extend the existing data-driven advanced course path rather than adding a new renderer. `advanced-course-data.js` remains the lesson-content source, the new static HTML shell matches A01/A02, and the existing build injects readable core content. Five local WebP illustrations and one prompt document keep visual assets reproducible.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node.js build script, Node test runner, WebP assets, GitHub Actions Pages.

## Global Constraints

- Write all learner-facing copy and image labels in Traditional Chinese.
- Use Bambu Lab Wiki Support and Support Painting pages as primary references.
- Preserve the existing A01/A02 rendering, progress key, visual language, and 3:2 non-cropping behavior.
- Do not modify the beginner course bodies or the user-owned untracked `_修改紀錄.md` file.
- Do not claim one Top Z Distance value is universally correct; separate same-material interfaces from dedicated support-interface material.
- Do not use subagents, per the user's explicit stability preference.

---

### Task 1: Add failing A03 publishing tests

**Files:**
- Modify: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `buildTemporarySite(prefix)` and the current `buildSite()` result.
- Produces: regression expectations for `advancedCourseCount === 3`, `htmlCount === 17`, A03 content, five illustrations, five Wiki source labels, and total-progress attributes.

- [ ] **Step 1: Extend the advanced-course test**

Read `advanced/03-support-settings.html` from the temporary output and assert:

```js
assert.equal(result.advancedCourseCount, 3);
assert.equal(result.htmlCount, 17);
assert.match(overview, /A03[\s\S]*支撐與支撐介面設定/);
assert.match(support, /頂部Z距離/);
assert.match(support, /一般支撐[\s\S]*樹狀支撐/);
assert.match(support, /同材質[\s\S]*專用支撐材料/);
assert.match(support, /data-course-total="3"/);
assert.equal((support.match(/GPT 教學圖解/g) || []).length, 5);
assert.equal((support.match(/內容參考：Bambu Lab Wiki/g) || []).length, 5);
```

Also add `advanced-a03` and its five expected WebP filenames to the existing asset map.

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `node --test --test-name-pattern="publishes three advanced courses" tests/build-site.test.js`

Expected: FAIL because A03 and its assets do not exist and advanced count remains 2.

- [ ] **Step 3: Commit the failing test**

```bash
git add tests/build-site.test.js
git commit -m "test: define advanced support course output"
```

### Task 2: Add A03 lesson content and navigation

**Files:**
- Create: `advanced/03-support-settings.html`
- Modify: `advanced-course-data.js`
- Modify: `advanced/index.html`
- Modify: `index.html`

**Interfaces:**
- Consumes: the existing `window.COURSES` schema and advanced course HTML shell.
- Produces: course object `id:"A03"`, slug `03-support-settings.html`, five `goalArt` items, five cited `sections`, task, checkpoint, and a shell with `data-course-total="3"`.

- [ ] **Step 1: Create the A03 shell**

Copy the A02 shell structure, then change metadata to A03, title to「支撐與支撐介面設定」, description to the support decision and Top Z Distance objective, and all progress totals to 3.

- [ ] **Step 2: Add the A03 course object**

Append one object to `window.COURSES` with these five section titles:

1. `先別急著開支撐：方向與幾何先判斷`
2. `一般、樹狀、自動與手動怎麼選`
3. `臨界角度：用預覽決定支撐範圍`
4. `支撐接觸面與頂部Z距離的取捨`
5. `用同一試片找到可拆又好看的設定`

Each section must contain one `manga`, one instructional structure (`compare`, `points`, `steps`, or `details`), one safety or single-variable callout where relevant, and a source entry pointing to `https://wiki.bambulab.com/en/software/bambu-studio/support` or the Support Painting page.

- [ ] **Step 3: Update the advanced overview and homepage counts**

Change all “2 advanced courses” and `0 / 2` copy to 3, add an A03 card after A02, and update the homepage advanced-path summary to「3 堂課已開放」without changing beginner navigation.

- [ ] **Step 4: Run the focused test**

Run: `node --test --test-name-pattern="publishes three advanced courses" tests/build-site.test.js`

Expected: A03 textual assertions pass; asset assertions still fail until Task 3.

### Task 3: Create five reproducible A03 illustrations

**Files:**
- Create: `docs/image-prompts/advanced-a03-illustrations.md`
- Create: `assets/advanced-a03/illustrations/support-or-redesign.webp`
- Create: `assets/advanced-a03/illustrations/support-types.webp`
- Create: `assets/advanced-a03/illustrations/threshold-preview.webp`
- Create: `assets/advanced-a03/illustrations/interface-z-gap.webp`
- Create: `assets/advanced-a03/illustrations/support-test.webp`

**Interfaces:**
- Consumes: the five A03 `goalArt`/`manga.src` paths and existing A01/A02 1536×1024 art direction.
- Produces: five 3:2 WebP images with large Traditional Chinese labels and a prompt document that can reproduce them.

- [ ] **Step 1: Write the five complete prompts**

Specify a bright Japanese-anime classroom style, the same teacher/student visual language as prior advanced art, 1536×1024 landscape composition, no logos, short Traditional Chinese labels, and the exact educational contrast for each section.

- [ ] **Step 2: Generate the five images**

Use the image generation skill once per prompt or in supported batches. Save the returned source images, convert only if necessary, and ensure final files use the exact WebP paths above.

- [ ] **Step 3: Inspect every image**

Verify each image is 1536×1024 or another exact 3:2 size, labels are Traditional Chinese and legible, no important object touches crop edges, and the Top Z Distance comparison does not prescribe one universal number.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `node --test --test-name-pattern="publishes three advanced courses" tests/build-site.test.js`

Expected: PASS.

- [ ] **Step 5: Commit content and illustrations**

```bash
git add advanced/03-support-settings.html advanced-course-data.js advanced/index.html index.html assets/advanced-a03 docs/image-prompts/advanced-a03-illustrations.md tests/build-site.test.js
git commit -m "feat: add advanced support settings course"
```

### Task 4: Verify responsive website output

**Files:**
- Modify only if required by evidence: `course.css`, `advanced.css`
- Test only if CSS changes: `tests/build-site.test.js`

**Interfaces:**
- Consumes: `_site/advanced/03-support-settings.html` and existing responsive rules.
- Produces: readable desktop and 390 px mobile pages with complete 3:2 images and no horizontal overflow.

- [ ] **Step 1: Build the site**

Run: `node scripts/build-site.js`

Expected: `Built 12 beginner and 3 advanced courses across 17 HTML pages.`

- [ ] **Step 2: Inspect desktop output in the in-app browser**

Open `http://127.0.0.1:4173/advanced/03-support-settings.html` at 1440×900. Confirm five images report `object-fit: contain`, rendered aspect ratio 1.5, source links are visible, and previous/next navigation is correct.

- [ ] **Step 3: Inspect mobile output**

Set viewport to 390×844. Confirm `document.documentElement.scrollWidth === innerWidth`, goal cards form one column, images retain 3:2, tables remain usable, and the side menu opens/closes.

- [ ] **Step 4: Add a failing CSS regression test only if a layout defect is found**

Reproduce the exact missing selector or rule in `tests/build-site.test.js`, run it RED, make the smallest CSS change, and run it GREEN.

### Task 5: Full verification and GitHub Pages publication

**Files:**
- No new source files expected.

**Interfaces:**
- Consumes: the completed branch.
- Produces: merged PR, successful Pages workflow, and public A03 URL.

- [ ] **Step 1: Run complete verification**

Run separately:

```bash
node --check scripts/build-site.js
node --check advanced-course-data.js
node --test tests/*.test.js
node scripts/build-site.js
git diff --check
git status --short
```

Expected: all tests pass, build reports 12 beginner + 3 advanced / 17 pages, and only the user-owned `_修改紀錄.md` remains untracked.

- [ ] **Step 2: Push and open a PR**

Push `agent/add-advanced-support-course`, open a PR titled「新增 A03 支撐與支撐介面設定」, and include course scope, official sources, visual checks, and test results.

- [ ] **Step 3: Merge after checks pass**

Wait for the build check, merge with a merge commit, and delete the remote branch.

- [ ] **Step 4: Verify deployment**

Wait for the main Pages workflow to succeed, then inspect:

`https://m72900024.github.io/3d-printing-teaching/advanced/03-support-settings.html`

Confirm the public page contains all five complete images and mobile layout has no overflow. Keep this public page open as the browser deliverable.
