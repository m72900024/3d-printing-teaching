const test = require("node:test");
const assert = require("node:assert/strict");
const { setupSiteNavigation } = require("../site-navigation");

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
  constructor(tagName = "div", id = "") {
    super();
    this.tagName = tagName.toUpperCase();
    this.id = id;
    this.attributes = new Map();
    this.classList = new FakeClassList();
    this.hidden = false;
    this.focusCount = 0;
    this.links = [];
    this.insertedAfter = null;
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  click() { this.dispatchEvent(new Event("click")); }
  focus() { this.focusCount += 1; }
  after(element) { this.insertedAfter = element; }
  contains(element) { return element === this; }
  querySelectorAll(selector) { return selector === "a" ? this.links : []; }
}

class FakeMediaQuery extends EventTarget {
  constructor(matches) { super(); this.matches = matches; }
  setMobile(matches) {
    this.matches = matches;
    this.dispatchEvent(new Event("change"));
  }
}

function createSiteNavigationFixture({ mobile }) {
  const menuButton = new FakeElement("button", "siteNavMenuButton");
  const navigation = new FakeElement("nav", "siteNavigation");
  const beginnerButton = new FakeElement("button");
  beginnerButton.setAttribute("data-site-nav-target", "beginnerDirectory");
  const advancedButton = new FakeElement("button");
  advancedButton.setAttribute("data-site-nav-target", "advancedDirectory");
  const beginnerPanel = new FakeElement("div", "beginnerDirectory");
  const advancedPanel = new FakeElement("div", "advancedDirectory");
  beginnerPanel.hidden = true;
  advancedPanel.hidden = true;
  navigation.links = [new FakeElement("a"), new FakeElement("a")];

  const body = new FakeElement("body");
  const document = new EventTarget();
  document.body = body;
  document.querySelector = selector => ({
    "#siteNavMenuButton": menuButton,
    "#siteNavigation": navigation,
    "#beginnerDirectory": beginnerPanel,
    "#advancedDirectory": advancedPanel
  })[selector] || null;
  document.querySelectorAll = selector => selector === "[data-site-nav-target]" ? [beginnerButton, advancedButton] : [];
  document.createElement = tagName => new FakeElement(tagName);

  const mediaQuery = new FakeMediaQuery(mobile);
  const window = { matchMedia: () => mediaQuery };
  setupSiteNavigation({ document, window });

  const fixture = { document, window, menuButton, navigation, beginnerButton, advancedButton, beginnerPanel, advancedPanel, mediaQuery };
  fixture.overlay = navigation.insertedAfter;
  fixture.pressEscape = () => {
    const event = new Event("keydown");
    Object.defineProperty(event, "key", { value: "Escape" });
    document.dispatchEvent(event);
  };
  return fixture;
}

test("opens one desktop course directory at a time", () => {
  const fixture = createSiteNavigationFixture({ mobile: false });
  fixture.beginnerButton.click();
  assert.equal(fixture.beginnerButton.getAttribute("aria-expanded"), "true");
  assert.equal(fixture.beginnerPanel.hidden, false);

  fixture.advancedButton.click();
  assert.equal(fixture.beginnerButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.beginnerPanel.hidden, true);
  assert.equal(fixture.advancedButton.getAttribute("aria-expanded"), "true");
  assert.equal(fixture.advancedPanel.hidden, false);
});

test("mobile menu and accordion close with Escape", () => {
  const fixture = createSiteNavigationFixture({ mobile: true });
  fixture.menuButton.click();
  fixture.beginnerButton.click();
  assert.equal(fixture.document.body.classList.contains("site-navigation-open"), true);
  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "true");

  fixture.pressEscape();
  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.beginnerButton.getAttribute("aria-expanded"), "false");
  assert.equal(fixture.document.body.classList.contains("site-navigation-open"), false);
  assert.equal(fixture.menuButton.focusCount, 1);
});

test("overlay and course links close the mobile navigation", () => {
  const fixture = createSiteNavigationFixture({ mobile: true });
  fixture.menuButton.click();
  fixture.overlay.click();
  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");

  fixture.menuButton.click();
  fixture.navigation.links[0].click();
  assert.equal(fixture.menuButton.getAttribute("aria-expanded"), "false");
});
