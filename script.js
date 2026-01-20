// script.js

// Services: animate on scroll (IntersectionObserver)
(() => {
  const items = document.querySelectorAll(".services__grid .animate-service");
  if (!items.length) return;

  // Respect reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
