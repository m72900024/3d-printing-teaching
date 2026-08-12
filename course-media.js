(function attachCourseMedia(globalScope) {
  "use strict";

  function createGalleryState(count, onChange = () => {}) {
    const safeCount = Math.max(0, Number(count) || 0);
    let state = { open: false, index: 0, count: safeCount };

    function emit(next) {
      state = next;
      onChange({ ...state });
      return { ...state };
    }

    function normalize(index) {
      if (safeCount === 0) return 0;
      return ((Number(index) || 0) % safeCount + safeCount) % safeCount;
    }

    const api = {
      value: () => ({ ...state }),
      open: index => emit({ ...state, open: safeCount > 0, index: normalize(index) }),
      close: () => emit({ ...state, open: false }),
      next: () => state.open ? emit({ ...state, index: normalize(state.index + 1) }) : { ...state },
      previous: () => state.open ? emit({ ...state, index: normalize(state.index - 1) }) : { ...state },
      handleKey(key) {
        if (!state.open) return false;
        if (key === "Escape") api.close();
        else if (key === "ArrowRight") api.next();
        else if (key === "ArrowLeft") api.previous();
        else return false;
        return true;
      }
    };
    return api;
  }

  function setupCourseMedia({ document, window }) {
    const images = [...document.querySelectorAll("#courseContent figure.manga-figure img")];
    const outline = document.querySelector("#lessonOutline");
    if (images.length === 0 && !outline) return null;

    let opener = null;
    const dialog = document.createElement("dialog");
    dialog.className = "course-lightbox";
    dialog.setAttribute("aria-label", "教學圖放大檢視");
    dialog.innerHTML = `<div class="course-lightbox-panel">
      <div class="course-lightbox-toolbar"><span class="course-lightbox-count" aria-live="polite"></span><button class="course-lightbox-close" type="button" aria-label="關閉放大圖片">×</button></div>
      <figure><img alt=""><figcaption></figcaption></figure>
      <div class="course-lightbox-actions"><button class="course-lightbox-previous" type="button">← 上一張</button><button class="course-lightbox-next" type="button">下一張 →</button></div>
    </div>`;
    document.body.append(dialog);

    const dialogImage = dialog.querySelector("figure img");
    const dialogCaption = dialog.querySelector("figcaption");
    const counter = dialog.querySelector(".course-lightbox-count");
    const closeButton = dialog.querySelector(".course-lightbox-close");
    const previousButton = dialog.querySelector(".course-lightbox-previous");
    const nextButton = dialog.querySelector(".course-lightbox-next");

    function render(state) {
      if (!state.open) {
        if (dialog.open) dialog.close();
        return;
      }
      const source = images[state.index];
      const caption = source.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || source.alt;
      dialogImage.src = source.currentSrc || source.src;
      dialogImage.alt = source.alt;
      dialogCaption.textContent = caption;
      counter.textContent = `${state.index + 1} / ${state.count}`;
      if (!dialog.open) {
        dialog.showModal();
        document.body.classList.add("course-lightbox-open");
        closeButton.focus();
      }
    }

    const gallery = createGalleryState(images.length, render);
    images.forEach((image, index) => {
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", `${image.alt}，按下可放大`);
      image.addEventListener("click", () => {
        opener = image;
        gallery.open(index);
      });
      image.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        opener = image;
        gallery.open(index);
      });
    });

    previousButton.addEventListener("click", () => gallery.previous());
    nextButton.addEventListener("click", () => gallery.next());
    closeButton.addEventListener("click", () => gallery.close());
    dialog.addEventListener("click", event => {
      if (event.target === dialog) gallery.close();
    });
    dialog.addEventListener("cancel", event => {
      event.preventDefault();
      gallery.close();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("course-lightbox-open");
      opener?.focus();
    });
    document.addEventListener("keydown", event => {
      if (!gallery.handleKey(event.key)) return;
      event.preventDefault();
    });

    if (outline && "IntersectionObserver" in window) {
      const links = [...outline.querySelectorAll('a[href^="#lesson-section-"]')];
      const sections = links.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
      const observer = new window.IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        links.forEach(link => {
          if (link.getAttribute("href") === `#${visible.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }, { rootMargin: "-20% 0px -65%", threshold: 0 });
      sections.forEach(section => observer.observe(section));
    }

    return { gallery, dialog };
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { createGalleryState, setupCourseMedia };
  if (globalScope) globalScope.setupCourseMedia = setupCourseMedia;
})(typeof window !== "undefined" ? window : null);
