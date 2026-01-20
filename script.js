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

// Mobile navbar behavior (hamburger + language details)
(() => {
  const toggle = document.getElementById("nav-toggle");
  const navRight = document.querySelector(".nav-right");
  const hamburger = document.querySelector('label.hamburger[for="nav-toggle"]');
  const langDetails = document.querySelector(".lang__details");

  if (!toggle || !navRight || !hamburger) return;

  const closeMenu = () => {
    toggle.checked = false;
    if (langDetails) langDetails.open = false;
  };

  // Close menu when clicking a nav link (including Contact, etc.)
  navRight.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  // Close when clicking outside (when open)
  document.addEventListener("click", (e) => {
    if (!toggle.checked) return;
    const clickedInsideNav = navRight.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);
    if (!clickedInsideNav && !clickedHamburger) closeMenu();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // If the checkbox gets unchecked (user taps hamburger again), also close language
  toggle.addEventListener("change", () => {
    if (!toggle.checked && langDetails) langDetails.open = false;
  });

  // If user resizes to desktop, ensure mobile menu is reset
  const mq = window.matchMedia("(min-width: 721px)");
  mq.addEventListener("change", (ev) => {
    if (ev.matches) closeMenu();
  });
})();
