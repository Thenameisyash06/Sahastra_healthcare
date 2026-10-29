/**
 * SAHASTRA OCUDENT HEALTHCARE
 * Application Logic & Interactivity
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global references
  const clinic = window.CLINIC_CONFIG;
  if (!clinic) {
    console.error("Clinic configuration not loaded.");
    return;
  }

  // State
  let currentDepartment = "eye-care"; // 'eye-care' | 'dental-care'
  let isNavigating = false;

  // DOM Elements
  const htmlRoot = document.documentElement;
  const siteHeader = document.getElementById("site-header");
  const deptButtons = document.querySelectorAll(".dept-btn");
  
  // Hero Elements
  const heroBadge = document.getElementById("hero-badge");
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const heroCtaPrimary = document.getElementById("hero-cta-primary");
  const heroCtaSecondary = document.getElementById("hero-cta-secondary");
  const heroStatsRow = document.getElementById("hero-stats-row");
  const heroArtContainer = document.getElementById("hero-art-container");
  const heroMagnetBg = document.getElementById("hero-magnet-bg");
  
  // MagnetLines Vector Field Background (React Bits)
  let magnetInstance = null;
  if (heroMagnetBg && typeof window.initMagnetLines === "function") {
    const isDental = currentDepartment === "dental-care";
    magnetInstance = window.initMagnetLines(heroMagnetBg, {
      spacing: 36,
      lineWidth: 2.2,
      lineHeight: 20,
      lineColor: isDental ? "#5eead4" : "#7dd3fc",
      accentColor: isDental ? "#0d9488" : "#0284c7",
      mode: "orbit",
      shape: "line",
      radius: 260,
      fade: 0.65,
      edgeFade: 0.2,
      stretch: 0.5,
      inertia: 0.35,
      bounce: 0.3,
      ripple: 0.35,
      clickPulse: true,
      intro: true,
      idle: true
    });
  }

  // Services Elements
  const servicesTitle = document.getElementById("services-section-title");
  const servicesSubtitle = document.getElementById("services-section-subtitle");
  const servicesGrid = document.getElementById("services-grid");

  // Why Choose Us Elements
  const whyDeptTitle = document.getElementById("why-dept-title");
  const whyDeptGrid = document.getElementById("why-dept-grid");
  const patientExperienceStackContainer = document.getElementById("patient-experience-stack");
  let scrollStackInstance = null;
  let dotGridInstance = null;

  // Form Elements
  const appointmentForm = document.getElementById("appointment-form");
  const formDeptRadios = document.querySelectorAll('input[name="form-dept"]');
  const patientNameInput = document.getElementById("patient-name");
  const contactNumberInput = document.getElementById("contact-number");
  const appointmentDateInput = document.getElementById("appointment-date");
  const preferredTimeInput = document.getElementById("preferred-time");
  const appointmentMessageInput = document.getElementById("appointment-message");
  const emailSubmitBtn = document.getElementById("email-submit-btn");
  const whatsappSubmitBtn = document.getElementById("whatsapp-submit-btn");
  const formStatusAlert = document.getElementById("form-status-alert");

  // Floating & Contact Elements
  const floatingWhatsappLink = document.getElementById("floating-whatsapp-link");
  const directCallLink = document.getElementById("direct-call-link");
  const directWhatsappLink = document.getElementById("direct-whatsapp-link");
  const directEmailLink = document.getElementById("direct-email-link");

  // Mobile Drawer Elements
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileDrawerOverlay = document.getElementById("mobile-drawer-overlay");
  const mobileDrawerClose = document.getElementById("mobile-drawer-close");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Modal Elements
  const serviceModalBackdrop = document.getElementById("service-modal-backdrop");
  const serviceModalClose = document.getElementById("service-modal-close");
  const serviceModalTag = document.getElementById("service-modal-tag");
  const serviceModalTitle = document.getElementById("service-modal-title");
  const serviceModalBody = document.getElementById("service-modal-body");
  const serviceModalPoints = document.getElementById("service-modal-points");
  const serviceModalBookBtn = document.getElementById("service-modal-book-btn");

  const policyModalBackdrop = document.getElementById("policy-modal-backdrop");
  const policyModalClose = document.getElementById("policy-modal-close");
  const policyModalTitle = document.getElementById("policy-modal-title");
  const policyModalBody = document.getElementById("policy-modal-body");
  const openPrivacyLinks = document.querySelectorAll(".open-privacy-policy");
  const openTermsLinks = document.querySelectorAll(".open-terms-modal");

  // SVG Icons Helper
  function getIconSvg(name) {
    const icons = {
      eye: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
      lens: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 14.83 4.24 4.24"/></svg>`,
      activity: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
      layers: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      "shield-plus": `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>`,
      glasses: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2"/><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/></svg>`,
      sparkles: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
      smile: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>`,
      "shield-check": `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`,
      award: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
      heart: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
      baby: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>`,
      arrowRight: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
      checkCircle: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`,
      clock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      whatsapp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.776-.876-2.052-.976-.275-.101-.476-.15-.677.15-.2.301-.776.976-.952 1.177-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.175.2-.301.3-.502.101-.201.05-.376-.025-.526-.075-.151-.677-1.632-.928-2.235-.244-.588-.492-.508-.677-.518l-.578-.01c-.201 0-.527.076-.803.376-.276.302-1.054 1.03-1.054 2.512 0 1.482 1.08 2.912 1.23 3.113.151.201 2.126 3.246 5.15 4.553.72.311 1.282.497 1.72.637.724.23 1.382.197 1.903.12.58-.087 1.776-.726 2.026-1.428.251-.703.251-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.54 2 2.08 6.46 2.08 11.96c0 1.98.58 3.82 1.58 5.37L2 22l4.82-1.61c1.48.91 3.22 1.44 5.22 1.44 5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm0 18.23c-1.75 0-3.37-.53-4.73-1.44l-.34-.23-2.86.95.96-2.78-.23-.37a8.17 8.17 0 0 1-1.25-4.4c0-4.52 3.68-8.2 8.2-8.2s8.2 3.68 8.2 8.2-3.68 8.27-8.2 8.27z"/></svg>`,
      tooth: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 6 5 6 9c0 3 1 7 2 11 0 1.5 1 2 2 2s2-1 2-3c0-2 .5-3 1-3s1 1 1 3c0 2 1 3 2 3s2-.5 2-2c1-4 2-8 2-11 0-4-2-7-7-7z"/><path d="M9 7c1 1 5 1 6 0"/></svg>`
    };
    return icons[name] || icons.shield;
  }

  // Hero Images (High-Resolution Medical Photography for Eye & Dental)
  function getHeroImageHtml(department) {
    const isDental = department === "dental-care";
    const src = isDental
      ? "assets/images/hero-dental-care.jpg"
      : "assets/images/hero-eye-care.jpg";
    const alt = isDental
      ? "Sahastra Ocudent Healthcare - Modern Dental Operatory Suite"
      : "Sahastra Ocudent Healthcare - Advanced Ophthalmology Diagnostic Suite";

    return `
      <img src="${src}" alt="${alt}" class="hero-clinic-photo content-fade-transition" loading="eager" decoding="async">
      <div class="hero-image-overlay" aria-hidden="true"></div>
    `;
  }

  // Set today's date as min for date input (prevent past dates)
  function initDateConstraints() {
    if (appointmentDateInput) {
      const today = new Date().toISOString().split("T")[0];
      appointmentDateInput.min = today;
    }
  }

  // Subpage detection to preserve page-specific titles & URLs
  const isSubpage = /about|services|why-choose-us|contact/i.test(window.location.pathname) ||
                    document.body.classList.contains("page-about") ||
                    document.body.classList.contains("page-services") ||
                    document.body.classList.contains("page-why-choose-us") ||
                    document.body.classList.contains("page-contact");

  // Update Page Metadata & Title (only on home/index page)
  function updateMetadata(deptData) {
    if (isSubpage) return;
    document.title = deptData.meta.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = deptData.meta.description;
  }

  // Render Services Cards for current department
  function renderServices(services) {
    if (!servicesGrid) return;
    servicesGrid.innerHTML = "";

    services.forEach((service, index) => {
      const card = document.createElement("div");
      card.className = "service-card content-fade-transition";
      card.style.animationDelay = `${index * 0.06}s`;

      card.innerHTML = `
        <div class="service-card-top">
          <div class="service-icon-wrap">
            ${getIconSvg(service.icon)}
          </div>
          <span class="service-tag">${service.tag}</span>
          <h3 class="service-title">${service.name}</h3>
          <p class="service-desc">${service.shortDescription}</p>
        </div>
        <div class="service-card-bottom">
          <button type="button" class="service-action-btn view-service-detail-btn" data-id="${service.id}" aria-label="Learn more about ${service.name}">
            <span>Learn More</span>
            ${getIconSvg("arrowRight")}
          </button>
        </div>
      `;

      servicesGrid.appendChild(card);
    });

    // Attach click listeners to "Learn More" buttons
    document.querySelectorAll(".view-service-detail-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        openServiceModal(id);
      });
    });
  }

  // Render Department Highlights (Why Choose Us)
  function renderDeptHighlights(highlights, deptName) {
    if (!whyDeptGrid) return;
    if (whyDeptTitle) {
      whyDeptTitle.textContent = `Why Choose Our ${deptName} Department`;
    }
    whyDeptGrid.innerHTML = "";

    highlights.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "why-card content-fade-transition";
      card.style.animationDelay = `${index * 0.05}s`;

      card.innerHTML = `
        <div class="why-icon-box">
          ${getIconSvg("checkCircle")}
        </div>
        <h4 class="why-title">${item.title}</h4>
        <p class="why-desc">${item.description}</p>
      `;

      whyDeptGrid.appendChild(card);
    });
  }

  // Helper to build Patient Experience cards for ScrollStack (React Bits)
  function getPatientExperienceCards(deptId) {
    const isDental = deptId === "dental-care";
    const accentColor = isDental ? "#0d9488" : "#0284c7";
    const iconBg = isDental ? "rgba(13, 148, 136, 0.1)" : "rgba(2, 132, 199, 0.1)";

    return [
      {
        id: "card-dual-care",
        badge: "Integrated Care Model",
        title: "Dual-Care Under One Roof",
        description: "Seamlessly coordinate ophthalmology and advanced dental appointments in a single synchronized visit, saving time and simplifying healthcare for your whole family.",
        iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
        iconBg,
        iconColor: accentColor,
        highlights: [
          "Simultaneous eye & dental booking slots",
          "Unified records & synchronized scheduling",
          "Ideal for all-family checkups"
        ],
        footerTag: "Integrated Convenience"
      },
      {
        id: "card-ethical-guidance",
        badge: "Clinical Ethics",
        title: "Ethical, Patient-First Guidance",
        description: "We adhere strictly to clear, honest communication with transparent clinical diagnostics. You will receive honest recommendations without fabricated outcomes or unnecessary procedures.",
        iconSvg: getIconSvg("shield-check"),
        iconBg,
        iconColor: accentColor,
        highlights: [
          "In-depth treatment plan consultations",
          "Transparent pricing & no hidden charges",
          "Conservative treatment pathways prioritized"
        ],
        footerTag: "Integrity & Honest Care"
      },
      {
        id: "card-sterilization",
        badge: "Safety & Hygiene",
        title: "Hospital-Grade Sterilization Protocols",
        description: "Patient safety is our uncompromising standard. Every operatory and instrument undergoes multi-tiered autoclave sterilization, strict infection control, and continuous disinfection.",
        iconSvg: getIconSvg("shield-plus"),
        iconBg,
        iconColor: accentColor,
        highlights: [
          "Class-B vacuum autoclave cycle verification",
          "Individually pouched & barcoded surgical kits",
          "Purified clinical air & waterline disinfection"
        ],
        footerTag: "Infection Prevention"
      },
      {
        id: "card-online-booking",
        badge: "Swift Access",
        title: "60-Second Online & WhatsApp Booking",
        description: "Request consultations effortlessly from any device with our intelligent request form, followed by instantaneous WhatsApp pre-filled connection and prompt front-desk confirmation.",
        iconSvg: getIconSvg("whatsapp"),
        iconBg,
        iconColor: accentColor,
        highlights: [
          "Instant pre-filled WhatsApp routing",
          "Direct front-desk confirmation & reminder calls",
          "Flexible morning and evening consultation slots"
        ],
        footerTag: "Rapid Response"
      },
      isDental ? {
        id: "card-dental-specialty",
        badge: "Advanced Dentistry",
        title: "Gentle Restorative & Cosmetic Excellence",
        description: "Modern rotary endodontics, digital intraoral imaging, aesthetic smile designs, and compassionate pediatric techniques ensuring a stress-free, pain-free dental visit.",
        iconSvg: getIconSvg("tooth"),
        iconBg,
        iconColor: accentColor,
        highlights: [
          "Painless single-sitting rotary root canal therapies",
          "Aesthetic orthodontic aligners & ceramic restorations",
          "Child-friendly pediatric dental care with gentle chairside touch"
        ],
        footerTag: "Dental Specialty Focus"
      } : {
        id: "card-eye-specialty",
        badge: "Ophthalmology Precision",
        title: "Micro-Surgical Precision & Advanced Diagnostics",
        description: "Equipped with modern anterior segment slit lamps, digital biometry, and microsurgical instrumentation for advanced cataract surgeries (Phaco & SICS) and glaucoma care.",
        iconSvg: getIconSvg("eye"),
        iconBg,
        iconColor: accentColor,
        highlights: [
          "Micro-incision sutureless cataract procedures",
          "Advanced intraocular lens (IOL) customization",
          "Early glaucoma & digital retinal diagnostics"
        ],
        footerTag: "Ophthalmic Specialty Focus"
      }
    ];
  }

  // Initialize ScrollStack component
  function initScrollStack() {
    if (!patientExperienceStackContainer || typeof window.mountScrollStack !== "function") return;

    scrollStackInstance = window.mountScrollStack(patientExperienceStackContainer, {
      items: getPatientExperienceCards(currentDepartment),
      itemDistance: 130,
      itemStackDistance: 24,
      stackPosition: '105px',
      itemScale: 0.04,
      baseScale: 0.84,
      dimAmount: 0.12,
      blurAmount: 0,
      tiltAmount: 2.5,
      rotationAmount: 1.8,
      holdDistance: 180,
      smoothScroll: false,
      snap: false,
      useWindowScroll: true,
      onActionClick: (item, index, e) => {
        const appointmentSec = document.getElementById("appointment");
        if (appointmentSec) {
          appointmentSec.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  }

  // Initialize DotGrid component (React Bits) for Page Hero Background
  function initHeroDotGrid() {
    const heroSection = document.querySelector('.page-hero');
    if (!heroSection || typeof window.initDotGrid !== 'function') return;

    const isDental = currentDepartment === 'dental-care';
    dotGridInstance = window.initDotGrid(heroSection, {
      dotSize: 4,
      gap: 18,
      baseColor: '#64748b',
      activeColor: isDental ? '#0d9488' : '#0284c7',
      proximity: 140,
      strength: 1,
      bounce: 0.6,
      tension: 0.4,
      returnDuration: 0.8,
      shockRadius: 320,
      shockStrength: 5,
      swell: 0.8,
      stretch: 0.5,
      glow: 0.55,
      shape: 'circle',
      fade: 0,
      opacity: 0.5,
      intro: true,
      mouseInteraction: true,
      clickShock: true
    });
  }

  // Switch Department Function
  function setDepartment(deptId, updateUrl = true) {
    if (deptId !== "eye-care" && deptId !== "dental-care") {
      deptId = "eye-care";
    }

    currentDepartment = deptId;
    const isEye = deptId === "eye-care";
    const deptKey = isEye ? "eyeCare" : "dentalCare";
    const deptData = clinic.departments[deptKey];

    // Progressive enhancement: startViewTransition if available and not prefers-reduced-motion
    const performDomUpdates = () => {
      // 1. Root attribute for theme styling
      htmlRoot.setAttribute("data-department", deptId);

      // 2. Active state for header toggles
      deptButtons.forEach(btn => {
        const targetDept = btn.getAttribute("data-dept");
        const isActive = targetDept === deptId;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      // 3. Update Hero Section
      if (heroBadge) heroBadge.textContent = deptData.badge;
      if (heroTitle) {
        heroTitle.innerHTML = isEye 
          ? `Comprehensive <span class="dept-highlight">Eye Care</span> for a Clearer Tomorrow`
          : `Complete <span class="dept-highlight">Dental Care</span> for Healthier, Confident Smiles`;
      }
      if (heroSubtitle) heroSubtitle.textContent = deptData.subheadline;
      if (heroCtaPrimary) heroCtaPrimary.textContent = deptData.ctaPrimary;
      if (heroCtaSecondary) heroCtaSecondary.textContent = deptData.ctaSecondary;

      // Hero stats
      if (heroStatsRow) {
        heroStatsRow.innerHTML = deptData.heroPills.map(pill => `
          <div class="hero-stat-item">
            <span class="stat-label">${pill.label}</span>
            <span class="stat-value">${pill.value}</span>
          </div>
        `).join("");
      }

      // Hero Clinic Photo
      if (heroArtContainer) {
        heroArtContainer.innerHTML = getHeroImageHtml(deptId);
      }

      // 4. Update Services Section
      if (servicesTitle) {
        servicesTitle.textContent = `${deptData.name} Services`;
      }
      if (servicesSubtitle) {
        servicesSubtitle.textContent = isEye
          ? "Specialized ophthalmic treatments and diagnostic evaluations delivered with medical rigor."
          : "Full spectrum of gentle preventive, restorative, cosmetic, and pediatric oral healthcare.";
      }
      renderServices(deptData.services);

      // 5. Update Department Highlights
      renderDeptHighlights(deptData.whyChooseUs, deptData.navLabel);
      if (scrollStackInstance) {
        scrollStackInstance.update({
          items: getPatientExperienceCards(deptId)
        });
      }

      // 6. Synchronize Appointment Form Department Radio & Placeholder
      formDeptRadios.forEach(radio => {
        const isChecked = radio.value === deptId;
        radio.checked = isChecked;
        const parentLabel = radio.closest(".dept-radio-label");
        if (parentLabel) {
          parentLabel.classList.toggle("checked", isChecked);
        }
      });

      if (appointmentMessageInput) {
        appointmentMessageInput.placeholder = isEye
          ? "Briefly describe your eye concern (e.g. cataract evaluation, blurred vision, eye strain)"
          : "Briefly describe your dental concern (e.g. toothache, root canal consultation, aligner checkup)";
      }

      // 7. Update Metadata
      updateMetadata(deptData);

      // 8. Update MagnetLines Vector Field Theme
      if (magnetInstance) {
        if (deptId === "dental-care") {
          magnetInstance.updateOptions({
            lineColor: "#5eead4",
            accentColor: "#0d9488"
          });
        } else {
          magnetInstance.updateOptions({
            lineColor: "#7dd3fc",
            accentColor: "#0284c7"
          });
        }
      }

      // 9. Update DotGrid Theme on Department Toggle
      if (dotGridInstance) {
        if (deptId === "dental-care") {
          dotGridInstance.setOptions({
            activeColor: "#0d9488",
            baseColor: "#64748b",
            opacity: 0.5
          });
        } else {
          dotGridInstance.setOptions({
            activeColor: "#0284c7",
            baseColor: "#64748b",
            opacity: 0.5
          });
        }
      }
    };

    // Use View Transitions if supported, or direct update
    if (document.startViewTransition && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.startViewTransition(() => {
        performDomUpdates();
      });
    } else {
      performDomUpdates();
    }

    // Ensure newly visible department cards animate in properly
    setTimeout(() => {
      const activeSelector = deptId === "eye-care" ? ".dept-content-eye" : ".dept-content-dental";
      document.querySelectorAll(`${activeSelector} .reveal-on-scroll:not(.is-revealed), ${activeSelector}.reveal-on-scroll:not(.is-revealed)`).forEach(card => {
        card.classList.add("is-revealed");
      });
      document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").forEach(card => {
        if (card.getClientRects().length === 0) return;
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 20 && rect.bottom > 0) {
          card.classList.add("is-revealed");
        }
      });
    }, 50);

    // 8. Update URL safely without altering file path (prevents 404s on reload in static servers and SecurityErrors on file://)
    if (updateUrl) {
      try {
        localStorage.setItem("sahastra_dept", deptId);
      } catch (err) {}

      try {
        if (window.location.protocol !== "file:") {
          const currentPath = window.location.pathname;
          const search = window.location.search;
          window.history.replaceState({ department: deptId }, deptData.meta.title || document.title, `${currentPath}${search}#${deptId}`);
        } else {
          window.location.hash = deptId;
        }
      } catch (e) {
        try {
          window.location.hash = deptId;
        } catch (ignored) {}
      }
    }
  }

  // Handle Initial Route from URL, Hash, or saved preference
  function initRouting() {
    let initialDept = "eye-care";
    const pathname = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    // Check saved department preference
    try {
      const savedDept = localStorage.getItem("sahastra_dept");
      if (savedDept === "dental-care" || savedDept === "eye-care") {
        initialDept = savedDept;
      }
    } catch (e) {}

    // Explicit URL parameters, query (?dept=dental), or hash (#dental-care) take highest precedence
    if (pathname.includes("dental-care") || hash.includes("dental-care") || hash.includes("dental") || search.includes("dental")) {
      initialDept = "dental-care";
    } else if (pathname.includes("eye-care") || hash.includes("eye-care") || hash.includes("eye") || search.includes("eye")) {
      initialDept = "eye-care";
    }

    setDepartment(initialDept, false);

    // Listen for browser Back/Forward navigation
    window.addEventListener("popstate", (e) => {
      if (e.state && e.state.department) {
        setDepartment(e.state.department, false);
      } else {
        const currentHash = window.location.hash.toLowerCase();
        if (currentHash.includes("dental")) {
          setDepartment("dental-care", false);
        } else if (currentHash.includes("eye")) {
          setDepartment("eye-care", false);
        }
      }
    });

    window.addEventListener("hashchange", () => {
      const currentHash = window.location.hash.toLowerCase();
      if (currentHash.includes("dental")) {
        setDepartment("dental-care", false);
      } else if (currentHash.includes("eye")) {
        setDepartment("eye-care", false);
      }
    });
  }

  // Event Listeners for Department Switches
  deptButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const dept = btn.getAttribute("data-dept");
      setDepartment(dept, true);
    });
  });

  // Handle Form Department Radio Manual Change
  formDeptRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.checked) {
        setDepartment(e.target.value, true);
      }
    });
  });

  // Sticky Header Scroll Detection
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile Drawer Toggle
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener("click", () => {
      const isActive = mobileDrawer.classList.toggle("active");
      mobileDrawerOverlay.classList.toggle("active", isActive);
      mobileNavToggle.classList.toggle("active", isActive);
      mobileNavToggle.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  }

  function closeMobileDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove("active");
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove("active");
    if (mobileNavToggle) {
      mobileNavToggle.classList.remove("active");
      mobileNavToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (mobileDrawerClose) mobileDrawerClose.addEventListener("click", closeMobileDrawer);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener("click", closeMobileDrawer);
  mobileNavLinks.forEach(link => link.addEventListener("click", closeMobileDrawer));

  // Service Details Modal Logic
  function openServiceModal(serviceId) {
    const isEye = currentDepartment === "eye-care";
    const deptKey = isEye ? "eyeCare" : "dentalCare";
    const services = clinic.departments[deptKey].services;
    const service = services.find(s => s.id === serviceId);

    if (!service || !serviceModalBackdrop) return;

    serviceModalTag.textContent = service.tag;
    serviceModalTitle.textContent = service.name;
    serviceModalBody.textContent = service.fullDescription;

    serviceModalPoints.innerHTML = service.keyPoints.map(point => `
      <li class="modal-point-item">
        ${getIconSvg("checkCircle")}
        <span>${point}</span>
      </li>
    `).join("");

    serviceModalBookBtn.onclick = () => {
      closeServiceModal();
      if (appointmentMessageInput) {
        appointmentMessageInput.value = `Inquiring about ${service.name}`;
      }
      const appointmentSec = document.getElementById("appointment");
      if (appointmentSec) {
        appointmentSec.scrollIntoView({ behavior: "smooth" });
      }
    };

    serviceModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  window.openServiceModal = openServiceModal;

  function closeServiceModal() {
    if (serviceModalBackdrop) {
      serviceModalBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (serviceModalClose) serviceModalClose.addEventListener("click", closeServiceModal);
  if (serviceModalBackdrop) {
    serviceModalBackdrop.addEventListener("click", (e) => {
      if (e.target === serviceModalBackdrop) closeServiceModal();
    });
  }

  // Privacy Policy & Terms Modal Logic
  function openPolicyModal(title, content) {
    if (!policyModalBackdrop) return;
    policyModalTitle.textContent = title;
    policyModalBody.innerHTML = content;
    policyModalBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePolicyModal() {
    if (policyModalBackdrop) {
      policyModalBackdrop.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  if (policyModalClose) policyModalClose.addEventListener("click", closePolicyModal);
  if (policyModalBackdrop) {
    policyModalBackdrop.addEventListener("click", (e) => {
      if (e.target === policyModalBackdrop) closePolicyModal();
    });
  }

  const privacyContent = `
    <p><strong>1. Introduction</strong><br>SAHASTRA OCUDENT HEALTHCARE is committed to protecting your personal information. This Privacy Policy details our handling of information submitted through our online appointment request form.</p>
    <br>
    <p><strong>2. Information We Collect</strong><br>We strictly collect only the basic identifying and scheduling details you provide: your full name, contact phone number, selected department (Eye Care or Dental Care), preferred appointment date and time, and optional scheduling notes. We do NOT request sensitive diagnostic records, payment information, or government IDs through this general web form.</p>
    <br>
    <p><strong>3. Use of Information</strong><br>Your information is used solely by our clinical reception team to contact you and confirm your consultation schedule. It is never sold, leased, or distributed to third-party advertisers.</p>
    <br>
    <p><strong>4. Nature of Web Form</strong><br>Please note that this website provides an appointment <em>request</em> service, not an automated live booking system. A consultation is only confirmed once our clinic team reaches out to verify your slot.</p>
  `;

  const termsContent = `
    <p><strong>1. Clinical Disclaimers</strong><br>The content on this website is provided for informational and educational purposes regarding our ophthalmic and dental services. It does not constitute medical advice, a diagnosis, or a guaranteed treatment outcome.</p>
    <br>
    <p><strong>2. Appointment Requests</strong><br>Submitting a request through our website or via WhatsApp does not guarantee immediate availability. Slot confirmations are finalized directly by clinic administration during standard operating hours.</p>
    <br>
    <p><strong>3. Emergencies</strong><br>For acute ocular trauma, sudden loss of vision, or severe dental emergencies, please visit an emergency trauma center immediately or contact our clinic helpline directly.</p>
  `;

  openPrivacyLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openPolicyModal("Privacy Policy", privacyContent);
    });
  });

  openTermsLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openPolicyModal("Terms of Use & Clinical Notice", termsContent);
    });
  });

  // Indian Phone Number Validation Helper
  // Accepts 10 digits e.g. 9096532832 or with optional country code +91 / 0
  function isValidIndianPhone(phone) {
    if (!phone) return false;
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
    const indianRegex = /^(?:(?:\+|0{0,2})91\s*|0)?[6789]\d{9}$/;
    return indianRegex.test(cleaned);
  }

  // Local Date Helper (YYYY-MM-DD in local browser time)
  function getLocalDateString() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }

  // Set min date to today so patients cannot select dates in the past
  if (appointmentDateInput) {
    appointmentDateInput.setAttribute("min", getLocalDateString());
  }

  // Safe Form Field Validation
  function validateField(input, errorElement, condition, errorMsg) {
    if (!input) return true;
    if (!condition) {
      input.classList.add("error");
      if (errorElement) {
        errorElement.textContent = errorMsg;
        errorElement.classList.add("visible");
      }
      return false;
    } else {
      input.classList.remove("error");
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("visible");
      }
      return true;
    }
  }

  function validateAppointmentForm() {
    let isValid = true;
    let firstErrorField = null;

    // 1. Patient Name
    if (patientNameInput) {
      const nameVal = patientNameInput.value.trim();
      const nameErr = document.getElementById("name-error") || document.getElementById("patient-name-error");
      const isNameValid = nameVal.length >= 2;
      if (!validateField(patientNameInput, nameErr, isNameValid, "Please enter the patient's full name (at least 2 letters).")) {
        isValid = false;
        if (!firstErrorField) firstErrorField = patientNameInput;
      }
    }

    // 2. Contact Number (Indian format)
    if (contactNumberInput) {
      const phoneVal = contactNumberInput.value.trim();
      const phoneErr = document.getElementById("phone-error") || document.getElementById("contact-number-error");
      const isPhoneValid = isValidIndianPhone(phoneVal);
      if (!validateField(contactNumberInput, phoneErr, isPhoneValid, "Please enter a valid 10-digit Indian phone number (e.g. 90965 32832).")) {
        isValid = false;
        if (!firstErrorField) firstErrorField = contactNumberInput;
      }
    }

    // 3. Appointment Date (Must not be in the past)
    if (appointmentDateInput) {
      const dateVal = appointmentDateInput.value;
      const dateErr = document.getElementById("date-error") || document.getElementById("appointment-date-error");
      const today = getLocalDateString();
      const isDateValid = Boolean(dateVal && dateVal >= today);
      if (!validateField(appointmentDateInput, dateErr, isDateValid, "Please choose a valid upcoming consultation date.")) {
        isValid = false;
        if (!firstErrorField) firstErrorField = appointmentDateInput;
      }
    }

    // 4. Preferred Time Slot (if select is required)
    if (preferredTimeInput && preferredTimeInput.hasAttribute("required")) {
      const timeVal = preferredTimeInput.value;
      const timeErr = document.getElementById("time-error") || document.getElementById("preferred-time-error");
      const isTimeValid = Boolean(timeVal && timeVal !== "");
      if (!validateField(preferredTimeInput, timeErr, isTimeValid, "Please select a preferred consultation slot.")) {
        isValid = false;
        if (!firstErrorField) firstErrorField = preferredTimeInput;
      }
    }

    if (!isValid && firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return isValid;
  }

  // Safe Realtime Error Clearing
  function clearFieldError(input, ...errorIds) {
    if (!input) return;
    input.classList.remove("error");
    errorIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove("visible");
        el.textContent = "";
      }
    });
  }

  if (patientNameInput) {
    patientNameInput.addEventListener("input", () => {
      clearFieldError(patientNameInput, "name-error", "patient-name-error");
    });
  }
  if (contactNumberInput) {
    contactNumberInput.addEventListener("input", () => {
      clearFieldError(contactNumberInput, "phone-error", "contact-number-error");
    });
  }
  if (appointmentDateInput) {
    appointmentDateInput.addEventListener("input", () => {
      clearFieldError(appointmentDateInput, "date-error", "appointment-date-error");
    });
    appointmentDateInput.addEventListener("change", () => {
      clearFieldError(appointmentDateInput, "date-error", "appointment-date-error");
    });
  }
  if (preferredTimeInput) {
    preferredTimeInput.addEventListener("change", () => {
      clearFieldError(preferredTimeInput, "time-error", "preferred-time-error");
    });
  }

  // Get Form Data Object
  function getFormData() {
    const selectedDeptRadio = document.querySelector('input[name="form-dept"]:checked');
    const deptId = selectedDeptRadio ? selectedDeptRadio.value : currentDepartment;
    const deptLabel = deptId === "eye-care" ? "Eye Care & Ophthalmology" : "Dental Care";

    return {
      patientName: patientNameInput ? patientNameInput.value.trim() : "",
      contactNumber: contactNumberInput ? contactNumberInput.value.trim() : "",
      department: deptLabel,
      departmentId: deptId,
      date: appointmentDateInput ? appointmentDateInput.value : "",
      time: preferredTimeInput ? (preferredTimeInput.value || "Any suitable time") : "Any suitable time",
      message: appointmentMessageInput ? appointmentMessageInput.value.trim() : ""
    };
  }

  // Helper: Dispatch Automated Background WhatsApp Notification via Green-API
  async function dispatchGreenApiWhatsApp(data, requestId) {
    const greenHost = (clinic.greenApi && clinic.greenApi.host) || "https://7107.api.green-api.com";
    const idInstance = (clinic.greenApi && clinic.greenApi.idInstance) || "710722781766";
    const apiToken = (clinic.greenApi && clinic.greenApi.apiTokenInstance) || "35e4d99b93c342f591e581b893d9e4c7f5f54b167b194b10a3";
    const recipientPhone = (clinic.greenApi && clinic.greenApi.recipientPhone) || "918104184829";
    const targetChatId = (clinic.greenApi && clinic.greenApi.groupChatId) || `${recipientPhone.replace(/[^0-9]/g, "")}@c.us`;

    const formattedMessage = [
      `🏥 *NEW APPOINTMENT REQUEST — SAHASTRA OCUDENT HEALTHCARE*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🆔 *Ref ID:* #${requestId}`,
      `📋 *Department:* ${data.department}`,
      `👤 *Patient Name:* ${data.patientName}`,
      `📞 *Contact Number:* ${data.contactNumber}`,
      `📅 *Preferred Date:* ${data.date}`,
      `⏰ *Preferred Time Window:* ${data.time}`,
      data.message ? `📝 *Reason / Notes:* ${data.message}` : `📝 *Reason / Notes:* General Consultation`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 _Dispatched directly from website appointment form_`
    ].join("\n");

    const payload = {
      chatId: targetChatId,
      message: formattedMessage,
      appointmentData: { ...data, requestId },
      targetEmail: (clinic.contact && clinic.contact.emailAppointments) || "karansingchavan2582@gmail.com"
    };

    // 1. Try local serverless endpoint (/api/send-appointment) if available
    try {
      const serverlessRes = await fetch("/api/send-appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (serverlessRes.ok) {
        return await serverlessRes.json();
      }
    } catch (e) {
      // Fallback to direct client-side fetch
    }

    // 2. Direct Green-API call fallback (CORS enabled)
    try {
      const directUrl = `${greenHost}/waInstance${idInstance}/sendMessage/${apiToken}`;
      const response = await fetch(directUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: payload.chatId,
          message: payload.message
        })
      });
      return await response.json();
    } catch (err) {
      console.warn("Direct Green API dispatch notice:", err);
      return null;
    }
  }

  // Helper: Dispatch Automated Email Notification via FormSubmit AJAX
  async function dispatchEmailNotification(data, requestId) {
    const targetEmail = (clinic.contact && clinic.contact.emailAppointments) || "karansingchavan2582@gmail.com";
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `🏥 Appointment Request #${requestId} — ${data.patientName} (${data.department})`,
          _template: "table",
          _captcha: "false",
          "Reference ID": `#${requestId}`,
          "Department": data.department,
          "Patient Name": data.patientName,
          "Contact Number": data.contactNumber,
          "Preferred Date": data.date,
          "Preferred Time Window": data.time,
          "Symptoms / Notes": data.message || "General Consultation",
          "Submitted Via": "sahastraocudent.org"
        })
      });
      const json = await response.json();
      console.log("FormSubmit response:", json);
      return json;
    } catch (err) {
      console.warn("Email dispatch notice:", err);
      return null;
    }
  }

  // Unified Submit Handler for Email / Web Request
  async function handleFormSubmit(e) {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }

    if (!validateAppointmentForm()) {
      return;
    }

    const data = getFormData();
    const requestId = "REQ-" + Math.floor(100000 + Math.random() * 900000);

    // Disable submit button while processing
    if (emailSubmitBtn) {
      emailSubmitBtn.disabled = true;
      const originalHtml = emailSubmitBtn.innerHTML;
      emailSubmitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50" width="18" height="18" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="80" stroke-dashoffset="60"></circle>
        </svg>
        <span>Transmitting Request...</span>
      `;

      // Dispatch automated WhatsApp notification & Email alert in parallel
      const dispatchResults = await Promise.allSettled([
        dispatchGreenApiWhatsApp(data, requestId),
        dispatchEmailNotification(data, requestId)
      ]);

      emailSubmitBtn.disabled = false;
      emailSubmitBtn.innerHTML = originalHtml;

      if (formStatusAlert) {
        formStatusAlert.className = "form-status-alert active success";
        formStatusAlert.style.display = "flex";

        formStatusAlert.innerHTML = `
          <div>
            <div style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.35rem; color: #065f46;">✓ Appointment Request Received! (Ref: #${requestId})</div>
            <div>Thank you, <strong>${data.patientName}</strong>. Your request for <strong>${data.department}</strong> on <strong>${data.date} (${data.time})</strong> has been registered with our clinic reception.</div>
            <div style="margin-top: 0.4rem; font-size: 0.875rem; color: #047857;">Our reception coordinators will contact you at <strong>${data.contactNumber}</strong> shortly to confirm your consultation slot.</div>
          </div>
        `;
        formStatusAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  // Attach submit listener to form & click listener to button
  if (appointmentForm) {
    appointmentForm.addEventListener("submit", handleFormSubmit);
  }
  if (emailSubmitBtn) {
    emailSubmitBtn.addEventListener("click", (e) => {
      handleFormSubmit(e);
    });
  }

  // Path 2: Automated WhatsApp Submission Without Redirection
  if (whatsappSubmitBtn) {
    whatsappSubmitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!validateAppointmentForm()) {
        return;
      }

      const data = getFormData();
      const requestId = "REQ-" + Math.floor(100000 + Math.random() * 900000);

      whatsappSubmitBtn.disabled = true;
      const originalHtml = whatsappSubmitBtn.innerHTML;
      whatsappSubmitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50" width="18" height="18" style="animation: spin 1s linear infinite; display: inline-block; vertical-align: middle; margin-right: 0.5rem;">
          <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="80" stroke-dashoffset="60"></circle>
        </svg>
        <span>Sending WhatsApp Message...</span>
      `;

      // Dispatch automated WhatsApp notification & Email alert in parallel without redirecting
      await Promise.allSettled([
        dispatchGreenApiWhatsApp(data, requestId),
        dispatchEmailNotification(data, requestId)
      ]);

      whatsappSubmitBtn.disabled = false;
      whatsappSubmitBtn.innerHTML = originalHtml;

      // User feedback stays on page - ZERO redirection
      if (formStatusAlert) {
        formStatusAlert.className = "form-status-alert active success";
        formStatusAlert.style.display = "flex";
        formStatusAlert.innerHTML = `
          <div>
            <div style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.35rem; color: #065f46;">✓ Appointment Request Received! (Ref: #${requestId})</div>
            <div>Thank you, <strong>${data.patientName}</strong>. Your appointment request for <strong>${data.department}</strong> on <strong>${data.date} (${data.time})</strong> has been registered with our clinic reception.</div>
            <div style="margin-top: 0.4rem; font-size: 0.875rem; color: #047857;">Our reception coordinators will contact you at <strong>${data.contactNumber}</strong> shortly to confirm your consultation slot.</div>
          </div>
        `;
        formStatusAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  // Floating WhatsApp Quick Action
  if (floatingWhatsappLink) {
    const rawNumber = clinic.contact.whatsappNumber;
    const defaultMsg = encodeURIComponent("Hello Sahastra Ocudent Healthcare, I would like to inquire about an appointment.");
    floatingWhatsappLink.href = `https://wa.me/${rawNumber}?text=${defaultMsg}`;
  }

  // Direct Clinic Contact Links in header/footer
  if (directCallLink) directCallLink.href = `tel:${clinic.contact.phoneRaw}`;
  if (directWhatsappLink) directWhatsappLink.href = `https://wa.me/${clinic.contact.whatsappNumber}`;
  if (directEmailLink) directEmailLink.href = `mailto:${clinic.contact.email}`;

  // Keyboard accessibility: ESC key closes open modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeServiceModal();
      closePolicyModal();
      closeMobileDrawer();
    }
  });

  // Scroll Reveal Animations
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      ".section-header, .intro-card, .service-card, .why-card, .service-detailed-card, .doctor-spotlight-card, " +
      ".sterilization-card, .comparison-card, .step-card, .faq-card, .contact-quick-card, " +
      ".contact-card, .hours-table-card, .cta-banner, .story-card"
    );

    if (!targets.length) return;

    targets.forEach(el => {
      el.classList.add("reveal-on-scroll");
      if (el.parentElement && el.parentElement.children.length > 1) {
        const idx = Array.from(el.parentElement.children).indexOf(el);
        el.style.setProperty("--reveal-delay", `${Math.min(idx * 0.08, 0.4)}s`);
      }
    });

    const revealInView = () => {
      document.querySelectorAll(".reveal-on-scroll:not(.is-revealed)").forEach(card => {
        if (card.getClientRects().length === 0) return;
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 20 && rect.bottom > 0) {
          card.classList.add("is-revealed");
        }
      });
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: "0px 0px -20px 0px",
        threshold: 0.05
      });

      targets.forEach(el => observer.observe(el));
    }

    // Window scroll and resize triggers
    window.addEventListener("scroll", revealInView, { passive: true });
    window.addEventListener("resize", revealInView, { passive: true });
    setTimeout(revealInView, 60);
  }

  // Guaranteed Navigation Link Redirection across all browsers, webviews, and embedded environments
  function initNavLinks() {
    const navAnchors = document.querySelectorAll("a[href]");
    navAnchors.forEach(link => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href) return;

        // Skip in-page hash anchors, protocols, or external URLs
        if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:") || href.startsWith("http://") || href.startsWith("https://")) {
          return;
        }

        // Close mobile drawer if open
        closeMobileDrawer();

        // Prevent preview containers or webview extensions from hijacking or cancelling navigation
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Perform instant, deterministic redirect
        window.location.href = href;
      }, true); // Use capture phase so this executes before any external injected scripts
    });
  }

  // Initialize
  initNavLinks();
  initDateConstraints();
  initRouting();
  initHeroDotGrid();
  initScrollStack();
  initScrollReveal();
});

