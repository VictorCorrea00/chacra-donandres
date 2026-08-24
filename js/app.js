/**
 * Orquestador Principal - Chacra Don Andres (Pro Max Edition)
 */
const AppController = {
  init() {
    this.setupNavbarBehavior();
    this.setupMobileMenu();

    // Iniciar Micro-interacciones Premium
    // Register GSAP plugins immediately
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }

    this.initLenis();
    this.initPreloader();
    this.initParallax();
    this.renderTestimonials();

    if (window.gsap && window.ScrollTrigger) {
      if (window.TourController) TourController.init();
      if (window.GalleryController) GalleryController.init();
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

    // ── SALONES: Stagger de header ──
    gsap.from(".gsap-stagger-salones > *", {
      y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: "#salones", start: "top 80%" }
    });

    // ── SALONES: Cards Fade Up ──
    gsap.from(".salon-card", {
      y: 70, opacity: 0, duration: 1, stagger: 0.15, ease: "back.out(1.7)",
      scrollTrigger: { trigger: "#salones .grid", start: "top 85%" }
    });

    // ── GRANJA: Parallax Individual ──
    document.querySelectorAll('.img-parallax').forEach(img => {
      const speed = parseFloat(img.getAttribute('data-speed')) || 1;
      gsap.fromTo(img,
        { y: 40 * speed },
        { y: -40 * speed, ease: "none",
          scrollTrigger: { trigger: "#granja", start: "top bottom", end: "bottom top", scrub: true }
        }
      );
    });

    // ── ACTIVIDADES: Scale In ──
    gsap.from(".actividad-card", {
      scale: 0.92, y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
      scrollTrigger: { trigger: "#actividades", start: "top 80%" }
    });

    // ── COUNTER STRIP ──
    document.querySelectorAll('.count').forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const isDecimal = target % 1 !== 0;
      let val = { value: 0 };
      gsap.to(val, {
        value: target,
        duration: 2, 
        ease: "power2.out",
        scrollTrigger: { trigger: counter.closest('.counter-box') || counter, start: "top 85%", once: true },
        onUpdate: function() {
          counter.innerHTML = isDecimal ? val.value.toFixed(1) : Math.round(val.value);
        }
      });
    });

    // ── SALONES: header stagger ──
    gsap.fromTo(".gsap-stagger-salones > *", { y: 60, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out",
      scrollTrigger: { trigger: "#salones", start: "top 80%" }
    });

    // ── SALONES: clip-path reveal on cards (fromTo so images visible if GSAP fails)
    document.querySelectorAll('.clip-reveal').forEach(el => {
      gsap.fromTo(el,
        { clipPath: "inset(0 100% 0 0)", webkitClipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", webkitClipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 90%" }
        }
      );
    });

    // ── SALON CARDS stagger ──
    gsap.fromTo(".salon-card", { y: 80, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "back.out(1.4)",
      scrollTrigger: { trigger: "#salones .grid", start: "top 80%" }
    });

    // ── GRANJA: clip-path reveal ──
    document.querySelectorAll('.clip-reveal-target').forEach(el => {
      gsap.fromTo(el,
        { clipPath: "inset(0 50% 0 50%)", webkitClipPath: "inset(0 50% 0 50%)" },
        { clipPath: "inset(0 0% 0 0%)", webkitClipPath: "inset(0 0% 0 0%)", duration: 1.5, ease: "power3.inOut",
          scrollTrigger: { trigger: "#granja", start: "top 75%" }
        }
      );
    });

    // ── ACTIVIDADES: scale in ──
    gsap.fromTo(".flip-container", { scale: 0.92, y: 40, opacity: 0 }, {
      scale: 1, y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power2.out",
      scrollTrigger: { trigger: "#actividades", start: "top 80%" }
    });

  },

  
  initPreloader() {
    // BUGFIX: Bloquear scroll mientras carga para evitar romper la animación del hero
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    
    // Safety fallback (desbloquea tras 4s en caso de error)
    const fallbackTimeout = setTimeout(() => {
       document.body.style.overflow = "";
       const p = document.getElementById("premium-preloader");
       if (p) p.style.display = "none";
    }, 4000);

    const tl = gsap.timeline({
      onComplete: () => clearTimeout(fallbackTimeout)
    });
    tl.to("#preloader-text", { y: 0, duration: 1, ease: "power4.out", delay: 0.2 })
      .to("#preloader-text", { y: "-100%", duration: 0.8, ease: "power4.in", delay: 0.5 })
      .to("#premium-preloader", { y: "-100%", duration: 1, ease: "expo.inOut" }, "-=0.3")
      .set("#premium-preloader", { display: "none" })
      .call(() => {
        document.body.style.overflow = "";
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


  initLenis() {
    if (typeof Lenis === 'undefined') return;
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
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
    const firstImg = slides[0].querySelector('img');
    if (firstImg) {
      gsap.fromTo(firstImg, { scale: 1 }, { scale: 1.15, duration: 6, ease: "none" });
    }

    const nextSlide = () => {
      let next = (current + 1) % slides.length;
      const tl = gsap.timeline();
      
      const nextImg = slides[next].querySelector('img');
      
      // Fade IN y Zoom progresivo al próximo slide
      tl.to(slides[next], { opacity: 1, duration: 1.5, ease: "power2.inOut" }, 0);
      if (nextImg) {
        tl.fromTo(nextImg, 
          { scale: 1 }, 
          { scale: 1.15, duration: 6, ease: "none" }, 
          0
        );
      }
      
      // Fade OUT del slide actual
      tl.to(slides[current], { opacity: 0, duration: 1.5, ease: "power2.inOut" }, 0);
      
      current = next;
      gsap.delayedCall(5, nextSlide);
    };

    gsap.delayedCall(5, nextSlide);
  },


  setupMobileMenu() {
    const toggleBtn = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!toggleBtn || !mobileMenu) return;

    let isOpen = false;

    toggleBtn.addEventListener("click", () => {
      isOpen = !isOpen;
      if (isOpen) {
        mobileMenu.style.transform = "translateX(0)";
        document.body.style.overflow = "hidden";
      } else {
        mobileMenu.style.transform = "translateX(100%)";
        document.body.style.overflow = "";
      }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        isOpen = false;
        mobileMenu.style.transform = "translateX(100%)";
        document.body.style.overflow = "";
      });
    });
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
