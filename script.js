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

  // 20. Cinematic Exploring Frontier Labs & Telemetry Terminal
  setupCinematicFrontierLabs();

  // 21. Futuristic 2026 3D Dark Glass Footer Interactions
  setupFuturisticFooter();

  // 22. Currently Learning 3D Interactive Ecosystem
  setupLearningEcosystem();
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
 * 2026 3D INTERACTIVE PROJECT GALLERY SHOWCASE ENGINE
 * One Dominant Hero Project • Three Dimensional Secondary Previews
 * Hover-to-Activate Experience • Warm Ivory Background • Full Viewport Width
 * 01 StudyPilot-AI • 02 Velora Store • 03 Kumo Ramen • 04 PastelForm
 * =========================================================================
 */
function setupProjectsShowcase() {
  const section = document.getElementById('projects');
  if (!section) return;

  const heroNumEl = document.getElementById('sc-hero-num');
  const heroCatEl = document.getElementById('sc-hero-category');
  const heroStatusLabel = document.getElementById('sc-hero-status-label');
  const heroTitleEl = document.getElementById('sc-hero-title');
  const heroDescEl = document.getElementById('sc-hero-desc');
  const heroTechRow = document.getElementById('sc-hero-tech-row');
  const heroLiveBtn = document.getElementById('sc-hero-live-btn');
  const heroGhBtn = document.getElementById('sc-hero-github-btn');
  const heroUrlEl = document.getElementById('sc-hero-url');
  const heroTagEl = document.getElementById('sc-hero-tag');
  const heroHalo = document.getElementById('sc-board-halo');
  const heroFrame = document.getElementById('sc-board-frame');
  const heroViewport = document.getElementById('sc-hero-viewport');
  const secondaryList = document.getElementById('sc-secondary-list');
  const indicatorSteps = document.querySelectorAll('#sc-indicator-bar .sc-indicator-step');

  // Exact 4 Projects Data with verified metadata and rich interactive mock UIs
  const projects = [
    {
      idx: 0,
      num: '01',
      title: 'StudyPilot-AI',
      category: 'AI Academic Copilot / Study Workspace',
      desc: 'An intelligent academic workspace designed around learning, study planning, and AI-assisted productivity.',
      tech: ['HTML', 'CSS', 'JavaScript', 'AI', 'Prompt Engineering', 'GSAP'],
      liveUrl: 'https://github.com/ArfaMunam47/StudyPilot-AI',
      ghUrl: 'https://github.com/ArfaMunam47/StudyPilot-AI',
      address: 'studypilot-ai.app/workspace',
      badge: '✦ AI ACTIVE',
      accentColor: '#FA5538',
      glow: 'radial-gradient(circle at center, rgba(250, 85, 56, 0.22) 0%, rgba(255, 138, 101, 0.08) 50%, transparent 70%)',
      renderMiniPreview: () => `
        <div class="mini-studypilot">
          <div class="mini-sp-top">
            <span class="mini-sp-brand">✦ StudyPilot</span>
            <span class="mini-sp-badge">AI Active</span>
          </div>
          <div class="mini-sp-card">
            "Decoder self-attention masking prevents lookahead..."
          </div>
        </div>
      `,
      renderHeroUI: () => `
        <div class="mock-product-layout layout-studypilot">
          <div class="mock-sidebar">
            <div class="mock-brand-badge">
              <span class="brand-spark">✦</span>
              <span>StudyPilot</span>
            </div>
            <div class="mock-nav-items">
              <div class="mock-nav-item active"><span>📊</span> Dashboard</div>
              <div class="mock-nav-item"><span>🎴</span> Flashcards</div>
              <div class="mock-nav-item"><span>🗺️</span> Study Plan</div>
              <div class="mock-nav-item"><span>📈</span> Analytics</div>
            </div>
            <div class="mock-ai-copilot-status">
              <span class="copilot-dot"></span>
              <span>AI Active</span>
            </div>
          </div>
          <div class="mock-main-content">
            <div class="mock-stats-row">
              <div class="mock-stat-tile">
                <span class="mock-stat-label">Retention Rate</span>
                <span class="mock-stat-val text-coral">94.8%</span>
              </div>
              <div class="mock-stat-tile">
                <span class="mock-stat-label">Cards Mastered</span>
                <span class="mock-stat-val text-cyan">148 / 160</span>
              </div>
              <div class="mock-stat-tile">
                <span class="mock-stat-label">Study Streak</span>
                <span class="mock-stat-val text-purple">12 Days</span>
              </div>
            </div>
            <div class="mock-flashcard-stage">
              <div class="flashcard-pill-tag">TOPIC: NEURAL ARCHITECTURES</div>
              <div class="flashcard-question">
                "How does attention masking prevent lookahead leakage in decoder self-attention?"
              </div>
              <div class="flashcard-actions">
                <span class="fc-chip chip-hint">💡 AI Concept Hint</span>
                <span class="fc-chip chip-flip">↻ Tap to Reveal Answer</span>
              </div>
            </div>
            <div class="mock-ai-toast">
              <div class="mock-ai-header">
                <span class="ai-spark">✨</span>
                <span>Gemini 2.5 Flash Synthesizer</span>
              </div>
              <p class="mock-ai-p">
                "Synthesized 8 targeted practice prompts from Chapter 4. Next optimal recall review scheduled for 18:00 today."
              </p>
            </div>
          </div>
        </div>
      `
    },
    {
      idx: 1,
      num: '02',
      title: 'Velora Store',
      category: 'E-commerce / Luxury Catalog',
      desc: 'A premium e-commerce experience focused on elegant product presentation, interactive UI, and modern shopping interactions.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'GSAP'],
      liveUrl: 'https://github.com/ArfaMunam47/Velora-Store',
      ghUrl: 'https://github.com/ArfaMunam47/Velora-Store',
      address: 'velora-luxury.store/catalog',
      badge: '✦ CART: $420',
      accentColor: '#0891B2',
      glow: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.22) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 70%)',
      renderMiniPreview: () => `
        <div class="mini-velora">
          <div class="mini-velora-thumb">⌚</div>
          <div class="mini-velora-info">
            <span class="mini-velora-title">Velora Chrono Noir</span>
            <span class="mini-velora-price">$240.00 · In Stock</span>
          </div>
        </div>
      `,
      renderHeroUI: () => `
        <div class="mock-product-layout layout-velora">
          <div class="mock-sidebar">
            <div class="mock-brand-badge">
              <span class="brand-spark" style="color: #06B6D4;">◆</span>
              <span>Velora Atelier</span>
            </div>
            <div class="mock-nav-items">
              <div class="mock-nav-item active" style="background: #E6FAF8; color: #0F766E;"><span>⌚</span> Chronographs</div>
              <div class="mock-nav-item"><span>👜</span> Leather Goods</div>
              <div class="mock-nav-item"><span>👓</span> Eyewear</div>
              <div class="mock-nav-item"><span>🛍️</span> Cart (2)</div>
            </div>
            <div class="mock-ai-copilot-status" style="color: #0F766E;">
              <span class="copilot-dot" style="background: #0F766E;"></span>
              <span>Express Delivery</span>
            </div>
          </div>
          <div class="mock-main-content">
            <div style="background: #FFFFFF; border-radius: 14px; padding: 1rem; border: 1.5px solid rgba(6, 182, 212, 0.2); box-shadow: 0 4px 14px rgba(6, 182, 212, 0.06); display: flex; gap: 1rem; align-items: center;">
              <div style="width: 76px; height: 76px; border-radius: 12px; background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%); display: flex; align-items: center; justify-content: center; font-size: 2rem; color: #FFFFFF; box-shadow: 0 6px 16px rgba(6, 182, 212, 0.25);">
                ⌚
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.25rem; flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-family: var(--font-hero); font-size: 1.05rem; font-weight: 800; color: #101C35;">Velora Chrono Noir</span>
                  <span style="font-family: var(--font-hero); font-size: 1.05rem; font-weight: 800; color: #0891B2;">$240.00</span>
                </div>
                <span style="font-family: var(--font-sans); font-size: 0.74rem; color: #5A475C;">Sapphire Crystal Glass • Automatic Movement • Water Resistant 5ATM</span>
                <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: #0D9488; background: #E6FAF8; padding: 0.2rem 0.6rem; border-radius: 9999px;">✓ Only 3 Left In Stock</span>
                  <span style="font-size: 0.7rem; font-weight: 800; color: #FFFFFF; background: #0891B2; padding: 0.22rem 0.75rem; border-radius: 9999px; cursor: pointer;">Add to Bag</span>
                </div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem;">
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">Chrono Silver</span>
                <span style="display: block; font-size: 0.68rem; color: #0891B2; font-weight: 800;">$210.00</span>
              </div>
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">Monaco Gold</span>
                <span style="display: block; font-size: 0.68rem; color: #0891B2; font-weight: 800;">$285.00</span>
              </div>
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">Minimalist Slate</span>
                <span style="display: block; font-size: 0.68rem; color: #0891B2; font-weight: 800;">$195.00</span>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      idx: 2,
      num: '03',
      title: 'Kumo Ramen',
      category: 'Food Discovery Experience',
      desc: 'A creative food discovery interface featuring immersive product presentation, 3D-inspired visuals, and interactive menu exploration.',
      tech: ['HTML', 'CSS', 'JavaScript', 'GSAP', '3D UI'],
      liveUrl: 'https://github.com/ArfaMunam47/Kumo-Ramen',
      ghUrl: 'https://github.com/ArfaMunam47/Kumo-Ramen',
      address: 'kumoramen.kyoto/experience',
      badge: '✦ OPEN: 12-11PM',
      accentColor: '#D97706',
      glow: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.22) 0%, rgba(239, 68, 68, 0.08) 50%, transparent 70%)',
      renderMiniPreview: () => `
        <div class="mini-kumo">
          <div class="mini-kumo-bowl">🍜</div>
          <div class="mini-kumo-info">
            <span class="mini-kumo-title">Tonkotsu Black Garlic</span>
            <span class="mini-kumo-broth">18h Simmered Broth</span>
          </div>
        </div>
      `,
      renderHeroUI: () => `
        <div class="mock-product-layout layout-kumo">
          <div class="mock-sidebar">
            <div class="mock-brand-badge">
              <span class="brand-spark" style="color: #F59E0B;">🍜</span>
              <span>雲 Kumo Ramen</span>
            </div>
            <div class="mock-nav-items">
              <div class="mock-nav-item active" style="background: #FEF3C7; color: #92400E;"><span>🍲</span> Signature Bowls</div>
              <div class="mock-nav-item"><span>🏮</span> Table Booking</div>
              <div class="mock-nav-item"><span>🥢</span> Broth Craft</div>
              <div class="mock-nav-item"><span>📍</span> Locations</div>
            </div>
            <div class="mock-ai-copilot-status" style="color: #92400E;">
              <span class="copilot-dot" style="background: #F59E0B;"></span>
              <span>Tables Available</span>
            </div>
          </div>
          <div class="mock-main-content">
            <div style="background: #FFFFFF; border-radius: 14px; padding: 1rem; border: 1.5px solid rgba(245, 158, 11, 0.2); box-shadow: 0 4px 14px rgba(245, 158, 11, 0.06); display: flex; gap: 1rem; align-items: center;">
              <div style="width: 76px; height: 76px; border-radius: 50%; background: radial-gradient(circle, #F59E0B 0%, #B45309 100%); display: flex; align-items: center; justify-content: center; font-size: 2.2rem; color: #FFFFFF; box-shadow: 0 6px 16px rgba(245, 158, 11, 0.25); border: 3px solid #FFFBEB;">
                🍜
              </div>
              <div style="display: flex; flex-direction: column; gap: 0.25rem; flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-family: var(--font-hero); font-size: 1.05rem; font-weight: 800; color: #101C35;">Tonkotsu Black Garlic</span>
                  <span style="font-family: var(--font-hero); font-size: 1.05rem; font-weight: 800; color: #D97706;">$18.50</span>
                </div>
                <span style="font-family: var(--font-sans); font-size: 0.74rem; color: #5A475C;">18h Simmered Broth • Chashu Pork • Ajitsuke Tamago • Mayu Oil</span>
                <div style="display: flex; align-items: center; gap: 0.6rem; margin-top: 0.35rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: #B45309; background: #FEF3C7; padding: 0.2rem 0.6rem; border-radius: 9999px;">Spice: Mild ★★☆☆</span>
                  <span style="font-size: 0.7rem; font-weight: 800; color: #FFFFFF; background: #D97706; padding: 0.22rem 0.75rem; border-radius: 9999px; cursor: pointer;">Book Table</span>
                </div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem;">
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">Spicy Miso</span>
                <span style="display: block; font-size: 0.68rem; color: #D97706; font-weight: 800;">$17.00</span>
              </div>
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">Truffle Shoyu</span>
                <span style="display: block; font-size: 0.68rem; color: #D97706; font-weight: 800;">$19.50</span>
              </div>
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">Yuzu Shio</span>
                <span style="display: block; font-size: 0.68rem; color: #D97706; font-weight: 800;">$16.50</span>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      idx: 3,
      num: '04',
      title: 'PastelForm',
      category: 'Smart Form Builder',
      desc: 'A modern form-building interface focused on visual simplicity, flexible components, and an interactive creation experience.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'UI/UX'],
      liveUrl: 'https://github.com/ArfaMunam47/PastelForm',
      ghUrl: 'https://github.com/ArfaMunam47/PastelForm',
      address: 'pastelform.design/canvas',
      badge: '✦ WCAG AAA',
      accentColor: '#7C3AED',
      glow: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.22) 0%, rgba(236, 72, 153, 0.08) 50%, transparent 70%)',
      renderMiniPreview: () => `
        <div class="mini-pastel">
          <div class="mini-pastel-top">
            <span class="mini-pastel-brand">✦ PastelForm</span>
            <div class="mini-pastel-swatches">
              <span class="mini-pastel-swatch swatch-coral"></span>
              <span class="mini-pastel-swatch swatch-mint"></span>
              <span class="mini-pastel-swatch swatch-violet"></span>
            </div>
          </div>
          <div class="mini-sp-card" style="color: #6B21A8; border-color: rgba(139, 92, 246, 0.2);">
            Input: [Full Name] + Toggle [Active]
          </div>
        </div>
      `,
      renderHeroUI: () => `
        <div class="mock-product-layout layout-pastel">
          <div class="mock-sidebar">
            <div class="mock-brand-badge">
              <span class="brand-spark" style="color: #8B5CF6;">✦</span>
              <span>PastelForm</span>
            </div>
            <div class="mock-nav-items">
              <div class="mock-nav-item active" style="background: #F3E8FF; color: #6B21A8;"><span>🎨</span> Artboards</div>
              <div class="mock-nav-item"><span>📐</span> Shapes</div>
              <div class="mock-nav-item"><span>🔤</span> Typography</div>
              <div class="mock-nav-item"><span>📦</span> Export (SVG)</div>
            </div>
            <div class="mock-ai-copilot-status" style="color: #6B21A8;">
              <span class="copilot-dot" style="background: #8B5CF6;"></span>
              <span>WCAG AAA 7.8:1</span>
            </div>
          </div>
          <div class="mock-main-content">
            <div style="background: #FFFFFF; border-radius: 14px; padding: 1rem; border: 1.5px solid rgba(139, 92, 246, 0.2); box-shadow: 0 4px 14px rgba(139, 92, 246, 0.06); display: flex; flex-direction: column; gap: 0.6rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: var(--font-hero); font-size: 0.95rem; font-weight: 800; color: #101C35;">Active Pastel Artboard</span>
                <span style="font-family: var(--font-catchy); font-size: 0.7rem; font-weight: 800; color: #6D28D9; background: #F5EEFD; padding: 0.2rem 0.6rem; border-radius: 9999px;">Auto-Layout 8px</span>
              </div>
              <div style="display: flex; gap: 0.75rem; align-items: center; background: #FAF5FF; padding: 0.75rem; border-radius: 10px;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background: #F472B6; box-shadow: 0 4px 12px rgba(244, 114, 182, 0.3);"></div>
                <div style="width: 44px; height: 44px; border-radius: 12px; background: #34D399; box-shadow: 0 4px 12px rgba(52, 211, 153, 0.3);"></div>
                <div style="width: 44px; height: 44px; border-radius: 12px; background: #A78BFA; box-shadow: 0 4px 12px rgba(167, 139, 250, 0.3);"></div>
                <div style="margin-left: auto; display: flex; flex-direction: column; gap: 0.25rem;">
                  <span style="font-size: 0.7rem; font-weight: 700; color: #6D28D9;">Palette: Dream Pop</span>
                  <span style="font-size: 0.65rem; color: #5A475C;">Contrast Ratio: Passed</span>
                </div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem;">
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">Export SVG</span>
                <span style="display: block; font-size: 0.68rem; color: #7C3AED; font-weight: 800;">Vector Clean</span>
              </div>
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">React JSX</span>
                <span style="display: block; font-size: 0.68rem; color: #7C3AED; font-weight: 800;">Component</span>
              </div>
              <div style="background: #FFFFFF; border-radius: 10px; padding: 0.5rem; text-align: center; border: 1px solid rgba(0,0,0,0.05);">
                <span style="font-size: 0.7rem; font-weight: 700; color: #101C35;">CSS Variables</span>
                <span style="display: block; font-size: 0.68rem; color: #7C3AED; font-weight: 800;">Design Tokens</span>
              </div>
            </div>
          </div>
        </div>
      `
    }
  ];

  let currentIdx = 0;
  let hoverTimer = null;

  // Render the THREE inactive project previews in the secondary column
  function renderSecondaryPreviews(activeIdx) {
    if (!secondaryList) return;

    const inactiveProjects = projects.filter(p => p.idx !== activeIdx);

    secondaryList.innerHTML = inactiveProjects.map(p => `
      <div class="sc-secondary-card" data-project-idx="${p.idx}" role="button" tabindex="0" aria-label="Expand ${p.title}">
        <div class="sc-mini-frame">
          <div class="sc-mini-chrome">
            <div class="sc-mini-dots" aria-hidden="true">
              <span class="sc-mini-dot"></span>
              <span class="sc-mini-dot"></span>
              <span class="sc-mini-dot"></span>
            </div>
            <span class="sc-mini-url">${p.address}</span>
          </div>
          <div class="sc-mini-viewport">
            ${p.renderMiniPreview()}
          </div>
        </div>
        <div class="sc-card-meta">
          <div class="sc-card-meta-left">
            <div class="sc-card-num-row">
              <span class="sc-card-num">${p.num}</span>
              <h4 class="sc-card-title">${p.title}</h4>
            </div>
            <span class="sc-card-category">${p.category}</span>
          </div>
          <div class="sc-card-action-icon" aria-hidden="true">↗</div>
        </div>
      </div>
    `).join('');

    // Attach Hover (mouseenter) and Click listeners to all secondary cards
    const cards = secondaryList.querySelectorAll('.sc-secondary-card');
    cards.forEach(card => {
      const targetIdx = parseInt(card.getAttribute('data-project-idx'), 10);

      // Smooth hover activation with tiny debounce (60ms) to feel instant yet avoid accidental flickers
      card.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
          if (currentIdx !== targetIdx) {
            switchProject(targetIdx, true);
          }
        }, 60);
      });

      card.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
      });

      // Click also supported
      card.addEventListener('click', (e) => {
        e.preventDefault();
        clearTimeout(hoverTimer);
        if (currentIdx !== targetIdx) {
          switchProject(targetIdx, true);
        }
      });

      // Keyboard accessible
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchProject(targetIdx, true);
        }
      });
    });
  }

  // Smooth physical transition to target project
  function switchProject(targetIdx, playSound = true) {
    if (targetIdx < 0 || targetIdx >= projects.length) return;
    currentIdx = targetIdx;

    if (playSound && typeof playTactileClick === 'function') {
      playTactileClick(760, 'sine');
    }

    const p = projects[targetIdx];

    // Update Hero Metadata smoothly
    if (heroNumEl) {
      heroNumEl.textContent = `PROJECT ${p.num}`;
      heroNumEl.style.color = p.accentColor;
    }
    if (heroCatEl) heroCatEl.textContent = p.category;
    if (heroStatusLabel) heroStatusLabel.textContent = 'LIVE SYSTEM';

    // Smooth title transition
    if (heroTitleEl) {
      heroTitleEl.style.opacity = '0.3';
      heroTitleEl.style.transform = 'translateY(4px)';
      setTimeout(() => {
        heroTitleEl.textContent = p.title;
        heroTitleEl.style.opacity = '1';
        heroTitleEl.style.transform = 'translateY(0)';
      }, 100);
    }

    if (heroDescEl) heroDescEl.textContent = p.desc;

    // Update Tech Chips
    if (heroTechRow) {
      heroTechRow.innerHTML = p.tech.map(t => `<span class="sc-tech-chip">${t}</span>`).join('');
    }

    // Update Action Buttons Links
    if (heroLiveBtn) heroLiveBtn.href = p.liveUrl;
    if (heroGhBtn) heroGhBtn.href = p.ghUrl;

    // Update Chrome info
    if (heroUrlEl) heroUrlEl.textContent = p.address;
    if (heroTagEl) {
      heroTagEl.innerHTML = `<span>${p.badge}</span>`;
    }

    // Update Ambient Halo
    if (heroHalo) {
      heroHalo.style.background = p.glow;
    }

    // Viewport smooth 3D crossfade & spring scale
    if (heroViewport) {
      heroViewport.style.opacity = '0';
      heroViewport.style.transform = 'scale(0.97) translateY(6px)';
      setTimeout(() => {
        heroViewport.innerHTML = p.renderHeroUI();
        heroViewport.style.opacity = '1';
        heroViewport.style.transform = 'scale(1) translateY(0)';
      }, 120);
    }

    // Update Project Switch Indicator Buttons
    indicatorSteps.forEach(btn => {
      const idx = parseInt(btn.getAttribute('data-project-idx'), 10);
      btn.classList.toggle('active', idx === targetIdx);
    });

    // Re-render the 3 secondary previews
    renderSecondaryPreviews(targetIdx);
  }

  // Indicator Bar buttons hover & click interactions
  indicatorSteps.forEach(btn => {
    const idx = parseInt(btn.getAttribute('data-project-idx'), 10);

    btn.addEventListener('mouseenter', () => {
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        if (currentIdx !== idx) {
          switchProject(idx, true);
        }
      }, 80);
    });

    btn.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimer);
    });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      clearTimeout(hoverTimer);
      if (currentIdx !== idx) {
        switchProject(idx, true);
      }
    });
  });

  // Cursor-based 3D Perspective Tilt on Desktop (Subtle 3-5 degrees)
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch && heroFrame) {
    heroFrame.addEventListener('mousemove', (e) => {
      const rect = heroFrame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      const tiltX = (y * -4).toFixed(2);
      const tiltY = (x * 4).toFixed(2);

      heroFrame.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
    });

    heroFrame.addEventListener('mouseleave', () => {
      heroFrame.style.transform = 'perspective(1200px) rotateX(1.5deg) rotateY(-1deg) translateY(0)';
    });
  }

  // Keyboard navigation when section is in view
  window.addEventListener('keydown', (e) => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      if (currentIdx < projects.length - 1) switchProject(currentIdx + 1, true);
      else switchProject(0, true);
    } else if (e.key === 'ArrowLeft') {
      if (currentIdx > 0) switchProject(currentIdx - 1, true);
      else switchProject(projects.length - 1, true);
    }
  });

  // Initial load: 01 StudyPilot-AI is the Hero, other 3 are secondary previews
  switchProject(0, false);
}


/**
 * StudyPilot-AI Interactive Simulator (Spaced Repetition Flashcards & Concepts)
 */
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
  const track = document.getElementById('cert-track');
  const slides = document.querySelectorAll('.cert-slide-card');
  const tabBtns = document.querySelectorAll('.cert-tab-btn');
  const dots = document.querySelectorAll('.cert-indicator-dot');
  const prevBtn = document.getElementById('cert-prev-btn');
  const nextBtn = document.getElementById('cert-next-btn');
  const currNumEl = document.getElementById('cert-curr-num');
  const stage = document.getElementById('cert-carousel-stage');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;

  function goToSlide(index, playSound = true) {
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    currentIndex = index;

    // Slide track horizontally
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Toggle active classes on slides
    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add('active-slide');
      } else {
        slide.classList.remove('active-slide');
      }
    });

    // Update tab buttons
    tabBtns.forEach((tab, i) => {
      const isActive = i === currentIndex;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update bottom dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Update counter
    if (currNumEl) {
      currNumEl.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    if (playSound && typeof playTactileClick === 'function') {
      playTactileClick(620 + currentIndex * 60, 'sine');
    }
  }

  // Next & Prev arrows
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
    });
  }

  // Tab Buttons click
  tabBtns.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      goToSlide(idx);
    });
  });

  // Dots click
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
    });
  });

  // Slide internal "Next" button click
  const nextActions = document.querySelectorAll('.cert-action-next');
  nextActions.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetIndex = parseInt(btn.getAttribute('data-goto'), 10);
      if (!isNaN(targetIndex)) {
        goToSlide(targetIndex);
      }
    });
  });

  // Touch Swipe Support on Stage
  if (stage) {
    let touchStartX = 0;
    let touchEndX = 0;

    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          // Swipe left -> next slide
          goToSlide(currentIndex + 1);
        } else {
          // Swipe right -> prev slide
          goToSlide(currentIndex - 1);
        }
      }
    }
  }

  // Keyboard navigation when Certifications section is focused/in viewport
  document.addEventListener('keydown', (e) => {
    const certSection = document.getElementById('certifications');
    if (!certSection) return;

    const rect = certSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;

    // If modal is open, don't trigger slider with arrow keys
    const modal = document.getElementById('cert-lightbox');
    if (modal && modal.classList.contains('lightbox-open')) return;

    if (isInView) {
      if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
      }
    }
  });

  // Lightbox Modal Handling (Zero black borders)
  const lightbox = document.getElementById('cert-lightbox');
  const lightboxImg = document.getElementById('cert-lightbox-img');
  const lightboxCaption = document.getElementById('cert-lightbox-caption');
  const lightboxClose = document.getElementById('cert-lightbox-close');

  const triggers = document.querySelectorAll('.cert-inspect-trigger');
  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetSrc = btn.getAttribute('data-target');
      const targetAlt = btn.getAttribute('data-alt') || 'Certificate Preview';

      if (lightbox && lightboxImg) {
        lightboxImg.src = targetSrc;
        lightboxImg.alt = targetAlt;
        if (lightboxCaption) {
          lightboxCaption.textContent = targetAlt;
        }
        lightbox.classList.add('lightbox-open');
        lightbox.setAttribute('aria-hidden', 'false');
        if (typeof playTactileClick === 'function') {
          playTactileClick(780, 'sine');
        }
      }
    });
  });

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('lightbox-open');
      lightbox.setAttribute('aria-hidden', 'true');
      if (typeof playTactileClick === 'function') {
        playTactileClick(480, 'triangle');
      }
    }
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // Initial call to calibrate slide
  goToSlide(0, false);
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
 * 3D Parallax Tilt on the Creative Editorial Portrait Showcase
 * Applies realistic multi-plane 3D depth and subtle parallax response to cursor motion
 * (Gentle, non-aggressive motion, zero spin, premium editorial feel)
 */
function setupHero3DPortraitParallax() {
  const visualZone = document.getElementById('hero-portrait-stage') || document.querySelector('.hero-visual-column');
  const stage = visualZone ? (visualZone.querySelector('.hero-creative-visual-stage') || visualZone.querySelector('.creative-portrait-stage-wrapper') || visualZone.querySelector('.editorial-portrait-stage-wrapper') || visualZone.querySelector('.editorial-3d-stage-wrapper')) : null;
  const portrait = visualZone ? (visualZone.querySelector('.hero-portrait-cutout-img') || visualZone.querySelector('.editorial-character-img')) : null;
  const kickerBadge = visualZone ? visualZone.querySelector('.hero-creative-kicker-pill') : null;
  const coralDisc = visualZone ? (visualZone.querySelector('.hero-disc-coral') || visualZone.querySelector('.cutout-coral-disc') || visualZone.querySelector('.stage-coral-circle')) : null;
  const cyanDisc = visualZone ? visualZone.querySelector('.hero-disc-cyan') : null;
  const cyanRing = visualZone ? (visualZone.querySelector('.hero-shape-ring-cyan') || visualZone.querySelector('.shape-teal-ring')) : null;
  const coralOrb = visualZone ? (visualZone.querySelector('.hero-shape-orb-coral') || visualZone.querySelector('.shape-coral-orb')) : null;
  const mintPill = visualZone ? visualZone.querySelector('.hero-shape-pill-mint') : null;
  const starburst = visualZone ? (visualZone.querySelector('.hero-shape-torus-gold') || visualZone.querySelector('.cutout-star-accent') || visualZone.querySelector('.stage-arch-star')) : null;

  if (!visualZone || !stage) return;

  let bounds = visualZone.getBoundingClientRect();
  let rafId = null;
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  function updateBounds() {
    bounds = visualZone.getBoundingClientRect();
  }

  window.addEventListener('resize', updateBounds);
  window.addEventListener('scroll', updateBounds, { passive: true });

  visualZone.addEventListener('pointermove', (e) => {
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    // Subtle, elegant editorial tilt (max 4 degrees)
    targetRotY = ((x - centerX) / centerX) * 4.0;
    targetRotX = -((y - centerY) / centerY) * 4.0;

    if (!rafId) {
      rafId = requestAnimationFrame(renderParallax);
    }
  });

  visualZone.addEventListener('pointerleave', () => {
    targetRotX = 0;
    targetRotY = 0;
    if (!rafId) {
      rafId = requestAnimationFrame(renderParallax);
    }
  });

  function renderParallax() {
    currentRotX += (targetRotX - currentRotX) * 0.1;
    currentRotY += (targetRotY - currentRotY) * 0.1;

    stage.style.transform = `perspective(1100px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;

    if (coralDisc) {
      coralDisc.style.transform = `translateX(${(-currentRotY * 0.6).toFixed(1)}px) translateY(${(currentRotX * 0.6).toFixed(1)}px)`;
    }

    if (cyanDisc) {
      cyanDisc.style.transform = `translateX(${(currentRotY * 0.5).toFixed(1)}px) translateY(${(-currentRotX * 0.5).toFixed(1)}px)`;
    }

    if (portrait) {
      portrait.style.transform = `scale(1.015) translateX(${(currentRotY * 0.7).toFixed(1)}px) translateY(${(-currentRotX * 0.7).toFixed(1)}px)`;
    }

    if (cyanRing) {
      cyanRing.style.transform = `translateX(${(currentRotY * 1.1).toFixed(1)}px) translateY(${(-currentRotX * 1.1).toFixed(1)}px)`;
    }

    if (coralOrb) {
      coralOrb.style.transform = `translateX(${(-currentRotY * 0.9).toFixed(1)}px) translateY(${(currentRotX * 0.9).toFixed(1)}px)`;
    }

    if (mintPill) {
      mintPill.style.transform = `translateX(${(-currentRotY * 1.2).toFixed(1)}px) translateY(${(currentRotX * 1.2).toFixed(1)}px)`;
    }

    if (kickerBadge) {
      kickerBadge.style.transform = `translateX(${(-currentRotY * 0.4).toFixed(1)}px) translateY(${(currentRotX * 0.4).toFixed(1)}px)`;
    }

    if (starburst) {
      starburst.style.transform = `translateX(${(currentRotY * 0.8).toFixed(1)}px) translateY(${(currentRotX * 0.8).toFixed(1)}px)`;
    }

    if (Math.abs(targetRotX - currentRotX) > 0.01 || Math.abs(targetRotY - currentRotY) > 0.01) {
      rafId = requestAnimationFrame(renderParallax);
    } else {
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
    'studypilot': {
      index: 0,
      title: "StudyPilot-AI",
      badge: "✦ AI PRODUCT SUITE",
      counter: "PROJECT 01 / 04",
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
      stageSourceId: "stage-studypilot"
    },
    'velora': {
      index: 1,
      title: "Velora Luxury Store",
      badge: "✦ HIGH-CONVERSION COMMERCE",
      counter: "PROJECT 02 / 04",
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
      liveUrl: "https://velora-luxury-store.vercel.app",
      ghUrl: "https://github.com/ArfaMunam47/velora-luxury-store",
      stageSourceId: "stage-velora"
    },
    'kumo': {
      index: 2,
      title: "Kumo Ramen Artisanal",
      badge: "✦ INTERACTIVE CULINARY UI",
      counter: "PROJECT 03 / 04",
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
      liveUrl: "https://kumo-ramen.vercel.app",
      ghUrl: "https://github.com/ArfaMunam47/kumo-ramen-artisanal",
      stageSourceId: "stage-kumo"
    },
    'pastelform': {
      index: 3,
      title: "PastelForm Engine",
      badge: "✦ DYNAMIC FORM ARCHITECTURE",
      counter: "PROJECT 04 / 04",
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
      liveUrl: "https://pastelform.vercel.app",
      ghUrl: "https://github.com/ArfaMunam47/pastelform-engine",
      stageSourceId: "stage-pastelform"
    }
  };

  const projectKeys = ['studypilot', 'velora', 'kumo', 'pastelform'];
  let currentProjectKey = 'studypilot';

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

  function openModal(key = 'studypilot') {
    renderFullPageProject(key);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    playTactileClick(740, 'triangle');
  }

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
 * 21. PREMIUM 3D CLAYMORPHIC SKILLS INTERACTIONS
 * Tactile micro-interactions, subtle 3D platform tilt & pipeline stepping
 * =========================================================================
 */
function setupSkillsCompiler() {
  const platforms = document.querySelectorAll('.skill-platform');
  const tiles = document.querySelectorAll('.clay-tile');
  const pipelineNodes = document.querySelectorAll('.pipeline-node');

  // Subtle 3D tilt response on hover over platforms
  platforms.forEach(platform => {
    platform.addEventListener('mousemove', (e) => {
      const rect = platform.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / (rect.height / 2)) * -4;
      const rotY = (x / (rect.width / 2)) * 4;
      platform.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`;
    });

    platform.addEventListener('mouseleave', () => {
      platform.style.transform = '';
    });
  });

  // Tactile sound and press feel on Clay Tech Tiles
  tiles.forEach(tile => {
    tile.addEventListener('mouseenter', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(680, 'triangle');
      }
    });

    tile.addEventListener('click', () => {
      if (typeof playTactileClick === 'function') {
        playTactileClick(840, 'sine');
      }
      const name = tile.querySelector('.tile-name')?.textContent || 'Skill';
      if (typeof showSystemToast === 'function') {
        showSystemToast(`✦ Selected: ${name}`);
      }
    });

    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tile.click();
      }
    });
  });

  // Interactive Pipeline Nodes in Station 03
  if (pipelineNodes.length) {
    pipelineNodes.forEach(node => {
      node.addEventListener('click', () => {
        pipelineNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        if (typeof playTactileClick === 'function') {
          playTactileClick(760, 'sine');
        }
        const title = node.querySelector('.node-title')?.textContent || '';
        const sub = node.querySelector('.node-sub')?.textContent || '';
        if (typeof showSystemToast === 'function') {
          showSystemToast(`Pipeline Step: ${title} — ${sub}`);
        }
      });

      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          node.click();
        }
      });
    });
  }
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





