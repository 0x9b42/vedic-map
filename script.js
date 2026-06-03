// ============ UTILITY FUNCTIONS ============
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// ============ INTERSECTION OBSERVER ============
const createObserver = () => {
  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);
};

const observer = createObserver();

// Observe all reveal elements
$$(".reveal, .stagger").forEach((el) => observer.observe(el));

// ============ NAVIGATION ============
class NavHandler {
  constructor() {
    this.nav = $("#mainNav");
    this.navLinks = $$(".nav-link");
    this.lastScroll = 0;
    this.init();
  }

  init() {
    document.addEventListener("scroll", () => this.handleScroll());
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => this.handleNavClick(e));
    });
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    // Hide nav on scroll down, show on scroll up
    if (currentScroll > this.lastScroll && currentScroll > 80) {
      this.nav.classList.add("hidden");
    } else {
      this.nav.classList.remove("hidden");
    }

    this.lastScroll = currentScroll;

    // Update active nav link
    this.updateActiveLink();
  }

  updateActiveLink() {
    const sections = $$("section[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = $(`a[href="#${section.id}"]`);
        if (activeLink) activeLink.classList.add("active");
      }
    });
  }

  handleNavClick(e) {
    const href = e.target.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = $(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
}

// ============ ACCORDION HANDLER ============
class AccordionHandler {
  constructor(containerSelector) {
    this.container = $(containerSelector);
    if (!this.container) return;
    this.init();
  }

  init() {
    this.container.addEventListener("click", (e) => {
      const header = e.target.closest(".accordion-header");
      if (header) this.toggle(header);
    });
  }

  toggle(header) {
    const body = header.nextElementSibling;
    const isOpen = body.classList.contains("open");

    // Close all other accordions
    $$(".accordion-body.open").forEach((b) => {
      if (b !== body) b.classList.remove("open");
    });

    // Toggle current
    if (isOpen) {
      body.classList.remove("open");
    } else {
      body.classList.add("open");
    }
  }
}

// ============ STARFIELD BACKGROUND ============
class Starfield {
  constructor(canvasId) {
    this.canvas = $(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.animate();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    const count = Math.min(100, Math.floor(window.innerWidth / 8));
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.canvas.width,
      y: Math.random() * this.canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.3,
      velocity: Math.random() * 0.2,
    }));
  }

  animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(212, 148, 58, var(--opacity))";

    this.particles.forEach((p) => {
      p.y -= p.velocity;
      if (p.y < 0) p.y = this.canvas.height;

      this.ctx.globalAlpha = p.opacity;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.globalAlpha = 1;
    requestAnimationFrame(this.animate);
  };
}

// ============ WHEEL BUILDERS ============
const buildZodiacWheel = (data, colors, onSelect) => {
  const container = $("#zodiacWheelContainer");
  if (!container) return;

  const wheel = document.createElement("div");
  wheel.className = "zodiac-wheel";

  const ring = document.createElement("div");
  ring.className = "zodiac-ring";
  ring.style.width = "480px";
  ring.style.height = "480px";
  ring.style.top = "50%";
  ring.style.left = "50%";
  ring.style.marginLeft = "-240px";
  ring.style.marginTop = "-240px";
  wheel.appendChild(ring);

  const center = document.createElement("div");
  center.className = "zodiac-center";
  center.innerHTML = "<span>Zodiac</span>";
  wheel.appendChild(center);

  data.forEach((item, index) => {
    const segment = document.createElement("div");
    segment.className = "zodiac-segment";
    segment.textContent = item.symbol;
    segment.style.color = colors[index] || colors[0];

    const angle = (index / data.length) * 360;
    segment.style.transform = `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`;

    segment.addEventListener("click", () => {
      $$(".zodiac-segment.active").forEach((s) => s.classList.remove("active"));
      segment.classList.add("active");
      onSelect(item);
    });

    wheel.appendChild(segment);
  });

  container.innerHTML = "";
  container.appendChild(wheel);
};

const buildHouseWheel = (data, onSelect) => {
  const container = $("#bhavaWheelContainer");
  if (!container) return;

  const wheel = document.createElement("div");
  wheel.className = "zodiac-wheel";
  wheel.style.position = "relative";

  const ring = document.createElement("div");
  ring.className = "zodiac-ring";
  ring.style.width = "480px";
  ring.style.height = "480px";
  ring.style.top = "50%";
  ring.style.left = "50%";
  ring.style.marginLeft = "-240px";
  ring.style.marginTop = "-240px";
  wheel.appendChild(ring);

  const center = document.createElement("div");
  center.className = "zodiac-center";
  center.innerHTML = "<span>Houses</span>";
  wheel.appendChild(center);

  data.forEach((item, index) => {
    const node = document.createElement("div");
    node.className = "house-node";
    node.textContent = item.number;

    const angle = (index / data.length) * 360;
    const radius = 150;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    node.style.left = `calc(50% + ${x}px - 22px)`;
    node.style.top = `calc(50% + ${y}px - 22px)`;

    node.addEventListener("click", () => {
      $$(".house-node.active").forEach((n) => n.classList.remove("active"));
      node.classList.add("active");
      onSelect(item);
    });

    wheel.appendChild(node);
  });

  container.innerHTML = "";
  container.appendChild(wheel);
};

// ============ DETAIL PANEL RENDERER ============
const renderDetailPanel = (item, selector, template) => {
  const panel = $(selector);
  if (!panel) return;

  panel.innerHTML = template(item);
  panel.classList.add("open");

  // Auto-hide after a delay
  setTimeout(() => {
    panel.classList.remove("open");
  }, 8000);
};

// ============ GRID RENDERERS ============
const renderPlanetGrid = (data) => {
  const grid = $("#grahasGrid");
  if (!grid) return;

  grid.innerHTML = data
    .map(
      (graha) => `
    <button class="planet-card" data-graha='${JSON.stringify(graha).replace(/'/g, "&apos;")}'>
      <div class="planet-symbol" style="color: ${graha.color}">${graha.sym}</div>
      <div style="font-size: 0.85rem; font-weight: 600; margin-top: 0.5rem">${graha.name}</div>
      <div style="font-size: 0.7rem; color: var(--muted); margin-top: 0.25rem">${graha.en}</div>
    </button>
  `
    )
    .join("");

  grid.querySelectorAll(".planet-card").forEach((card) => {
    card.addEventListener("click", () => {
      const graha = JSON.parse(card.dataset.graha);
      renderPlanetDetail(graha);
    });
  });
};

const renderPlanetDetail = (graha) => {
  const panel = $("#grahaDetail");
  if (!panel) return;

  panel.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
      <div>
        <h3 style="color: ${graha.color}; margin-bottom: 1rem; font-family: Cinzel; font-size: 1.5rem;">
          ${graha.name} (${graha.en})
        </h3>
        <div style="color: var(--muted); font-size: 0.9rem; line-height: 1.8;">
          <p><strong style="color: var(--cream)">Ruler:</strong> ${graha.ruler}</p>
          <p><strong style="color: var(--cream)">Exalted:</strong> ${graha.exalt}</p>
          <p><strong style="color: var(--cream)">Debilitated:</strong> ${graha.debl}</p>
          <p><strong style="color: var(--cream)">Mooltrikon:</strong> ${graha.mt}</p>
          <p><strong style="color: var(--cream)">Nature:</strong> ${graha.nature}</p>
          <p><strong style="color: var(--cream)">Gender:</strong> ${graha.gender}</p>
          <p><strong style="color: var(--cream)">Day:</strong> ${graha.day}</p>
        </div>
      </div>
      <div>
        <h4 style="color: var(--gold); margin-bottom: 1rem;">Significations</h4>
        <ul style="color: var(--muted); font-size: 0.9rem; line-height: 1.8; list-style: none;">
          ${graha.rep.map((r) => `<li style="margin-bottom: 0.5rem;">• ${r}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;

  panel.classList.add("open");
};

// ============ EVENT LISTENERS ============
const initEventListeners = () => {
  // Close detail panels when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".planet-card, .detail-panel, .zodiac-segment, .zodiac-center")) {
      const panels = $$(".detail-panel.open");
      panels.forEach((p) => p.classList.remove("open"));
    }
  });
};

// ============ INITIALIZATION ============
document.addEventListener("DOMContentLoaded", () => {
  // Initialize components
  new NavHandler();
  new AccordionHandler("#toolsAccordion");
  new Starfield("#starfield");

  // Check if data is loaded
  if (typeof GRAHAS !== "undefined") {
    renderPlanetGrid(GRAHAS);
  }

  // Initialize event listeners
  initEventListeners();
});
