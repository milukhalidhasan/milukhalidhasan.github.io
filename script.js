// ═══════ PROJECTS ═══════
// Edit this list to add, remove or change projects. Each one becomes a card.
// cat: one of the keys in CATEGORIES below. img: optional screenshot path.
// icon: shown when there is no screenshot; any icon name from the sprite in index.html (without "i-").
const GH = "https://github.com/milukhalidhasan/";
const PROJECTS = [
  {
    title: "Tomato Leaf Disease Classification",
    year: "2026",
    cat: "ml",
    icon: "leaf-scan",
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
    icon: "chart",
    hue: 90,
    img: "images/project-rice.jpg",
    desc: "An interactive FAOSTAT dashboard covering 35 Asian countries from 1961 to 2024: production, yield and area trends, country rankings, growth index and decade snapshots.",
    tags: ["JavaScript", "Chart.js", "FAOSTAT", "Data Viz"],
    code: GH + "Asian-Rice-Production-Overview-1961-2024-FAOSTAT",
    featured: true,
  },
  {
    title: "Age Calculator — Android App",
    year: "2026",
    cat: "mobile",
    icon: "phone",
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
    icon: "camera",
    hue: 25,
    desc: "A webcam tool that uses OpenCV motion detection to spot a raised hand and automatically capture a photo, with a delay between shots.",
    tags: ["Python", "OpenCV", "NumPy"],
    code: GH + "hand-raise-detector",
  },
  {
    title: "Justice Squad 3D",
    year: "2026",
    cat: "games",
    icon: "code",
    hue: 260,
    img: "images/project-justice.jpg",
    desc: "An arcade 3D light-gun shooter for the browser and Android: five stages, five named bosses and a final helicopter fight. Built on three.js with no game engine, with every texture, sound and music track generated in code.",
    tags: ["JavaScript", "three.js", "WebGL", "Android"],
    code: GH + "justice-squad",
  },
  {
    title: "Khalid's Treasure Hunt",
    year: "2026",
    cat: "games",
    icon: "globe",
    hue: 30,
    img: "images/project-hunt.jpg",
    desc: "A children's treasure hunt in a 3D village house built from a real, measured floor plan. Explore the rooms, verandah and yard with Khalid and his dog Bhulu, in English or Bengali, in the browser or as an offline Android app.",
    tags: ["JavaScript", "three.js", "Python", "Android"],
    demo: "https://milukhalidhasan.github.io/khalids-hunt/",
    code: GH + "khalids-hunt",
  },
];

const CATEGORIES = { all: "All", ml: "AI & ML", data: "Web & Data", games: "3D games", mobile: "Android" };

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
          <svg class="ic" aria-hidden="true"><use href="#i-${p.icon}" /></svg>
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

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

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
// Add images to images/gallery/ and list them here. Missing files are skipped,
// and the whole section stays hidden until at least one image loads.
// cat:   one of the keys in GALLERY_CATS below ("fig" tiles show the whole chart, uncropped).
// thumb: optional smaller copy for the grid; leave it out to use src.
// shape: "tall" (1×2), "wide" (2×1), "big" (2×2) or "full" (whole row); leave it out for one cell.
// pos:   optional focus point of the crop, as CSS object-position.
// The order and shapes are chosen so each category fills complete rows of the four-column grid.
const G = "images/gallery/";
const T = G + "thumbs/";
// A photo has a same-named preview in thumbs/; a figure is a .png with a .jpg preview
const photo = (file, cat, caption, opts = {}) => ({ src: G + file, thumb: T + file, cat, caption, ...opts });
const figure = (name, caption, shape) => ({ src: `${G}${name}.png`, thumb: `${T}${name}.jpg`, cat: "fig", caption, shape });
const GALLERY = [
  // UAV and mapping
  photo("uav-matrice-350.jpg", "uav", "Setting up the DJI Matrice 350 RTK", { shape: "big" }),
  photo("uav-flight-prep.jpg", "uav", "Preparing the UAV for a mapping flight", { shape: "tall", pos: "65% 50%" }),
  photo("uav-matrice-hover.jpg", "uav", "Matrice 350 RTK in a low hover during flight training", { shape: "tall", pos: "62% 50%" }),
  photo("uav-inspire-multispectral.jpg", "uav", "DJI Inspire 2 with the multispectral camera fitted"),
  photo("uav-matrice-closeup.jpg", "uav", "DJI Matrice 350 RTK, close up"),
  photo("uav-field-kit.jpg", "uav", "The field kit: drone, multispectral camera and handheld sensors", { shape: "wide", pos: "50% 78%" }),
  photo("uav-matrice-pad.jpg", "uav", "Matrice 350 RTK ready for take-off"),
  photo("uav-survey-landing.jpg", "uav", "Drone on the ground during the wheat blast survey in Meherpur"),
  photo("gnss-setup.jpg", "uav", "Setting up a GNSS receiver for ground control", { shape: "tall", pos: "25% 50%" }),
  photo("uav-unpacking.jpg", "uav", "Unpacking the drone at the edge of a farmer's field"),
  photo("gnss-base.jpg", "uav", "Emlid RTK GNSS base for ground control", { pos: "50% 30%" }),
  photo("uav-phantom.jpg", "uav", "DJI Phantom 4 and its controller", { pos: "42% 50%" }),
  photo("pix4d-processing.jpg", "uav", "Turning drone images into an orthomosaic in Pix4Dmapper"),
  photo("orthomosaic-rgb.jpg", "uav", "UAV orthomosaic of the wheat experiment", { shape: "wide" }),
  photo("vi-map.jpg", "uav", "Vegetation index map of the same plots", { shape: "wide" }),
  photo("vi-map-wide.jpg", "uav", "Vegetation index map of the trial and the surrounding tree canopy", { shape: "full" }),
  // Field work
  photo("chlorophyll-meter.jpg", "field", "Handheld chlorophyll meter in the field", { shape: "tall" }),
  photo("wheat-plant-height.jpg", "field", "Measuring plant height in the wheat canopy", { shape: "big" }),
  photo("porometer.jpg", "field", "Leaf porometer for stomatal conductance readings", { shape: "tall" }),
  photo("field-treatment.jpg", "field", "Applying treatments to young wheat", { pos: "50% 20%" }),
  photo("wheat-sensor-readings.jpg", "field", "Taking handheld sensor readings at grain filling"),
  photo("wheat-harvest.jpg", "field", "Harvesting the experimental plots", { shape: "wide", pos: "50% 64%" }),
  photo("plots-early.jpg", "field", "Experimental plots early in the season", { shape: "wide", pos: "50% 82%" }),
  photo("plots-heading.jpg", "field", "Wheat plots at heading"),
  photo("grain-drying.jpg", "field", "Grain samples from each plot drying in the sun", { shape: "tall" }),
  photo("plot-weighing.jpg", "field", "Weighing each plot's harvest in the field"),
  photo("wheat-canopy.jpg", "field", "Wheat canopy up close", { shape: "wide", pos: "50% 16%" }),
  photo("seedbed-plots.jpg", "field", "Seedbed marked out into plots before sowing"),
  photo("wheat-blast-heads.jpg", "field", "Bleached wheat heads seen on the wheat blast survey"),
  photo("bird-net.jpg", "field", "Bird netting over the ripening plots", { shape: "wide", pos: "50% 57%" }),
  // Analysis figures
  figure("fig-workflow", "Analytical workflow, from the field experiment and UAV flights to nested cross-validation", "big"),
  figure("fig-double-logistic", "The double-logistic model and the phenology parameters derived from it", "big"),
  figure("fig-canopy-curves", "Fitted canopy curves under irrigation and drought: six vegetation indices, two seasons", "wide"),
  figure("fig-when-to-fly", "When to fly: correlation of each vegetation index with grain yield, by flight date", "wide"),
  figure("fig-treatment-response", "Yield and yield components by nitrogen rate and water regime (mean ± 95% CI)", "wide"),
  figure("fig-auc-vs-yield", "Area under the vegetation-index curve against grain yield, by index", "wide"),
  figure("fig-predictor-blocks", "Predictor blocks compared: R² of the best grain-yield model within each season", "wide"),
  figure("fig-validation-schemes", "Best achievable R² for grain yield, by predictor set and validation scheme", "wide"),
];

const GALLERY_CATS = { all: "All", uav: "UAV & mapping", field: "Field work", fig: "Analysis figures" };

const galleryGrid = document.getElementById("gallery-grid");
const galleryFilters = document.getElementById("gallery-filters");
const gallerySection = document.getElementById("gallery");
let galleryCat = "all";

// ═══════ IMAGE VIEWER ═══════
// Shows one image from a set, with previous / next when the set has more than one.
const lightbox = document.getElementById("lightbox");
const lbImg = lightbox.querySelector("img");
let lbItems = [];
let lbIndex = 0;

function showInLightbox(i) {
  lbIndex = (i + lbItems.length) % lbItems.length;
  const { src, caption, alt } = lbItems[lbIndex];
  lbImg.src = src;
  lbImg.alt = alt || caption;
  lightbox.querySelector(".lb-caption").textContent = caption;
  lightbox.querySelector(".lb-count").textContent = lbItems.length > 1 ? `${lbIndex + 1} / ${lbItems.length}` : "";
}
function openLightbox(items, i) {
  lbItems = items;
  lightbox.classList.toggle("single", items.length < 2);
  showInLightbox(i);
  lightbox.showModal();
}
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target.closest(".lb-close")) lightbox.close();
  else if (e.target.closest(".lb-prev")) showInLightbox(lbIndex - 1);
  else if (e.target.closest(".lb-next")) showInLightbox(lbIndex + 1);
});
lightbox.addEventListener("keydown", (e) => {
  if (lbItems.length < 2) return;
  if (e.key === "ArrowLeft") showInLightbox(lbIndex - 1);
  if (e.key === "ArrowRight") showInLightbox(lbIndex + 1);
});

// Filter buttons, with counts of the images that actually loaded
function renderGalleryFilters() {
  const loaded = [...galleryGrid.children].map((b) => GALLERY[b.dataset.i]);
  const cats = Object.entries(GALLERY_CATS).filter(([key]) => key === "all" || loaded.some((g) => g.cat === key));
  galleryFilters.hidden = cats.length < 3; // "All" plus a single category needs no filter
  galleryFilters.innerHTML = cats
    .map(([key, label]) => {
      const n = key === "all" ? loaded.length : loaded.filter((g) => g.cat === key).length;
      return `<button class="filter${key === galleryCat ? " active" : ""}" data-cat="${key}">${label}<span class="count">${n}</span></button>`;
    })
    .join("");
}
galleryFilters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  galleryCat = btn.dataset.cat;
  galleryFilters.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
  [...galleryGrid.children].forEach((b) => (b.hidden = galleryCat !== "all" && GALLERY[b.dataset.i].cat !== galleryCat));
});

GALLERY.forEach((item, i) => {
  const img = new Image();
  img.alt = item.caption;
  img.decoding = "async";
  if (item.pos) img.style.objectPosition = item.pos;
  img.onload = () => {
    if (img.parentNode) return;
    const btn = document.createElement("button");
    btn.className = ["g-item", item.shape, item.cat === "fig" && "fig"].filter(Boolean).join(" ");
    btn.dataset.i = i;
    const label = document.createElement("span");
    label.textContent = item.caption;
    btn.append(img, label);
    btn.addEventListener("click", () => {
      // Step through whatever the current filter is showing
      const shown = [...galleryGrid.children].filter((b) => !b.hidden);
      openLightbox(shown.map((b) => GALLERY[b.dataset.i]), shown.indexOf(btn));
    });
    btn.hidden = galleryCat !== "all" && item.cat !== galleryCat;
    // Keep the order of the GALLERY list regardless of load order
    const next = [...galleryGrid.children].find((c) => +c.dataset.i > i);
    galleryGrid.insertBefore(btn, next || null);
    gallerySection.hidden = false;
    document.querySelector(".nav-gallery").classList.add("show");
    renderGalleryFilters();
  };
  // No preview file: fall back to the full image
  let triedFull = !item.thumb;
  img.onerror = () => {
    if (triedFull) return;
    triedFull = true;
    img.src = item.src;
  };
  img.src = item.thumb || item.src;
});

// ═══════ PHOTO STRIP ═══════
// The gallery's photos (not the charts) drift right to left below the About section,
// alternating UAV and field shots. It pauses on hover, and a photo opens in the viewer.
// It stays hidden until its images have loaded, so the loop starts at its final width.
const strip = document.getElementById("photo-strip");
const stripTrack = strip.querySelector(".strip-track");
const stripOf = (cat) => GALLERY.filter((g) => g.cat === cat && g.shape !== "full");
const stripItems = stripOf("uav").flatMap((g, i) => [g, stripOf("field")[i]]).filter(Boolean);
let stripPending = stripItems.length * 2;
function stripImageSettled() {
  if (--stripPending || !stripTrack.children.length) return;
  strip.hidden = false;
  stripTrack.style.animationDuration = `${Math.round(stripTrack.scrollWidth / 2 / 40)}s`; // about 40 px a second
}
// Two identical runs of photos, so the loop has no seam
for (const copy of [0, 1]) {
  stripItems.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.className = "strip-item";
    if (copy) {
      btn.tabIndex = -1;
      btn.setAttribute("aria-hidden", "true");
    }
    const img = new Image();
    img.alt = copy ? "" : item.caption;
    img.onload = stripImageSettled;
    img.onerror = () => {
      btn.remove();
      stripImageSettled();
    };
    img.src = item.thumb || item.src;
    btn.append(img);
    btn.addEventListener("click", () => openLightbox(stripItems, i));
    stripTrack.append(btn);
  });
}

// Research figures open in the same viewer
const studyFigures = [...document.querySelectorAll(".figures img")];
studyFigures.forEach((img, i) =>
  img.addEventListener("click", () =>
    openLightbox(
      studyFigures.map((f) => ({ src: f.src, alt: f.alt, caption: f.closest("figure").querySelector("figcaption").textContent })),
      i
    )
  )
);

// ═══════ DRONE SURVEY (hero decoration) ═══════
// A survey drone cruises across the top of the hero and scans a wheat field at the bottom.
// The field is drawn in perspective, as a trapezium lying on the ground: wide at the near
// edge, narrower and with shorter rows further away. Plots the scan line has passed switch
// from plain green to vegetation-index colours. Colours are illustrative only, not research data.
// A weather station, GNSS tripod, wheat and trees stand along the far edge of the field.
(function droneScan() {
  const svg = document.getElementById("scan-svg");
  if (!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const $ = (sel) => svg.querySelector(sel);
  const rgb = $("#plots-rgb"), vi = $("#plots-vi"), bed = $(".scan-bed");
  const drone = $("#drone"), art = $("#drone-art"), beam = $("#beam"), line = $("#scan-line"), reveal = $("#scan-reveal");
  // Photo-backed hero (HERO PAINTING in styles.css): the scan reveals a false-colour copy of the painting
  const photoScan = document.querySelector(".hero-photo-scan"), photoLine = document.querySelector(".hero-photo-line");
  const viColours = ["#d7301f", "#fc8d59", "#fdcc8a", "#d9ef8b", "#91cf60", "#1a9850"];
  const rowEdges = [0, 0.17, 0.38, 0.65, 1]; // depth of each row boundary: far rows look shorter
  let W = 1200, H = 700, fieldTop = 620, fieldBottom = 706, topHalf = 470, botHalf = 640, droneY = 50, scale = 1, navOffset = 0;

  // A point on the field. u runs from -1 (left edge) to 1 (right edge); v from 0 (far edge) to 1 (near edge).
  const fx = (u, v) => W / 2 + u * (topHalf + (botHalf - topHalf) * v);
  const fy = (v) => fieldTop + (fieldBottom - fieldTop) * v;
  const pt = (u, v) => `${fx(u, v).toFixed(1)},${fy(v).toFixed(1)}`;

  function build() {
    const box = svg.getBoundingClientRect();
    W = Math.max(320, Math.round(box.width));
    H = Math.max(400, Math.round(box.height));
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    scale = W < 700 ? 0.62 : W < 1100 ? 0.82 : 1;
    navOffset = parseFloat(getComputedStyle(svg).getPropertyValue("--drone-offset")) || 0; // room for a floating menu
    droneY = (W < 700 ? 34 : 50) + navOffset;
    fieldTop = H - (W < 700 ? 64 : 84);
    fieldBottom = H + 6;
    botHalf = W / 2 + 40; // the near edge runs off both sides of the screen
    topHalf = botHalf * 0.74;
    bed.setAttribute("points", [pt(-1.02, -0.06), pt(1.02, -0.06), pt(1.02, 1), pt(-1.02, 1)].join(" "));
    rgb.textContent = "";
    vi.textContent = "";
    const cols = Math.max(8, Math.round((topHalf + botHalf) / 36));
    const step = 2 / cols;
    let cropRows = "";
    let seed = 7;
    const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let r = 0; r < rowEdges.length - 1; r++) {
      const depth = rowEdges[r + 1] - rowEdges[r];
      const v0 = rowEdges[r] + depth * 0.07, v1 = rowEdges[r + 1] - depth * 0.07;
      for (let c = 0; c < cols; c++) {
        const u0 = -1 + (c + 0.09) * step, u1 = -1 + (c + 0.91) * step;
        const base = document.createElementNS(NS, "polygon");
        base.setAttribute("points", [pt(u0, v0), pt(u1, v0), pt(u1, v1), pt(u0, v1)].join(" "));
        base.setAttribute("class", "plot");
        base.setAttribute("fill-opacity", 0.8 + r * 0.066); // hazier with distance
        rgb.appendChild(base);
        // two drill rows down each plot
        for (const f of [1 / 3, 2 / 3]) cropRows += `M${pt(u0 + (u1 - u0) * f, v0)}L${pt(u0 + (u1 - u0) * f, v1)}`;
        const idx = Math.min(viColours.length - 1, Math.floor(rand() * 3.2 + (Math.sin(c / 5 + r) + 1) * 1.4));
        const v = base.cloneNode();
        v.setAttribute("class", "plot-vi");
        v.setAttribute("fill", viColours[idx]);
        v.removeAttribute("fill-opacity");
        vi.appendChild(v);
      }
    }
    const drills = document.createElementNS(NS, "path");
    drills.setAttribute("class", "plot-rows");
    drills.setAttribute("d", cropRows);
    rgb.appendChild(drills);

    // Landscape props stand along the far edge of the field; the satellite sits in open sky
    // above the text, and is hidden on narrow screens where there is no room for it.
    const k = W < 700 ? 0.6 : W < 1100 ? 0.8 : 1;
    const side = Math.max(16, (W - 1100) / 2);
    const put = (id, x, y = fieldTop + 3, flip = 1) =>
      $(id).setAttribute("transform", `translate(${Math.round(x)},${Math.round(y)}) scale(${k * flip},${k})`);
    put("#p-wheat-l", W * 0.035 + 10);
    put("#p-trees", W * 0.15);
    put("#p-gnss", W * 0.43);
    put("#p-wheat-r", W * 0.72, undefined, -1);
    put("#p-station", W - Math.max(34, side * 0.5));
    put("#p-sat", W - side - 70, 132 + navOffset);
    $("#p-sat").style.display = W < 900 ? "none" : "";
    if (reduceMotion) place(W * 0.68, 0, 0); // no animation: park the drone mid-scan
  }

  function place(x, bob, tilt) {
    const y = droneY + bob;
    drone.setAttribute("transform", `translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${scale})`);
    art.setAttribute("transform", `rotate(${tilt.toFixed(2)})`);
    // The scan line crosses the field at u, following the perspective from the far edge to the near edge
    const u = (x - W / 2) / ((topHalf + botHalf) / 2);
    const over = Math.abs(u) < 1.03; // only light the field while the drone is above it
    const top = y + 36 * scale, du = 0.085;
    beam.setAttribute("points", over ? `${x - 5},${top} ${x + 5},${top} ${pt(u + du, 0)} ${pt(u + du, 1)} ${pt(u - du, 1)} ${pt(u - du, 0)}` : "");
    line.setAttribute("x1", fx(u, 0)); line.setAttribute("y1", fy(0));
    line.setAttribute("x2", fx(u, 1)); line.setAttribute("y2", fy(1));
    line.style.visibility = over ? "" : "hidden";
    // Everything to the left of the scan line has been scanned
    const done = Math.max(-1.1, Math.min(1.1, u));
    reveal.setAttribute("points", [pt(-1.1, -0.1), pt(done, -0.1), pt(done, 1), pt(-1.1, 1)].join(" "));
    if (photoScan) {
      // The false-colour strip trails the drone and fades back into the painting (mask in styles.css)
      photoScan.style.setProperty("--scan-x", `${x.toFixed(1)}px`);
      photoLine.style.transform = `translateX(${x.toFixed(1)}px)`;
    }
  }

  build();
  // Rebuild whenever the hero changes size: window resize, or text reflow once web fonts load
  let resizeTimer;
  new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(build, 150); }).observe(svg);

  if (reduceMotion) return;
  const duration = 14000, hold = 1800;
  let t0 = null;
  function frame(now) {
    if (t0 === null) t0 = now;
    const t = ((now - t0) % (duration + hold)) / duration;
    const x = -160 + (W + 320) * Math.min(t, 1);
    place(x, Math.sin(now / 520) * 3, t < 1 ? 3 + Math.sin(now / 900) * 0.8 : 0);
    vi.style.opacity = t > 1 ? Math.max(0, 1 - ((t - 1) * duration) / hold * 1.6) : 1;
    if (photoScan) photoScan.style.opacity = vi.style.opacity;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
