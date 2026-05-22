/* ═══════════════════════════════════════════════
   PROJECTS PAGE — projects.js
   ═══════════════════════════════════════════════ */

/* ──────────────────────────────────────────────
   1. DATA
   Add / edit your projects here.
   category must match one of the CATEGORIES keys.
   roleColor is a CSS colour for the role pill.
   image: path to your game screenshot (optional).
────────────────────────────────────────────────*/
const CATEGORIES = {
  LD:  { label: "LD",  fullName: "Level Design"        },
  GPP: { label: "GPP", fullName: "Game Play Programming"},
  TGD: { label: "TGD", fullName: "Technical Game Design"},
  GD:  { label: "GD",  fullName: "Game Design"         },
};

// Role pill colours (one per role string)
const ROLE_COLORS = {
  "Level Designer":        "#4a90d9",
  "GPP":                   "#27ae60",
  "TGD":                   "#e67e22",
  "GD":                    "#8e44ad",
  "Game Designer":         "#8e44ad",
  "Technical Game Designer":"#e67e22",
};

const PROJECTS = [
  {
    id: 1,
    title: "Clair Obscur : Expedition 33 (24 Avril 2025)",
    category: "LD",
    role: "Level Designer",
    image: "", // e.g. "assets/projects/img/clair_obscur.jpg"
    description: "Clair Obscur est un RPG au tour par tour qui inclut des aspects en temps réel tels que des événements rapides et des actions basées sur le timing, tant en attaque qu'en défense. Lors des phases de défense, toutes les attaques adverses peuvent être soit esquivées, soit parées. L'équipe de développement principale est composée d'environ 30 personnes, dont 25 à Montpellier et 5 à Paris.",
  },
  {
    id: 2,
    title: "Avowed (18 Février 2025)",
    category: "GPP",
    role: "GPP",
    image: "",
    description: "Avowed est un jeu de rôle à la première personne qui se déroule dans le monde d'Eora, le même décor que la série Pillars of Eternity. Bien qu'Avowed se déroule dans le même univers que Pillars of Eternity, le gameplay n'est pas le même, et il n'y a aucun contact avec la série Pillars of Eternity en termes d'histoire.",
  },
  {
    id: 3,
    title: "Donkey Kong Country Returns HD (16 Janvier 2025)",
    category: "TGD",
    role: "TGD",
    image: "",
    description: "Le jeu débute sur un nouveau groupe de créatures maléfiques, appelés les Tikis, qui se réveillent sur l'île de Donkey Kong pour y hypnotiser les animaux afin qu'ils puissent s'emparer de la réserve de bananes de Donkey Kong.",
  },
  {
    id: 4,
    title: "Ninja Gaiden 2 Black (23 Janvier 2025)",
    category: "GD",
    role: "GD",
    image: "",
    description: "Ninja Gaiden II's new combat system allows the player character Ryu to dismember his enemies, severing their limbs and leaning their bodies apart covering his weapon and everything around with blood. Dismemberment will weaken or slow down an enemy, depending on if an arm or leg is severed.",
  },
  // ── Add more projects below ──
  // {
  //   id: 5,
  //   title: "My Next Project",
  //   category: "LD",   // LD | GPP | TGD | GD
  //   role: "Level Designer",
  //   image: "assets/projects/img/my_project.jpg",
  //   description: "Description of your project...",
  // },
];

/* ──────────────────────────────────────────────
   2. STATE
────────────────────────────────────────────────*/
let activeFilter = null; // null = show all

/* ──────────────────────────────────────────────
   3. RENDER BLASONS
────────────────────────────────────────────────*/
function renderBlasons() {
  const col = document.getElementById("blasonCol");
  col.innerHTML = "";

  Object.entries(CATEGORIES).forEach(([key, cat]) => {
    const item = document.createElement("div");
    item.className = "blason-item";
    item.dataset.category = key;
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", `Filter: ${cat.fullName}`);
    item.setAttribute("tabindex", "0");

    const isActive = activeFilter === key;

    item.innerHTML = `
      <img src="assets/projects/${isActive
        ? "ui_projects_blason_selected.png"
        : "ui_projects_blason_unselected.png"}"
        alt="${cat.fullName}" />
      <span class="blason-label">${cat.label}</span>
    `;

    item.addEventListener("click", () => onBlasonClick(key));
    item.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") onBlasonClick(key); });

    col.appendChild(item);
  });
}

function onBlasonClick(key) {
  // Toggle: clicking the active filter deselects it (show all)
  activeFilter = activeFilter === key ? null : key;
  renderBlasons();
  filterCards();
  // Reset scroll
  document.getElementById("cardsScroll").scrollTop = 0;
  updateHandle();
}

/* ──────────────────────────────────────────────
   4. RENDER CARDS
────────────────────────────────────────────────*/
function renderCards() {
  const scroll = document.getElementById("cardsScroll");
  scroll.innerHTML = "";

  PROJECTS.forEach(p => {
    const roleColor = ROLE_COLORS[p.role] || "#4a90d9";

    const card = document.createElement("div");
    card.className = "project-card";
    card.dataset.category = p.category;

    card.innerHTML = `
      <img src="assets/projects/ui_projects_box_background.png" alt="" aria-hidden="true" class="card-bg" />
      <div class="card-inner">

        <div class="card-img-wrap">
          <img src="assets/projects/${p.image
            ? "ui_projects_image_selected.png"
            : "ui_projects_image_unselected.png"}"
            alt="" class="card-img-frame" />
          ${p.image
            ? `<img src="${p.image}" alt="${p.title}" class="card-game-img" />`
            : ""}
        </div>

        <div class="card-text">
          <div class="card-title">${p.title}</div>

          <div class="card-role-wrap" style="min-width:${Math.max(60, p.role.length * 7)}px">
            <img src="assets/projects/ui_projectsblogs_box_role_background.png"
              alt="" class="card-role-bg"
              style="width:${Math.max(70, p.role.length * 8)}px; height:auto;" />
            <span class="card-role-label" style="color:${roleColor}">${p.role}</span>
          </div>

          <p class="card-desc">${p.description}</p>
        </div>

      </div>
    `;

    scroll.appendChild(card);
  });
}

function filterCards() {
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    if (!activeFilter || card.dataset.category === activeFilter) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
  updateHandle();
}

/* ──────────────────────────────────────────────
   5. CUSTOM SCROLLBAR
────────────────────────────────────────────────*/
function updateHandle() {
  const scroll  = document.getElementById("cardsScroll");
  const track   = document.getElementById("scrollTrack");
  const handle  = document.getElementById("scrollHandle");

  const trackH  = track.clientHeight;
  const handleH = handle.clientHeight;
  const maxTop  = trackH - handleH;

  const ratio = scroll.scrollHeight > scroll.clientHeight
    ? scroll.scrollTop / (scroll.scrollHeight - scroll.clientHeight)
    : 0;

  handle.style.top = (ratio * maxTop) + "px";
}

// Sync scroll → handle position
document.getElementById("cardsScroll").addEventListener("scroll", updateHandle);

// Drag handle → scroll content
(function initDrag() {
  const handle = document.getElementById("scrollHandle");
  const track  = document.getElementById("scrollTrack");
  const scroll = document.getElementById("cardsScroll");

  let dragging = false;
  let startY   = 0;
  let startTop = 0;

  function onDown(e) {
    dragging = true;
    startY   = e.touches ? e.touches[0].clientY : e.clientY;
    startTop = parseInt(handle.style.top || "0", 10);
    e.preventDefault();
  }

  function onMove(e) {
    if (!dragging) return;
    const clientY  = e.touches ? e.touches[0].clientY : e.clientY;
    const delta    = clientY - startY;
    const trackH   = track.clientHeight;
    const handleH  = handle.clientHeight;
    const maxTop   = trackH - handleH;
    const newTop   = Math.max(0, Math.min(maxTop, startTop + delta));
    const ratio    = maxTop > 0 ? newTop / maxTop : 0;

    scroll.scrollTop = ratio * (scroll.scrollHeight - scroll.clientHeight);
  }

  function onUp() { dragging = false; }

  handle.addEventListener("mousedown",  onDown);
  handle.addEventListener("touchstart", onDown, { passive: false });
  window.addEventListener("mousemove",  onMove);
  window.addEventListener("touchmove",  onMove, { passive: false });
  window.addEventListener("mouseup",    onUp);
  window.addEventListener("touchend",   onUp);

  // Click on track to jump
  track.addEventListener("click", e => {
    if (e.target === handle) return;
    const rect    = track.getBoundingClientRect();
    const clickY  = e.clientY - rect.top;
    const trackH  = track.clientHeight;
    const handleH = handle.clientHeight;
    const maxTop  = trackH - handleH;
    const newTop  = Math.max(0, Math.min(maxTop, clickY - handleH / 2));
    const ratio   = maxTop > 0 ? newTop / maxTop : 0;
    scroll.scrollTop = ratio * (scroll.scrollHeight - scroll.clientHeight);
  });
})();

/* ──────────────────────────────────────────────
   6. INIT
────────────────────────────────────────────────*/
renderBlasons();
renderCards();
updateHandle();

// Re-calc handle on window resize
window.addEventListener("resize", updateHandle);
