/**
 * ALTAIR RESIDENCES — ULTRA-PREMIUM LUXURY REAL ESTATE
 * Interactive JavaScript Engine
 * Reliable animations (no hidden opacity bugs), Custom Luxury Cursor,
 * Carousel Sliders, Modals & Form Handlers.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons (as progressive enhancement)
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. Page Loader Curtain
  const pageLoader = document.getElementById('pageLoader');
  const dismissLoader = () => {
    if (pageLoader && !pageLoader.classList.contains('loaded')) {
      pageLoader.classList.add('loaded');
      initHeroAnimations();
    }
  };

  window.addEventListener('load', () => setTimeout(dismissLoader, 300));
  setTimeout(dismissLoader, 800); // Safety fallback

  // 3. Custom Luxury Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isCursorVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isCursorVisible) {
        cursorDot.style.opacity = '1';
        cursorRing.style.opacity = '1';
        isCursorVisible = true;
      }

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    const hoverTargets = document.querySelectorAll(
      'a, button, .destination-card, .lifestyle-card, .luxury-property-card, .amenity-item, .sig-icon-card, .bronze-cta-panel'
    );

    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-hover'));
      target.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorRing.style.opacity = '0';
      isCursorVisible = false;
    });
  }

  // 4. Scroll Progress Indicator & Sticky Navbar
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const navbar = document.getElementById('altairNavbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${progress}%`;
    }

    if (navbar) {
      if (scrollTop > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // 5. Statistics Counter Animation
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target > 20 ? 30 : 60;
      const increment = Math.ceil(target / (1200 / speed)) || 1;

      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.innerText = count;
          setTimeout(updateCount, speed);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  // 6. Safe GSAP Hero & Scroll Animations (Content is NEVER hidden)
  function initHeroAnimations() {
    animateCounters();

    if (typeof gsap !== 'undefined') {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.altair-navbar', {
        y: -20,
        duration: 0.7
      }, 0.1);

      tl.from('.hero-eyebrow', {
        y: 12,
        duration: 0.6
      }, 0.2);

      tl.from('.hero-heading-line', {
        y: 20,
        stagger: 0.1,
        duration: 0.75
      }, 0.3);

      tl.from('.hero-description', {
        y: 12,
        duration: 0.6
      }, 0.45);

      tl.from('.hero-actions > *', {
        y: 12,
        stagger: 0.08,
        duration: 0.6
      }, 0.55);

      tl.from('.hero-stats', {
        y: 12,
        duration: 0.6
      }, 0.65);

      tl.from('.floating-property-card', {
        y: 20,
        duration: 0.8,
        ease: 'power2.out'
      }, 0.5);

      // Hero Parallax on Scroll
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to('#heroParallaxImg', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });

        // Subtle motion without hiding elements
        gsap.fromTo('.sig-icon-card', 
          { y: 20 }, 
          { 
            y: 0, 
            stagger: 0.1, 
            duration: 0.8, 
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.signature-icons-grid',
              start: 'top 90%'
            }
          }
        );

        gsap.to('#ctaParallaxImg', {
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.section-final-cta',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });

        // Refresh triggers once all assets are settled
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }
    }
  }

  // 7. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // 8. Featured Properties Carousel Slider
  const propCardsTrack = document.getElementById('propCardsTrack');
  const propCardsViewport = document.getElementById('propCardsViewport');
  const propPrevBtn = document.getElementById('propPrevBtn');
  const propNextBtn = document.getElementById('propNextBtn');
  const propCurrentSlide = document.getElementById('propCurrentSlide');
  const propertyProgressFill = document.getElementById('propertyProgressFill');
  const propCards = document.querySelectorAll('.luxury-property-card');

  let propSlideIndex = 0;
  const totalPropSlides = propCards.length || 3;

  function updatePropSlider() {
    if (!propCardsTrack || propCards.length === 0) return;
    
    const cardWidth = propCards[0].offsetWidth || 340;
    const gap = window.innerWidth <= 767 ? 16 : 28;
    const offset = propSlideIndex * (cardWidth + gap);

    if (window.innerWidth <= 767 && propCardsViewport) {
      propCardsViewport.scrollTo({
        left: offset,
        behavior: 'smooth'
      });
    } else {
      propCardsTrack.style.transform = `translateX(-${offset}px)`;
    }

    if (propCurrentSlide) {
      propCurrentSlide.innerText = `0${propSlideIndex + 1}`;
    }

    if (propertyProgressFill) {
      const percentage = ((propSlideIndex + 1) / totalPropSlides) * 100;
      propertyProgressFill.style.width = `${percentage}%`;
    }
  }

  if (propNextBtn) {
    propNextBtn.addEventListener('click', () => {
      propSlideIndex = (propSlideIndex + 1) % totalPropSlides;
      updatePropSlider();
    });
  }

  if (propPrevBtn) {
    propPrevBtn.addEventListener('click', () => {
      propSlideIndex = (propSlideIndex - 1 + totalPropSlides) % totalPropSlides;
      updatePropSlider();
    });
  }

  if (propCardsViewport) {
    let scrollTimeout;
    propCardsViewport.addEventListener('scroll', () => {
      if (window.innerWidth <= 767) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          const cardWidth = propCards[0] ? propCards[0].offsetWidth : 300;
          const newIdx = Math.round(propCardsViewport.scrollLeft / (cardWidth + 16));
          if (newIdx >= 0 && newIdx < totalPropSlides && newIdx !== propSlideIndex) {
            propSlideIndex = newIdx;
            if (propCurrentSlide) propCurrentSlide.innerText = `0${propSlideIndex + 1}`;
            if (propertyProgressFill) {
              propertyProgressFill.style.width = `${((propSlideIndex + 1) / totalPropSlides) * 100}%`;
            }
          }
        }, 60);
      }
    }, { passive: true });
  }

  window.addEventListener('resize', updatePropSlider);
  updatePropSlider();

  // Allow clicking anywhere on property cards to view showcase
  propCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return; // let detail link navigate
      const btn = card.querySelector('.card-arrow-btn');
      const propKey = btn ? btn.getAttribute('data-property') : 'mumbai';
      openPropertyModal(propKey);
    });
  });

  // 9. Lifestyle Cards Interactive Selection
  const lifestyleCards = document.querySelectorAll('.lifestyle-card');
  const lifestyleActiveNum = document.getElementById('lifestyleActiveNum');
  const lifestyleIndFill = document.getElementById('lifestyleIndFill');

  lifestyleCards.forEach((card, index) => {
    const activateLifestyleCard = () => {
      lifestyleCards.forEach((c) => c.classList.remove('active-card'));
      card.classList.add('active-card');

      if (lifestyleActiveNum) {
        lifestyleActiveNum.innerText = `0${index + 1}`;
      }
      if (lifestyleIndFill) {
        lifestyleIndFill.style.width = `${((index + 1) / lifestyleCards.length) * 100}%`;
      }
    };

    card.addEventListener('mouseenter', activateLifestyleCard);
    card.addEventListener('click', activateLifestyleCard);
  });

  // 10. Resident Testimonials Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const tDots = document.querySelectorAll('.t-dot');
  const tPrevBtn = document.getElementById('tPrevBtn');
  const tNextBtn = document.getElementById('tNextBtn');
  const testimonialPanel = document.querySelector('.testimonial-card-panel');

  let tCurrentIndex = 0;
  let testimonialTimer = null;

  function showTestimonial(index) {
    testimonialSlides.forEach((s) => s.classList.remove('active'));
    tDots.forEach((d) => d.classList.remove('active'));

    tCurrentIndex = (index + testimonialSlides.length) % testimonialSlides.length;

    if (testimonialSlides[tCurrentIndex]) {
      testimonialSlides[tCurrentIndex].classList.add('active');
    }
    if (tDots[tCurrentIndex]) {
      tDots[tCurrentIndex].classList.add('active');
    }
  }

  function nextTestimonial() {
    showTestimonial(tCurrentIndex + 1);
  }

  function prevTestimonial() {
    showTestimonial(tCurrentIndex - 1);
  }

  function resetTestimonialTimer() {
    clearInterval(testimonialTimer);
    startTestimonialTimer();
  }

  if (tNextBtn) {
    tNextBtn.addEventListener('click', () => {
      nextTestimonial();
      resetTestimonialTimer();
    });
  }
  if (tPrevBtn) {
    tPrevBtn.addEventListener('click', () => {
      prevTestimonial();
      resetTestimonialTimer();
    });
  }

  tDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      showTestimonial(idx);
      resetTestimonialTimer();
    });
  });

  // Touch Swipe on Testimonials Panel
  if (testimonialPanel) {
    let touchStartX = 0;
    testimonialPanel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    testimonialPanel.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextTestimonial();
        resetTestimonialTimer();
      } else if (touchEndX - touchStartX > 45) {
        prevTestimonial();
        resetTestimonialTimer();
      }
    }, { passive: true });

    testimonialPanel.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
    testimonialPanel.addEventListener('mouseleave', startTestimonialTimer);
  }

  function startTestimonialTimer() {
    testimonialTimer = setInterval(nextTestimonial, 7000);
  }
  startTestimonialTimer();

  // 11. Hero Sidebar Location Indicators & Prev/Next Showcase
  const sidebarLocDots = document.querySelectorAll('.sidebar-loc-dot');
  const sidebarPrevBtn = document.getElementById('sidebarPrevBtn');
  const sidebarNextBtn = document.getElementById('sidebarNextBtn');
  const sidebarTopNum = document.querySelector('.sidebar-top-num');
  const floatingCard = document.getElementById('floatingCard');
  const heroParallaxImg = document.getElementById('heroParallaxImg');

  const heroLocations = [
    {
      code: '01',
      city: 'Mumbai',
      tag: 'MUMBAI',
      title: 'THE ALTAIR HEIGHTS',
      specs: ['4 & 5 BHK Sky Mansions', 'Panoramic Sea Views', 'World-Class Amenities'],
      thumb: 'assets/property-mumbai.jpg',
      heroBg: 'assets/hero-villa.jpg',
      propKey: 'mumbai'
    },
    {
      code: '02',
      city: 'Bangalore',
      tag: 'BANGALORE',
      title: 'THE GROVE RESIDENCES',
      specs: ['Garden Penthouses', 'Botanical Rain Groves', 'Private Hydroponic Conservatories'],
      thumb: 'assets/property-bangalore.jpg',
      heroBg: 'assets/property-bangalore.jpg',
      propKey: 'bangalore'
    },
    {
      code: '03',
      city: 'Delhi',
      tag: 'DELHI NCR',
      title: 'ALTAIR IMPERIAL PAVILION',
      specs: ['Private Diplomatic Enclave', 'Heirloom Sandstone Colonnades', 'Private Helipad Access'],
      thumb: 'assets/location-delhi.jpg',
      heroBg: 'assets/location-delhi.jpg',
      propKey: 'delhi'
    },
    {
      code: '04',
      city: 'Goa',
      tag: 'ASSAGAO, GOA',
      title: 'ELYSIAN VILLA',
      specs: ['4 BHK Private Pool Villas', 'Ancient Banyan Sanctuary', 'Portuguese Verandahs'],
      thumb: 'assets/property-goa.jpg',
      heroBg: 'assets/property-goa.jpg',
      propKey: 'goa'
    }
  ];

  let sidebarIndex = 0;

  function updateSidebarLocation(idx) {
    sidebarLocDots.forEach((d) => d.classList.remove('active'));
    sidebarIndex = (idx + heroLocations.length) % heroLocations.length;
    const currentLoc = heroLocations[sidebarIndex];

    if (sidebarLocDots[sidebarIndex]) {
      sidebarLocDots[sidebarIndex].classList.add('active');
    }

    if (sidebarTopNum) {
      sidebarTopNum.innerText = currentLoc.code;
    }

    // Update Floating Property Card
    if (floatingCard) {
      const titleEl = floatingCard.querySelector('.floating-card-title');
      const locEl = floatingCard.querySelector('.floating-card-loc span');
      const thumbEl = floatingCard.querySelector('.floating-card-thumb img');
      const specsEl = floatingCard.querySelector('.floating-card-specs');
      const btnEl = floatingCard.querySelector('.floating-card-btn');

      if (titleEl) titleEl.innerText = currentLoc.title;
      if (locEl) locEl.innerText = currentLoc.tag;
      if (thumbEl) thumbEl.src = currentLoc.thumb;
      if (specsEl) {
        specsEl.innerHTML = currentLoc.specs.map(s => `<li>${s}</li>`).join('');
      }
      if (btnEl) {
        btnEl.setAttribute('data-property', currentLoc.propKey);
      }
    }

    // Smooth subtle crossfade for hero image
    if (heroParallaxImg && heroParallaxImg.getAttribute('src') !== currentLoc.heroBg) {
      heroParallaxImg.style.transition = 'opacity 0.3s ease';
      heroParallaxImg.style.opacity = '0.7';
      setTimeout(() => {
        heroParallaxImg.src = currentLoc.heroBg;
        heroParallaxImg.style.opacity = '1';
      }, 250);
    }
  }

  if (sidebarNextBtn) {
    sidebarNextBtn.addEventListener('click', () => updateSidebarLocation(sidebarIndex + 1));
  }
  if (sidebarPrevBtn) {
    sidebarPrevBtn.addEventListener('click', () => updateSidebarLocation(sidebarIndex - 1));
  }
  sidebarLocDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => updateSidebarLocation(idx));
  });

  // 12. Modals System (Schedule Visit, Video Modal, Property Quick View, Legal Charter)
  const scheduleModal = document.getElementById('scheduleModal');
  const scheduleModalClose = document.getElementById('scheduleModalClose');
  const openScheduleModalBtn = document.getElementById('openScheduleModalBtn');
  const finalCtaScheduleBtn = document.getElementById('finalCtaScheduleBtn');
  const allModalTriggers = document.querySelectorAll('.modal-trigger-btn');

  function openSchedule(preferredProperty = null) {
    if (scheduleModal) {
      scheduleModal.classList.add('open');
      scheduleModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      if (preferredProperty) {
        const propSelect = document.getElementById('propertySelect');
        if (propSelect) propSelect.value = preferredProperty;
      }
    }
  }

  function closeSchedule() {
    if (scheduleModal) {
      scheduleModal.classList.remove('open');
      scheduleModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        const successState = document.getElementById('modalSuccessState');
        const form = document.getElementById('scheduleVisitForm');
        if (successState) successState.classList.remove('active');
        if (form) form.style.display = 'block';
      }, 400);
    }
  }

  if (openScheduleModalBtn) openScheduleModalBtn.addEventListener('click', () => openSchedule());
  if (finalCtaScheduleBtn) finalCtaScheduleBtn.addEventListener('click', () => openSchedule());
  allModalTriggers.forEach((btn) => {
    if (btn.id !== 'modalBookTourBtn') {
      btn.addEventListener('click', () => openSchedule());
    }
  });
  if (scheduleModalClose) scheduleModalClose.addEventListener('click', closeSchedule);

  if (scheduleModal) {
    scheduleModal.addEventListener('click', (e) => {
      if (e.target === scheduleModal) closeSchedule();
    });
  }

  // Schedule Visit Form Submission
  const scheduleVisitForm = document.getElementById('scheduleVisitForm');
  const modalSuccessState = document.getElementById('modalSuccessState');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  if (scheduleVisitForm) {
    scheduleVisitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitTourBtn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Reserving Itinerary...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        scheduleVisitForm.style.display = 'none';
        if (modalSuccessState) {
          modalSuccessState.classList.add('active');
        }
        if (submitBtn) {
          submitBtn.innerHTML = '<span>Confirm Private Site Visit</span><span class="circle-arrow-green"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg></span>';
          submitBtn.disabled = false;
        }
      }, 800);
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', closeSchedule);
  }

  // 13. Video Modal (Watch Our Story / Resident Story)
  const videoModal = document.getElementById('videoModal');
  const videoModalClose = document.getElementById('videoModalClose');
  const heroStoryBtn = document.getElementById('heroStoryBtn');
  const aboutVideoPlayBtn = document.getElementById('aboutVideoPlayBtn');
  const aboutStoryBtn = document.getElementById('aboutStoryBtn');
  const sidebarVideoTrigger = document.getElementById('sidebarVideoTrigger');
  const residentVideoTrigger = document.getElementById('residentVideoTrigger');
  const playToggleBtn = document.getElementById('playToggleBtn');

  function openVideoModal() {
    if (videoModal) {
      videoModal.classList.add('open');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeVideoModal() {
    if (videoModal) {
      videoModal.classList.remove('open');
      videoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  [heroStoryBtn, aboutVideoPlayBtn, aboutStoryBtn, sidebarVideoTrigger, residentVideoTrigger].forEach((trigger) => {
    if (trigger) trigger.addEventListener('click', openVideoModal);
  });

  if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }

  let isPlaying = false;
  if (playToggleBtn) {
    playToggleBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      playToggleBtn.innerHTML = isPlaying 
        ? '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
        : '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
    });
  }

  // 14. Property Detail Quick View Modal
  const propertyDetailModal = document.getElementById('propertyDetailModal');
  const propDetailClose = document.getElementById('propDetailClose');
  const modalPropImage = document.getElementById('modalPropImage');
  const modalPropLocation = document.getElementById('modalPropLocation');
  const modalPropTitle = document.getElementById('modalPropTitle');
  const modalPropPrice = document.getElementById('modalPropPrice');
  const modalPropDesc = document.getElementById('modalPropDesc');
  const modalPropConfig = document.getElementById('modalPropConfig');
  const modalPropArea = document.getElementById('modalPropArea');
  const modalBookTourBtn = document.getElementById('modalBookTourBtn');

  const propertyData = {
    mumbai: {
      title: 'The Altair Heights',
      location: 'MUMBAI, MAHARASHTRA',
      price: '₹12.5 Cr onwards',
      desc: 'Rising above the Arabian coastline, The Altair Heights offers 52 limited-edition sky mansions with double-height ceiling voids, private infinity plunge pools, and uninterrupted ocean sunsets.',
      config: '4 & 5 BHK Sky Mansions',
      area: '4,800 – 7,200 sq.ft.',
      image: 'assets/property-mumbai.jpg'
    },
    goa: {
      title: 'Elysian Villa',
      location: 'ASSAGAO, GOA',
      price: '₹8.2 Cr onwards',
      desc: 'A tropical sanctuary surrounded by ancient banyan groves and protected estuaries. Features private lap pools, Portuguese colonial verandahs, and sustainable rammed-earth architecture.',
      config: '4 BHK Private Villas',
      area: '5,400 sq.ft. + Private Orchard',
      image: 'assets/property-goa.jpg'
    },
    bangalore: {
      title: 'The Grove Residences',
      location: 'INDIRANAGAR / KORAMANGALA, BANGALORE',
      price: '₹6.9 Cr onwards',
      desc: 'An ultra-luxury botanical enclave integrating mature rain trees, private rooftop hydroponic conservatories, and smart biophilic climate conditioning.',
      config: '3 & 4 BHK Garden Penthouses',
      area: '3,600 – 5,100 sq.ft.',
      image: 'assets/property-bangalore.jpg'
    },
    delhi: {
      title: 'Altair Imperial Pavilion',
      location: 'DIPLOMATIC ENCLAVE / CHANAKYAPURI, DELHI',
      price: '₹14.0 Cr onwards',
      desc: 'An aristocratic sanctuary set amidst Lutyens heritage foliage. Features bespoke sandstone colonnades, private climate-controlled courtyards, and sovereign-grade biometric security.',
      config: '5 BHK Imperial Mansions',
      area: '6,200 – 9,500 sq.ft.',
      image: 'assets/location-delhi.jpg'
    }
  };

  let currentActivePropKey = 'mumbai';

  function openPropertyModal(propKey) {
    currentActivePropKey = propKey;
    const data = propertyData[propKey] || propertyData['mumbai'];
    if (modalPropImage) modalPropImage.src = data.image;
    if (modalPropLocation) modalPropLocation.innerText = data.location;
    if (modalPropTitle) modalPropTitle.innerText = data.title;
    if (modalPropPrice) modalPropPrice.innerText = data.price;
    if (modalPropDesc) modalPropDesc.innerText = data.desc;
    if (modalPropConfig) modalPropConfig.innerText = data.config;
    if (modalPropArea) modalPropArea.innerText = data.area;

    if (propertyDetailModal) {
      propertyDetailModal.classList.add('open');
      propertyDetailModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePropertyModal() {
    if (propertyDetailModal) {
      propertyDetailModal.classList.remove('open');
      propertyDetailModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('.property-modal-trigger').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const propKey = trigger.getAttribute('data-property') || 'mumbai';
      openPropertyModal(propKey);
    });
  });

  if (propDetailClose) propDetailClose.addEventListener('click', closePropertyModal);
  if (propertyDetailModal) {
    propertyDetailModal.addEventListener('click', (e) => {
      if (e.target === propertyDetailModal) closePropertyModal();
    });
  }

  // Inside Property Quick View -> Book Showcase opens Schedule modal pre-selected
  if (modalBookTourBtn) {
    modalBookTourBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closePropertyModal();
      openSchedule(currentActivePropKey);
    });
  }

  // 15. Interactive Amenities & Prime Location Cards
  const luxuryToast = document.getElementById('luxuryToast');
  let toastTimer = null;

  function showLuxuryToast(msg) {
    if (!luxuryToast) return;
    luxuryToast.innerHTML = `<span>${msg}</span>`;
    luxuryToast.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      luxuryToast.classList.remove('active');
    }, 3400);
  }

  const amenityItems = document.querySelectorAll('.amenity-item');
  amenityItems.forEach((item) => {
    item.addEventListener('click', () => {
      const name = item.querySelector('.amenity-name')?.innerText || 'Curated Amenity';
      const detail = item.querySelector('.amenity-detail')?.innerText || 'Available to all Altair estate residents.';
      item.classList.add('pulse-active');
      setTimeout(() => item.classList.remove('pulse-active'), 500);
      showLuxuryToast(`✦ ${name}: ${detail}`);
    });
  });

  const destinationCards = document.querySelectorAll('.destination-card');
  destinationCards.forEach((card) => {
    card.addEventListener('click', () => {
      const city = card.getAttribute('data-city') || 'Mumbai';
      window.location.href = `communities.html?city=${encodeURIComponent(city.toLowerCase())}`;
    });
  });

  // 16. Legal & Privacy Charter Modal Handlers
  const privacyPolicyBtn = document.getElementById('privacyPolicyBtn');
  const termsServiceBtn = document.getElementById('termsServiceBtn');
  const legalModal = document.getElementById('legalModal');
  const legalModalClose = document.getElementById('legalModalClose');
  const legalAcknowledgeBtn = document.getElementById('legalAcknowledgeBtn');
  const legalModalEyebrow = document.getElementById('legalModalEyebrow');
  const legalModalTitle = document.getElementById('legalModalTitle');
  const legalModalContent = document.getElementById('legalModalContent');

  function openLegalModal(type) {
    if (!legalModal) return;
    if (type === 'privacy') {
      if (legalModalEyebrow) legalModalEyebrow.innerText = 'PRIVACY CHARTER';
      if (legalModalTitle) legalModalTitle.innerText = 'Discretion & Privacy Commitment';
      if (legalModalContent) {
        legalModalContent.innerText = 'Altair Residences operates under sovereign-tier confidentiality protocols. All client records, private site visit inquiries, and financial communications are protected under 256-bit AES encryption. We never broker, share, or monetize resident identities.';
      }
    } else {
      if (legalModalEyebrow) legalModalEyebrow.innerText = 'TERMS OF SERVICE';
      if (legalModalTitle) legalModalTitle.innerText = 'Private Estates Concierge Charter';
      if (legalModalContent) {
        legalModalContent.innerText = 'All architectural renders, floor plans, specifications, and handover timelines are governed by RERA compliance and registered under Indian architectural statutory covenants. Private viewing schedules are reserved exclusively for accredited individuals.';
      }
    }
    legalModal.classList.add('open');
    legalModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLegalModal() {
    if (legalModal) {
      legalModal.classList.remove('open');
      legalModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (privacyPolicyBtn) {
    privacyPolicyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('privacy');
    });
  }
  if (termsServiceBtn) {
    termsServiceBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('terms');
    });
  }
  if (legalModalClose) legalModalClose.addEventListener('click', closeLegalModal);
  if (legalAcknowledgeBtn) legalAcknowledgeBtn.addEventListener('click', closeLegalModal);
  if (legalModal) {
    legalModal.addEventListener('click', (e) => {
      if (e.target === legalModal) closeLegalModal();
    });
  }

  // 17. Smooth Anchor Scrolling with offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 18. Keyboard Accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSchedule();
      closeVideoModal();
      closePropertyModal();
      closeLegalModal();
      closeDrawer();
    }
  });

  // 19. Properties Filter Tabs (properties.html)
  const filterPills = document.querySelectorAll('.filter-pill');
  const portfolioItems = document.querySelectorAll('.portfolio-item-card');

  if (filterPills.length > 0 && portfolioItems.length > 0) {
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const filterValue = pill.getAttribute('data-filter');

        portfolioItems.forEach((item) => {
          const itemCity = item.getAttribute('data-city');
          if (filterValue === 'all' || itemCity === filterValue) {
            item.style.display = 'flex';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 20. Contact Page Form Submission (contact.html)
  const contactPageForm = document.getElementById('contactPageForm');
  const contactSuccessState = document.getElementById('contactSuccessState');

  if (contactPageForm && contactSuccessState) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitContactBtn');
      if (submitBtn) {
        submitBtn.innerHTML = '<span>Coordinating Itinerary...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        contactPageForm.style.display = 'none';
        contactSuccessState.classList.add('active');
        if (submitBtn) {
          submitBtn.innerHTML = '<span>Confirm Confidential Appointment</span>';
          submitBtn.disabled = false;
        }
      }, 700);
    });
  }

});
