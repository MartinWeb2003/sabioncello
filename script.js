// script.js

// Services: animate on scroll (IntersectionObserver) + fallbacks
(() => {
  const items = document.querySelectorAll(".services__grid .animate-service");
  if (!items.length) return;

  // Reduced motion: show immediately
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  // Fallback: if IntersectionObserver isn't supported, show immediately
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // animate once
        }
      }
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  items.forEach((el) => obs.observe(el));
})();
