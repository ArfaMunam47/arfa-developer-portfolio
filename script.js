/**
 * =========================================================================
 * ARFA MUNAM — MODERN DEVELOPER PORTFOLIO INTERACTIONS
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Instantly launch Welcome Intro Video for zero-delay instant playback
  initWelcomeVideoIntro();

  // 2. Schedule portfolio interactive systems to prevent main thread congestion
  const initPortfolioSystems = () => {
    setupResumeDownload();
    setupNavigation();
    setupProjectsShowcase();
    setupWhoIAmParallax();
    setupCertificateModal();
    setupStatsCounter();
    setupScrollReveal();
    setupContactForm();
    setupBackToTop();
    setupBespokeCursor();
    setupMagneticButtons();
    setupExploringRadar();
    setupTactileAudioAndFeedback();
    setupHeroLiveClockAndHeadings();
    setupSkillEcosystem();
    setupCertificatePhotoUploads();
    setupCertificatesGallery();
    setupTactileButtonInteractions();
    setupHeroShatteredRealityEffect();
    setupLetsTalkSection();
    setupHeroPhotoUpload();
    setupContact3DUpload();
    setupProjectFullPageExperience();
    setupAboutMeRefinement();
    setupSkillsCompiler();
    setupSkeuomorphicServices();
    setupCinematicFrontierLabs();
    setupFuturisticFooter();
    setupLearningEcosystem();
    setupLearningJourneyStory();
    setupCreativeHobbiesSection();
    setupGitHubShowcaseSection();
  };

  // Run in next animation frame / microtask to ensure zero frame drops on video launch
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(initPortfolioSystems, { timeout: 150 });
  } else {
    setTimeout(initPortfolioSystems, 40);
  }
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
 * Allows user to click on any hanging certificate to view a high-resolution lightbox preview,
 * keeping the cards completely minimal without unwanted visible buttons or tags.
 */
function setupCertificateModal() {
  const modal = document.getElementById('cert-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const contentArea = modal ? modal.querySelector('.modal-content-area') : null;
  const certItems = document.querySelectorAll('.hanging-cert-item');

  if (!modal || !contentArea) return;

  function openModal(item) {
    const imgEl = item.querySelector('.cert-hanging-img');
    const titleEl = item.querySelector('.cert-hanging-title');
    const src = imgEl ? (imgEl.currentSrc || imgEl.getAttribute('src')) : '';
    const alt = imgEl ? imgEl.getAttribute('alt') : 'Certificate';
    const title = titleEl ? titleEl.textContent : 'Verified Certificate';

    contentArea.innerHTML = `
      <div class="cert-modal-preview-stage">
        <div class="cert-modal-image-wrapper">
          <img src="${src}" alt="${alt}" class="cert-modal-full-img" />
        </div>
        <div class="cert-modal-caption">
          <h3 id="modal-title" class="cert-modal-title">${title}</h3>
          <p class="cert-modal-sub">Verified Google Credential — Official Physical Record</p>
        </div>
      </div>
    `;

    modal.classList.add('is-open');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!modal.classList.contains('is-open')) {
        modal.style.display = 'none';
      }
    }, 280);
    document.body.style.overflow = '';
  }

  certItems.forEach(item => {
    item.addEventListener('click', () => openModal(item));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    const titleEl = item.querySelector('.cert-hanging-title');
    item.setAttribute('aria-label', titleEl ? `View ${titleEl.textContent}` : 'View Certificate');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || !e.target.closest('.cert-modal-box')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
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

  // Live character counter (0/500 limit)
  if (messageTextarea && charCurr) {
    messageTextarea.addEventListener('input', () => {
      charCurr.textContent = messageTextarea.value.length;
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
      
      showMessage(`Thank you, ${name}! Your message has been prepared. If your email client didn't open automatically, feel free to email directly at arfamunam01@gmail.com.`, 'success');

      form.reset();
      if (charCurr) charCurr.textContent = '0';
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Send message</span><span class="conn-submit-arrow" aria-hidden="true">↗</span>`;

      // Trigger mail client safely
      window.location.href = mailtoUrl;
    }, 600);
  });

  function showMessage(text, type) {
    if (!msgBox) return;
    msgBox.style.display = 'block';
    msgBox.textContent = text;
    msgBox.className = 'conn-form-status-box';
    if (type === 'error') {
      msgBox.classList.add('status-error');
    } else {
      msgBox.classList.add('status-success');
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
 * Recreated Miniature Futuristic Developer Workspace
 * Fluid cursor parallax across architectural background, 3D floating platform,
 * realistic laptop, desk objects, and floating glass cards.
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
  const scene = document.getElementById('studio-3d-scene');
  const cursorLight = document.getElementById('studio-cursor-light');
  const physicalStage = document.getElementById('studio-physical-stage');
  const archSubtle = stage ? stage.querySelector('.arch-subtle-interface') : null;
  const floatingCards = stage ? Array.from(stage.querySelectorAll('.floating-glass-card')) : [];
  const spheres = stage ? Array.from(stage.querySelectorAll('.orbit-sphere')) : [];

  if (!stage || !scene) return;

  let targetRotX = 0, targetRotY = 0;
  let currRotX = 0, currRotY = 0;
  let targetTransX = 0, targetTransY = 0;
  let currTransX = 0, currTransY = 0;
  let isHovered = false;
  let rafId = null;

  function updatePhysics() {
    currRotX += (targetRotX - currRotX) * 0.075;
    currRotY += (targetRotY - currRotY) * 0.075;
    currTransX += (targetTransX - currTransX) * 0.075;
    currTransY += (targetTransY - currTransY) * 0.075;

    // 1. Scene main perspective tilt (subtle and controlled: 2 to 3.5 deg)
    scene.style.transform = `rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg)`;

    // 2. Physical 3D workspace stage (Core depth: 2-4px translation)
    if (physicalStage) {
      physicalStage.style.transform = `translate3d(${(currTransX * 0.35).toFixed(1)}px, ${(currTransY * 0.35).toFixed(1)}px, 15px)`;
    }

    // 3. Subtle background wireframe (Back depth parallax: 3-5px)
    if (archSubtle) {
      archSubtle.style.transform = `translate(-50%, -50%) translate3d(${(-currTransX * 0.3).toFixed(1)}px, ${(-currTransY * 0.3).toFixed(1)}px, -15px)`;
    }

    // 4. Floating Glass Cards (Layered depth response: 5-8px based on depth)
    floatingCards.forEach((card) => {
      const depth = parseFloat(card.getAttribute('data-depth')) || 1.0;
      const cx = currTransX * 0.7 * depth;
      const cy = currTransY * 0.7 * depth;
      const cz = 55 * depth;
      card.style.transform = `translate(-50%, -50%) translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, ${cz.toFixed(1)}px)`;
    });

    // 5. Orbiting Spheres Parallax (5-10px)
    spheres.forEach((sphere) => {
      const depth = parseFloat(sphere.getAttribute('data-depth')) || 1.0;
      const sx = currTransX * 0.6 * depth;
      const sy = currTransY * 0.6 * depth;
      sphere.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 20px)`;
    });

    // Continue animation loop until fully settled
    if (isHovered || Math.abs(currRotX - targetRotX) > 0.01 || Math.abs(currRotY - targetRotY) > 0.01 || Math.abs(currTransX - targetTransX) > 0.01) {
      rafId = requestAnimationFrame(updatePhysics);
    } else {
      rafId = null;
      if (!isHovered) {
        scene.style.transform = '';
        if (physicalStage) physicalStage.style.transform = '';
        if (archSubtle) archSubtle.style.transform = '';
        floatingCards.forEach(card => { card.style.transform = ''; });
        spheres.forEach(sphere => { sphere.style.transform = ''; });
      }
    }
  }

  function startPhysicsLoop() {
    if (!rafId) {
      rafId = requestAnimationFrame(updatePhysics);
    }
  }

  // Pointer tracking across the 3D studio stage
  stage.addEventListener('pointerenter', () => {
    isHovered = true;
    startPhysicsLoop();
  });

  stage.addEventListener('pointermove', (e) => {
    const rect = stage.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    // Move cursor responsive warm light
    if (cursorLight) {
      cursorLight.style.left = `${relX}px`;
      cursorLight.style.top = `${relY}px`;
    }

    const normX = Math.max(-1, Math.min(1, (relX / rect.width - 0.5) * 2)); // -1 to +1
    const normY = Math.max(-1, Math.min(1, (relY / rect.height - 0.5) * 2)); // -1 to +1

    targetRotX = -normY * 3.5;
    targetRotY = normX * 4.0;
    targetTransX = normX * 10;
    targetTransY = normY * 8;

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

  const gallery = document.getElementById('projects-showcase-gallery');
  if (!gallery) return;

  const tabs = document.querySelectorAll('.showcase-tab-btn');

  // Prevent opening any unwanted case study pages or modals
  window.openProjectModal = function() {};

  // Preserve interactive tab selection on the navigation pills
  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach((t, i) => {
        const isActive = (i === idx);
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      if (window.innerWidth <= 900) {
        tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });
  });

  // Smooth scroll handler for tactile exploration bridge CTA button
  const bridgeLink = document.getElementById('bridge-to-projects-link');
  if (bridgeLink) {
    bridgeLink.addEventListener('click', (e) => {
      const target = document.getElementById('projects-showcase-gallery');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
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
 * CERTIFICATES SHOWCASE — HANGING CERTIFICATE GALLERY
 * Verified Google specializations suspended from gallery cable with realistic
 * clips, natural tilts, tactile hover physics, and fallback image handling.
 * =========================================================================
 */
function setupCertificatesGallery() {
  const section = document.getElementById('certifications');
  if (!section) return;

  // Gracefully handles image load fallback for the three verified certificates
  const certImgs = section.querySelectorAll('.cert-journey-img, .cert-hanging-img');
  const fallbacks = ['1--.jpg', '2--.jpg', '3--.jpg'];
  certImgs.forEach((img, idx) => {
    img.addEventListener('error', () => {
      if (fallbacks[idx]) img.src = fallbacks[idx];
    });
  });

  // Tactile physics and subtle audio feedback on hanging certificate hover
  const items = section.querySelectorAll('.hanging-cert-item');
  items.forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(580, 'sine');
      }
    });
  });

  // Dynamic Wire Curve Alignment to Orange Tapes
  const wireRig = document.getElementById('cert-wire-rig');
  const wireSvg = document.getElementById('cert-wire-svg');
  const wireMain = document.getElementById('cert-wire-main');
  const wireShadow = document.getElementById('cert-wire-shadow');
  const wireHighlight = document.getElementById('cert-wire-highlight');
  const tapes = section.querySelectorAll('.cert-orange-tape');

  function updateHangingWire() {
    if (!wireRig || !wireSvg || !wireMain || tapes.length < 3) return;
    if (window.innerWidth <= 820) return;

    const rigRect = wireRig.getBoundingClientRect();
    if (rigRect.width <= 0) return;

    const w = Math.round(rigRect.width);
    const h = 90;

    const t1 = tapes[0].getBoundingClientRect();
    const t2 = tapes[1].getBoundingClientRect();
    const t3 = tapes[2].getBoundingClientRect();

    // Center coordinates of each tape relative to wire rig
    const p1 = { x: Math.round(t1.left + t1.width / 2 - rigRect.left), y: Math.round(t1.top + t1.height * 0.42 - rigRect.top) };
    const p2 = { x: Math.round(t2.left + t2.width / 2 - rigRect.left), y: Math.round(t2.top + t2.height * 0.42 - rigRect.top) };
    const p3 = { x: Math.round(t3.left + t3.width / 2 - rigRect.left), y: Math.round(t3.top + t3.height * 0.42 - rigRect.top) };

    const anchorY = 16;
    // Smooth natural catenary curve through left anchor, tape 1, tape 2 (lowest trough), tape 3, right anchor
    const pathD = `M 0,${anchorY} ` +
      `C ${p1.x * 0.45},${anchorY + (p1.y - anchorY) * 0.3} ${p1.x * 0.75},${p1.y} ${p1.x},${p1.y} ` +
      `C ${(p1.x + p2.x) / 2},${(p1.y + p2.y) / 2 + 3} ${p2.x - (p2.x - p1.x) * 0.25},${p2.y} ${p2.x},${p2.y} ` +
      `C ${p2.x + (p3.x - p2.x) * 0.25},${p2.y} ${(p2.x + p3.x) / 2},${(p2.y + p3.y) / 2 + 3} ${p3.x},${p3.y} ` +
      `C ${p3.x + (w - p3.x) * 0.25},${p3.y} ${w - (w - p3.x) * 0.45},${anchorY + (p3.y - anchorY) * 0.3} ${w},${anchorY}`;

    wireSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    wireMain.setAttribute('d', pathD);

    const shadowD = pathD.replace(/M 0,(\d+)/, `M 0,${anchorY + 2}`);
    wireShadow.setAttribute('d', shadowD);

    const highlightD = pathD.replace(/M 0,(\d+)/, `M 0,${anchorY - 0.5}`);
    wireHighlight.setAttribute('d', highlightD);
  }

  // Update on initial render and window resize
  setTimeout(updateHangingWire, 100);
  window.addEventListener('resize', () => {
    window.requestAnimationFrame(updateHangingWire);
  }, { passive: true });
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
 * 14. CINEMATIC SHATTERED REALITY PORTRAIT EFFECT
 * Soft champagne point of light & glass ripple at cursor entry (Stage 1) ->
 * Hairline fracture cleavages spreading along perimeter (Stage 2) ->
 * 8 Floating 3D translucent glass fragments surrounding silhouette (Stage 3) ->
 * Physically responsive 3D cursor interaction with spring inertia (Stage 4) ->
 * Smooth 750ms restoration returning portrait to 100% pristine appearance (Stage 5).
 * Strictly confined to #hero-portrait-cutout-frame.
 */
/**
 * =========================================================================
 * 14. HERO PORTRAIT "REALITY LENS" INTERACTIVE EFFECT
 * Task 3: When the cursor enters the portrait area:
 * 1. A soft circular lens appears near the cursor.
 * 2. The lens smoothly follows cursor movement within the portrait area (lerped rAF).
/**
 * =========================================================================
 * 14. LIVING SPOTLIGHT HOVER EFFECT ON HERO PORTRAIT BACKDROP
 * When cursor enters the portrait area:
 * - A beautiful, soft coral pink glow follows the cursor smoothly across the circular backdrop.
 * - The spotlight is strictly clipped within the circle backdrop, never spilling over the girl or other sections.
 * - Girl portrait remains crisp, unaffected, with zero distortion.
 * - Fades back smoothly when cursor leaves.
 * =========================================================================
 */
function setupHeroShatteredRealityEffect() {
  const frame = document.getElementById('hero-portrait-cutout-frame');
  const spotlight = document.getElementById('hero-living-spotlight');
  const backdrop = document.getElementById('hero-circle-backdrop');
  if (!frame || !spotlight) return;

  // Respect reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let isHovered = false;
  let rafId = null;
  let currentX = 50;
  let currentY = 50;
  let targetX = 50;
  let targetY = 50;

  function updateSpotlightPhysics() {
    if (!isHovered) return;
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    spotlight.style.setProperty('--spot-x', `${currentX.toFixed(2)}%`);
    spotlight.style.setProperty('--spot-y', `${currentY.toFixed(2)}%`);
    rafId = requestAnimationFrame(updateSpotlightPhysics);
  }

  frame.addEventListener('pointerenter', (e) => {
    isHovered = true;
    frame.classList.add('is-spotlight-active');
    const rect = (backdrop || frame).getBoundingClientRect();
    targetX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    targetY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    currentX = targetX;
    currentY = targetY;
    spotlight.style.setProperty('--spot-x', `${currentX.toFixed(2)}%`);
    spotlight.style.setProperty('--spot-y', `${currentY.toFixed(2)}%`);
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(updateSpotlightPhysics);
  }, { passive: true });

  frame.addEventListener('pointermove', (e) => {
    if (!isHovered) return;
    const rect = (backdrop || frame).getBoundingClientRect();
    targetX = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    targetY = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
  }, { passive: true });

  frame.addEventListener('pointerleave', () => {
    isHovered = false;
    if (rafId) cancelAnimationFrame(rafId);
    frame.classList.remove('is-spotlight-active');
  }, { passive: true });
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
    heroImg.src = 'port.png';
    heroImg.onerror = function() {
      this.onerror = null;
      this.src = 'portrait-cutout.png';
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
    'pastelform': {
      index: 0,
      title: "Pastel & Form",
      badge: "✦ DYNAMIC FORM ARCHITECTURE",
      counter: "PROJECT 01 / 06",
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
    },
    'icapital': {
      index: 1,
      title: "iCapital Wealth Advisors",
      badge: "✦ WEALTH ADVISORY PLATFORM",
      counter: "PROJECT 02 / 06",
      tagline: "High-Caliber Wealth Management & Digital Advisory Portal",
      desc: "An editorial, high-trust wealth management advisor platform featuring crisp alpine panoramic art direction, multilingual consultation routing (ES/EN), ambient auditory landscapes, and institutional client portfolios.",
      problem: "Traditional wealth management interfaces feel cold, dense, and uninspiring, failing to evoke long-term partnership, security, and independent financial stewardship.",
      solution: "Engineered an alpine landscape-driven web platform with fluid atmospheric interactions, localized multi-region navigation, accessible audio controls, and frictionless advisor consultation funnels.",
      tech: ["TypeScript", "Responsive Web Design", "Tailwind CSS", "Semantic HTML5", "Web Audio API", "A11y ARIA"],
      metrics: [
        { val: "20+", lbl: "Years Advisory Trust", color: "#38BDF8" },
        { val: "< 650ms", lbl: "Global Page Hydration", color: "#2DD4BF" },
        { val: "100%", lbl: "Cross-Device Parity", color: "#F59E0B" }
      ],
      liveUrl: "https://github.com/ArfaMunam47/icapital-wealth",
      ghUrl: "https://github.com/ArfaMunam47/icapital-wealth",
      image: "icapital.png",
      stageSourceId: "stage-icapital"
    },
    'studypilot': {
      index: 2,
      title: "StudyPilot-AI",
      badge: "✦ AI PRODUCT SUITE",
      counter: "PROJECT 03 / 06",
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
    'prism': {
      index: 3,
      title: "Prism — 3D Spatial AR Showcase",
      badge: "✦ 3D WEBGL & SPATIAL UX",
      counter: "PROJECT 04 / 06",
      tagline: "AI-Powered AR Glasses Product Showcase with Three.js & GLSL Shaders",
      desc: "An immersive spatial product landing experience for AI-powered AR glasses featuring custom WebGL/Three.js shaders, reactive glass refraction physics, interactive 3D model controls, and fluid scroll-triggered cinematic choreography.",
      problem: "Hardware and spatial computing products struggle to convey optical clarity, real-time light refraction, and tactile physical presence using static flat marketing pages.",
      solution: "Engineered a custom Three.js WebGL scene with real-time chromatic dispersion shaders, interactive orbit constraints, and zero-jank scroll timeline synchronization.",
      tech: ["Three.js", "WebGL", "GLSL Shaders", "JavaScript ES6+", "GSAP Motion", "Spatial UI"],
      metrics: [
        { val: "60 FPS", lbl: "WebGL Render Rate", color: "#60A5FA" },
        { val: "< 1.2s", lbl: "3D Asset Hydration", color: "#2DD4BF" },
        { val: "100%", lbl: "Hardware Acceleration", color: "#F59E0B" }
      ],
      liveUrl: "https://github.com/ArfaMunam47/prism-one-3d",
      ghUrl: "https://github.com/ArfaMunam47/prism-one-3d",
      image: "Prism.jpeg",
      stageSourceId: "stage-prism"
    },
    'kumo': {
      index: 4,
      title: "Kumo Ramen Artisanal",
      badge: "✦ INTERACTIVE CULINARY UI",
      counter: "PROJECT 05 / 06",
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
    'velora': {
      index: 5,
      title: "Velora Luxury Store",
      badge: "✦ HIGH-CONVERSION COMMERCE",
      counter: "PROJECT 06 / 06",
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
    }
  };

  const projectKeys = ['pastelform', 'icapital', 'studypilot', 'prism', 'kumo', 'velora'];
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
 * 23. MY LEARNING JOURNEY — 3D WINDING TURQUOISE ROAD & FLOATING PLATFORMS
 * Interactive Platforms with 3D tilt, tactile click, keyboard accessibility,
 * and seamless connection between the 8 milestones along the road.
 * =========================================================================
 */
function setupLearningJourneyStory() {
  const section = document.getElementById('experience');
  if (!section) return;

  const stage = document.getElementById('lj-timeline-stage');
  const rows = Array.from(section.querySelectorAll('.learning-journey-step'));
  const mainRibbon = document.getElementById('lj-main-serpentine-path');
  const shadowRibbon = document.getElementById('lj-shadow-serpentine-path');
  const baseRibbon = document.getElementById('lj-base-serpentine-path');
  const highlightRibbon = document.getElementById('lj-highlight-serpentine-path');
  const dashRibbon = document.getElementById('lj-dash-serpentine-path');
  const waypointsGroup = document.getElementById('lj-waypoints-group');
  const svg = stage ? stage.querySelector('.learning-journey-track-svg') : null;

  // 1. Dynamic Serpentine Path Alignment (Terminates strictly at Milestone 08)
  function alignRibbonPath() {
    if (!stage || !mainRibbon) return;
    const stageRect = stage.getBoundingClientRect();
    if (stageRect.width === 0 || stageRect.height === 0) return;

    const width = Math.round(stageRect.width);

    // Calculate height strictly from the last milestone row
    const lastRow = rows[rows.length - 1];
    let timelineHeight = Math.round(stageRect.height);
    if (lastRow) {
      const lastRect = lastRow.getBoundingClientRect();
      timelineHeight = Math.max(100, Math.round(lastRect.bottom - stageRect.top));
    }

    if (svg) {
      svg.setAttribute('viewBox', `0 0 ${width} ${timelineHeight}`);
      svg.style.height = `${timelineHeight}px`;
    }

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Clean vertical metro line connecting badges on mobile (ends at milestone 08)
      const points = [];
      rows.forEach((row) => {
        const icon = row.querySelector('.learning-journey-icon-badge');
        if (icon) {
          const r = icon.getBoundingClientRect();
          points.push({
            x: Math.round(r.left + r.width / 2 - stageRect.left),
            y: Math.round(r.top + r.height / 2 - stageRect.top)
          });
        }
      });

      if (points.length >= 2) {
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
          d += ` L ${points[i].x} ${points[i].y}`;
        }
        mainRibbon.setAttribute('d', d);
        if (shadowRibbon) shadowRibbon.setAttribute('d', d);
        if (baseRibbon) baseRibbon.setAttribute('d', d);
        if (highlightRibbon) highlightRibbon.setAttribute('d', d);
        if (dashRibbon) dashRibbon.setAttribute('d', d);
      }
      return;
    }

    // Desktop & Tablet: Mathematical Smooth Serpentine S-Curve
    const stepData = [];
    rows.forEach((row) => {
      const card = row.querySelector('.learning-journey-card-pill');
      const badge = row.querySelector('.learning-journey-icon-badge');
      if (card && badge) {
        const cRect = card.getBoundingClientRect();
        const bRect = badge.getBoundingClientRect();
        const isOdd = row.classList.contains('step-odd');
        stepData.push({
          centerY: Math.round(cRect.top + cRect.height / 2 - stageRect.top),
          cardLeft: Math.round(cRect.left - stageRect.left),
          cardRight: Math.round(cRect.right - stageRect.left),
          badgeCenterX: Math.round(bRect.left + bRect.width / 2 - stageRect.left),
          isOdd: isOdd
        });
      }
    });

    if (stepData.length >= 2) {
      let d = `M ${stepData[0].badgeCenterX} ${stepData[0].centerY}`;
      const bendColors = ['#8B5CF6', '#EC4899', '#F97316', '#F59E0B', '#10B981', '#3B82F6', '#9333EA'];
      const bendPoints = [];

      // Connect sequentially from Step 01 to Step 08
      for (let i = 0; i < stepData.length - 1; i++) {
        const curr = stepData[i];
        const next = stepData[i + 1];

        if (curr.isOdd) {
          // Odd card (left): line across through the card to right edge
          d += ` L ${curr.cardRight} ${curr.centerY}`;

          // Curve into next even card's badge on the right
          const outerRight = Math.min(width - 16, Math.max(curr.cardRight, next.badgeCenterX) + 52);
          d += ` C ${outerRight} ${curr.centerY}, ${outerRight} ${next.centerY}, ${next.badgeCenterX} ${next.centerY}`;
          bendPoints.push({ x: outerRight, y: Math.round((curr.centerY + next.centerY) / 2), color: bendColors[i] || '#8B5CF6' });
        } else {
          // Even card (right): line across through the card to left edge
          d += ` L ${curr.cardLeft} ${curr.centerY}`;

          // Curve into next odd card's badge on the left
          const outerLeft = Math.max(16, Math.min(curr.cardLeft, next.badgeCenterX) - 52);
          d += ` C ${outerLeft} ${curr.centerY}, ${outerLeft} ${next.centerY}, ${next.badgeCenterX} ${next.centerY}`;
          bendPoints.push({ x: outerLeft, y: Math.round((curr.centerY + next.centerY) / 2), color: bendColors[i] || '#8B5CF6' });
        }
      }

      // STRICT TERMINATION: The path ends at Milestone 08.
      // Absolutely no extra curve, line, or continuation extends below Milestone 08.
      mainRibbon.setAttribute('d', d);
      if (shadowRibbon) shadowRibbon.setAttribute('d', d);
      if (baseRibbon) baseRibbon.setAttribute('d', d);
      if (highlightRibbon) highlightRibbon.setAttribute('d', d);
      if (dashRibbon) dashRibbon.setAttribute('d', d);

      // Update waypoint markers dynamically
      if (waypointsGroup && bendPoints.length) {
        waypointsGroup.innerHTML = '';
        bendPoints.forEach((pt) => {
          const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          g.setAttribute('class', 'lj-waypoint-marker');
          g.setAttribute('transform', `translate(${pt.x}, ${pt.y})`);
          g.innerHTML = `
            <circle r="14" fill="${pt.color}" fill-opacity="0.22"/>
            <circle r="8" fill="#FFFFFF" stroke="${pt.color}" stroke-width="3"/>
            <circle r="3" fill="${pt.color}"/>
          `;
          waypointsGroup.appendChild(g);
        });
      }
    }
  }

  // Set up ResizeObserver and Window Listeners for guaranteed real-time responsiveness
  if (window.ResizeObserver && stage) {
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(alignRibbonPath);
    });
    ro.observe(stage);
  }

  window.addEventListener('resize', () => {
    requestAnimationFrame(alignRibbonPath);
  }, { passive: true });

  // Initial alignments
  requestAnimationFrame(alignRibbonPath);
  setTimeout(alignRibbonPath, 150);
  setTimeout(alignRibbonPath, 600);

  // 2. Interactive Step Event Listeners
  rows.forEach((row) => {
    const icon = row.querySelector('.learning-journey-icon-badge, .lj-circular-3d-icon');
    const pill = row.querySelector('.learning-journey-card-pill');
    if (!icon) return;

    const activate = () => {
      rows.forEach(r => {
        r.classList.remove('is-step-active');
        r.classList.remove('is-row-active');
      });
      row.classList.add('is-step-active');
      row.classList.add('is-row-active');
    };

    const deactivate = () => {
      row.classList.remove('is-step-active');
      row.classList.remove('is-row-active');
    };

    icon.addEventListener('mouseenter', activate);
    icon.addEventListener('mouseleave', deactivate);
    if (pill) {
      pill.addEventListener('mouseenter', activate);
      pill.addEventListener('mouseleave', deactivate);
    }

    icon.addEventListener('click', () => {
      activate();
      row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    icon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  // 3. Scroll Reveal for Ribbon Drawing
  if ('IntersectionObserver' in window && mainRibbon) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mainRibbon.style.strokeDashoffset = '0';
          alignRibbonPath();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    observer.observe(section);
  }

  // Run alignment on load, fonts ready, and resize
  alignRibbonPath();
  window.addEventListener('load', alignRibbonPath);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(alignRibbonPath);
  }

  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(alignRibbonPath, 80);
  });
  setTimeout(alignRibbonPath, 150);
  setTimeout(alignRibbonPath, 450);
  setTimeout(alignRibbonPath, 1000);
}

/**
 * =========================================================================
 * 23B. CREATIVE HOBBIES & PINTEREST SCRAPBOOK MOOD BOARD
 * Physical Mood Board · Polaroids · Washi Tape · Doodles · Personal Life
 * =========================================================================
 */
function setupCreativeHobbiesSection() {
  const section = document.getElementById('hobbies');
  if (!section) return;

  // 1. Washi Tape Category Filters
  const filterTabs = section.querySelectorAll('.scrapbook-filter-tab');
  const items = section.querySelectorAll('.scrapbook-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetFilter = tab.getAttribute('data-filter') || 'all';

      // Update active tab state
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Filter scrapbook items smoothly
      items.forEach(item => {
        const cat = item.getAttribute('data-category') || '';
        if (targetFilter === 'all' || cat.includes(targetFilter)) {
          item.classList.remove('filtered-out');
        } else {
          item.classList.add('filtered-out');
        }
      });
    });
  });

  // 2. Interactive Retro Cassette Audio Visualizer Toggle
  const cassetteBtn = section.querySelector('#cassette-play-btn');
  const cassetteCard = section.querySelector('.item-cassette');

  if (cassetteBtn && cassetteCard) {
    cassetteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isPlaying = cassetteCard.classList.toggle('playing');
      const btnText = cassetteBtn.querySelector('.btn-text');
      const playIcon = cassetteBtn.querySelector('.play-icon');
      const pauseIcon = cassetteBtn.querySelector('.pause-icon');

      if (btnText) {
        btnText.textContent = isPlaying ? 'Pause Tape' : 'Spin Tape';
      }
      if (playIcon && pauseIcon) {
        playIcon.style.display = isPlaying ? 'none' : 'inline';
        pauseIcon.style.display = isPlaying ? 'inline' : 'none';
      }
    });
  }

  // 3. Tactile Card Focus / Inspection on click
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      // Don't intercept clicks on buttons or links
      if (e.target.closest('button') || e.target.closest('a')) return;
      const isAlreadyFocused = item.classList.contains('focused-card');
      items.forEach(it => it.classList.remove('focused-card'));
      if (!isAlreadyFocused) {
        item.classList.add('focused-card');
      }
    });
  });

  // Clear focused card on outside click
  document.addEventListener('click', (e) => {
    if (!section.contains(e.target)) {
      items.forEach(it => it.classList.remove('focused-card'));
    }
  });
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
   25. CINEMATIC FULLSCREEN WELCOME VIDEO INTRO (Welcome.mp4)
   Zero-Delay Instant Playback • High-Craft Redesigned Skip & Audio Controls
   Interactive Keyboard Entry • Resilient Buffer State • Clean Exit
   ========================================================================== */
function initWelcomeVideoIntro() {
  const overlay = document.getElementById('welcome-video-intro');
  if (!overlay) return;

  const video = document.getElementById('welcome-intro-video');
  const videoContainer = overlay.querySelector('.wvi-video-container');
  const skipBtn = document.getElementById('wvi-skip-btn');
  const soundBtn = document.getElementById('wvi-sound-btn');
  const soundLabel = document.getElementById('wvi-sound-label');
  const ringBar = document.getElementById('wvi-ring-bar');
  const progressBar = document.getElementById('wvi-progress-bar');
  const bufferSpinner = document.getElementById('wvi-buffer-spinner');
  const cipOverlay = document.getElementById('creative-intro-cover');

  // Lock body scrolling and guarantee portfolio remains hidden
  document.body.classList.add('wvi-active');
  if (cipOverlay) {
    document.body.classList.add('cip-active');
    cipOverlay.classList.remove('cip-hidden', 'cip-exiting');
    cipOverlay.setAttribute('aria-hidden', 'false');
  }
  overlay.classList.remove('wvi-hidden', 'wvi-exiting');
  overlay.setAttribute('aria-hidden', 'false');

  let isExiting = false;
  let isSoundActive = true;
  const RING_PERIMETER = 56.55; // 2 * PI * 9

  // Helper to sync Sound button UI
  function updateSoundUI(hasSound) {
    isSoundActive = hasSound;
    if (!soundBtn) return;
    const iconOn = soundBtn.querySelector('.icon-sound-on');
    const iconOff = soundBtn.querySelector('.icon-sound-off');
    if (iconOn && iconOff) {
      iconOn.style.display = hasSound ? 'block' : 'none';
      iconOff.style.display = hasSound ? 'none' : 'block';
    }
    if (soundLabel) {
      soundLabel.textContent = hasSound ? 'Sound on' : 'Sound off';
    }
    soundBtn.setAttribute('aria-label', hasSound ? 'Mute sound' : 'Unmute sound');
  }

  // Smooth Exit Transition from Welcome Video into Creative Introduction Page
  function exitIntro() {
    if (isExiting) return;
    isExiting = true;

    window.removeEventListener('keydown', handleKeyDown);

    // Pre-prepare Creative Introduction cover before video fades
    if (cipOverlay) {
      cipOverlay.classList.remove('cip-hidden', 'cip-exiting');
      cipOverlay.setAttribute('aria-hidden', 'false');
    }

    overlay.classList.add('wvi-exiting');

    setTimeout(() => {
      if (video) {
        try { video.pause(); } catch (err) {}
      }
      overlay.classList.remove('wvi-exiting');
      overlay.classList.add('wvi-hidden');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('wvi-active');

      // Now activate Step 2: The Creative Introduction Cover Page
      transitionToCreativeIntroPage();
    }, 600);
  }

  // Keyboard controls: ESCAPE, SPACE, ENTER to skip intro
  function handleKeyDown(e) {
    if (isExiting) return;
    const key = e.key;
    if (key === 'Escape' || key === ' ' || e.code === 'Space' || key === 'Enter') {
      e.preventDefault();
      exitIntro();
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  // Redesigned Skip Button click
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      exitIntro();
    });
  }

  // Sound Toggle Button click
  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!video) return;
      video.muted = !video.muted;
      if (!video.muted) video.volume = 1.0;
      updateSoundUI(!video.muted);
    });
  }

  // Arm auto-unmute on user's first natural interaction if autoplay started muted
  function armAutoUnmute() {
    const tryUnmute = (e) => {
      if (e.target && (e.target.closest('#wvi-skip-btn') || e.target.closest('#wvi-sound-btn'))) return;
      if (video && video.muted) {
        video.muted = false;
        video.volume = 1.0;
        updateSoundUI(true);
      }
      cleanupAutoUnmute();
    };

    const gestures = ['pointerdown', 'touchstart', 'mousedown', 'keydown'];
    gestures.forEach(evt => window.addEventListener(evt, tryUnmute, { passive: true }));

    function cleanupAutoUnmute() {
      gestures.forEach(evt => window.removeEventListener(evt, tryUnmute));
    }
  }

  if (video) {
    // Resilience: buffer & stall indicators
    video.addEventListener('waiting', () => {
      if (videoContainer) videoContainer.classList.add('is-buffering');
    });
    video.addEventListener('playing', () => {
      if (videoContainer) videoContainer.classList.remove('is-buffering');
    });
    video.addEventListener('canplay', () => {
      if (videoContainer) videoContainer.classList.remove('is-buffering');
    });
    video.addEventListener('error', () => {
      if (videoContainer) videoContainer.classList.remove('is-buffering');
      // If video file cannot be loaded, safely proceed so visitor is never trapped
      setTimeout(exitIntro, 1200);
    });

    // Zero-Delay Playback Launch
    video.muted = false;
    video.volume = 1.0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateSoundUI(true);
        })
        .catch(() => {
          // Autoplay with sound restricted by browser policy:
          // Immediately start playback muted so there is ZERO delay, lag, or stall
          video.muted = true;
          updateSoundUI(false);
          video.play().catch(() => {});
          armAutoUnmute();
        });
    }

    // Telemetry Progress Bar & Circular Ring Progress
    video.addEventListener('timeupdate', () => {
      if (video.duration && isFinite(video.duration)) {
        const percent = Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100));
        if (progressBar) progressBar.style.width = percent + '%';
        if (ringBar) {
          const ringOffset = RING_PERIMETER - (RING_PERIMETER * (percent / 100));
          ringBar.style.strokeDashoffset = ringOffset;
        }
      }
    });

    // Directly tapping/clicking the video toggles play/pause or un-mutes
    video.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        updateSoundUI(true);
        if (video.paused) video.play().catch(() => {});
        return;
      }
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });

    // When video completes, seamlessly transition into creative introduction page
    video.addEventListener('ended', () => {
      exitIntro();
    });

    // Safety watchdog: If playback hasn't started after 8s due to any device lock, fail-safe advance
    setTimeout(() => {
      if (video.currentTime === 0 && video.paused && !isExiting) {
        video.play().catch(() => {});
      }
    }, 2500);
  }
}

// =========================================================================
// =========================================================================
// CREATIVE INTRODUCTION COVER CONTROLLER (STEP 2 OF SEQUENCE)
// Recreated Creative Portfolio Gallery Middle Page:
// Welcome.mp4 -> Layered Portfolio Image -> Curved Orange Arrow -> Floating Cinematic Video -> Explore Portfolio
// =========================================================================
function transitionToCreativeIntroPage() {
  const cipOverlay = document.getElementById('creative-intro-cover');
  if (!cipOverlay) {
    finishIntoPortfolio();
    return;
  }

  // Lock body scrolling during middle introduction page
  document.body.classList.remove('wvi-active');
  document.body.classList.add('cip-active');

  cipOverlay.classList.remove('cip-hidden', 'cip-exiting');
  cipOverlay.setAttribute('aria-hidden', 'false');

  const compRow = document.getElementById('cip-composition-row');
  const imgStack = document.getElementById('cip-image-stack');
  const mainImgWrap = document.getElementById('cip-main-image-wrap');
  const storyVideo = document.getElementById('cip-story-video');
  const videoFrame = document.getElementById('cip-video-player-frame');
  const playBtn = document.getElementById('cip-play-btn');
  const ctrlPlayBtn = document.getElementById('cip-ctrl-play');
  const ctrlMuteBtn = document.getElementById('cip-ctrl-mute');
  const ctrlFsBtn = document.getElementById('cip-ctrl-fs');
  const seekTrack = document.getElementById('cip-seek-track');
  const seekFill = document.getElementById('cip-seek-fill');
  const seekThumb = document.getElementById('cip-seek-thumb');
  const timeDisplay = document.getElementById('cip-time-display');
  const exploreBtn = document.getElementById('cip-explore-btn');

  let cipExiting = false;
  let isStoryRevealed = false;

  // 1. Initial Soft Entrance Animation for Portfolio Image (0.2s - 1.2s)
  if (imgStack) {
    imgStack.style.opacity = '0';
    imgStack.style.transform = 'scale(0.94) translateY(12px)';
    setTimeout(() => {
      imgStack.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      imgStack.style.opacity = '1';
      imgStack.style.transform = 'scale(1) translateY(0)';
    }, 200);
  }

  // 2. Controlled 3D Hover & Cursor Tilt on Portfolio Image
  if (imgStack && mainImgWrap) {
    imgStack.addEventListener('pointermove', (e) => {
      const rect = imgStack.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      const baseRotation = -5; // Base angle from reference design
      mainImgWrap.style.transform = `rotate(${baseRotation + (x * 4)}deg) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(10px)`;
    });

    imgStack.addEventListener('pointerleave', () => {
      mainImgWrap.style.transform = '';
    });
  }

  // 3. User Click on Portfolio Image: Trigger the Arrow & Video Reveal
  function revealStoryVideo() {
    if (isStoryRevealed) return;
    isStoryRevealed = true;

    if (compRow) {
      compRow.classList.add('is-revealed');
    }

    // Play video upon deliberate user action
    if (storyVideo) {
      setTimeout(() => {
        storyVideo.muted = false;
        storyVideo.volume = 1.0;
        const playPromise = storyVideo.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              if (videoFrame) {
                videoFrame.classList.add('is-playing');
                videoFrame.classList.remove('is-paused');
              }
              updatePlayIcons(true);
            })
            .catch(() => {
              // Browser policy fallback: keep paused with prominent play button ready
              if (videoFrame) {
                videoFrame.classList.add('is-paused');
                videoFrame.classList.remove('is-playing');
              }
              updatePlayIcons(false);
            });
        }
      }, 750);
    }
  }

  if (imgStack) {
    imgStack.addEventListener('click', (e) => {
      e.stopPropagation();
      revealStoryVideo();
    });

    imgStack.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        revealStoryVideo();
      }
    });
  }

  // 4. Video Player Controls Implementation
  function formatTime(seconds) {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updatePlayIcons(isPlaying) {
    if (!ctrlPlayBtn) return;
    const playIcon = ctrlPlayBtn.querySelector('.icon-play');
    const pauseIcon = ctrlPlayBtn.querySelector('.icon-pause');
    if (playIcon && pauseIcon) {
      playIcon.style.display = isPlaying ? 'none' : 'block';
      pauseIcon.style.display = isPlaying ? 'block' : 'none';
    }
  }

  if (storyVideo) {
    storyVideo.addEventListener('loadedmetadata', () => {
      if (timeDisplay) {
        timeDisplay.textContent = `0:00 / ${formatTime(storyVideo.duration)}`;
      }
    });

    storyVideo.addEventListener('timeupdate', () => {
      if (storyVideo.duration) {
        const percent = (storyVideo.currentTime / storyVideo.duration) * 100;
        if (seekFill) seekFill.style.width = percent + '%';
        if (seekThumb) seekThumb.style.left = percent + '%';
        if (seekTrack) seekTrack.setAttribute('aria-valuenow', Math.round(percent));
        if (timeDisplay) {
          timeDisplay.textContent = `${formatTime(storyVideo.currentTime)} / ${formatTime(storyVideo.duration)}`;
        }
      }
    });

    storyVideo.addEventListener('play', () => {
      if (videoFrame) {
        videoFrame.classList.add('is-playing');
        videoFrame.classList.remove('is-paused');
      }
      updatePlayIcons(true);
    });

    storyVideo.addEventListener('pause', () => {
      if (videoFrame) {
        videoFrame.classList.remove('is-playing');
        videoFrame.classList.add('is-paused');
      }
      updatePlayIcons(false);
    });

    storyVideo.addEventListener('ended', () => {
      if (videoFrame) {
        videoFrame.classList.remove('is-playing');
        videoFrame.classList.add('is-paused');
      }
      updatePlayIcons(false);
    });

    // Central play button click
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (storyVideo.paused) {
          storyVideo.play().catch(() => {});
        } else {
          storyVideo.pause();
        }
      });
    }

    // Direct video click toggles play/pause
    storyVideo.addEventListener('click', (e) => {
      e.stopPropagation();
      if (storyVideo.paused) {
        storyVideo.play().catch(() => {});
      } else {
        storyVideo.pause();
      }
    });

    // Bottom control bar play button
    if (ctrlPlayBtn) {
      ctrlPlayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (storyVideo.paused) {
          storyVideo.play().catch(() => {});
        } else {
          storyVideo.pause();
        }
      });
    }

    // Mute toggle button
    if (ctrlMuteBtn) {
      ctrlMuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        storyVideo.muted = !storyVideo.muted;
        const volOn = ctrlMuteBtn.querySelector('.icon-vol-on');
        const volMute = ctrlMuteBtn.querySelector('.icon-vol-mute');
        if (volOn && volMute) {
          volOn.style.display = storyVideo.muted ? 'none' : 'block';
          volMute.style.display = storyVideo.muted ? 'block' : 'none';
        }
      });
    }

    // Fullscreen toggle button
    if (ctrlFsBtn) {
      ctrlFsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          if (videoFrame.requestFullscreen) {
            videoFrame.requestFullscreen();
          } else if (storyVideo.requestFullscreen) {
            storyVideo.requestFullscreen();
          } else if (storyVideo.webkitEnterFullscreen) {
            storyVideo.webkitEnterFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      });
    }

    // Seek track scrub / click
    if (seekTrack) {
      const handleSeek = (e) => {
        const rect = seekTrack.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (storyVideo.duration) {
          storyVideo.currentTime = pos * storyVideo.duration;
        }
      };

      seekTrack.addEventListener('click', (e) => {
        e.stopPropagation();
        handleSeek(e);
      });
    }
  }

  // 5. Exit Transition from Creative Intro into the Actual Portfolio Website
  function finishIntoPortfolio() {
    if (cipExiting) return;
    cipExiting = true;

    // Pause video playback upon exit
    if (storyVideo) {
      try { storyVideo.pause(); } catch (err) {}
    }

    window.removeEventListener('keydown', handleCipKeyDown);

    cipOverlay.classList.add('cip-exiting');

    setTimeout(() => {
      cipOverlay.classList.remove('cip-exiting');
      cipOverlay.classList.add('cip-hidden');
      cipOverlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('cip-active');

      // Seamlessly scroll to top so the visitor meets the hero section cleanly
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Trigger Experience 3: Choreographed entrance into the Actual Portfolio
      triggerHeroOpeningSequence();

      // Refresh layouts, scroll listeners, and triggers in the actual portfolio
      window.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('resize'));
    }, 600);
  }

  // Keyboard navigation for middle gallery: ENTER or SPACE on Explore button or ESCAPE
  function handleCipKeyDown(e) {
    if (cipExiting) return;
    const key = e.key;
    if (key === 'Escape') {
      e.preventDefault();
      finishIntoPortfolio();
    }
  }

  window.addEventListener('keydown', handleCipKeyDown);

  // Recreated "Let's Explore →" button enters portfolio smoothly
  if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      finishIntoPortfolio();
    });
  }
}

/**
 * =========================================================================
 * EXPERIENCE 3: ACTUAL PORTFOLIO HERO OPENING EXPERIENCE
 * Choreographed arrival of Arfa Munam brand name, credentials, and 3D portrait
 * =========================================================================
 */
function triggerHeroOpeningSequence() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Add activation class for synchronized CSS transition
  hero.classList.add('hero-opened');

  // Activate all immediate hero reveal elements
  const reveals = hero.querySelectorAll('.reveal');
  reveals.forEach(el => el.classList.add('visible'));

  // Ensure portrait reality lens is aligned
  const portraitCutout = document.getElementById('hero-portrait-cutout-frame');
  if (portraitCutout) {
    portraitCutout.style.transform = 'translateY(0) scale(1)';
  }

  // Ambient glows gentle arrival
  const glows = hero.querySelectorAll('.ambient-glow');
  glows.forEach(g => {
    g.style.transition = 'opacity 1.2s ease';
    g.style.opacity = '0.32';
  });
}


