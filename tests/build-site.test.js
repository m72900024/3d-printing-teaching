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
