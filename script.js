/**
 * =========================================================================
 * ARFA MUNAM — MODERN DEVELOPER PORTFOLIO INTERACTIONS
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Setup Resume Download Links from Base64 or PDF file
  setupResumeDownload();

  // 2. Navigation Scroll Effect & Mobile Drawer
  setupNavigation();

  // 3. Vibrant High-Visibility Project Showcase Exhibition
  setupProjectsShowcase();

  // 4. Certificate Lightbox Modal
  setupCertificateModal();

  // 5. Animated Number Counters
  setupStatsCounter();

  // 6. Scroll Reveal Observer
  setupScrollReveal();

  // 7. Contact Form Handler
  setupContactForm();

  // 8. Back to Top Button
  setupBackToTop();

  // 9. Premium Micro-Interactions (Cursor, Magnetic buttons, FounderOS tabs & 3D tilt, Exploring radar)
  setupBespokeCursor();
  setupMagneticButtons();
  setupExploringRadar();

  // 10. Tactile Sound FX & Interactive Feedback System
  setupTactileAudioAndFeedback();

  // 11. Hero Live HUD Clock & Dynamic 3-Headings Rotator
  setupHeroLiveClockAndHeadings();

  // 12. Interactive Skills Matrix & Sandboxes
  setupSkillsInteractiveMatrix();

  // 13. Certificate Picture Slots (Upload, Drag-and-Drop & LocalStorage persistence)
  setupCertificatePhotoUploads();

  // 14. Tactile Jelly Physics Engine & Squish Playground
  setupJellyTactileInteractions();

  // 15. Let's Talk Section (Topic pills, Copy Email, Form feedback)
  setupLetsTalkSection();
});

/**
 * Ensures CV / Resume download works using the embedded base64 data or direct file
 */
function setupResumeDownload() {
  const resumeLinks = document.querySelectorAll('.js-resume-link');
  const pdfFileName = 'Arfa-Munam-Resume.pdf';

  resumeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If base64 data URI exists in resume-data.js, use it for reliable zero-server download
      if (typeof window.RESUME_DATA_URI !== 'undefined' && window.RESUME_DATA_URI) {
        e.preventDefault();
        const tempLink = document.createElement('a');
        tempLink.href = window.RESUME_DATA_URI;
        tempLink.download = pdfFileName;
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      } else {
        // Fallback to local PDF file
        link.setAttribute('href', pdfFileName);
        link.setAttribute('download', pdfFileName);
      }
    });
  });
}

/**
 * Sticky floating navigation bar and mobile drawer menu
 */
function setupNavigation() {
  const nav = document.getElementById('floating-nav');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-drawer a');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Scroll spy for active navigation state
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile drawer toggle
  if (hamburger && mobileDrawer) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Filter projects between All, Featured, and Frontend
 */
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const isFeatured = card.getAttribute('data-featured') === 'true';

        if (filter === 'all') {
          card.style.display = '';
        } else if (filter === 'featured') {
          card.style.display = isFeatured ? '' : 'none';
        } else if (category.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Certificate Lightbox Modal:
 * Opens high-resolution view of certificate with metadata, issuer, and date.
 */
function setupCertificateModal() {
  const certCards = document.querySelectorAll('.certificate-card');
  const modal = document.getElementById('cert-modal');
  const modalBox = modal ? modal.querySelector('.modal-content-area') : null;
  const closeBtn = document.getElementById('close-modal-btn');

  if (!modal || !modalBox || !closeBtn) return;

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.getAttribute('data-cert-title') || 'Certificate of Completion';
      const issuer = card.getAttribute('data-cert-issuer') || 'Accredited Organization';
      const date = card.getAttribute('data-cert-date') || '2024';
      const desc = card.getAttribute('data-cert-desc') || '';
      const imgSrc = card.getAttribute('data-cert-img') || '';

      let previewHtml = '';
      if (imgSrc && imgSrc.trim() !== '') {
        previewHtml = `
          <div style="border-radius: 12px; overflow: hidden; margin-bottom: 1.5rem; max-height: 380px; display: flex; align-items: center; justify-content: center; background: #0D3834;">
            <img src="${imgSrc}" alt="${title}" style="max-height: 380px; width: auto; object-fit: contain;">
          </div>
        `;
      } else {
        previewHtml = `
          <div style="background: linear-gradient(135deg, #FFFDF9 0%, #F5ECE0 100%); border: 2px dashed #E5D6C5; border-radius: 16px; padding: 2.5rem; text-align: center; margin-bottom: 1.5rem;">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: #FA5538; color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; margin: 0 auto 1rem auto; box-shadow: 0 4px 14px rgba(250,85,56,0.3);">🏆</div>
            <h4 style="font-family: 'Playfair Display', serif; font-size: 1.3rem; margin-bottom: 0.35rem; color: #18181B;">Certificate Preview Placeholder</h4>
            <p style="font-size: 0.88rem; color: #71717A; max-width: 440px; margin: 0 auto;">Arfa can upload the official screenshot or scan to <code>portfolio-data.js</code> or the project directory to replace this placeholder automatically.</p>
          </div>
        `;
      }

      modalBox.innerHTML = `
        ${previewHtml}
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
          <span style="font-size: 0.8rem; font-weight: 800; color: #FA5538; text-transform: uppercase; letter-spacing: 0.05em;">Verified Credential</span>
          <span style="font-size: 0.85rem; font-weight: 700; color: #71717A;">Issued: ${date}</span>
        </div>
        <h3 style="font-family: 'Playfair Display', serif; font-size: 1.7rem; font-weight: 800; color: #18181B; margin-bottom: 0.4rem; line-height: 1.25;">${title}</h3>
        <p style="font-size: 0.95rem; font-weight: 700; color: #0D3834; margin-bottom: 1rem;">Issuing Body: ${issuer}</p>
        <p style="font-size: 0.95rem; color: #3F3F46; line-height: 1.7; margin-bottom: 1.8rem;">${desc}</p>
        <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
          <button id="modal-done-btn" style="font-size: 0.88rem; font-weight: 700; color: #FFFFFF; background: #0D3834; padding: 0.6rem 1.4rem; border-radius: 9999px; cursor: pointer;">Close Preview</button>
        </div>
      `;

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      const doneBtn = document.getElementById('modal-done-btn');
      if (doneBtn) {
        doneBtn.addEventListener('click', closeModal);
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/**
 * Smooth Animated Number Counters using IntersectionObserver
 */
function setupStatsCounter() {
  const statElements = document.querySelectorAll('.stat-big-number[data-target]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          const suffix = el.getAttribute('data-suffix') || '';
          animateNumber(el, 0, target, 1600, suffix);
        });
      }
    });
  }, { threshold: 0.3 });

  const achievementsSection = document.getElementById('achievements');
  if (achievementsSection) {
    observer.observe(achievementsSection);
  }
}

function animateNumber(element, start, end, duration, suffix = '') {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    // Ease out cubic
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOutProgress);
    element.textContent = current + suffix;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = end + suffix;
    }
  }

  window.requestAnimationFrame(step);
}

/**
 * Scroll reveal observer for elements with .reveal class
 */
function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/**
 * Functional contact form with validation, submission feedback, and email draft trigger
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const msgBox = document.getElementById('form-msg');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value.trim();
    const email = form.elements['email']?.value.trim();
    const message = form.elements['message']?.value.trim();

    if (!name || !email || !message) {
      showMessage('Please fill in your name, email, and message.', 'error');
      return;
    }

    // Email pattern verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Feedback state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      // Create mailto link as reliable direct email dispatch
      const mailtoUrl = `mailto:arfamunam01@gmail.com?subject=Project Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      showMessage(`Thank you, ${name}! Your message has been prepared. If your mail client didn't open automatically, feel free to email directly at arfamunam01@gmail.com.`, 'success');

      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Message</span> <span class="arrow">↗</span>`;

      // Trigger mail client safely
      window.location.href = mailtoUrl;
    }, 600);
  });

  function showMessage(text, type) {
    if (!msgBox) return;
    msgBox.style.display = 'block';
    msgBox.textContent = text;
    if (type === 'error') {
      msgBox.style.background = '#FEE2E2';
      msgBox.style.color = '#991B1B';
      msgBox.style.border = '1px solid #F87171';
    } else {
      msgBox.style.background = '#E6F4F1';
      msgBox.style.color = '#0D3834';
      msgBox.style.border = '1px solid #10B981';
    }
  }
}

/**
 * Smooth Back to Top Button
 */
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * =========================================================================
 * 9. PREMIUM MICRO-INTERACTIONS
 * =========================================================================
 */

/**
 * Bespoke Precision Cursor (Desktop only, hidden on touch or reduced motion)
 */
function setupBespokeCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-follower');

  // Guard against touch devices and users preferring reduced motion
  if (!dot || !ring) return;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouchDevice || prefersReducedMotion || window.innerWidth < 992) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }

    // Direct translate for precision dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  window.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });

  // Smooth trailing physics for ring
  function renderRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  // Hover target enhancement
  const interactiveTargets = document.querySelectorAll('a, button, .project-card, .certificate-card, .metric-card-pill, .service-box, .mockup-tab-pill, .explore-tab-pill');

  interactiveTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('cursor-hover');
    });
  });
}

/**
 * Magnetic button interaction for primary calls to action
 */
function setupMagneticButtons() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch || window.innerWidth < 992) return;

  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - btnCenterX) * 0.22;
      const deltaY = (e.clientY - btnCenterY) * 0.22;

      // Cap displacement for restraint
      const clampX = Math.max(-12, Math.min(12, deltaX));
      const clampY = Math.max(-12, Math.min(12, deltaY));

      btn.style.transform = `translate3d(${clampX}px, ${clampY}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate3d(0, 0, 0)`;
    });
  });
}

/**
 * Interactive "Currently Exploring" radar capsule in About Section
 */
function setupExploringRadar() {
  const tabs = document.querySelectorAll('.explore-tab-pill');
  const textElem = document.getElementById('exploring-text');

  if (!tabs.length || !textElem) return;

  const explorationData = {
    'ai-automation': "Architecting intelligent prompt workflows and LLM agent pipelines using Claude and ChatGPT — turning multi-hour manual engineering tasks into high-velocity, production-grade output.",
    'full-stack': "Integrating frontend interfaces with backend engines, Supabase PostgreSQL databases, authentication flows, and edge APIs to build full-scale web applications.",
    'modern-web': "Crafting responsive, performant user interfaces with clean semantic HTML, modular CSS architectures, fluid animations, and strict WCAG accessibility standards.",
    'digital-products': "Studying product mechanics, founder workflows, rapid iteration cycles, and user feedback loops to build tools that solve genuine problems."
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const topic = tab.getAttribute('data-explore');
      if (!topic || !explorationData[topic]) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Subtle fade morph
      textElem.style.opacity = '0';
      textElem.style.transform = 'translateY(6px)';

      setTimeout(() => {
        textElem.textContent = explorationData[topic];
        textElem.style.opacity = '1';
        textElem.style.transform = 'translateY(0)';
      }, 150);
    });
  });
}

/**
 * =========================================================================
 * VIBRANT HIGH-VISIBILITY PROJECT SHOWCASE SYSTEM
 * Handles Category Filtering, Micro-Interactive Demos & Tactile Controls
 * =========================================================================
 */
function setupProjectsShowcase() {
  // 1. Category Filter Pills
  const filterBtns = document.querySelectorAll('#projects-filter-bar .project-filter-pill');
  const projectCards = document.querySelectorAll('.project-showcase-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      playTactileClick(640, 'sine');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 2. FounderOS Tab Switcher
  const founderTabs = document.querySelectorAll('#founderos-tabs .stage-tab-btn');
  const founderScreens = {
    'dashboard': document.getElementById('screen-dashboard'),
    'analytics': document.getElementById('screen-analytics'),
    'components': document.getElementById('screen-components')
  };

  founderTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetView = tab.getAttribute('data-tab');

      founderTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTactileClick(660, 'sine');

      Object.entries(founderScreens).forEach(([key, screenEl]) => {
        if (screenEl) {
          if (key === targetView) {
            screenEl.classList.add('active');
          } else {
            screenEl.classList.remove('active');
          }
        }
      });
    });
  });

  // 3. FoodieHub Interactive Dish Stepper & Cart Total Calculation
  let foodieQty = 1;
  const baseUnitPrice = 18.50;
  const qtyDisplay = document.getElementById('foodie-qty-display');
  const btnTotalDisplay = document.getElementById('foodie-btn-total');
  const cartTotalDisplay = document.getElementById('foodie-cart-total');
  const cartSummaryDisplay = document.getElementById('foodie-cart-summary');
  const btnMinus = document.getElementById('btn-foodie-minus');
  const btnPlus = document.getElementById('btn-foodie-plus');
  const btnAddToCart = document.getElementById('btn-foodie-add');

  function updateFoodieCalculations() {
    const total = (foodieQty * baseUnitPrice).toFixed(2);
    if (qtyDisplay) qtyDisplay.textContent = foodieQty;
    if (btnTotalDisplay) btnTotalDisplay.textContent = `$${total}`;
    if (cartTotalDisplay) cartTotalDisplay.textContent = `$${total}`;
    if (cartSummaryDisplay) {
      cartSummaryDisplay.innerHTML = `${foodieQty} Item${foodieQty > 1 ? 's' : ''} in Bag • <strong id="foodie-cart-total">$${total}</strong>`;
    }
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', (e) => {
      e.stopPropagation();
      if (foodieQty > 1) {
        foodieQty--;
        playTactileClick(520, 'sine');
        updateFoodieCalculations();
      }
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', (e) => {
      e.stopPropagation();
      if (foodieQty < 12) {
        foodieQty++;
        playTactileClick(740, 'sine');
        updateFoodieCalculations();
      }
    });
  }

  if (btnAddToCart) {
    btnAddToCart.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(880, 'triangle');
      btnAddToCart.classList.add('jelly-squish');
      const prevHtml = btnAddToCart.innerHTML;
      btnAddToCart.innerHTML = `<span>✓ Added ${foodieQty} to Cart!</span>`;
      btnAddToCart.style.backgroundColor = '#10B981';

      setTimeout(() => {
        btnAddToCart.innerHTML = prevHtml;
        btnAddToCart.style.backgroundColor = '';
        btnAddToCart.classList.remove('jelly-squish');
        updateFoodieCalculations();
      }, 1600);
    });
  }

  const foodieCatPills = document.querySelectorAll('.foodie-cat-pill');
  foodieCatPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      foodieCatPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      playTactileClick(600, 'sine');
    });
  });

  // 4. PromptCraft AI Quick Prompt Pills & Dynamic Streaming Output
  const promptQuickChips = document.querySelectorAll('.prompt-quick-chip');
  const promptTypedText = document.getElementById('ai-active-prompt-text');
  const aiOutputDesc = document.getElementById('ai-output-desc');
  const btnRegenSim = document.getElementById('btn-regen-sim');

  const promptDatabase = {
    'attention': {
      prompt: "Synthesize: Self-Attention mechanism in Scaled Dot-Product computation",
      desc: "1. <strong>Query & Key Matching:</strong> Computes compatibility scores across all tokens concurrently.<br>2. <strong>Scaling Factor (√dₖ):</strong> Prevents vanishing gradients in large dimensional spaces.<br>3. <strong>Weighted Value Projection:</strong> Yields context-aware representation vectors."
    },
    'flashcards': {
      prompt: "Generate: Spaced Repetition Flashcards for Operating Systems & Deadlocks",
      desc: "1. <strong>Mutual Exclusion:</strong> At least one resource held in non-shareable mode.<br>2. <strong>Hold & Wait:</strong> Process holding resources while waiting for additional allocations.<br>3. <strong>No Preemption:</strong> Resources can only be released voluntarily."
    },
    'graph': {
      prompt: "Synthesize: Knowledge Graph relationship between CSS Spec & Rendering Engine",
      desc: "1. <strong>Parse HTML/CSS:</strong> Generates DOM & CSSOM trees.<br>2. <strong>Render Tree Construction:</strong> Discards hidden nodes and builds render objects.<br>3. <strong>Layout & Paint:</strong> Computes geometry box coordinates and rasterizes pixels."
    }
  };

  promptQuickChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      promptQuickChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      playTactileClick(720, 'sine');

      const id = chip.getAttribute('data-prompt-id');
      const item = promptDatabase[id];
      if (item && promptTypedText && aiOutputDesc) {
        promptTypedText.textContent = item.prompt;
        aiOutputDesc.style.opacity = '0.2';
        setTimeout(() => {
          aiOutputDesc.innerHTML = item.desc;
          aiOutputDesc.style.opacity = '1';
        }, 160);
      }
    });
  });

  if (btnRegenSim && aiOutputDesc) {
    btnRegenSim.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(820, 'triangle');
      btnRegenSim.textContent = 'Generating... ⚡';
      aiOutputDesc.style.opacity = '0.3';

      setTimeout(() => {
        btnRegenSim.textContent = 'Regenerate ↻';
        aiOutputDesc.style.opacity = '1';
      }, 450);
    });
  }

  // 5. Gentle 3D Tilt Feedback on Interactive Stage Cards
  const stageCards = document.querySelectorAll('.interactive-stage-card');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice && window.innerWidth >= 992) {
    stageCards.forEach(card => {
      const container = card.closest('.project-card-preview') || card;

      container.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        const rotateX = (deltaY * -3.5).toFixed(2);
        const rotateY = (deltaX * 3.5).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      container.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }
}

/**
 * =========================================================================
 * 10. TACTILE AUDIO SYNTHESIZER & FEEDBACK SYSTEM
 * =========================================================================
 */
let audioCtx = null;
let isSoundEnabled = false;

function playTactileClick(freq = 640, type = 'sine') {
  if (!isSoundEnabled) return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.045);
  } catch (e) {
    // Audio Context not permitted or unsupported, fails silently
  }
}

function setupTactileAudioAndFeedback() {
  const soundToggle = document.getElementById('tactile-sound-toggle');
  const soundLabel = document.getElementById('sound-switch-label');
  const soundIcon = document.getElementById('sound-wave-icon');

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      isSoundEnabled = !isSoundEnabled;
      if (soundToggle) {
        soundToggle.classList.toggle('sound-muted', !isSoundEnabled);
      }
      if (soundLabel) {
        soundLabel.innerHTML = isSoundEnabled 
          ? 'Tactile Sound: <strong>ON</strong>' 
          : 'Tactile Sound: <strong>OFF</strong>';
      }
      if (soundIcon) {
        soundIcon.textContent = isSoundEnabled ? '🔊' : '🔇';
      }
      if (isSoundEnabled) {
        playTactileClick(880, 'triangle');
      }
    });
  }

  // Attach tactile sound to all interactive buttons, pills, links and chips
  const interactiveElements = document.querySelectorAll(
    '.tactile-btn, .tactile-pill, .btn-hero-primary, .btn-hero-secondary, .btn-hero-outline, .stack-pill-btn, .btn-tab, .skill-filter-btn, .tactile-role-card, .btn-micro-test, .skill-test-trigger'
  );

  interactiveElements.forEach(el => {
    el.addEventListener('mousedown', () => {
      playTactileClick(600, 'sine');
    });
  });
}

/**
 * =========================================================================
 * 11. HERO LIVE HUD CLOCK & DYNAMIC 3-HEADINGS ROTATOR
 * =========================================================================
 */
function setupHeroLiveClockAndHeadings() {
  // 1. Live Pakistani Time (PKT - UTC+5)
  const clockEl = document.getElementById('hero-live-clock');
  function updateClock() {
    if (!clockEl) return;
    try {
      const now = new Date();
      // Format in Asia/Karachi timezone
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      clockEl.textContent = `PKT (Karachi) ${timeStr}`;
    } catch (e) {
      const now = new Date();
      clockEl.textContent = `PKT ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);

  // 2. Dynamic 3-Headings Rotator & Synchronized Role Cards
  const headlineEl = document.getElementById('dynamic-headline');
  const roleCards = document.querySelectorAll('.tactile-role-card');

  const headings = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      class: 'role-frontend'
    },
    {
      id: 'prompt',
      title: 'Prompt Engineer',
      class: 'role-prompt'
    },
    {
      id: 'ai',
      title: 'AI Enthusiast & Vibe Coder',
      class: 'role-ai'
    }
  ];

  let currentIndex = 0;
  let rotationTimer = null;

  function setHeading(index) {
    currentIndex = index % headings.length;
    const item = headings[currentIndex];

    if (headlineEl) {
      headlineEl.style.opacity = '0';
      headlineEl.style.transform = 'translateY(8px)';

      setTimeout(() => {
        headlineEl.textContent = item.title;
        headlineEl.className = `rotating-headline ${item.class}`;
        headlineEl.style.opacity = '1';
        headlineEl.style.transform = 'translateY(0)';
      }, 160);
    }

    // Synchronize the 3 tactile role cards
    roleCards.forEach(card => {
      const roleId = card.getAttribute('data-role');
      if (roleId === item.id) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  function startRotation() {
    if (rotationTimer) clearInterval(rotationTimer);
    rotationTimer = setInterval(() => {
      setHeading(currentIndex + 1);
    }, 3600);
  }

  // Allow clicking on role cards to immediately switch and pause/restart
  roleCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      playTactileClick(720, 'triangle');
      setHeading(idx);
      startRotation();
    });
  });

  startRotation();
}

/**
 * =========================================================================
 * 12. INTERACTIVE SKILLS MATRIX & SANDBOXES
 * =========================================================================
 */
function setupSkillsInteractiveMatrix() {
  // 1. Skill Category Filter Tabs
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-tactile-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playTactileClick(650, 'sine');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Interactive Sandbox Drawer Toggles
  const triggers = document.querySelectorAll('.skill-test-trigger');
  triggers.forEach(trig => {
    trig.addEventListener('click', () => {
      playTactileClick(700, 'triangle');
      const skillName = trig.getAttribute('data-skill');
      const sandbox = document.getElementById(`sandbox-${skillName}`);
      if (sandbox) {
        const isOpen = sandbox.classList.contains('open');
        sandbox.classList.toggle('open');
        const arrow = trig.querySelector('.arrow');
        if (arrow) {
          arrow.textContent = isOpen ? '↓' : '↑';
        }
      }
    });
  });

  // 3. React Interactive Counter Sandbox
  const btnDecrement = document.getElementById('react-decrement-btn');
  const btnIncrement = document.getElementById('react-increment-btn');
  const displayCount = document.getElementById('react-count-num');
  let currentCount = 0;

  if (btnDecrement && btnIncrement && displayCount) {
    btnDecrement.addEventListener('click', () => {
      currentCount--;
      displayCount.textContent = currentCount;
      playTactileClick(480, 'sine');
    });

    btnIncrement.addEventListener('click', () => {
      currentCount++;
      displayCount.textContent = currentCount;
      playTactileClick(750, 'sine');
    });
  }

  // 4. JavaScript Live Event Console Sandbox
  const pingBtn = document.getElementById('js-ping-btn');
  const consoleOut = document.getElementById('js-console-out');

  if (pingBtn && consoleOut) {
    let pingCount = 0;
    pingBtn.addEventListener('click', (e) => {
      pingCount++;
      playTactileClick(800, 'sine');
      const timeStr = new Date().toLocaleTimeString();
      consoleOut.textContent = `[${timeStr}] Event #${pingCount} dispatched! (X: ${Math.round(e.clientX)}, Y: ${Math.round(e.clientY)})`;
    });
  }
}

/**
 * =========================================================================
 * 13. CERTIFICATE PICTURE FRAMES & DUMMY PREVIEWS
 * Displays the verified certificate pictures with high-resolution lightbox support.
 * Arfa can simply replace certificate-1.jpg, certificate-2.jpg, certificate-3.jpg.
 * =========================================================================
 */
function setupCertificatePhotoUploads() {
  // Gracefully handles image load fallbacks
  [1, 2, 3].forEach(num => {
    const photoImg = document.getElementById(`cert-photo-${num}`);
    if (photoImg) {
      photoImg.onerror = () => {
        photoImg.src = `certificate-${num}.jpg`;
      };
    }
  });
}

/**
 * =========================================================================
 * 14. TACTILE JELLY PHYSICS ENGINE & SQUISH PLAYGROUND
 * Interactive squash-and-stretch tactile effects across cards, buttons, and avatar
 * =========================================================================
 */
function setupJellyTactileInteractions() {
  const jellyBtn = document.getElementById('btn-squish-jelly');
  const jellyAvatar = document.getElementById('jelly-avatar');
  const squishCountBadge = document.getElementById('squish-count');

  let squishCount = 0;

  if (jellyBtn && jellyAvatar) {
    jellyBtn.addEventListener('click', () => {
      squishCount++;
      if (squishCountBadge) {
        squishCountBadge.textContent = `${squishCount} ${squishCount === 1 ? 'squish' : 'squishes'}`;
      }

      // Play rich tactile sound
      playTactileClick(420, 'sine');
      setTimeout(() => playTactileClick(680, 'triangle'), 80);

      // Trigger jelly wobble & squish animations
      jellyAvatar.classList.remove('jelly-squish');
      jellyBtn.classList.remove('jelly-squish');
      void jellyAvatar.offsetWidth; // Reflow to restart animation
      void jellyBtn.offsetWidth;
      jellyAvatar.classList.add('jelly-squish');
      jellyBtn.classList.add('jelly-squish');

      setTimeout(() => {
        jellyAvatar.classList.remove('jelly-squish');
        jellyBtn.classList.remove('jelly-squish');
      }, 600);
    });

    // Also squish directly when clicking on the jelly avatar pudding
    jellyAvatar.addEventListener('click', () => {
      jellyBtn.click();
    });
  }

  // Add click-squish tactile response to all elements marked with .jelly-effect
  const jellyElements = document.querySelectorAll('.jelly-effect');
  jellyElements.forEach(el => {
    el.addEventListener('click', () => {
      el.classList.add('jelly-squish');
      setTimeout(() => {
        el.classList.remove('jelly-squish');
      }, 500);
    });
  });

  // Pre-footer Gummy Jelly Buttons & Mascot
  const prefooterMascot = document.getElementById('prefooter-jelly-mascot');
  const prefooterCounter = document.getElementById('prefooter-squish-num');
  const gummyButtons = document.querySelectorAll('.gummy-jelly-btn');
  let prefooterSquishCount = 0;

  function handlePrefooterSquish(freq = 520, label = 'Squish!') {
    prefooterSquishCount++;
    if (prefooterCounter) {
      prefooterCounter.textContent = prefooterSquishCount;
    }
    playTactileClick(freq, 'triangle');
    setTimeout(() => playTactileClick(freq * 1.25, 'sine'), 70);

    if (prefooterMascot) {
      prefooterMascot.classList.remove('jelly-squish');
      void prefooterMascot.offsetWidth;
      prefooterMascot.classList.add('jelly-squish');
      setTimeout(() => prefooterMascot.classList.remove('jelly-squish'), 600);
    }
  }

  if (prefooterMascot) {
    prefooterMascot.addEventListener('click', () => {
      handlePrefooterSquish(600, '🍮 Pudding!');
    });
  }

  gummyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const note = parseInt(btn.getAttribute('data-note') || '520', 10);
      const label = btn.getAttribute('data-label') || 'Gummy';
      handlePrefooterSquish(note, label);
    });
  });
}

/**
 * =========================================================================
 * 15. PROPER "LET'S TALK" SECTION INTERACTIONS
 * Topic selection pills, one-click copy email button, and interactive dispatch
 * =========================================================================
 */
function setupLetsTalkSection() {
  // 1. Topic Pills Selector
  const topicBtns = document.querySelectorAll('#talk-topics-row .talk-topic-btn');
  const topicInput = document.getElementById('selected-topic-input');

  topicBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      topicBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const topic = btn.getAttribute('data-topic');
      if (topicInput && topic) {
        topicInput.value = topic;
      }
      playTactileClick(680, 'sine');
    });
  });

  // 2. One-Click Copy Email Button
  const copyBtn = document.getElementById('btn-copy-email');
  const copyLabel = document.getElementById('copy-btn-label');
  const emailVal = 'arfamunam01@gmail.com';

  if (copyBtn && copyLabel) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailVal);
        } else {
          // Fallback
          const textarea = document.createElement('textarea');
          textarea.value = emailVal;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }

        playTactileClick(880, 'triangle');
        copyLabel.textContent = 'Copied! ✓';
        copyBtn.style.background = '#10B981';

        setTimeout(() => {
          copyLabel.textContent = 'Copy';
          copyBtn.style.background = '';
        }, 2200);
      } catch (err) {
        copyLabel.textContent = 'Copied!';
      }
    });
  }
}


