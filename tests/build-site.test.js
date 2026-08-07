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
  assert.equal((courseData.match(/label:"GPT 教學圖解"/g) || []).length, 3);
  assert.equal((courseData.match(/內容參考：Bambu Lab Wiki/g) || []).length, 3);
  assert.match(courseCss, /\.course-page\[data-course="06"\] \.goal-visual img\{display:block;width:100%;height:100%;object-fit:cover\}/);
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
