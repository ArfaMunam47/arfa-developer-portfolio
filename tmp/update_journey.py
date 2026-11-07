import re

# 1. Read styles.css
with open('/app/applet/styles.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

# Define the new CSS
new_css = """/* ==========================================================================
   MY LEARNING JOURNEY — EDITORIAL INFOGRAPHIC REDESIGN
   Exact Reproduction of Attached Reference Image:
   Orange Accent System • Alternating 4-Section Timeline • 3D Circular Discs
   Rounded Orange-Bordered Cards • Origami Paper Airplane • Connecting Spine
   ========================================================================== */

#experience.futuristic-journey-section,
.futuristic-journey-section {
  position: relative;
  background-color: #FAF8F5; /* Exact seamless portfolio background */
  color: #0F172A;
  overflow: hidden;
  border-top: 1px solid rgba(226, 218, 205, 0.7);
  border-bottom: 1px solid rgba(226, 218, 205, 0.7);
  padding: clamp(4.5rem, 6.5vw, 6.5rem) 0 clamp(3.5rem, 5vw, 5rem);
}

.learning-journey-container,
.lj-editorial-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 3.5vw, 2.5rem);
  position: relative;
  z-index: 2;
  box-sizing: border-box;
}

/* --------------------------------------------------------------------------
   1. EDITORIAL HEADER (Playful, Centered, Handcrafted)
   -------------------------------------------------------------------------- */
.lj-editorial-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: clamp(2.8rem, 4.8vw, 4rem);
  position: relative;
}

.lj-pill-badge {
  display: inline-block;
  background: #FDBA74;
  color: #431407;
  font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.02em;
  padding: 4px 22px;
  border-radius: 999px;
  margin-bottom: 10px;
  box-shadow: 0 2px 8px rgba(251, 146, 60, 0.25);
}

.lj-main-heading {
  font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 900;
  line-height: 1.15;
  color: #18181B;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  margin: 0;
  position: relative;
}

.lj-heading-doodle-left {
  display: inline-flex;
  align-items: center;
  margin-right: 6px;
  transform: translateY(-8px);
}

.lj-heading-doodle-right {
  display: inline-flex;
  align-items: center;
  margin-left: 6px;
  transform: translateY(-10px);
}

.lj-text-dark {
  color: #18181B;
  letter-spacing: -0.02em;
}

.lj-text-orange {
  color: #FF6B2C;
  letter-spacing: -0.01em;
  text-shadow: 0 4px 16px rgba(255, 107, 44, 0.25);
}

.lj-heading-underline {
  margin-top: 2px;
  margin-bottom: 4px;
}

.lj-supporting-text {
  font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
  font-size: clamp(0.95rem, 1.35vw, 1.12rem);
  font-style: italic;
  font-weight: 500;
  color: #52525B;
  margin: 10px 0 0 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.lj-rocket {
  font-style: normal;
  display: inline-block;
  transform: translateY(1px);
}

/* --------------------------------------------------------------------------
   2. ALTERNATING TIMELINE STAGE (4 Exact Sections + Connecting Spine)
   -------------------------------------------------------------------------- */
.lj-editorial-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
}

.lj-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 860px;
  position: relative;
  box-sizing: border-box;
}

/* Section 1 & 3: Illustration LEFT, Card RIGHT */
.lj-item-left-ill {
  flex-direction: row;
}

.lj-item-left-ill .lj-illustration-wrap {
  flex-shrink: 0;
  margin-right: -42px;
  z-index: 3;
}

.lj-item-left-ill .lj-card {
  flex: 1;
  padding: 24px 30px 24px 64px;
  position: relative;
  z-index: 1;
}

/* Section 2 & 4: Card LEFT, Illustration RIGHT */
.lj-item-right-ill {
  flex-direction: row;
}

.lj-item-right-ill .lj-card {
  flex: 1;
  padding: 24px 64px 24px 30px;
  position: relative;
  z-index: 1;
}

.lj-item-right-ill .lj-illustration-wrap {
  flex-shrink: 0;
  margin-left: -42px;
  z-index: 3;
}

/* --------------------------------------------------------------------------
   3. 3D GLOSSY ORANGE CIRCULAR ILLUSTRATIONS
   -------------------------------------------------------------------------- */
.lj-illustration-wrap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.lj-circle-disc {
  width: 164px;
  height: 164px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #FFA25E 0%, #FF6F2E 52%, #D9480F 100%);
  box-shadow: 
    inset 0 3px 6px rgba(255, 255, 255, 0.5),
    inset 0 -4px 8px rgba(180, 50, 0, 0.4),
    0 16px 36px -6px rgba(217, 72, 15, 0.45),
    0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: visible;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.lj-circle-disc:hover {
  transform: scale(1.04) rotate(-1.5deg);
  box-shadow: 
    inset 0 3px 7px rgba(255, 255, 255, 0.6),
    0 22px 42px -6px rgba(217, 72, 15, 0.55),
    0 6px 16px rgba(0, 0, 0, 0.1);
}

.lj-ill-svg {
  width: 100%;
  height: 100%;
  display: block;
}

/* Radiating Accent Dashes around Discs */
.lj-ill-dashes {
  position: absolute;
  pointer-events: none;
  z-index: 4;
}

.lj-dashes-top-left {
  top: -6px;
  left: -8px;
}

.lj-dashes-top-right {
  top: -6px;
  right: -8px;
}

/* --------------------------------------------------------------------------
   4. CONTENT CARDS (Crisp White, Orange Border, Editorial Spacing)
   -------------------------------------------------------------------------- */
.lj-card {
  background: #FFFFFF !important;
  border: 1.5px solid #FF7A30;
  border-radius: 22px;
  box-shadow: 
    0 8px 26px -4px rgba(249, 115, 22, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.lj-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 14px 34px -4px rgba(249, 115, 22, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.06);
}

.lj-card-pill {
  display: inline-block;
  background: linear-gradient(135deg, #FF9E58 0%, #FF6F2E 100%);
  color: #FFFFFF;
  font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: 999px;
  padding: 4px 14px;
  margin-bottom: 8px;
  box-shadow: 0 2px 6px rgba(255, 111, 46, 0.28);
}

.lj-card-title {
  font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
  font-size: 20px;
  font-weight: 800;
  color: #18181B;
  margin: 0 0 6px 0;
  line-height: 1.25;
  letter-spacing: -0.01em;
}

.lj-card-desc {
  font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
  font-size: 13.5px;
  line-height: 1.55;
  color: #4B5563;
  margin: 0;
}

.lj-card-desc strong {
  color: #18181B;
  font-weight: 700;
}

/* --------------------------------------------------------------------------
   5. VERTICAL TIMELINE CONNECTORS & 3D BEADS
   -------------------------------------------------------------------------- */
.lj-timeline-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 52px;
  position: relative;
  z-index: 1;
}

.lj-connector-line {
  width: 2.5px;
  height: 18px;
  background: #FF7A30;
  border-radius: 2px;
}

.lj-connector-node {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #FFB074 0%, #FF6F2E 65%, #EA580C 100%);
  box-shadow: 
    0 3px 8px rgba(234, 88, 12, 0.4),
    inset 0 1.5px 2px rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-sizing: border-box;
}

/* --------------------------------------------------------------------------
   6. BOTTOM CLOSING ELEMENT (Origami Paper Airplane + Continuous Flight Path)
   -------------------------------------------------------------------------- */
.lj-closing-wrap {
  position: relative;
  width: 100%;
  max-width: 720px;
  margin: 8px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.lj-closing-flight {
  position: relative;
  width: 100%;
  height: 60px;
  margin-bottom: -16px;
  pointer-events: none;
  z-index: 2;
}

.lj-airplane-flight-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.lj-paper-airplane {
  position: absolute;
  left: 17%;
  top: 10px;
  filter: drop-shadow(0 6px 12px rgba(234, 88, 12, 0.35));
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.lj-closing-wrap:hover .lj-paper-airplane {
  transform: translate(4px, -4px) rotate(3deg);
}

.lj-closing-card {
  background: #FFFFFF !important;
  border: 1.5px solid #FF7A30;
  border-radius: 20px;
  box-shadow: 
    0 8px 24px -4px rgba(249, 115, 22, 0.12),
    0 2px 8px rgba(0, 0, 0, 0.04);
  padding: 18px 44px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  max-width: 580px;
  width: 100%;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.lj-closing-card:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 30px -4px rgba(249, 115, 22, 0.16);
}

.lj-closing-pill {
  background: #FED7AA;
  color: #7C2D12;
  font-family: var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif);
  font-size: 13px;
  font-weight: 800;
  border-radius: 999px;
  padding: 4px 16px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

.lj-closing-text {
  font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
  font-size: 14.5px;
  font-style: italic;
  font-weight: 600;
  color: #18181B;
  margin: 0 0 6px 0;
}

.lj-closing-smile {
  display: flex;
  justify-content: center;
}

/* --------------------------------------------------------------------------
   7. RESPONSIVE BREAKPOINTS
   -------------------------------------------------------------------------- */
@media (max-width: 768px) {
  .lj-main-heading {
    font-size: 2.3rem;
  }

  .lj-heading-doodle-left svg,
  .lj-heading-doodle-right svg {
    width: 22px;
  }

  .lj-item {
    flex-direction: column !important;
    max-width: 440px;
    margin: 0 auto;
  }

  .lj-item-left-ill .lj-illustration-wrap,
  .lj-item-right-ill .lj-illustration-wrap {
    margin: 0 auto -28px auto !important;
  }

  .lj-item-left-ill .lj-card,
  .lj-item-right-ill .lj-card {
    width: 100% !important;
    padding: 42px 22px 22px 22px !important;
    text-align: center !important;
  }

  .lj-card-pill {
    margin: 0 auto 10px auto !important;
  }

  .lj-circle-disc {
    width: 136px;
    height: 136px;
  }

  .lj-timeline-connector {
    height: 40px;
  }

  .lj-closing-wrap {
    padding: 0 12px;
  }

  .lj-closing-card {
    padding: 16px 20px;
  }

  .lj-paper-airplane {
    left: 8%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lj-circle-disc,
  .lj-card,
  .lj-closing-card,
  .lj-paper-airplane {
    transition: none !important;
  }
}"""

# Locate start and end in styles.css
start_marker = "#experience.futuristic-journey-section,"
end_marker = "/* ==========================================================================\n   CREATIVE HOBBIES & PINTEREST SCRAPBOOK SECTION"

start_idx = css_content.find(start_marker)
end_idx = css_content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    updated_css = css_content[:start_idx] + new_css + "\n\n" + css_content[end_idx:]
    with open('/app/applet/styles.css', 'w', encoding='utf-8') as f:
        f.write(updated_css)
    print("styles.css updated successfully!")
else:
    print(f"Error finding markers in styles.css: start={start_idx}, end={end_idx}")

# 2. Update index.html
with open('/app/applet/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

new_html = """  <!-- =======================================================================
       MY LEARNING JOURNEY — EDITORIAL INFOGRAPHIC REDESIGN
       Faithful Reproduction of Reference Image:
       Orange Accent System • Alternating 4-Section Timeline • 3D Circular Discs
       Rounded Orange-Bordered Cards • Origami Paper Airplane • Connecting Spine
       ======================================================================= -->
  <section id="experience" class="futuristic-journey-section" aria-label="Learning Journey" data-section="learning-journey">
    <span id="learning-journey" class="section-hash-anchor" aria-hidden="true"></span>

    <div class="learning-journey-container lj-editorial-container">

      <!-- EDITORIAL HEADER -->
      <div class="lj-editorial-header reveal">
        <div class="lj-pill-badge">
          <span>My Growth Story</span>
        </div>
        <h2 class="lj-main-heading">
          <span class="lj-heading-doodle-left" aria-hidden="true">
            <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
              <path d="M4 14L1 15M8 7L5 4M14 4L14 1" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="lj-text-dark">My Learning</span>
          <span class="lj-text-orange">Journey</span>
          <span class="lj-heading-doodle-right" aria-hidden="true">
            <svg width="34" height="20" viewBox="0 0 34 20" fill="none">
              <path d="M2 14C12 8 24 6 32 10M8 18C16 14 26 13 32 16" stroke="#18181B" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
        </h2>
        <div class="lj-heading-underline" aria-hidden="true">
          <svg width="180" height="14" viewBox="0 0 180 14" fill="none">
            <path d="M4 8C48 3 132 3 176 9" stroke="#FF7A30" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="lj-supporting-text">
          A continuous journey of curiosity, code and creativity... <span class="lj-rocket" aria-hidden="true">🚀</span>
        </p>
      </div>

      <!-- MAIN TIMELINE (FOUR EXACT SECTIONS) -->
      <div class="lj-editorial-timeline">

        <!-- SECTION 01 — THE BEGINNING / FRONTEND DEVELOPMENT (Illustration LEFT, Card RIGHT) -->
        <div class="lj-item lj-item-left-ill reveal">
          <div class="lj-illustration-wrap">
            <div class="lj-ill-dashes lj-dashes-top-left" aria-hidden="true">
              <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
                <path d="M6 18L1 17M10 9L6 5M18 6L18 1" stroke="#F97316" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="lj-circle-disc">
              <svg viewBox="0 0 180 180" class="lj-ill-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Glossy 3D Disc Highlights -->
                <ellipse cx="90" cy="40" rx="55" ry="24" fill="white" fill-opacity="0.18"/>
                
                <!-- 3D Laptop Body -->
                <!-- Keyboard Base in metallic silver -->
                <path d="M 28 126 L 152 126 C 158 126, 166 134, 168 142 L 170 145 C 171 148, 168 150, 164 150 L 16 150 C 12 150, 9 148, 10 145 L 12 142 C 14 134, 22 126, 28 126 Z" fill="#E2E8F0"/>
                <path d="M 10 145 L 170 145 L 168 150 L 12 150 Z" fill="#CBD5E1"/>
                <!-- Trackpad -->
                <rect x="74" y="132" width="32" height="13" rx="2.5" fill="#CBD5E1" stroke="#94A3B8" stroke-width="0.8"/>
                
                <!-- Laptop Screen Frame -->
                <rect x="34" y="52" width="112" height="76" rx="8" fill="#18181B" stroke="#27272A" stroke-width="2"/>
                <!-- Screen Bezel Glare -->
                <path d="M 36 56 L 144 56 L 144 62 L 36 62 Z" fill="white" fill-opacity="0.08"/>
                <!-- Inner Screen Display -->
                <rect x="40" y="58" width="100" height="64" rx="4" fill="#090D16"/>
                
                <!-- Code Symbol on Screen </ > in Glowing White -->
                <path d="M 74 80 L 62 90 L 74 100" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M 106 80 L 118 90 L 106 100" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="94" y1="76" x2="86" y2="104" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round"/>

                <!-- Floating Technology Badges around Laptop -->
                <!-- HTML Badge -->
                <g transform="translate(122, 42)">
                  <rect width="44" height="22" rx="6" fill="#EA580C" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.25))"/>
                  <text x="22" y="15" text-anchor="middle" fill="#FFFFFF" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="900" letter-spacing="0.5">HTML</text>
                </g>
                <!-- CSS Badge -->
                <g transform="translate(136, 70)">
                  <rect width="38" height="20" rx="5.5" fill="#18181B" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.25))"/>
                  <text x="19" y="14" text-anchor="middle" fill="#FFFFFF" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="10.5" font-weight="900" letter-spacing="0.5">CSS</text>
                </g>
                <!-- JS Badge -->
                <g transform="translate(128, 96)">
                  <rect width="32" height="19" rx="5" fill="#FFFFFF" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.22))"/>
                  <text x="16" y="14" text-anchor="middle" fill="#18181B" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="900" letter-spacing="0.5">JS</text>
                </g>

                <!-- Little Sparkle Accents -->
                <path d="M 122 84 L 126 84 M 124 82 L 124 86" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div class="lj-card">
            <span class="lj-card-pill">2025 – The Beginning</span>
            <h3 class="lj-card-title">Frontend Development</h3>
            <p class="lj-card-desc">
              I started my development journey with the core web technologies — <strong>HTML, CSS</strong> and <strong>JavaScript</strong>, and later mastered <strong>Tailwind CSS</strong> and <strong>GSAP</strong> to build stunning, interactive experiences.
            </p>
          </div>
        </div>

        <!-- TIMELINE CONNECTOR 1 -> 2 -->
        <div class="lj-timeline-connector" aria-hidden="true">
          <div class="lj-connector-line"></div>
          <div class="lj-connector-node"></div>
          <div class="lj-connector-line"></div>
        </div>

        <!-- SECTION 02 — VERSION CONTROL (Card LEFT, Illustration RIGHT) -->
        <div class="lj-item lj-item-right-ill reveal">
          <div class="lj-card">
            <span class="lj-card-pill">Version Control</span>
            <h3 class="lj-card-title">Git &amp; GitHub</h3>
            <p class="lj-card-desc">
              Learned to track my changes, collaborate and manage projects like a pro.
            </p>
          </div>
          <div class="lj-illustration-wrap">
            <div class="lj-ill-dashes lj-dashes-top-right" aria-hidden="true">
              <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
                <path d="M26 18L31 17M22 9L26 5M14 6L14 1" stroke="#F97316" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="lj-circle-disc">
              <svg viewBox="0 0 180 180" class="lj-ill-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Glossy Highlight -->
                <ellipse cx="90" cy="40" rx="55" ry="24" fill="white" fill-opacity="0.18"/>

                <!-- GitHub Mascot Octocat (Pure White Silhouette) -->
                <path d="M90 38 C62 38 40 60 40 88 C40 110 54 129 74 136 C76.5 136.5 77.5 135.5 77.5 134 L77.5 125 C63.5 128 61 118 61 118 C59 113 55.5 111.5 55.5 111.5 C51 108.5 56 108.5 56 108.5 C61 109 63.5 113.5 63.5 113.5 C68 121 75 119 77.5 117.5 C78 114 79.5 112 81 110.5 C70 109.5 58 105 58 86 C58 80.5 60 76 63.5 72.5 C63 71.5 61 66 64 59.5 C64 59.5 68 58 77.5 64.5 C81.5 63.5 86 63 90 63 C94 63 98.5 63.5 102.5 64.5 C112 58 116 59.5 116 59.5 C119 66 117 71.5 116.5 72.5 C120 76 122 80.5 122 86 C122 105 110 109.5 99 110.5 C101 112.5 102.5 116 102.5 120.5 L102.5 134 C102.5 135.5 103.5 136.5 106 136 C126 129 140 110 140 88 C140 60 118 38 90 38 Z" fill="#FFFFFF" filter="drop-shadow(0 6px 14px rgba(0,0,0,0.22))"/>

                <!-- Curved cable / wire extending on left -->
                <path d="M 46 118 C 36 122, 28 114, 34 104 C 38 98, 44 104, 52 110" stroke="#18181B" stroke-width="2.5" stroke-linecap="round"/>

                <!-- Terminal Badge in Lower Right with >_ -->
                <g transform="translate(112, 108)">
                  <rect width="50" height="38" rx="8" fill="#18181B" stroke="#27272A" stroke-width="1.5" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.32))"/>
                  <text x="14" y="25" fill="#FFFFFF" font-family="'JetBrains Mono', 'Fira Code', monospace" font-size="19" font-weight="800">&gt;_</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        <!-- TIMELINE CONNECTOR 2 -> 3 -->
        <div class="lj-timeline-connector" aria-hidden="true">
          <div class="lj-connector-line"></div>
          <div class="lj-connector-node"></div>
          <div class="lj-connector-line"></div>
        </div>

        <!-- SECTION 03 — AI & PROMPT ENGINEERING (Illustration LEFT, Card RIGHT) -->
        <div class="lj-item lj-item-left-ill reveal">
          <div class="lj-illustration-wrap">
            <div class="lj-ill-dashes lj-dashes-top-left" aria-hidden="true">
              <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
                <path d="M6 18L1 17M10 9L6 5M18 6L18 1" stroke="#F97316" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="lj-circle-disc">
              <svg viewBox="0 0 180 180" class="lj-ill-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Glossy Highlight -->
                <ellipse cx="90" cy="40" rx="55" ry="24" fill="white" fill-opacity="0.18"/>

                <!-- Friendly White Robot -->
                <!-- Robot Antenna -->
                <line x1="88" y1="46" x2="88" y2="34" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>
                <circle cx="88" cy="32" r="4.5" fill="#FF8A3D" stroke="#FFFFFF" stroke-width="1.5"/>

                <!-- Robot Head Capsule -->
                <rect x="48" y="46" width="80" height="66" rx="30" fill="#FFFFFF" filter="drop-shadow(0 8px 16px rgba(0,0,0,0.22))"/>
                
                <!-- Robot Ear Caps -->
                <rect x="42" y="66" width="10" height="24" rx="5" fill="#CBD5E1"/>
                <rect x="124" y="66" width="10" height="24" rx="5" fill="#CBD5E1"/>

                <!-- Face Screen / Visor -->
                <rect x="56" y="56" width="64" height="42" rx="18" fill="#18181B"/>

                <!-- Cute Cheerful Curved Eyes ^ ^ in Glowing White -->
                <path d="M 68 76 C 70 70, 76 70, 78 76" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" fill="none"/>
                <path d="M 98 76 C 100 70, 106 70, 108 76" stroke="#FFFFFF" stroke-width="3.2" stroke-linecap="round" fill="none"/>

                <!-- Robot Body & Hands Typing on Dark Laptop -->
                <!-- Body -->
                <path d="M 64 116 C 64 110, 112 110, 112 116 L 118 152 L 58 152 Z" fill="#FFFFFF"/>
                <!-- Laptop -->
                <g transform="translate(62, 112)">
                  <!-- Screen -->
                  <rect x="10" y="0" width="46" height="32" rx="4" fill="#18181B" stroke="#27272A" stroke-width="1.2"/>
                  <circle cx="33" cy="16" r="3" fill="#60A5FA" fill-opacity="0.8"/>
                  <!-- Base -->
                  <polygon points="4,32 62,32 66,38 0,38" fill="#CBD5E1"/>
                </g>

                <!-- Floating Dark Speech Bubble with AI -->
                <g transform="translate(112, 36)">
                  <rect width="40" height="26" rx="8" fill="#18181B" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"/>
                  <!-- Little pointer arrow on bubble -->
                  <polygon points="8,24 16,24 6,32" fill="#18181B"/>
                  <text x="20" y="18" text-anchor="middle" fill="#FFFFFF" font-family="'Outfit', 'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="900" letter-spacing="1">AI</text>
                </g>

                <!-- Radiant Sparkle / Energy Dashes -->
                <path d="M 40 54 L 34 50 M 38 68 L 32 68" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                <path d="M 136 50 L 142 46 M 140 64 L 146 64" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
          <div class="lj-card">
            <span class="lj-card-pill">AI &amp; Prompt Engineering</span>
            <h3 class="lj-card-title">Exploring AI</h3>
            <p class="lj-card-desc">
              Dived into the world of AI — learned prompt engineering and got hands-on with powerful tools like <strong>Claude, Bolt</strong> and <strong>Lovable</strong> to build smarter and faster.
            </p>
          </div>
        </div>

        <!-- TIMELINE CONNECTOR 3 -> 4 -->
        <div class="lj-timeline-connector" aria-hidden="true">
          <div class="lj-connector-line"></div>
          <div class="lj-connector-node"></div>
          <div class="lj-connector-line"></div>
        </div>

        <!-- SECTION 04 — BACKEND DEVELOPMENT (Card LEFT, Illustration RIGHT) -->
        <div class="lj-item lj-item-right-ill reveal">
          <div class="lj-card">
            <span class="lj-card-pill">Backend &amp; Beyond</span>
            <h3 class="lj-card-title">Backend Development</h3>
            <p class="lj-card-desc">
              Currently exploring backend development to build full-stack applications and go beyond.
            </p>
          </div>
          <div class="lj-illustration-wrap">
            <div class="lj-ill-dashes lj-dashes-top-right" aria-hidden="true">
              <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
                <path d="M26 18L31 17M22 9L26 5M14 6L14 1" stroke="#F97316" stroke-width="2.5" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="lj-circle-disc">
              <svg viewBox="0 0 180 180" class="lj-ill-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Glossy Highlight -->
                <ellipse cx="90" cy="40" rx="55" ry="24" fill="white" fill-opacity="0.18"/>

                <!-- 3D Stacked Database Cylinders -->
                <!-- Disk 3 (Bottom) -->
                <g transform="translate(42, 94)">
                  <path d="M 0 14 C 0 24, 64 24, 64 14 L 64 26 C 64 36, 0 36, 0 26 Z" fill="#0F172A"/>
                  <ellipse cx="32" cy="14" rx="32" ry="12" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
                  <circle cx="12" cy="24" r="2.5" fill="#38BDF8"/>
                  <line x1="22" y1="24" x2="48" y2="24" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
                </g>

                <!-- Disk 2 (Middle) -->
                <g transform="translate(42, 72)">
                  <path d="M 0 14 C 0 24, 64 24, 64 14 L 64 26 C 64 36, 0 36, 0 26 Z" fill="#0F172A"/>
                  <ellipse cx="32" cy="14" rx="32" ry="12" fill="#1E293B" stroke="#334155" stroke-width="1.5"/>
                  <circle cx="12" cy="24" r="2.5" fill="#38BDF8"/>
                  <line x1="22" y1="24" x2="48" y2="24" stroke="#475569" stroke-width="2" stroke-linecap="round"/>
                </g>

                <!-- Disk 1 (Top) -->
                <g transform="translate(42, 50)">
                  <path d="M 0 14 C 0 24, 64 24, 64 14 L 64 26 C 64 36, 0 36, 0 26 Z" fill="#0F172A"/>
                  <ellipse cx="32" cy="14" rx="32" ry="12" fill="#334155" stroke="#475569" stroke-width="1.5"/>
                  <circle cx="12" cy="24" r="2.5" fill="#38BDF8"/>
                  <line x1="22" y1="24" x2="48" y2="24" stroke="#64748B" stroke-width="2" stroke-linecap="round"/>
                </g>

                <!-- Crisp White Mechanical Gear in Front Right -->
                <g transform="translate(98, 92)" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.3))">
                  <!-- 8-Teeth Gear -->
                  <path d="M 28 4 L 34 4 L 35 10 L 41 12 L 46 8 L 50 12 L 46 17 L 48 23 L 54 24 L 54 30 L 48 31 L 46 37 L 50 42 L 46 46 L 41 42 L 35 44 L 34 50 L 28 50 L 27 44 L 21 42 L 16 46 L 12 42 L 16 37 L 14 31 L 8 30 L 8 24 L 14 23 L 16 17 L 12 12 L 16 8 L 21 12 L 27 10 Z" fill="#FFFFFF"/>
                  <circle cx="31" cy="27" r="9" fill="#E2E8F0"/>
                  <circle cx="31" cy="27" r="6" fill="#1E293B"/>
                </g>

                <!-- Terminal / Code Badge in Upper Right with </> -->
                <g transform="translate(118, 64)">
                  <rect width="44" height="34" rx="7" fill="#18181B" stroke="#27272A" stroke-width="1.5" filter="drop-shadow(0 6px 12px rgba(0,0,0,0.3))"/>
                  <!-- 3 dots on top -->
                  <circle cx="8" cy="8" r="1.5" fill="#EF4444"/>
                  <circle cx="14" cy="8" r="1.5" fill="#F59E0B"/>
                  <circle cx="20" cy="8" r="1.5" fill="#10B981"/>
                  <!-- </> in white -->
                  <path d="M 14 18 L 10 22 L 14 26" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M 24 18 L 28 22 L 24 26" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <line x1="20" y1="16" x2="18" y2="28" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round"/>
                </g>
              </svg>
            </div>
          </div>
        </div>

      </div><!-- /.lj-editorial-timeline -->

      <!-- TIMELINE CONNECTOR 4 -> CLOSING -->
      <div class="lj-timeline-connector" aria-hidden="true">
        <div class="lj-connector-line"></div>
        <div class="lj-connector-node"></div>
        <div class="lj-connector-line"></div>
      </div>

      <!-- BOTTOM CLOSING ELEMENT (Paper Airplane + Loop Flight Path) -->
      <div class="lj-closing-wrap reveal">
        <div class="lj-closing-flight" aria-hidden="true">
          <svg class="lj-airplane-flight-svg" viewBox="0 0 740 120" fill="none">
            <!-- Left loop flight path -->
            <path d="M 40 105 C 15 95, 12 50, 48 42 C 86 35, 102 108, 62 114 C 28 118, 62 72, 128 66 L 168 64" stroke="#18181B" stroke-width="1.8" stroke-dasharray="5 5" stroke-linecap="round"/>
            <!-- Right loop flight path -->
            <path d="M 572 64 C 632 66, 674 95, 654 110 C 624 120, 604 48, 646 42 C 688 38, 715 78, 698 96" stroke="#18181B" stroke-width="1.8" stroke-dasharray="5 5" stroke-linecap="round"/>
          </svg>
          <div class="lj-paper-airplane">
            <svg width="48" height="42" viewBox="0 0 54 46" fill="none">
              <!-- 3D Folded Orange Origami Paper Airplane -->
              <polygon points="50,4 4,24 24,28" fill="#FF8A3D"/>
              <polygon points="50,4 24,28 34,42" fill="#EA580C"/>
              <polygon points="50,4 34,42 42,26" fill="#F97316"/>
              <polygon points="24,28 34,42 28,34" fill="#C2410C"/>
            </svg>
          </div>
        </div>

        <div class="lj-closing-card">
          <div class="lj-closing-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
            <span>The Journey Continues...</span>
          </div>
          <p class="lj-closing-text">Learning never stops, and this is just the beginning!</p>
          <div class="lj-closing-smile" aria-hidden="true">
            <svg width="74" height="12" viewBox="0 0 74 12" fill="none">
              <path d="M 4 4 C 26 10, 48 10, 70 4" stroke="#FF7A30" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
          </div>
        </div>
      </div>

    </div><!-- /.learning-journey-container -->
  </section>"""

# Locate start and end in index.html
html_start_marker = '<section id="experience" class="futuristic-journey-section"'
html_end_marker = '<!-- =======================================================================\n       KIND WORDS ABOUT WORKING WITH ME — TESTIMONIALS & REVIEWS SECTION'

h_start = html_content.find(html_start_marker)
h_end = html_content.find(html_end_marker)

if h_start != -1 and h_end != -1:
    # Find the closing </section> right before html_end_marker
    updated_html = html_content[:h_start] + new_html + "\n\n  " + html_content[h_end:]
    with open('/app/applet/index.html', 'w', encoding='utf-8') as f:
        f.write(updated_html)
    print("index.html updated successfully!")
else:
    print(f"Error finding markers in index.html: start={h_start}, end={h_end}")
