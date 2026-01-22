// ===============================
// Services cards: animate on scroll
// ===============================
(() => {
  const items = document.querySelectorAll(".services__grid .animate-service");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  items.forEach(el => observer.observe(el));
})();

// ==========================================
// Mobile navbar + hamburger + language menu
// ==========================================
(() => {
  const toggle     = document.getElementById("nav-toggle");
  const navRight   = document.querySelector(".nav-right");
  const hamburger  = document.querySelector('label.hamburger[for="nav-toggle"]');
  const langDetails = document.querySelector(".lang__details");
  const langCode   = document.querySelector(".lang__code");
  const langItems  = document.querySelectorAll(".lang__item");

  if (!toggle || !navRight || !hamburger) return;

  // Close the mobile menu and optionally collapse language details
  const closeMenu = () => {
    // For mobile view: remove our custom open class and uncheck the toggle
    navRight.classList.remove("is-open");
    toggle.checked = false;
    if (langDetails) langDetails.open = false;
  };

  navRight.addEventListener("click", e => {
    // If a link inside the mobile menu is clicked, close the menu
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  document.addEventListener("click", e => {
    // If the mobile menu isn't open, ignore
    const isOpen = navRight.classList.contains("is-open");
    if (!isOpen) return;
    // Close menu if click occurs outside of nav panel and hamburger
    const clickedInsideNav  = navRight.contains(e.target);
    const clickedHamburger  = hamburger.contains(e.target);
    if (!clickedInsideNav && !clickedHamburger) closeMenu();
  });

  document.addEventListener("keydown", e => {
    // Escape key closes the mobile menu
    if (e.key === "Escape") closeMenu();
  });

  // Keep language details collapsed when the menu is programmatically closed
  toggle.addEventListener("change", () => {
    if (!toggle.checked && langDetails) langDetails.open = false;
  });

  // Watch for viewport width changes and close the menu when resizing to desktop
  const mq = window.matchMedia("(min-width: 721px)");
  mq.addEventListener("change", e => {
    if (e.matches) closeMenu();
  });

  hamburger.addEventListener("click", e => {
    // Prevent default toggling by the label to avoid double flips
    e.preventDefault();
    e.stopPropagation();
    // Toggle our custom open class on the mobile panel
    const isOpen = navRight.classList.toggle("is-open");
    // Mirror the state on the hidden checkbox for accessibility and CSS
    toggle.checked = isOpen;
    // Update ARIA attributes
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navRight.setAttribute("aria-hidden", isOpen ? "false" : "true");
    // Collapse the language submenu when closing
    if (!isOpen && langDetails) langDetails.open = false;
    // Log the current state for debugging
    console.log(
      "Hamburger clicked: menu is now",
      isOpen ? "open" : "closed"
    );
  });

  // Also keep ARIA in sync for any other way the checkbox can change
  toggle.addEventListener("change", () => {
    const isOpen = toggle.checked;
    // Sync class with checkbox state
    if (isOpen) {
      navRight.classList.add("is-open");
    } else {
      navRight.classList.remove("is-open");
    }
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navRight.setAttribute("aria-hidden", isOpen ? "false" : "true");
    console.log(
      "nav-toggle change event:",
      isOpen ? "checked (open)" : "unchecked (closed)"
    );
  });

  // Language selection
  langItems.forEach(item => {
    item.addEventListener("click", () => {
      const text = item.textContent.trim();
      if (langCode) langCode.textContent = text;
      // if translation helper exists, use it
      if (typeof window.setLanguage === "function") {
        const chosen = item.getAttribute("data-lang") || text.toLowerCase();
        window.setLanguage(chosen);
      }
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

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    cards.forEach(el => el.classList.add("in-view"));
    return;
  }
  if (!("IntersectionObserver" in window)) {
    cards.forEach(el => el.classList.add("in-view"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );
  cards.forEach(el => obs.observe(el));
})();

// ===============================
// Language translation setup
// ===============================
(() => {
  // Translation dictionary for English and Croatian
  const translations = {
    en: {
      nav_home: "Home",
      nav_services: "Service",
      nav_about: "About Us",
      nav_contact: "Contact Us",
      hero_title: "Sabioncello<br />\n<span class=\"accent\">Property</span> Management",
      hero_subtitle:
        "Professional provider of property management and maintenance services in the Pelješac Area – Orebić, Viganj, Kučište, Lovište.",
      hero_cta: "Get Started",
      services_title: "Our Top Services",
      services_subtitle:
        "We are family firm from Peljesac that can guarantee you quality of facility maintenance and safety for your property.",
      svc1_kicker: "Object cleaning",
      svc1_title: "Individual cleaning for you or your guest",
      svc2_kicker: "Property Management",
      svc2_title: "We take care of your property",
      svc3_kicker: "Holiday Rentals",
      svc3_title: "Complete service for a smooth holiday rental",
      svc4_kicker: "Garden Maintenance",
      svc4_title: "We care for your outdoor spaces",
      svc5_kicker: "Pool Maintenance",
      svc5_title: "Safe, clean & well-maintained pools",
      svc6_kicker: "Administrative Assistance",
      svc6_title: "Support with documentation & paperwork",
      pricing_kicker: "Pricing details",
      pricing_title: "Our Pricing",
      pricing_subtitle:
        "We are family firm from Pelješac that can guarantee you quality of facility maintenance and safety for your property.",
      pricing_cta: "Get Started",
      price1_pill: "Monthly Check",
      price_from: "From",
      price1_freq: "Monthly",
      price1_li1: "Check once a month",
      price1_li2: "Ventilation of all rooms",
      price1_li3: "Security check",
      price1_li4: "Flusing the sanitary facilities",
      price1_li5: "Empty mailbox",
      price1_li6: "Check all connections",
      price_more: "More Information",
      price2_pill: "Weekly Check",
      price2_freq: "Monthly",
      price2_li1: "Check-up 4 times/month",
      price2_li2: "Ventilation of all rooms",
      price2_li3: "Security check",
      price2_li4: "Flusing the sanitary facilities",
      price2_li5: "Empty mailbox",
      price2_li6: "Check all connections",
      about_title: "About <span class=\"accent\">Sabioncello</span>",
      about_eyebrow: "WHY SABIONCELLO IS THE RIGHT PARTNER FOR YOUR HOLIDAY RENTAL",
      about_text:
        "Our mission goes far beyond keeping your property clean — we aim to create an exceptional\n            experience for both owners and guests. As an experienced holiday rental service provider\n            on Pelješac, Sabioncello understands the demands of the seasonal rental market in every\n            detail. We are not just a cleaning team; we act as your trusted host in the background,\n            ensuring everything runs smoothly and professionally at all times. Our team is trained,\n            discreet, and service-oriented, with a strong focus on reliability and guest satisfaction.\n            Multilingual communication ensures clear and efficient support for international guests.",
      about_card_title: "Why property owners choose Sabioncello:",
      about_list1: "Dedicated local contact on site",
      about_list2: "Fast response times for guest inquiries and urgent situations",
      about_list3: "Transparent pricing with no hidden costs",
      about_list4: "Flexible service packages tailored to individual property needs",
      about_fineprint:
        "With Sabioncello, your holiday rental on Pelješac is managed with care, professionalism,\n              and attention to detail — so you and your guests can enjoy complete peace of mind.",
      howto_title:
        "How To Book Our<br />\n                Service <span class=\"accent\">Book An Appointment</span>",
      howto_cta: "Book An Appointment",
      howto1_title: "Make an appointment online or by phone",
      howto1_text:
        "You can easily arrange appointments via our booking calendar or by phone.",
      howto2_title: "Preparation of a needs analysis with an offer",
      howto2_text:
        "During an on-site appointment, we will provide you with a free, non-binding quote\n                including a needs analysis.",
      howto3_title: "Implementation of the desired service",
      howto3_text:
        "After all work has been completed, you will immediately receive a clear report\n                including pictures.",
      contact_title: "Ready To Call",
      contact_subtitle:
        "WHY SABIONCELLO IS THE RIGHT PARTNER FOR YOUR HOLIDAY RENTAL",
      contact_label_name: "Name",
      contact_placeholder_name: "Type your name...",
      contact_label_email: "Email",
      contact_placeholder_email: "Type your email address...",
      contact_label_phone: "Phone Number",
      contact_placeholder_phone: "Type your number",
      contact_label_message: "Message",
      contact_placeholder_message: "Type your message...",
      contact_cta: "SCHEDULE A CALL",
      footer_text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut",
      footer_directly_to: "Directly To",
      footer_nav_home: "Home",
      footer_nav_about: "About Us",
      footer_nav_contact: "Contact Us",
      footer_services_heading: "Services",
      footer_service1: "Key Holding Services",
      footer_service2: "Cleaning Services",
      footer_service3: "Checking in and out",
      footer_service4: "Pool cleaning and Maintenance",
      footer_service5: "Laundry Services",
      footer_service6: "Paperwork",
      footer_contact_heading: "Do you have a question",
      footer_contact_call_title: "Call Us",
      footer_contact_email_title: "Email",
      footer_copyright: "© Copyright Sabioncello. All Rights Reserved",
      svc_hero_title: "Our Services at a Glance",
      svc_hero_subtitle:
        "From property management to cleaning, pool & garden maintenance — we take care of your\n            home on Pelješac thoroughly, discreetly, and reliably.",
      svc_tile1_title: "Property Management",
      svc_tile2_title: "Thorough Cleaning",
      svc_tile3_title: "Holiday Rentals",
      svc_tile4_title: "Garden Maintenance",
      svc_tile5_title: "Pool Maintenance",
      svc_tile6_title: "Administrative Assistance"
    },
    hr: {
      nav_home: "Početna",
      nav_services: "Usluge",
      nav_about: "O nama",
      nav_contact: "Kontakt",
      hero_title: "Sabioncello<br />\n<span class=\"accent\">Upravljanje</span> nekretninama",
      hero_subtitle:
        "Profesionalni pružatelj usluga upravljanja nekretninama i održavanja u području Pelješca – Orebić, Viganj, Kučište, Lovište.",
      hero_cta: "Započni",
      services_title: "Naše glavne usluge",
      services_subtitle:
        "Mi smo obiteljska tvrtka s Pelješca koja jamči kvalitetu održavanja objekata i sigurnost vaše nekretnine.",
      svc1_kicker: "Čišćenje objekta",
      svc1_title: "Individualno čišćenje za vas ili vaše goste",
      svc2_kicker: "Upravljanje nekretninama",
      svc2_title: "Brinemo o vašoj nekretnini",
      svc3_kicker: "Najam kuća za odmor",
      svc3_title: "Kompletna usluga za bezbrižan najam",
      svc4_kicker: "Održavanje vrta",
      svc4_title: "Brinemo o vašim vanjskim prostorima",
      svc5_kicker: "Održavanje bazena",
      svc5_title: "Sigurni, čisti i dobro održavani bazeni",
      svc6_kicker: "Administrativna podrška",
      svc6_title: "Podrška s dokumentacijom i papirologijom",
      pricing_kicker: "Detalji o cijenama",
      pricing_title: "Naše cijene",
      pricing_subtitle:
        "Mi smo obiteljska tvrtka s Pelješca koja jamči kvalitetu održavanja objekata i sigurnost vaše nekretnine.",
      pricing_cta: "Započni",
      price1_pill: "Mjesečna kontrola",
      price_from: "Od",
      price1_freq: "Mjesečno",
      price1_li1: "Provjera jednom mjesečno",
      price1_li2: "Provjetravanje svih prostorija",
      price1_li3: "Sigurnosna provjera",
      price1_li4: "Ispiranje sanitarnih uređaja",
      price1_li5: "Pražnjenje poštanskog sandučića",
      price1_li6: "Provjera svih priključaka",
      price_more: "Više informacija",
      price2_pill: "Tjedna kontrola",
      price2_freq: "Tjedno",
      price2_li1: "Pregled 4 puta mjesečno",
      price2_li2: "Provjetravanje svih prostorija",
      price2_li3: "Sigurnosna provjera",
      price2_li4: "Ispiranje sanitarnih uređaja",
      price2_li5: "Pražnjenje poštanskog sandučića",
      price2_li6: "Provjera svih priključaka",
      about_title: "O <span class=\"accent\">Sabioncello</span>",
      about_eyebrow: "ZAŠTO JE SABIONCELLO PRAVI PARTNER ZA VAŠU KUĆU ZA ODMOR",
      about_text:
        "Naša misija ide daleko iznad samog čišćenja vaše nekretnine — želimo stvoriti iznimno iskustvo\n            i za vlasnike i za goste. Kao iskusni pružatelj usluga iznajmljivanja na Pelješcu, Sabioncello\n            razumije zahtjeve tržišta sezonskog najma u svim detaljima. Nismo samo ekipa za čišćenje;\n            djelujemo kao vaš pouzdan domaćin u pozadini, osiguravajući da sve uvijek funkcionira glatko i\n            profesionalno. Naš tim je obučen, diskretan i orijentiran na uslugu, sa snažnim naglaskom na\n            pouzdanost i zadovoljstvo gostiju. Višejezična komunikacija osigurava jasnu i učinkovitu\n            podršku za međunarodne goste.",
      about_card_title: "Zašto vlasnici nekretnina biraju Sabioncello:",
      about_list1: "Posvećen lokalni kontakt na licu mjesta",
      about_list2: "Brzi odziv na upite gostiju i hitne situacije",
      about_list3: "Transparentne cijene bez skrivenih troškova",
      about_list4: "Fleksibilni paketi usluga prilagođeni potrebama vaše nekretnine",
      about_fineprint:
        "Uz Sabioncello, vaša kuća za odmor na Pelješcu upravlja se s pažnjom, profesionalnošću\n              i posvećenošću detaljima — tako da vi i vaši gosti možete uživati u potpunom miru.",
      howto_title:
        "Kako rezervirati našu<br />\n                uslugu <span class=\"accent\">Rezervirajte termin</span>",
      howto_cta: "Rezervirajte termin",
      howto1_title: "Dogovorite termin online ili telefonom",
      howto1_text:
        "Lako možete dogovoriti termine putem našeg kalendara ili telefonom.",
      howto2_title: "Izrada analize potreba s ponudom",
      howto2_text:
        "Tijekom termina na licu mjesta pružit ćemo vam besplatnu, neobvezujuću ponudu\n                koja uključuje analizu potreba.",
      howto3_title: "Provedba željene usluge",
      howto3_text:
        "Nakon obavljenog posla odmah ćete dobiti jasan izvještaj s fotografijama.",
      contact_title: "Spremni za poziv",
      contact_subtitle:
        "ZAŠTO JE SABIONCELLO PRAVI PARTNER ZA VAŠU KUĆU ZA ODMOR",
      contact_label_name: "Ime",
      contact_placeholder_name: "Upišite svoje ime...",
      contact_label_email: "E-pošta",
      contact_placeholder_email: "Upišite svoju e-poštu...",
      contact_label_phone: "Broj telefona",
      contact_placeholder_phone: "Upišite svoj broj",
      contact_label_message: "Poruka",
      contact_placeholder_message: "Upišite svoju poruku...",
      contact_cta: "ZAKAŽITE POZIV",
      footer_text:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut",
      footer_directly_to: "Direktno do",
      footer_nav_home: "Početna",
      footer_nav_about: "O nama",
      footer_nav_contact: "Kontakt",
      footer_services_heading: "Usluge",
      footer_service1: "Usluge čuvanja ključeva",
      footer_service2: "Usluge čišćenja",
      footer_service3: "Prijava i odjava",
      footer_service4: "Čišćenje i održavanje bazena",
      footer_service5: "Usluge pranja rublja",
      footer_service6: "Papirologija",
      footer_contact_heading: "Imate li pitanje",
      footer_contact_call_title: "Nazovite nas",
      footer_contact_email_title: "Email",
      footer_copyright: "© Copyright Sabioncello. Sva prava pridržana",
      svc_hero_title: "Naše usluge na prvi pogled",
      svc_hero_subtitle:
        "Od upravljanja nekretninama do čišćenja, održavanja bazena i vrta — temeljito, diskretno i pouzdano brinemo o vašem domu na Pelješcu.",
      svc_tile1_title: "Upravljanje nekretninama",
      svc_tile2_title: "Dubinsko čišćenje",
      svc_tile3_title: "Najam kuća za odmor",
      svc_tile4_title: "Održavanje vrta",
      svc_tile5_title: "Održavanje bazena",
      svc_tile6_title: "Administrativna podrška"
    }
  };

  const htmlTag = document.documentElement;

  /** Apply translations to elements with data-i18n / data-i18n-placeholder. */
  function applyTranslations(lang) {
    const dict = translations[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key  = el.getAttribute("data-i18n");
      const text = dict[key];
      if (typeof text === "string") {
        el.innerHTML = text;
      }
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key  = el.getAttribute("data-i18n-placeholder");
      const text = dict[key];
      if (typeof text === "string") {
        el.setAttribute("placeholder", text);
      }
    });
    if (htmlTag) htmlTag.setAttribute("lang", lang);
  }

  /** Persist language choice and apply translations; exposed on window. */
  function setLanguage(lang) {
    try {
      localStorage.setItem("language", lang);
    } catch (e) { /* ignore */ }
    const codeEl = document.querySelector(".lang__code");
    if (codeEl) codeEl.textContent = lang.toUpperCase();
    applyTranslations(lang);
  }

  // Expose globally so nav handler can call it
  window.setLanguage = setLanguage;

  // On page load, apply the saved or default language
  document.addEventListener("DOMContentLoaded", () => {
    let lang = "en";
    try {
      lang = localStorage.getItem("language") || lang;
    } catch (e) { /* ignore */ }
    if (!translations[lang]) lang = "en";
    setLanguage(lang);
  });
})();

// ===============================
// Disable horizontal scrolling (X axis)
// ===============================
(() => {
  const disableXScroll = () => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  };

  // Apply immediately
  disableXScroll();

  // Re-apply after DOM is fully loaded (safety)
  document.addEventListener("DOMContentLoaded", disableXScroll);

  // Re-apply after window resize (safety for responsive layouts)
  window.addEventListener("resize", disableXScroll);
})();
