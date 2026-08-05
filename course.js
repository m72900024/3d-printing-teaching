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
document.querySelector("#courseGoals").innerHTML = course.goals.map(goal => `<li>${goal}</li>`).join("");
if (course.sections.some(section => section.animation === "layers")) {
  const animationJump = document.createElement("a");
  animationJump.className = "lesson-jump";
  animationJump.href = "#layer-animation";
  animationJump.innerHTML = `<span>▶</span><strong>直接看逐層堆疊動畫</strong><small>前往第 3 段 ↓</small>`;
  document.querySelector(".goal-box").after(animationJump);
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
  repeat:'<path d="M17 3l3 3-3 3M4 10V8a2 2 0 0 1 2-2h14M7 21l-3-3 3-3m13-1v2a2 2 0 0 1-2 2H4"/>'
};

function renderIcon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.cube}</svg>`;
}

function renderCards(cards) {
  if (!cards) return "";
  return `<div class="concept-grid">${cards.map(card => `<article class="concept-card"><span class="concept-icon">${renderIcon(card.icon)}</span><h3>${card.title}</h3><p>${card.text}</p></article>`).join("")}</div>`;
}

function renderSteps(steps) {
  if (!steps) return "";
  return `<ol class="process-steps">${steps.map((step, index) => `<li><span>${index + 1}</span>${step}</li>`).join("")}</ol>`;
}

function renderLayerAnimation(type) {
  if (type !== "layers") return "";
  return `<div class="layer-lab" id="layer-animation">
    <div class="lab-caption"><div><strong>逐層堆疊動畫</strong><span>噴嘴畫完一層，再往上移動</span></div><button class="animation-play" type="button" aria-pressed="false">▶ 播放動畫</button></div>
    <p class="motion-note">你的裝置已開啟「減少動態效果」，因此動畫預設暫停。按下播放即可觀看。</p>
    <div class="animated-printer" role="img" aria-label="噴嘴左右移動並逐層堆疊物件的動畫"><div class="animated-head"><i></i></div><div class="animated-object">${Array.from({length:8}, (_, index) => `<i style="--layer:${index}"></i>`).join("")}</div><div class="animated-bed"></div></div>
  </div>`;
}

const content = document.querySelector("#courseContent");
content.innerHTML = course.sections.map((section, index) => `
  <section class="lesson-section reveal">
    <span class="section-count">${String(index + 1).padStart(2,"0")}</span>
    <div>
      <h2>${section.title}</h2>
      <p>${section.body}</p>
      ${section.image ? `<figure class="lesson-figure"><img src="${section.image}" alt="${section.imageAlt || ""}" loading="lazy"><figcaption>線材經過加熱、擠出與逐層堆疊，最後成為實體作品。</figcaption></figure>` : ""}
      ${renderSteps(section.steps)}
      ${renderLayerAnimation(section.animation)}
      ${renderCards(section.cards)}
      ${section.points ? `<ul class="lesson-points">${section.points.map(point => `<li>${point}</li>`).join("")}</ul>` : ""}
      ${section.compare ? `<div class="compare-table" role="table">${section.compareHeaders ? `<div class="compare-row compare-head" role="row">${section.compareHeaders.map(cell => `<span role="columnheader">${cell}</span>`).join("")}</div>` : ""}${section.compare.map(row => `<div class="compare-row" role="row">${row.map((cell, cellIndex) => `<span role="${cellIndex === 0 ? "rowheader" : "cell"}">${cell}</span>`).join("")}</div>`).join("")}</div>` : ""}
      ${section.callout ? `<aside class="lesson-callout"><span>!</span><p>${section.callout}</p></aside>` : ""}
    </div>
  </section>`).join("");

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

if (course.quiz) {
  const quiz = document.createElement("section");
  quiz.className = "quiz-section reveal";
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
