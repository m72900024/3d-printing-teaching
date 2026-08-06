const test = require("node:test");
const assert = require("node:assert/strict");
const { setupCourseMenu } = require("../course-menu");

class FakeClassList {
  constructor() { this.values = new Set(); }
  add(value) { this.values.add(value); }
  remove(value) { this.values.delete(value); }
  contains(value) { return this.values.has(value); }
  toggle(value, force) {
    const enabled = force === undefined ? !this.contains(value) : force;
    if (enabled) this.add(value); else this.remove(value);
    return enabled;
  }
}

class FakeElement extends EventTarget {
  constructor(tagName = "div") {
    super();
    this.tagName = tagName.toUpperCase();
    this.attributes = new Map();
    this.classList = new FakeClassList();
    this.hidden = false;
    this.focusCount = 0;
    this.links = [];
    this.insertedAfter = null;
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  addEventListener(type, listener) { super.addEventListener(type, listener); }
  click() { this.dispatchEvent(new Event("click")); }
  focus() { this.focusCount += 1; }
  after(element) { this.insertedAfter = element; }
  querySelectorAll(selector) { return selector === "a" ? this.links : []; }
}

class FakeMediaQuery extends EventTarget {
  constructor() { super(); this.matches = true; }
  moveToDesktop() {
    this.matches = false;
    this.dispatchEvent(new Event("change"));
  }
}

function createMenuFixture() {
  const menuButton = new FakeElement("button");
  const sidebar = new FakeElement("aside");
  const nav = new FakeElement("nav");
  nav.links = [new FakeElement("a"), new FakeElement("a")];
  const body = new FakeElement("body");
  const document = new EventTarget();
  document.body = body;
  document.querySelector = selector => ({
    ".menu-button": menuButton,
    ".course-sidebar": sidebar,
    ".course-nav": nav
  })[selector] || null;
  document.createElement = tagName => new FakeElement(tagName);

  const mediaQuery = new FakeMediaQuery();
  const window = { matchMedia: () => mediaQuery };
  const fixture = { document, window, menuButton, sidebar, nav, mediaQuery };
  setupCourseMenu(fixture);
  fixture.overlay = sidebar.insertedAfter;
  fixture.pressEscape = () => {
    const event = new Event("keydown");
    Object.defineProperty(event, "key", { value: "Escape" });
    document.dispatchEvent(event);
  };
  return fixture;
}

test("opens with an overlay and accessible expanded state", () => {
  const fixture = createMenuFixture();

  fixture.menuButton.click();

  assert.equal(fixture.menuButton.getAttribute("aria-controls"), "courseSidebar");
  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "true");
  assert.equal(fixture.sidebar.getAttribute("id"), "courseSidebar");
  assert.equal(fixture.sidebar.classList.contains("open"), true);
  assert.equal(fixture.document.body.classList.contains("course-menu-open"), true);
  assert.equal(fixture.overlay.hidden, false);
});

test("overlay click closes the menu and restores focus", () => {
  const fixture = createMenuFixture();
  fixture.menuButton.click();

  fixture.overlay.click();

  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.sidebar.classList.contains("open"), false);
  assert.equal(fixture.overlay.hidden, true);
  assert.equal(fixture.menuButton.focusCount, 1);
});

test("course navigation closes without stealing focus", () => {
  const fixture = createMenuFixture();
  fixture.menuButton.click();

  fixture.nav.links[0].click();

  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.menuButton.focusCount, 0);
});

test("Escape closes the menu and restores focus", () => {
  const fixture = createMenuFixture();
  fixture.menuButton.click();

  fixture.pressEscape();

  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.menuButton.focusCount, 1);
});

test("desktop transition closes without stealing focus", () => {
  const fixture = createMenuFixture();
  fixture.menuButton.click();

  fixture.mediaQuery.moveToDesktop();

  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.menuButton.focusCount, 0);
});
