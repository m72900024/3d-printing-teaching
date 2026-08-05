const STORAGE = {
  chapters: "three-d-course-chapters",
  checklist: "three-d-print-checklist"
};

const chapterCards = [...document.querySelectorAll("[data-chapter]")];
const progressText = document.querySelector("#progressText");
const progressRing = document.querySelector(".progress-ring");
const toast = document.querySelector("#toast");

function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

let completed = new Set(readStorage(STORAGE.chapters, []));

function updateCourseProgress() {
  chapterCards.forEach(card => card.classList.toggle("completed", completed.has(card.dataset.chapter)));
  const count = completed.size;
  progressText.textContent = `${count} / ${chapterCards.length}`;
  const degree = Math.max(18, (count / chapterCards.length) * 360);
  progressRing.style.background = `conic-gradient(#2a8f47 ${degree}deg, #e5e8df 0)`;
  progressRing.style.border = "4px solid transparent";
  localStorage.setItem(STORAGE.chapters, JSON.stringify([...completed]));
}

chapterCards.forEach(card => {
  card.querySelector(".complete-button").addEventListener("click", () => {
    const id = card.dataset.chapter;
    if (completed.has(id)) completed.delete(id); else completed.add(id);
    updateCourseProgress();
    showToast(completed.has(id) ? `第 ${id} 章已完成` : `已取消第 ${id} 章完成標記`);
  });
});

document.querySelector("#progressButton").addEventListener("click", () => {
  document.querySelector("#course").scrollIntoView({ behavior: "smooth" });
});

const machineContent = {
  a1: { title: "開放式機身", text: "適合 PLA、PETG；列印時不要將手伸入噴頭移動路徑。" },
  p1s: { title: "封閉式機艙", text: "可使用更多工程材料；艙內溫度高，列印中不要徒手碰觸機構。" }
};

document.querySelectorAll("[data-machine]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-machine]").forEach(item => item.classList.toggle("active", item === button));
    const content = machineContent[button.dataset.machine];
    document.querySelector("#machineInfo").innerHTML = `<strong>${content.title}</strong><p>${content.text}</p>`;
  });
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const issueCards = [...document.querySelectorAll("[data-category]")];
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    const category = button.dataset.filter;
    issueCards.forEach(card => card.classList.toggle("hidden", category !== "all" && card.dataset.category !== category));
  });
});

const checklist = [...document.querySelectorAll("#printChecklist input")];
const checklistScore = document.querySelector("#checklistScore");
const checklistBar = document.querySelector("#checklistBar");
const readyMessage = document.querySelector("#readyMessage");
const savedChecks = readStorage(STORAGE.checklist, []);
checklist.forEach((input, index) => { input.checked = Boolean(savedChecks[index]); });

function updateChecklist() {
  const states = checklist.map(input => input.checked);
  const checked = states.filter(Boolean).length;
  checklistScore.textContent = checked;
  checklistBar.style.width = `${checked / checklist.length * 100}%`;
  const remaining = checklist.length - checked;
  readyMessage.textContent = remaining === 0 ? "✓ 檢查完成，可以開始列印！" : `還有 ${remaining} 項需要確認`;
  localStorage.setItem(STORAGE.checklist, JSON.stringify(states));
  if (remaining === 0) showToast("全部確認完成，準備列印！");
}

checklist.forEach(input => input.addEventListener("change", updateChecklist));
document.querySelector("#resetChecklist").addEventListener("click", () => {
  checklist.forEach(input => { input.checked = false; });
  updateChecklist();
  showToast("檢核表已重新開始");
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(element => observer.observe(element));

updateCourseProgress();
updateChecklist();
