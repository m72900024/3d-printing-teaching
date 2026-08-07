const test = require("node:test");
const assert = require("node:assert/strict");
const { setupAdvancedProgress } = require("../advanced-app");

test("reads only the independent advanced completion key", () => {
  const cards = ["A01", "A02"].map(id => ({
    dataset: { advancedCourse: id },
    classList: { toggle(name, active) { this[name] = active; } },
    querySelector() { return { textContent: "" }; }
  }));
  const progress = { textContent: "" };
  const document = {
    querySelectorAll() { return cards; },
    querySelector() { return progress; }
  };
  const storage = {
    getItem(key) {
      assert.equal(key, "three-d-advanced-course-chapters");
      return '["A01"]';
    }
  };

  setupAdvancedProgress({ document, storage });

  assert.equal(progress.textContent, "1 / 2");
  assert.equal(cards[0].classList.completed, true);
  assert.equal(cards[1].classList.completed, false);
});
