function showPage(name) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".nav-links a")
    .forEach((a) => a.classList.remove("active"));
  document.getElementById("page-" + name).classList.add("active");
  document.getElementById("nav-" + name).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelectorAll("#page-" + name + " .fade-up").forEach((el) => {
    el.style.animation = "none";
    void el.offsetHeight;
    el.style.animation = "";
  });
}
window.addEventListener("scroll", () => {
  document
    .getElementById("main-nav")
    .classList.toggle("scrolled", window.scrollY > 20);
});
function filterNews(btn, cat) {
  document
    .querySelectorAll(".filter-pill")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document
    .querySelectorAll("#news-featured .card, #news-grid .card")
    .forEach((card) => {
      const show = cat === "all" || card.dataset.cat === cat;
      card.style.display = show ? "" : "none";
    });
}
function loadMoreNews() {
  const btn = document.querySelector(".btn-outline");
  btn.textContent = "Chargement…";
  setTimeout(() => {
    btn.textContent = "Tout est chargé ✓";
    btn.disabled = true;
  }, 1000);
}
(function buildCalendar() {
  const grid = document.getElementById("cal-grid");
  if (!grid) return;
  const eventDays = [22, 29];
  const today = 18;
  const offset = 6;
  for (let i = 0; i < offset; i++) {
    const d = document.createElement("div");
    d.className = "cal-day other-month";
    d.textContent = 28 - offset + i + 1;
    grid.appendChild(d);
  }
  for (let d = 1; d <= 31; d++) {
    const el = document.createElement("div");
    el.className = "cal-day";
    if (d === today) el.classList.add("today");
    else if (eventDays.includes(d)) el.classList.add("has-event");
    el.textContent = d;
    el.addEventListener("click", () => {
      document
        .querySelectorAll(".cal-day")
        .forEach((x) => x.classList.remove("selected"));
      el.classList.add("selected");
    });
    grid.appendChild(el);
  }
})();
const INSCRIPTION_URL = "https://forms.gle/TdqCGZ7cHiKkg6Hk6";
const galleryItems = [
  {
    url: "images/photo01.jpeg",
    title: "visite bekya pay",
    date: "Dec 2026",
    height: 240,
  },
  {
    url: "images/photo02.jpeg",
    title: "HOO",
    date: "Mar 2026",
    cat: "solidarity",
    height: 200,
  },
  {
    url: "images/photo03.jpeg",
    title: "Débat inter-classes — Amphithéâtre",
    date: "Fév 2026",
    cat: "school",
    height: 280,
  },
  {
    url: "images/photo04.jpeg",
    title: "Partenariat Maison de Quartier Ibrahimieh",
    date: "Fév 2026",
    cat: "community",
    height: 220,
  },
  {
    url: "images/photo05.jpeg",
    title: "Distribution kits hygiène — Ramadan",
    date: "Fév 2026",
    cat: "solidarity",
    height: 200,
  },
  {
    url: "images/photo06.jpeg",
    title: "Visite maison de retraite Sainte-Catherine",
    date: "Jan 2026",
    cat: "community",
    height: 260,
  },
  {
    url: "images/photo07.jpeg",
    title: "Journée Don du Sang",
    date: "Mar 2026",
    cat: "events",
    height: 200,
  },
  {
    url: "images/photo08.jpeg",
    title: "Atelier écriture créative",
    date: "Fév 2026",
    cat: "school",
    height: 240,
  },
  {
    url: "images/photo09.jpeg",
    title: "Nettoyage Corniche Azarita",
    date: "Jan 2026",
    cat: "solidarity",
    height: 220,
  },
  {
    url: "images/photo10.jpeg",
    title: "Concert de bienfaisance — répétition",
    date: "Mar 2026",
    cat: "events",
    height: 260,
  },
  {
    url: "images/photo11.jpeg",
    title: "Rallye sportif solidaire",
    date: "Jan 2026",
    cat: "events",
    height: 200,
  },
  {
    url: "images/photo12.jpeg",
    title: "Signatures partenariats 2026",
    date: "Jan 2026",
    cat: "events",
    height: 220,
  },
  {
    url: "images/photo13.jpeg",
    title: "Journée de la femme NDS",
    date: "Mar 2026",
    cat: "school",
    height: 240,
  },
  {
    url: "images/photo14.jpeg",
    title: "Cuisine solidaire — repas chauds",
    date: "Fév 2026",
    cat: "solidarity",
    height: 200,
  },
  {
    url: "images/photo15.jpeg",
    title: "Forum Jeunesse — préparation",
    date: "Mar 2026",
    cat: "events",
    height: 260,
  },
  {
    url: "images/photo16.jpeg",
    title: "Campagne sensibilisation santé mentale",
    date: "Fév 2026",
    cat: "solidarity",
    height: 220,
  },
  {
    url: "images/photo17.jpeg",
    title: "Inauguration salle IJ-NDS",
    date: "Jan 2026",
    cat: "school",
    height: 200,
  },
  {
    url: "images/photo18.jpeg",
    title: "Sortie culturelle — Bibliothèque d'Alexandrie",
    date: "Jan 2026",
    cat: "events",
    height: 240,
  },
];

let currentGalleryFilter = "all";
let lightboxIndex = 0;

function buildGallery(filter) {
  const masonry = document.getElementById("gallery-masonry");
  masonry.innerHTML = "";
  const filtered =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((i) => i.cat === filter);
  filtered.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "gallery-item fade-up";
    div.style.animationDelay = idx * 0.04 + "s";

    const imgUrl = item.url;

    // Each photo is wrapped in an <a> that opens the full image in a new tab
    div.innerHTML = `
      <div class="gallery-item-inner">
        <a href="${imgUrl}" target="_blank" rel="noopener noreferrer" title="${item.title}">
          <img
            class="gallery-photo"
            src="${imgUrl}"
            alt="${item.title}"
            loading="lazy"
            style="width:100%; height:${item.height}px; object-fit:cover; display:block;"
          />
          <div class="gallery-item-overlay">
            <h4>${item.title}</h4>
            <span>${item.date}</span>
          </div>
        </a>
      </div>`;
    masonry.appendChild(div);
  });
}
buildGallery("all");

function filterGallery(btn, cat) {
  document
    .querySelectorAll(".gallery-tab")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  currentGalleryFilter = cat;
  buildGallery(cat);
}

let lightboxItems = [];
function openLightbox(idx, items) {
  lightboxItems = items;
  lightboxIndex = idx;
  renderLightbox();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function renderLightbox() {
  const item = lightboxItems[lightboxIndex];
  const lb = document.getElementById("lightbox-img");
  // Replace emoji text with a real <img> in the lightbox
  lb.innerHTML = `<img src="${item.url}" alt="${item.title}" style="max-width:90vw; max-height:70vh; border-radius:12px; display:block;" />`;
  document.getElementById("lightbox-title").textContent = item.title;
  document.getElementById("lightbox-date").textContent = item.date;
}
function closeLightbox(e) {
  if (e.target === document.getElementById("lightbox")) closeLightboxBtn();
}
function closeLightboxBtn() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function lightboxNav(dir) {
  lightboxIndex =
    (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  renderLightbox();
}
document.addEventListener("keydown", (e) => {
  if (!document.getElementById("lightbox").classList.contains("open")) return;
  if (e.key === "Escape") closeLightboxBtn();
  if (e.key === "ArrowLeft") lightboxNav(-1);
  if (e.key === "ArrowRight") lightboxNav(1);
});
