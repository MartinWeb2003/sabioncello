// ===============================
// Services cards: animate on scroll
// ===============================
(() => {
  const items = document.querySelectorAll(".services__grid .animate-service");
  if (!items.length) return;

  // Reduced motion → show immediately
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }

  // Fallback if IntersectionObserver is not supported
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  items.forEach(el => observer.observe(el));
})();


// ==========================================
// Mobile navbar + hamburger + language menu
// ==========================================
(() => {
  const toggle = document.getElementById("nav-toggle");
  const navRight = document.querySelector(".nav-right");
  const hamburger = document.querySelector('label.hamburger[for="nav-toggle"]');
  const langDetails = document.querySelector(".lang__details");
  const langCode = document.querySelector(".lang__code");
  const langItems = document.querySelectorAll(".lang__item");

  if (!toggle || !navRight || !hamburger) return;

  const closeMenu = () => {
    toggle.checked = false;
    if (langDetails) langDetails.open = false;
  };

  // Close menu when clicking any nav link
  navRight.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!toggle.checked) return;

    const clickedInsideNav = navRight.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);

    if (!clickedInsideNav && !clickedHamburger) {
      closeMenu();
    }
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // If hamburger closes, also close language submenu
  toggle.addEventListener("change", () => {
    if (!toggle.checked && langDetails) {
      langDetails.open = false;
    }
  });

  // Reset menu when resizing to desktop
  const mq = window.matchMedia("(min-width: 721px)");
  mq.addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  // ===============================
  // Language selection (HR / EN)
  // ===============================
  langItems.forEach(item => {
    item.addEventListener("click", () => {
      const text = item.textContent.trim();

      if (langCode) {
        // Expecting buttons like "EN" / "HR"
        langCode.textContent = text;
      }

      // Close language submenu only (keep nav open)
      if (langDetails) langDetails.open = false;
    });
  });
})();


// ===============================
// Pricing cards: animate on scroll
// ===============================
(() => {
  const cards = document.querySelectorAll(".pricing__right .price-card.animate-price");
  if (!cards.length) return;

  // Reduced motion: show immediately
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach((el) => el.classList.add("in-view"));
    return;
  }

  // Fallback: if IntersectionObserver isn't supported, show immediately
  if (!("IntersectionObserver" in window)) {
    cards.forEach((el) => el.classList.add("in-view"));
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
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  cards.forEach((el) => obs.observe(el));
})();
