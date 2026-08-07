function setupAdvancedProgress({ document, storage }) {
  let completed;
  try {
    const saved = JSON.parse(storage.getItem("three-d-advanced-course-chapters") || "[]");
    completed = new Set(Array.isArray(saved) ? saved : []);
  } catch {
    completed = new Set();
  }

  const cards = [...document.querySelectorAll("[data-advanced-course]")];
  cards.forEach(card => {
    const isComplete = completed.has(card.dataset.advancedCourse);
    card.classList.toggle("completed", isComplete);
    if (isComplete) card.querySelector("b").textContent = "已完成 ✓";
  });
  document.querySelector("#advancedProgress").textContent = `${completed.size} / ${cards.length}`;
}

if (typeof module !== "undefined") module.exports = { setupAdvancedProgress };
if (typeof window !== "undefined") setupAdvancedProgress({ document, storage: localStorage });
