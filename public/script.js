// ===============================
// Services cards: animate on scroll
// ===============================
(() => {
  const items = document.querySelectorAll(".services__grid .animate-service");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
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
  const toggle      = document.getElementById("nav-toggle");
  const navRight    = document.querySelector(".nav-right");
  const hamburger   = document.querySelector('label.hamburger[for="nav-toggle"]');
  const langDetails = document.querySelector(".lang__details");
  const langItems   = document.querySelectorAll(".lang__item");

  if (!toggle || !navRight || !hamburger) return;

  const closeMenu = () => {
    navRight.classList.remove("is-open");
    toggle.checked = false;
    if (langDetails) langDetails.open = false;
    hamburger.setAttribute("aria-expanded", "false");
    navRight.setAttribute("aria-hidden", "true");
  };

  navRight.addEventListener("click", e => {
    const link = e.target.closest("a");
    if (link) closeMenu();
  });

  document.addEventListener("click", e => {
    const isOpen = navRight.classList.contains("is-open");
    if (!isOpen) return;

    const clickedInsideNav = navRight.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);
    if (!clickedInsideNav && !clickedHamburger) closeMenu();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeMenu();
  });

  const mq = window.matchMedia("(min-width: 721px)");
  mq.addEventListener("change", e => {
    if (e.matches) closeMenu();
  });

  hamburger.addEventListener("click", e => {
    // Prevent default label behaviour to avoid double toggles
    e.preventDefault();
    e.stopPropagation();

    const isOpen = navRight.classList.toggle("is-open");
    toggle.checked = isOpen;

    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navRight.setAttribute("aria-hidden", isOpen ? "false" : "true");

    if (!isOpen && langDetails) langDetails.open = false;
  });

  // Keep ARIA + class in sync if checkbox changes in any other way
  toggle.addEventListener("change", () => {
    const isOpen = toggle.checked;
    navRight.classList.toggle("is-open", isOpen);
    hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    navRight.setAttribute("aria-hidden", isOpen ? "false" : "true");
    if (!isOpen && langDetails) langDetails.open = false;
  });

  // Language selection buttons (data-lang="en"/"hr")
  langItems.forEach(item => {
    item.addEventListener("click", () => {
      const chosen = (item.getAttribute("data-lang") || "").toLowerCase();
      if (typeof window.setLanguage === "function" && (chosen === "en" || chosen === "hr")) {
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

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
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
  // ... (above parts of the script remain unchanged)
const translations = {
  "en": {
    "about_card_title": "Why Pelješac property owners choose Sabioncello:",
    "about_eyebrow": "WHY SABIONCELLO IS THE RIGHT PARTNER FOR YOUR PELJEŠAC HOLIDAY RENTAL",
    "about_fineprint": "With Sabioncello, your holiday rental on Pelješac is managed with care, professionalism,\n              and attention to detail — so you and your guests can enjoy complete peace of mind.",
    "about_list1": "Dedicated local on-site contact",
    "about_list2": "Fast response times for guest inquiries and emergencies",
    "about_list3": "Transparent pricing with no hidden costs",
    "about_list4": "Flexible service packages tailored to individual property needs",
    "about_text": "Our mission goes far beyond keeping your property clean — we aim to create an exceptional\n            experience for both owners and guests. As an experienced holiday rental service provider\n            on Pelješac, Sabioncello understands the demands of the seasonal rental market down to the last\n            detail. We are not just a cleaning team; we act as your trusted host in the background,\n            ensuring everything runs smoothly and professionally at all times. Our team is trained,\n            discreet, and service-oriented, with a strong focus on reliability and guest satisfaction.\n            Multilingual communication ensures clear and efficient support for international guests.",
    "about_title": "About <span class=\"accent\">Sabioncello</span>",
    "admin_benefit1_p": "Our on-site knowledge of regulations ensures smooth processes.",
    "admin_benefit1_title": "Local Expertise",
    "admin_benefit2_p": "We handle all paperwork and coordination, saving you time.",
    "admin_benefit2_title": "Time Savings",
    "admin_benefit3_p": "We ensure documents and procedures meet legal requirements.",
    "admin_benefit3_title": "Accuracy &amp; Compliance",
    "admin_benefit4_p": "We work with reliable professionals to deliver quality services.",
    "admin_benefit4_title": "Trusted Partners",
    "admin_benefits_title": "Why Choose Sabioncello",
    "admin_equipment_p": "Our administrative assistance ensures all your property-related paperwork and communications are managed accurately and efficiently, so you can focus on what matters most.",
    "admin_equipment_title": "Reliable Administration",
    "admin_features_li1": "Communication with local authorities",
    "admin_features_li2": "Documentation preparation &amp; collection",
    "admin_features_li3": "Coordination of inspections",
    "admin_features_li4": "Organisation of services with trusted partners",
    "admin_features_li5": "Timely &amp; accurate paperwork",
    "admin_features_title": "Key Features",
    "admin_hero_heading": "Administrative Assistance",
    "admin_hero_subtitle": "Support with documentation &amp; paperwork",
    "admin_overview_heading": "Support with Documentation &amp; Paperwork",
    "admin_overview_p1": "Sabioncello provides reliable administrative support related to your property, helping you save time and avoid unnecessary stress.",
    "admin_overview_p2": "We assist property owners with communication with local authorities, preparation and collection of required documentation, coordination of technical inspections, and organisation of services with trusted third parties.",
    "admin_overview_p3": "Our goal is to simplify administrative procedures and ensure that all paperwork is handled correctly and on time.",
    "admin_overview_p4": "With strong local knowledge and on-site support, Sabioncello acts as a trusted partner for administrative assistance on Pelješac, giving you complete peace of mind.",
    "admin_step1_p": "Reach out to discuss your administrative needs.",
    "admin_step1_title": "Contact us",
    "admin_step2_p": "We evaluate your requirements and provide a tailored offer.",
    "admin_step2_title": "Assessment &amp; Quote",
    "admin_step3_p": "We handle all paperwork and coordination for you.",
    "admin_step3_title": "Service delivery",
    "admin_steps_cta": "Get Started",
    "admin_steps_title": "How to Get Started",
    "contact_cta": "GET STARTED",
    "contact_label_email": "Email",
    "contact_label_message": "Message",
    "contact_label_name": "Name",
    "contact_label_phone": "Phone Number",
    "contact_subtitle": "WHY SABIONCELLO IS THE RIGHT PARTNER FOR YOUR PELJEŠAC HOLIDAY RENTAL",
    "contact_title": "Ready To Talk",
    "footer_contact_call_title": "Call Us",
    "footer_contact_email_title": "Email",
    "footer_contact_heading": "Have a question?",
    "footer_copyright": "© Copyright Sabioncello. All Rights Reserved",
    "footer_directly_to": "Quick Links",
    "footer_nav_about": "About Us",
    "footer_nav_contact": "Contact Us",
    "footer_nav_home": "Home",
    "footer_service1": "Key Holding Services",
    "footer_service2": "Cleaning Services",
    "footer_service3": "Check-In & Check-Out",
    "footer_service4": "Pool Cleaning and Maintenance",
    "footer_service5": "Laundry Services",
    "footer_service6": "Administrative Support",
    "footer_services_heading": "Services",
    "footer_text": "Family-run property management and maintenance for your Pelješac home – reliable, thorough, and trustworthy",
    "garden_benefit1_p": "Our team brings expert horticultural knowledge and attention to detail.",
    "garden_benefit1_title": "Expertise &amp; Care",
    "garden_benefit2_p": "We maintain your garden throughout all seasons, preventing damage.",
    "garden_benefit2_title": "Year-Round Maintenance",
    "garden_benefit3_p": "We use environmentally safe methods to protect plants and nature.",
    "garden_benefit3_title": "Eco-Friendly Practices",
    "garden_benefit4_p": "Count on us for regular, punctual maintenance and thorough reporting.",
    "garden_benefit4_title": "Reliable Service",
    "garden_benefits_title": "Why Choose Sabioncello",
    "garden_equipment_p": "Our garden maintenance uses professional tools and environmentally friendly practices to ensure your outdoor spaces are kept pristine and healthy.",
    "garden_equipment_title": "Comprehensive Care",
    "garden_features_li1": "Regular lawn mowing",
    "garden_features_li2": "Hedge &amp; plant trimming",
    "garden_features_li3": "Debris &amp; leaf removal",
    "garden_features_li4": "Seasonal maintenance",
    "garden_features_li5": "Health monitoring &amp; watering",
    "garden_features_title": "Key Features",
    "garden_hero_heading": "Garden Maintenance",
    "garden_hero_subtitle": "We care for your outdoor spaces",
    "garden_overview_heading": "Outdoor &amp; Garden Maintenance",
    "garden_overview_p1": "Sabioncello provides reliable outdoor and garden maintenance services on Pelješac, designed to keep your property’s surroundings neat, healthy, and visually appealing throughout the year.",
    "garden_overview_p2": "Our service includes regular lawn mowing, trimming of hedges and plants, removal of dry leaves and debris, and general upkeep of outdoor areas. We monitor plant health, ensure proper watering, and maintain pathways, terraces, and access areas in clean and safe condition.",
    "garden_overview_p3": "Seasonal maintenance and weather-related checks are an essential part of our approach, helping prevent damage and ensuring that outdoor spaces remain welcoming and well maintained at all times.",
    "garden_overview_p4": "With systematic care and attention to detail, Sabioncello helps preserve the value and appearance of your property on Pelješac, so your outdoor areas always reflect the same high standard as the interior.",
    "garden_step1_p": "Contact us to discuss your garden’s requirements.",
    "garden_step1_title": "Request a quote",
    "garden_step2_p": "We create a tailored maintenance plan and schedule.",
    "garden_step2_title": "Planning &amp; schedule",
    "garden_step3_p": "We maintain your garden and update you regularly.",
    "garden_step3_title": "Ongoing care",
    "garden_steps_cta": "Get Started",
    "garden_steps_title": "How to Get Started",
    "hero_cta": "Get Started",
    "hero_subtitle": "Professional property management and maintenance services on Pelješac\n              – Orebić, Viganj, Kučište, and Lovište.",
    "hero_title": "Sabioncello<br/>\n<span class=\"accent\">Property</span> Management",
    "howto1_text": "You can easily arrange appointments via our booking calendar or by phone.",
    "howto1_title": "Make an appointment online or by phone",
    "howto2_text": "During an on-site appointment, we will provide you with a free, non-binding quote\n                including a needs analysis.",
    "howto2_title": "Preparation of a needs analysis with an offer",
    "howto3_text": "After all work has been completed, you will immediately receive a clear report\n                including pictures.",
    "howto3_title": "Implementation of the desired service",
    "howto_cta": "Get Started",
    "howto_title": "How To Book Our<br/>\n                Service <span class=\"accent\">Book An Appointment</span>",
    "hrent_benefit1_p": "We bring years of experience and high standards to rental management.",
    "hrent_benefit1_title": "Experience &amp; Reliability",
    "hrent_benefit2_p": "We ensure guests have a pleasant stay and leave positive reviews.",
    "hrent_benefit2_title": "Guest Satisfaction",
    "hrent_benefit3_p": "Our team of professionals is dedicated to every detail.",
    "hrent_benefit3_title": "Certified Staff",
    "hrent_benefit4_p": "We tailor our service to your needs and provide peace of mind.",
    "hrent_benefit4_title": "Peace of Mind",
    "hrent_benefits_title": "Why Choose Sabioncello",
    "hrent_equipment_p": "Deep cleaning services go far beyond standard, everyday cleaning. They require professional tools, carefully selected products and proven techniques to ensure a home is thoroughly cleaned and properly disinfected. At Sabioncello, we never compromise on quality. All our services are performed using industry-leading equipment and premium cleaning products, ensuring consistent, high-level results for every property we maintain. By combining high-quality tools with environmentally friendly cleaning solutions, we work systematically and efficiently to achieve exceptional cleanliness within a reasonable timeframe.",
    "hrent_equipment_title": "High‑Quality Equipment &amp; Products",
    "hrent_features_li1": "10 Years of Experience",
    "hrent_features_li2": "Thorough cleaning between stays",
    "hrent_features_li3": "Guest turnover management",
    "hrent_features_li4": "High-quality equipment &amp; products",
    "hrent_features_li5": "Custom service packages",
    "hrent_features_title": "Key Features",
    "hrent_hero_heading": "Holiday Rental Management",
    "hrent_hero_subtitle": "Complete service for a smooth holiday rental experience",
    "hrent_overview_heading": "Stress-Free Holiday Rentals",
    "hrent_overview_p1": "Sabioncello provides professional holiday rental services on Pelješac that ensure your property is prepared and managed for guests, offering a smooth and seamless experience.",
    "hrent_overview_p2": "Our experienced team handles cleaning, guest turnover, and property upkeep with expert care and attention, letting you enjoy stress‑free rentals.",
    "hrent_step1_p": "Arrange appointments easily via our booking calendar or by phone.",
    "hrent_step1_title": "Make an appointment",
    "hrent_step2_p": "During an on‑site appointment, we provide a free, non‑binding quote including a needs analysis.",
    "hrent_step2_title": "Needs analysis &amp; offer",
    "hrent_step3_p": "After work is completed, you receive a clear report with photos.",
    "hrent_step3_title": "Service implementation",
    "hrent_steps_cta": "Get Started",
    "hrent_steps_title": "How to Get Started",
    "nav_about": "About Us",
    "nav_contact": "Contact Us",
    "nav_home": "Home",
    "nav_services": "Services",
    "oc_benefit1_p": "We bring years of hands‑on experience and expert knowledge to every\n                cleaning project.",
    "oc_benefit1_title": "10+ Years Experience",
    "oc_benefit2_p": "Our cleaning products are environmentally friendly and safe for\n                materials and nature.",
    "oc_benefit2_title": "Eco‑Friendly Products",
    "oc_benefit3_p": "Our team consists of certified professionals who pay attention to\n                every detail.",
    "oc_benefit3_title": "Certified Staff",
    "oc_benefit4_p": "We offer reliable, punctual services tailored to your needs,\n                ensuring total satisfaction.",
    "oc_benefit4_title": "Reliability",
    "oc_benefits_title": "Why Choose Sabioncello",
    "oc_equipment_p": "Deep cleaning services go far beyond standard, everyday cleaning. They\n              require professional tools, carefully selected products and proven\n              techniques to ensure a home is thoroughly cleaned and properly\n              disinfected. At Sabioncello, we never compromise on quality. All our\n              services are performed using industry‑leading equipment and premium\n              cleaning products, ensuring consistent, high‑level results for every\n              property we maintain. By combining high‑quality tools with\n              environmentally friendly cleaning solutions, we work systematically and\n              efficiently to achieve exceptional cleanliness within a reasonable\n              timeframe.",
    "oc_equipment_title": "High‑Quality Equipment &amp; Products",
    "oc_features_li1": "10 Years of Experience",
    "oc_features_li2": "Deep cleaning beyond surface dusting",
    "oc_features_li3": "Certified cleaning staff",
    "oc_features_li4": "High-quality equipment &amp; products",
    "oc_features_li5": "Customized add-on options",
    "oc_features_title": "Key Features",
    "oc_hero_heading": "Deep Cleaning",
    "oc_hero_subtitle": "Transforming living spaces into spotless and refreshed environments",
    "oc_overview_heading": "Professional Deep Cleaning",
    "oc_overview_p1": "Sabioncello provides professional deep cleaning services on Pelješac that transform living\n            spaces into truly spotless and refreshed environments. Our service covers\n            every aspect of house and apartment cleaning, with carefully selected\n            add-on options for a fully customized and thorough cleaning experience.",
    "oc_overview_p2": "Our certified cleaning staff brings years of hands-on experience, expert\n            knowledge and attention to detail, ensuring high standards when deep\n            cleaning properties of all sizes — from apartments to luxury villas. Deep\n            cleaning goes far beyond surface dusting and basic vacuuming. It focuses\n            on the details that are often overlooked, using safe, effective, and\n            professional-grade cleaning solutions to achieve long-lasting cleanliness\n            and hygiene.",
    "oc_step1_p": "Arrange appointments easily via our booking calendar or by phone.",
    "oc_step1_title": "Make an appointment",
    "oc_step2_p": "During an on‑site appointment, we provide a free, non‑binding\n                  quote including a needs analysis.",
    "oc_step2_title": "Needs analysis &amp; offer",
    "oc_step3_p": "After work is completed, you receive a clear report with photos.",
    "oc_step3_title": "Service implementation",
    "oc_steps_cta": "Get Started",
    "oc_steps_title": "How to Get Started",
    "pm_benefit1_p": "Regular inspections detect damage early, preventing costly repairs and preserving value.",
    "pm_benefit1_title": "All-Round Protection",
    "pm_benefit2_p": "We coordinate repairs, tradespeople, and emergency services directly and personally.",
    "pm_benefit2_title": "Reliable Support",
    "pm_benefit3_p": "After each inspection, receive detailed reports with photos for maximum transparency.",
    "pm_benefit3_title": "Transparent Documentation",
    "pm_benefit4_p": "Relax while we handle the organisation and maintenance of your property.",
    "pm_benefit4_title": "Save Time &amp; Worries",
    "pm_benefits_title": "Why Choose Our Property Management",
    "pm_equipment_p": "Our property management service includes regular airing, flushing water systems, and checking for damage or unauthorized access, ensuring your property remains in optimal condition and safe at all times.",
    "pm_equipment_title": "Comprehensive Care",
    "pm_features_li1": "All-round protection for your property – damage is detected and repaired early, before major costs arise",
    "pm_features_li2": "Reliable on-site support – from minor repairs to emergency services",
    "pm_features_li3": "Transparency through photo documentation – detailed feedback after each inspection",
    "pm_features_li4": "Save time &amp; worries – we organise and maintain your property",
    "pm_features_title": "Your Benefits",
    "pm_hero_heading": "Property Management",
    "pm_hero_subtitle": "We take care of your property all year round",
    "pm_overview_heading": "We Take Care of Your Property",
    "pm_overview_p1": "The Sabioncello team ensures your property on Pelješac is carefully maintained and protected through regular inspections designed to preserve its long-term value.",
    "pm_overview_p2": "As part of our property management service, we routinely air out the property to reduce moisture and help prevent mold growth. All water systems are flushed on a weekly basis to minimize the risk of Legionella bacteria development. We also check for weather-related damage and any signs of unauthorized access or burglary.",
    "pm_overview_p3": "Each visit is thoroughly documented in a detailed inspection and service report, which is then shared with the property owner for complete transparency and peace of mind.",
    "pm_step1_p": "Reach out via phone or email to discuss your property’s needs.",
    "pm_step1_title": "Contact Us",
    "pm_step2_p": "We conduct a needs analysis and provide a non‑binding offer.",
    "pm_step2_title": "Needs Analysis &amp; Offer",
    "pm_step3_p": "We manage your property with regular inspections and updates.",
    "pm_step3_title": "Ongoing Care",
    "pm_steps_cta": "Get Started",
    "pm_steps_title": "How to Start",
    "pool_benefit1_p": "Our rigorous checks maintain crystal-clear water and hygienic conditions.",
    "pool_benefit1_title": "Clean &amp; Safe Water",
    "pool_benefit2_p": "Experienced technicians monitor equipment and balance chemicals.",
    "pool_benefit2_title": "Expert Maintenance",
    "pool_benefit3_p": "Minor issues are addressed early to avoid costly repairs.",
    "pool_benefit3_title": "Preventive Care",
    "pool_benefit4_p": "We handle seasonal openings/closures and adapt to weather conditions.",
    "pool_benefit4_title": "Seasonal Expertise",
    "pool_benefits_title": "Why Choose Sabioncello",
    "pool_equipment_p": "We use professional-grade equipment and safe chemicals to maintain water clarity and hygiene, ensuring your pool is always safe for use.",
    "pool_equipment_title": "Professional Tools &amp; Products",
    "pool_features_li1": "Water quality checks",
    "pool_features_li2": "Chemical balancing",
    "pool_features_li3": "Filtration &amp; equipment inspection",
    "pool_features_li4": "Thorough cleaning of pool and surroundings",
    "pool_features_li5": "Seasonal opening &amp; closing",
    "pool_features_title": "Key Features",
    "pool_hero_heading": "Pool Maintenance",
    "pool_hero_subtitle": "Safe, clean &amp; well-maintained pools",
    "pool_overview_heading": "Comprehensive Pool Maintenance",
    "pool_overview_p1": "Sabioncello offers reliable pool maintenance services on Pelješac to ensure your pool remains clean, safe, and ready for use at all times.",
    "pool_overview_p2": "Our service includes regular water quality checks, chemical balancing, filtration system inspection, and thorough cleaning of pool surfaces and surrounding areas.",
    "pool_overview_p3": "We remove debris, monitor equipment performance, and address minor issues before they develop into costly repairs.",
    "pool_overview_p4": "Seasonal opening and closing of pools, as well as weather-related inspections, are also part of our maintenance approach, helping to extend the lifespan of your pool and maintain optimal hygiene standards.",
    "pool_overview_p5": "With professional care and consistent monitoring, Sabioncello ensures your pool on Pelješac meets the highest standards of cleanliness, safety, and comfort for you and your guests.",
    "pool_step1_p": "Contact us to assess your pool’s maintenance needs.",
    "pool_step1_title": "Schedule a consultation",
    "pool_step2_p": "We propose a customized maintenance schedule and quote.",
    "pool_step2_title": "Get a tailored plan",
    "pool_step3_p": "We handle the maintenance while you relax.",
    "pool_step3_title": "Enjoy your pool",
    "pool_steps_cta": "Get Started",
    "pool_steps_title": "How to Book Our Service",
    "price1_freq": "Monthly",
    "price1_li1": "Check once a month",
    "price1_li2": "Ventilation of all rooms",
    "price1_li3": "Security check",
    "price1_li4": "Flushing the sanitary facilities",
    "price1_li5": "Empty mailbox",
    "price1_li6": "Check all connections",
    "price1_pill": "Monthly Check",
    "price2_freq": "Weekly",
    "price2_li1": "Check 4 times a month",
    "price2_li2": "Ventilation of all rooms",
    "price2_li3": "Security check",
    "price2_li4": "Flushing the sanitary facilities",
    "price2_li5": "Empty mailbox",
    "price2_li6": "Check all connections",
    "price2_pill": "Weekly Check",
    "price_from": "From",
    "price_more": "More Information <span aria-hidden=\"true\">→</span>",
    "pricing_cta": "Get Started",
    "pricing_kicker": "Pricing Details",
    "pricing_subtitle": "We are a family-run company from Pelješac, committed to providing quality property maintenance\n              and safeguarding your property.",
    "pricing_title": "Our Pricing",
    "services_subtitle": "We are a family-run company from Pelješac, committed to providing quality property maintenance\n              and safeguarding your property.",
    "services_title": "Our Main Services",
    "svc1_kicker": "Object cleaning",  // Note: unchanged in code, but logically should be "Property Cleaning"
    "svc1_title": "Personalized cleaning for you or your guests",
    "svc2_kicker": "Property Management",
    "svc2_title": "We take care of your property",
    "svc3_kicker": "Holiday Rentals",
    "svc3_title": "Complete service for a smooth holiday rental experience",
    "svc4_kicker": "Garden Maintenance",
    "svc4_title": "We care for your outdoor spaces",
    "svc5_kicker": "Pool Maintenance",
    "svc5_title": "Safe, clean &amp; well-maintained pools",
    "svc6_kicker": "Administrative Assistance",
    "svc6_title": "Support with documentation &amp; paperwork",
    "svc_hero_subtitle": "From property management to cleaning, pool &amp; garden maintenance — we take care of your\n            home on Pelješac thoroughly, discreetly, and reliably.",
    "svc_hero_title": "Our Services at a Glance",
    "svc_tile1_title": "Property Management",
    "svc_tile2_title": "Deep Cleaning",
    "svc_tile3_title": "Holiday Rentals",
    "svc_tile4_title": "Garden Maintenance",
    "svc_tile5_title": "Pool Maintenance",
    "svc_tile6_title": "Administrative Assistance"
  },
  "hr": {
    "nav_home": "Početna",
    "nav_services": "Usluge",
    "nav_about": "O nama",
    "nav_contact": "Kontakt",
    "hero_title": "Sabioncello<br />\n<span class=\"accent\">Upravljanje</span> nekretninama",
    "hero_subtitle": "Profesionalni pružatelj usluga upravljanja i održavanja nekretnina na Pelješcu – uključujući Orebić, Viganj, Kučište i Lovište.",
    "hero_cta": "Započnite",
    "services_title": "Naše glavne usluge",
    "services_subtitle": "Mi smo obiteljska tvrtka s Pelješca koja jamči kvalitetno održavanje vaše nekretnine i njezinu sigurnost.",
    "svc1_kicker": "Čišćenje objekta",
    "svc1_title": "Individualno čišćenje za vas ili vaše goste",
    "svc2_kicker": "Upravljanje nekretninama",
    "svc2_title": "Brinemo o vašoj nekretnini",
    "svc3_kicker": "Najam kuća za odmor",
    "svc3_title": "Kompletna usluga za bezbrižan najam",
    "svc4_kicker": "Održavanje vrta",
    "svc4_title": "Brinemo o vašim vanjskim prostorima",
    "svc5_kicker": "Održavanje bazena",
    "svc5_title": "Sigurni, čisti i dobro održavani bazeni",
    "svc6_kicker": "Administrativna podrška",
    "svc6_title": "Podrška s dokumentacijom i papirologijom",
    "pricing_kicker": "Detalji o cijenama",
    "pricing_title": "Naše cijene",
    "pricing_subtitle": "Mi smo obiteljska tvrtka s Pelješca koja jamči kvalitetno održavanje vaše nekretnine i njezinu sigurnost.",
    "pricing_cta": "Započnite",
    "price1_pill": "Mjesečna kontrola",
    "price_from": "Od",
    "price1_freq": "Mjesečno",
    "price1_li1": "Provjera jednom mjesečno",
    "price1_li2": "Provjetravanje svih prostorija",
    "price1_li3": "Sigurnosna provjera",
    "price1_li4": "Ispiranje sanitarnih uređaja",
    "price1_li5": "Pražnjenje poštanskog sandučića",
    "price1_li6": "Provjera svih priključaka",
    "price_more": "Više informacija",
    "price2_pill": "Tjedna kontrola",
    "price2_freq": "Tjedno",
    "price2_li1": "Pregled 4 puta mjesečno",
    "price2_li2": "Provjetravanje svih prostorija",
    "price2_li3": "Sigurnosna provjera",
    "price2_li4": "Ispiranje sanitarnih uređaja",
    "price2_li5": "Pražnjenje poštanskog sandučića",
    "price2_li6": "Provjera svih priključaka",
    "about_title": "O <span class=\"accent\">Sabioncello</span>",
    "about_eyebrow": "ZAŠTO JE SABIONCELLO PRAVI PARTNER ZA VAŠU KUĆU ZA ODMOR NA PELJEŠCU",
    "about_text": "Naša misija ide daleko iznad samog čišćenja vaše nekretnine — želimo stvoriti iznimno iskustvo\n            i za vlasnike i za goste. Kao iskusni pružatelj usluga iznajmljivanja na Pelješcu, Sabioncello\n            razumije zahtjeve tržišta sezonskog najma do najsitnijeg detalja. Nismo samo ekipa za čišćenje;\n            djelujemo kao vaš pouzdan domaćin u pozadini, osiguravajući da sve uvijek funkcionira glatko i\n            profesionalno. Naš tim je obučen, diskretan i orijentiran na uslugu, sa snažnim naglaskom na\n            pouzdanost i zadovoljstvo gostiju. Višejezična komunikacija osigurava jasnu i učinkovitu\n            podršku za međunarodne goste.",
    "about_card_title": "Zašto vlasnici nekretnina na Pelješcu biraju Sabioncello:",
    "about_list1": "Lokalni kontakt na licu mjesta",
    "about_list2": "Brzi odziv na upite gostiju i hitne situacije",
    "about_list3": "Transparentne cijene bez skrivenih troškova",
    "about_list4": "Fleksibilni paketi usluga prilagođeni potrebama vaše nekretnine",
    "about_fineprint": "Uz Sabioncello, vaša kuća za odmor na Pelješcu upravlja se s pažnjom, profesionalnošću\n              i posvećenošću detaljima — tako da vi i vaši gosti možete uživati u potpunom miru.",
    "howto_title": "Kako rezervirati našu<br />\n                uslugu <span class=\"accent\">Rezervirajte termin</span>",
    "howto_cta": "Rezervirajte termin",
    "howto1_title": "Dogovorite termin online ili telefonom",
    "howto1_text": "Lako možete dogovoriti termine putem našeg kalendara ili telefonom.",
    "howto2_title": "Izrada analize potreba s ponudom",
    "howto2_text": "Tijekom termina na licu mjesta pružit ćemo vam besplatnu, neobvezujuću ponudu\n                koja uključuje analizu potreba.",
    "howto3_title": "Provedba željene usluge",
    "howto3_text": "Nakon obavljenog posla odmah ćete dobiti jasan izvještaj s fotografijama.",
    "contact_title": "Spremni za poziv",
    "contact_subtitle": "ZAŠTO JE SABIONCELLO PRAVI PARTNER ZA VAŠU KUĆU ZA ODMOR NA PELJEŠCU",
    "contact_label_name": "Ime",
    "contact_placeholder_name": "Upišite svoje ime...",
    "contact_label_email": "E-pošta",
    "contact_placeholder_email": "Upišite svoju e-poštu...",
    "contact_label_phone": "Broj telefona",
    "contact_placeholder_phone": "Upišite svoj broj",
    "contact_label_message": "Poruka",
    "contact_placeholder_message": "Upišite svoju poruku...",
    "contact_cta": "ZAKAŽITE POZIV",
    "footer_text": "Obiteljska tvrtka za upravljanje i održavanje nekretnina na Pelješcu – pouzdano, temeljito i profesionalno brinemo o vašem domu",
    "footer_directly_to": "Brze poveznice",
    "footer_nav_home": "Početna",
    "footer_nav_about": "O nama",
    "footer_nav_contact": "Kontakt",
    "footer_services_heading": "Usluge",
    "footer_service1": "Usluge čuvanja ključeva",
    "footer_service2": "Usluge čišćenja",
    "footer_service3": "Prijava i odjava gostiju",
    "footer_service4": "Čišćenje i održavanje bazena",
    "footer_service5": "Usluge pranja rublja",
    "footer_service6": "Administrativna podrška",
    "footer_contact_heading": "Imate li pitanje?",
    "footer_contact_call_title": "Nazovite nas",
    "footer_contact_email_title": "Email",
    "footer_copyright": "© Copyright Sabioncello. Sva prava pridržana",
    "svc_hero_title": "Naše usluge na prvi pogled",
    "svc_hero_subtitle": "Od upravljanja nekretninama do čišćenja, održavanja bazena i vrta — temeljito, diskretno i pouzdano brinemo o vašem domu na Pelješcu.",
    "svc_tile1_title": "Upravljanje nekretninama",
    "svc_tile2_title": "Dubinsko čišćenje",
    "svc_tile3_title": "Najam kuća za odmor",
    "svc_tile4_title": "Održavanje vrta",
    "svc_tile5_title": "Održavanje bazena",
    "svc_tile6_title": "Administrativna podrška",
    "oc_hero_heading": "Dubinsko čišćenje",
    "oc_hero_subtitle": "Pretvaramo životne prostore u besprijekorno čiste i osvježene ambijente",
    "oc_overview_heading": "Profesionalno dubinsko čišćenje",
    "oc_overview_p1": "Sabioncello pruža profesionalne usluge dubinskog čišćenja na Pelješcu, koje vaš prostor pretvaraju u uistinu besprijekorno čist i osvježen ambijent. Usluga obuhvaća sve aspekte čišćenja kuća i apartmana, uz pažljivo odabrane dodatne opcije za potpuno prilagođeno i temeljito iskustvo čišćenja.",
    "oc_overview_p2": "Naše certificirano osoblje za čišćenje donosi godine praktičnog iskustva, stručnog znanja i pažnje prema detaljima, osiguravajući visoke standarde pri dubinskom čišćenju nekretnina svih veličina — od apartmana do luksuznih vila. Dubinsko čišćenje ide daleko iznad brisanja prašine i osnovnog usisavanja. Fokusira se na detalje koji se često zanemaruju, koristeći sigurna, učinkovita i profesionalna sredstva za dugotrajnu čistoću i higijenu.",
    "oc_features_title": "Ključne značajke",
    "oc_features_li1": "10 godina iskustva",
    "oc_features_li2": "Dubinsko čišćenje iznad površinskog brisanja prašine",
    "oc_features_li3": "Certificirano osoblje za čišćenje",
    "oc_features_li4": "Vrhunska oprema i proizvodi",
    "oc_features_li5": "Prilagođene dodatne opcije",
    "oc_equipment_title": "Vrhunska oprema i proizvodi",
    "oc_equipment_p": "Dubinsko čišćenje ide daleko iznad standardnog, svakodnevnog čišćenja. Zahtijeva profesionalne alate, pažljivo odabrane proizvode i provjerene tehnike kako bi dom bio temeljito očišćen i pravilno dezinficiran. U Sabioncellu nikada ne radimo kompromis na kvaliteti. Sve naše usluge obavljamo koristeći opremu vodeću u industriji i premium proizvode za čišćenje, što osigurava dosljedne, vrhunske rezultate za svaku nekretninu koju održavamo. Kombiniranjem kvalitetnih alata s ekološki prihvatljivim sredstvima za čišćenje, radimo sustavno i učinkovito kako bismo postigli iznimnu čistoću u razumnom vremenskom okviru.",
    "oc_benefits_title": "Zašto odabrati Sabioncello",
    "oc_benefit1_title": "10+ godina iskustva",
    "oc_benefit1_p": "Donosimo godine praktičnog iskustva i stručnog znanja u svaki projekt čišćenja.",
    "oc_benefit2_title": "Ekološki prihvatljivi proizvodi",
    "oc_benefit2_p": "Naši proizvodi za čišćenje su ekološki prihvatljivi i sigurni za materijale i prirodu.",
    "oc_benefit3_title": "Certificirano osoblje",
    "oc_benefit3_p": "Naš tim čine certificirani profesionalci koji paze na svaki detalj.",
    "oc_benefit4_title": "Pouzdanost",
    "oc_benefit4_p": "Nudimo pouzdanu i točnu uslugu prilagođenu vašim potrebama, uz potpuno zadovoljstvo.",
    "oc_steps_title": "Kako rezervirati našu uslugu",
    "oc_step1_title": "Dogovorite termin",
    "oc_step1_p": "Lako dogovorite termin putem našeg kalendara za rezervacije ili telefonom.",
    "oc_step2_title": "Analiza potreba i ponuda",
    "oc_step2_p": "Tijekom termina na lokaciji izrađujemo besplatnu, neobvezujuću ponudu koja uključuje analizu potreba.",
    "oc_step3_title": "Provedba usluge",
    "oc_step3_p": "Nakon završetka radova dobivate jasan izvještaj s fotografijama.",
    "oc_steps_cta": "Rezerviraj termin",
    "pm_hero_heading": "Upravljanje nekretninama",
    "pm_hero_subtitle": "Brinemo o vašoj nekretnini tijekom cijele godine",
    "pm_overview_heading": "Brinemo o vašoj nekretnini",
    "pm_overview_p1": "Tim Sabioncello osigurava da je vaša nekretnina na Pelješcu pažljivo održavana i zaštićena kroz redovite inspekcije osmišljene za očuvanje dugoročne vrijednosti.",
    "pm_overview_p2": "Kao dio usluge upravljanja nekretninom redovito provjetravamo objekt kako bismo smanjili vlagu i spriječili razvoj plijesni. Sve vodne sustave ispiremo na tjednoj bazi kako bismo smanjili rizik od razvoja bakterije Legionella. Također provjeravamo oštećenja uzrokovana vremenskim uvjetima i moguće znakove neovlaštenog ulaska ili provale.",
    "pm_overview_p3": "Svaki posjet detaljno se dokumentira u izvještaju o inspekciji i usluzi, koji se zatim dijeli s vlasnikom nekretnine radi potpune transparentnosti i mira.",
    "pm_features_title": "Vaše prednosti",
    "pm_features_li1": "Cjelovita zaštita vaše nekretnine – oštećenja se otkrivaju i saniraju na vrijeme, prije većih troškova",
    "pm_features_li2": "Pouzdana podrška na licu mjesta – od manjih popravaka do hitnih intervencija",
    "pm_features_li3": "Transparentnost kroz foto dokumentaciju – detaljne povratne informacije nakon svake provjere",
    "pm_features_li4": "Uštedite vrijeme i brige – mi organiziramo i održavamo vašu nekretninu",
    "pm_equipment_title": "Sveobuhvatna briga",
    "pm_equipment_p": "Naša usluga upravljanja nekretninom uključuje redovito provjetravanje, ispiranje vodnih sustava te provjeru oštećenja ili neovlaštenog pristupa, čime osiguravamo da je vaša nekretnina uvijek u optimalnom stanju i sigurna.",
    "pm_benefits_title": "Zašto odabrati naše upravljanje nekretninama",
    "pm_benefit1_title": "Cjelovita zaštita",
    "pm_benefit1_p": "Redovite inspekcije rano otkrivaju štetu, sprječavaju skupe popravke i čuvaju vrijednost.",
    "pm_benefit2_title": "Pouzdana podrška",
    "pm_benefit2_p": "Koordiniramo popravke, majstore i hitne službe izravno i osobno.",
    "pm_benefit3_title": "Transparentna dokumentacija",
    "pm_benefit3_p": "Nakon svake inspekcije dobivate detaljne izvještaje s fotografijama za maksimalnu transparentnost.",
    "pm_benefit4_title": "Uštedite vrijeme i brige",
    "pm_benefit4_p": "Opustite se dok mi preuzimamo organizaciju i održavanje vaše nekretnine.",
    "pm_steps_title": "Kako započeti",
    "pm_step1_title": "Kontaktirajte nas",
    "pm_step1_p": "Javite se telefonom ili e-poštom kako bismo razgovarali o potrebama vaše nekretnine.",
    "pm_step2_title": "Analiza potreba i ponuda",
    "pm_step2_p": "Izrađujemo analizu potreba i dostavljamo neobvezujuću ponudu.",
    "pm_step3_title": "Provedba usluge",
    "pm_step3_p": "Nakon završetka rada dobivate jasan izvještaj s fotografijama.",
    "pm_steps_cta": "Kontaktirajte nas",
    "hrent_hero_heading": "Upravljanje najmom kuća za odmor",
    "hrent_hero_subtitle": "Kompletna usluga za bezbrižan najam kuće za odmor",
    "hrent_overview_heading": "Bezbrižan najam kuća za odmor",
    "hrent_overview_p1": "Sabioncello pruža profesionalne usluge najma kuća za odmor na Pelješcu koje osiguravaju da je vaša nekretnina pripremljena i vođena za goste, uz glatko i besprijekorno iskustvo.",
    "hrent_overview_p2": "Naš iskusni tim brine o čišćenju, izmjeni gostiju i održavanju nekretnine s pažnjom i stručnošću, omogućujući vam bezbrižan najam.",
    "hrent_features_title": "Ključne značajke",
    "hrent_features_li1": "10 godina iskustva",
    "hrent_features_li2": "Temeljito čišćenje između boravaka",
    "hrent_features_li3": "Upravljanje izmjenom gostiju",
    "hrent_features_li4": "Vrhunska oprema i proizvodi",
    "hrent_features_li5": "Prilagođeni paketi usluga",
    "hrent_equipment_title": "Vrhunska oprema i proizvodi",
    "hrent_equipment_p": "Dubinsko čišćenje ide daleko iznad standardnog, svakodnevnog čišćenja. Zahtijeva profesionalne alate, pažljivo odabrane proizvode i provjerene tehnike kako bi dom bio temeljito očišćen i pravilno dezinficiran. U Sabioncellu nikada ne radimo kompromis na kvaliteti. Sve naše usluge obavljamo koristeći opremu vodeću u industriji i premium proizvode za čišćenje, što osigurava dosljedne, vrhunske rezultate za svaku nekretninu koju održavamo. Kombiniranjem kvalitetnih alata s ekološki prihvatljivim sredstvima za čišćenje, radimo sustavno i učinkovito kako bismo postigli iznimnu čistoću u razumnom vremenskom okviru.",
    "hrent_benefits_title": "Zašto odabrati Sabioncello",
    "hrent_benefit1_title": "Iskustvo i pouzdanost",
    "hrent_benefit1_p": "Donosimo godine iskustva i visoke standarde u upravljanju najmom.",
    "hrent_benefit2_title": "Zadovoljstvo gostiju",
    "hrent_benefit2_p": "Brinemo da gosti imaju ugodan boravak i ostavljaju pozitivne recenzije.",
    "hrent_benefit3_title": "Certificirano osoblje",
    "hrent_benefit3_p": "Naš tim čine certificirani profesionalci koji paze na svaki detalj.",
    "hrent_benefit4_title": "Bez stresa",
    "hrent_benefit4_p": "Mi vodimo operativu, vi uživate u miru i sigurnosti da je sve pod kontrolom.",
    "hrent_steps_title": "Kako započeti",
    "hrent_step1_title": "Dogovorite termin",
    "hrent_step1_p": "Lako dogovorite termin putem našeg kalendara za rezervacije ili telefonom.",
    "hrent_step2_title": "Analiza potreba i ponuda",
    "hrent_step2_p": "Tijekom termina na lokaciji izrađujemo besplatnu, neobvezujuću ponudu koja uključuje analizu potreba.",
    "hrent_step3_title": "Provedba usluge",
    "hrent_step3_p": "Nakon završetka usluge dobivate jasan izvještaj s fotografijama.",
    "hrent_steps_cta": "Rezerviraj termin",
    "garden_hero_heading": "Održavanje vrta",
    "garden_hero_subtitle": "Brinemo o vašim vanjskim prostorima",
    "garden_overview_heading": "Održavanje vanjskih prostora i vrta",
    "garden_overview_p1": "Sabioncello pruža pouzdane usluge održavanja vanjskih prostora i vrta na Pelješcu kako bi okruženje vaše nekretnine bilo uredno, zdravo i vizualno privlačno tijekom cijele godine.",
    "garden_overview_p2": "Naša usluga uključuje redovitu košnju travnjaka, podrezivanje živice i biljaka, uklanjanje suhog lišća i otpada te opće održavanje vanjskih površina. Pratimo zdravlje biljaka, osiguravamo pravilno zalijevanje i održavamo staze, terase i pristupne površine čistima i sigurnima.",
    "garden_overview_p3": "Sezonsko održavanje i provjere vezane uz vremenske uvjete važan su dio našeg pristupa, pomažući u sprječavanju štete i osiguravajući da vanjski prostori uvijek ostanu ugodni i dobro održavani.",
    "garden_overview_p4": "Sustavnom njegom i pažnjom prema detaljima, Sabioncello pomaže očuvati vrijednost i izgled vaše nekretnine na Pelješcu, kako bi vanjski prostori uvijek odražavali isti visoki standard kao i unutrašnjost.",
    "garden_features_title": "Ključne značajke",
    "garden_features_li1": "Redovita košnja travnjaka",
    "garden_features_li2": "Podrezivanje živice i biljaka",
    "garden_features_li3": "Uklanjanje otpada i lišća",
    "garden_features_li4": "Sezonsko održavanje",
    "garden_features_li5": "Praćenje zdravlja biljaka i zalijevanje",
    "garden_equipment_title": "Sveobuhvatna njega",
    "garden_equipment_p": "Održavanje vrta obavljamo profesionalnim alatima i ekološki prihvatljivim praksama kako bi vaši vanjski prostori bili uredni i zdravi.",
    "garden_benefits_title": "Zašto odabrati Sabioncello",
    "garden_benefit1_title": "Stručnost i briga",
    "garden_benefit1_p": "Naš tim donosi hortikulturno znanje i veliku pažnju prema detaljima.",
    "garden_benefit2_title": "Održavanje tijekom cijele godine",
    "garden_benefit2_p": "Brinemo o vašem vrtu kroz sva godišnja doba i sprječavamo štete.",
    "garden_benefit3_title": "Uredan izgled",
    "garden_benefit3_p": "Održavamo vrt i okoliš urednima kako bi vaša nekretnina uvijek izgledala najbolje.",
    "garden_benefit4_title": "Pouzdana usluga",
    "garden_benefit4_p": "Možete računati na dosljednu i pouzdanu njegu, prilagođenu vašim potrebama.",
    "garden_steps_title": "Kako započeti",
    "garden_step1_title": "Kontaktirajte nas",
    "garden_step1_p": "Javite nam se kako bismo dogovorili plan održavanja prema vašem vrtu i željama.",
    "garden_step2_title": "Plan održavanja i ponuda",
    "garden_step2_p": "Izrađujemo plan održavanja i dostavljamo neobvezujuću ponudu.",
    "garden_step3_title": "Provedba usluge",
    "garden_step3_p": "Redovito održavamo vrt i po potrebi dostavljamo izvještaje i fotografije.",
    "garden_steps_cta": "Kontaktirajte nas",
    "pool_hero_heading": "Održavanje bazena",
    "pool_hero_subtitle": "Sigurni, čisti i dobro održavani bazeni",
    "pool_overview_heading": "Profesionalno održavanje bazena",
    "pool_overview_p1": "Sabioncello nudi pouzdane usluge održavanja bazena na Pelješcu kako bi vaš bazen uvijek bio čist, siguran i spreman za korištenje.",
    "pool_overview_p2": "Usluga uključuje redovite provjere kvalitete vode, balansiranje kemikalija, pregled filtracijskog sustava te temeljito čišćenje površina bazena i okolnih područja.",
    "pool_overview_p3": "Uklanjamo nečistoće, pratimo rad opreme i rješavamo manje probleme prije nego što prerastu u skupe popravke.",
    "pool_overview_p4": "Sezonsko otvaranje i zatvaranje bazena, kao i provjere vezane uz vremenske uvjete, također su dio našeg pristupa održavanju — pomažu produljiti vijek trajanja bazena i održati optimalne higijenske standarde.",
    "pool_overview_p5": "Uz profesionalnu brigu i dosljedan nadzor, Sabioncello osigurava da vaš bazen na Pelješcu zadovoljava najviše standarde čistoće, sigurnosti i udobnosti za vas i vaše goste.",
    "pool_features_title": "Ključne značajke",
    "pool_features_li1": "Provjere kvalitete vode",
    "pool_features_li2": "Balansiranje kemikalija",
    "pool_features_li3": "Pregled filtracije i opreme",
    "pool_features_li4": "Temeljito čišćenje bazena i okoline",
    "pool_features_li5": "Sezonsko otvaranje i zatvaranje",
    "pool_equipment_title": "Profesionalni alati i proizvodi",
    "pool_equipment_p": "Koristimo profesionalnu opremu i sigurne kemikalije za održavanje bistrine i higijene vode, tako da je vaš bazen uvijek siguran za korištenje.",
    "pool_benefits_title": "Zašto odabrati Sabioncello",
    "pool_benefit1_title": "Čista i sigurna voda",
    "pool_benefit1_p": "Naše rigorozne provjere održavaju kristalno čistu vodu i higijenske uvjete.",
    "pool_benefit2_title": "Stručno održavanje",
    "pool_benefit2_p": "Iskusni tehničari prate opremu i balansiraju kemikalije.",
    "pool_benefit3_title": "Prevencija problema",
    "pool_benefit3_p": "Rano uočavamo manje kvarove kako bismo spriječili veće i skuplje popravke.",
    "pool_benefit4_title": "Sezonska briga",
    "pool_benefit4_p": "Brinemo o otvaranju, zatvaranju i pripremi bazena prema sezoni i vremenskim uvjetima.",
    "pool_steps_title": "Kako započeti",
    "pool_step1_title": "Kontaktirajte nas",
    "pool_step1_p": "Javite nam se kako bismo dogovorili plan održavanja bazena prema vašim potrebama.",
    "pool_step2_title": "Procjena i ponuda",
    "pool_step2_p": "Izrađujemo procjenu i dostavljamo neobvezujuću ponudu.",
    "pool_step3_title": "Provedba usluge",
    "pool_step3_p": "Održavamo bazen i po potrebi dostavljamo izvještaje o stanju vode i opreme.",
    "pool_steps_cta": "Kontaktirajte nas",
    "admin_hero_heading": "Administrativna podrška",
    "admin_hero_subtitle": "Podrška s dokumentacijom i papirologijom",
    "admin_overview_heading": "Podrška s dokumentacijom i papirologijom",
    "admin_overview_p1": "Sabioncello pruža pouzdanu administrativnu podršku vezanu uz vašu nekretninu, pomažući vam uštedjeti vrijeme i izbjeći nepotreban stres.",
    "admin_overview_p2": "Pomažemo vlasnicima nekretnina u komunikaciji s lokalnim vlastima, pripremi i prikupljanju potrebne dokumentacije, koordinaciji tehničkih pregleda te organizaciji usluga s provjerenim trećim partnerima.",
    "admin_overview_p3": "Naš je cilj pojednostaviti administrativne postupke i osigurati da se sva dokumentacija obradi ispravno i na vrijeme.",
    "admin_overview_p4": "Uz snažno lokalno znanje i podršku na terenu, Sabioncello djeluje kao pouzdan partner za administrativnu podršku na Pelješcu, pružajući vam potpuni mir.",
    "admin_features_title": "Ključne značajke",
    "admin_features_li1": "Komunikacija s lokalnim vlastima",
    "admin_features_li2": "Priprema i prikupljanje dokumentacije",
    "admin_features_li3": "Koordinacija tehničkih pregleda",
    "admin_features_li4": "Organizacija usluga s provjerenim partnerima",
    "admin_features_li5": "Pravovremena i točna obrada papirologije",
    "admin_equipment_title": "Pouzdana administracija",
    "admin_equipment_p": "Naša administrativna podrška osigurava da su sva dokumentacija i komunikacije vezane uz vašu nekretninu vođene točno i učinkovito, kako biste se mogli usredotočiti na ono što je najvažnije.",
    "admin_benefits_title": "Zašto odabrati Sabioncello",
    "admin_benefit1_title": "Lokalna stručnost",
    "admin_benefit1_p": "Naše znanje lokalnih propisa osigurava glatke i brze postupke.",
    "admin_benefit2_title": "Ušteda vremena",
    "admin_benefit2_p": "Mi preuzimamo papirologiju i koordinaciju, štedeći vam vrijeme.",
    "admin_benefit3_title": "Točnost i usklađenost",
    "admin_benefit3_p": "Osiguravamo da je dokumentacija ispravna i usklađena s relevantnim zahtjevima.",
    "admin_benefit4_title": "Pouzdani partneri",
    "admin_benefit4_p": "Suradnja s provjerenim trećim stranama za brzu i kvalitetnu realizaciju usluga.",
    "admin_steps_title": "Kako započeti",
    "admin_step1_title": "Kontaktirajte nas",
    "admin_step1_p": "Javite se kako bismo razumjeli vaše potrebe i korake koje treba poduzeti.",
    "admin_step2_title": "Prikupljanje informacija",
    "admin_step2_p": "Prikupljamo potrebne informacije i dokumente te definiramo plan.",
    "admin_step3_title": "Provedba i praćenje",
    "admin_step3_p": "Vodimo postupke, koordiniramo institucije i redovito vas informiramo o statusu.",
    "admin_steps_cta": "Kontaktirajte nas"
  }
};
// ... (below parts of the script remain unchanged)


  const htmlTag = document.documentElement;

  function applyTranslations(lang) {
    const dict = translations[lang] || {};

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const text = dict[key];
      if (typeof text === "string") el.innerHTML = text;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const key = el.getAttribute("data-i18n-placeholder");
      const text = dict[key];
      if (typeof text === "string") el.setAttribute("placeholder", text);
    });

    if (htmlTag) htmlTag.setAttribute("lang", lang);
  }

  function setLanguage(lang) {
    const normalized = (lang || "en").toLowerCase();
    const safeLang = translations[normalized] ? normalized : "en";

    try {
      localStorage.setItem("language", safeLang);
    } catch (e) { /* ignore */ }

    // Update the little code in the dropdown summary (EN/HR)
    const codeEl = document.querySelector(".lang__code");
    if (codeEl) codeEl.textContent = safeLang.toUpperCase();

    applyTranslations(safeLang);
  }

  // Expose globally so the nav handler can call it
  window.setLanguage = setLanguage;

  document.addEventListener("DOMContentLoaded", () => {
    let lang = "en";
    try {
      lang = localStorage.getItem("language") || lang;
    } catch (e) { /* ignore */ }
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

  disableXScroll();
  document.addEventListener("DOMContentLoaded", disableXScroll);
  window.addEventListener("resize", disableXScroll);
})();

// ============================================================
// Contact form: client-side validation + POST to /api/contact
// ============================================================
(() => {
  const form = document.querySelector(".contact__form");
  if (!form) return;

  const nameEl  = form.querySelector("#c-name");
  const emailEl = form.querySelector("#c-email");
  const phoneEl = form.querySelector("#c-phone");
  const msgEl   = form.querySelector("#c-msg");
  const submitBtn = form.querySelector('button[type="submit"]');

  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());
  const clean   = (s) => String(s ?? "").trim();

  function validateClient() {
    const name    = clean(nameEl?.value);
    const email   = clean(emailEl?.value);
    const phone   = clean(phoneEl?.value);
    const message = clean(msgEl?.value);

    const errors = [];
    if (name.length < 2) errors.push("Please enter your name.");
    if (!isEmail(email)) errors.push("Please enter a valid email.");
    if (phone.length < 6) errors.push("Please enter a valid phone number.");
    if (message.length < 5) errors.push("Please enter a message.");

    return { ok: errors.length === 0, errors, data: { name, email, phone, message } };
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { ok, errors, data } = validateClient();
    if (!ok) {
      alert(errors.join("\n"));
      return;
    }

    const honeypotEl = form.querySelector('input[name="website"]');
    const website    = honeypotEl ? clean(honeypotEl.value) : "";

    try {
      // disable button during submission
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
      }

      const res = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website })
      });

      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) {
        throw new Error(out?.error || "Request failed.");
      }
      const statusDiv = document.querySelector("#form-status");
      statusDiv.textContent = "Your message has been sent successfully.";
      statusDiv.style.color = "grey";
statusDiv.style.fontStyle = "italic";
statusDiv.style.fontSize = "0.8rem";
      form.reset();
    } catch (err) {
      console.error(err);
      const resJson = await response.json();
      statusDiv.textContent = resJson.error || "";
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "";
      }
    }
  });
})();

(() => {
  const form = document.querySelector(".contact__form");
  if (!form) return;

  // Field references
  const nameEl = form.querySelector("#c-name"),
        emailEl = form.querySelector("#c-email"),
        phoneEl = form.querySelector("#c-phone"),
        msgEl   = form.querySelector("#c-msg"),
        honeypotEl = form.querySelector('input[name="website"]'),
        submitBtn  = form.querySelector('button[type="submit"]');

  // Helper functions for validation
  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());
  const clean   = (s) => String(s ?? "").trim();

  // Real-time: clear field error on user input
  [nameEl, emailEl, phoneEl, msgEl].forEach(field => {
    field.addEventListener("input", () => {
      const errDiv = document.getElementById(field.id + "-error");
      if (errDiv) errDiv.textContent = "";  // remove error as user fixes input
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Clear any previous error messages
    document.getElementById("c-name-error").textContent = "";
    document.getElementById("c-email-error").textContent = "";
    document.getElementById("c-phone-error").textContent = "";
    document.getElementById("c-msg-error").textContent   = "";
    const statusEl = document.getElementById("form-status");
    if (statusEl) {
      statusEl.textContent = "";
      statusEl.classList.remove("success", "error");
    }

    // Collect values and validate each field
    const name    = clean(nameEl.value),
          email   = clean(emailEl.value),
          phone   = clean(phoneEl.value),
          message = clean(msgEl.value);
    let valid = true;
    if (name.length < 2) {
      document.getElementById("c-name-error").textContent = "Please enter your name.";
      valid = false;
    } else if (name.length > 100) {
      document.getElementById("c-name-error").textContent = "Name must be at most 100 characters.";
      valid = false;
    }
    if (!isEmail(email)) {
      document.getElementById("c-email-error").textContent = 
        email.length ? "Please enter a valid email." : "Please enter your email.";
      valid = false;
    } else if (email.length > 200) {
      document.getElementById("c-email-error").textContent = "Email must be at most 200 characters.";
      valid = false;
    }
    if (phone.length < 6) {
      document.getElementById("c-phone-error").textContent = "Please enter a valid phone number.";
      valid = false;
    } else if (phone.length > 30) {
      document.getElementById("c-phone-error").textContent = "Phone number is too long.";
      valid = false;
    }
    if (message.length < 5) {
      document.getElementById("c-msg-error").textContent = "Please enter a message.";
      valid = false;
    } else if (message.length > 4000) {
      document.getElementById("c-msg-error").textContent = "Message is too long.";
      valid = false;
    }

    if (!valid) {
      // One or more fields invalid – abort submission
      return;
    }

    // Prepare payload (including honeypot)
    const payload = { name, email, phone, message, website: clean(honeypotEl.value || "") };

    try {
      // Disable button and show loading state during submission
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) {
        // If server responded with an error or `ok:false`
        throw new Error(out.error || "Request failed.");
      }
      // Success – show confirmation and reset form
      if (statusEl) {
        statusEl.textContent = "Thanks! We received your message.";
        statusEl.classList.add("success");
      }
      form.reset();
    } catch (err) {
      console.error("Submission failed:", err);
      if (statusEl) {
        statusEl.textContent = "";
        statusEl.classList.add("error");
      }
    } finally {
      // Re-enable the submit button
      submitBtn.disabled = false;
      submitBtn.style.opacity = "";
    }
  });
})();
