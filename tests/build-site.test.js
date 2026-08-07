const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { buildSite } = require("../scripts/build-site");

function buildTemporarySite(prefix) {
  const rootDir = path.resolve(__dirname, "..");
  const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  const result = buildSite({ rootDir, outputDir });
  return { outputDir, result };
}

test("publishes twelve course pages with static core content", () => {
  const { outputDir, result } = buildTemporarySite("3d-course-site-");
  const first = fs.readFileSync(path.join(outputDir, "courses/01-introduction.html"), "utf8");
  const last = fs.readFileSync(path.join(outputDir, "courses/12-project.html"), "utf8");

  assert.equal(result.courseCount, 12);
  assert.match(first, /<h1 id="courseTitle">認識 3D 列印<\/h1>/);
  assert.match(first, /3D 列印到底做了什麼？/);
  assert.match(first, /切片想像實驗/);
  assert.match(last, /<h1 id="courseTitle">維護與成果挑戰<\/h1>/);
  assert.match(last, /我能獨立完成作品/);
});

test("publishes the A1 first-print workflow and safety guidance", () => {
  const { outputDir } = buildTemporarySite("3d-course-a1-first-print-");
  const lesson = fs.readFileSync(path.join(outputDir, "courses/06-first-print.html"), "utf8");

  for (const expected of [
    "Bambu Lab A1",
    "紋理 PEI 平台",
    "0.4 mm 噴嘴",
    "0.20 mm 標準",
    "自動調平",
    "正常",
    "噴嘴過高",
    "噴嘴過低",
    "未黏住",
    "等待噴頭完全停止",
    "等待平台降溫",
    "20 分鐘內"
  ]) assert.match(lesson, new RegExp(expected));

  assert.match(lesson, /wiki\.bambulab\.com\/en\/p1\/manual\/print-from-bambu-studio/);
  assert.match(lesson, /wiki\.bambulab\.com\/en\/knowledge-sharing\/identify-and-fix-first-layer-issues-with-a-test-print/);
  assert.match(lesson, /wiki\.bambulab\.com\/en\/filament-acc\/acc\/print-finish-adv/);
});

test("publishes Course 06 goal and lesson illustrations with credits", () => {
  const { outputDir } = buildTemporarySite("3d-course-a1-illustrations-");
  const courseScript = fs.readFileSync(path.join(outputDir, "course.js"), "utf8");
  const courseData = fs.readFileSync(path.join(outputDir, "course-data.js"), "utf8");
  const courseCss = fs.readFileSync(path.join(outputDir, "course.css"), "utf8");
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
  const course06Data = courseData.slice(courseData.indexOf('id:"06"'), courseData.indexOf('id:"07"'));
  assert.equal((course06Data.match(/label:"GPT 教學圖解"/g) || []).length, 3);
  assert.equal((course06Data.match(/內容參考：Bambu Lab Wiki/g) || []).length, 3);
  assert.match(courseCss, /\.course-page\[data-course="06"\] \.goal-visual img\{display:block;width:100%;height:100%;object-fit:cover\}/);
});

test("publishes illustrated lessons 08 through 12 with credits", () => {
  const { outputDir } = buildTemporarySite("3d-course-advanced-illustrations-");
  const courseScript = fs.readFileSync(path.join(outputDir, "course.js"), "utf8");
  const courseData = fs.readFileSync(path.join(outputDir, "course-data.js"), "utf8");
  const courseCss = fs.readFileSync(path.join(outputDir, "course.css"), "utf8");
  const illustratedCourses = {
    "08": ["layer-height-comparison.webp", "walls-vs-infill.webp", "one-variable-experiment.webp"],
    "09": ["orientation-bridge-support.webp", "normal-vs-tree-support.webp", "adhesion-aids.webp"],
    "10": ["material-use-cases.webp", "printer-material-match.webp", "moisture-storage-drying.webp"],
    "11": ["symptom-map.webp", "five-step-troubleshooting.webp", "fault-paths.webp"],
    "12": ["routine-maintenance.webp", "ten-point-preflight.webp", "capstone-workflow.webp"]
  };

  for (const [courseId, files] of Object.entries(illustratedCourses)) {
    for (const file of files) {
      assert.ok(fs.existsSync(path.join(outputDir, `assets/course-${courseId}/illustrations`, file)));
      assert.match(courseScript, new RegExp(file));
      assert.match(courseData, new RegExp(file));
    }
  }

  const advancedLessons = courseData.slice(courseData.indexOf('id:"08"'));
  assert.equal((advancedLessons.match(/label:"GPT 教學圖解"/g) || []).length, 15);
  assert.equal((advancedLessons.match(/內容參考：Bambu Lab Wiki/g) || []).length, 15);
  assert.match(courseCss, /\.course-page:is\(\[data-course="08"\],\[data-course="09"\],\[data-course="10"\],\[data-course="11"\],\[data-course="12"\]\) \.goal-visual img\{display:block;width:100%;height:100%;object-fit:cover\}/);
});

test("publishes the anime homepage with beginner and planned advanced paths", () => {
  const { outputDir } = buildTemporarySite("3d-course-homepage-levels-");
  const home = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");
  const styles = fs.readFileSync(path.join(outputDir, "styles.css"), "utf8");

  assert.match(home, /href="#beginner-courses">初階課程/);
  assert.match(home, /href="#advanced-courses">進階課程/);
  assert.match(home, /href="#about">網站介紹/);
  assert.match(home, /從零開始學，<br><em class="hero-title-line">完成第一件作品<\/em>/);
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
  assert.match(styles, /#beginner-courses,#advanced-courses,#about\{scroll-margin-top:/);
});

test("fingerprints every local stylesheet and script reference", () => {
  const { outputDir } = buildTemporarySite("3d-course-assets-");

  for (const relative of ["index.html", "courses/01-introduction.html", "courses/12-project.html"]) {
    const htmlFile = path.join(outputDir, relative);
    const html = fs.readFileSync(htmlFile, "utf8");
    const localAssets = [...html.matchAll(/(?:href|src)="([^"?]+\.(?:css|js))\?v=([a-f0-9]{12})"/g)];

    assert.ok(localAssets.length >= 2, relative + " should use fingerprinted assets");
    for (const [, asset, version] of localAssets) {
      assert.equal(version.length, 12);
      assert.ok(fs.existsSync(path.resolve(path.dirname(htmlFile), asset)), asset + " should exist");
    }
  }
});

test("refuses to use the source directory as build output", () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "3d-course-source-"));
  const marker = path.join(rootDir, "keep-me.txt");
  fs.writeFileSync(marker, "source stays intact");

  assert.throws(() => buildSite({ rootDir, outputDir: rootDir }), /output directory must differ/i);
  assert.equal(fs.readFileSync(marker, "utf8"), "source stays intact");
});
