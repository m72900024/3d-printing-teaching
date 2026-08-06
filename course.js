const courseId = document.body.dataset.course;
const courses = window.COURSES;
const course = courses.find(item => item.id === courseId);
if (!course) throw new Error(`Unknown course: ${courseId}`);

document.title = `${course.id} ${course.title}｜3D 列印入門教室`;
document.querySelector("#courseStage").textContent = `STAGE ${course.stageNo} · ${course.stage}`;
document.querySelector("#courseMeta").textContent = `${course.duration} · ${course.type}`;
document.querySelector("#courseNumber").textContent = course.id;
document.querySelector("#courseTitle").textContent = course.title;
document.querySelector("#courseSubtitle").textContent = course.subtitle;
document.querySelector("#courseLead").textContent = course.lead;
const goalArtByCourse = {
  "01": [
    { src: "../assets/course-01/goals/01-additive-manufacturing.webp", alt: "噴嘴由下往上逐層堆疊材料，製作立體物件" },
    { src: "../assets/course-01/goals/02-filament-journey.webp", alt: "線材從捲盤經過擠出機與噴嘴，最後成為列印物件" },
    { src: "../assets/course-01/goals/03-fdm-resin-comparison.webp", alt: "FDM 線材列印與光固化樹脂列印的並列比較" },
    { src: "../assets/course-01/goals/04-printable-objects.webp", alt: "名牌、齒輪、教學模型與替換支架等適合列印的物品" }
  ],
  "02": [
    { src: "../assets/course-02/goals/01-common-parts.webp", alt: "通用 FDM 印表機的線架、線材路徑、噴頭與熱床" },
    { src: "../assets/course-02/goals/02-motion-systems.webp", alt: "龍門式、三角洲式與 CoreXY 三種印表機機構" },
    { src: "../assets/course-02/goals/03-pause-first.webp", alt: "列印異常時手不伸入機器並先按暫停" }
  ]
};
const goalArt = goalArtByCourse[course.id];
const goalsElement = document.querySelector("#courseGoals");
goalsElement.innerHTML = goalArt
  ? course.goals.map((goal, index) => `<li class="goal-card"><div class="goal-visual"><img src="${goalArt[index].src}" alt="${goalArt[index].alt}" width="640" height="640" decoding="async"></div><div><small>0${index + 1}</small><p>${goal}</p></div></li>`).join("")
  : course.goals.map(goal => `<li>${goal}</li>`).join("");
if (course.id === "01") {
  const lessonOutline = document.createElement("nav");
  lessonOutline.className = "lesson-outline";
  lessonOutline.setAttribute("aria-label", "本課快速導覽");
  lessonOutline.innerHTML = `<strong>本課快速導覽</strong><div>
    <a href="#courseContent"><span>01</span>原理與流程</a>
    <a href="#layer-animation"><span>02</span>逐層動畫</a>
    <a href="#real-photo-cases"><span>03</span>真實照片</a>
    <a href="#lesson-video"><span>04</span>延伸影片</a>
    <a href="#quick-check"><span>05</span>快速測驗</a>
  </div>`;
  document.querySelector(".goal-box").after(lessonOutline);
}

const iconPaths = {
  layers:'<path d="M4 8l8-4 8 4-8 4-8-4Zm0 4 8 4 8-4M4 16l8 4 8-4"/>',
  cube:'<path d="m4 7 8-4 8 4v10l-8 4-8-4V7Zm0 0 8 4 8-4m-8 4v10"/>',
  spark:'<path d="m12 3 1.4 4.1L17 9l-3.6 1.9L12 15l-1.4-4.1L7 9l3.6-1.9L12 3Zm6 11 .8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"/>',
  eye:'<path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.7"/>',
  ruler:'<path d="M4 17 17 4l3 3L7 20l-3-3Zm8-8 3 3m-6 0 2 2m4-8 3 3"/>',
  strength:'<path d="M7 8h10v8H7zM3 12h4m10 0h4M4 9v6m16-6v6"/>',
  check:'<path d="m5 12 4 4L19 6"/>',
  question:'<circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.1 2.3c-.9.4-.9 1.1-.9 1.7m0 3h.01"/>',
  repeat:'<path d="M17 3l3 3-3 3M4 10V8a2 2 0 0 1 2-2h14M7 21l-3-3 3-3m13-1v2a2 2 0 0 1-2 2H4"/>',
  rocket:'<path d="M14 5c2.4-2.4 5-2 5-2s.4 2.6-2 5l-4 4-4-3 5-4Zm-5 4-3 1-2 3 5 1m4-2 1 5-3 3-1-5m-3 2-2 2"/>',
  medical:'<path d="M8 3h8v6h5v8h-5v5H8v-5H3V9h5V3Z"/>',
  museum:'<path d="m3 9 9-5 9 5M5 10h14M6 10v8m4-8v8m4-8v8m4-8v8M3 20h18"/>'
};

function renderIcon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.cube}</svg>`;
}

function renderCards(cards) {
  if (!cards) return "";
  return `<div class="concept-grid">${cards.map(card => `<article class="concept-card"><span class="concept-icon">${renderIcon(card.icon)}</span><h3>${card.title}</h3><p>${card.text}</p></article>`).join("")}</div>`;
}

function renderDetails(details) {
  if (!details) return "";
  return `<div class="detail-grid">${details.map((detail, index) => `<article class="detail-card"><div><span>${String(index + 1).padStart(2,"0")}</span><small>${detail.label}</small></div><h3>${detail.title}</h3><p>${detail.text}</p></article>`).join("")}</div>`;
}

function renderPartGallery(items) {
  if (!items) return "";
  return `<div class="machine-part-gallery">${items.map((item, index) => `<article class="machine-part-card"><div class="machine-part-photo"><img src="${item.src}" alt="${item.alt}" width="1200" height="800" loading="lazy" decoding="async"><span>GPT 彩色教學圖</span></div><div class="machine-part-copy"><small>${String(index + 1).padStart(2,"0")} · ${item.label}</small><h3>${item.title}</h3><p>${item.text}</p><aside><strong>圖解觀察</strong><span>${item.look}</span></aside><span class="machine-part-credit">${item.credit}</span></div></article>`).join("")}</div>`;
}

function renderPhotoStudy(study) {
  if (!study) return "";
  return `<figure class="photo-study"><img src="${study.src}" alt="${study.alt}" width="1600" height="824" loading="lazy" decoding="async"><figcaption><span>實物質感比較</span>${study.caption}</figcaption><div class="photo-study-guide">${study.guides.map(guide => `<div><strong>${guide.label}</strong><p>${guide.text}</p></div>`).join("")}</div></figure>`;
}

function renderStructureGuide(guide) {
  if (!guide) return "";
  return `<figure class="structure-guide" id="motion-systems"><img src="${guide.src}" alt="${guide.alt}" width="1200" height="1200" loading="lazy" decoding="async"><figcaption><span>MOTION SYSTEMS</span>${guide.caption}</figcaption><div class="structure-guide-grid">${guide.items.map((item, index) => `<article><small>0${index + 1} · ${item.english}</small><h3>${item.name}</h3><p>${item.text}</p><aside><strong>觀察重點</strong>${item.notice}</aside></article>`).join("")}</div></figure>`;
}

function renderRealPhotos(photos) {
  if (!photos) return "";
  return `<div class="real-photo-block" id="real-photo-cases"><div class="real-photo-heading"><small>REAL PRINTS</small><h3>這些都是真實列印成品</h3><p>從照片觀察：3D 列印的價值不只在「做得出來」，而是在少量、客製、快速修改或複雜形狀時特別有用。</p></div><div class="real-photo-grid">${photos.map(photo => `<article class="real-photo-card"><a class="real-photo-image" href="${photo.source}" target="_blank" rel="noopener noreferrer"><img src="${photo.src}" alt="${photo.alt}" width="1280" height="960" loading="lazy" decoding="async"><span>查看原始照片 ↗</span></a><div class="real-photo-copy"><small>${photo.tag}</small><h4>${photo.title}</h4><p>${photo.text}</p><a href="${photo.source}" target="_blank" rel="noopener noreferrer">${photo.credit}</a></div></article>`).join("")}</div></div>`;
}

function renderSources(sources) {
  if (!sources) return "";
  return `<aside class="lesson-sources"><strong>延伸資料</strong><div>${sources.map(source => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.label} →</a>`).join("")}</div></aside>`;
}

function renderSteps(steps) {
  if (!steps) return "";
  return `<ol class="process-steps">${steps.map((step, index) => `<li><span>${index + 1}</span>${step}</li>`).join("")}</ol>`;
}

function renderExamples(examples) {
  if (!examples) return "";
  return `<div class="example-grid">${examples.map(example => `<article class="example-card"><div class="example-top"><span class="example-icon">${renderIcon(example.icon)}</span><small>${example.label}</small></div><h3>${example.title}</h3><p>${example.body}</p><p class="example-why">${example.why}</p><a href="${example.source}" target="_blank" rel="noopener noreferrer">${example.sourceLabel} ↗</a></article>`).join("")}</div>`;
}

function renderTradeoff(tradeoff) {
  if (!tradeoff) return "";
  return `<div class="tradeoff-block"><div class="tradeoff-heading"><small>傳統製造方法</small><h3>${tradeoff.title}</h3><p>${tradeoff.body}</p></div><figure class="manga-figure tradeoff-manga"><img src="${tradeoff.image}" alt="${tradeoff.imageAlt}" width="1600" height="800" loading="lazy" decoding="async"><figcaption><span>四格漫畫導讀</span>橘黃色是開模的前期投入與改版壓力；藍灰色是 CNC 的材料切除與加工設定。</figcaption></figure><div class="tradeoff-panel-guide">${tradeoff.guides.map(guide => `<div><strong>${guide.label}</strong><span>${guide.text}</span></div>`).join("")}</div><div class="tradeoff-grid">${tradeoff.items.map((item, index) => `<article><span>${String(index + 1).padStart(2,"0")}</span><small>${item.label}</small><h4>${item.title}</h4><p>${item.text}</p></article>`).join("")}</div><aside class="tradeoff-note"><strong>不是誰取代誰</strong><p>${tradeoff.note}</p></aside></div>`;
}

function renderLayerAnimation(type) {
  if (type !== "layers") return "";
  return `<div class="layer-lab" id="layer-animation">
    <div class="lab-caption"><div><strong>逐層堆疊動畫</strong><span>噴嘴畫完一層，再往上移動</span></div><button class="animation-play" type="button" aria-pressed="false">▶ 播放動畫</button></div>
    <p class="motion-note">你的裝置已開啟「減少動態效果」，因此動畫預設暫停。按下播放即可觀看。</p>
    <div class="animated-printer" role="img" aria-label="噴嘴左右移動並逐層堆疊物件的動畫"><div class="animated-head"><i></i></div><div class="animated-object">${Array.from({length:8}, (_, index) => `<i style="--layer:${index}"></i>`).join("")}</div><div class="animated-bed"></div></div>
  </div>`;
}

function renderLessonVisual(visual) {
  if (!visual) return "";
  return `<section class="series-visual reveal">
    <figure>
      <img src="${visual.src}" alt="${visual.alt}" width="1600" height="1024" loading="eager" decoding="async">
      <figcaption><span>GPT 漫畫圖解</span>${visual.caption}</figcaption>
    </figure>
    <div class="series-guide">${visual.guides.map((guide, index) => `<div><small>0${index + 1}</small><strong>${guide[0]}</strong><p>${guide[1]}</p></div>`).join("")}</div>
  </section>`;
}

function renderRealCase(realCase) {
  if (!realCase) return "";
  return `<section class="real-case-section reveal">
    <div class="real-case-heading"><p>${realCase.eyebrow}</p><h2>${realCase.title}</h2></div>
    <div class="real-case-copy"><p>${realCase.body}</p><aside><strong>為什麼值得看？</strong><span>${realCase.why}</span></aside><a href="${realCase.source}" target="_blank" rel="noopener noreferrer">${realCase.sourceLabel} →</a></div>
  </section>`;
}

const content = document.querySelector("#courseContent");
content.innerHTML = renderLessonVisual(course.lessonVisual) + course.sections.map((section, index) => `
  <section class="lesson-section reveal"${section.examples ? ` id="real-examples"` : ""}>
    <span class="section-count">${String(index + 1).padStart(2,"0")}</span>
    <div>
      <h2>${section.title}</h2>
      <p>${section.body}</p>
      ${section.manga ? `<figure class="manga-figure"><img src="${section.manga.src}" alt="${section.manga.alt}" width="1600" height="757" loading="eager" decoding="async"><figcaption><span>MANGA EXPLAINER</span>${section.manga.caption}</figcaption></figure>` : ""}
      ${renderTradeoff(section.tradeoff)}
      ${section.image ? `<figure class="lesson-figure"><img src="${section.image}" alt="${section.imageAlt || ""}" loading="lazy"><figcaption>線材經過加熱、擠出與逐層堆疊，最後成為實體作品。</figcaption></figure>` : ""}
      ${renderSteps(section.steps)}
      ${renderLayerAnimation(section.animation)}
      ${renderCards(section.cards)}
      ${renderStructureGuide(section.structureGuide)}
      ${renderRealPhotos(section.realPhotos)}
      ${renderPhotoStudy(section.photoStudy)}
      ${renderPartGallery(section.partGallery)}
      ${renderDetails(section.details)}
      ${renderExamples(section.examples)}
      ${section.points ? `<ul class="lesson-points">${section.points.map(point => `<li>${point}</li>`).join("")}</ul>` : ""}
      ${section.compare ? `<div class="compare-table" role="table">${section.compareHeaders ? `<div class="compare-row compare-head" role="row">${section.compareHeaders.map(cell => `<span role="columnheader">${cell}</span>`).join("")}</div>` : ""}${section.compare.map(row => `<div class="compare-row" role="row">${row.map((cell, cellIndex) => `<span role="${cellIndex === 0 ? "rowheader" : "cell"}">${cell}</span>`).join("")}</div>`).join("")}</div>` : ""}
      ${section.callout ? `<aside class="lesson-callout"><span>!</span><p>${section.callout}</p></aside>` : ""}
      ${renderSources(section.sources)}
    </div>
  </section>`).join("") + renderRealCase(course.realCase);

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function runLayerCycle(lab) {
  window.clearTimeout(lab.layerCycleTimer);
  lab.classList.remove("cycle");
  void lab.offsetWidth;
  lab.classList.add("cycle");
  lab.layerCycleTimer = window.setTimeout(() => {
    if (lab.classList.contains("playing") || !reducedMotion.matches) runLayerCycle(lab);
  }, 7000);
}

content.querySelectorAll(".layer-lab").forEach(lab => {
  if (!reducedMotion.matches) runLayerCycle(lab);
  const button = lab.querySelector(".animation-play");
  button.addEventListener("click", () => {
    const isPlaying = lab.classList.toggle("playing");
    button.setAttribute("aria-pressed", String(isPlaying));
    button.textContent = isPlaying ? "❚❚ 暫停動畫" : "▶ 播放動畫";
    if (isPlaying) runLayerCycle(lab);
    else {
      window.clearTimeout(lab.layerCycleTimer);
      lab.classList.remove("cycle");
    }
  });
});

if (course.video) {
  const videoSection = document.createElement("section");
  videoSection.className = "video-section reveal";
  videoSection.id = "lesson-video";
  videoSection.innerHTML = `<div class="video-copy"><p class="video-eyebrow">WATCH & NOTICE</p><h2>延伸觀看：把 A1 拆開來看</h2><p>${course.video.description}</p><div class="watch-prompts"><strong>觀看時找三件事</strong><span>① 線材走哪一條路？</span><span>② 哪個零件把材料熔化？</span><span>③ 平台與噴頭如何配合移動？</span></div><a href="${course.video.watchUrl}" target="_blank" rel="noopener noreferrer">在 YouTube 開啟 ↗</a></div><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${course.video.youtubeId}" title="${course.video.title}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><p>${course.video.title} · ${course.video.channel}</p></div>`;
  document.querySelector(".task-card").before(videoSection);
}

if (course.quiz) {
  const quiz = document.createElement("section");
  quiz.className = "quiz-section reveal";
  quiz.id = "quick-check";
  quiz.innerHTML = `<p class="quiz-eyebrow">QUICK CHECK</p><h2>三題快速檢查</h2><p class="quiz-intro">選出答案，馬上看看自己是否掌握重點。</p><div class="quiz-list">${course.quiz.map((item, questionIndex) => `<article class="quiz-card" data-question="${questionIndex}"><p><span>${questionIndex + 1}</span>${item.question}</p><div class="quiz-options">${item.options.map((option, optionIndex) => `<button type="button" data-option="${optionIndex}">${option}</button>`).join("")}</div><div class="quiz-feedback" aria-live="polite"></div></article>`).join("")}</div><p class="quiz-score" id="quizScore">已答對 0 / ${course.quiz.length} 題</p>`;
  document.querySelector(".task-card").before(quiz);

  const correctAnswers = new Set();
  quiz.querySelectorAll(".quiz-card").forEach(card => card.addEventListener("click", event => {
    const button = event.target.closest("button[data-option]");
    if (!button) return;
    const questionIndex = Number(card.dataset.question);
    const optionIndex = Number(button.dataset.option);
    const item = course.quiz[questionIndex];
    card.querySelectorAll("button").forEach(option => option.classList.remove("correct", "incorrect"));
    if (optionIndex === item.answer) {
      button.classList.add("correct");
      correctAnswers.add(questionIndex);
      card.querySelector(".quiz-feedback").textContent = item.explanation;
    } else {
      button.classList.add("incorrect");
      correctAnswers.delete(questionIndex);
      card.querySelector(".quiz-feedback").textContent = "再想想看：回到上方的圖解找線索。";
    }
    quiz.querySelector("#quizScore").textContent = `已答對 ${correctAnswers.size} / ${course.quiz.length} 題`;
  }));
}

document.querySelector("#taskTitle").textContent = course.task.title;
document.querySelector("#taskText").textContent = course.task.text;
document.querySelector("#checkpointText").textContent = course.checkpoint;

const nav = document.querySelector("#courseNav");
nav.innerHTML = courses.map(item => `<a href="${item.slug}" class="${item.id === course.id ? "active" : ""}"><span>${item.id}</span>${item.title}</a>`).join("");

const currentIndex = courses.indexOf(course);
const prev = courses[currentIndex - 1];
const next = courses[currentIndex + 1];
const prevLink = document.querySelector("#prevCourse");
const nextLink = document.querySelector("#nextCourse");
if (prev) { prevLink.href = prev.slug; prevLink.innerHTML = `<small>上一課</small><strong>← ${prev.title}</strong>`; }
else { prevLink.href = "../index.html"; prevLink.innerHTML = `<small>返回</small><strong>← 課程首頁</strong>`; }
if (next) { nextLink.href = next.slug; nextLink.innerHTML = `<small>下一課</small><strong>${next.title} →</strong>`; }
else { nextLink.href = "../index.html"; nextLink.innerHTML = `<small>完成</small><strong>回到課程首頁 ✓</strong>`; }

const storageKey = "three-d-course-chapters";
let completed;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
  completed = new Set(Array.isArray(saved) ? saved : []);
} catch {
  completed = new Set();
}
const completeButton = document.querySelector("#completeCourse");
function updateComplete() {
  const isComplete = completed.has(course.id);
  completeButton.classList.toggle("completed", isComplete);
  completeButton.innerHTML = isComplete ? "✓ 本課已完成" : "完成本課";
  document.querySelector("#lessonProgress").textContent = `${completed.size} / 12`;
}
completeButton.addEventListener("click", () => {
  if (completed.has(course.id)) completed.delete(course.id); else completed.add(course.id);
  localStorage.setItem(storageKey, JSON.stringify([...completed]));
  updateComplete();
});

document.querySelector("#menuButton").addEventListener("click", () => document.querySelector(".course-sidebar").classList.toggle("open"));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add("visible");
}), {threshold:.08});
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
updateComplete();
