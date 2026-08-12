(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = { setupSiteNavigation: factory };
  else root.setupSiteNavigation = factory;
})(typeof window === "undefined" ? globalThis : window, function setupSiteNavigation(options = {}) {
  const documentRef = options.document || document;
  const windowRef = options.window || window;
  const menuButton = documentRef.querySelector("#siteNavMenuButton");
  const navigation = documentRef.querySelector("#siteNavigation");
  const toggles = [...documentRef.querySelectorAll("[data-site-nav-target]")];
  if (!menuButton || !navigation || toggles.length === 0) return null;

  const panels = new Map(toggles.map(toggle => {
    const panel = documentRef.querySelector("#" + toggle.getAttribute("data-site-nav-target"));
    toggle.setAttribute("aria-controls", panel.id);
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    return [toggle, panel];
  }));
  const mobileQuery = windowRef.matchMedia("(max-width: 980px)");
  menuButton.setAttribute("aria-controls", "siteNavigation");
  menuButton.setAttribute("aria-expanded", "false");

  const overlay = documentRef.createElement("button");
  overlay.setAttribute("type", "button");
  overlay.setAttribute("aria-label", "關閉網站導覽");
  overlay.classList.add("site-nav-overlay");
  overlay.hidden = true;
  navigation.after(overlay);

  function closeDirectories() {
    panels.forEach((panel, toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    });
  }

  function closeMobile({ restoreFocus = false } = {}) {
    documentRef.body.classList.remove("site-navigation-open");
    menuButton.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
    closeDirectories();
    if (restoreFocus) menuButton.focus();
  }

  function closeAll() {
    if (mobileQuery.matches) closeMobile();
    else closeDirectories();
  }

  toggles.forEach(toggle => toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    closeDirectories();
    if (willOpen) {
      toggle.setAttribute("aria-expanded", "true");
      panels.get(toggle).hidden = false;
    }
  }));

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    if (isOpen) closeMobile({ restoreFocus: true });
    else {
      documentRef.body.classList.add("site-navigation-open");
      menuButton.setAttribute("aria-expanded", "true");
      overlay.hidden = false;
    }
  });
  overlay.addEventListener("click", () => closeMobile({ restoreFocus: true }));
  navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => closeAll()));
  documentRef.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    if (mobileQuery.matches && menuButton.getAttribute("aria-expanded") === "true") closeMobile({ restoreFocus: true });
    else closeDirectories();
  });
  documentRef.addEventListener("click", event => {
    if (!mobileQuery.matches && !navigation.contains(event.target) && event.target !== menuButton) closeDirectories();
  });
  mobileQuery.addEventListener("change", () => closeMobile());

  return { closeAll, closeMobile };
});
