"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const PUBLIC_ENTRIES = [
  ".nojekyll",
  "index.html",
  "styles.css",
  "app.js",
  "course.css",
  "course-data.js",
  "course-menu.js",
  "course.js",
  "advanced-course-data.js",
  "advanced-app.js",
  "advanced.css",
  "assets",
  "courses",
  "advanced"
];

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function loadCourses(rootDir, dataFile = "course-data.js") {
  const source = fs.readFileSync(path.join(rootDir, dataFile), "utf8");
  const context = { window: {} };
  vm.runInNewContext(source, context, { filename: dataFile });
  if (!Array.isArray(context.window.COURSES)) throw new Error(dataFile + " did not define window.COURSES");
  return context.window.COURSES;
}

function renderTextList(items, className) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return '<ul class="' + className + '">' + items.map(item => "<li>" + escapeHtml(item) + "</li>").join("") + "</ul>";
}

function renderCollection(items, className) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return '<div class="' + className + '">' + items.map(item => {
    if (typeof item === "string") return "<p>" + escapeHtml(item) + "</p>";
    if (Array.isArray(item)) return "<p>" + item.map(escapeHtml).join(" — ") + "</p>";
    if (!item || typeof item !== "object") return "";
    const heading = item.title || item.name || item.label || item.english;
    const paragraphs = [item.body, item.text, item.description, item.notice, item.look, item.why, item.note, item.caption]
      .filter(Boolean)
      .map(text => "<p>" + escapeHtml(text) + "</p>")
      .join("");
    const nested = renderCollection(item.items || item.guides || item.facts, "static-nested-list");
    return "<article>" + (heading ? "<h3>" + escapeHtml(heading) + "</h3>" : "") + paragraphs + nested + "</article>";
  }).join("") + "</div>";
}

function renderCompare(section) {
  if (!Array.isArray(section.compare) || section.compare.length === 0) return "";
  const headers = Array.isArray(section.compareHeaders)
    ? "<thead><tr>" + section.compareHeaders.map(cell => "<th>" + escapeHtml(cell) + "</th>").join("") + "</tr></thead>"
    : "";
  const rows = section.compare.map(row => "<tr>" + row.map((cell, index) => {
    const tag = index === 0 ? "th" : "td";
    return "<" + tag + ">" + escapeHtml(cell) + "</" + tag + ">";
  }).join("") + "</tr>").join("");
  return '<div class="static-compare"><table>' + headers + "<tbody>" + rows + "</tbody></table></div>";
}

function renderSources(sources) {
  if (!Array.isArray(sources) || sources.length === 0) return "";
  return '<aside class="lesson-sources"><strong>延伸資料</strong><div>' + sources.map(source => {
    return '<a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(source.label) + " →</a>";
  }).join("") + "</div></aside>";
}

function renderManga(manga) {
  if (!manga) return "";
  return '<figure class="manga-figure static-lesson-manga">' +
    '<img src="' + escapeHtml(manga.src) + '" alt="' + escapeHtml(manga.alt) + '" loading="lazy">' +
    '<figcaption><span>' + escapeHtml(manga.label || "GPT 教學圖解") + "</span>" + escapeHtml(manga.caption) + "</figcaption></figure>";
}

function renderSection(section, index) {
  const supplements = [
    section.tradeoff ? [section.tradeoff] : null,
    section.cards,
    section.details,
    section.examples,
    section.structureGuide ? [section.structureGuide] : null,
    section.realPhotos,
    section.photoStudy ? [section.photoStudy] : null,
    section.partGallery,
    section.workflowVisual ? [section.workflowVisual] : null
  ].filter(Boolean).map(items => renderCollection(items, "static-details")).join("");

  return '<section class="lesson-section static-lesson-section">' +
    '<span class="section-count">' + String(index + 1).padStart(2, "0") + "</span>" +
    "<div><h2>" + escapeHtml(section.title) + "</h2>" +
    (section.body ? "<p>" + escapeHtml(section.body) + "</p>" : "") +
    renderManga(section.manga) +
    renderTextList(section.steps, "process-steps static-process-steps") +
    supplements +
    renderTextList(section.points, "lesson-points") +
    renderCompare(section) +
    (section.callout ? '<aside class="lesson-callout"><span>!</span><p>' + escapeHtml(section.callout) + "</p></aside>" : "") +
    renderSources(section.sources) +
    "</div></section>";
}

function renderStaticContent(course) {
  const sections = course.sections.map(renderSection).join("");
  const realCase = course.realCase
    ? '<section class="real-case-section static-real-case"><div class="real-case-heading"><p>' + escapeHtml(course.realCase.eyebrow) + "</p><h2>" + escapeHtml(course.realCase.title) + '</h2></div><div class="real-case-copy"><p>' + escapeHtml(course.realCase.body) + "</p><p>" + escapeHtml(course.realCase.why) + "</p></div></section>"
    : "";
  return '<noscript><p class="noscript-note">互動動畫、測驗與進度記錄需要 JavaScript；完整課程正文仍可正常閱讀。</p></noscript>' + sections + realCase;
}

function replaceElement(html, id, content) {
  const pattern = new RegExp('(<([a-z][\\w-]*)[^>]*\\bid="' + id + '"[^>]*>)[\\s\\S]*?(</\\2>)', "i");
  if (!pattern.test(html)) throw new Error("Missing #" + id + " placeholder");
  return html.replace(pattern, "$1" + content + "$3");
}

function renderCourseNav(courses, current) {
  return courses.map(item => {
    const active = item.id === current.id ? ' class="active" aria-current="page"' : "";
    return '<a href="' + escapeHtml(item.slug) + '"' + active + "><span>" + escapeHtml(item.id) + "</span>" + escapeHtml(item.title) + "</a>";
  }).join("");
}

function replacePagination(html, id, course, label) {
  const pattern = new RegExp('<a id="' + id + '"[^>]*>[\\s\\S]*?</a>');
  if (!pattern.test(html)) throw new Error("Missing #" + id + " pagination link");
  return html.replace(pattern, '<a id="' + id + '" href="' + escapeHtml(course.href) + '"><small>' + escapeHtml(course.kicker) + "</small><strong>" + escapeHtml(label) + "</strong></a>");
}

function injectCourse(html, course, courses, options = {}) {
  const homeHref = options.homeHref || "../index.html";
  const homeLabel = options.homeLabel || "課程首頁";
  html = replaceElement(html, "courseStage", "STAGE " + escapeHtml(course.stageNo) + " · " + escapeHtml(course.stage));
  html = replaceElement(html, "courseMeta", escapeHtml(course.duration) + " · " + escapeHtml(course.type));
  html = replaceElement(html, "courseNumber", escapeHtml(course.id));
  html = replaceElement(html, "courseTitle", escapeHtml(course.title));
  html = replaceElement(html, "courseSubtitle", escapeHtml(course.subtitle));
  html = replaceElement(html, "courseLead", escapeHtml(course.lead));
  html = replaceElement(html, "courseGoals", course.goals.map(goal => "<li>" + escapeHtml(goal) + "</li>").join(""));
  html = replaceElement(html, "courseContent", renderStaticContent(course));
  html = replaceElement(html, "taskTitle", escapeHtml(course.task.title));
  html = replaceElement(html, "taskText", escapeHtml(course.task.text));
  html = replaceElement(html, "checkpointText", escapeHtml(course.checkpoint));
  html = replaceElement(html, "courseNav", renderCourseNav(courses, course));

  const currentIndex = courses.indexOf(course);
  const previous = courses[currentIndex - 1];
  const next = courses[currentIndex + 1];
  html = replacePagination(html, "prevCourse", previous
    ? { href: previous.slug, kicker: "上一課" }
    : { href: homeHref, kicker: "返回" }, previous ? "← " + previous.title : "← " + homeLabel);
  html = replacePagination(html, "nextCourse", next
    ? { href: next.slug, kicker: "下一課" }
    : { href: homeHref, kicker: "完成" }, next ? next.title + " →" : "回到" + homeLabel + " ✓");
  return html;
}

function copyEntry(source, destination) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const name of fs.readdirSync(source)) copyEntry(path.join(source, name), path.join(destination, name));
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }
}

function listFiles(directory, predicate) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listFiles(fullPath, predicate));
    else if (predicate(fullPath)) files.push(fullPath);
  }
  return files;
}

function fingerprintHtmlAssets(htmlFile, outputDir) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const fingerprinted = html.replace(/(href|src)="([^"?]+\.(?:css|js))(?:\?[^"#]*)?"/g, (match, attribute, asset) => {
    if (/^(?:https?:|\/\/)/.test(asset)) return match;
    const assetFile = path.resolve(path.dirname(htmlFile), asset);
    const relative = path.relative(outputDir, assetFile);
    if (relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Asset escaped output directory: " + asset);
    if (!fs.existsSync(assetFile)) throw new Error("Missing local asset: " + asset + " from " + htmlFile);
    const version = crypto.createHash("sha256").update(fs.readFileSync(assetFile)).digest("hex").slice(0, 12);
    return attribute + '="' + asset + "?v=" + version + '"';
  });
  fs.writeFileSync(htmlFile, fingerprinted);
}

function buildSite({ rootDir, outputDir }) {
  const root = path.resolve(rootDir);
  const output = path.resolve(outputDir);
  if (output === root || root.startsWith(output + path.sep)) {
    throw new Error("Build output directory must differ from and must not contain the source directory");
  }
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(output, { recursive: true });

  for (const entry of PUBLIC_ENTRIES) {
    const source = path.join(root, entry);
    if (fs.existsSync(source)) copyEntry(source, path.join(output, entry));
  }

  const courses = loadCourses(root);
  for (const course of courses) {
    const htmlFile = path.join(output, "courses", course.slug);
    if (!fs.existsSync(htmlFile)) throw new Error("Missing course page for " + course.id + ": " + course.slug);
    const html = fs.readFileSync(htmlFile, "utf8");
    fs.writeFileSync(htmlFile, injectCourse(html, course, courses));
  }

  const advancedDataFile = path.join(root, "advanced-course-data.js");
  const advancedCourses = fs.existsSync(advancedDataFile) ? loadCourses(root, "advanced-course-data.js") : [];
  for (const course of advancedCourses) {
    const htmlFile = path.join(output, "advanced", course.slug);
    if (!fs.existsSync(htmlFile)) throw new Error("Missing advanced course page for " + course.id + ": " + course.slug);
    const html = fs.readFileSync(htmlFile, "utf8");
    fs.writeFileSync(htmlFile, injectCourse(html, course, advancedCourses, { homeHref: "index.html", homeLabel: "進階課程首頁" }));
  }

  const htmlFiles = listFiles(output, file => file.endsWith(".html"));
  for (const htmlFile of htmlFiles) fingerprintHtmlAssets(htmlFile, output);
  return { courseCount: courses.length, advancedCourseCount: advancedCourses.length, htmlCount: htmlFiles.length };
}

if (require.main === module) {
  const rootDir = path.resolve(__dirname, "..");
  const result = buildSite({ rootDir, outputDir: path.join(rootDir, "_site") });
  process.stdout.write("Built " + result.courseCount + " beginner and " + result.advancedCourseCount + " advanced courses across " + result.htmlCount + " HTML pages.\n");
}

module.exports = { buildSite };
