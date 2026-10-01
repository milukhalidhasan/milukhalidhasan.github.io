// ═══════ PROJECTS ═══════
// Edit this list to add, remove or change projects. Each one becomes a card.
// cat: one of the keys in CATEGORIES below. img: optional screenshot path.
// demo and code become links; extra: [{label, url}] adds any further links (a download, a second page).
const GH = "https://github.com/milukhalidhasan/";
const PROJECTS = [
  {
    title: "Tomato Leaf Disease Classification",
    year: "2026",
    cat: "ml",
    emoji: "🍅",
    hue: 140,
    img: "images/project-tomato.jpg",
    desc: "A MobileNetV2 transfer-learning model that identifies 10 tomato leaf conditions from a photo with ~91% validation accuracy, served through a Gradio upload-and-classify app.",
    tags: ["Python", "TensorFlow", "MobileNetV2", "Gradio"],
    code: GH + "tomato-leaf-disease-classification",
    featured: true,
  },
  {
    title: "Asian Rice Production Dashboard",
    year: "2026",
    cat: "data",
    emoji: "🌾",
    hue: 90,
    img: "images/project-rice.jpg",
    desc: "An interactive FAOSTAT dashboard covering 35 Asian countries from 1961 to 2024: production, yield and area trends, country rankings, growth index and decade snapshots.",
    tags: ["JavaScript", "Chart.js", "FAOSTAT", "Data Viz"],
    code: GH + "Asian-Rice-Production-Overview-1961-2024-FAOSTAT",
    featured: true,
  },
  {
    title: "Justice Squad 3D",
    year: "2026",
    cat: "games",
    emoji: "🎯",
    hue: 0,
    img: "images/project-justice.jpg",
    desc: "An arcade 3D light-gun shooter built from scratch with three.js: five stages, five boss fights and a final attack helicopter. Every texture, sound effect and music track is generated in code at runtime, so the whole game is under 1 MB and plays offline.",
    tags: ["three.js", "JavaScript", "WebGL", "Android"],
    demo: "https://milukhalidhasan.github.io/justice-squad/",
    code: GH + "justice-squad",
    extra: [{ label: "Android APK", url: "https://milukhalidhasan.github.io/justice-squad/releases/JusticeSquad-2.2.2.apk" }],
    featured: true,
  },
  {
    title: "Khalid's Treasure Hunt",
    year: "2026",
    cat: "games",
    emoji: "🧭",
    hue: 35,
    img: "images/project-hunt.jpg",
    desc: "A treasure hunt for children set inside a 3D model of a village house I designed. Walk through the rooms, the verandah and the yard with Khalid and his dog Bhulu to find the hidden things, in English or Bengali. The repository also holds the full house plan: floor-plan drawings, printable PDFs and the design notes.",
    tags: ["three.js", "JavaScript", "Python", "Bilingual"],
    demo: "https://milukhalidhasan.github.io/khalids-hunt/",
    code: GH + "khalids-hunt",
    extra: [
      { label: "House plan", url: "https://milukhalidhasan.github.io/khalids-hunt/village-house-plan.html" },
      { label: "Android APK", url: "https://milukhalidhasan.github.io/khalids-hunt/releases/Khalids-Hunt.apk" },
    ],
  },
  {
    title: "Age Calculator — Android App",
    year: "2026",
    cat: "mobile",
    emoji: "🎂",
    hue: 235,
    img: "images/project-age.jpg",
    desc: "A date-to-date age calculator with a calendar picker, totals down to the second, birth weekday, zodiac sign and a next-birthday countdown, with light and dark themes.",
    tags: ["Kotlin", "Jetpack Compose", "Material 3"],
    code: GH + "age-calculator",
  },
  {
    title: "Hand Raise Detector",
    year: "2025",
    cat: "ml",
    emoji: "✋",
    hue: 25,
    desc: "A webcam tool that uses OpenCV motion detection to spot a raised hand and automatically capture a photo, with a delay between shots.",
    tags: ["Python", "OpenCV", "NumPy"],
    code: GH + "hand-raise-detector",
  },
  {
    title: "Personal Website (v1)",
    year: "2025",
    cat: "data",
    emoji: "🌐",
    hue: 160,
    desc: "My first portfolio site, presenting my research, publications, field work and skills, hosted on GitHub Pages.",
    tags: ["HTML", "CSS", "GitHub Pages"],
    code: GH + "milukhalidhasan.github.io",
  },
];

const CATEGORIES = { all: "All", ml: "AI & ML", data: "Web & Data", mobile: "Android", games: "Games" };

// ═══════ PROJECT RENDERING ═══════
const grid = document.getElementById("projects-grid");
const filtersEl = document.getElementById("filters");
const searchEl = document.getElementById("project-search");
let activeCat = "all";

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

Object.entries(CATEGORIES).forEach(([key, label]) => {
  const n = key === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.cat === key).length;
  if (!n) return;
  const btn = document.createElement("button");
  btn.className = "filter" + (key === "all" ? " active" : "");
  btn.innerHTML = `${label}<span class="count">${n}</span>`;
  btn.addEventListener("click", () => {
    filtersEl.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    activeCat = key;
    renderProjects();
  });
  filtersEl.appendChild(btn);
});
searchEl.addEventListener("input", renderProjects);

function renderProjects() {
  const q = searchEl.value.trim().toLowerCase();
  const list = PROJECTS.filter(
    (p) =>
      (activeCat === "all" || p.cat === activeCat) &&
      (!q || [p.title, p.desc, p.year, ...p.tags].join(" ").toLowerCase().includes(q))
  );
  grid.innerHTML = list.length
    ? list
        .map(
          (p) => `
      <article class="card project">
        <div class="project-thumb" style="--hue:${p.hue}">
          ${p.emoji}
          ${p.img ? `<img src="${p.img}" alt="Screenshot of ${escapeHtml(p.title)}" onerror="this.remove()">` : ""}
        </div>
        <div class="project-body">
          <div class="project-meta"><span>${p.year}</span>${p.featured ? '<span class="badge">★ Featured</span>' : ""}</div>
          <h3>${escapeHtml(p.title)}</h3>
          <p>${escapeHtml(p.desc)}</p>
          <ul class="tags">${p.tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
          <div class="project-links">
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">Live demo →</a>` : ""}
            ${p.code ? `<a href="${p.code}" target="_blank" rel="noopener">Code →</a>` : ""}
            ${(p.extra || []).map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${escapeHtml(l.label)} →</a>`).join("")}
          </div>
        </div>
      </article>`
        )
        .join("")
    : '<p class="empty">No projects match your search.</p>';
}
renderProjects();

// ═══════ FOOTER YEAR ═══════
document.getElementById("year").textContent = new Date().getFullYear();

// ═══════ MOBILE MENU ═══════
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ═══════ THEME TOGGLE ═══════
document.querySelector(".theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
});

// ═══════ SCROLL: PROGRESS BAR, HEADER SHADOW, BACK TO TOP ═══════
const progress = document.getElementById("scroll-progress");
const header = document.getElementById("site-header");
const toTop = document.getElementById("back-to-top");
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? (scrollY / max) * 100 : 0) + "%";
  header.classList.toggle("scrolled", scrollY > 20);
  toTop.classList.toggle("show", scrollY > 500);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// ═══════ TYPING EFFECT ═══════
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const typed = document.querySelector(".typed");
if (typed && !reduceMotion) {
  const words = JSON.parse(typed.dataset.words);
  let w = 0, c = words[0].length, deleting = true;
  const tick = () => {
    const word = words[w];
    c += deleting ? -1 : 1;
    typed.textContent = word.slice(0, c);
    let delay = deleting ? 50 : 100;
    if (!deleting && c === word.length) { deleting = true; delay = 1800; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  };
  setTimeout(tick, 1800);
}

// ═══════ SCROLL REVEAL ═══════
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ═══════ ANIMATED COUNTERS ═══════
const counterObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      counterObserver.unobserve(e.target);
      if (reduceMotion) return;
      const el = e.target, target = +el.dataset.target, start = performance.now();
      const step = (now) => {
        const t = Math.min((now - start) / 1200, 1);
        el.textContent = Math.round((1 - Math.pow(1 - t, 3)) * target);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }),
  { threshold: 0.5 }
);
document.querySelectorAll(".counter").forEach((el) => counterObserver.observe(el));

// ═══════ ACTIVE NAV LINK ═══════
const sectionObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`)
      );
    }),
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

// ═══════ CONTACT FORM ═══════
// Opens the visitor's email app with the message pre-filled (no server needed).
const form = document.querySelector(".contact-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
  location.href = `mailto:${form.dataset.email}?subject=${subject}&body=${body}`;
  form.querySelector(".form-note").textContent = "Opening your email app…";
  form.reset();
});

// ═══════ GALLERY ═══════
// Add photos to images/gallery/ and list them here. Missing files are skipped,
// and the whole section stays hidden until at least one photo loads.
const GALLERY = [
  { src: "images/gallery/uav-flight-prep.jpg", caption: "Preparing the UAV for a mapping flight", tall: true },
  { src: "images/gallery/orthomosaic-rgb.jpg", caption: "UAV orthomosaic of the wheat experiment", wide: true },
  { src: "images/gallery/gnss-setup.jpg", caption: "Setting up a GNSS receiver for ground control", tall: true },
  { src: "images/gallery/vi-map.jpg", caption: "Vegetation index map of the same plots", wide: true },
  { src: "images/gallery/wheat-sensor-readings.jpg", caption: "Taking handheld sensor readings at grain filling" },
  { src: "images/gallery/wheat-harvest.jpg", caption: "Harvesting the experimental plots" },
  { src: "images/gallery/field-treatment.jpg", caption: "Applying treatments to young wheat", tall: true },
];

const galleryGrid = document.getElementById("gallery-grid");
const gallerySection = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");

GALLERY.forEach(({ src, caption, tall, wide }) => {
  const img = new Image();
  img.onload = () => {
    const btn = document.createElement("button");
    btn.className = "g-item" + (tall ? " tall" : "") + (wide ? " wide" : "");
    btn.innerHTML = `<img src="${src}" alt="${escapeHtml(caption)}" loading="lazy"><span>${escapeHtml(caption)}</span>`;
    btn.addEventListener("click", () => {
      lightbox.querySelector("img").src = src;
      lightbox.querySelector("img").alt = caption;
      lightbox.querySelector(".lb-caption").textContent = caption;
      lightbox.showModal();
    });
    // Keep the order of the GALLERY list regardless of load order
    btn.dataset.i = GALLERY.findIndex((g) => g.src === src);
    const next = [...galleryGrid.children].find((c) => +c.dataset.i > +btn.dataset.i);
    galleryGrid.insertBefore(btn, next || null);
    gallerySection.hidden = false;
    document.querySelector(".nav-gallery").classList.add("show");
  };
  img.src = src;
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.closest(".lb-close")) lightbox.close();
});

// Research figures open in the same viewer
document.querySelectorAll(".figures img").forEach((img) =>
  img.addEventListener("click", () => {
    lightbox.querySelector("img").src = img.src;
    lightbox.querySelector("img").alt = img.alt;
    lightbox.querySelector(".lb-caption").textContent = img.closest("figure").querySelector("figcaption").textContent;
    lightbox.showModal();
  })
);

// ═══════ DRONE SURVEY (hero decoration) ═══════
// A survey drone cruises across the top of the hero and projects a beam onto a strip
// of plots at the bottom; plots behind the beam switch from plain green to
// vegetation-index colours. Colours are illustrative only, not research data.
(function droneScan() {
  const svg = document.getElementById("scan-svg");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const $ = (sel) => svg.querySelector(sel);
  const rgb = $("#plots-rgb"), vi = $("#plots-vi"), bed = $(".scan-bed");
  const drone = $("#drone"), art = $("#drone-art"), beam = $("#beam"), line = $("#scan-line"), reveal = $("#scan-reveal");
  const viColours = ["#d7301f", "#fc8d59", "#fdcc8a", "#d9ef8b", "#91cf60", "#1a9850"];
  const rows = 3, pw = 26, ph = 16, gx = 4, gy = 4;
  let W = 1200, H = 700, fieldTop = 630, droneY = 50, scale = 1;

  function build() {
    const box = svg.getBoundingClientRect();
    W = Math.max(320, Math.round(box.width));
    H = Math.max(400, Math.round(box.height));
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    scale = W < 700 ? 0.62 : W < 1100 ? 0.82 : 1;
    droneY = W < 700 ? 34 : 50;
    fieldTop = H - 74;
    bed.setAttribute("y", fieldTop);
    bed.setAttribute("width", W - 40);
    rgb.textContent = "";
    vi.textContent = "";
    const cols = Math.floor((W - 48 + gx) / (pw + gx));
    const x0 = (W - (cols * (pw + gx) - gx)) / 2;
    let seed = 7;
    const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const base = document.createElementNS(NS, "rect");
        const attrs = { x: x0 + c * (pw + gx), y: fieldTop + 8 + r * (ph + gy), width: pw, height: ph, rx: 2, class: "plot" };
        Object.entries(attrs).forEach(([k, v]) => base.setAttribute(k, v));
        rgb.appendChild(base);
        const idx = Math.min(viColours.length - 1, Math.floor(rand() * 3.2 + (Math.sin(c / 5 + r) + 1) * 1.4));
        const v = base.cloneNode();
        v.setAttribute("class", "plot-vi");
        v.setAttribute("fill", viColours[idx]);
        vi.appendChild(v);
      }
    }
  }

  function place(x, bob, tilt) {
    const y = droneY + bob;
    drone.setAttribute("transform", `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${scale})`);
    art.setAttribute("transform", `rotate(${tilt.toFixed(2)})`);
    const top = y + 36 * scale, spread = 74;
    beam.setAttribute("points", `${x - 5},${top} ${x + 5},${top} ${x + spread},${fieldTop} ${x - spread},${fieldTop}`);
    line.setAttribute("x1", x - spread); line.setAttribute("x2", x + spread);
    line.setAttribute("y1", fieldTop); line.setAttribute("y2", fieldTop);
    reveal.setAttribute("width", Math.max(0, Math.min(W, x)).toFixed(1));
  }

  build();
  let resizeTimer;
  addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 150); });

  if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
    place(W * 0.68, 0, 0);
    return;
  }
  const duration = 14000, hold = 1800;
  let t0 = null;
  function frame(now) {
    if (t0 === null) t0 = now;
    const t = ((now - t0) % (duration + hold)) / duration;
    const x = -160 + (W + 320) * Math.min(t, 1);
    place(x, Math.sin(now / 520) * 3, t < 1 ? 3 + Math.sin(now / 900) * 0.8 : 0);
    vi.style.opacity = t > 1 ? Math.max(0, 1 - ((t - 1) * duration) / hold * 1.6) : 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
