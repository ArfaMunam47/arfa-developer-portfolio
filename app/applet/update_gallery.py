import re

new_js = r'''function setupProjectsShowcase() {
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
      // Direct click on links handled natively
      if (e.target.closest('a')) return;

      // Click on Explore Project button -> open fullpage experience modal
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

      // If clicking side card, switch to it
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

  // Calculate 3D Layout Geometry
  function getXOffset() {
    const w = window.innerWidth;
    if (w <= 480) return Math.min(w * 0.85, 340);
    if (w <= 768) return Math.min(w * 0.82, 380);
    if (w <= 1080) return 340;
    return 460;
  }

  // Update gallery state to index
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
        // Active Center Card
        card.classList.add('is-active');
        card.setAttribute('aria-hidden', 'false');
        card.style.transform = 'translate3d(0, 0, 90px) rotateX(0deg) rotateY(0deg) scale(1)';
        card.style.opacity = '1';
        card.style.filter = 'blur(0px)';
        card.style.zIndex = '25';
        card.style.pointerEvents = 'auto';
      } else if (diff === -1) {
        // Left Flanking Preview Card
        card.classList.add('is-left');
        card.setAttribute('aria-hidden', 'false');
        const rotY = isMobile ? 12 : 18;
        card.style.transform = `translate3d(-${xOffset}px, 0, -80px) rotateY(${rotY}deg) scale(${sideScale})`;
        card.style.opacity = isMobile ? '0.65' : '0.85';
        card.style.filter = 'blur(0.4px)';
        card.style.zIndex = '12';
        card.style.pointerEvents = 'auto';
      } else if (diff === 1) {
        // Right Flanking Preview Card
        card.classList.add('is-right');
        card.setAttribute('aria-hidden', 'false');
        const rotY = isMobile ? -12 : -18;
        card.style.transform = `translate3d(${xOffset}px, 0, -80px) rotateY(${rotY}deg) scale(${sideScale})`;
        card.style.opacity = isMobile ? '0.65' : '0.85';
        card.style.filter = 'blur(0.4px)';
        card.style.zIndex = '12';
        card.style.pointerEvents = 'auto';
      } else {
        // Deep Background Hidden Card
        card.classList.add('is-hidden');
        card.setAttribute('aria-hidden', 'true');
        card.style.transform = 'translate3d(0, 0, -220px) scale(0.65)';
        card.style.opacity = '0';
        card.style.filter = 'blur(2px)';
        card.style.zIndex = '2';
        card.style.pointerEvents = 'none';
      }
    });

    // Update Counter & Indicator Capsule
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

  // Previous & Next Controls
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

  // Indicator Step Click
  indicatorBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.getAttribute('data-project-idx') || '0', 10);
      switchProject(idx);
    });
  });

  // Keyboard Navigation: Left & Right Arrows
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

  // MOUSE DRAG HORIZONTAL PHYSICS
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

    // Apply continuous interactive drag transformation
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

  // TOUCH SWIPE PHYSICS (Mobile / Tablet)
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
    }
  }, { passive: true });

  // Responsive Resizing
  window.addEventListener('resize', () => {
    updateGallery(activeIndex, true);
  });

  // Initial Launch
  updateGallery(0, true);
}
'''

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

m1 = re.search(r'function setupProjectsShowcase\(\)', text)
m2 = re.search(r'function setupStudyPilotSimulator\(\)', text)

if m1 and m2:
    start_pos = m1.start()
    end_pos = m2.start()
    new_text = text[:start_pos] + new_js + '\n\n' + text[end_pos:]
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print('Successfully updated setupProjectsShowcase in script.js!')
else:
    print('Failed to find boundaries in script.js!')
