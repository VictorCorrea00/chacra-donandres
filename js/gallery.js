/**
 * Galeria Filtrable con Lightbox Modal (Editorial Luxury)
 */
const GalleryController = {
  
  items: [
    { cat: "bodas", title: "Ceremonia al Atardecer", desc: "Altar natural en el parque arbolado", img: "assets/img/boda.webp" },
    { cat: "salones", title: "Salón Principal Climatizado", desc: "Mesas vestidas y ambientación cálida", img: "assets/img/salon-principal.webp" },
    { cat: "15anos", title: "Pista de Baile & Robótica", desc: "Luces móviles y efectos para los 15", img: "assets/img/pista-baile.webp" },
    { cat: "salones", title: "Salón El Horno", desc: "Espacio criollo con parrillero techado", img: "assets/img/salon-horno.webp" },
    { cat: "parque", title: "Piscina Techada Climatizada", desc: "Diversión asegurada todo el año", img: "assets/img/piscina-Don-Andres.webp" },
    { cat: "parque", title: "Granja Interactiva - Llamas", desc: "Contacto con la naturaleza", img: "assets/img/LLAMA01.webp" },
    { cat: "parque", title: "Granja Interactiva - Ovejas", desc: "Nuestros animales", img: "assets/img/OVEJA02.webp" },
    { cat: "parque", title: "Aves de la Chacra", desc: "Pavos reales y más", img: "assets/img/PAVO.webp" },
    { cat: "parque", title: "Tirolesa y Juegos", desc: "Actividades recreativas infantiles", img: "assets/img/JUEGOS004-1.webp" },
    { cat: "parque", title: "Patio y Carreta Rústica", desc: "Rincones ideales para fotos", img: "assets/img/carreta30.webp" }
  ],


  init() {
    this.renderGallery("all");
    this.setupLightboxEvents();
    this.setupFilters();
  },

  setupFilters() {
    const filters = document.querySelectorAll('#galleryFilters .filter-btn');
    filters.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Reset styles
        filters.forEach(b => {
          b.classList.remove("active", "border-brand-text");
          b.classList.add("text-brand-text/50");
          b.classList.remove("text-brand-text");
        });
        // Activate current
        e.target.classList.add("active", "border-b", "border-brand-text", "text-brand-text");
        e.target.classList.remove("text-brand-text/50");
        
        this.renderGallery(e.target.dataset.filter);
      });
    });
  },

  renderGallery(filter = "all") {
    const container = document.getElementById("galleryGrid");
    if (!container) return;

    const filtered = filter === "all" ? this.items : this.items.filter(item => item.cat === filter);

    container.innerHTML = filtered.map((item, idx) => `
      <div 
        class="relative group cursor-pointer mb-6 break-inside-avoid border border-brand-border fade-up-slow"
        onclick="GalleryController.openLightbox('${item.img}')">
        <img src="${item.img}" alt="${item.title}" class="w-full h-auto object-cover transition duration-700 group-hover:opacity-90"  />
        <div class="absolute inset-0 bg-brand-bg/10 group-hover:bg-transparent transition duration-700"></div>
        
        <div class="absolute bottom-0 inset-x-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/80 to-transparent">
          <span class="text-[9px] uppercase font-bold tracking-[0.2em] text-white/70">${item.cat}</span>
          <h4 class="font-serif text-2xl text-white mt-1">${item.title}</h4>
        </div>
      </div>
    `).join("");

    // Trigger animations for new items
    if (window.gsap) {
      gsap.from('#galleryGrid > div', { opacity: 0, y: 15, duration: 0.5, stagger: 0.05, ease: 'power1.out' });
    }
  },

  openLightbox(imgSrc) {
    const modal = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImg");

    if (!modal || !img) return;

    img.src = imgSrc;
    modal.classList.remove("opacity-0", "pointer-events-none");
    document.body.style.overflow = "hidden";
  },

  closeLightbox() {
    const modal = document.getElementById("lightbox");
    if (!modal) return;
    modal.classList.add("opacity-0", "pointer-events-none");
    document.body.style.overflow = "auto";
  },

  setupLightboxEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeLightbox();
    });
    
    const closeBtn = document.getElementById("closeLightbox");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeLightbox());
    }
  }
};
