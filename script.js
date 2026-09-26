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

  // 23. My Learning Journey Cinematic Interactive Storybook & Phone
  setupLearningJourneyStory();

  // 24. Dedicated GitHub Showcase & Interactive Activity Visualization
  setupGitHubShowcaseSection();
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

  // Desktop subtle cursor parallax for 3D elements
  if (contactSection && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const headphones = contactSection.querySelector('.conn-headphones-pod');
    const plant = contactSection.querySelector('.conn-plant-pod');
    const plane = contactSection.querySelector('.conn-plane-flight');

    contactSection.addEventListener('mousemove', (e) => {
      const rect = contactSection.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      if (headphones) {
        headphones.style.transform = `translate(calc(-50% + ${(normX * 10).toFixed(1)}px), ${(normY * 7).toFixed(1)}px) rotate(${(normX * 3).toFixed(1)}deg)`;
      }
      if (plant) {
        plant.style.transform = `translate(calc(-50% + ${(normX * 6).toFixed(1)}px), ${(normY * 5).toFixed(1)}px)`;
      }
      if (plane) {
        plane.style.transform = `translate(${(normX * 12).toFixed(1)}px, ${(normY * 8).toFixed(1)}px) rotate(${(18 + normX * 5).toFixed(1)}deg)`;
      }
    });

    contactSection.addEventListener('mouseleave', () => {
      if (headphones) headphones.style.transform = '';
      if (plant) plant.style.transform = '';
      if (plane) plane.style.transform = '';
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

  const track = document.getElementById('gallery-track-3d');
  const viewport = document.getElementById('gallery-stage-viewport');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  const counterCurr = document.getElementById('gallery-counter-curr');
  const counterTotal = document.getElementById('gallery-counter-total');
  const indicatorCapsule = document.getElementById('gallery-indicator-capsule');
  const indicatorBtns = indicatorCapsule ? indicatorCapsule.querySelectorAll('.indicator-step') : [];

  if (!track) return;

  // Authentic 4 Projects Data
  const projects = [
    {
      id: "studypilot",
      key: "studypilot",
      number: "01",
      title: "StudyPilot-AI",
      category: "AI Academic Copilot",
      tagline: "Intelligent Academic Workspace with Adaptive Flashcards & Study Planner",
      description: "An autonomous learning operating system engineered to transform dense textbook chapters, lecture transcripts, and complex syllabi into structured revision roadmaps, spaced-repetition flashcards, and conceptual quizzes using prompt-engineered Claude 3.7 reasoning loops.",
      tags: ["Claude 3.7 AI", "React", "Tailwind CSS", "FastAPI", "Spaced Repetition"],
      liveUrl: "https://github.com/ArfaMunam47/StudyPilot-AI",
      codeUrl: "https://github.com/ArfaMunam47/StudyPilot-AI",
      accent: "#6366F1",
      renderMockup: function() {
        return `
          <div class="mockup-studypilot-screen">
            <div class="mockup-sp-sidebar" aria-hidden="true">
              <span class="sp-nav-icon active">✦</span>
              <span class="sp-nav-icon">📚</span>
              <span class="sp-nav-icon">📊</span>
              <span class="sp-nav-icon">⚙️</span>
            </div>
            <div class="mockup-sp-body">
              <div class="mockup-sp-topbar">
                <div class="mockup-sp-search">
                  <span>🔍</span>
                  <span>Search cards, flashcards & notes...</span>
                </div>
                <div class="mockup-sp-user-badge">AM</div>
              </div>
              <div class="mockup-sp-greet">
                Good morning, Arfa! ☀️
                <span>Your scheduled focus session is ready to begin.</span>
              </div>
              <div class="mockup-sp-grid">
                <div class="mockup-sp-card">
                  <div class="mockup-sp-card-title">Weekly Mastery</div>
                  <div class="mockup-sp-stats-row">
                    <div>
                      <div class="mockup-sp-stat-num">48</div>
                      <div class="mockup-sp-stat-label">Cards Mastered</div>
                    </div>
                    <div>
                      <div class="mockup-sp-stat-num" style="color: #10B981;">94%</div>
                      <div class="mockup-sp-stat-label">Retention</div>
                    </div>
                  </div>
                </div>
                <div class="mockup-sp-card mockup-sp-circle-gauge">
                  <div class="gauge-num">25:00</div>
                  <div class="gauge-sub">✦ Focus Timer Active</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },
    {
      id: "velora",
      key: "velora",
      number: "02",
      title: "Velora Store",
      category: "Minimalist E-Commerce",
      tagline: "Minimalist High-Conversion Fashion & Lifestyle Storefront",
      description: "A chic modern e-commerce storefront designed with editorial typography, ultra-responsive grid layouts, instant faceted filtering, slide-out micro-cart drawer, and dynamic voucher calculations for a frictionless retail journey.",
      tags: ["JavaScript ES6+", "React", "Tailwind CSS", "Stripe Checkout", "State Engine"],
      liveUrl: "https://github.com/ArfaMunam47/Velora-Store",
      codeUrl: "https://github.com/ArfaMunam47/Velora-Store",
      accent: "#FF6045",
      renderMockup: function() {
        return `
          <div style="height: 100%; display: flex; flex-direction: column; background: #FAF9F6; padding: 1.1rem; gap: 0.85rem; font-family: var(--font-body, sans-serif);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 0.6rem;">
              <span style="font-family: var(--font-display, serif); font-weight: 900; font-size: 1.15rem; color: #101C35; letter-spacing: 0.05em;">VELORA</span>
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <span style="font-size: 0.72rem; font-weight: 700; color: #64748B; background: #FFFFFF; padding: 0.25rem 0.6rem; border-radius: 9999px; border: 1px solid rgba(0,0,0,0.06);">BAG (3)</span>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; flex: 1;">
              <div style="background: #FFFFFF; border-radius: 12px; padding: 0.75rem; border: 1px solid rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between;">
                <div style="height: 80px; background: linear-gradient(135deg, #FFE4E6 0%, #FECDD3 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">
                  🧥
                </div>
                <div>
                  <div style="font-weight: 800; font-size: 0.78rem; color: #101C35; margin-top: 0.35rem;">Minimalist Trench</div>
                  <div style="font-size: 0.7rem; color: #FF6045; font-weight: 700;">$149.00</div>
                </div>
              </div>
              <div style="background: #FFFFFF; border-radius: 12px; padding: 0.75rem; border: 1px solid rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between;">
                <div style="height: 80px; background: linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">
                  👜
                </div>
                <div>
                  <div style="font-weight: 800; font-size: 0.78rem; color: #101C35; margin-top: 0.35rem;">Luxe Tote Bag</div>
                  <div style="font-size: 0.7rem; color: #FF6045; font-weight: 700;">$89.00</div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    },
    {
      id: "kumo",
      key: "kumo",
      number: "03",
      title: "Kumo Ramen",
      category: "Artisan Culinary Experience",
      tagline: "Modern Artisan Japanese Ramen House with Interactive Customizer & Sensory Motion",
      description: "An evocative culinary showcase for an artisan Tokyo ramen bar. Features an interactive bowl builder (broth richness, noodle firmness, chashu pork, ajitsuke tamago), ambient kitchen soundscapes, reservation table picker, and sensory editorial dark aesthetics.",
      tags: ["JavaScript ES6+", "CSS3 Motion", "Interactive State", "Order Calculator", "Audio Ambiance"],
      liveUrl: "https://github.com/ArfaMunam47/kumo-ramen-showcase",
      codeUrl: "https://github.com/ArfaMunam47/kumo-ramen-showcase",
      accent: "#F59E0B",
      renderMockup: function() {
        return `
          <div style="height: 100%; display: flex; flex-direction: column; background: #FFFBF0; padding: 1.1rem; gap: 0.85rem; font-family: var(--font-body, sans-serif);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 0.5rem;">
              <div>
                <span style="font-family: var(--font-display, serif); font-weight: 900; font-size: 1.05rem; color: #1C1917;">雲 KUMO RAMEN</span>
                <span style="display: block; font-size: 0.65rem; color: #B45309; font-weight: 700;">TOKYO CRAFT NOODLE BAR</span>
              </div>
              <span style="background: #FEF3C7; color: #92400E; font-size: 0.65rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 9999px;">OPEN TODAY</span>
            </div>
            <div style="background: #FFFFFF; border-radius: 12px; padding: 0.9rem; border: 1px solid rgba(0,0,0,0.06); display: flex; align-items: center; gap: 0.85rem;">
              <div style="width: 60px; height: 60px; border-radius: 50%; background: #FED7AA; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
                🍜
              </div>
              <div style="flex: 1;">
                <div style="font-weight: 800; font-size: 0.84rem; color: #1C1917;">Black Garlic Tonkotsu</div>
                <div style="font-size: 0.68rem; color: #78716C; margin: 0.15rem 0;">18-hr pork bone broth, soft-boiled ajitsuke egg, char siu</div>
                <div style="font-size: 0.76rem; font-weight: 800; color: #D97706;">$18.50</div>
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <div style="flex: 1; background: #FFFFFF; border-radius: 10px; padding: 0.55rem 0.75rem; text-align: center; border: 1px solid rgba(0,0,0,0.05); font-size: 0.68rem; font-weight: 700; color: #44403C;">
                🥢 Rich Broth
              </div>
              <div style="flex: 1; background: #FFFFFF; border-radius: 10px; padding: 0.55rem 0.75rem; text-align: center; border: 1px solid rgba(0,0,0,0.05); font-size: 0.68rem; font-weight: 700; color: #44403C;">
                🌶️ Spice Level 3
              </div>
            </div>
          </div>
        `;
      }
    },
    {
      id: "pastelform",
      key: "pastelform",
      number: "04",
      title: "PastelForm",
      category: "Aesthetic Form Engine",
      tagline: "Delightful Multi-Step Survey & Feedback Flow with Soft Pastel Themes",
      description: "A fluid, human-centered form and questionnaire experience crafted with soothing pastel palettes, micro-interactions, real-time validation, dynamic branch logic, and instant feedback loops that make data collection an absolute joy.",
      tags: ["React", "Tailwind CSS", "Framer Motion", "Accessible Forms", "State Engine"],
      liveUrl: "https://github.com/ArfaMunam47/pastelform",
      codeUrl: "https://github.com/ArfaMunam47/pastelform",
      accent: "#EC4899",
      renderMockup: function() {
        return `
          <div style="height: 100%; display: flex; flex-direction: column; background: #FAF5FF; padding: 1.1rem; gap: 0.85rem; font-family: var(--font-body, sans-serif);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(139,92,246,0.1); padding-bottom: 0.5rem;">
              <span style="font-family: var(--font-display, serif); font-weight: 800; font-size: 1rem; color: #6B21A8;">PastelForm System</span>
              <div style="display: flex; gap: 0.3rem;">
                <span style="width: 12px; height: 12px; border-radius: 50%; background: #F472B6;"></span>
                <span style="width: 12px; height: 12px; border-radius: 50%; background: #34D399;"></span>
                <span style="width: 12px; height: 12px; border-radius: 50%; background: #A78BFA;"></span>
              </div>
            </div>
            <div style="background: #FFFFFF; border-radius: 12px; padding: 0.85rem; border: 1px solid rgba(139,92,246,0.12); display: flex; flex-direction: column; gap: 0.55rem;">
              <div>
                <div style="font-size: 0.65rem; font-weight: 800; color: #7C3AED; text-transform: uppercase;">Workspace Email</div>
                <div style="background: #FAF5FF; border: 1.5px solid #DDD6FE; border-radius: 8px; padding: 0.35rem 0.65rem; font-size: 0.72rem; color: #5B21B6; margin-top: 0.2rem;">
                  arfa.dev@portfolio.design ✓
                </div>
              </div>
              <div>
                <div style="font-size: 0.65rem; font-weight: 800; color: #7C3AED; text-transform: uppercase;">Secure Passcode</div>
                <div style="background: #FAF5FF; border: 1.5px solid #DDD6FE; border-radius: 8px; padding: 0.35rem 0.65rem; font-size: 0.72rem; color: #5B21B6; margin-top: 0.2rem;">
                  •••••••••••• (Strong)
                </div>
              </div>
              <div style="background: #7C3AED; color: #FFFFFF; font-weight: 800; font-size: 0.72rem; text-align: center; padding: 0.45rem; border-radius: 8px; margin-top: 0.2rem;">
                Validate Credentials
              </div>
            </div>
          </div>
        `;
      }
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

  // Build the 4 cards into DOM once with unified structure
  track.innerHTML = '';
  const cardElements = [];

  projects.forEach((proj, idx) => {
    const card = document.createElement('article');
    card.className = 'cinematic-project-card';
    card.setAttribute('data-index', idx);
    card.setAttribute('role', 'group');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${proj.number} of ${totalCount}: ${proj.title}`);

    card.innerHTML = `
      <!-- TOP TIER: Project Window & Visual Presentation Canvas -->
      <div class="card-preview-viewport">
        <div class="card-window-bar">
          <div class="window-dot-cluster" aria-hidden="true">
            <span class="window-dot dot-red"></span>
            <span class="window-dot dot-yellow"></span>
            <span class="window-dot dot-green"></span>
          </div>
          <div class="window-category-capsule">
            <span class="category-spark">✦</span>
            <span class="category-name">${proj.category}</span>
          </div>
          <div class="window-counter-badge">
            <span>${proj.number}</span>
          </div>
        </div>
        <div class="card-visual-canvas">
          ${proj.renderMockup()}
        </div>
      </div>

      <!-- BOTTOM TIER: Information Deck & Actions -->
      <div class="card-info-deck">
        <div class="card-header-line">
          <div class="card-title-group">
            <h3 class="card-project-title">${proj.title}</h3>
            <p class="card-tagline">${proj.tagline}</p>
          </div>
          <span class="card-corner-arrow" aria-hidden="true">↗</span>
        </div>

        <p class="card-project-desc">${proj.description}</p>

        <div class="card-tech-row">
          ${proj.tags.map(t => `<span class="card-tech-chip">${t}</span>`).join('')}
        </div>

        <div class="card-actions-bar">
          <button type="button" class="btn-card-explore tactile-btn" data-project-key="${proj.key}">
            <span>Explore Project</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>

          <a href="${proj.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary tactile-btn" aria-label="${proj.title} Live Demo">
            <span>Live Demo</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

          <a href="${proj.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary btn-icon-only tactile-btn" aria-label="${proj.title} GitHub Repository">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
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

    // Desktop cursor hover 3D tilt on active card
    card.addEventListener('mousemove', (e) => {
      if (idx !== activeIndex || isDragging || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      const rect = card.getBoundingClientRect();
      const normX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const tiltX = -normY * 5;
      const tiltY = normX * 5;
      card.style.transform = `translate3d(0, 0, 95px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale(1)`;
    });

    card.addEventListener('mouseleave', () => {
      if (idx === activeIndex) {
        card.style.transform = 'translate3d(0, 0, 90px) rotateX(0deg) rotateY(0deg) scale(1)';
      }
    });

    track.appendChild(card);
    cardElements.push(card);
  });

  function getXOffset() {
    const w = window.innerWidth;
    if (w <= 480) return Math.min(w * 0.85, 340);
    if (w <= 768) return Math.min(w * 0.82, 380);
    if (w <= 1080) return 340;
    return 460;
  }

  function updateGallery(newIndex, immediate = false) {
    activeIndex = (newIndex + totalCount) % totalCount;
    isAnimating = true;

    const xOffset = getXOffset();
    const isMobile = window.innerWidth <= 768;
    const sideScale = isMobile ? 0.82 : 0.84;

    projects.forEach((_, i) => {
      const card = cardElements[i];
      if (immediate) {
        card.style.transition = 'none';
      } else {
        card.style.transition = '';
      }

      let diff = (i - activeIndex) % totalCount;
      if (diff > 2) diff -= totalCount;
      if (diff < -1) diff += totalCount;

      card.classList.remove('is-active', 'is-left', 'is-right', 'is-hidden');

      if (diff === 0) {
        card.classList.add('is-active');
        card.setAttribute('aria-hidden', 'false');
        card.style.transform = 'translate3d(0, 0, 90px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.opacity = '1';
        card.style.filter = 'blur(0px)';
        card.style.zIndex = '25';
        card.style.pointerEvents = 'auto';
      } else if (diff === -1) {
        card.classList.add('is-left');
        card.setAttribute('aria-hidden', 'false');
        const rotY = isMobile ? 12 : 18;
        card.style.transform = `translate3d(-${xOffset}px, 0, -80px) rotateY(${rotY}deg) scale(${sideScale})`;
        card.style.opacity = isMobile ? '0.65' : '0.85';
        card.style.filter = 'blur(0.4px)';
        card.style.zIndex = '12';
        card.style.pointerEvents = 'auto';
      } else if (diff === 1) {
        card.classList.add('is-right');
        card.setAttribute('aria-hidden', 'false');
        const rotY = isMobile ? -12 : -18;
        card.style.transform = `translate3d(${xOffset}px, 0, -80px) rotateY(${rotY}deg) scale(${sideScale})`;
        card.style.opacity = isMobile ? '0.65' : '0.85';
        card.style.filter = 'blur(0.4px)';
        card.style.zIndex = '12';
        card.style.pointerEvents = 'auto';
      } else {
        card.classList.add('is-hidden');
        card.setAttribute('aria-hidden', 'true');
        card.style.transform = 'translate3d(0, 0, -220px) scale(0.65)';
        card.style.opacity = '0';
        card.style.filter = 'blur(2px)';
        card.style.zIndex = '2';
        card.style.pointerEvents = 'none';
      }
    });

    if (counterCurr) counterCurr.textContent = String(activeIndex + 1).padStart(2, '0');

    indicatorBtns.forEach((btn, idx) => {
      const isCur = idx === activeIndex;
      btn.classList.toggle('active', isCur);
      btn.setAttribute('aria-selected', isCur ? 'true' : 'false');
    });

    setTimeout(() => {
      isAnimating = false;
    }, immediate ? 50 : 650);
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

  indicatorBtns.forEach((btn) => {
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

    const xOffset = getXOffset();
    const isMobile = window.innerWidth <= 768;
    const sideScale = isMobile ? 0.82 : 0.84;

    projects.forEach((_, i) => {
      const card = cardElements[i];
      card.style.transition = 'none';

      let diff = (i - activeIndex) % totalCount;
      if (diff > 2) diff -= totalCount;
      if (diff < -1) diff += totalCount;

      if (diff === 0) {
        const moveX = deltaX * 0.9;
        const rotY = -deltaX * 0.025;
        const scaleVal = Math.max(0.85, 1 - Math.abs(deltaX) * 0.0003);
        card.style.transform = `translate3d(${moveX}px, 0, ${90 - Math.abs(deltaX) * 0.15}px) rotateY(${rotY}deg) scale(${scaleVal})`;
      } else if (diff === -1) {
        const moveX = -xOffset + deltaX * 0.85;
        const rotY = 18 - deltaX * 0.03;
        card.style.transform = `translate3d(${moveX}px, 0, -80px) rotateY(${rotY}deg) scale(${sideScale})`;
      } else if (diff === 1) {
        const moveX = xOffset + deltaX * 0.85;
        const rotY = -18 - deltaX * 0.03;
        card.style.transform = `translate3d(${moveX}px, 0, -80px) rotateY(${rotY}deg) scale(${sideScale})`;
      }
    });
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');

    const deltaX = dragCurrentX - dragStartX;
    if (dragHasMoved) {
      if (deltaX < -50) {
        switchProject(activeIndex + 1);
      } else if (deltaX > 50) {
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
      image: "certificate-1.jpg",
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
      image: "certificate-2.jpg",
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
      image: "certificate-3.jpg",
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
 * 23. MY LEARNING JOURNEY — CINEMATIC INTERACTIVE STORYBOOK & PHONE EXPERIENCE
 * =========================================================================
 */
function setupLearningJourneyStory() {
  const section = document.getElementById('experience');
  if (!section) return;

  const stage = document.getElementById('lj-story-stage');
  const bookWrapper = document.getElementById('lj-book-wrapper');
  const phoneDevice = document.getElementById('lj-phone-device');

  // Stage Navigator Tabs & Book Ribbon Tabs
  const navTabs = Array.from(document.querySelectorAll('.lj-nav-tab'));
  const ribbonTabs = Array.from(document.querySelectorAll('.lj-ribbon-tab'));
  const phoneNavIcons = Array.from(document.querySelectorAll('.phone-nav-icon'));
  const nextChapterBtn = document.getElementById('lj-next-chapter-btn');

  // Book Page Elements
  const leftPageNum = document.getElementById('lj-left-page-num');
  const rightPageNum = document.getElementById('lj-right-page-num');
  const chapterNumLabel = document.getElementById('lj-chapter-num-label');
  const chapterTitle = document.getElementById('lj-chapter-title');
  const chapterHandwritten = document.getElementById('lj-chapter-handwritten');
  const chapterDesc = document.getElementById('lj-chapter-desc');
  const chapterBadge = document.getElementById('lj-chapter-badge');
  const checklistEl = document.getElementById('lj-checklist');
  const nextLabel = document.getElementById('lj-next-label');

  // Sticky Note & Index Card Elements
  const stickyText = document.getElementById('lj-sticky-text');
  const indexTitle = document.getElementById('lj-index-title');
  const indexStat = document.getElementById('lj-index-stat');
  const indexLabel = document.getElementById('lj-index-label');
  const indexQuote = document.getElementById('lj-index-quote');

  // Phone Screen Elements
  const phoneStageBadge = document.getElementById('phone-stage-badge');
  const phoneFocusName = document.getElementById('phone-focus-name');
  const phoneFocusSub = document.getElementById('phone-focus-sub');
  const phoneProgressVal = document.getElementById('phone-progress-val');
  const phoneProgressFill = document.getElementById('phone-progress-fill');
  const phoneCodeFilename = document.getElementById('phone-code-filename');
  const phoneCodeSnippet = document.getElementById('phone-code-snippet');

  // 4 Carefully Curated Chapters of Arfa Munam's Real Learning Journey
  const chapters = [
    {
      id: "foundations",
      numLabel: "CHAPTER 01",
      leftPage: "P. 12",
      rightPage: "P. 13",
      title: "Foundations & Core Logic",
      handwritten: "“Curiosity turns into real capability when you start building.”",
      desc: "Mastering the fundamental building blocks of modern web engineering. Deeply deconstructing algorithms, semantic architecture, and understanding computational logic from first principles.",
      badge: "Core Web Foundations Verified",
      checklist: [
        "Semantic HTML5 & Modern Accessibility (ARIA)",
        "TypeScript & ES6+ Functional Programming",
        "CSS Box Model, Flexbox & Fluid Grid Systems",
        "Git Workflow, Version Control & Deployment"
      ],
      nextLabel: "Next: 02 Frontend Craft",
      sticky: "“Rule #1: Build every day. Even 20 lines of clean code compounds into mastery.”",
      indexTitle: "STAGE 01 SUMMARY",
      indexStat: "100%",
      indexLabel: "Foundation Applied",
      indexQuote: "“Solid fundamentals make every modern framework easy to learn.”",
      phone: {
        stageBadge: "STAGE 01",
        focusName: "Web Fundamentals",
        focusSub: "Mastering clean code mechanics and accessible semantic structuring.",
        progressVal: "98%",
        codeFilename: "core-logic.ts",
        codeSnippet: `interface DevCraft {
  curiosity: boolean;
  dailyPractice: number;
}
const buildSkills = (input: DevCraft) => {
  return input.curiosity ? "Breakthrough" : "Keep Exploring";
};`
      }
    },
    {
      id: "frontend",
      numLabel: "CHAPTER 02",
      leftPage: "P. 24",
      rightPage: "P. 25",
      title: "Modern Frontend Craft",
      handwritten: "“Interface design is not just how it looks, but how it breathes and reacts.”",
      desc: "Architecting fluid digital experiences, neo-skeuomorphic depth, tactile micro-interactions, responsive physics-driven layouts, and seamless visual hierarchies across all viewport dimensions.",
      badge: "Component Architecture Verified",
      checklist: [
        "Component-Driven Modular Design & Clean State",
        "Fluid Typography, CSS Math & Dynamic Clamp()",
        "3D CSS Perspectives, Parallax & Micro-Animations",
        "Performance Profiling & 60fps Frame Budget"
      ],
      nextLabel: "Next: 03 AI & Prompting",
      sticky: "“Design with intention. Every shadow and bevel should guide the visitor’s focus.”",
      indexTitle: "STAGE 02 SUMMARY",
      indexStat: "60 FPS",
      indexLabel: "Smooth Fluid Render",
      indexQuote: "“Micro-interactions turn static web pages into living software.”",
      phone: {
        stageBadge: "STAGE 02",
        focusName: "Frontend Craft & Motion",
        focusSub: "Crafting editorial typography and tactile responsive interfaces.",
        progressVal: "92%",
        codeFilename: "interactive-ui.tsx",
        codeSnippet: `const Card3D = ({ children, tilt }: Props) => {
  const [rotX, rotY] = useSpringLerp(tilt);
  return (
    <div style={{ transform: \`rotateX(\${rotX}deg)\` }}>
      {children}
    </div>
  );
};`
      }
    },
    {
      id: "ai",
      numLabel: "CHAPTER 03",
      leftPage: "P. 38",
      rightPage: "P. 39",
      title: "AI Systems & Prompting",
      handwritten: "“AI does not replace craftsmanship; it amplifies curiosity and velocity.”",
      desc: "Bridging human intent and machine reasoning. Leveraging Google AI certifications, multimodal prompt engineering, Chain-of-Thought deliberation, few-shot conditioning, and Vertex AI developer integrations.",
      badge: "Google AI Certified Professional",
      checklist: [
        "Google Certified AI Professional Foundations",
        "Few-Shot Conditioning & Context Window Management",
        "Multimodal Vision & Text Embedding Pipelines",
        "Structured JSON Schemas & Function Calling"
      ],
      nextLabel: "Next: 04 Automation & Logic",
      sticky: "“A great prompt is an engineered specification, not a vague question.”",
      indexTitle: "STAGE 03 SUMMARY",
      indexStat: "Cert.",
      indexLabel: "Google Certified 2024-2026",
      indexQuote: "“Precision inputs yield predictable, production-ready AI outputs.”",
      phone: {
        stageBadge: "STAGE 03",
        focusName: "Prompt Pipelines & Models",
        focusSub: "Architecting multimodal reasoning chains and grounded system prompts.",
        progressVal: "88%",
        codeFilename: "prompt-pipeline.py",
        codeSnippet: `def build_prompt_chain(query: str, ctx: dict) -> str:
    system = "You are a senior systems engineer."
    return f"{system}\\nContext: {ctx}\\nTask: {query}"`
      }
    },
    {
      id: "automation",
      numLabel: "CHAPTER 04",
      leftPage: "P. 52",
      rightPage: "P. 53",
      title: "Automation & Smarter Workflows",
      handwritten: "“Automate repetitive tasks so your mind remains free for creative breakthroughs.”",
      desc: "Constructing connected toolchains, server-side data proxies, webhook triggers, API synchronizations, and intelligent background routines that transform complex workflows into effortless actions.",
      badge: "Workflow Automation Verified",
      checklist: [
        "RESTful & GraphQL API Integrations",
        "Headless Automation & Node.js Server Routines",
        "Asynchronous Queue Workers & Data Parsing",
        "Modern Tooling & Autonomous Developer Workflows"
      ],
      nextLabel: "Cycle Back: 01 Foundations ↺",
      sticky: "“The best automation is invisible: it simply makes complex things feel effortless.”",
      indexTitle: "STAGE 04 SUMMARY",
      indexStat: "10x",
      indexLabel: "End-to-End Velocity",
      indexQuote: "“Connecting APIs and intelligent systems unlocks unprecedented creative scale.”",
      phone: {
        stageBadge: "STAGE 04",
        focusName: "Automation & APIs",
        focusSub: "Building autonomous background routines and scalable tool integrations.",
        progressVal: "82%",
        codeFilename: "automation-worker.ts",
        codeSnippet: `async function processPipeline(task: WorkItem) {
  const result = await runModelAgent(task.data);
  await syncToDatabase(result);
  return { status: "success", timestamp: Date.now() };
}`
      }
    }
  ];

  let currentChapterIdx = 0;
  let isTransitioning = false;

  function setChapter(index, playSound = false) {
    if (isTransitioning) return;
    currentChapterIdx = (index + chapters.length) % chapters.length;
    const data = chapters[currentChapterIdx];
    if (!data) return;

    isTransitioning = true;

    // Update active tab buttons
    navTabs.forEach((tab, i) => {
      const isActive = i === currentChapterIdx;
      tab.classList.toggle('active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    ribbonTabs.forEach((ribbon, i) => {
      ribbon.classList.toggle('active', i === currentChapterIdx);
    });

    phoneNavIcons.forEach((icon, i) => {
      icon.classList.toggle('active', i === currentChapterIdx);
    });

    // Animate book page content update
    const leftPage = document.getElementById('lj-page-left');
    const rightPage = document.getElementById('lj-page-right');
    const phoneScreen = document.querySelector('.lj-phone-screen');

    if (leftPage) leftPage.style.opacity = '0.4';
    if (rightPage) rightPage.style.opacity = '0.4';
    if (phoneScreen) phoneScreen.style.opacity = '0.6';

    setTimeout(() => {
      // Left Page Updates
      if (leftPageNum) leftPageNum.textContent = data.leftPage;
      if (rightPageNum) rightPageNum.textContent = data.rightPage;
      if (chapterNumLabel) chapterNumLabel.textContent = data.numLabel;
      if (chapterTitle) chapterTitle.textContent = data.title;
      if (chapterHandwritten) chapterHandwritten.textContent = data.handwritten;
      if (chapterDesc) chapterDesc.textContent = data.desc;
      if (chapterBadge) chapterBadge.textContent = data.badge;

      // Right Page Updates
      if (checklistEl) {
        checklistEl.innerHTML = data.checklist.map(item => `
          <li class="lj-check-item">
            <span class="check-box checked">✓</span>
            <span class="check-text">${item}</span>
          </li>
        `).join('');
      }
      if (nextLabel) nextLabel.textContent = data.nextLabel;

      // Sticky Note & Index Card
      if (stickyText) stickyText.textContent = data.sticky;
      if (indexTitle) indexTitle.textContent = data.indexTitle;
      if (indexStat) indexStat.textContent = data.indexStat;
      if (indexLabel) indexLabel.textContent = data.indexLabel;
      if (indexQuote) indexQuote.textContent = data.indexQuote;

      // Phone Updates
      if (phoneStageBadge) phoneStageBadge.textContent = data.phone.stageBadge;
      if (phoneFocusName) phoneFocusName.textContent = data.phone.focusName;
      if (phoneFocusSub) phoneFocusSub.textContent = data.phone.focusSub;
      if (phoneProgressVal) phoneProgressVal.textContent = data.phone.progressVal;
      if (phoneProgressFill) phoneProgressFill.style.width = data.phone.progressVal;
      if (phoneCodeFilename) phoneCodeFilename.textContent = data.phone.codeFilename;
      if (phoneCodeSnippet) phoneCodeSnippet.textContent = data.phone.codeSnippet;

      // Restore opacity smoothly
      if (leftPage) leftPage.style.opacity = '1';
      if (rightPage) rightPage.style.opacity = '1';
      if (phoneScreen) phoneScreen.style.opacity = '1';

      if (playSound && typeof playTactileClick === 'function') {
        playTactileClick(560 + currentChapterIdx * 80, 'sine');
      }

      setTimeout(() => {
        isTransitioning = false;
      }, 200);
    }, 180);
  }

  // Bind Navigator Tabs
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-chapter') || '0', 10);
      setChapter(idx, true);
    });
  });

  // Bind Ribbon Tabs
  ribbonTabs.forEach(ribbon => {
    ribbon.addEventListener('click', () => {
      const idx = parseInt(ribbon.getAttribute('data-chapter') || '0', 10);
      setChapter(idx, true);
    });
  });

  // Bind Phone Nav Icons
  phoneNavIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      const idx = parseInt(icon.getAttribute('data-chapter') || '0', 10);
      setChapter(idx, true);
    });
  });

  // Bind Next Chapter Dog-Ear Button
  if (nextChapterBtn) {
    nextChapterBtn.addEventListener('click', () => {
      setChapter(currentChapterIdx + 1, true);
    });
  }

  // Keyboard navigation when section is in view
  window.addEventListener('keydown', (e) => {
    const rect = section.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
    if (!inView) return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setChapter(currentChapterIdx + 1, true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setChapter(currentChapterIdx - 1, true);
    }
  });

  // Desktop Smooth 3D Cursor Parallax
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (isFinePointer && stage && bookWrapper && phoneDevice) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let rafId = null;

    function renderParallax() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      // Book subtle tilt
      const bookRotX = -currentY * 4.5;
      const bookRotY = currentX * 6.5;
      const bookTransX = currentX * 8;
      const bookTransY = currentY * 5;
      bookWrapper.style.transform = `rotateX(${bookRotX.toFixed(2)}deg) rotateY(${bookRotY.toFixed(2)}deg) translate3d(${bookTransX.toFixed(1)}px, ${bookTransY.toFixed(1)}px, 0)`;

      // Phone slightly more dynamic tilt & reflection
      const phoneRotX = -currentY * 6.5;
      const phoneRotY = currentX * 8.5;
      const phoneTransX = currentX * 14;
      const phoneTransY = currentY * 8;
      phoneDevice.style.transform = `rotateX(${phoneRotX.toFixed(2)}deg) rotateY(${phoneRotY.toFixed(2)}deg) translate3d(${phoneTransX.toFixed(1)}px, ${phoneTransY.toFixed(1)}px, 20px)`;

      if (isHovering || Math.abs(currentX) > 0.02 || Math.abs(currentY) > 0.02) {
        rafId = requestAnimationFrame(renderParallax);
      } else {
        rafId = null;
        bookWrapper.style.transform = '';
        phoneDevice.style.transform = '';
      }
    }

    section.addEventListener('mouseenter', () => {
      isHovering = true;
      if (!rafId) rafId = requestAnimationFrame(renderParallax);
    });

    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      mouseX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      mouseY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      if (!rafId) rafId = requestAnimationFrame(renderParallax);
    });

    section.addEventListener('mouseleave', () => {
      isHovering = false;
      mouseX = 0;
      mouseY = 0;
    });
  }

  // Initialize at Chapter 0
  setChapter(0, false);
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






