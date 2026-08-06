(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = { setupCourseMenu: factory };
  else root.setupCourseMenu = factory;
})(typeof window === "undefined" ? globalThis : window, function setupCourseMenu(options = {}) {
  const documentRef = options.document || document;
  const windowRef = options.window || window;
  const menuButton = documentRef.querySelector(".menu-button");
  const sidebar = documentRef.querySelector(".course-sidebar");
  const courseNav = documentRef.querySelector(".course-nav");
  if (!menuButton || !sidebar || !courseNav) return null;

  sidebar.setAttribute("id", "courseSidebar");
  menuButton.setAttribute("aria-controls", "courseSidebar");
  menuButton.setAttribute("aria-expanded", "false");

  const overlay = documentRef.createElement("button");
  overlay.setAttribute("type", "button");
  overlay.setAttribute("aria-label", "關閉課程選單");
  overlay.classList.add("course-sidebar-overlay");
  overlay.hidden = true;
  sidebar.after(overlay);

  function isOpen() {
    return sidebar.classList.contains("open");
  }

  function open() {
    sidebar.classList.add("open");
    documentRef.body.classList.add("course-menu-open");
    menuButton.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
  }

  function close({ restoreFocus = false } = {}) {
    sidebar.classList.remove("open");
    documentRef.body.classList.remove("course-menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
    if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener("click", () => {
    if (isOpen()) close({ restoreFocus: true });
    else open();
  });
  overlay.addEventListener("click", () => close({ restoreFocus: true }));
  courseNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => close()));
  documentRef.addEventListener("keydown", event => {
    if (event.key === "Escape" && isOpen()) close({ restoreFocus: true });
  });

  const mobileQuery = windowRef.matchMedia("(max-width: 900px)");
  mobileQuery.addEventListener("change", event => {
    if (!event.matches) close();
  });

  return { open, close, overlay };
});
