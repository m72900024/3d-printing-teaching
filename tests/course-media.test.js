const test = require("node:test");
const assert = require("node:assert/strict");
const { createGalleryState } = require("../course-media");

test("opens a requested image and reports gallery state", () => {
  const changes = [];
  const gallery = createGalleryState(3, state => changes.push(state));

  gallery.open(1);

  assert.deepEqual(gallery.value(), { open: true, index: 1, count: 3 });
  assert.deepEqual(changes.at(-1), { open: true, index: 1, count: 3 });
});

test("wraps previous and next navigation", () => {
  const gallery = createGalleryState(3);
  gallery.open(0);

  gallery.previous();
  assert.equal(gallery.value().index, 2);

  gallery.next();
  assert.equal(gallery.value().index, 0);
});

test("Escape closes an open gallery", () => {
  const gallery = createGalleryState(2);
  gallery.open(1);

  const handled = gallery.handleKey("Escape");

  assert.equal(handled, true);
  assert.deepEqual(gallery.value(), { open: false, index: 1, count: 2 });
});

test("arrow keys navigate only while the gallery is open", () => {
  const gallery = createGalleryState(2);

  assert.equal(gallery.handleKey("ArrowRight"), false);
  gallery.open(0);
  assert.equal(gallery.handleKey("ArrowRight"), true);
  assert.equal(gallery.value().index, 1);
  assert.equal(gallery.handleKey("ArrowLeft"), true);
  assert.equal(gallery.value().index, 0);
});
