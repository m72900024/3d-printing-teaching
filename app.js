function readCompletedCourses() {
  try {
    const saved = JSON.parse(localStorage.getItem("three-d-course-chapters") || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

const completed = readCompletedCourses();
const links = [...document.querySelectorAll("[data-course]")];
const progressText = document.querySelector("#progressText");
const progressRing = document.querySelector(".progress-ring");

links.forEach(link => {
  if (completed.has(link.dataset.course)) {
    link.classList.add("completed");
    link.querySelector("b").textContent = "已完成 ✓";
  }
});

const count = completed.size;
progressText.textContent = `${count} / 12`;
const degree = Math.max(8, count / 12 * 360);
progressRing.style.background = `conic-gradient(#2a8f47 ${degree}deg, #e5e8df 0)`;
progressRing.style.border = "4px solid transparent";

document.querySelector("#progressButton").addEventListener("click", () => document.querySelector("#path").scrollIntoView({behavior:"smooth"}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add("visible");
}), {threshold: .1});
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
