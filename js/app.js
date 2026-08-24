/**
 * Orquestador Principal - Chacra Don Andres (Pro Max Edition)
 */
const AppController = {
  init() {
    this.setupNavbarBehavior();
    this.setupMobileMenu();

    // Iniciar Micro-interacciones Premium
    this.initPreloader();
    
    this.initParallax();

    this.renderTestimonials();

    if (window.gsap && window.ScrollTrigger) {
      if (window.TourController) TourController.init();
    if (window.GalleryController) GalleryController.init();

    gsap.registerPlugin(ScrollTrigger);
      this.initGsapAnimations();
    }
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

  
  initPreloader() {
    // BUGFIX: Bloquear scroll mientras carga para evitar romper la animación del hero
    document.body.style.overflow = "hidden";
    
    const tl = gsap.timeline();
    tl.to("#preloader-text", { y: 0, duration: 1, ease: "power4.out", delay: 0.2 })
      .to("#preloader-text", { y: "-100%", duration: 0.8, ease: "power4.in", delay: 0.5 })
      .to("#premium-preloader", { y: "-100%", duration: 1, ease: "expo.inOut" }, "-=0.3")
      .set("#premium-preloader", { display: "none" })
      .call(() => {
        document.body.style.overflow = "auto";
        this.animateHeroText();
      });
  },

    animateHeroText() {
    gsap.fromTo("#hero-content", 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );
    // Start slider ONLY after preloader finishes
    this.initHeroSlider();
  },

  initParallax() {
    gsap.utils.toArray('.parallax-img').forEach(img => {
      img.classList.add('scale-[1.15]'); 
      gsap.to(img, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: img.closest('section'),
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  },

  setupNavbarBehavior() { /* Removido para layout Gretna */ },


  initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let current = 0;
    
    // Setup inicial
    gsap.set(slides, { opacity: 0 });
    gsap.set(slides[0], { opacity: 1 });
    
    // Animación inicial del primer slide
    gsap.fromTo(slides[0].querySelector('img'), 
      { scale: 1 }, 
      { scale: 1.15, duration: 6, ease: "none" }
    );

    setInterval(() => {
      let next = (current + 1) % slides.length;
      const tl = gsap.timeline();
      
      // Fade IN y Zoom progresivo al próximo slide
      tl.to(slides[next], { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0);
      tl.fromTo(slides[next].querySelector('img'), 
        { scale: 1 }, 
        { scale: 1.15, duration: 6, ease: "none" }, 
        0
      );
      
      // Fade OUT del slide actual
      tl.to(slides[current], { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0);
      
      current = next;
    }, 5000);
  },

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
