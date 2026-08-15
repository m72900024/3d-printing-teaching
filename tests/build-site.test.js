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
  const courseScript = fs.readFileSync(path.join(outputDir, "course.js"), "utf8");

  assert.equal(result.courseCount, 12);
  assert.match(first, /<h1 id="courseTitle">認識 3D 列印<\/h1>/);
  assert.match(first, /3D 列印到底做了什麼？/);
  assert.match(first, /切片想像實驗/);
  assert.match(first, /class="site-home-link" href="\.\.\/index\.html">[^<]*網站首頁/);
  assert.match(first, /class="track-overview-link" href="\.\.\/index\.html#beginner-courses">[^<]*初階課程總覽/);
  assert.match(first, /第一次成功[\s\S]*理解與調整[\s\S]*獨立完成/);
  assert.equal((first.match(/class="course-quick-links"/g) || []).length, 1);
  assert.match(courseScript, /if \(!document\.querySelector\("\.course-sidebar \.course-quick-links"\)\)/);
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

test("publishes the anime homepage with beginner and active advanced paths", () => {
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
  assert.match(home, /id="advanced-courses"[\s\S]*6 堂課已開放/);
  assert.match(home, /href="advanced\/index\.html"/);
  assert.match(home, /材料、診斷與結構驗證/);
  assert.match(home, /受力方向[\s\S]*填充圖樣[\s\S]*單一變因測試/);
  assert.match(home, /id="about"/);
  assert.match(home, /安全操作/);
  assert.match(home, /Bambu Studio/);
  assert.match(home, /assets\/homepage\/anime-3d-printing-classroom\.webp/);
  assert.match(home, /alt="[^\"]*3D 印表機[^\"]*"/);
  assert.match(home, /id="siteNavMenuButton"/);
  assert.match(home, /data-site-nav-target="beginnerDirectory"/);
  assert.match(home, /第一次成功[\s\S]*01 認識 3D 列印[\s\S]*06 完成第一次列印/);
  assert.match(home, /理解與調整[\s\S]*07 模型方向與切片預覽[\s\S]*09 支撐與平台附著/);
  assert.match(home, /獨立完成[\s\S]*10 認識列印材料[\s\S]*12 維護與成果挑戰/);
  assert.match(home, /A01[\s\S]*線材乾燥與保存[\s\S]*A04[\s\S]*依作品需求選擇線材/);
  assert.match(home, /src="site-navigation\.js\?v=[a-f0-9]{12}"/);
  assert.ok(fs.existsSync(path.join(outputDir, "assets/homepage/anime-3d-printing-classroom.webp")));
  assert.ok(fs.existsSync(path.join(outputDir, "site-navigation.js")));
  assert.match(styles, /#beginner-courses,#advanced-courses,#about\{scroll-margin-top:/);
});

test("publishes six advanced courses with static art, official sources, and real examples", () => {
  const { outputDir, result } = buildTemporarySite("3d-course-advanced-path-");
  const overview = fs.readFileSync(path.join(outputDir, "advanced/index.html"), "utf8");
  const drying = fs.readFileSync(path.join(outputDir, "advanced/01-filament-drying.html"), "utf8");
  const quality = fs.readFileSync(path.join(outputDir, "advanced/02-quality-diagnostics.html"), "utf8");
  const support = fs.readFileSync(path.join(outputDir, "advanced/03-support-settings.html"), "utf8");
  const filament = fs.readFileSync(path.join(outputDir, "advanced/04-filament-selection.html"), "utf8");
  const courseCss = fs.readFileSync(path.join(outputDir, "course.css"), "utf8");

  assert.equal(result.advancedCourseCount, 6);
  assert.equal(result.htmlCount, 20);
  assert.match(overview, /A01[\s\S]*線材乾燥與保存/);
  assert.match(overview, /A02[\s\S]*品質問題診斷/);
  assert.match(overview, /A03[\s\S]*支撐與支撐介面設定/);
  assert.match(overview, /A04[\s\S]*依作品需求選擇線材/);
  assert.match(overview, /A05[\s\S]*受力方向與列印方向/);
  assert.match(drying, /A1／A1 mini[^。]*不可使用[^。]*熱床乾燥/);
  assert.match(quality, /熱蠕變／熱堆積/);
  assert.match(quality, /A1[\s\S]*P1S/);
  assert.match(drying, /three-d-advanced-course-chapters/);
  assert.match(support, /頂部Z距離/);
  assert.match(support, /一般支撐[\s\S]*樹狀支撐/);
  assert.match(support, /同材質[\s\S]*專用支撐材料/);
  assert.match(support, /實作案例 · Flashforge[\s\S]*Top Z 距離測試/);
  assert.match(support, /0\.20～0\.30 mm[\s\S]*不是通用答案/);
  assert.match(support, /facebook\.com\/share\/r\/17qYS85Bnm/);
  assert.match(support, /facebook\.com\/flashforge3dprinters/);
  assert.match(filament, /PLA[\s\S]*PETG[\s\S]*ABS[\s\S]*ASA[\s\S]*TPU[\s\S]*PC[\s\S]*PA/);
  assert.match(filament, /CF／GF/);
  assert.match(filament, /社群案例[\s\S]*不等於官方性能認證/);
  assert.match(filament, /makerworld\.com\/en\/models\/139371/);
  assert.match(filament, /makerworld\.com\/en\/models\/721613/);
  assert.match(drying, /class="site-home-link" href="\.\.\/index\.html">[^<]*網站首頁/);
  assert.match(drying, /class="track-overview-link" href="index\.html">[^<]*進階課程總覽/);
  assert.match(quality, /data-course-total="6"/);
  assert.match(support, /data-course-total="6"/);
  assert.match(filament, /data-course-total="6"/);
  assert.equal((drying.match(/GPT 教學圖解/g) || []).length, 5);
  assert.equal((quality.match(/GPT 教學圖解/g) || []).length, 5);
  assert.equal((support.match(/GPT 教學圖解/g) || []).length, 5);
  assert.equal((filament.match(/GPT 教學圖解/g) || []).length, 7);
  assert.equal((drying.match(/內容參考：Bambu Lab Wiki/g) || []).length, 5);
  assert.equal((quality.match(/內容參考：Bambu Lab Wiki/g) || []).length, 5);
  assert.equal((support.match(/內容參考：Bambu Lab Wiki/g) || []).length, 5);
  assert.ok((filament.match(/內容參考：Bambu Lab Wiki/g) || []).length >= 7);
  assert.match(courseCss, /\.course-page\[data-track="advanced"\] \.manga-figure img\{[^}]*aspect-ratio:3\/2;object-fit:contain[^}]*\}/);
  assert.ok(courseCss.includes('@media(max-width:640px){.course-page[data-track="advanced"] .goal-box ul{grid-template-columns:1fr}.course-page[data-track="advanced"] .goal-card{grid-template-columns:1fr}.course-page[data-track="advanced"] .goal-visual{width:100%;height:auto;aspect-ratio:3/2}}'));

  for (const [folder, files] of Object.entries({
    "advanced-a01": ["dry-vs-damp.webp", "moisture-risk.webp", "drying-decision.webp", "drying-methods.webp", "storage-workflow.webp"],
    "advanced-a02": ["diagnostic-loop.webp", "extrusion-symptoms.webp", "warping-layer-cracks.webp", "bridge-seam-surface.webp", "a1-p1s-heat-creep.webp"],
    "advanced-a03": ["support-or-redesign.webp", "support-types.webp", "threshold-preview.webp", "interface-z-gap.webp", "support-test.webp"],
    "advanced-a04": ["needs-six-questions.webp", "material-function-map.webp", "pla-petg-applications.webp", "abs-asa-applications.webp", "tpu-flexibility.webp", "pc-pa-engineering.webp", "cf-gf-functional-parts.webp"]
  })) for (const file of files) {
    assert.ok(fs.existsSync(path.join(outputDir, "assets", folder, "illustrations", file)));
  }
});

test("publishes the force direction course with ten annotated teaching figures", () => {
  const { outputDir, result } = buildTemporarySite("3d-course-force-direction-");
  const forceDirection = fs.readFileSync(path.join(outputDir, "advanced/05-force-direction.html"), "utf8");
  const overview = fs.readFileSync(path.join(outputDir, "advanced/index.html"), "utf8");
  const home = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");
  const figures = [
    "force-types.webp",
    "xy-z-anisotropy.webp",
    "bracket-orientations.webp",
    "hook-load-path.webp",
    "fastener-snap-fit.webp",
    "bambu-preview.webp",
    "break-test.webp",
    "screw-boss-detail.webp",
    "snap-fit-sequence.webp",
    "preview-fracture-match.webp"
  ];

  assert.equal(result.advancedCourseCount, 6);
  assert.equal(result.htmlCount, 20);
  assert.match(forceDirection, /受力方向與列印方向/);
  assert.match(forceDirection, /拉伸[\s\S]*壓縮[\s\S]*彎曲[\s\S]*剪切[\s\S]*扭轉/);
  assert.match(forceDirection, /XY[\s\S]*Z[\s\S]*層間/);
  assert.match(forceDirection, /單層擠出路徑/);
  assert.match(forceDirection, /逐層堆疊方向/);
  assert.match(forceDirection, /自攻／擠牙螺絲/);
  assert.match(forceDirection, /金屬嵌件／螺帽/);
  assert.match(forceDirection, /掛鉤[\s\S]*L 型支架[\s\S]*螺絲孔[\s\S]*卡扣/);
  assert.match(forceDirection, /網站首頁[\s\S]*進階課程總覽/);
  assert.match(forceDirection, /<title>A05 受力方向與列印方向｜3D 列印進階教室<\/title>/);
  assert.match(forceDirection, /class="course-title-line"[^>]*>受力方向與<\/span><span class="course-title-line"[^>]*>列印方向<\/span>/);
  assert.equal((forceDirection.match(/id="lesson-section-[1-7]"/g) || []).length, 7);
  assert.equal((forceDirection.match(/class="back-to-outline"/g) || []).length, 7);
  assert.equal((forceDirection.match(/href="#lesson-section-[1-7]"/g) || []).length, 7);
  assert.equal((forceDirection.match(/class="goal-summary-visual"/g) || []).length, 1);
  assert.match(forceDirection, /id="lessonOutline"/);
  assert.match(forceDirection, /class="back-to-top"/);
  assert.match(forceDirection, /src="\.\.\/course-media\.js\?v=[a-f0-9]{12}"/);
  assert.match(forceDirection, /solutions\.covestro\.com[\s\S]*self-tapping-screws/);
  assert.equal((forceDirection.match(/GPT 教學圖解/g) || []).length, 10);
  assert.ok((forceDirection.match(/圖解步驟/g) || []).length >= 10);
  assert.match(overview, /6 ADVANCED COURSES[\s\S]*A05[\s\S]*受力方向與列印方向/);
  assert.match(home, /A05[\s\S]*受力方向與列印方向/);
  assert.match(forceDirection, /UltiMaker[\s\S]*Stratasys[\s\S]*Prusa[\s\S]*Bambu Studio/);
  for (const figure of figures) {
    assert.ok(fs.existsSync(path.join(outputDir, "assets/advanced-a05/illustrations", figure)));
    assert.match(forceDirection, new RegExp(figure.replace(".", "\\.")));
  }
});

test("publishes the illustrated A06 infill selection course", () => {
  const { outputDir } = buildTemporarySite("3d-course-infill-selection-");
  const infill = fs.readFileSync(path.join(outputDir, "advanced/06-infill-selection.html"), "utf8");
  const overview = fs.readFileSync(path.join(outputDir, "advanced/index.html"), "utf8");
  const home = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");
  const courseCss = fs.readFileSync(path.join(outputDir, "course.css"), "utf8");
  const courseJs = fs.readFileSync(path.join(outputDir, "course.js"), "utf8");
  const imageReferences = infill.match(/assets\/advanced-a06\/illustrations\/[^\"]+\.webp/g) || [];
  const figures = [
    "infill-anatomy.webp",
    "density-comparison.webp",
    "decision-flow.webp",
    "pattern-matrix.webp",
    "path-crossing.webp",
    "display-lightning.webp",
    "storage-box.webp",
    "bracket-infill.webp",
    "compression-block.webp",
    "bambu-infill-preview.webp"
  ];

  assert.match(infill, /<title>A06 依作品需求選擇填充｜3D 列印進階教室<\/title>/);
  assert.equal((infill.match(/id="lesson-section-[1-7]"/g) || []).length, 7);
  assert.equal(imageReferences.length, 11);
  assert.equal(new Set(imageReferences).size, 10);
  assert.match(infill, /展示模型[\s\S]*收納盒[\s\S]*支架[\s\S]*受壓/);
  assert.match(infill, /5–12%[\s\S]*10–18%[\s\S]*15–30%[\s\S]*25–40%/);
  assert.match(infill, /本課建議起始值/);
  assert.match(infill, /Lightning[\s\S]*Gyroid[\s\S]*Cubic[\s\S]*Triangles[\s\S]*Concentric/);
  assert.match(infill, /10%[\s\S]*20%[\s\S]*30%[\s\S]*單一變因/);
  assert.match(infill, /github\.com\/bambulab\/BambuStudio/);
  assert.match(infill, /help\.prusa3d\.com[\s\S]*ultimaker\.com/);
  assert.match(overview, /6 ADVANCED COURSES[\s\S]*A06[\s\S]*依作品需求選擇填充/);
  assert.match(home, /ADVANCED · 6 COURSES[\s\S]*A06[\s\S]*依作品需求選擇填充/);
  assert.match(courseCss, /\.course-page\[data-course="A06"\] \.goal-summary-visual img/);
  assert.match(courseCss, /\.course-page\[data-course="A06"\] \.manga-figure img\[role="button"\]/);
  assert.match(courseJs, /const usesLongCourseLayout = \["A05", "A06"\]\.includes\(course\.id\)/);
  assert.ok((courseJs.match(/usesLongCourseLayout/g) || []).length >= 7);
  for (const figure of figures) {
    assert.ok(fs.existsSync(path.join(outputDir, "assets/advanced-a06/illustrations", figure)));
  }
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
