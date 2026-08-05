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

const content = document.querySelector("#courseContent");
content.innerHTML = course.sections.map((section, index) => `
  <section class="lesson-section reveal">
    <span class="section-count">${String(index + 1).padStart(2,"0")}</span>
    <div>
      <h2>${section.title}</h2>
      <p>${section.body}</p>
      ${section.points ? `<ul class="lesson-points">${section.points.map(point => `<li>${point}</li>`).join("")}</ul>` : ""}
      ${section.compare ? `<div class="compare-table" role="table">${section.compare.map((row, rowIndex) => `<div class="compare-row" role="row">${row.map((cell, cellIndex) => `<span role="${cellIndex === 0 ? "rowheader" : "cell"}">${cell}</span>`).join("")}</div>`).join("")}</div>` : ""}
    </div>
  </section>`).join("");

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
