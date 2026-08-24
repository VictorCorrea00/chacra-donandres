/**
 * Orquestador Principal - Chacra Don Andres (Pro Max Edition)
 */
const AppController = {
  init() {
    this.setupNavbarBehavior();
    this.setupMobileMenu();
    this.renderTestimonials();

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      this.initGsapAnimations();
    }

    if (window.TourController) TourController.init();
    if (window.GalleryController) GalleryController.init();
    if (window.WeatherWidget) WeatherWidget.init();
  },

  initGsapAnimations() {
    // Pro-max Subtle scroll reveal (y: 12px)
    gsap.utils.toArray('.fade-up-slow, .gsap-reveal').forEach(el => {
      gsap.from(el, { 
        opacity: 0, 
        y: 20, 
        duration: 0.8, 
        ease: 'power2.out', 
        scrollTrigger: { 
          trigger: el, 
          start: 'top 85%', 
          toggleActions: 'play none none reverse' 
        } 
      });
    });
  },

  setupNavbarBehavior() { /* Removido para layout Gretna */ },

  setupMobileMenu() {
    const toggleBtn = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (toggleBtn && mobileMenu) {
      toggleBtn.addEventListener("click", () => {
        if(mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.remove("hidden");
          mobileMenu.classList.add("flex");
        } else {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("flex");
        }
      });
      // Handle clicks inside the menu to close it
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add("hidden");
          mobileMenu.classList.remove("flex");
        });
      });
    }
  },

  closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");
    if (mobileMenu) mobileMenu.classList.add("hidden");
  },

  renderTestimonials() {
    const container = document.getElementById("testimGrid");
    if (!container) return;
    
    // Only use top 3 for concise social proof
    const topTestimonials = ChacraData.testimonials.slice(0, 3);
    container.innerHTML = topTestimonials.map(t => `
      <div class="p-8 border border-brand-border bg-brand-secondary flex flex-col justify-between gsap-stagger-item">
        <div class="text-brand-accent mb-4 text-xs">
          ${'★'.repeat(t.rating)}
        </div>
        <p class="font-sans font-light text-sm leading-relaxed mb-6 italic text-brand-text/80">"${t.comment}"</p>
        <div class="flex items-center gap-3 border-t border-brand-border pt-4">
          <div class="w-8 h-8 rounded-full bg-brand-text flex items-center justify-center text-brand-bg text-[10px] uppercase font-bold tracking-widest">${t.avatar}</div>
          <div>
            <div class="text-xs font-semibold uppercase tracking-widest">${t.name}</div>
            <div class="text-[9px] text-brand-text/50 uppercase tracking-[0.1em]">${t.event}</div>
          </div>
        </div>
      </div>
    `).join("");
  }
};

document.addEventListener("DOMContentLoaded", () => AppController.init());
