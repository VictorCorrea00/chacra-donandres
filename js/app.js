/**
 * Orquestador Principal - Chacra Don Andres (Pro Max Edition)
 */
const AppController = {
  init() {
    this.setupNavbarBehavior();
    this.setupMobileMenu();

    // Iniciar Micro-interacciones Premium
    this.initPreloader();
    this.initCustomCursor();
    this.initMagneticButtons();
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
    const tl = gsap.timeline();
    tl.to("#preloader-text", { y: 0, duration: 1, ease: "power4.out", delay: 0.2 })
      .to("#preloader-text", { y: "-100%", duration: 0.8, ease: "power4.in", delay: 0.5 })
      .to("#premium-preloader", { y: "-100%", duration: 1, ease: "expo.inOut" }, "-=0.3")
      .call(() => this.animateHeroText());
  },

  animateHeroText() {
    const heroText = document.querySelector('.split-text-hero');
    if(heroText) {
      const chars = heroText.innerText.split('').map(c => `<span class="char">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
      heroText.innerHTML = chars;
      gsap.to('.split-text-hero .char', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.out"
      });
    }
  },

  initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    if(!cursor || !follower) return;

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    document.querySelectorAll('a, button, .magnetic-btn, .group').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });
  },

  initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(btn, { x: x, y: y, duration: 0.3 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
      });
    });
  },

  initParallax() {
    gsap.to('.parallax-img', {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
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
