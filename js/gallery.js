/**
 * Galeria Filtrable con Lightbox Modal
 */
const GalleryController = {
  items: [
    { cat: "bodas", title: "Ceremonia al Atardecer", desc: "Altar natural en el parque arbolado", img: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-FrNbIHWhMTJ-scene.jpg" },
    { cat: "salones", title: "Salon Principal Climatizado", desc: "Mesas vestidas y ambientacion calida", img: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-EAety5uSDAc-scene.jpg" },
    { cat: "quince", title: "Pista de Baile & Robotica", desc: "Luces moviles y efectos para los 15", img: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-LU2gQ_j4btj-scene.jpg" },
    { cat: "salones", title: "Salon El Horno", desc: "Espacio criollo con parrillero techado", img: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-H-qxZamYcv1-scene.jpg" },
    { cat: "parque", title: "El Granero & Senderos", desc: "Escenario para sesiones de fotos", img: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-9v4WiS7A0K9-scene.jpg" },
    { cat: "parque", title: "Cancha Deportiva & Barbacoa", desc: "Espacio recreativo al aire libre", img: "https://gc.360-data.com/tours/avNLpjngi/avNLpjngi-9WMkC7dKInv-scene.jpg" }
  ],

  init() {
    this.renderGallery("all");
    this.setupLightboxEvents();
  },

  renderGallery(filter = "all") {
    const container = document.getElementById("galleryGrid");
    if (!container) return;

    const filtered = filter === "all" ? this.items : this.items.filter(item => item.cat === filter);

    container.innerHTML = filtered.map((item, idx) => `
      <div 
        class="gallery-card bg-slate-900 border border-white/5 shadow-xl reveal d${(idx % 3) + 1}"
        onclick="GalleryController.openLightbox('${item.img}', '${item.title}', '${item.desc}')">
        <div class="aspect-[4/3] overflow-hidden bg-slate-950">
          <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover" loading="lazy" />
        </div>
        <div class="gallery-overlay">
          <span class="text-[10px] uppercase font-bold tracking-widest text-yellow-400">${item.cat}</span>
          <h4 class="font-serif text-xl font-bold text-white">${item.title}</h4>
          <p class="text-xs text-slate-300">${item.desc}</p>
        </div>
      </div>
    `).join("");

    if (window.AppController && AppController.observeReveals) {
      AppController.observeReveals();
    }
  },

  filterCategory(cat, btn) {
    document.querySelectorAll(".gallery-filter-btn").forEach(b => b.classList.remove("active", "border-yellow-500", "text-yellow-400"));
    btn.classList.add("active", "border-yellow-500", "text-yellow-400");
    this.renderGallery(cat);
  },

  openLightbox(imgSrc, title, desc) {
    const modal = document.getElementById("lightboxModal");
    const img = document.getElementById("lightboxImg");
    const titleEl = document.getElementById("lightboxTitle");
    const descEl = document.getElementById("lightboxDesc");

    if (!modal || !img) return;

    img.src = imgSrc;
    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = desc;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  },

  closeLightbox() {
    const modal = document.getElementById("lightboxModal");
    if (!modal) return;
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  },

  setupLightboxEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeLightbox();
      }
    });
  }
};
