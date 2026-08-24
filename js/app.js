/**
 * Orquestador Principal - Chacra Don Andres
 */
const AppController = {
  observer: null,

  init() {
    this.setupScrollObserver();
    this.setupNavbarBehavior();
    this.setupMobileMenu();
    this.renderSpaces();
    this.renderTestimonials();
    this.renderFaqs();

    TourController.init();
    GalleryController.init();
    WeatherWidget.init();
  },

  setupScrollObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    this.observeReveals();
  },

  observeReveals() {
    document.querySelectorAll(".fade-up-slow").forEach(el => {
      if (this.observer) this.observer.observe(el);
    });
  },

  setupNavbarBehavior() {
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        navbar.classList.add("nav-scrolled");
      } else {
        navbar.classList.remove("nav-scrolled");
      }
    });
  },

  setupMobileMenu() {
    const toggleBtn = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  },

  closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) mobileMenu.classList.add("hidden");
  },

  switchEventTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));

    const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
    const activePane = document.getElementById(`pane-${tabId}`);

    if (activeBtn) activeBtn.classList.add("active");
    if (activePane) activePane.classList.add("active");
  },

  renderSpaces() {
    const container = document.getElementById("spacesContainer");
    if (!container) return;

    container.innerHTML = ChacraData.spaces.map((sp, idx) => `
      <div class="glass-card rounded-3xl overflow-hidden reveal d${(idx % 3) + 1} flex flex-col justify-between">
        <div>
          <div class="aspect-[16/10] overflow-hidden relative group">
            <img src="${sp.image}" alt="${sp.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" loading="lazy" />
            <div class="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md border border-yellow-500/30 text-yellow-400 text-[11px] font-bold px-3 py-1 rounded-full">
              ${sp.capacity}
            </div>
          </div>
          <div class="p-6 space-y-3">
            <h3 class="font-serif text-2xl font-bold text-white">${sp.title}</h3>
            <p class="text-slate-400 text-xs leading-relaxed">${sp.description}</p>
            <ul class="space-y-1.5 pt-2 text-xs text-slate-300">
              ${sp.features.map(f => `<li class="flex items-center gap-2"><i class="fa-solid fa-check text-yellow-400 text-[10px]"></i> ${f}</li>`).join("")}
            </ul>
          </div>
        </div>
        <div class="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
          <button 
            onclick="TourController.switchScene('${sp.sceneId}'); document.getElementById('tour360').scrollIntoView({behavior:'smooth'});"
            class="text-xs font-bold text-yellow-400 hover:text-yellow-300 flex items-center gap-1.5 transition">
            <i class="fa-solid fa-street-view"></i> Ver en Tour 360°
          </button>
          <a 
            href="https://wa.me/59892504871?text=Hola%20Karen,%20me%20interesa%20conocer%20el%20espacio%20${encodeURIComponent(sp.title)}%20en%20Chacra%20Don%20Andr%C3%A9s" 
            target="_blank" 
            class="text-xs font-semibold text-slate-400 hover:text-white transition">
            Consultar <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
        </div>
      </div>
    `).join("");
  },

  renderTestimonials() {
    const container = document.getElementById("testimonialsContainer");
    if (!container) return;

    container.innerHTML = ChacraData.testimonials.map((t, idx) => `
      <div class="glass-card rounded-3xl p-7 space-y-5 reveal d${idx + 1} flex flex-col justify-between">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex gap-1 text-yellow-400 text-sm">
              ${'★'.repeat(t.rating)}
            </div>
            <span class="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <i class="fa-solid fa-circle-check text-[9px] mr-1"></i>Verificado
            </span>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed italic font-light">"${t.comment}"</p>
        </div>
        <div class="flex items-center gap-3 pt-4 border-t border-white/5">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-slate-950 font-bold text-sm">
            ${t.avatar}
          </div>
          <div>
            <div class="font-semibold text-white text-sm">${t.name}</div>
            <div class="text-slate-400 text-xs">${t.event} &middot; ${t.date}</div>
          </div>
        </div>
      </div>
    `).join("");
  },

  renderFaqs() {
    const container = document.getElementById("faqAccordion");
    if (!container) return;

    container.innerHTML = ChacraData.faqs.map((faq, idx) => `
      <div class="glass-card rounded-2xl overflow-hidden border border-white/5">
        <button 
          onclick="AppController.toggleFaq(${idx})"
          class="w-full text-left p-5 text-sm font-semibold text-white flex items-center justify-between gap-4 hover:text-yellow-400 transition">
          <span>${faq.q}</span>
          <i id="faq-icon-${idx}" class="fa-solid fa-chevron-down text-yellow-500 text-xs transition duration-300"></i>
        </button>
        <div id="faq-ans-${idx}" class="hidden p-5 pt-0 text-xs text-slate-400 leading-relaxed border-t border-white/5">
          ${faq.a}
        </div>
      </div>
    `).join("");
  },

  toggleFaq(idx) {
    const ans = document.getElementById(`faq-ans-${idx}`);
    const icon = document.getElementById(`faq-icon-${idx}`);
    if (ans && icon) {
      ans.classList.toggle("hidden");
      icon.classList.toggle("rotate-180");
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  AppController.init();
});
