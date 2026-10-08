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

  // 4. Who I Am 3D Interactive Parallax & Spatial Universe
  setupWhoIAmParallax();

  // 5. Certificate Lightbox Modal (Disabled per user requirement)
  setupCertificateModal();

  // 6. Animated Number Counters
  setupStatsCounter();

  // 7. Scroll Reveal Observer
  setupScrollReveal();

  // 8. Contact Form Handler
  setupContactForm();

  // 9. Back to Top Button (Strictly footer/bottom only)
  setupBackToTop();

  // 9. Premium Micro-Interactions (Cursor, Magnetic buttons, FounderOS tabs & 3D tilt, Exploring radar)
  setupBespokeCursor();
  setupMagneticButtons();
  setupExploringRadar();

  // 10. Tactile Sound FX & Interactive Feedback System
  setupTactileAudioAndFeedback();

  // 11. Hero Live HUD Clock & Dynamic 3-Headings Rotator
  setupHeroLiveClockAndHeadings();

  // 12. Interactive Compact Skill Ecosystem & Constellation
  setupSkillEcosystem();

  // 13. Certificate Picture Slots & Horizontal Exhibition Gallery
  setupCertificatePhotoUploads();
  setupCertificatesGallery();

  // 14. Tactile Elastic Spring Buttons & 3D Hero Parallax (Refined, Non-Childish)
  setupTactileButtonInteractions();
  setupHero3DPortraitParallax();

  // 15. Let's Talk Section (Topic pills, Copy Email, Form feedback)
  setupLetsTalkSection();

  // 16. Hero Portrait & Contact 3D Image Insert/Uploads
  setupHeroPhotoUpload();
  setupContact3DUpload();

  // 17. Full Page Project Immersive Experience Modal
  setupProjectFullPageExperience();

  // 18. Refined About Me Perspective Tabs, Copy Bio & Focus Skills
  setupAboutMeRefinement();

  // 19. Skills Compiler Loading Simulation & Category Filters
  setupSkillsCompiler();
  setupSkeuomorphicServices();

  // 20. Cinematic Exploring Frontier Labs & Telemetry Terminal
  setupCinematicFrontierLabs();

  // 21. Futuristic 2026 3D Dark Glass Footer Interactions
  setupFuturisticFooter();

  // 22. Currently Learning 3D Interactive Ecosystem
  setupLearningEcosystem();

  // 23. My Learning Journey Cinematic Interactive Storybook & Phone
  setupLearningJourneyStory();

  // 24. Dedicated GitHub Showcase & Interactive Activity Visualization
  setupGitHubShowcaseSection();

  // 25. Cinematic Welcome Intro Opening Experience (Isolated Overlay)
  initCinematicWelcomeIntro();
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
 * Completely disabled per user requirement ("i dont want any option like view full certificate").
 */
function setupCertificateModal() {
  const modal = document.getElementById('cert-modal');
  if (modal) {
    modal.style.display = 'none';
  }
}

/**
 * Interactive 3D Parallax & Mouse Response for Who I Am Creative Universe & Roadmap
 * Smoothly shifts 3D orbs, rings, stars, and glowing blobs with cursor movement.
 * Also handles interactive roadmap node focus, pillar interactions, and path lighting.
 */
function setupWhoIAmParallax() {
  const section = document.getElementById('about');
  if (!section) return;

  const parallaxItems = section.querySelectorAll('[data-parallax]');
  const glowBlobs = section.querySelectorAll('.who-glow-blob[data-speed]');
  const curvedLine = document.getElementById('roadmap-curved-line');
  const devNodes = section.querySelectorAll('.dev-path-node');
  const pillarTiles = section.querySelectorAll('.pillar-tile-obj');

  // 1. Interactive Node & Pillar Tactile Feedback + Path Lighting
  const nodeColors = {
    'frontend': '#FA5538',
    'backend': '#06B6D4',
    'ai': '#8B5CF6'
  };

  devNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const nodeKey = node.getAttribute('data-node');
      const accent = nodeColors[nodeKey] || '#FA5538';
      if (curvedLine) {
        curvedLine.style.stroke = accent;
        curvedLine.style.strokeWidth = '5px';
        curvedLine.style.filter = `drop-shadow(0 0 10px ${accent})`;
      }
      playTactileClick(640, 'sine');
    });

    node.addEventListener('mouseleave', () => {
      if (curvedLine) {
        curvedLine.style.stroke = 'url(#roadmapPathGrad)';
        curvedLine.style.strokeWidth = '3.5px';
        curvedLine.style.filter = 'none';
      }
    });
  });

  pillarTiles.forEach(tile => {
    tile.addEventListener('mouseenter', () => {
      playTactileClick(720, 'sine');
    });
  });

  // 2. Parallax mouse tracking
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let isHovering = false;
  let animationFrameId = null;

  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    // Normalized coordinates (-1 to 1) relative to section center
    targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    if (!isHovering) {
      isHovering = true;
      startLoop();
    }
  }, { passive: true });

  section.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function startLoop() {
    function tick() {
      // Smooth linear interpolation (lerp)
      mouseX += (targetX - mouseX) * 0.08;
      mouseY += (targetY - mouseY) * 0.08;

      parallaxItems.forEach(el => {
        const factor = parseFloat(el.getAttribute('data-parallax')) || 15;
        const moveX = mouseX * factor;
        const moveY = mouseY * factor;
        el.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0)`;
      });

      glowBlobs.forEach(blob => {
        const speed = parseFloat(blob.getAttribute('data-speed')) || 0.04;
        const moveX = mouseX * speed * 250;
        const moveY = mouseY * speed * 250;
        blob.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0)`;
      });

      if (Math.abs(targetX - mouseX) > 0.001 || Math.abs(targetY - mouseY) > 0.001 || isHovering) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        isHovering = false;
        animationFrameId = null;
      }
    }

    if (!animationFrameId) {
      animationFrameId = requestAnimationFrame(tick);
    }
  }
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
 * Functional contact form with validation, submission feedback, character counter, and email draft trigger
 */
function setupContactForm() {
  const form = document.getElementById('contact-form');
  const msgBox = document.getElementById('form-msg');
  const submitBtn = document.getElementById('submit-btn');
  const messageTextarea = document.getElementById('form-message');
  const charCurr = document.getElementById('char-curr');
  const jumpBtn = document.getElementById('conn-btn-jump-form');
  const contactSection = document.getElementById('contact');

  // Live character counter
  if (messageTextarea && charCurr) {
    messageTextarea.addEventListener('input', () => {
      charCurr.textContent = messageTextarea.value.length;
    });
  }

  // Smooth scroll and focus for "Let's Chat" button
  if (jumpBtn) {
    jumpBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('form-name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 350);
      }
    });
  }

  // Desktop subtle cursor parallax for 3D centerpiece & floating depth elements
  const centerpieceStage = document.getElementById('conn-centerpiece-stage');
  if (centerpieceStage && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const headphones = centerpieceStage.querySelector('.conn-headphones-visual');
    const floatElems = centerpieceStage.querySelectorAll('.conn-float-element');
    const orbitBack = centerpieceStage.querySelector('.conn-orbit-back');
    const radialGlow = centerpieceStage.querySelector('.conn-centerpiece-radial-glow');

    let mouseX = 0;
    let mouseY = 0;
    let currX = 0;
    let currY = 0;
    let animId = null;
    let isHovering = false;

    function renderParallax() {
      currX += (mouseX - currX) * 0.08;
      currY += (mouseY - currY) * 0.08;

      if (headphones) {
        headphones.style.transform = `translate3d(${(currX * 8).toFixed(1)}px, ${(currY * 6 - 2).toFixed(1)}px, 15px) rotateY(${(currX * 1.8).toFixed(1)}deg) rotateX(${(-currY * 1.5).toFixed(1)}deg)`;
      }

      if (radialGlow) {
        radialGlow.style.transform = `translate(calc(-50% + ${(currX * 4).toFixed(1)}px), calc(-50% + ${(currY * 4).toFixed(1)}px))`;
      }

      if (orbitBack) {
        orbitBack.style.transform = `translate(calc(-50% + ${(currX * 3).toFixed(1)}px), calc(-50% + ${(currY * 3).toFixed(1)}px))`;
      }

      floatElems.forEach((el) => {
        const depth = parseFloat(el.getAttribute('data-depth')) || 0.4;
        const shiftX = (currX * depth * 16).toFixed(1);
        const shiftY = (currY * depth * 14).toFixed(1);
        el.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
      });

      const dist = Math.abs(mouseX - currX) + Math.abs(mouseY - currY);
      if (isHovering || dist > 0.01) {
        animId = requestAnimationFrame(renderParallax);
      } else {
        if (!isHovering) {
          if (headphones) headphones.style.transform = '';
          if (radialGlow) radialGlow.style.transform = '';
          if (orbitBack) orbitBack.style.transform = '';
          floatElems.forEach((el) => { el.style.transform = ''; });
          animId = null;
        }
      }
    }

    centerpieceStage.addEventListener('mousemove', (e) => {
      const rect = centerpieceStage.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX = Math.max(-1, Math.min(1, normX));
      mouseY = Math.max(-1, Math.min(1, normY));
      isHovering = true;
      if (!animId) {
        animId = requestAnimationFrame(renderParallax);
      }
    });

    centerpieceStage.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
      isHovering = false;
      if (!animId) {
        animId = requestAnimationFrame(renderParallax);
      }
    });
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name']?.value.trim();
    const email = form.elements['email']?.value.trim();
    const subject = form.elements['subject']?.value.trim() || 'Portfolio Contact';
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
      const mailtoUrl = `mailto:arfamunam01@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`)}`;
      
      showMessage(`Thank you, ${name}! Your message has been prepared. If your mail client didn't open automatically, feel free to email directly at arfamunam01@gmail.com.`, 'success');

      form.reset();
      if (charCurr) charCurr.textContent = '0';
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send Message</span><span class="conn-btn-plane" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg></span>`;

      // Trigger mail client safely
      window.location.href = mailtoUrl;
    }, 600);
  });

  function showMessage(text, type) {
    if (!msgBox) return;
    msgBox.style.display = 'block';
    msgBox.textContent = text;
    if (type === 'error') {
      msgBox.style.background = 'rgba(239, 68, 68, 0.15)';
      msgBox.style.color = '#FCA5A5';
      msgBox.style.border = '1px solid rgba(239, 68, 68, 0.4)';
    } else {
      msgBox.style.background = 'rgba(16, 185, 129, 0.15)';
      msgBox.style.color = '#6EE7B7';
      msgBox.style.border = '1px solid rgba(16, 185, 129, 0.4)';
    }
  }
}

/**
 * Smooth Back to Top Button
 * Strictly restricted to only appear at the very bottom / footer of the portfolio
 * Will NEVER appear on Who I Am / About section or upper parts
 */
function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    const scrollDistFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
    // Only visible when user reaches the very bottom near the footer/contact section
    if (scrollDistFromBottom < 650 && window.scrollY > 2600) {
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
 * Bespoke Precision Cursor — 2026 Fluid Luminous Orbital Edition
 * Coordinates precision dot, responsive magnetic follower, and ambient trailing flare.
 */
function setupBespokeCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-follower');
  const flare = document.getElementById('cursor-flare');

  // Guard against touch devices and users preferring reduced motion
  if (!dot || !ring) return;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isTouchDevice || prefersReducedMotion || window.innerWidth < 992) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    if (flare) flare.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let flareX = mouseX;
  let flareY = mouseY;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      if (flare) flare.style.opacity = '1';
    }

    // Direct translate for precision dot
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    isVisible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    if (flare) flare.style.opacity = '0';
  });

  window.addEventListener('mouseenter', () => {
    isVisible = true;
    dot.style.opacity = '1';
    ring.style.opacity = '1';
    if (flare) flare.style.opacity = '1';
  });

  // Smooth trailing physics for ring and ambient light flare
  function renderCursorPhysics() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

    if (flare) {
      flareX += (mouseX - flareX) * 0.08;
      flareY += (mouseY - flareY) * 0.08;
      flare.style.transform = `translate3d(${flareX}px, ${flareY}px, 0)`;
    }

    requestAnimationFrame(renderCursorPhysics);
  }
  requestAnimationFrame(renderCursorPhysics);

  // Tactile press response
  window.addEventListener('mousedown', () => {
    ring.classList.add('cursor-press');
    dot.classList.add('cursor-press');
  });

  window.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-press');
    dot.classList.remove('cursor-press');
  });

  // Hover target enhancement with fluid scale and tactile trigger
  const interactiveSelector = 'a, button, input, textarea, [role="button"], .clay-tile, .pipeline-node, .prompt-skill-pill, .skill-platform, .project-card, .certificate-card, .metric-card-pill, .service-box, .mockup-tab-pill, .explore-tab-pill, .f-nav-link, .glass-social-orb, .console-feature-cell, .bottom-bar-center-node, .f3d-item, .hero-role-pill, .dev-path-node, .sc-secondary-card, .sc-indicator-step, .sc-tech-chip';

  document.addEventListener('mouseover', (e) => {
    const target = e.target && e.target.closest ? e.target.closest(interactiveSelector) : null;
    if (target) {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    }
  }, { passive: true });

  document.addEventListener('mouseout', (e) => {
    const target = e.target && e.target.closest ? e.target.closest(interactiveSelector) : null;
    if (target) {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    }
  }, { passive: true });
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

  if (tabs.length && textElem) {
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

  // Standalone Exploring Labs Inspection Trigger
  const inspectBtns = document.querySelectorAll('.btn-lab-inspect');
  const termDynamicMsg = document.getElementById('term-dynamic-message');

  const labTelemetryLogs = {
    'ai-agents': [
      '<div class="term-line"><span class="term-dim">[09:42:01]</span> <span class="term-accent">INIT:</span> Initializing Multi-Agent Orchestration Bus...</div>',
      '<div class="term-line"><span class="term-dim">[09:42:02]</span> <span class="term-info">PLAN:</span> Planner agent decomposed user query into 3 parallel sub-tasks</div>',
      '<div class="term-line"><span class="term-dim">[09:42:03]</span> <span class="term-purple">EXEC:</span> Sub-agent "Researcher" returned verified citations (100% precision)</div>',
      '<div class="term-line"><span class="term-dim">[09:42:04]</span> <span class="term-success">SUCCESS:</span> Synthesized response delivered in 410ms with zero hallucination.</div>'
    ],
    'fullstack-edge': [
      '<div class="term-line"><span class="term-dim">[11:15:10]</span> <span class="term-accent">PING:</span> Connecting to Edge PostgreSQL node (iad-iad1)...</div>',
      '<div class="term-line"><span class="term-dim">[11:15:11]</span> <span class="term-info">RLS:</span> Evaluating Row-Level Security policy for auth.uid() -> PERMIT</div>',
      '<div class="term-line"><span class="term-dim">[11:15:11]</span> <span class="term-purple">CACHE:</span> Stale-while-revalidate hit at edge CDN (TTL: 3600s)</div>',
      '<div class="term-line"><span class="term-dim">[11:15:12]</span> <span class="term-success">SUCCESS:</span> Response dispatched with 12ms latency.</div>'
    ],
    'fluid-canvas': [
      '<div class="term-line"><span class="term-dim">[14:02:44]</span> <span class="term-accent">GPU:</span> Requesting WebGL2 / WebGPU compute device context...</div>',
      '<div class="term-line"><span class="term-dim">[14:02:45]</span> <span class="term-info">SIM:</span> 24,000 particle spring-lattice simulation loaded to VRAM</div>',
      '<div class="term-line"><span class="term-dim">[14:02:45]</span> <span class="term-purple">RAF:</span> Compositor frame rate: steady 60.0 FPS under 8x MSAA</div>',
      '<div class="term-line"><span class="term-dim">[14:02:46]</span> <span class="term-success">SUCCESS:</span> Fluid surface rendering with zero memory leaks.</div>'
    ],
    'autonomous-systems': [
      '<div class="term-line"><span class="term-dim">[16:30:20]</span> <span class="term-accent">CRON:</span> n8n Workflow #704 triggered by inbound webhook</div>',
      '<div class="term-line"><span class="term-dim">[16:30:21]</span> <span class="term-info">PIPE:</span> Sanitizing payload -> running sentiment vector classification</div>',
      '<div class="term-line"><span class="term-dim">[16:30:22]</span> <span class="term-purple">SYNC:</span> Dispatching database update & Slack team notification</div>',
      '<div class="term-line"><span class="term-dim">[16:30:22]</span> <span class="term-success">SUCCESS:</span> Pipeline executed cleanly in 142ms. Zero manual steps.</div>'
    ]
  };

  inspectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLab = btn.getAttribute('data-target-lab');
      playTactileClick(720, 'sine');
      setTimeout(() => playTactileClick(940, 'triangle'), 100);

      if (termDynamicMsg && labTelemetryLogs[targetLab]) {
        termDynamicMsg.innerHTML = '<div class="term-line"><span class="term-info">CONNECTING TO LAB TELEMETRY [' + targetLab.toUpperCase() + ']...</span></div>';
        const logs = labTelemetryLogs[targetLab];
        logs.forEach((logLine, idx) => {
          setTimeout(() => {
            termDynamicMsg.innerHTML += logLine;
          }, (idx + 1) * 160);
        });
      }
    });
  });
}

/**
 * =========================================================================
 * VIBRANT HIGH-VISIBILITY PROJECT SHOWCASE SYSTEM
 * Handles Category Filtering, Micro-Interactive Demos & Tactile Controls
 * =========================================================================
 */
/**
 * =========================================================================
 * 2026 PREMIUM "WORK, IN MOTION" 3D HERO INTERACTION
 * Physically emerging 3D character with multi-layer spring parallax,
 * cursor tracking, smooth hover depth lift, and editorial entrance reveal.
 * =========================================================================
 */
function setupWorkInMotionIntro() {
  const hero = document.getElementById('work-in-motion-hero');
  if (!hero) return;

  // 1. Viewport Entrance Reveal (one-shot, stable)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          hero.classList.add('is-revealed');
          observer.unobserve(hero);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(hero);
  } else {
    hero.classList.add('is-revealed');
  }

  // Smooth scroll bridge to projects carousel
  const bridgeLink = document.getElementById('bridge-to-projects-link');
  if (bridgeLink) {
    bridgeLink.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('gallery-stage-viewport') || document.querySelector('.gallery-stage-viewport');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Check reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const stage = document.getElementById('motion-character-stage');
  const frame = document.getElementById('portal-frame-chassis');
  const character = document.getElementById('motion-character-entity');
  const halo = stage ? stage.querySelector('.portal-ambient-halo') : null;
  const spotlight = stage ? stage.querySelector('.frame-ambient-spotlight') : null;
  const gemEls = stage ? Array.from(stage.querySelectorAll('.portal-gem')) : [];

  if (!stage || !frame || !character) return;

  let targetRotX = 0, targetRotY = 0;
  let currRotX = 0, currRotY = 0;
  let targetTransX = 0, targetTransY = 0;
  let currTransX = 0, currTransY = 0;
  let isHovered = false;
  let rafId = null;

  function updatePhysics() {
    currRotX += (targetRotX - currRotX) * 0.08;
    currRotY += (targetRotY - currRotY) * 0.08;
    currTransX += (targetTransX - currTransX) * 0.08;
    currTransY += (targetTransY - currTransY) * 0.08;

    const zDepth = isHovered ? 56 : 46;
    const charScale = isHovered ? 1.03 : 1.0;

    // 1. Frame chassis: physical 3D tilt with subtle translation
    frame.style.transform = `translateX(calc(-50% + ${(currTransX * 0.45).toFixed(2)}px)) translateY(${(currTransY * 0.45).toFixed(2)}px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg)`;

    // 2. Character entity: foreground 3D breakout at higher depth & parallax disparity
    character.style.transform = `translateX(calc(-50% + ${(currTransX * 0.85).toFixed(2)}px)) translateY(${(currTransY * 0.85).toFixed(2)}px) translateZ(${zDepth}px) rotateX(${(currRotX * 1.15).toFixed(2)}deg) rotateY(${(currRotY * 1.15).toFixed(2)}deg) scale(${charScale})`;

    // 3. Interior spotlight: counter-shift for deep interior volume
    if (spotlight) {
      spotlight.style.transform = `translate(${(-currTransX * 0.55).toFixed(1)}px, ${(-currTransY * 0.55).toFixed(1)}px)`;
    }

    // 4. Floating 3D Prismatic Gems parallax
    gemEls.forEach((gem) => {
      const depth = parseFloat(gem.getAttribute('data-depth')) || 1.0;
      const gx = currTransX * 0.9 * depth;
      const gy = currTransY * 0.9 * depth;
      const gz = 46 * depth;
      gem.style.transform = `translate3d(${gx.toFixed(1)}px, ${gy.toFixed(1)}px, ${gz.toFixed(1)}px)`;
    });

    // 5. Ambient halo
    if (halo) {
      halo.style.transform = `translate(${(currTransX * 0.25).toFixed(1)}px, ${(currTransY * 0.25).toFixed(1)}px) scale(${isHovered ? 1.08 : 1})`;
    }

    // Continue loop if active or still decelerating
    if (isHovered || Math.abs(currRotX - targetRotX) > 0.01 || Math.abs(currRotY - targetRotY) > 0.01 || Math.abs(currTransX - targetTransX) > 0.01) {
      rafId = requestAnimationFrame(updatePhysics);
    } else {
      rafId = null;
      if (!isHovered) {
        frame.style.transform = '';
        character.style.transform = '';
        if (spotlight) spotlight.style.transform = '';
        gemEls.forEach(gem => { gem.style.transform = ''; });
        if (halo) halo.style.transform = '';
      }
    }
  }

  function startPhysicsLoop() {
    if (!rafId) {
      rafId = requestAnimationFrame(updatePhysics);
    }
  }

  // Pointer tracking across the 3D portal stage
  stage.addEventListener('pointerenter', () => {
    isHovered = true;
    startPhysicsLoop();
  });

  stage.addEventListener('pointermove', (e) => {
    const rect = stage.getBoundingClientRect();
    const normX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2)); // -1 to 1
    const normY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2)); // -1 to 1

    targetRotX = -normY * 4.5;
    targetRotY = normX * 5.0;
    targetTransX = normX * 12;
    targetTransY = normY * 10;

    startPhysicsLoop();
  });

  stage.addEventListener('pointerleave', () => {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    targetTransX = 0;
    targetTransY = 0;
    startPhysicsLoop();
  });
}

/**
 * =========================================================================
 * 2026 PREMIUM CINEMATIC HORIZONTAL PROJECT GALLERY ENGINE
 * Inspired directly by attached reference composition (portfoliooo.png)
 * Warm Ivory Canvas • Center Active Card (Scale 1.0) • 3D Flanking Cards
 * Explicit Click-to-Switch Interaction (NO hover switching)
 * 01 StudyPilot-AI • 02 Velora Store • 03 Kumo Ramen • 04 PastelForm
 * =========================================================================
 */
function setupProjectsShowcase() {
  const section = document.getElementById('projects');
  if (!section) return;

  // Initialize the 2026 Premium "Work, in Motion" 3D Hero Introduction
  setupWorkInMotionIntro();

  const track = document.getElementById('gallery-track-3d');
  const viewport = document.getElementById('gallery-stage-viewport');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  const counterCurr = document.getElementById('gallery-counter-curr');
  const counterTotal = document.getElementById('gallery-counter-total');
  const indicatorCapsule = document.getElementById('gallery-indicator-capsule');
  const indicatorBtns = indicatorCapsule ? indicatorCapsule.querySelectorAll('.indicator-step') : [];

  if (!track) return;

  // Authentic 5 Projects Data with User's Uploaded Screenshots
  const projects = [
    {
      id: "prism",
      key: "prism",
      number: "01",
      title: "Prism",
      category: "3D WebGL & Spatial AR",
      tagline: "AI-Powered AR Glasses Product Showcase with Three.js & GLSL Shaders",
      description: "An immersive spatial product landing experience for AI-powered AR glasses featuring custom WebGL/Three.js shaders, reactive glass refraction physics, interactive 3D model controls, and fluid scroll-triggered cinematic choreography.",
      tags: ["Three.js", "WebGL", "GLSL Shaders", "JavaScript ES6+", "GSAP Motion"],
      liveUrl: "https://github.com/ArfaMunam47/prism-one-3d",
      codeUrl: "https://github.com/ArfaMunam47/prism-one-3d",
      accent: "#8B5CF6",
      image: "Prism.jpeg"
    },
    {
      id: "studypilot",
      key: "studypilot",
      number: "02",
      title: "StudyPilot AI",
      category: "AI Academic Copilot",
      tagline: "Intelligent Academic Workspace with Adaptive Flashcards & Study Planner",
      description: "An autonomous learning operating system engineered to transform dense textbook chapters, lecture transcripts, and complex syllabi into structured revision roadmaps, spaced-repetition flashcards, and conceptual quizzes using prompt-engineered Claude 3.7 reasoning loops.",
      tags: ["Claude 3.7 AI", "React", "Tailwind CSS", "FastAPI", "Spaced Repetition"],
      liveUrl: "https://github.com/ArfaMunam47/StudyPilot-AI",
      codeUrl: "https://github.com/ArfaMunam47/StudyPilot-AI",
      accent: "#6366F1",
      image: "studypilot.png"
    },
    {
      id: "velora",
      key: "velora",
      number: "03",
      title: "Velora",
      category: "Minimalist E-Commerce",
      tagline: "Minimalist High-Conversion Fashion & Lifestyle Storefront",
      description: "A chic modern e-commerce storefront designed with editorial typography, ultra-responsive grid layouts, instant faceted filtering, slide-out micro-cart drawer, and dynamic voucher calculations for a frictionless retail journey.",
      tags: ["JavaScript ES6+", "React", "Tailwind CSS", "Stripe Checkout", "State Engine"],
      liveUrl: "https://github.com/ArfaMunam47/Velora-Store",
      codeUrl: "https://github.com/ArfaMunam47/Velora-Store",
      accent: "#FA5538",
      image: "veloraa.png"
    },
    {
      id: "kumo",
      key: "kumo",
      number: "04",
      title: "Kumo Ramen",
      category: "Artisan Culinary Experience",
      tagline: "Modern Artisan Japanese Ramen House with Interactive Customizer & Sensory Motion",
      description: "An evocative culinary showcase for an artisan Tokyo ramen bar. Features an interactive bowl builder (broth richness, noodle firmness, chashu pork, ajitsuke tamago), ambient kitchen soundscapes, reservation table picker, and sensory editorial dark aesthetics.",
      tags: ["JavaScript ES6+", "CSS3 Motion", "Interactive State", "Order Calculator", "Audio Ambiance"],
      liveUrl: "https://github.com/ArfaMunam47/kumo-ramen-showcase",
      codeUrl: "https://github.com/ArfaMunam47/kumo-ramen-showcase",
      accent: "#F59E0B",
      image: "kumo.png"
    },
    {
      id: "pastelform",
      key: "pastelform",
      number: "05",
      title: "Pastel Form",
      category: "Aesthetic Form Engine",
      tagline: "Delightful Multi-Step Survey & Feedback Flow with Soft Pastel Themes",
      description: "A fluid, human-centered form and questionnaire experience crafted with soothing pastel palettes, micro-interactions, real-time validation, dynamic branch logic, and instant feedback loops that make data collection an absolute joy.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Accessible Forms", "State Engine"],
      liveUrl: "https://github.com/ArfaMunam47/pastelform",
      codeUrl: "https://github.com/ArfaMunam47/pastelform",
      accent: "#EC4899",
      image: "pastel.png"
    }
  ];

  const totalCount = projects.length;
  if (counterTotal) counterTotal.textContent = String(totalCount).padStart(2, '0');

  let activeIndex = 0;
  let isAnimating = false;
  let isDragging = false;
  let dragStartX = 0;
  let dragCurrentX = 0;
  let dragHasMoved = false;

  // Build the 5 cards into DOM once with clean unified structure
  track.innerHTML = '';
  const cardElements = [];

  projects.forEach((proj, idx) => {
    const card = document.createElement('article');
    card.className = `cinematic-project-card proj-card-${proj.id}`;
    card.setAttribute('data-index', idx);
    card.setAttribute('data-project', proj.id);
    card.setAttribute('data-accent', proj.accent);
    card.style.setProperty('--card-accent', proj.accent);
    card.setAttribute('role', 'group');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${proj.number} of ${totalCount}: ${proj.title}`);

    card.innerHTML = `
      <!-- TOP: Clean Horizontal Project Header (01 Prism) -->
      <div class="card-window-bar">
        <div class="card-project-identity">
          <span class="card-project-num">${proj.number}</span>
          <h3 class="card-project-title">${proj.title}</h3>
        </div>
        <span class="card-category-pill">${proj.category}</span>
      </div>

      <!-- MAIN HERO: Contained Framed Device Mockup Inset -->
      <div class="card-preview-viewport">
        <div class="mockup-project-image-wrap">
          <div class="mockup-frame-bar" aria-hidden="true">
            <div class="frame-window-dots">
              <span class="f-dot dot-red"></span>
              <span class="f-dot dot-yellow"></span>
              <span class="f-dot dot-green"></span>
            </div>
            <div class="frame-browser-address">
              <span class="frame-secure-icon">🔒</span>
              <span class="frame-browser-url">${proj.title.toLowerCase().replace(/\s+/g, '')}.dev</span>
            </div>
            <div class="frame-bar-spacer"></div>
          </div>
          <div class="mockup-frame-canvas">
            <img 
              src="${proj.image}" 
              alt="${proj.title} — Authentic Project Screenshot" 
              class="project-screenshot-img" 
              loading="lazy" 
            />
          </div>
        </div>
        <div class="card-flank-cue" aria-hidden="true">
          <span>Click to View</span>
        </div>
      </div>

      <!-- BOTTOM: Clean Compact Action Buttons -->
      <div class="card-actions-bar">
        <button type="button" class="btn-card-explore tactile-btn" data-project-key="${proj.key}">
          <span>Explore Project</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </button>

        <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary tactile-btn" aria-label="${proj.title} Live Demo">
          <span>Live Demo</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        <a href="${proj.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary btn-card-github tactile-btn" aria-label="${proj.title} GitHub Repository">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span class="btn-text-github">GitHub</span>
        </a>
      </div>
    `;

    // Click handler for card
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;

      const exploreBtn = e.target.closest('.btn-card-explore');
      if (exploreBtn) {
        e.preventDefault();
        e.stopPropagation();
        const pKey = exploreBtn.getAttribute('data-project-key');
        if (typeof window.openProjectModal === 'function') {
          window.openProjectModal(pKey);
        } else {
          const tabBtn = document.querySelector(`#fullpage-nav-tabs [data-project="${pKey}"]`);
          if (tabBtn) tabBtn.click();
        }
        return;
      }

      if (idx !== activeIndex && !isAnimating && !dragHasMoved) {
        e.preventDefault();
        switchProject(idx);
      } else if (idx === activeIndex && !dragHasMoved) {
        // Clicking the active center card opens the detailed project modal
        if (typeof window.openProjectModal === 'function') {
          window.openProjectModal(proj.key);
        }
      }
    });

    // Keyboard navigation on individual card
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (idx !== activeIndex) {
          e.preventDefault();
          switchProject(idx);
        } else {
          if (typeof window.openProjectModal === 'function') {
            e.preventDefault();
            window.openProjectModal(proj.key);
          }
        }
      }
    });

    // Desktop cursor hover 3D tilt on active center card
    card.addEventListener('mousemove', (e) => {
      if (idx !== activeIndex || isDragging || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const rect = card.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const tiltX = -normY * 4.5;
      const tiltY = normX * 4.5;
      card.style.transform = `translate3d(0, 0, 100px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1)`;
    });

    card.addEventListener('mouseleave', () => {
      if (idx === activeIndex) {
        card.style.transform = 'translate3d(0, 0, 95px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    });

    track.appendChild(card);
    cardElements.push(card);
  });

  // Responsive Carousel Geometry Provider for Symmetrical 5-Card Layout with Distinct Separation
  function getCarouselGeometry() {
    const w = window.innerWidth;
    if (w <= 480) {
      return {
        nearX: Math.min(w * 0.40, 140),
        farX: Math.min(w * 0.72, 240),
        scaleCenter: 1.0,
        scaleNear: 0.81,
        scaleFar: 0.63,
        rotNear: 6,
        rotFar: 12,
        nearZ: -30,
        farZ: -95
      };
    }
    if (w <= 768) {
      return {
        nearX: Math.min(w * 0.38, 195),
        farX: Math.min(w * 0.68, 330),
        scaleCenter: 1.0,
        scaleNear: 0.83,
        scaleFar: 0.67,
        rotNear: 8,
        rotFar: 15,
        nearZ: -35,
        farZ: -105
      };
    }
    if (w <= 1080) {
      return {
        nearX: 270,
        farX: 480,
        scaleCenter: 1.0,
        scaleNear: 0.85,
        scaleFar: 0.71,
        rotNear: 10,
        rotFar: 18,
        nearZ: -35,
        farZ: -115
      };
    }
    if (w <= 1380) {
      return {
        nearX: 335,
        farX: 580,
        scaleCenter: 1.0,
        scaleNear: 0.86,
        scaleFar: 0.73,
        rotNear: 12,
        rotFar: 20,
        nearZ: -35,
        farZ: -120
      };
    }
    // Large Desktop screens (> 1380px): Generous separation so 3 cards don't visually clump
    return {
      nearX: 380,
      farX: 670,
      scaleCenter: 1.0,
      scaleNear: 0.87,
      scaleFar: 0.74,
      rotNear: 13,
      rotFar: 22,
      nearZ: -30,
      farZ: -115
    };
  }

  function updateGallery(newIndex, immediate = false) {
    activeIndex = ((newIndex % totalCount) + totalCount) % totalCount;
    isAnimating = true;

    const geo = getCarouselGeometry();
    const isMobile = window.innerWidth <= 768;

    projects.forEach((_, i) => {
      const card = cardElements[i];
      if (immediate) {
        card.style.transition = 'none';
      } else {
        card.style.transition = '';
      }

      // Compute relative distance in circular 5-slot space: [-2, -1, 0, 1, 2]
      let diff = (i - activeIndex) % totalCount;
      if (diff > 2) diff -= totalCount;
      if (diff < -2) diff += totalCount;

      card.classList.remove('is-active', 'is-near-left', 'is-near-right', 'is-far-left', 'is-far-right', 'is-left', 'is-right', 'is-hidden');

      if (diff === 0) {
        // Prominent Center Card
        card.classList.add('is-active');
        card.setAttribute('aria-hidden', 'false');
        card.setAttribute('tabindex', '0');
        card.style.transform = `translate3d(0, 0, 95px) rotateY(0deg) scale(${geo.scaleCenter})`;
        card.style.opacity = '1';
        card.style.filter = 'blur(0px)';
        card.style.zIndex = '25';
        card.style.pointerEvents = 'auto';
      } else if (diff === -1) {
        // Symmetrical Near Left Card
        card.classList.add('is-near-left', 'is-left');
        card.setAttribute('aria-hidden', 'false');
        card.setAttribute('tabindex', '0');
        card.style.transform = `translate3d(-${geo.nearX}px, 0, ${geo.nearZ}px) rotateY(${geo.rotNear}deg) scale(${geo.scaleNear})`;
        card.style.opacity = isMobile ? '0.75' : '0.92';
        card.style.filter = 'blur(0px)';
        card.style.zIndex = '18';
        card.style.pointerEvents = 'auto';
      } else if (diff === 1) {
        // Symmetrical Near Right Card
        card.classList.add('is-near-right', 'is-right');
        card.setAttribute('aria-hidden', 'false');
        card.setAttribute('tabindex', '0');
        card.style.transform = `translate3d(${geo.nearX}px, 0, ${geo.nearZ}px) rotateY(-${geo.rotNear}deg) scale(${geo.scaleNear})`;
        card.style.opacity = isMobile ? '0.75' : '0.92';
        card.style.filter = 'blur(0px)';
        card.style.zIndex = '18';
        card.style.pointerEvents = 'auto';
      } else if (diff === -2) {
        // Symmetrical Far Left Card
        card.classList.add('is-far-left', 'is-left');
        card.setAttribute('aria-hidden', isMobile ? 'true' : 'false');
        card.setAttribute('tabindex', isMobile ? '-1' : '0');
        card.style.transform = `translate3d(-${geo.farX}px, 0, ${geo.farZ}px) rotateY(${geo.rotFar}deg) scale(${geo.scaleFar})`;
        card.style.opacity = isMobile ? '0' : '0.74';
        card.style.filter = isMobile ? 'blur(2px)' : 'blur(0.4px)';
        card.style.zIndex = '10';
        card.style.pointerEvents = isMobile ? 'none' : 'auto';
      } else if (diff === 2) {
        // Symmetrical Far Right Card
        card.classList.add('is-far-right', 'is-right');
        card.setAttribute('aria-hidden', isMobile ? 'true' : 'false');
        card.setAttribute('tabindex', isMobile ? '-1' : '0');
        card.style.transform = `translate3d(${geo.farX}px, 0, ${geo.farZ}px) rotateY(-${geo.rotFar}deg) scale(${geo.scaleFar})`;
        card.style.opacity = isMobile ? '0' : '0.74';
        card.style.filter = isMobile ? 'blur(2px)' : 'blur(0.4px)';
        card.style.zIndex = '10';
        card.style.pointerEvents = isMobile ? 'none' : 'auto';
      }
    });

    if (counterCurr) counterCurr.textContent = String(activeIndex + 1).padStart(2, '0');

    // Synchronize bottom pill indicator tabs
    const freshIndicatorBtns = indicatorCapsule ? indicatorCapsule.querySelectorAll('.indicator-step') : [];
    freshIndicatorBtns.forEach((btn, idx) => {
      const isCur = idx === activeIndex;
      btn.classList.toggle('active', isCur);
      btn.setAttribute('aria-selected', isCur ? 'true' : 'false');
    });

    setTimeout(() => {
      isAnimating = false;
    }, immediate ? 40 : 650);
  }

  function switchProject(idx) {
    if (idx === activeIndex || isAnimating) return;
    updateGallery(idx);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAnimating) {
        switchProject(activeIndex - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!isAnimating) {
        switchProject(activeIndex + 1);
      }
    });
  }

  const liveIndicatorBtns = indicatorCapsule ? indicatorCapsule.querySelectorAll('.indicator-step') : [];
  liveIndicatorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.getAttribute('data-project-idx') || '0', 10);
      switchProject(idx);
    });
  });

  window.addEventListener('keydown', (e) => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (!isAnimating) switchProject(activeIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (!isAnimating) switchProject(activeIndex + 1);
    }
  });

  track.addEventListener('mousedown', (e) => {
    if (e.target.closest('a, button, input')) return;
    isDragging = true;
    dragHasMoved = false;
    dragStartX = e.clientX;
    dragCurrentX = e.clientX;
    track.classList.add('is-dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragCurrentX = e.clientX;
    const deltaX = dragCurrentX - dragStartX;
    if (Math.abs(deltaX) > 6) dragHasMoved = true;

    const geo = getCarouselGeometry();

    projects.forEach((_, i) => {
      const card = cardElements[i];
      card.style.transition = 'none';

      let diff = (i - activeIndex) % totalCount;
      if (diff > 2) diff -= totalCount;
      if (diff < -2) diff += totalCount;

      if (diff === 0) {
        const moveX = deltaX * 0.9;
        const rotY = -deltaX * 0.025;
        const scaleVal = Math.max(0.85, geo.scaleCenter - Math.abs(deltaX) * 0.0003);
        card.style.transform = `translate3d(${moveX}px, 0, ${95 - Math.abs(deltaX) * 0.15}px) rotateY(${rotY}deg) scale(${scaleVal})`;
      } else if (diff === -1) {
        const moveX = -geo.nearX + deltaX * 0.85;
        const rotY = geo.rotNear - deltaX * 0.03;
        card.style.transform = `translate3d(${moveX}px, 0, ${geo.nearZ}px) rotateY(${rotY}deg) scale(${geo.scaleNear})`;
      } else if (diff === 1) {
        const moveX = geo.nearX + deltaX * 0.85;
        const rotY = -geo.rotNear - deltaX * 0.03;
        card.style.transform = `translate3d(${moveX}px, 0, ${geo.nearZ}px) rotateY(${rotY}deg) scale(${geo.scaleNear})`;
      } else if (diff === -2) {
        const moveX = -geo.farX + deltaX * 0.75;
        const rotY = geo.rotFar - deltaX * 0.02;
        card.style.transform = `translate3d(${moveX}px, 0, ${geo.farZ}px) rotateY(${rotY}deg) scale(${geo.scaleFar})`;
      } else if (diff === 2) {
        const moveX = geo.farX + deltaX * 0.75;
        const rotY = -geo.rotFar - deltaX * 0.02;
        card.style.transform = `translate3d(${moveX}px, 0, ${geo.farZ}px) rotateY(${rotY}deg) scale(${geo.scaleFar})`;
      }
    });
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');

    const deltaX = dragCurrentX - dragStartX;
    if (dragHasMoved) {
      if (deltaX < -45) {
        switchProject(activeIndex + 1);
      } else if (deltaX > 45) {
        switchProject(activeIndex - 1);
      } else {
        updateGallery(activeIndex);
      }
    } else {
      updateGallery(activeIndex);
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;
  let touchCurrentX = 0;
  let touchHasMoved = false;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchCurrentX = touchStartX;
    touchHasMoved = false;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    touchCurrentX = e.touches[0].clientX;
    const dx = touchCurrentX - touchStartX;
    const dy = e.touches[0].clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy) + 4) {
      touchHasMoved = true;
      if (e.cancelable) e.preventDefault();
    }
  }, { passive: false });

  track.addEventListener('touchend', () => {
    if (touchHasMoved) {
      const dx = touchCurrentX - touchStartX;
      if (dx < -40) {
        switchProject(activeIndex + 1);
      } else if (dx > 40) {
        switchProject(activeIndex - 1);
      } else {
        updateGallery(activeIndex);
      }
    } else {
      updateGallery(activeIndex);
    }
  });

  window.addEventListener('resize', () => {
    updateGallery(activeIndex, true);
  });

  updateGallery(0, true);
}


function setupStudyPilotSimulator() {
  const flashcardConcepts = [
    {
      topic: "OPERATING SYSTEMS // DEADLOCKS",
      question: "What are the 4 Coffman conditions required for a system deadlock to occur?",
      answer: "1. Mutual Exclusion<br>2. Hold & Wait<br>3. No Preemption<br>4. Circular Wait",
      interval: "Interval: +4 Days",
      streak: "Recall Streak: 4"
    },
    {
      topic: "LLM REASONING // VECTOR EMBEDDINGS",
      question: "Why does Cosine Similarity outperform Euclidean distance for semantic text embeddings?",
      answer: "Cosine similarity measures vector directional angle rather than document length magnitude, normalizing token frequency variations.",
      interval: "Interval: +7 Days",
      streak: "Recall Streak: 6"
    },
    {
      topic: "COMPUTER ARCHITECTURE // MEMORY PAGING",
      question: "What is the purpose of the Translation Lookaside Buffer (TLB)?",
      answer: "Hardware cache that stores recent virtual-to-physical page mappings to avoid multi-level page table memory lookups.",
      interval: "Interval: +3 Days",
      streak: "Recall Streak: 3"
    },
    {
      topic: "DATA STRUCTURES // SELF-BALANCING TREES",
      question: "How does an AVL Tree guarantee O(log N) worst-case search and insertion times?",
      answer: "By enforcing a strict balance factor (height difference of at most 1 between subtrees) and performing single/double rotations on violation.",
      interval: "Interval: +12 Days",
      streak: "Recall Streak: 8"
    }
  ];

  let conceptIdx = 0;
  let isAnswerVisible = false;

  const qText = document.getElementById('study-q-text');
  const aText = document.getElementById('study-a-text');
  const metaInterval = document.getElementById('study-meta-interval');
  const metaStreak = document.getElementById('study-meta-streak');
  const topicTag = document.querySelector('#stage-studypilot .topic-tag');
  const btnFlip = document.getElementById('btn-flip-card');
  const btnNext = document.getElementById('btn-next-card');

  function updateCardUI() {
    const c = flashcardConcepts[conceptIdx];
    if (qText) qText.innerHTML = c.question;
    if (aText) aText.innerHTML = c.answer;
    if (metaInterval) metaInterval.textContent = c.interval;
    if (metaStreak) metaStreak.textContent = c.streak;
    if (topicTag) topicTag.textContent = c.topic;

    isAnswerVisible = false;
    if (aText) aText.style.display = 'none';
    if (btnFlip) btnFlip.textContent = 'Reveal Answer ↺';
  }

  if (btnFlip) {
    btnFlip.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(700, 'sine');
      isAnswerVisible = !isAnswerVisible;
      if (aText) {
        aText.style.display = isAnswerVisible ? 'block' : 'none';
      }
      btnFlip.textContent = isAnswerVisible ? 'Hide Answer' : 'Reveal Answer ↺';
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(840, 'triangle');
      conceptIdx = (conceptIdx + 1) % flashcardConcepts.length;
      updateCardUI();
    });
  }

  // StudyPilot Tabs
  const studyTabs = document.querySelectorAll('#studypilot-tabs .stage-tab-btn');
  studyTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      studyTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTactileClick(640, 'sine');
    });
  });
}

/**
 * Velora Store Interactive Simulator (Quantity Stepper & Instant Cart Calculations)
 */
function setupVeloraSimulator() {
  let qty = 1;
  const unitPrice = 185;
  const shipping = 15;

  const qtyEl = document.getElementById('velora-qty-display');
  const subtotalEl = document.getElementById('velora-subtotal-display');
  const totalEl = document.getElementById('velora-total-display');
  const btnMinus = document.getElementById('btn-velora-minus');
  const btnPlus = document.getElementById('btn-velora-plus');
  const btnCheckout = document.getElementById('btn-velora-checkout');

  function updateTotals() {
    const subtotal = qty * unitPrice;
    const total = subtotal + shipping;
    if (qtyEl) qtyEl.textContent = qty;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', (e) => {
      e.stopPropagation();
      if (qty > 1) {
        qty--;
        playTactileClick(520, 'sine');
        updateTotals();
      }
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', (e) => {
      e.stopPropagation();
      if (qty < 10) {
        qty++;
        playTactileClick(720, 'sine');
        updateTotals();
      }
    });
  }

  if (btnCheckout) {
    btnCheckout.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(900, 'triangle');
      const originalText = btnCheckout.textContent;
      btnCheckout.textContent = 'Processing...';
      btnCheckout.style.background = '#10B981';
      btnCheckout.style.color = '#FFFFFF';

      setTimeout(() => {
        btnCheckout.textContent = '✓ Order Confirmed!';
        showPortfolioToast(`Velora Order Placed: $${(qty * unitPrice + shipping).toFixed(2)}`);
        setTimeout(() => {
          btnCheckout.textContent = originalText;
          btnCheckout.style.background = '';
          btnCheckout.style.color = '';
        }, 2200);
      }, 600);
    });
  }

  // Velora Tabs
  const veloraTabs = document.querySelectorAll('#velora-tabs .stage-tab-btn');
  veloraTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      veloraTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTactileClick(640, 'sine');
    });
  });
}

/**
 * Kumo Ramen Interactive Customizer (Broth, Noodle Firmness & Price Recalculation)
 */
function setupKumoSimulator() {
  const brothPills = document.querySelectorAll('#kumo-broth-row .kumo-pill');
  const noodlePills = document.querySelectorAll('#kumo-noodle-row .kumo-pill');
  const priceDisplay = document.getElementById('kumo-total-price');
  const btnOrder = document.getElementById('btn-kumo-order');

  let basePrice = 17.50;
  let brothExtra = 0;

  brothPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      brothPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      playTactileClick(680, 'sine');

      const broth = pill.getAttribute('data-broth');
      if (broth === 'black-garlic') brothExtra = 2.00;
      else if (broth === 'spicy-miso') brothExtra = 1.50;
      else if (broth === 'yuzu') brothExtra = 1.00;
      else brothExtra = 0;

      if (priceDisplay) {
        priceDisplay.textContent = `$${(basePrice + brothExtra).toFixed(2)}`;
      }
    });
  });

  noodlePills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      noodlePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      playTactileClick(680, 'sine');
    });
  });

  if (btnOrder) {
    btnOrder.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(920, 'triangle');
      const orig = btnOrder.textContent;
      btnOrder.textContent = 'Sending to Chef...';
      btnOrder.style.background = '#10B981';

      setTimeout(() => {
        btnOrder.textContent = '✓ Bowl is Simmering!';
        showPortfolioToast(`Kumo Ramen Ticket Sent: $${(basePrice + brothExtra).toFixed(2)}`);
        setTimeout(() => {
          btnOrder.textContent = orig;
          btnOrder.style.background = '';
        }, 2000);
      }, 500);
    });
  }

  // Kumo Tabs
  const kumoTabs = document.querySelectorAll('#kumo-tabs .stage-tab-btn');
  kumoTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      kumoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTactileClick(640, 'sine');
    });
  });
}

/**
 * PastelForm Multi-Step Flow Simulator
 */
function setupPastelFormSimulator() {
  const steps = [
    {
      num: "Step 1 of 3",
      title: "What is your primary architectural goal?",
      sub: "Choose your primary deployment strategy for 2026",
      choices: [
        { id: "ai", title: "Autonomous AI Workflows", desc: "Agentic tool calling & multi-turn LLM inference" },
        { id: "fullstack", title: "Full-Stack Web Systems", desc: "SSR, edge database synchronization & micro-frontends" },
        { id: "mobile", title: "Cross-Platform Ecosystem", desc: "Native responsiveness with fluid offline persistence" },
        { id: "scale", title: "Enterprise High Concurrency", desc: "Microservices, distributed caching & vector embeddings" }
      ]
    },
    {
      num: "Step 2 of 3",
      title: "Select your database & synchronization layer",
      sub: "Configuring real-time state listeners and auth rules",
      choices: [
        { id: "supabase", title: "Supabase Realtime PostgreSQL", desc: "Row-level security, edge functions & vector search" },
        { id: "firebase", title: "Google Cloud Firestore", desc: "Offline indexing & instantaneous serverless rules" },
        { id: "redis", title: "Redis Upstash Edge Cache", desc: "Sub-millisecond pub/sub sessions & rate limiters" },
        { id: "neo4j", title: "Graph Database Engine", desc: "Connected knowledge graphs & ontologies" }
      ]
    },
    {
      num: "Step 3 of 3",
      title: "Confirm pipeline requirements",
      sub: "Instant schema generation with zero layout shift",
      choices: [
        { id: "ci", title: "Automated GitHub Actions CI/CD", desc: "Zero-friction linting, testing & deployment pipelines" },
        { id: "security", title: "Enterprise RBAC & Zero-Trust", desc: "Strict cryptographic sessions & role auditing" },
        { id: "analytics", title: "Real-time Telemetry & Metrics", desc: "Core Web Vitals monitoring and error observability" },
        { id: "complete", title: "Ready to Deploy Schema", desc: "Export clean JSON-Schema and TypeScript interfaces" }
      ]
    }
  ];

  let currentStepIdx = 0;
  let selectedChoice = "ai";

  const numEl = document.getElementById('pastel-step-num');
  const titleEl = document.getElementById('pastel-question-title');
  const subEl = document.getElementById('pastel-question-sub');
  const choicesGrid = document.getElementById('pastel-choices-grid');
  const btnPrev = document.getElementById('btn-pastel-prev');
  const btnNext = document.getElementById('btn-pastel-next');
  const progressFill = document.getElementById('pastel-progress-fill');

  function renderStep() {
    const s = steps[currentStepIdx];
    if (numEl) numEl.textContent = s.num;
    if (titleEl) titleEl.textContent = s.title;
    if (subEl) subEl.textContent = s.sub;
    if (progressFill) {
      const pct = Math.round(((currentStepIdx + 1) / steps.length) * 100);
      progressFill.style.width = `${pct}%`;
    }

    if (choicesGrid) {
      choicesGrid.innerHTML = s.choices.map((c, i) => `
        <button type="button" class="pastel-choice-btn ${i === 0 ? 'selected' : ''}" data-choice="${c.id}">
          <span class="choice-title">${c.title}</span>
          <span class="choice-desc">${c.desc}</span>
        </button>
      `).join('');

      // Wire choice clicks
      choicesGrid.querySelectorAll('.pastel-choice-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          choicesGrid.querySelectorAll('.pastel-choice-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedChoice = btn.getAttribute('data-choice');
          playTactileClick(740, 'sine');
        });
      });
    }

    if (btnPrev) {
      btnPrev.disabled = currentStepIdx === 0;
      btnPrev.style.opacity = currentStepIdx === 0 ? '0.4' : '1';
    }

    if (btnNext) {
      btnNext.textContent = currentStepIdx === steps.length - 1 ? 'Finish Form ✓' : 'Next Step →';
    }
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentStepIdx > 0) {
        currentStepIdx--;
        playTactileClick(600, 'sine');
        renderStep();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        playTactileClick(800, 'sine');
        renderStep();
      } else {
        playTactileClick(940, 'triangle');
        btnNext.textContent = '✓ Submitted!';
        showPortfolioToast('PastelForm Flow Completed!');
        setTimeout(() => {
          currentStepIdx = 0;
          renderStep();
        }, 2000);
      }
    });
  }

  // PastelForm Tabs
  const pastelTabs = document.querySelectorAll('#pastel-tabs .stage-tab-btn');
  pastelTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      pastelTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTactileClick(640, 'sine');
    });
  });
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
 * 12. COMPACT SKILL ECOSYSTEM & INTERACTIVE CONSTELLATION
 * Replaces old percentage bars and giant docks with a tactile visual constellation.
 * =========================================================================
 */
function setupSkillEcosystem() {
  const filterBtns = document.querySelectorAll('.eco-filter-btn');
  const pods = document.querySelectorAll('.eco-pod');
  const chips = document.querySelectorAll('.eco-chip');
  const detailCopy = document.getElementById('eco-detail-copy');

  if (!filterBtns.length && !chips.length) return;

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-eco-filter') || 'all';
      playTactileClick(650, 'sine');

      pods.forEach(pod => {
        const cat = pod.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          pod.classList.remove('filtered-out');
        } else {
          pod.classList.add('filtered-out');
        }
      });
    });
  });

  // Interactive Chip Details and Audio Feedback
  chips.forEach(chip => {
    const title = chip.getAttribute('data-skill-title') || chip.querySelector('strong')?.textContent || 'Skill';
    const tooltip = chip.getAttribute('data-tooltip') || 'Core competence in production environments.';

    function highlightChip() {
      chips.forEach(c => c.classList.remove('chip-active'));
      chip.classList.add('chip-active');

      if (detailCopy) {
        detailCopy.style.opacity = '0';
        setTimeout(() => {
          detailCopy.innerHTML = `<strong>${title}</strong>: ${tooltip} <span style="color: #0D3834; font-weight: 600; margin-left: 0.4rem;">• Applied across 30+ GitHub repositories</span>`;
          detailCopy.style.opacity = '1';
        }, 80);
      }
    }

    chip.addEventListener('mouseenter', () => {
      highlightChip();
      playTactileClick(780, 'sine');
    });

    chip.addEventListener('click', () => {
      highlightChip();
      playTactileClick(860, 'triangle');
    });
  });
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
 * CREATIVE HORIZONTAL CERTIFICATES GALLERY (One by one exhibition)
 * =========================================================================
 */
function setupCertificatesGallery() {
  const section = document.getElementById('certifications');
  if (!section) return;

  const stageViewport = document.getElementById('cert-wall-stage-viewport');
  const stage3D = document.getElementById('cert-wall-3d-stage');
  const cards = Array.from(document.querySelectorAll('.cert-wall-card'));
  const tabs = Array.from(document.querySelectorAll('.cert-selector-btn'));
  const prevBtn = document.getElementById('cert-wall-prev-btn');
  const nextBtn = document.getElementById('cert-wall-next-btn');
  const counterCurr = document.getElementById('cert-wall-counter-curr');

  // Dossier elements
  const dossierTitle = document.getElementById('dossier-title');
  const dossierDesc = document.getElementById('dossier-desc');
  const dossierIssuer = document.getElementById('dossier-issuer');
  const dossierLevel = document.getElementById('dossier-level');
  const dossierYear = document.getElementById('dossier-year');
  const dossierTags = document.getElementById('dossier-tags');
  const btnDossierExpand = document.getElementById('btn-dossier-expand');

  // Expansion modal elements
  const expandOverlay = document.getElementById('cert-expand-overlay');
  const expandBackdrop = document.getElementById('cert-expand-backdrop');
  const expandCloseBtn = document.getElementById('cert-expand-close-btn');
  const expandImg = document.getElementById('cert-expand-img');
  const expandModalTitle = document.getElementById('expand-modal-title');
  const expandModalSub = document.getElementById('expand-modal-sub');
  const expandModalCounter = document.getElementById('expand-modal-counter');
  const expandPrevBtn = document.getElementById('expand-prev-btn');
  const expandNextBtn = document.getElementById('expand-next-btn');

  if (!stage3D || cards.length === 0) return;

  // The 3 Authentic Google Credentials
  const certificatesData = [
    {
      id: "cert-1",
      number: "01",
      title: "Google AI Professional Certificate",
      issuer: "Google & Grow with Google",
      level: "Advanced Professional Certification",
      date: "Issued 2024",
      image: "1.jpg",
      fallbackImage: "1--.jpg",
      sealBadge: "GOOGLE CERTIFIED",
      description: "Comprehensive Google professional credential verifying advanced mastery in generative artificial intelligence architectures, machine learning foundation models, Vertex AI integration, and production-level prompt engineering workflows.",
      skills: ["Generative AI Systems", "Foundation Models", "Vertex AI Studio", "System Architectures", "Responsible AI Governance"]
    },
    {
      id: "cert-2",
      number: "02",
      title: "Google AI Essentials Specialization",
      issuer: "Google / Coursera",
      level: "Applied AI Foundations",
      date: "Issued 2024",
      image: "2.jpg",
      fallbackImage: "2--.jpg",
      sealBadge: "GOOGLE SPECIALIZATION",
      description: "Official credential focusing on cross-disciplinary AI integration, conversational workflows, automating digital routines, productivity acceleration, and leveraging modern AI toolsets with ethical guidelines and risk mitigation.",
      skills: ["Cross-Functional AI", "Workflow Automation", "Productivity Optimization", "Prompt Techniques", "Ethical AI Integration"]
    },
    {
      id: "cert-3",
      number: "03",
      title: "Google Prompting Essentials Specialization",
      issuer: "Google / Coursera",
      level: "Expert Prompt Engineering",
      date: "Issued 2025",
      image: "3.jpg",
      fallbackImage: "3--.jpg",
      sealBadge: "GOOGLE SPECIALIZATION",
      description: "Specialized training in architecting high-precision prompt pipelines, structured system instructions, multi-turn context retention, few-shot conditioning, Chain-of-Thought reasoning, and eliminating LLM hallucinations.",
      skills: ["Few-Shot Prompting", "Multi-Turn Chains", "System Context Framing", "Deliberate Reasoning", "Output Parsing & Schemas"]
    }
  ];

  let activeIndex = 0;
  let isAnimating = false;

  // 1. Update 3D Arrangement of the 3 Floating Certificates
  function updateGallery(newIndex, playSound = false) {
    activeIndex = (newIndex + certificatesData.length) % certificatesData.length;
    isAnimating = true;

    cards.forEach((card, i) => {
      let diff = (i - activeIndex) % 3;
      if (diff < 0) diff += 3;

      card.classList.remove('is-active', 'is-side-right', 'is-side-left');

      if (diff === 0) {
        // Active Center Card (Focal Point)
        card.classList.add('is-active');
        card.setAttribute('aria-selected', 'true');
        card.setAttribute('tabindex', '0');
      } else if (diff === 1) {
        // Top-Right Side Card (Layered Behind)
        card.classList.add('is-side-right');
        card.setAttribute('aria-selected', 'false');
        card.setAttribute('tabindex', '0');
      } else {
        // Bottom-Left Side Card (Layered Behind)
        card.classList.add('is-side-left');
        card.setAttribute('aria-selected', 'false');
        card.setAttribute('tabindex', '0');
      }
    });

    // Update Counter
    if (counterCurr) {
      counterCurr.textContent = String(activeIndex + 1).padStart(2, '0');
    }

    // Update Tabs
    tabs.forEach((tab, i) => {
      const isCur = i === activeIndex;
      tab.classList.toggle('active', isCur);
      tab.setAttribute('aria-selected', isCur ? 'true' : 'false');
    });

    // Update Dossier Deck with smooth micro-fade
    const activeData = certificatesData[activeIndex];
    if (activeData) {
      if (dossierTitle) dossierTitle.textContent = activeData.title;
      if (dossierDesc) dossierDesc.textContent = activeData.description;
      if (dossierIssuer) dossierIssuer.textContent = activeData.issuer;
      if (dossierLevel) dossierLevel.textContent = activeData.level;
      if (dossierYear) dossierYear.textContent = activeData.date;

      if (dossierTags) {
        dossierTags.innerHTML = activeData.skills
          .map(skill => `<span class="dossier-tag">${skill}</span>`)
          .join('');
      }
    }

    if (playSound && typeof playTactileClick === 'function') {
      playTactileClick(620 + activeIndex * 60, 'sine');
    }

    setTimeout(() => {
      isAnimating = false;
    }, 550);
  }

  // 2. Card Click & Keyboard Handlers
  cards.forEach((card, idx) => {
    card.addEventListener('click', (e) => {
      if (idx !== activeIndex) {
        // Clicking a side card selects it and brings it to the active spot!
        updateGallery(idx, true);
      } else {
        // Clicking the active card expands it into detailed inspection mode!
        openExpandModal(activeIndex);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (idx !== activeIndex) {
          updateGallery(idx, true);
        } else {
          openExpandModal(activeIndex);
        }
      }
    });

    // Specular Reflection / Glare Movement on Individual Card
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${pctX.toFixed(1)}%`);
      card.style.setProperty('--mouse-y', `${pctY.toFixed(1)}%`);
    });
  });

  // 3. Tab Buttons Click Handlers
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-index') || '0', 10);
      updateGallery(idx, true);
    });
  });

  // 4. Arrow Navigation Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (!isAnimating) updateGallery(activeIndex - 1, true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!isAnimating) updateGallery(activeIndex + 1, true);
    });
  }

  if (btnDossierExpand) {
    btnDossierExpand.addEventListener('click', () => {
      openExpandModal(activeIndex);
    });
  }

  // 5. Desktop Cursor Parallax Environment with Smooth Lerping
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isHoveringStage = false;
  let rafId = null;

  function renderParallax() {
    // Linear interpolation for silky organic motion
    currentRotX += (targetRotX - currentRotX) * 0.08;
    currentRotY += (targetRotY - currentRotY) * 0.08;

    if (stage3D) {
      stage3D.style.transform = `rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
    }

    if (isHoveringStage || Math.abs(currentRotX) > 0.05 || Math.abs(currentRotY) > 0.05) {
      rafId = requestAnimationFrame(renderParallax);
    } else {
      rafId = null;
      if (stage3D) stage3D.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  }

  if (stageViewport && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    stageViewport.addEventListener('mouseenter', () => {
      isHoveringStage = true;
      if (!rafId) rafId = requestAnimationFrame(renderParallax);
    });

    stageViewport.addEventListener('mousemove', (e) => {
      const rect = stageViewport.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      targetRotY = normX * 6.5; // subtle tilt left/right
      targetRotX = -normY * 4.5; // subtle tilt up/down

      if (!rafId) rafId = requestAnimationFrame(renderParallax);
    });

    stageViewport.addEventListener('mouseleave', () => {
      isHoveringStage = false;
      targetRotX = 0;
      targetRotY = 0;
    });
  }

  // 6. Smooth In-Place Focused Expansion Lightbox Modal
  function openExpandModal(idx) {
    const data = certificatesData[idx];
    if (!data || !expandOverlay) return;

    if (expandImg) {
      expandImg.src = data.image;
      expandImg.alt = data.title;
      expandImg.onerror = () => {
        expandImg.src = data.fallbackImage;
      };
    }

    if (expandModalTitle) expandModalTitle.textContent = data.title;
    if (expandModalSub) expandModalSub.textContent = `${data.issuer} · ${data.date}`;
    if (expandModalCounter) expandModalCounter.textContent = `${data.number} of 03`;

    expandOverlay.classList.add('is-open');
    expandOverlay.setAttribute('aria-hidden', 'false');

    if (typeof playTactileClick === 'function') {
      playTactileClick(740, 'sine');
    }
  }

  function closeExpandModal() {
    if (!expandOverlay) return;
    expandOverlay.classList.remove('is-open');
    expandOverlay.setAttribute('aria-hidden', 'true');

    if (typeof playTactileClick === 'function') {
      playTactileClick(480, 'triangle');
    }
  }

  if (expandCloseBtn) expandCloseBtn.addEventListener('click', closeExpandModal);
  if (expandBackdrop) expandBackdrop.addEventListener('click', closeExpandModal);

  if (expandPrevBtn) {
    expandPrevBtn.addEventListener('click', () => {
      const prevIdx = (activeIndex - 1 + certificatesData.length) % certificatesData.length;
      updateGallery(prevIdx);
      openExpandModal(prevIdx);
    });
  }

  if (expandNextBtn) {
    expandNextBtn.addEventListener('click', () => {
      const nextIdx = (activeIndex + 1) % certificatesData.length;
      updateGallery(nextIdx);
      openExpandModal(nextIdx);
    });
  }

  // 7. Global Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (expandOverlay && expandOverlay.classList.contains('is-open')) {
      if (e.key === 'Escape') {
        closeExpandModal();
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (activeIndex - 1 + certificatesData.length) % certificatesData.length;
        updateGallery(prevIdx);
        openExpandModal(prevIdx);
      } else if (e.key === 'ArrowRight') {
        const nextIdx = (activeIndex + 1) % certificatesData.length;
        updateGallery(nextIdx);
        openExpandModal(nextIdx);
      }
      return;
    }

    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
    if (!inView) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (!isAnimating) updateGallery(activeIndex - 1, true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (!isAnimating) updateGallery(activeIndex + 1, true);
    }
  });

  // 8. Mobile Touch Swipe Support
  if (stageViewport) {
    let touchStartX = 0;
    let touchEndX = 0;

    stageViewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stageViewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40 && !isAnimating) {
        if (diff > 0) {
          updateGallery(activeIndex + 1, true);
        } else {
          updateGallery(activeIndex - 1, true);
        }
      }
    }, { passive: true });
  }

  // Initialize Gallery at Index 0
  updateGallery(0, false);
}

/**
 * =========================================================================
 * 14. TACTILE ELASTIC SPRING BUTTONS & 3D HERO PARALLAX
 * Clean, sophisticated button micro-interactions & port-2.png 3D parallax
 * =========================================================================
 */
function setupTactileButtonInteractions() {
  const tactileButtons = document.querySelectorAll('.tactile-btn, .btn-hero-primary, .btn-hero-outline, .btn-panel-primary, .btn-panel-secondary');
  
  tactileButtons.forEach(btn => {
    // Add down / active state class
    btn.addEventListener('pointerdown', () => {
      btn.classList.add('tactile-pressed');
      playTactileClick(560, 'sine');
    });

    const release = () => {
      if (btn.classList.contains('tactile-pressed')) {
        btn.classList.remove('tactile-pressed');
        playTactileClick(740, 'triangle');
      }
    };

    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointerleave', release);
    btn.addEventListener('pointercancel', release);
  });
}

/**
 * 3D Parallax Tilt & Interactive Hover on the Hero Portrait Showcase
 * Delivers refined in-place enlargement (scale ~1.08), subtle 3D depth,
 * cursor-responsive magical lighting that intensifies and follows the pointer,
 * and a smooth spring return with zero layout overlap or scrollbars.
 */
/**
 * 14. DEDICATED 3D HERO PORTRAIT HOVER INTERACTION
 * Magical lighting, ultra-thin orbital curve, floating celestial pearls,
 * delicate specular sheen, subtle 3D parallax, and smooth spring decay.
 */
function setupHero3DPortraitParallax() {
  const visualZone = document.getElementById('hero-portrait-stage') || document.querySelector('.hero-visual-column');
  const stage = visualZone ? (visualZone.querySelector('.hero-creative-visual-stage') || visualZone.querySelector('.hero-portrait-showcase')) : null;
  const cutoutFrame = visualZone ? visualZone.querySelector('#hero-portrait-cutout-frame') : null;
  const portrait = visualZone ? visualZone.querySelector('.hero-portrait-cutout-img') : null;
  const kickerBadge = visualZone ? visualZone.querySelector('.hero-creative-kicker-pill') : null;

  // Celestial atmosphere elements (matches reference image)
  const celestialSystem = visualZone ? visualZone.querySelector('#hero-celestial-orbit-system') : null;
  const pearls = visualZone ? Array.from(visualZone.querySelectorAll('.celestial-pearl, .celestial-twinkle, .celestial-dust')) : [];
  const cursorLensLight = visualZone ? visualZone.querySelector('#hero-cinematic-cursor-light') : null;
  const glossHighlight = visualZone ? visualZone.querySelector('#hero-portrait-gloss-highlight') : null;
  const rimLight = visualZone ? visualZone.querySelector('#hero-portrait-rim-light') : null;

  // Background atmospheric studio lighting nodes
  const ambientLight = visualZone ? visualZone.querySelector('.hero-light-ambient') : null;
  const coralLight = visualZone ? (visualZone.querySelector('.hero-light-coral') || visualZone.querySelector('.hero-disc-coral')) : null;
  const cyanLight = visualZone ? (visualZone.querySelector('.hero-light-cyan') || visualZone.querySelector('.hero-disc-cyan')) : null;
  const pinkLight = visualZone ? visualZone.querySelector('.hero-light-pink') : null;
  const violetLight = visualZone ? (visualZone.querySelector('.hero-light-violet') || visualZone.querySelector('.hero-disc-purple')) : null;
  const bloomLight = visualZone ? (visualZone.querySelector('.hero-light-bloom') || visualZone.querySelector('.hero-backdrop-glow-aura')) : null;

  const cursorRing = document.getElementById('cursor-follower');
  const cursorDot = document.getElementById('cursor-dot');

  if (!visualZone || !stage || !cutoutFrame) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let bounds = cutoutFrame.getBoundingClientRect();
  let stageBounds = stage.getBoundingClientRect();
  let rafId = null;

  // 3D Parallax & subtle physical floating physics (Restrained to max 2.2 deg)
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  let targetGirlX = 0;
  let targetGirlY = 0;
  let currentGirlX = 0;
  let currentGirlY = 0;

  let targetScale = 1.0;
  let currentScale = 1.0;
  let targetTranslateZ = 0;
  let currentTranslateZ = 0;

  // Soft cinematic lens light & specular highlight
  let targetLensX = 0;
  let targetLensY = 0;
  let currentLensX = 0;
  let currentLensY = 0;
  let targetLensOpacity = 0;
  let currentLensOpacity = 0;

  let targetGlossX = 50;
  let targetGlossY = 40;
  let currentGlossX = 50;
  let currentGlossY = 40;
  let targetGlossOpacity = 0;
  let currentGlossOpacity = 0;

  let pearlFloatAngle = 0;
  let isHovered = false;

  function updateBounds() {
    bounds = cutoutFrame.getBoundingClientRect();
    stageBounds = stage.getBoundingClientRect();
  }

  window.addEventListener('resize', updateBounds, { passive: true });
  window.addEventListener('scroll', updateBounds, { passive: true });

  // Handle pointer movement across hero portrait stage
  function handlePointerMove(e) {
    if (prefersReduced) return;
    updateBounds();

    const stageCenterX = stageBounds.left + stageBounds.width / 2;
    const stageCenterY = stageBounds.top + stageBounds.height / 2;
    const relCursorX = e.clientX - stageCenterX;
    const relCursorY = e.clientY - stageCenterY;

    // 1. Soft Invisible Keylight: Follows cursor across portrait stage
    targetLensX = e.clientX - stageBounds.left - 170;
    targetLensY = e.clientY - stageBounds.top - 170;
    targetLensOpacity = 0.85;

    // 2. Portrait Specular Gloss Reflection: Normalized coordinates across cutout
    const glossRelX = ((e.clientX - bounds.left) / (bounds.width || 1)) * 100;
    const glossRelY = ((e.clientY - bounds.top) / (bounds.height || 1)) * 100;
    targetGlossX = Math.max(10, Math.min(90, glossRelX));
    targetGlossY = Math.max(10, Math.min(90, glossRelY));
    targetGlossOpacity = 0.68;

    // 3. Subtle 3D Parallax: strictly 1.8 to 2.2 degrees max (no exaggeration, completely stable face)
    const halfW = stageBounds.width / 2 || 1;
    const halfH = stageBounds.height / 2 || 1;
    const normX = Math.max(-1, Math.min(1, relCursorX / halfW));
    const normY = Math.max(-1, Math.min(1, relCursorY / halfH));

    targetRotY = normX * 2.2;   // ~2.2 deg max horizontal tilt
    targetRotX = -normY * 2.2;  // ~2.2 deg max vertical tilt

    // Physical lift: image floats slightly above page (~2.6px max shift)
    targetGirlX = normX * 2.6;
    targetGirlY = normY * 2.6;

    if (!rafId) {
      rafId = requestAnimationFrame(renderParallax);
    }
  }

  function activateHoverState(e) {
    isHovered = true;
    updateBounds();
    const w = window.innerWidth;
    targetScale = prefersReduced ? 1.0 : (w > 1024 ? 1.018 : 1.012);
    targetTranslateZ = prefersReduced ? 0 : 8;
    targetLensOpacity = 0.85;
    targetGlossOpacity = 0.68;

    cutoutFrame.classList.add('is-hovered');
    stage.classList.add('has-hover');
    if (celestialSystem) celestialSystem.classList.add('is-revealed');
    if (cursorRing) cursorRing.classList.add('cursor-portrait-hover');
    if (cursorDot) cursorDot.classList.add('cursor-portrait-hover');

    if (e && e.clientX) {
      handlePointerMove(e);
    }

    if (!rafId) {
      rafId = requestAnimationFrame(renderParallax);
    }
  }

  function deactivateHoverState() {
    isHovered = false;
    targetRotX = 0;
    targetRotY = 0;
    targetGirlX = 0;
    targetGirlY = 0;
    targetScale = 1.0;
    targetTranslateZ = 0;
    targetLensOpacity = 0;
    targetGlossOpacity = 0;

    cutoutFrame.classList.remove('is-hovered');
    stage.classList.remove('has-hover');
    if (celestialSystem) celestialSystem.classList.remove('is-revealed');
    if (cursorRing) cursorRing.classList.remove('cursor-portrait-hover');
    if (cursorDot) cursorDot.classList.remove('cursor-portrait-hover');

    if (!rafId) {
      rafId = requestAnimationFrame(renderParallax);
    }
  }

  // Event Listeners on Stage and Cutout Frame
  stage.addEventListener('pointerenter', activateHoverState);
  stage.addEventListener('pointermove', handlePointerMove, { passive: true });
  stage.addEventListener('pointerleave', deactivateHoverState);

  cutoutFrame.addEventListener('pointerenter', activateHoverState);
  cutoutFrame.addEventListener('pointermove', handlePointerMove, { passive: true });
  cutoutFrame.addEventListener('pointerleave', deactivateHoverState);

  // Touch device support
  let touchActive = false;
  cutoutFrame.addEventListener('touchstart', (e) => {
    if (!touchActive) {
      touchActive = true;
      activateHoverState(e);
    }
  }, { passive: true });

  document.addEventListener('touchstart', (e) => {
    if (touchActive && !visualZone.contains(e.target)) {
      touchActive = false;
      deactivateHoverState();
    }
  }, { passive: true });

  // Dedicated Cinematic Portrait Enlarge Modal
  const enlargeModal = document.getElementById('hero-portrait-enlarge-modal');
  const modalCloseBtn = document.getElementById('enlarge-modal-close-btn');
  const modalBackdrop = document.getElementById('enlarge-modal-backdrop');

  function openEnlargedModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (enlargeModal) {
      enlargeModal.classList.add('is-open');
      enlargeModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (modalCloseBtn) modalCloseBtn.focus();
    }
  }

  function closeEnlargedModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (enlargeModal) {
      enlargeModal.classList.remove('is-open');
      enlargeModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (cutoutFrame && typeof cutoutFrame.focus === 'function') {
        try {
          cutoutFrame.focus({ preventScroll: true });
        } catch (_) {}
      }
    }
  }

  cutoutFrame.addEventListener('dblclick', openEnlargedModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEnlargedModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeEnlargedModal);
  const enlargeImg = document.getElementById('enlarge-portrait-img');
  if (enlargeImg) enlargeImg.addEventListener('click', closeEnlargedModal);
  if (enlargeModal) {
    enlargeModal.addEventListener('click', (e) => {
      if (e.target === enlargeModal || e.target === modalBackdrop || e.target.classList.contains('enlarge-modal-dialog') || e.target.classList.contains('enlarge-portrait-stage')) {
        closeEnlargedModal(e);
      }
    });
  }

  cutoutFrame.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      openEnlargedModal(e);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && enlargeModal && enlargeModal.classList.contains('is-open')) {
      closeEnlargedModal(e);
    }
  });

  // 60FPS Physics animation loop using smooth linear interpolation (lerp)
  function renderParallax() {
    const lerpRot = 0.085;
    const lerpGirl = 0.085;
    const lerpLens = 0.08;

    currentRotX += (targetRotX - currentRotX) * lerpRot;
    currentRotY += (targetRotY - currentRotY) * lerpRot;
    currentGirlX += (targetGirlX - currentGirlX) * lerpGirl;
    currentGirlY += (targetGirlY - currentGirlY) * lerpGirl;
    currentScale += (targetScale - currentScale) * 0.09;
    currentTranslateZ += (targetTranslateZ - currentTranslateZ) * lerpRot;

    // 1. Invisible Keylight Lens: Smooth tracking with natural delay
    currentLensX += (targetLensX - currentLensX) * lerpLens;
    currentLensY += (targetLensY - currentLensY) * lerpLens;
    currentLensOpacity += (targetLensOpacity - currentLensOpacity) * lerpLens;

    if (cursorLensLight) {
      cursorLensLight.style.transform = `translate3d(${currentLensX.toFixed(1)}px, ${currentLensY.toFixed(1)}px, 0)`;
      cursorLensLight.style.opacity = currentLensOpacity.toFixed(3);
    }

    // 2. Portrait Specular Gloss: Soft glass-like sheen moving with cursor
    currentGlossX += (targetGlossX - currentGlossX) * lerpLens;
    currentGlossY += (targetGlossY - currentGlossY) * lerpLens;
    currentGlossOpacity += (targetGlossOpacity - currentGlossOpacity) * lerpLens;

    if (glossHighlight) {
      glossHighlight.style.background = `radial-gradient(circle 260px at ${currentGlossX.toFixed(1)}% ${currentGlossY.toFixed(1)}%, rgba(255, 255, 255, 0.44) 0%, rgba(254, 215, 170, 0.16) 35%, transparent 68%)`;
      glossHighlight.style.opacity = currentGlossOpacity.toFixed(3);
    }

    // 3. Portrait Cutout Frame: Physical subtle 3D tilt (stable face, no deformation)
    if (prefersReduced) {
      cutoutFrame.style.transform = `scale(${currentScale.toFixed(3)})`;
    } else {
      cutoutFrame.style.transform = `perspective(1200px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translate3d(${currentGirlX.toFixed(1)}px, ${currentGirlY.toFixed(1)}px, ${currentTranslateZ.toFixed(1)}px) scale(${currentScale.toFixed(3)})`;
    }

    // 4. Background Atmospheric Studio Lights: Soft differential depth
    const bgFactorX = currentRotY * 1.3;
    const bgFactorY = -currentRotX * 1.3;
    if (coralLight) coralLight.style.transform = `translate(${(bgFactorX * 0.9).toFixed(1)}px, ${(bgFactorY * 0.9).toFixed(1)}px)`;
    if (cyanLight) cyanLight.style.transform = `translate(${(bgFactorX * 1.15).toFixed(1)}px, ${(bgFactorY * 1.15).toFixed(1)}px)`;
    if (pinkLight) pinkLight.style.transform = `translate(${(bgFactorX * 1.25).toFixed(1)}px, ${(bgFactorY * 1.25).toFixed(1)}px)`;
    if (violetLight) violetLight.style.transform = `translate(${(bgFactorX * 0.75).toFixed(1)}px, ${(bgFactorY * 0.75).toFixed(1)}px)`;
    if (bloomLight) bloomLight.style.transform = `translate(${(bgFactorX * 0.85).toFixed(1)}px, ${(bgFactorY * 0.85).toFixed(1)}px)`;
    if (ambientLight) ambientLight.style.transform = `translate(${(bgFactorX * 0.5).toFixed(1)}px, ${(bgFactorY * 0.5).toFixed(1)}px)`;

    // 5. Celestial Orbital Curve: Subtle 3D spatial alignment
    if (celestialSystem && !prefersReduced) {
      const orbX = (currentRotY * 1.5).toFixed(1);
      const orbY = (-currentRotX * 1.5).toFixed(1);
      celestialSystem.style.transform = `translate(-50%, -50%) translate3d(${orbX}px, ${orbY}px, 0)`;
    }

    // 6. Floating Celestial Pearls & Stardust (3D spatial depth & gentle breathing)
    if (pearls.length > 0) {
      if (isHovered && !prefersReduced) {
        pearlFloatAngle += 0.015;
      }
      pearls.forEach((p, idx) => {
        const depth = parseFloat(p.getAttribute('data-depth')) || 0.8;
        const px = (currentRotY * 1.8 * depth + (isHovered ? Math.sin(pearlFloatAngle + idx * 1.1) * 2.2 : 0)).toFixed(1);
        const py = (-currentRotX * 1.8 * depth + (isHovered ? Math.cos(pearlFloatAngle + idx * 1.1) * 1.8 : 0)).toFixed(1);
        p.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      });
    }

    if (kickerBadge) {
      kickerBadge.style.transform = `translate(${(-currentRotY * 0.15).toFixed(1)}px, ${(-currentRotX * 0.15).toFixed(1)}px)`;
    }

    // Convergence check: Continue RAF loop until motion is at rest
    const rotDiff = Math.abs(targetRotX - currentRotX) + Math.abs(targetRotY - currentRotY);
    const girlDiff = Math.abs(targetGirlX - currentGirlX) + Math.abs(targetGirlY - currentGirlY);
    const scaleDiff = Math.abs(targetScale - currentScale);
    const lensDiff = Math.abs(targetLensOpacity - currentLensOpacity);

    if (isHovered || rotDiff > 0.005 || girlDiff > 0.005 || scaleDiff > 0.0005 || lensDiff > 0.005) {
      rafId = requestAnimationFrame(renderParallax);
    } else {
      // Cleanly return to resting position when cursor is outside scene
      if (!isHovered) {
        cutoutFrame.style.transform = '';
        if (coralLight) coralLight.style.transform = '';
        if (cyanLight) cyanLight.style.transform = '';
        if (pinkLight) pinkLight.style.transform = '';
        if (violetLight) violetLight.style.transform = '';
        if (bloomLight) bloomLight.style.transform = '';
        if (ambientLight) ambientLight.style.transform = '';
        if (kickerBadge) kickerBadge.style.transform = '';
        if (celestialSystem) celestialSystem.style.transform = '';
        if (cursorLensLight) {
          cursorLensLight.style.opacity = '0';
          cursorLensLight.style.transform = '';
        }
        if (glossHighlight) {
          glossHighlight.style.opacity = '0';
        }
        pearls.forEach(p => p.style.transform = '');
        pearlFloatAngle = 0;
      }
      rafId = null;
    }
  }
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

/**
 * =========================================================================
 * 16. HERO PORTRAIT PHOTO INSERT & DRAG-AND-DROP SYSTEM
 * Lets Arfa click "Insert Photo" or drag-and-drop any personal image.
 * Image is displayed immediately, synced to About section, and saved in localStorage.
 * =========================================================================
 */
function setupHeroPhotoUpload() {
  const heroImg = document.getElementById('profile-placeholder-img');
  if (heroImg) {
    // Set user's designated photo me.png
    heroImg.src = 'me.png';
    heroImg.onerror = function() {
      this.onerror = function() {
        this.onerror = null;
        this.src = 'profile-photo.png';
      };
      this.src = 'me.png.png';
    };
  }
}

/**
 * =========================================================================
 * 17. CONTACT SECTION 3D IMAGE INSERT & DRAG-AND-DROP
 * Lets Arfa insert her custom 3D image into the Let's Talk section.
 * Includes LocalStorage persistence, reset option, and interactive 3D perspective tilt.
 * =========================================================================
 */
function setupContact3DUpload() {
  const fileInput = document.getElementById('contact-3d-file-input');
  const insertBtn = document.getElementById('btn-insert-contact-3d');
  if (!fileInput || !insertBtn) return;
  const btnLabel = document.getElementById('contact-3d-btn-label');
  const resetBtn = document.getElementById('btn-reset-contact-3d');
  const dropOverlay = document.getElementById('contact-3d-drop-overlay');
  const viewport = document.getElementById('contact-3d-stage-viewport');
  const placeholder = document.getElementById('contact-3d-placeholder');
  const charImg = document.getElementById('contact-3d-character-img');

  const STORAGE_KEY = 'portfolio_custom_contact_3d_char';

  function displayCustom3DImage(dataUrl) {
    if (!charImg) return;
    charImg.src = dataUrl;
    charImg.classList.remove('hidden');
    if (placeholder) placeholder.style.display = 'none';
    if (resetBtn) resetBtn.classList.remove('hidden');
    if (btnLabel) btnLabel.textContent = 'Change 3D Character';
  }

  function restoreDefault3DStage() {
    if (charImg) {
      charImg.src = '';
      charImg.classList.add('hidden');
    }
    if (placeholder) placeholder.style.display = 'flex';
    if (resetBtn) resetBtn.classList.add('hidden');
    if (btnLabel) btnLabel.textContent = 'Insert 3D Character';
  }

  // 1. Restore saved transparent 3D asset if previously uploaded
  try {
    const savedAsset = localStorage.getItem(STORAGE_KEY);
    if (savedAsset) {
      displayCustom3DImage(savedAsset);
    }
  } catch (e) {
    console.warn('LocalStorage unavailable for 3D character:', e);
  }

  // 2. Trigger native file picker
  if (insertBtn && fileInput) {
    insertBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(700, 'sine');
      fileInput.click();
    });
  }

  // 3. Process 3D Image upload
  function applyContact3DImage(file) {
    if (!file || !file.type.startsWith('image/')) {
      showPortfolioToast('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      displayCustom3DImage(dataUrl);

      try {
        localStorage.setItem(STORAGE_KEY, dataUrl);
      } catch (err) {
        console.warn('3D Asset too large for LocalStorage, displayed in session memory.');
      }

      playTactileClick(880, 'triangle');
      showPortfolioToast('3D anime character stage updated! ✨');
    };
    reader.readAsDataURL(file);
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) applyContact3DImage(file);
      fileInput.value = '';
    });
  }

  // 4. Reset 3D Asset
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playTactileClick(540, 'sine');

      restoreDefault3DStage();

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (err) {}

      showPortfolioToast('Holographic stage reset to default.');
    });
  }

  // 5. Drag & Drop on Contact 3D Card / Viewport
  const stageTarget = viewport || document.getElementById('contact-3d-visual-stage');
  if (stageTarget && dropOverlay) {
    ['dragenter', 'dragover'].forEach(evtName => {
      stageTarget.addEventListener(evtName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropOverlay.classList.add('dragover');
      });
    });

    ['dragleave', 'dragend'].forEach(evtName => {
      stageTarget.addEventListener(evtName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropOverlay.classList.remove('dragover');
      });
    });

    stageTarget.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropOverlay.classList.remove('dragover');

      const file = e.dataTransfer?.files?.[0];
      if (file) applyContact3DImage(file);
    });
  }

  // 6. Interactive 3D Perspective Tilt on Mouse Movement
  if (viewport) {
    viewport.addEventListener('mousemove', (e) => {
      const rect = viewport.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);

      const rotX = (y / (rect.height / 2)) * -14;
      const rotY = (x / (rect.width / 2)) * 14;

      if (charImg && !charImg.classList.contains('hidden')) {
        charImg.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(20px) scale3d(1.05, 1.05, 1.05)`;
      } else if (placeholder) {
        placeholder.style.transform = `perspective(800px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(10px)`;
      }
    });

    viewport.addEventListener('mouseleave', () => {
      if (charImg) charImg.style.transform = '';
      if (placeholder) placeholder.style.transform = '';
    });
  }
}

/**
 * =========================================================================
 * 18. FULL PAGE PROJECT IMMERSIVE EXPERIENCE MODAL
 * Brings projects to full page with deep architectural writeups,
 * live simulators, keyboard navigation (Escape, Left/Right arrows),
 * and quick tabs across all 4 production projects.
 * =========================================================================
 */
function setupProjectFullPageExperience() {
  const modal = document.getElementById('project-fullpage-modal');
  const backdrop = document.getElementById('fullpage-backdrop');
  const closeBtn = document.getElementById('btn-close-fullpage');
  const titleEl = document.getElementById('fullpage-project-title');
  const badgeEl = document.getElementById('fullpage-project-badge');
  const counterEl = document.getElementById('fullpage-counter');
  const taglineEl = document.getElementById('fullpage-tagline');
  const descEl = document.getElementById('fullpage-description');
  const problemEl = document.getElementById('fullpage-problem-text');
  const solutionEl = document.getElementById('fullpage-solution-text');
  const techChipsEl = document.getElementById('fullpage-tech-chips');
  const metricsGridEl = document.getElementById('fullpage-metrics-grid');
  const liveLink = document.getElementById('fullpage-live-link');
  const ghLink = document.getElementById('fullpage-gh-link');
  const stageWrapper = document.getElementById('fullpage-stage-wrapper');
  const tabBtns = document.querySelectorAll('#fullpage-nav-tabs .fullpage-tab-btn');
  const btnPrev = document.getElementById('fullpage-btn-prev');
  const btnNext = document.getElementById('fullpage-btn-next');

  if (!modal) return;

  const projectCatalog = {
    'prism': {
      index: 0,
      title: "Prism — 3D Spatial AR Showcase",
      badge: "✦ 3D WEBGL & SPATIAL UX",
      counter: "PROJECT 01 / 05",
      tagline: "AI-Powered AR Glasses Product Showcase with Three.js & GLSL Shaders",
      desc: "An immersive spatial product landing experience for AI-powered AR glasses featuring custom WebGL/Three.js shaders, reactive glass refraction physics, interactive 3D model controls, and fluid scroll-triggered cinematic choreography.",
      problem: "Hardware and spatial computing products struggle to convey optical clarity, real-time light refraction, and tactile physical presence using static flat marketing pages.",
      solution: "Engineered a custom Three.js WebGL scene with real-time chromatic dispersion shaders, interactive orbit constraints, and zero-jank scroll timeline synchronization.",
      tech: ["Three.js", "WebGL", "GLSL Shaders", "JavaScript ES6+", "GSAP Motion", "Spatial UI"],
      metrics: [
        { val: "60 FPS", lbl: "WebGL Render Rate", color: "#8B5CF6" },
        { val: "< 1.2s", lbl: "3D Asset Hydration", color: "#2DD4BF" },
        { val: "100%", lbl: "Hardware Acceleration", color: "#F59E0B" }
      ],
      liveUrl: "https://github.com/ArfaMunam47/prism-one-3d",
      ghUrl: "https://github.com/ArfaMunam47/prism-one-3d",
      image: "Prism.jpeg",
      stageSourceId: "stage-prism"
    },
    'studypilot': {
      index: 1,
      title: "StudyPilot-AI",
      badge: "✦ AI PRODUCT SUITE",
      counter: "PROJECT 02 / 05",
      tagline: "Autonomous Spaced Repetition & AI Study Operating System",
      desc: "An autonomous learning operating system engineered to transform dense textbook chapters, lecture transcripts, and complex engineering syllabi into structured revision roadmaps, spaced-repetition flashcards, and conceptual quizzes using prompt-engineered Claude 3.7 reasoning loops.",
      problem: "Students face intense cognitive overload when synthesizing multi-hundred page technical lecture slides and syllabus notes into actionable, structured review cycles before critical examinations.",
      solution: "Engineered a multi-tier prompt extraction pipeline that parses hierarchical concept dependency trees, applies Leitner spaced repetition intervals, and dynamically compiles diagnostic flashcard drills.",
      tech: ["Claude 3.7 AI", "React", "Tailwind CSS", "FastAPI", "Spaced Repetition", "Vector Search"],
      metrics: [
        { val: "94.2%", lbl: "Mastery Retention Rate", color: "#2DD4BF" },
        { val: "< 450ms", lbl: "Inference Latency", color: "#F59E0B" },
        { val: "14-Day", lbl: "Curated Sprint", color: "#A78BFA" }
      ],
      liveUrl: "https://github.com/ArfaMunam47/StudyPilot-AI",
      ghUrl: "https://github.com/ArfaMunam47/StudyPilot-AI",
      image: "studypilot.png",
      stageSourceId: "stage-studypilot"
    },
    'velora': {
      index: 2,
      title: "Velora Luxury Store",
      badge: "✦ HIGH-CONVERSION COMMERCE",
      counter: "PROJECT 03 / 05",
      tagline: "Sub-Second Micro-Interactions & Accessible Luxury E-Commerce",
      desc: "A bespoke e-commerce boutique platform built with tactile client-side micro-interactions, real-time cart subtotal calculations, fluid currency conversions, and WCAG AA accessibility compliance across all screen sizes.",
      problem: "Legacy online retail checkouts frequently suffer from cumbersome multi-page reload funnels, sluggish cart calculations, and poor mobile touch target ergonomics that degrade user trust.",
      solution: "Engineered client-side reactive state machines for immediate subtotal recalculation, optimistic UI updating, and haptic audio synthesis for instantaneous cart confirmation.",
      tech: ["JavaScript (ES6+)", "HTML5 Semantics", "CSS Grid & Flexbox", "Web Audio API", "WCAG AA", "Micro-Interactions"],
      metrics: [
        { val: "99.8%", lbl: "Checkout Reliability", color: "#F59E0B" },
        { val: "100/100", lbl: "Lighthouse Performance", color: "#2DD4BF" },
        { val: "0ms", lbl: "Layout Shift (CLS)", color: "#A78BFA" }
      ],
      liveUrl: "https://github.com/ArfaMunam47/Velora-Store",
      ghUrl: "https://github.com/ArfaMunam47/Velora-Store",
      image: "veloraa.png",
      stageSourceId: "stage-velora"
    },
    'kumo': {
      index: 3,
      title: "Kumo Ramen Artisanal",
      badge: "✦ INTERACTIVE CULINARY UI",
      counter: "PROJECT 04 / 05",
      tagline: "Artisanal Ramen Builder & Real-Time Broth Customizer",
      desc: "An immersive, editorial restaurant digital experience allowing patrons to construct personalized ramen bowls in real-time, dynamically toggling slow-simmered broths, noodle firmness levels, and savory toppings with live pricing feedback.",
      problem: "Standard restaurant menus present static PDF lists that fail to communicate dish customization depth, rich culinary heritage, or allergen transparency.",
      solution: "Designed an interactive stage customizer where selecting ingredients dynamically updates nutritional summaries, flavor intensity indicators, and kitchen ticket dispatch state.",
      tech: ["Tailwind CSS", "Semantic HTML5", "JavaScript Engine", "Audio Synthesis", "Interactive SVG", "Responsive Design"],
      metrics: [
        { val: "38%", lbl: "Average Order Uplift", color: "#FA5538" },
        { val: "60 FPS", lbl: "Fluid Animation Speed", color: "#2DD4BF" },
        { val: "4.9 ★", lbl: "Patron Experience Score", color: "#F59E0B" }
      ],
      liveUrl: "https://github.com/ArfaMunam47/kumo-ramen-showcase",
      ghUrl: "https://github.com/ArfaMunam47/kumo-ramen-showcase",
      image: "kumo.png",
      stageSourceId: "stage-kumo"
    },
    'pastelform': {
      index: 4,
      title: "PastelForm Engine",
      badge: "✦ DYNAMIC FORM ARCHITECTURE",
      counter: "PROJECT 05 / 05",
      tagline: "Accessible Multi-Step Form Builder with Schema Validation",
      desc: "A soft-hued, high-ergonomics multi-step questionnaire and schema survey engine engineered with zero layout shift, tactile choice buttons, animated step progress meters, and immediate payload serialization.",
      problem: "Multi-page survey forms generate high user fatigue and abandonment when questions feel disconnected and validation errors are confusingly presented.",
      solution: "Created a focused step-flow wizard with keyboard-first navigation, progressive state persistence, clear visual hierarchy, and instant schema compilation.",
      tech: ["TypeScript", "Dynamic Form Engine", "CSS Variables", "Schema Validation", "Keyboard Navigation", "A11y ARIA"],
      metrics: [
        { val: "68%", lbl: "Form Completion Rate", color: "#A78BFA" },
        { val: "0 CLS", lbl: "Zero Cumulative Shift", color: "#2DD4BF" },
        { val: "100%", lbl: "Accessible ARIA Compliance", color: "#F59E0B" }
      ],
      liveUrl: "https://github.com/ArfaMunam47/pastelform",
      ghUrl: "https://github.com/ArfaMunam47/pastelform",
      image: "pastel.png",
      stageSourceId: "stage-pastelform"
    }
  };

  const projectKeys = ['prism', 'studypilot', 'velora', 'kumo', 'pastelform'];
  let currentProjectKey = 'prism';

  function renderFullPageProject(key) {
    const data = projectCatalog[key];
    if (!data) return;

    currentProjectKey = key;

    // Update Header
    if (titleEl) titleEl.textContent = data.title;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (counterEl) counterEl.textContent = data.counter;
    if (taglineEl) taglineEl.textContent = data.tagline;
    if (descEl) descEl.textContent = data.desc;
    if (problemEl) problemEl.textContent = data.problem;
    if (solutionEl) solutionEl.textContent = data.solution;
    if (liveLink) liveLink.href = data.liveUrl;
    if (ghLink) ghLink.href = data.ghUrl;

    // Update active tab button
    tabBtns.forEach(btn => {
      if (btn.getAttribute('data-project') === key) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Tech chips
    if (techChipsEl) {
      techChipsEl.innerHTML = data.tech.map(t => `<span class="fullpage-tech-pill">${t}</span>`).join('');
    }

    // Metrics
    if (metricsGridEl) {
      metricsGridEl.innerHTML = data.metrics.map(m => `
        <div class="fullpage-metric-card">
          <span class="metric-val" style="color: ${m.color};">${m.val}</span>
          <span class="metric-lbl">${m.lbl}</span>
        </div>
      `).join('');
    }

    // Replicate interactive stage into the full-page stage wrapper
    if (stageWrapper) {
      const originalStage = document.getElementById(data.stageSourceId);
      if (originalStage) {
        stageWrapper.innerHTML = '';
        const stageClone = originalStage.cloneNode(true);
        stageClone.id = `fullpage-clone-${data.stageSourceId}`;
        
        // Remove nested fullscreen buttons from the clone inside modal
        const cloneFullscreenToggle = stageClone.querySelector('.stage-fullscreen-toggle');
        if (cloneFullscreenToggle) cloneFullscreenToggle.remove();

        stageWrapper.appendChild(stageClone);

        // Wire interactions for this cloned stage
        wireClonedStageInteractions(key, stageClone);
      } else {
        stageWrapper.innerHTML = `
          <div class="fullpage-project-media-preview" style="width:100%;height:100%;min-height:360px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(ellipse at center, rgba(30,27,75,0.3) 0%, rgba(11,15,25,0.85) 100%);border-radius:20px;padding:1.5rem;box-sizing:border-box;border:1px solid rgba(255,255,255,0.08);">
            <img src="${data.image || 'Prism.jpeg'}" alt="${data.title}" style="max-width:100%;max-height:460px;border-radius:14px;box-shadow:0 20px 50px rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.12);object-fit:contain;" />
          </div>
        `;
      }
    }
  }

  function wireClonedStageInteractions(key, cloneEl) {
    if (key === 'studypilot') {
      const qText = cloneEl.querySelector('#study-q-text');
      const aText = cloneEl.querySelector('#study-a-text');
      const btnFlip = cloneEl.querySelector('#btn-flip-card');
      const btnNext = cloneEl.querySelector('#btn-next-card');

      const concepts = [
        { q: "What are the 4 Coffman conditions required for deadlock?", a: "1. Mutual Exclusion<br>2. Hold & Wait<br>3. No Preemption<br>4. Circular Wait" },
        { q: "Why does Cosine Similarity outperform Euclidean distance for embeddings?", a: "Cosine similarity measures vector angle rather than magnitude, normalizing token length." },
        { q: "What is the purpose of the Translation Lookaside Buffer (TLB)?", a: "Hardware cache that stores recent virtual-to-physical page mappings to speed up lookups." }
      ];
      let idx = 0;
      let revealed = false;

      if (btnFlip) {
        btnFlip.addEventListener('click', () => {
          revealed = !revealed;
          if (aText) aText.style.display = revealed ? 'block' : 'none';
          btnFlip.textContent = revealed ? 'Hide Answer' : 'Reveal Answer ↺';
          playTactileClick(700, 'sine');
        });
      }
      if (btnNext) {
        btnNext.addEventListener('click', () => {
          idx = (idx + 1) % concepts.length;
          revealed = false;
          if (qText) qText.innerHTML = concepts[idx].q;
          if (aText) {
            aText.innerHTML = concepts[idx].a;
            aText.style.display = 'none';
          }
          if (btnFlip) btnFlip.textContent = 'Reveal Answer ↺';
          playTactileClick(820, 'triangle');
        });
      }
    } else if (key === 'velora') {
      let qty = 1;
      const price = 185;
      const qtyEl = cloneEl.querySelector('#velora-qty-display');
      const subtotalEl = cloneEl.querySelector('#velora-subtotal-display');
      const totalEl = cloneEl.querySelector('#velora-total-display');
      const btnMinus = cloneEl.querySelector('#btn-velora-minus');
      const btnPlus = cloneEl.querySelector('#btn-velora-plus');
      const btnCheckout = cloneEl.querySelector('#btn-velora-checkout');

      function update() {
        if (qtyEl) qtyEl.textContent = qty;
        if (subtotalEl) subtotalEl.textContent = `$${(qty * price).toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${(qty * price + 15).toFixed(2)}`;
      }

      if (btnMinus) btnMinus.addEventListener('click', () => { if (qty > 1) { qty--; update(); playTactileClick(540, 'sine'); } });
      if (btnPlus) btnPlus.addEventListener('click', () => { if (qty < 10) { qty++; update(); playTactileClick(740, 'sine'); } });
      if (btnCheckout) {
        btnCheckout.addEventListener('click', () => {
          btnCheckout.textContent = '✓ Order Confirmed!';
          btnCheckout.style.background = '#10B981';
          playTactileClick(900, 'triangle');
          setTimeout(() => {
            btnCheckout.textContent = 'Complete Order →';
            btnCheckout.style.background = '';
          }, 2000);
        });
      }
    } else if (key === 'kumo') {
      const brothPills = cloneEl.querySelectorAll('.kumo-pill');
      const priceEl = cloneEl.querySelector('#kumo-total-price');
      const orderBtn = cloneEl.querySelector('#btn-kumo-order');

      brothPills.forEach(pill => {
        pill.addEventListener('click', () => {
          brothPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          playTactileClick(680, 'sine');
          if (priceEl) priceEl.textContent = '$19.50';
        });
      });

      if (orderBtn) {
        orderBtn.addEventListener('click', () => {
          orderBtn.textContent = '✓ Simmering in Kitchen!';
          orderBtn.style.background = '#10B981';
          playTactileClick(920, 'triangle');
          setTimeout(() => {
            orderBtn.textContent = 'Place Order →';
            orderBtn.style.background = '';
          }, 2000);
        });
      }
    }
  }

  function openModal(key = 'prism') {
    renderFullPageProject(key);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playTactileClick(740, 'triangle');
  }
  window.openProjectModal = openModal;

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    playTactileClick(540, 'sine');
  }

  // Wire all fullpage trigger buttons on the page
  const triggerBtns = document.querySelectorAll('.btn-panel-fullpage, .stage-fullscreen-toggle');
  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const proj = btn.getAttribute('data-project') || 'studypilot';
      openModal(proj);
    });
  });

  // Close triggers
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Tab quick switcher buttons
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const proj = btn.getAttribute('data-project');
      if (proj) {
        playTactileClick(660, 'sine');
        renderFullPageProject(proj);
      }
    });
  });

  // Next / Previous navigation
  function navigateProject(direction = 1) {
    const currentIndex = projectCatalog[currentProjectKey]?.index || 0;
    const nextIndex = (currentIndex + direction + projectKeys.length) % projectKeys.length;
    playTactileClick(720, 'sine');
    renderFullPageProject(projectKeys[nextIndex]);
  }

  if (btnPrev) btnPrev.addEventListener('click', () => navigateProject(-1));
  if (btnNext) btnNext.addEventListener('click', () => navigateProject(1));

  // Keyboard navigation: Escape closes modal, Left/Right arrows switch projects
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      navigateProject(-1);
    } else if (e.key === 'ArrowRight') {
      navigateProject(1);
    }
  });
}

/**
 * =========================================================================
 * 19. REFINED ABOUT ME PERSPECTIVE TABS, BIO COPY & FOCUS SKILLS
 * Provides interactive narrative switching (Story, AI, Architecture, Collaboration),
 * one-click executive bio copying, and active focus skill explorer.
 * =========================================================================
 */
function setupAboutMeRefinement() {
  // 1. Perspective Switcher Tabs
  const tabs = document.querySelectorAll('#about-perspective-tabs .about-story-tab');
  const container = document.getElementById('about-story-text-container');
  const quoteText = document.getElementById('about-quote-text');

  const perspectives = {
    'philosophy': {
      p1: "I am a Computer Science student, frontend developer, and prompt engineer who believes the highest form of engineering elegance lives where rigorous computer science fundamentals intersect with generative intelligence.",
      p2: "Rather than treating AI as an automated shortcut, I utilize modern LLMs as a precision force multiplier—chaining deterministic prompts, structured schema validations, and rapid iterations to build human-first web applications.",
      quote: "“I don't just learn syntax; I build working products to understand how systems come alive in the hands of real users.”"
    },
    'ai': {
      p1: "My prompt engineering methodology is grounded in deterministic reasoning chains, strict JSON schema output formatting, and context-window optimization across Claude 3.7, Gemini 2.5, and OpenAI systems.",
      p2: "From architecting automated Leitner spaced-repetition loops in StudyPilot-AI to constructing zero-hallucination document synthesis workflows, I engineer prompt architectures with the same discipline applied to backend microservices.",
      quote: "“Prompt engineering isn't guessing words—it's establishing deterministic reasoning constraints and testable mental models.”"
    },
    'architecture': {
      p1: "Every interface I author adheres to strict semantic HTML5 hierarchies, zero cumulative layout shift (CLS), tactile 60 FPS CSS micro-interactions, and comprehensive WCAG AA accessibility compliance.",
      p2: "I design resilient client-side state machines, sub-millisecond cart calculations, and responsive mobile-first grid systems that load instantaneously without heavy dependencies or layout jank.",
      quote: "“True craftsmanship lies in the details users never see: pristine semantics, sub-millisecond responsiveness, and resilient state machines.”"
    },
    'collaboration': {
      p1: "I excel in agile cross-functional environments, translating Figma component systems into production TypeScript code with clear Git commit histories and comprehensive README documentation.",
      p2: "Whether pair programming on complex state management or structuring autonomous N8N workflow automations, I bring disciplined communication, curiosity, and rapid execution to every sprint.",
      quote: "“Great software is born at the intersection of clear human communication, structured iteration, and ruthless simplicity.”"
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      playTactileClick(680, 'sine');

      const key = tab.getAttribute('data-perspective');
      const data = perspectives[key];
      if (data && container) {
        container.style.opacity = '0.2';
        container.style.transform = 'translateY(4px)';

        setTimeout(() => {
          const pEls = container.querySelectorAll('.about-story-p');
          if (pEls[0]) pEls[0].textContent = data.p1;
          if (pEls[1]) pEls[1].textContent = data.p2;
          if (quoteText) quoteText.textContent = data.quote;

          container.style.opacity = '1';
          container.style.transform = 'translateY(0)';
        }, 120);
      }
    });
  });

  // 2. One-Click Copy Bio Button
  const copyBioBtn = document.getElementById('btn-copy-bio');
  if (copyBioBtn) {
    const executiveBio = `Arfa Munam — Computer Science Student, Frontend Developer & Prompt Engineer.\nSpecializing in high-performance web systems, accessible micro-interactions, and deterministic LLM reasoning chains.\nGitHub: https://github.com/ArfaMunam47 • Email: arfamunam01@gmail.com`;

    copyBioBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(executiveBio);
        } else {
          const ta = document.createElement('textarea');
          ta.value = executiveBio;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }

        playTactileClick(880, 'triangle');
        const origText = copyBioBtn.innerHTML;
        copyBioBtn.innerHTML = `<span>Copied! ✓</span>`;
        copyBioBtn.style.background = '#10B981';
        copyBioBtn.style.color = '#FFFFFF';

        showPortfolioToast('Executive bio copied to clipboard! ✓');

        setTimeout(() => {
          copyBioBtn.innerHTML = origText;
          copyBioBtn.style.background = '';
          copyBioBtn.style.color = '';
        }, 2200);
      } catch (err) {
        showPortfolioToast('Bio ready: arfamunam01@gmail.com');
      }
    });
  }

  // 3. Focus Skill Interactive Chips & Capability Drawer
  const skillChips = document.querySelectorAll('#focus-skills-cloud .focus-skill-chip');
  const skillTitleEl = document.getElementById('skill-detail-title');
  const skillDescEl = document.getElementById('skill-detail-desc');

  const skillCapabilities = {
    'nextjs': {
      title: "Next.js 15 App Router & Server Components",
      desc: "Architecting lightning-fast server components, dynamic routing, streaming SSR, and SEO-optimized web applications with modern Next.js conventions."
    },
    'prompt': {
      title: "Deterministic Prompt Engineering",
      desc: "Designing few-shot prompt templates, chain-of-thought scaffolds, and structured JSON-schema outputs that prevent hallucinations across LLM inference APIs."
    },
    'llm': {
      title: "LLM Reasoning Chains & Agentic Loops",
      desc: "Structuring multi-turn reasoning pipelines, tool-calling interfaces, and vector embedding semantic search workflows for production AI applications."
    },
    'tailwind': {
      title: "Tailwind CSS & Scalable Design Tokens",
      desc: "Crafting fluid responsive layouts, strict mathematical spacing scales, dark/light token palettes, and sub-second rendering performance."
    },
    'supabase': {
      title: "Supabase Realtime & Row-Level Security",
      desc: "Building persistent PostgreSQL schemas, real-time subscription listeners, row-level access control policies, and serverless edge functions."
    },
    'n8n': {
      title: "Autonomous N8N Workflow Automations",
      desc: "Constructing event-driven webhook workflows, automated content syndication pipelines, and scheduled sync agents with zero server overhead."
    },
    'webaudio': {
      title: "Web Audio API & Tactile Feedback",
      desc: "Synthesizing custom oscillator tones, haptic feedback clicks, and interactive sound design without relying on bulky external MP3 sound assets."
    },
    'typescript': {
      title: "TypeScript Enterprise Systems",
      desc: "Enforcing strict compile-time type safety, discriminated unions, generic utilities, and predictable runtime contract validation."
    }
  };

  skillChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      skillChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      playTactileClick(740, 'sine');

      const skillKey = chip.getAttribute('data-skill');
      const data = skillCapabilities[skillKey];
      if (data && skillTitleEl && skillDescEl) {
        skillTitleEl.textContent = data.title;
        skillDescEl.style.opacity = '0.2';
        setTimeout(() => {
          skillDescEl.textContent = data.desc;
          skillDescEl.style.opacity = '1';
        }, 100);
      }
    });
  });
}

/**
 * =========================================================================
 * 20. PORTFOLIO TOAST NOTIFICATION HELPER
 * =========================================================================
 */
function showPortfolioToast(message) {
  let toast = document.getElementById('portfolio-toast-banner');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portfolio-toast-banner';
    toast.className = 'portfolio-toast-banner';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
  toast.classList.add('active');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('active');
  }, 2800);
}

/**
 * =========================================================================
 * 21. PREMIUM 3D SKILLS SHOWCASE INTERACTIONS
 * Aligned with reference (e1c5a528-f6f0-46da-9227-117b4482c16c.png)
 * Tactile micro-interactions, subtle 3D card perspective tilt, chip feedback
 * =========================================================================
 */
function setupSkillsCompiler() {
  const cards = document.querySelectorAll('.skills-card-3d');
  const chips = document.querySelectorAll('.mini-skill-chip');
  const toolShelfItems = document.querySelectorAll('.tool-shelf-item');
  const workflowSteps = document.querySelectorAll('.prompt-workflow-capsule .wf-step');

  // Subtle 3D tilt response on hover over 3D panels (controlled, 1.5 deg max)
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / (rect.height / 2)) * -2.2;
      const rotY = (x / (rect.width / 2)) * 2.2;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Tactile sound and press feel on Mini Skill Chips
  chips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(700, 'triangle');
      }
    });

    chip.addEventListener('click', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(860, 'sine');
      }
      const name = chip.querySelector('.chip-name')?.textContent || 'Skill';
      const sub = chip.querySelector('.chip-sub')?.textContent || '';
      if (typeof showSystemToast === 'function') {
        showSystemToast(`✦ Selected: ${name} (${sub})`);
      }
    });

    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        chip.click();
      }
    });
  });

  // Bottom Shelf Tools interaction
  toolShelfItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(720, 'triangle');
      }
    });

    item.addEventListener('click', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(900, 'sine');
      }
      const label = item.querySelector('.tool-label')?.textContent || 'Tool';
      if (typeof showSystemToast === 'function') {
        showSystemToast(`🛠️ Tool: ${label}`);
      }
    });
  });

  // Interactive Prompt Workflow Steps (IDEA → CONTEXT → PROMPT → REFINE)
  if (workflowSteps.length) {
    workflowSteps.forEach(step => {
      step.style.cursor = 'pointer';
      step.addEventListener('click', () => {
        workflowSteps.forEach(s => s.classList.remove('wf-active'));
        step.classList.add('wf-active');
        if (typeof playTactileClick === 'function') {
          playTactileClick(780, 'sine');
        }
        if (typeof showSystemToast === 'function') {
          showSystemToast(`Workflow Phase: ${step.textContent}`);
        }
      });
    });
  }
}

/**
 * =========================================================================
 * 19B. SKEUOMORPHIC CAPABILITIES & SERVICES INTERACTIONS
 * Tactile micro-interactions, subtle 3D perspective tilt, and audio cues
 * =========================================================================
 */
function setupSkeuomorphicServices() {
  const serviceCards = document.querySelectorAll('#services .serv-item');
  const actionButtons = document.querySelectorAll('#services .serv-action-btn');
  const techChips = document.querySelectorAll('#services .serv-tech-chip');
  const deviceIcons = document.querySelectorAll('#services .serv-device-icon');
  const statNodes = document.querySelectorAll('#services .serv-stat-node');

  // Subtle 3D perspective tilt on service cards
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / (rect.height / 2)) * -2.2;
      const rotY = (x / (rect.width / 2)) * 2.2;
      card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-7px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Tactile sound and press feel on action buttons
  actionButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(740, 'triangle');
      }
    });

    btn.addEventListener('click', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(880, 'sine');
      }
      const title = btn.getAttribute('aria-label') || 'Service';
      if (typeof showSystemToast === 'function') {
        showSystemToast(`✦ Selected Service: ${title}`);
      }
    });
  });

  // Tactile clicks on tech chips and device docks
  techChips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(680, 'triangle');
      }
    });
    chip.addEventListener('click', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(840, 'sine');
      }
      const name = chip.textContent.trim();
      if (typeof showSystemToast === 'function') {
        showSystemToast(`✦ Tech Stack: ${name}`);
      }
    });
  });

  deviceIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(700, 'triangle');
      }
    });
    icon.addEventListener('click', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(860, 'sine');
      }
      const name = icon.getAttribute('title') || 'Responsive Viewport';
      if (typeof showSystemToast === 'function') {
        showSystemToast(`✦ Responsive Viewport: ${name}`);
      }
    });
  });

  // Tactile response on bottom stats shelf items
  statNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(760, 'triangle');
      }
    });
  });
}

/**
 * =========================================================================
 * 22. CINEMATIC EXPLORING FRONTIER LABS & TELEMETRY TERMINAL
 * Interactive pods that dispatch real-time telemetry into the radar screen
 * =========================================================================
 */
function setupCinematicFrontierLabs() {
  const triggerBtns = document.querySelectorAll('.btn-cinematic-trigger');
  const termScreen = document.getElementById('cinematic-terminal-screen');
  const termTitle = document.getElementById('cinematic-terminal-title');

  const labTelemetryPackets = {
    'ai-agents': {
      title: 'radar-node: ~/frontier-labs/multi-agent-orchestrator',
      lines: [
        { time: '14:20:01.104', tag: 'tag-green', prefix: '[DISPATCH]', msg: 'Spawning Autonomous Agent Cluster: Planner, ResearchBot, Evaluator' },
        { time: '14:20:01.320', tag: 'tag-blue', prefix: '[REASONING]', msg: 'Claude 3.7 COT: Decomposing input prompt into 4 deterministic sub-goals' },
        { time: '14:20:01.558', tag: 'tag-purple', prefix: '[VALIDATE]', msg: 'Pydantic JSON schema evaluation passed with 100% token consistency' },
        { time: '14:20:01.812', tag: 'tag-amber', prefix: '[METRICS]', msg: 'Sub-450ms turnaround achieved. Hallucination rate: 0.00% verified.' }
      ]
    },
    'fullstack-edge': {
      title: 'radar-node: ~/frontier-labs/edge-data-architectures',
      lines: [
        { time: '16:04:12.022', tag: 'tag-green', prefix: '[CONNECT]', msg: 'Edge proxy established with Supabase Cloud DB node (us-east-1)' },
        { time: '16:04:12.180', tag: 'tag-blue', prefix: '[SECURITY]', msg: 'PostgreSQL Row-Level Security policy verified for anonymous & auth roles' },
        { time: '16:04:12.390', tag: 'tag-purple', prefix: '[STREAM]', msg: 'WebSocket channel active. Zero-jank real-time mutations subscribed' },
        { time: '16:04:12.600', tag: 'tag-amber', prefix: '[METRICS]', msg: 'Round-trip TTFB latency clocked at 14ms across 12 distributed regions.' }
      ]
    },
    'fluid-canvas': {
      title: 'radar-node: ~/frontier-labs/fluid-canvas-interactions',
      lines: [
        { time: '18:11:45.301', tag: 'tag-green', prefix: '[WEBGL2]', msg: 'Requesting hardware acceleration pipeline on local display compositor' },
        { time: '18:11:45.450', tag: 'tag-blue', prefix: '[PHYSICS]', msg: 'Simulating 24,000 spring particle nodes with Verlet numerical integration' },
        { time: '18:11:45.690', tag: 'tag-purple', prefix: '[RAF]', msg: 'Steady 60.0 FPS rendering performance verified. Zero dropped frames.' },
        { time: '18:11:45.920', tag: 'tag-amber', prefix: '[ACCESSIBILITY]', msg: 'Respects prefers-reduced-motion media query automatically.' }
      ]
    },
    'autonomous-systems': {
      title: 'radar-node: ~/frontier-labs/autonomous-workflows',
      lines: [
        { time: '20:30:10.012', tag: 'tag-green', prefix: '[WEBHOOK]', msg: 'Inbound payload intercepted: multi-source GitHub release trigger' },
        { time: '20:30:10.220', tag: 'tag-blue', prefix: '[PIPELINE]', msg: 'n8n Workflow executing 6 nodes: sanitize -> summarize -> verify -> post' },
        { time: '20:30:10.450', tag: 'tag-purple', prefix: '[DISTRIBUTE]', msg: 'Automated release notes distributed to production changelog in 180ms' },
        { time: '20:30:10.710', tag: 'tag-amber', prefix: '[TELEMETRY]', msg: 'Zero manual human touchpoints required. 100% pipeline reliability.' }
      ]
    }
  };

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const labKey = btn.getAttribute('data-lab-target');
      const packet = labTelemetryPackets[labKey];
      if (!packet || !termScreen) return;

      playTactileClick(820, 'sine');
      setTimeout(() => playTactileClick(1020, 'triangle'), 80);

      if (termTitle) termTitle.textContent = packet.title;

      termScreen.innerHTML = `<div class="c-line"><span class="c-time">[SYS]</span> <span class="tag-blue">CONNECTING TO ${labKey.toUpperCase()}...</span></div>`;

      packet.lines.forEach((line, idx) => {
        setTimeout(() => {
          const lineEl = document.createElement('div');
          lineEl.className = 'c-line';
          lineEl.innerHTML = `<span class="c-time">[${line.time}]</span> <span class="${line.tag}">${line.prefix}</span> <span>${line.msg}</span>`;
          termScreen.appendChild(lineEl);
          termScreen.scrollTop = termScreen.scrollHeight;
        }, (idx + 1) * 160);
      });

      setTimeout(() => {
        const promptLine = document.createElement('div');
        promptLine.className = 'c-line-prompt';
        promptLine.innerHTML = `<span>arfa@telemetry-radar:~$</span> <span class="c-prompt-cursor">█</span>`;
        termScreen.appendChild(promptLine);
        termScreen.scrollTop = termScreen.scrollHeight;
      }, (packet.lines.length + 1) * 160);

      showPortfolioToast(`✦ Connected to Lab: ${labKey.toUpperCase()}`);
    });
  });
}

/**
 * =========================================================================
 * 21. FUTURISTIC 2026 3D DARK GLASS FOOTER INTERACTIONS
 * Handles email newsletter dispatch, 3D mouse parallax on floating objects,
 * interactive 3D central core trigger, and tactile sound feedback.
 * =========================================================================
 */
function setupFuturisticFooter() {
  const footer = document.getElementById('portfolio-footer');
  if (!footer) return;

  // 1. Email Subscribe / Stay in touch handler
  window.handleFooterSubscribe = function() {
    const input = document.getElementById('footer-subscribe-email');
    const feedback = document.getElementById('footer-subscribe-feedback');
    const btn = document.getElementById('footer-subscribe-btn');
    if (!input || !feedback) return;

    const emailVal = input.value.trim();
    if (!emailVal || !emailVal.includes('@')) {
      feedback.textContent = 'Please provide a valid email address.';
      feedback.className = 'footer-feedback-line error';
      playTactileClick(420, 'sawtooth');
      return;
    }

    // Success simulation
    if (btn) {
      btn.style.transform = 'scale(0.85)';
      btn.style.background = '#10B981';
      setTimeout(() => {
        btn.style.transform = '';
        btn.style.background = '';
      }, 1500);
    }

    feedback.textContent = '✦ Thank you! You are now subscribed to direct updates.';
    feedback.className = 'footer-feedback-line success';
    input.value = '';
    playTactileClick(880, 'sine');
    setTimeout(() => playTactileClick(1120, 'triangle'), 120);
    showPortfolioToast('✦ Direct Beacon: Subscribed successfully!');

    setTimeout(() => {
      feedback.style.display = 'none';
      feedback.textContent = '';
      feedback.className = 'footer-feedback-line';
    }, 5000);
  };

  // 2. Interactive 3D Parallax on Floating Footer Geometries
  const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
  if (!isTouch && window.innerWidth >= 992) {
    const torus = footer.querySelector('.f3d-torus-purple');
    const sphereCyan = footer.querySelector('.f3d-sphere-cyan');
    const spherePink = footer.querySelector('.f3d-sphere-pink');
    const cubeCoral = footer.querySelector('.f3d-cube-coral');
    const crystalMint = footer.querySelector('.f3d-crystal-mint');

    footer.addEventListener('mousemove', (e) => {
      const rect = footer.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (torus) {
        torus.style.transform = `perspective(600px) rotateX(${45 + relY * 25}deg) rotateY(${-25 + relX * 30}deg) translate3d(${relX * 22}px, ${relY * 18}px, 0)`;
      }
      if (sphereCyan) {
        sphereCyan.style.transform = `translate3d(${relX * -30}px, ${relY * -25}px, 0) scale(${1 + Math.abs(relX) * 0.1})`;
      }
      if (spherePink) {
        spherePink.style.transform = `translate3d(${relX * 24}px, ${relY * -18}px, 0)`;
      }
      if (cubeCoral) {
        cubeCoral.style.transform = `perspective(700px) rotateX(${60 + relY * 20}deg) rotateZ(${-45 + relX * 25}deg) translate3d(${relX * -20}px, ${relY * 20}px, 0)`;
      }
      if (crystalMint) {
        crystalMint.style.transform = `rotate(${45 + relX * 35}deg) translate3d(${relX * 18}px, ${relY * 16}px, 0)`;
      }
    });

    footer.addEventListener('mouseleave', () => {
      if (torus) torus.style.transform = '';
      if (sphereCyan) sphereCyan.style.transform = '';
      if (spherePink) spherePink.style.transform = '';
      if (cubeCoral) cubeCoral.style.transform = '';
      if (crystalMint) crystalMint.style.transform = '';
    });
  }

  // 3. Central 3D Circular Core Node Click interaction
  const centerNode = footer.querySelector('.bottom-bar-center-node');
  if (centerNode) {
    centerNode.addEventListener('click', () => {
      playTactileClick(940, 'triangle');
      showPortfolioToast('✦ Arfa Munam • 2026 Core Active');
      centerNode.style.transform = 'scale(1.3) rotate(360deg)';
      setTimeout(() => {
        centerNode.style.transform = '';
      }, 700);
    });
  }

  // 4. Subtle Tactile Audio on Footer Links, Quick Tiles, Social Orbs & Console Cells
  const footerInteractive = footer.querySelectorAll('.f-nav-link, .quick-link-tile, .glass-social-orb, .console-feature-cell');
  footerInteractive.forEach(item => {
    item.addEventListener('mouseenter', () => {
      playTactileClick(760, 'sine');
    });
  });
}

/**
 * =========================================================================
 * 22. CURRENTLY LEARNING — 3D INTERACTIVE VISUAL LEARNING ECOSYSTEM
 * Connects floating technology pills, central 3D clay hub, and SVG paths
 * with dynamic glow effects and tactile feedback.
 * =========================================================================
 */
function setupLearningEcosystem() {
  const section = document.getElementById('exploring');
  if (!section) return;

  const chips = section.querySelectorAll('.eco-floating-chip');
  const backendZone = section.querySelector('#zone-backend');
  const aiZone = section.querySelector('#zone-ai');
  const centerOrb = section.querySelector('#eco-central-orb');

  chips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      const isBackend = chip.closest('#zone-backend') !== null;
      if (isBackend) {
        section.classList.add('highlight-backend');
        if (backendZone) {
          backendZone.querySelectorAll('.eco-floating-chip').forEach(sibling => {
            if (sibling !== chip) sibling.style.opacity = '0.65';
          });
        }
      } else {
        section.classList.add('highlight-ai');
        if (aiZone) {
          aiZone.querySelectorAll('.eco-floating-chip').forEach(sibling => {
            if (sibling !== chip) sibling.style.opacity = '0.65';
          });
        }
      }
      playTactileClick(840, 'sine');
    });

    chip.addEventListener('mouseleave', () => {
      section.classList.remove('highlight-backend', 'highlight-ai');
      chips.forEach(c => {
        c.style.opacity = '';
      });
    });
  });

  // Tactile click on central orb
  if (centerOrb) {
    centerOrb.addEventListener('click', () => {
      playTactileClick(980, 'triangle');
      showPortfolioToast('✦ Current Focus: Expanding Beyond Front-End');
      const core = centerOrb.querySelector('.hub-clay-core-body');
      if (core) {
        core.style.transform = 'scale(1.08)';
        setTimeout(() => {
          core.style.transform = '';
        }, 360);
      }
    });

    // Subtle 3D mouse parallax on center orb for fine pointer devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
    if (!isTouch) {
      centerOrb.addEventListener('mousemove', (e) => {
        const rect = centerOrb.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        const core = centerOrb.querySelector('.hub-clay-core-body');
        if (core) {
          core.style.transform = `perspective(500px) rotateX(${-relY * 16}deg) rotateY(${relX * 16}deg) scale(1.02)`;
        }
      });

      centerOrb.addEventListener('mouseleave', () => {
        const core = centerOrb.querySelector('.hub-clay-core-body');
        if (core) {
          core.style.transform = '';
        }
      });
    }
  }
}

/**
 * =========================================================================
 * 23. MY LEARNING JOURNEY — 3D ART-DIRECTED INTERACTIVE LEARNING EXPERIENCE
 * "Learning. Growing. Becoming."
 * 6 Interactive 3D Milestones • Single Compact Active Detail Card
 * 3D Orbital Portrait Parallax Tilt • Keyboard Accessibility (Enter, Space, Arrows)
 * =========================================================================
 */
function setupLearningJourneyStory() {
  const section = document.getElementById('experience');
  if (!section) return;

  const timelineUniverse = document.getElementById('lj-timeline-universe') || section;
  const nodes = Array.from(section.querySelectorAll('.lj-card-3d, .lj-node-item'));
  const detailCard = document.getElementById('lj-single-detail-card');
  const cardKicker = document.getElementById('lj-card-kicker');
  const cardTitle = document.getElementById('lj-card-title');
  const cardDesc = document.getElementById('lj-card-description');
  const cardSkillsRow = document.getElementById('lj-card-skills-row');
  const cardIcon = document.getElementById('lj-card-icon');
  const cardAccentStrip = document.getElementById('lj-card-accent-strip');
  const activeCounter = document.getElementById('lj-active-counter');
  const artifactNum = document.getElementById('lj-artifact-num');
  const artifactGlow = document.getElementById('lj-artifact-glow');
  const cardStatus = document.getElementById('lj-card-status');
  const statusDot = document.getElementById('lj-status-dot');
  const cardQuote = document.getElementById('lj-card-quote');
  const studioSpotlight = document.getElementById('lj-studio-spotlight');
  const floatingObjects = Array.from(section.querySelectorAll('.lj-3d-floating-object'));
  const stageArtifact = document.getElementById('lj-stage-artifact');
  const ribbonCore = section.querySelector('.lj-ribbon-core');
  const portalAssembly = document.getElementById('portal-assembly');
  const deskPlatform = document.getElementById('desk-platform');

  // 3D Architectural Knowledge Engine Interactive Tabs & Parallax
  const consoleTabs = Array.from(section.querySelectorAll('.console-tab'));
  const consolePanes = Array.from(section.querySelectorAll('.console-pane'));
  const engineConsole = document.getElementById('lj-engine-console');
  const engineStage = document.getElementById('lj-engine-stage');

  if (consoleTabs.length > 0) {
    consoleTabs.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        consoleTabs.forEach(t => {
          const isActive = t === btn;
          t.classList.toggle('is-active', isActive);
          t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        consolePanes.forEach(pane => {
          const isTarget = pane.id === `pane-${targetTab}`;
          pane.classList.toggle('is-active', isTarget);
        });
      });
    });
  }

  // Interactive 3D Perspective Tilt on Mouse Movement over the Engine Console
  if (engineStage && engineConsole) {
    engineStage.addEventListener('mousemove', (e) => {
      const rect = engineStage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      engineConsole.style.transform = `rotateX(${-y * 12}deg) rotateY(${x * 14}deg) translateZ(8px)`;
    });

    engineStage.addEventListener('mouseleave', () => {
      engineConsole.style.transform = 'rotateX(2deg) rotateY(-2.5deg)';
    });
  }

  // The 8 Authentic Milestones faithfully representing Arfa Munam's learning roadmap
  const milestones = [
    {
      num: "01",
      stepNum: "01",
      year: "2026",
      shortTitle: "Web Fundamentals",
      stageTitle: "Web Fundamentals",
      subtitle: "HTML, CSS, JavaScript, responsive design",
      kicker: "01 · THE GENESIS",
      title: "Web Fundamentals",
      desc: "Mastered fundamental web architecture, semantic markup in HTML5, modern styling with CSS3, DOM programming in JavaScript (ES6+), and resilient responsive layouts.",
      skills: ["HTML5", "CSS3", "JavaScript ES6+", "Responsive UI"],
      status: "Foundations Mastered",
      quote: "Mastering the primitives before abstractions. Semantic structure is the foundation of digital longevity.",
      color: "#FA5538",
      accentGrad: "linear-gradient(135deg, #FA5538, #FF8A65)",
      borderColor: "rgba(250, 85, 56, 0.48)",
      glowColor: "rgba(250, 85, 56, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
    },
    {
      num: "02",
      stepNum: "02",
      year: "Frontend",
      shortTitle: "Frontend Dev",
      stageTitle: "Frontend Development",
      subtitle: "React, Tailwind CSS, component architecture",
      kicker: "02 · COMPONENT ARCHITECTURE",
      title: "Frontend Development",
      desc: "Component-driven architecture in React, declarative state flows, rapid responsive styling with Tailwind CSS, and engineering modular design systems.",
      skills: ["React.js", "Tailwind CSS", "Component Systems", "State Flow"],
      status: "Production Ready",
      quote: "Component architecture and fluid interfaces bridge the divide between engineering utility and human delight.",
      color: "#2563EB",
      accentGrad: "linear-gradient(135deg, #2563EB, #60A5FA)",
      borderColor: "rgba(37, 99, 235, 0.48)",
      glowColor: "rgba(37, 99, 235, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`
    },
    {
      num: "03",
      stepNum: "03",
      year: "Motion",
      shortTitle: "Animation & UI",
      stageTitle: "Animation & Interactive UI",
      subtitle: "GSAP, motion, micro-interactions, scroll animation",
      kicker: "03 · TACTILE INTERACTION",
      title: "Animation & Interactive UI",
      desc: "Engineered rich visual experiences utilizing GSAP ScrollTrigger, CSS 3D transforms, perspective physics, and tactile micro-interactions that make web applications feel physical and alive.",
      skills: ["GSAP Motion", "CSS 3D Transforms", "ScrollTrigger", "Tactile Physics"],
      status: "High Polish Craft",
      quote: "Great software feels tangible. Motion should clarify spatial relationships rather than merely decorate.",
      color: "#06B6D4",
      accentGrad: "linear-gradient(135deg, #0891B2, #06B6D4)",
      borderColor: "rgba(6, 182, 212, 0.48)",
      glowColor: "rgba(6, 182, 212, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`
    },
    {
      num: "04",
      stepNum: "04",
      year: "Prompt",
      shortTitle: "Prompt Craft",
      stageTitle: "Prompt Engineering",
      subtitle: "Prompt design, AI workflows, creative problem solving",
      kicker: "04 · AI WORKFLOWS & PROMPTING",
      title: "Prompt Engineering",
      desc: "Structured prompt design, system directives, reasoning chains, few-shot prompting, and AI-assisted vibe coding workflows for exponential development speed.",
      skills: ["Prompt Design", "AI Workflows", "Context Windows", "Vibe Coding"],
      status: "Integrated Speed",
      quote: "AI is the ultimate amplifier. Pairing intelligent models with clean engineering produces exceptional velocity.",
      color: "#EC4899",
      accentGrad: "linear-gradient(135deg, #DB2777, #EC4899)",
      borderColor: "rgba(236, 72, 153, 0.48)",
      glowColor: "rgba(236, 72, 153, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path></svg>`
    },
    {
      num: "05",
      stepNum: "05",
      year: "AI",
      shortTitle: "Exploring AI",
      stageTitle: "Exploring AI",
      subtitle: "Generative AI, LLMs, AI integrations",
      kicker: "05 · FRONTIER INTELLIGENCE",
      title: "Exploring AI",
      desc: "Integrating Gemini API and LLM models, streaming multimodal interactions, structured function calling, and building ambient intelligent web experiences.",
      skills: ["Generative AI", "Gemini API", "LLM Integrations", "AI Interfaces"],
      status: "Frontier Explorer",
      quote: "Merging creative frontend with frontier models to engineer software that anticipates user intent.",
      color: "#8B5CF6",
      accentGrad: "linear-gradient(135deg, #7C3AED, #8B5CF6)",
      borderColor: "rgba(139, 92, 246, 0.48)",
      glowColor: "rgba(139, 92, 246, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>`
    },
    {
      num: "06",
      stepNum: "06",
      year: "Backend",
      shortTitle: "Backend Core",
      stageTitle: "Backend Core",
      subtitle: "Node.js, Express, REST APIs, server architecture",
      kicker: "06 · BACKEND ARCHITECTURE (CURRENT FOCUS)",
      title: "Backend Core",
      desc: "Currently expanding horizontally into server-side development with Node.js and Express, API design, middleware pipelines, authentication patterns, and building robust server infrastructure.",
      skills: ["Node.js", "Express.js", "RESTful APIs", "Server Architecture"],
      status: "Current Focus",
      quote: "A frontend engineer becomes truly formidable when they master server-side logic and deterministic data flow.",
      color: "#10B981",
      accentGrad: "linear-gradient(135deg, #059669, #10B981)",
      borderColor: "rgba(16, 185, 129, 0.48)",
      glowColor: "rgba(16, 185, 129, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`
    },
    {
      num: "07",
      stepNum: "07",
      year: "Cloud",
      shortTitle: "Data & Cloud",
      stageTitle: "Data & Cloud",
      subtitle: "PostgreSQL, Supabase, databases, deployment",
      kicker: "07 · DATA PERSISTENCE & CLOUD",
      title: "Data & Cloud",
      desc: "Relational database modeling in PostgreSQL, real-time events and auth with Supabase, cloud infrastructure deployment, and durable persistence.",
      skills: ["PostgreSQL", "Supabase", "Cloud Deploy", "Data Schemas"],
      status: "Persistent Systems",
      quote: "Clean schemas create clean codebases. Resilient data architecture guarantees long-term application integrity.",
      color: "#F59E0B",
      accentGrad: "linear-gradient(135deg, #D97706, #F59E0B)",
      borderColor: "rgba(245, 158, 11, 0.48)",
      glowColor: "rgba(245, 158, 11, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>`
    },
    {
      num: "08",
      stepNum: "08",
      year: "Horizon",
      shortTitle: "Future Goals",
      stageTitle: "Future Goals",
      subtitle: "Full-stack AI products, AI agents, advanced interfaces",
      kicker: "08 · FUTURE GOALS",
      title: "Future Goals",
      desc: "Architecting end-to-end full-stack AI products, autonomous agents, and high-impact web software with aesthetic discipline and production-grade engineering.",
      skills: ["Full-Stack AI", "AI Agents", "Advanced UI", "Ambitious Software"],
      status: "Horizon Objective",
      quote: "Building software that leaves an imprint. High polish, genuine utility, and relentless dedication to user craft.",
      color: "#6366F1",
      accentGrad: "linear-gradient(135deg, #4F46E5, #6366F1)",
      borderColor: "rgba(99, 102, 241, 0.48)",
      glowColor: "rgba(99, 102, 241, 0.35)",
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
    }
  ];

  // Sequential Entrance Stagger on Scroll (80-120ms Staggered Reveal)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const universeContainer = document.getElementById('lj-timeline-universe');
    if (universeContainer) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            universeContainer.classList.add('is-revealed');
            nodes.forEach((node, i) => {
              node.style.transitionDelay = `${(i * 95)}ms`;
              node.classList.add('is-revealed');
            });
            // Clear transitionDelay after entrance so hover responses are instant
            setTimeout(() => {
              nodes.forEach(node => {
                node.style.transitionDelay = '';
              });
            }, 1400);
            observer.disconnect();
          }
        });
      }, { threshold: 0.12 });
      observer.observe(universeContainer);
    }
  } else {
    const universeContainer = document.getElementById('lj-timeline-universe');
    if (universeContainer) universeContainer.classList.add('is-revealed');
    nodes.forEach(node => node.classList.add('is-revealed'));
  }

  let currentMilestoneIndex = 0;

  function setActiveMilestone(index, animate = true) {
    if (index < 0 || index >= milestones.length) return;
    currentMilestoneIndex = index;
    const m = milestones[index];

    // 1. Update node classes & ARIA attributes on all 8 buttons
    nodes.forEach((node, i) => {
      const isActive = i === index;
      node.classList.toggle('is-active', isActive);
      node.setAttribute('aria-selected', isActive ? 'true' : 'false');
      if (isActive) {
        node.style.setProperty('--card-active-glow', m.glowColor);
      }
    });

    // 1b. Update active state on SVG roadmap waypoints
    const allWaypointRings = section.querySelectorAll('.waypoint-ring');
    const allWaypointHalos = section.querySelectorAll('.waypoint-glow-halo');
    allWaypointRings.forEach((ring, i) => {
      ring.classList.toggle('is-active', i === index);
    });
    allWaypointHalos.forEach((halo, i) => {
      halo.classList.toggle('is-active', i === index);
    });

    // 2. Update counter display
    if (activeCounter) {
      activeCounter.innerHTML = `<span class="counter-num" id="lj-counter-current">${m.num}</span> <span class="counter-sep">/</span> <span class="counter-total">08</span>`;
    }

    // 3. Update single compact active detail card with smooth glass transition
    if (detailCard) {
      if (animate) {
        detailCard.style.opacity = '0';
        detailCard.style.transform = 'translateY(8px) scale(0.985)';
      }

      setTimeout(() => {
        if (cardKicker) cardKicker.textContent = m.kicker;
        if (cardTitle) cardTitle.textContent = m.title;
        if (cardDesc) cardDesc.textContent = m.desc;
        if (cardStatus) cardStatus.textContent = m.status;
        if (statusDot) {
          statusDot.style.background = m.color;
          statusDot.style.boxShadow = `0 0 10px ${m.color}`;
        }
        if (cardQuote) cardQuote.textContent = m.quote;
        if (artifactNum) artifactNum.textContent = `STAGE ${m.num}`;
        if (artifactGlow) {
          artifactGlow.style.background = `radial-gradient(circle, ${m.glowColor} 0%, transparent 70%)`;
        }
        if (cardIcon) {
          cardIcon.innerHTML = m.icon;
          cardIcon.style.color = m.color;
        }
        if (cardAccentStrip) {
          cardAccentStrip.style.background = m.accentGrad;
        }
        if (cardSkillsRow && Array.isArray(m.skills)) {
          cardSkillsRow.innerHTML = m.skills.map(s => 
            `<span class="panel-skill-pill-3d" style="--chip-accent:${m.color};">
              <span class="chip-star">✦</span>
              <span class="chip-label">${s}</span>
            </span>`
          ).join('');
        }

        detailCard.style.borderColor = m.borderColor;
        detailCard.style.boxShadow = `0 35px 80px -15px rgba(0, 0, 0, 0.9), 0 0 45px -10px ${m.glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.18)`;

        if (animate) {
          detailCard.style.opacity = '1';
          detailCard.style.transform = 'translateY(0) scale(1)';
        }
      }, animate ? 120 : 0);
    }
  }

  // Bind clicks, hover, and keyboard on 8 milestone cards with 3D tactile tilt
  nodes.forEach((node, idx) => {
    const dataIdx = parseInt(node.getAttribute('data-index'), 10);
    const targetIdx = !isNaN(dataIdx) ? dataIdx : idx;

    node.addEventListener('click', (e) => {
      e.preventDefault();
      setActiveMilestone(targetIdx, true);
    });

    node.addEventListener('mouseenter', () => {
      if (ribbonCore && milestones[targetIdx]) {
        ribbonCore.style.filter = `drop-shadow(0 0 22px ${milestones[targetIdx].glowColor})`;
      }
      const ring = section.querySelector(`.waypoint-ring[data-waypoint="${targetIdx}"]`);
      const halo = section.querySelector(`.waypoint-glow-halo.halo-${targetIdx}`);
      if (ring) ring.classList.add('is-illuminated');
      if (halo) halo.classList.add('is-illuminated');
    });

    node.addEventListener('mouseleave', () => {
      if (ribbonCore) {
        ribbonCore.style.filter = '';
      }
      node.style.transform = '';
      node.style.removeProperty('--mouse-x');
      node.style.removeProperty('--mouse-y');
      const ring = section.querySelector(`.waypoint-ring[data-waypoint="${targetIdx}"]`);
      const halo = section.querySelector(`.waypoint-glow-halo.halo-${targetIdx}`);
      if (ring) ring.classList.remove('is-illuminated');
      if (halo) halo.classList.remove('is-illuminated');
    });

    // Tactile 3D perspective tilt (subtle ±3.5deg max) and dynamic cursor light-follow
    node.addEventListener('mousemove', (e) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = node.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      const rotX = Math.max(-3.5, Math.min(3.5, -y * 7));
      const rotY = Math.max(-3.5, Math.min(3.5, x * 7));
      const elev = node.classList.contains('is-active') ? -8 : -6;
      
      node.style.transform = `perspective(900px) translateY(${elev}px) translateZ(24px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(1.025)`;
      
      const mouseX = (e.clientX - rect.left).toFixed(1);
      const mouseY = (e.clientY - rect.top).toFixed(1);
      node.style.setProperty('--mouse-x', `${mouseX}px`);
      node.style.setProperty('--mouse-y', `${mouseY}px`);
    });

    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveMilestone(targetIdx, true);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = (targetIdx + 1) % milestones.length;
        setActiveMilestone(nextIdx, true);
        const nextNode = nodes.find(n => parseInt(n.getAttribute('data-index'), 10) === nextIdx) || nodes[nextIdx];
        if (nextNode) nextNode.focus();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = (targetIdx - 1 + milestones.length) % milestones.length;
        setActiveMilestone(prevIdx, true);
        const prevNode = nodes.find(n => parseInt(n.getAttribute('data-index'), 10) === prevIdx) || nodes[prevIdx];
        if (prevNode) prevNode.focus();
      }
    });
  });

  // Tasteful Studio Depth & 3D Object Parallax Tracking
  section.addEventListener('pointermove', (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = section.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    // 1. Move 3D floating background objects according to depth
    floatingObjects.forEach((obj) => {
      const depth = parseFloat(obj.getAttribute('data-depth')) || 0.8;
      const moveX = relX * 26 * depth;
      const moveY = relY * 22 * depth;
      obj.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0px)`;
    });

    // 2. Subtle perspective tilt on stage artifact
    if (stageArtifact) {
      const artBody = stageArtifact.querySelector('.artifact-floating-body');
      if (artBody) {
        const tiltX = -relY * 14;
        const tiltY = relX * 14;
        artBody.style.transform = `perspective(500px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }
    }

    // 3. Subtle perspective tilt on portal and desk platform
    if (portalAssembly) {
      const pTiltX = -relY * 8;
      const pTiltY = relX * 8;
      portalAssembly.style.transform = `perspective(1000px) rotateX(${pTiltX.toFixed(2)}deg) rotateY(${pTiltY.toFixed(2)}deg)`;
    }
    if (deskPlatform) {
      const dTiltX = -relY * 5;
      const dTiltY = relX * 5;
      deskPlatform.style.transform = `perspective(1000px) rotateX(${dTiltX.toFixed(2)}deg) rotateY(${dTiltY.toFixed(2)}deg)`;
    }

    // 4. Subtle studio spotlight follow
    if (studioSpotlight) {
      const posX = ((e.clientX - rect.left) / rect.width) * 100;
      const posY = ((e.clientY - rect.top) / rect.height) * 100;
      studioSpotlight.style.background = `radial-gradient(circle at ${posX.toFixed(1)}% ${posY.toFixed(1)}%, rgba(251, 113, 133, 0.08) 0%, transparent 60%)`;
    }
  }, { passive: true });

  section.addEventListener('pointerleave', () => {
    floatingObjects.forEach((obj) => {
      obj.style.transform = '';
    });
    if (stageArtifact) {
      const artBody = stageArtifact.querySelector('.artifact-floating-body');
      if (artBody) {
        artBody.style.transform = '';
      }
    }
    if (portalAssembly) {
      portalAssembly.style.transform = '';
    }
    if (deskPlatform) {
      deskPlatform.style.transform = '';
    }
  });

  // Initialize milestone 01 on load
  setActiveMilestone(0, false);
}

/**
 * =========================================================================
 * 24. DEDICATED GITHUB SHOWCASE & INTERACTIVE ACTIVITY VISUALIZATION
 * Open Source & Version Control · 35+ Repositories · 900+ Commits
 * =========================================================================
 */
function setupGitHubShowcaseSection() {
  const section = document.getElementById('github-section');
  if (!section) return;

  const matrix = document.getElementById('gh-heatmap-matrix');
  const tooltip = document.getElementById('gh-tooltip');
  const canvas = document.getElementById('gh-visual-canvas');
  const scrollWrapper = document.getElementById('gh-heatmap-scroll');

  if (!matrix) return;

  // Clear existing content to prevent duplicates
  matrix.innerHTML = '';

  // Generate 52 weeks x 7 days (364 cells) ending around current date
  const now = new Date();
  const totalDays = 52 * 7;
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - totalDays);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Seeded/predictable realistic activity generator matching 900+ commits
  // High consistency, occasional high-velocity sprints
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);

    const dayOfWeek = d.getDay(); // 0 is Sunday, 1 is Monday ...
    const monthName = months[d.getMonth()];
    const dateNum = d.getDate();
    const dateStr = `${monthName} ${dateNum}`;

    // Pseudorandom pseudo-natural activity distribution
    // Higher probability of commits on weekdays (1-5)
    const seed = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
    const rand = seed - Math.floor(seed);

    let count = 0;
    let lvlClass = 'lvl-0';

    // Weekend baseline vs Weekday baseline
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const threshold = isWeekend ? 0.42 : 0.22;

    if (rand > threshold) {
      if (rand > 0.94) {
        count = Math.floor(rand * 5) + 6; // 6-10 commits (Sprint / release day)
        lvlClass = 'lvl-milestone';
      } else if (rand > 0.82) {
        count = Math.floor(rand * 3) + 4; // 4-6 commits
        lvlClass = 'lvl-3';
      } else if (rand > 0.55) {
        count = Math.floor(rand * 2) + 2; // 2-3 commits
        lvlClass = 'lvl-2';
      } else {
        count = 1;
        lvlClass = 'lvl-1';
      }
    }

    const cell = document.createElement('div');
    cell.className = `gh-cell ${lvlClass}`;
    cell.setAttribute('role', 'gridcell');
    cell.setAttribute('tabindex', '0');

    const commitWord = count === 1 ? 'commit' : 'commits';
    const summary = count > 0 
      ? `${count} ${commitWord} on ${dateStr}`
      : `No commits on ${dateStr}`;

    cell.setAttribute('aria-label', summary);
    cell.dataset.summary = summary;
    cell.dataset.count = String(count);
    cell.dataset.date = dateStr;

    // Interaction handlers
    const showTooltip = () => {
      if (!tooltip || !canvas) return;
      tooltip.textContent = summary;
      tooltip.classList.add('is-visible');

      const cellRect = cell.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();

      const left = cellRect.left - canvasRect.left + cellRect.width / 2;
      const top = cellRect.top - canvasRect.top;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    };

    const hideTooltip = () => {
      if (!tooltip) return;
      tooltip.classList.remove('is-visible');
    };

    cell.addEventListener('mouseenter', showTooltip);
    cell.addEventListener('mouseleave', hideTooltip);
    cell.addEventListener('focus', showTooltip);
    cell.addEventListener('blur', hideTooltip);

    fragment.appendChild(cell);
  }

  matrix.appendChild(fragment);

  // Auto-scroll to current/latest weeks on smaller viewports
  if (scrollWrapper && scrollWrapper.scrollWidth > scrollWrapper.clientWidth) {
    // Scroll near the end so recent activity is visible
    setTimeout(() => {
      scrollWrapper.scrollLeft = scrollWrapper.scrollWidth - scrollWrapper.clientWidth - 20;
    }, 100);
  }

  // Subtle interactive 3D perspective parallax for desktop canvas
  if (canvas && window.innerWidth > 960) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;
    let isHovering = false;

    const renderCanvasTilt = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      const rotX = -currentY * 3.5;
      const rotY = currentX * 4.5;
      const transX = currentX * 6;
      const transY = currentY * 4;

      canvas.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`;

      if (isHovering || Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01) {
        rafId = requestAnimationFrame(renderCanvasTilt);
      } else {
        rafId = null;
        canvas.style.transform = '';
      }
    };

    canvas.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!rafId) rafId = requestAnimationFrame(renderCanvasTilt);
    });

    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      mouseY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      if (!rafId) rafId = requestAnimationFrame(renderCanvasTilt);
    });

    canvas.addEventListener('mouseleave', () => {
      isHovering = false;
      mouseX = 0;
      mouseY = 0;
    });
  }
}

/* ==========================================================================
   25. CINEMATIC MINIATURE ROPE WORLD INTRO (ISOLATED OVERLAY)
   Miniature Studio Stage • Real Braided Colorful Rope • Tiny 3D Worker Figures
   Physical Construction of "WELCOME" • Interactive Keyboard Entry
   ========================================================================== */
function initCinematicWelcomeIntro() {
  const overlay = document.getElementById('cinematic-welcome-experience');
  if (!overlay) return;

  const canvas = document.getElementById('cwe-rope-canvas');
  const stage = document.getElementById('cwe-stage');
  const skipBtn = document.getElementById('cwe-skip-btn');
  const enterBtn = document.getElementById('cwe-enter-btn');
  const progressBar = document.getElementById('cwe-progress-bar');

  // MANDATORY OPENING SCREEN: Always active on every page load / reload.
  // NO sessionStorage, NO localStorage, NO cookies, NO persistent skip state.
  document.body.classList.add('cwe-active');
  overlay.classList.remove('cwe-hidden', 'cwe-exiting', 'step-hold');
  overlay.setAttribute('aria-hidden', 'false');

  let isExiting = false;
  let isSequenceFinished = false;
  let animFrameId = null;

  // Canvas Setup
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const V_WIDTH = 1360;
  const V_HEIGHT = 720;
  canvas.width = V_WIDTH * dpr;
  canvas.height = V_HEIGHT * dpr;

  // Interactive mouse camera tilt
  let mouseTiltX = 0;
  let mouseTiltY = 0;
  let curTiltX = 0;
  let curTiltY = 0;

  // --------------------------------------------------------------------------
  // LETTER SPLINE DEFINITIONS: "W - E - L - C - O - M - E"
  // Each letter has control nodes defining the physical rope shape.
  // --------------------------------------------------------------------------
  const BASE_Y = 460;
  const TOP_Y = 250;
  const MID_Y = 360;

  const letterConfigs = [
    // 0: W (Coral Red #FA5538)
    {
      char: 'W',
      color: '#FA5538',
      accentColor: '#FFFFFF',
      startSec: 0.6,
      endSec: 1.8,
      targetNodes: [
        { x: 215, y: 245 },
        { x: 250, y: 460 },
        { x: 290, y: 310 },
        { x: 330, y: 460 },
        { x: 370, y: 245 }
      ]
    },
    // 1: E (Amber Sunshine #F59E0B)
    {
      char: 'E',
      color: '#F59E0B',
      accentColor: '#FEF3C7',
      startSec: 1.5,
      endSec: 2.6,
      targetNodes: [
        { x: 385, y: 260 },
        { x: 430, y: 230 },
        { x: 470, y: 235 },
        { x: 480, y: 315 },
        { x: 420, y: 345 },
        { x: 465, y: 460 },
        { x: 505, y: 450 }
      ]
    },
    // 2: L (Electric Cyan #06B6D4)
    {
      char: 'L',
      color: '#06B6D4',
      accentColor: '#CFFAFE',
      startSec: 2.3,
      endSec: 3.4,
      targetNodes: [
        { x: 535, y: 220 },
        { x: 560, y: 175 },
        { x: 580, y: 215 },
        { x: 575, y: 410 },
        { x: 590, y: 460 },
        { x: 635, y: 455 }
      ]
    },
    // 3: C (Cobalt Blue #2563EB)
    {
      char: 'C',
      color: '#2563EB',
      accentColor: '#DBEAFE',
      startSec: 3.1,
      endSec: 4.1,
      targetNodes: [
        { x: 730, y: 250 },
        { x: 680, y: 230 },
        { x: 645, y: 345 },
        { x: 680, y: 460 },
        { x: 735, y: 440 }
      ]
    },
    // 4: O (Emerald Green #10B981)
    {
      char: 'O',
      color: '#10B981',
      accentColor: '#D1FAE5',
      startSec: 3.8,
      endSec: 4.9,
      targetNodes: [
        { x: 805, y: 230 },
        { x: 760, y: 345 },
        { x: 805, y: 460 },
        { x: 850, y: 345 },
        { x: 810, y: 230 }
      ]
    },
    // 5: M (Royal Violet #8B5CF6)
    {
      char: 'M',
      color: '#8B5CF6',
      accentColor: '#EDE9FE',
      startSec: 4.5,
      endSec: 5.6,
      targetNodes: [
        { x: 870, y: 460 },
        { x: 890, y: 245 },
        { x: 930, y: 395 },
        { x: 970, y: 245 },
        { x: 1000, y: 460 }
      ]
    },
    // 6: E (Hot Magenta #EC4899)
    {
      char: 'E',
      color: '#EC4899',
      accentColor: '#FCE7F3',
      startSec: 5.2,
      endSec: 6.3,
      targetNodes: [
        { x: 1025, y: 260 },
        { x: 1065, y: 230 },
        { x: 1105, y: 235 },
        { x: 1115, y: 315 },
        { x: 1060, y: 345 },
        { x: 1105, y: 460 },
        { x: 1145, y: 445 }
      ]
    }
  ];

  // Initialize node physics: nodes start in loose, wavy cords on the floor
  const letters = letterConfigs.map((cfg, idx) => {
    const nodes = cfg.targetNodes.map((target, nIdx) => {
      // Loose chaotic floor wave at start
      const floorY = 485 + Math.sin(idx * 2 + nIdx) * 20;
      const waveX = target.x + (Math.sin(nIdx * 3) - 0.5) * 45;
      return {
        tx: target.x,
        ty: target.y,
        x: waveX,
        y: floorY,
        vx: 0,
        vy: 0,
        built: false
      };
    });
    return {
      ...cfg,
      nodes,
      poppedSparkles: false
    };
  });

  // Miniature dust / craft sparkles particle pool
  const craftParticles = [];
  function spawnCraftSparkles(x, y, color) {
    for (let i = 0; i < 9; i++) {
      const angle = (Math.PI * 2 * i) / 9 + (Math.random() - 0.5) * 0.4;
      const spd = 1.5 + Math.random() * 2.5;
      craftParticles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 1.2,
        alpha: 1,
        color,
        size: 2 + Math.random() * 2.5
      });
    }
  }

  // --------------------------------------------------------------------------
  // TINY 3D WORKER HUMANOIDS
  // Articulated little toy figures that actively build the rope letters!
  // --------------------------------------------------------------------------
  const workers = [
    {
      id: 1,
      targetLetterIdx: 0,
      targetNodeIdx: 0,
      name: 'W-Puller-Left',
      bodyColor: '#FA5538',
      helmetColor: '#F59E0B',
      x: 165,
      y: 475,
      dir: 1,
      role: 'puller',
      pullTension: 0,
      idleAnim: 0
    },
    {
      id: 2,
      targetLetterIdx: 0,
      targetNodeIdx: 2,
      name: 'W-Apex-Anchor',
      bodyColor: '#06B6D4',
      helmetColor: '#FFFFFF',
      x: 290,
      y: 495,
      dir: 1,
      role: 'anchor',
      pullTension: 0,
      idleAnim: 0.8
    },
    {
      id: 3,
      targetLetterIdx: 1,
      targetNodeIdx: 2,
      name: 'E-Hoister',
      bodyColor: '#F59E0B',
      helmetColor: '#FA5538',
      x: 435,
      y: 490,
      dir: 1,
      role: 'hoister',
      pullTension: 0,
      idleAnim: 1.5
    },
    {
      id: 4,
      targetLetterIdx: 2,
      targetNodeIdx: 1,
      name: 'L-Upright-Puller',
      bodyColor: '#2563EB',
      helmetColor: '#F59E0B',
      x: 515,
      y: 485,
      dir: 1,
      role: 'puller',
      pullTension: 0,
      idleAnim: 2.2
    },
    {
      id: 5,
      targetLetterIdx: 3,
      targetNodeIdx: 2,
      name: 'C-Curve-Pusher',
      bodyColor: '#10B981',
      helmetColor: '#FFFFFF',
      x: 610,
      y: 470,
      dir: 1,
      role: 'pusher',
      pullTension: 0,
      idleAnim: 3.1
    },
    {
      id: 6,
      targetLetterIdx: 4,
      targetNodeIdx: 2,
      name: 'O-Base-Anchor',
      bodyColor: '#8B5CF6',
      helmetColor: '#F59E0B',
      x: 745,
      y: 490,
      dir: 1,
      role: 'anchor',
      pullTension: 0,
      idleAnim: 0.4
    },
    {
      id: 7,
      targetLetterIdx: 4,
      targetNodeIdx: 0,
      name: 'O-Top-Sitter',
      bodyColor: '#EC4899',
      helmetColor: '#F59E0B',
      x: 805,
      y: 485,
      dir: 1,
      role: 'sitter',
      pullTension: 0,
      idleAnim: 1.2
    },
    {
      id: 8,
      targetLetterIdx: 5,
      targetNodeIdx: 1,
      name: 'M-Arch-Hoister',
      bodyColor: '#06B6D4',
      helmetColor: '#FFFFFF',
      x: 855,
      y: 485,
      dir: 1,
      role: 'hoister',
      pullTension: 0,
      idleAnim: 2.0
    },
    {
      id: 9,
      targetLetterIdx: 5,
      targetNodeIdx: 4,
      name: 'M-Right-Anchor',
      bodyColor: '#10B981',
      helmetColor: '#FA5538',
      x: 1020,
      y: 490,
      dir: -1,
      role: 'anchor',
      pullTension: 0,
      idleAnim: 0.7
    },
    {
      id: 10,
      targetLetterIdx: 6,
      targetNodeIdx: 5,
      name: 'E-Finisher',
      bodyColor: '#FA5538',
      helmetColor: '#2563EB',
      x: 1175,
      y: 480,
      dir: -1,
      role: 'finisher',
      pullTension: 0,
      idleAnim: 1.9
    },
    {
      id: 11,
      targetLetterIdx: 0,
      targetNodeIdx: 0,
      name: 'Crew-Director',
      bodyColor: '#2563EB',
      helmetColor: '#FFFFFF',
      x: 105,
      y: 492,
      dir: 1,
      role: 'director',
      pullTension: 0,
      idleAnim: 0.5
    },
    {
      id: 12,
      targetLetterIdx: 6,
      targetNodeIdx: 6,
      name: 'Spool-Tender',
      bodyColor: '#10B981',
      helmetColor: '#F59E0B',
      x: 1240,
      y: 485,
      dir: -1,
      role: 'spooler',
      pullTension: 0,
      idleAnim: 2.7
    }
  ];

  // --------------------------------------------------------------------------
  // PHYSICAL BRAIDED ROPE RENDERER
  // Evaluates smooth curve with 3D volume, drop shadows, and woven ridges
  // --------------------------------------------------------------------------
  function getSplinePoints(nodes, stepsPerSeg = 14) {
    if (nodes.length < 2) return nodes;
    const pts = [];
    for (let i = 0; i < nodes.length - 1; i++) {
      const p0 = i > 0 ? nodes[i - 1] : nodes[i];
      const p1 = nodes[i];
      const p2 = nodes[i + 1];
      const p3 = i < nodes.length - 2 ? nodes[i + 2] : p2;

      for (let t = 0; t <= 1; t += 1 / stepsPerSeg) {
        const t2 = t * t;
        const t3 = t2 * t;
        // Catmull-Rom spline formula
        const x = 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
        );
        const y = 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
        );
        pts.push({ x, y });
      }
    }
    return pts;
  }

  function drawPhysicalRope(splinePts, baseColor, accentColor, ropeRadius = 13.5) {
    if (splinePts.length < 2) return;

    // 1. Soft Floor Contact Drop Shadow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(splinePts[0].x, splinePts[0].y + 16);
    for (let i = 1; i < splinePts.length; i++) {
      ctx.lineTo(splinePts[i].x, splinePts[i].y + 16);
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = ropeRadius * 2.2;
    ctx.strokeStyle = 'rgba(25, 20, 15, 0.18)';
    ctx.filter = 'blur(9px)';
    ctx.stroke();
    ctx.restore();

    // 2. Ambient Occlusion Crevice Shadow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(splinePts[0].x, splinePts[0].y + 7);
    for (let i = 1; i < splinePts.length; i++) {
      ctx.lineTo(splinePts[i].x, splinePts[i].y + 7);
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = ropeRadius * 2;
    ctx.strokeStyle = 'rgba(15, 12, 10, 0.28)';
    ctx.filter = 'blur(4px)';
    ctx.stroke();
    ctx.restore();

    // 3. Base Cylindrical Rope Tube
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(splinePts[0].x, splinePts[0].y);
    for (let i = 1; i < splinePts.length; i++) {
      ctx.lineTo(splinePts[i].x, splinePts[i].y);
    }
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = ropeRadius * 2;
    ctx.strokeStyle = baseColor;
    ctx.stroke();

    // 4. Lower Shadow Depth Layer
    ctx.beginPath();
    ctx.moveTo(splinePts[0].x, splinePts[0].y + 3);
    for (let i = 1; i < splinePts.length; i++) {
      ctx.lineTo(splinePts[i].x, splinePts[i].y + 3);
    }
    ctx.lineWidth = ropeRadius * 1.4;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.24)';
    ctx.stroke();

    // 5. Upper Luminous Specular Volume
    ctx.beginPath();
    ctx.moveTo(splinePts[0].x, splinePts[0].y - 3.5);
    for (let i = 1; i < splinePts.length; i++) {
      ctx.lineTo(splinePts[i].x, splinePts[i].y - 3.5);
    }
    ctx.lineWidth = ropeRadius * 0.9;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.42)';
    ctx.stroke();

    // 6. Braided Twist / Helical Woven Ridges (Procedural Rope Texture)
    const step = 6;
    for (let i = step; i < splinePts.length - step; i += step) {
      const pPrev = splinePts[i - 3];
      const pNext = splinePts[i + 3];
      const dx = pNext.x - pPrev.x;
      const dy = pNext.y - pPrev.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      const p = splinePts[i];
      const isStripe = (Math.floor(i / 18) % 2 === 0);
      const ridgeLen = ropeRadius * 0.95;

      // Draw angled braid stitch
      ctx.beginPath();
      ctx.moveTo(p.x - nx * ridgeLen + dx * 0.35, p.y - ny * ridgeLen + dy * 0.35);
      ctx.lineTo(p.x + nx * ridgeLen - dx * 0.35, p.y + ny * ridgeLen - dy * 0.35);
      ctx.lineWidth = 2.4;
      ctx.lineCap = 'round';
      ctx.strokeStyle = isStripe ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.25)';
      ctx.stroke();
    }

    // 7. Finished Rope Aglet Caps at Endpoints
    [splinePts[0], splinePts[splinePts.length - 1]].forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, ropeRadius * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = '#1C1917';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, ropeRadius * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = '#D97706';
      ctx.fill();
    });

    ctx.restore();
  }

  // --------------------------------------------------------------------------
  // TINY 3D HUMANOID WORKER FIGURES RENDERER
  // Cute, articulated toy characters with helmets, boots, and tension ropes
  // --------------------------------------------------------------------------
  function drawWorker(w, timeSec) {
    ctx.save();

    // Contact Ground Shadow
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(w.x, w.y + 4, 11, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(20, 15, 10, 0.22)';
    ctx.filter = 'blur(2px)';
    ctx.fill();
    ctx.restore();

    // Dynamic animation parameters based on role and stage
    let bodyTilt = 0;
    let armLeft = { x: -6, y: -16 };
    let armRight = { x: 6, y: -16 };
    let legCycle = Math.sin(timeSec * 8 + w.id) * 4;

    const letter = letters[w.targetLetterIdx];
    const node = letter.nodes[w.targetNodeIdx];
    const isBuilt = letter.built;

    if (!isBuilt) {
      // Actively pulling / pushing / heaving / directing
      if (w.role === 'puller') {
        bodyTilt = -0.38 * w.dir; // Leaning back with weight
        armLeft = { x: 10 * w.dir, y: -18 };
        armRight = { x: 12 * w.dir, y: -14 };
      } else if (w.role === 'pusher') {
        bodyTilt = 0.35 * w.dir; // Leaning forward into rope
        armLeft = { x: 8 * w.dir, y: -18 };
        armRight = { x: 10 * w.dir, y: -16 };
      } else if (w.role === 'hoister') {
        bodyTilt = 0.1;
        armLeft = { x: -4, y: -26 }; // Arms reaching high
        armRight = { x: 4, y: -26 };
      } else if (w.role === 'director') {
        bodyTilt = 0.14;
        armLeft = { x: -8, y: -16 };
        armRight = { x: 12, y: -24 }; // Pointing forward
      } else if (w.role === 'spooler') {
        bodyTilt = -0.16;
        armLeft = { x: -8, y: -16 };
        armRight = { x: 8, y: -14 };
      }
    } else {
      // Idle celebrations & relaxed poses
      if (w.role === 'sitter') {
        // Sitting on top of the loop, swinging legs!
        w.x = node.x;
        w.y = node.y - 12;
        bodyTilt = 0.05;
        legCycle = Math.sin(timeSec * 3 + w.idleAnim) * 5;
        armLeft = { x: -8, y: -10 };
        armRight = { x: 8, y: -10 };
      } else if (w.role === 'finisher' || w.role === 'director') {
        // Thumbs up / cheering
        armRight = { x: 12, y: -26 };
        armLeft = { x: -6, y: -14 };
        bodyTilt = Math.sin(timeSec * 4 + w.idleAnim) * 0.08;
      } else {
        // Casual breathing idle
        bodyTilt = Math.sin(timeSec * 2 + w.idleAnim) * 0.06;
      }
    }

    // Draw Tension Cable from hands to the rope node
    if (!isBuilt && node) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(w.x + armRight.x, w.y + armRight.y);
      ctx.lineTo(node.x, node.y);
      ctx.lineWidth = 1.4;
      ctx.strokeStyle = '#57534E';
      ctx.stroke();

      // Little tension tie knot
      ctx.beginPath();
      ctx.arc(node.x, node.y, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = '#D97706';
      ctx.fill();
      ctx.restore();
    }

    ctx.translate(w.x, w.y);
    ctx.rotate(bodyTilt);

    // 1. Legs & Rounded Worker Boots
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#292524'; // Sturdy dark work pants
    // Left leg
    ctx.beginPath();
    ctx.moveTo(-4, -12);
    ctx.lineTo(-5, 0 + (isBuilt ? 0 : legCycle));
    ctx.stroke();
    // Right leg
    ctx.beginPath();
    ctx.moveTo(4, -12);
    ctx.lineTo(5, 0 - (isBuilt ? 0 : legCycle));
    ctx.stroke();

    // Boots (Chunky orange/tan work boots)
    ctx.fillStyle = '#D97706';
    ctx.beginPath();
    ctx.ellipse(-6, 2, 4.5, 2.5, 0, 0, Math.PI * 2);
    ctx.ellipse(6, 2, 4.5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. 3D Torso (Colorful Jumpsuit)
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(-7, -22, 14, 13, 4);
    ctx.fillStyle = w.bodyColor;
    ctx.fill();
    // Overalls straps & shading
    ctx.fillStyle = 'rgba(0, 0, 0, 0.16)';
    ctx.fillRect(-7, -13, 14, 4);
    ctx.restore();

    // 3. Articulated Arms
    ctx.lineWidth = 3.2;
    ctx.strokeStyle = w.bodyColor;
    // Left arm
    ctx.beginPath();
    ctx.moveTo(-6, -20);
    ctx.lineTo(armLeft.x, armLeft.y);
    ctx.stroke();
    // Right arm
    ctx.beginPath();
    ctx.moveTo(6, -20);
    ctx.lineTo(armRight.x, armRight.y);
    ctx.stroke();

    // Hands
    ctx.fillStyle = '#FBBF24';
    ctx.beginPath();
    ctx.arc(armLeft.x, armLeft.y, 2.2, 0, Math.PI * 2);
    ctx.arc(armRight.x, armRight.y, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Director props (Rolled blueprint)
    if (w.role === 'director') {
      ctx.save();
      ctx.fillStyle = '#E0E7FF';
      ctx.beginPath();
      ctx.roundRect(armLeft.x - 3, armLeft.y - 6, 6, 12, 1.5);
      ctx.fill();
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();
    }

    // 4. Wooden Sphere Head
    ctx.save();
    ctx.beginPath();
    ctx.arc(0, -28, 6.2, 0, Math.PI * 2);
    const headGrad = ctx.createRadialGradient(-2, -30, 1, 0, -28, 6.5);
    headGrad.addColorStop(0, '#FEF3C7');
    headGrad.addColorStop(0.7, '#FDE68A');
    headGrad.addColorStop(1, '#D97706');
    ctx.fillStyle = headGrad;
    ctx.fill();

    // 5. Hard Hat / Safety Helmet with 3D Specular Ridge
    ctx.beginPath();
    ctx.arc(0, -31, 7.2, Math.PI * 0.95, Math.PI * 2.05);
    ctx.closePath();
    ctx.fillStyle = w.helmetColor;
    ctx.fill();
    // Helmet Brim
    ctx.beginPath();
    ctx.roundRect(-8, -31, 16, 2.8, 1.4);
    ctx.fillStyle = w.helmetColor;
    ctx.fill();
    // Specular Highlight
    ctx.beginPath();
    ctx.arc(-2, -33, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // --------------------------------------------------------------------------
  // MINIATURE HANDCRAFTED STAGE PROPS
  // Wooden step ladder, thread spool, brass guide pins, and dust sparkles
  // --------------------------------------------------------------------------
  function drawMiniatureStageProps() {
    ctx.save();

    // 1. Miniature Wooden Step Ladder near letter 'L' (x: 510, y: 310 to 465)
    ctx.save();
    ctx.translate(508, 318);
    ctx.rotate(0.1);
    // Ladder floor shadow
    ctx.fillStyle = 'rgba(25, 20, 15, 0.12)';
    ctx.fillRect(8, 12, 24, 150);
    // Ladder rails
    ctx.fillStyle = '#A16207';
    ctx.fillRect(0, 0, 5, 155);
    ctx.fillRect(22, 0, 5, 155);
    // Ladder rungs
    ctx.fillStyle = '#CA8A04';
    for (let r = 20; r < 150; r += 26) {
      ctx.fillRect(0, r, 27, 4);
    }
    ctx.restore();

    // 2. Miniature Rope Spool on the right (x: 1240, y: 465)
    ctx.save();
    ctx.translate(1240, 465);
    // Spool ground shadow
    ctx.beginPath();
    ctx.ellipse(0, 18, 28, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(25, 20, 15, 0.2)';
    ctx.fill();
    // Back wooden flange
    ctx.fillStyle = '#78350F';
    ctx.beginPath();
    ctx.ellipse(0, 0, 24, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    // Wound colorful rope cylinder
    ctx.fillStyle = '#EC4899';
    ctx.fillRect(-16, -14, 32, 28);
    // Helical rope coils on spool
    ctx.strokeStyle = '#FCE7F3';
    ctx.lineWidth = 2.5;
    for (let c = -12; c <= 12; c += 5) {
      ctx.beginPath();
      ctx.moveTo(-16, c);
      ctx.lineTo(16, c + 2);
      ctx.stroke();
    }
    // Front wooden flange
    ctx.fillStyle = '#92400E';
    ctx.beginPath();
    ctx.ellipse(0, 2, 22, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    // Center axle peg
    ctx.fillStyle = '#451A03';
    ctx.beginPath();
    ctx.arc(0, 2, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Brass Floor Guide Pins / Pegs
    const pinCoords = [
      { x: 250, y: 462 },
      { x: 330, y: 462 },
      { x: 590, y: 462 },
      { x: 680, y: 462 },
      { x: 805, y: 462 },
      { x: 1000, y: 462 },
      { x: 1105, y: 462 }
    ];
    pinCoords.forEach((p) => {
      ctx.fillStyle = 'rgba(25, 20, 15, 0.25)';
      ctx.beginPath();
      ctx.ellipse(p.x + 3, p.y + 4, 4, 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#D97706';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FEF3C7';
      ctx.beginPath();
      ctx.arc(p.x - 1, p.y - 1, 1.2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  function updateAndDrawParticles() {
    for (let i = craftParticles.length - 1; i >= 0; i--) {
      const p = craftParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.vx *= 0.96;
      p.alpha -= 0.025;

      if (p.alpha <= 0) {
        craftParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // MAIN ANIMATION LOOP & PHYSICS UPDATE
  // --------------------------------------------------------------------------
  const startTime = performance.now();

  function animate() {
    const elapsedSec = (performance.now() - startTime) / 1000;

    // Smooth camera tilt tracking
    curTiltX += (mouseTiltX - curTiltX) * 0.08;
    curTiltY += (mouseTiltY - curTiltY) * 0.08;

    // High-DPI Clear Entire Bitmap
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.scale(dpr, dpr);
    // Subtle 3D perspective shift on canvas
    ctx.translate(curTiltX * 12, curTiltY * 10);

    // Update Progress Telemetry
    const buildProgress = Math.min(100, Math.round((elapsedSec / 6.4) * 100));
    if (progressBar) progressBar.style.width = `${buildProgress}%`;

    // 1. Update letter nodes physics & construction triggers
    letters.forEach((letter) => {
      const isTriggered = elapsedSec >= letter.startSec;
      const t = Math.max(0, Math.min(1, (elapsedSec - letter.startSec) / (letter.endSec - letter.startSec)));

      if (isTriggered) {
        letter.nodes.forEach((node, nIdx) => {
          // Elastic spring interpolation with slight progressive delay per node
          const nodeDelay = nIdx * 0.06;
          const localT = Math.max(0, Math.min(1, (t - nodeDelay) / (1 - nodeDelay)));

          // Spring easing formula
          const easeSpring = localT >= 1 ? 1 : 1 - Math.pow(2, -10 * localT) * Math.cos((localT * 10 - 0.75) * ((2 * Math.PI) / 3));

          // Interpolate position
          node.x = node.x + (node.tx - node.x) * 0.16 * easeSpring;
          node.y = node.y + (node.ty - node.y) * 0.16 * easeSpring;

          // Micro breathing idle when locked
          if (localT >= 1) {
            node.y = node.ty + Math.sin(elapsedSec * 2.5 + nIdx) * 1.2;
          }
        });

        if (t >= 1 && !letter.poppedSparkles) {
          letter.built = true;
          letter.poppedSparkles = true;
          const node = letter.nodes[0] || letter.nodes[1];
          if (node) {
            spawnCraftSparkles(node.tx, node.ty, letter.color);
          }
        }
      }
    });

    // 2. Render Miniature Stage Props (Ladder, Spool, Guide Pins)
    drawMiniatureStageProps();

    // 3. Render all 7 Rope Letter Segments in depth order
    letters.forEach((letter) => {
      const splinePts = getSplinePoints(letter.nodes, 12);
      drawPhysicalRope(splinePts, letter.color, letter.accentColor);
    });

    // 4. Render Tiny 3D Worker Humanoids
    workers.forEach((w) => {
      drawWorker(w, elapsedSec);
    });

    // 5. Render Craft Dust & Sparkle Particles
    updateAndDrawParticles();

    ctx.restore();

    // Check completion state
    if (elapsedSec >= 6.4 && !isSequenceFinished) {
      isSequenceFinished = true;
      overlay.classList.add('step-hold');
      if (progressBar) progressBar.style.width = '100%';
      // CRITICAL: DO NOT AUTOMATICALLY ENTER!
      // The miniature world stays alive and WAITS for keyboard entry.
    }

    if (!isExiting) {
      animFrameId = requestAnimationFrame(animate);
    }
  }

  // --------------------------------------------------------------------------
  // USER ENTRY & KEYBOARD CONTROLS (ENTER, SPACE, ESCAPE, TAB)
  // --------------------------------------------------------------------------
  function exitIntro() {
    if (isExiting) return;
    isExiting = true;

    if (animFrameId) cancelAnimationFrame(animFrameId);
    window.removeEventListener('keydown', handleKeyDown);

    overlay.classList.add('cwe-exiting');

    setTimeout(() => {
      overlay.classList.remove('cwe-exiting');
      overlay.classList.add('cwe-hidden');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('cwe-active');

      if (typeof setupScrollReveal === 'function') {
        window.dispatchEvent(new Event('scroll'));
      }
    }, 900);
  }

  function handleKeyDown(e) {
    if (isExiting) return;
    const key = e.key;
    if (key === 'Enter' || key === ' ' || e.code === 'Space' || key === 'Escape' || key === 'Tab') {
      e.preventDefault();
      exitIntro();
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  // Click controls
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      exitIntro();
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      exitIntro();
    });
  }

  // Clicking canvas or stage once built also triggers entry
  overlay.addEventListener('click', (e) => {
    if (isSequenceFinished && e.target !== skipBtn && !skipBtn?.contains(e.target)) {
      exitIntro();
    }
  });

  // Mouse Parallax across the miniature stage
  overlay.addEventListener('pointermove', (e) => {
    if (isExiting) return;
    const w = window.innerWidth || 1000;
    const h = window.innerHeight || 800;
    mouseTiltX = (e.clientX - w / 2) / (w / 2);
    mouseTiltY = (e.clientY - h / 2) / (h / 2);
  });

  // Start the 60fps miniature world simulation
  animate();
}








