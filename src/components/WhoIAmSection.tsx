import React, { useState } from 'react';
import { playTactileClick } from '../utils/audio';

export const WhoIAmSection: React.FC = () => {
  const [activePerspective, setActivePerspective] = useState<'philosophy' | 'ai' | 'architecture' | 'collaboration'>('philosophy');
  const [copiedBio, setCopiedBio] = useState(false);

  const perspectives = {
    philosophy: {
      p1: "I am a Computer Science student, frontend developer, and prompt engineer who believes the highest form of engineering elegance lives where rigorous computer science fundamentals intersect with generative intelligence.",
      p2: "Rather than treating AI as an automated shortcut, I utilize modern LLMs as a precision force multiplier—chaining deterministic prompts, structured schema validations, and rapid iterations to build human-first web applications.",
      quote: "“I don't just learn syntax; I build working products to understand how systems come alive in the hands of real users.”"
    },
    ai: {
      p1: "My prompt engineering methodology is grounded in deterministic reasoning chains, strict JSON schema output formatting, and context-window optimization across Claude 3.7, Gemini 2.5, and OpenAI systems.",
      p2: "From architecting automated Leitner spaced-repetition loops in StudyPilot-AI to constructing zero-hallucination document synthesis workflows, I engineer prompt architectures with the same discipline applied to backend microservices.",
      quote: "“Prompt engineering isn't guessing words—it's establishing deterministic reasoning constraints and testable mental models.”"
    },
    architecture: {
      p1: "Every interface I author adheres to strict semantic HTML5 hierarchies, zero cumulative layout shift (CLS), tactile 60 FPS CSS micro-interactions, and comprehensive WCAG AA accessibility compliance.",
      p2: "I design resilient client-side state machines, sub-millisecond cart calculations, and responsive mobile-first grid systems that load instantaneously without heavy dependencies or layout jank.",
      quote: "“True craftsmanship lies in the details users never see: pristine semantics, sub-millisecond responsiveness, and resilient state machines.”"
    },
    collaboration: {
      p1: "I excel in agile cross-functional environments, translating Figma component systems into production TypeScript code with clear Git commit histories and comprehensive README documentation.",
      p2: "Whether pair programming on complex state management or structuring autonomous N8N workflow automations, I bring disciplined communication, curiosity, and rapid execution to every sprint.",
      quote: "“Great software is born at the intersection of clear human communication, structured iteration, and ruthless simplicity.”"
    }
  };

  const handlePerspectiveChange = (key: 'philosophy' | 'ai' | 'architecture' | 'collaboration') => {
    playTactileClick(680, 'sine');
    setActivePerspective(key);
  };

  const handleCopyBio = async () => {
    playTactileClick(850, 'triangle');
    const executiveBio = `Arfa Munam — Computer Science Student, Frontend Developer & Prompt Engineer.\nSpecializing in high-performance web systems, accessible micro-interactions, and deterministic LLM reasoning chains.\nGitHub: https://github.com/ArfaMunam47 • Email: arfamunam01@gmail.com`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(executiveBio);
      }
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2400);
    } catch {
      setCopiedBio(true);
      setTimeout(() => setCopiedBio(false), 2400);
    }
  };

  const currentData = perspectives[activePerspective];

  return (
    <section id="about" className="who-story-section" aria-label="Who I Am — Arfa Munam Personal Story & Development Path">
      {/* Atmosphere */}
      <div className="who-atmosphere" aria-hidden="true">
        <div className="who-glow-blob glow-coral-left"></div>
        <div className="who-glow-blob glow-cyan-center"></div>
        <div className="who-glow-blob glow-purple-right"></div>
        <div className="who-glow-blob glow-mint-right"></div>
        <div className="who-aurora-mesh"></div>
      </div>

      {/* Floating 3D Objects */}
      <div className="who-floating-space" aria-hidden="true">
        <div className="spatial-3d-orb spatial-orb-coral" title="Coral Creativity"></div>
        <div className="spatial-3d-orb spatial-orb-cyan" title="Interface Clarity"></div>
        <div className="spatial-3d-orb spatial-orb-purple" title="AI Frontier"></div>
        <div className="spatial-3d-orb spatial-orb-mint" title="Continuous Growth"></div>
        <div className="spatial-3d-ring spatial-ring-cyan"></div>
        <div className="spatial-3d-ring spatial-ring-coral"></div>
        <div className="spatial-sparkle-star spatial-star-amber">★</div>
        <div className="spatial-sparkle-star spatial-star-cyan">✦</div>
      </div>

      <div className="container who-story-container">
        <div className="who-editorial-layout">
          {/* LEFT COLUMN: Hook, Introduction, Three Pillars */}
          <div className="who-story-left-col">
            <div className="who-kicker-wrap reveal visible">
              <div className="who-kicker-badge">
                <span className="who-kicker-num">02</span>
                <span className="who-kicker-spark">✦</span>
                <span className="who-kicker-text">WHO I AM</span>
              </div>
            </div>

            <h2 className="who-main-hook reveal visible">
              I turn <span className="hook-ideas-highlight">ideas</span> into digital experiences people love.
            </h2>

            <div className="who-intro-block reveal visible">
              <p className="who-intro-text">
                I’m a Computer Science undergraduate who enjoys crafting beautiful interfaces and exploring how AI can make the web smarter, faster, and more human.
              </p>

              <div className="who-identities-line">
                <span className="identity-chip identity-chip-fe">
                  <span className="id-dot id-dot-coral"></span>FRONT-END DEVELOPER
                </span>
                <span className="identity-chip identity-chip-pe">
                  <span className="id-dot id-dot-cyan"></span>PROMPT ENGINEER
                </span>
                <span className="identity-chip identity-chip-ai">
                  <span className="id-dot id-dot-purple"></span>AI ENTHUSIAST
                </span>
              </div>
            </div>

            {/* Three Personal Pillars */}
            <div className="who-pillars-group reveal visible">
              {/* Pillar 01: I CODE */}
              <div
                className="pillar-tile-obj pillar-coral"
                onMouseEnter={() => playTactileClick(720, 'sine')}
              >
                <div className="pillar-tile-glow"></div>
                <div className="pillar-icon-badge">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <div className="pillar-content">
                  <div className="pillar-header">
                    <span className="pillar-num">01</span>
                    <span className="pillar-divider">—</span>
                    <h3 className="pillar-title">I CODE</h3>
                  </div>
                  <p className="pillar-desc">Writing clean, responsive front-end experiences.</p>
                </div>
                <div className="pillar-3d-graphic graphic-code" aria-hidden="true">
                  <div className="mini-window-3d">
                    <div className="mini-window-top">
                      <span className="w-dot w-dot-red"></span>
                      <span className="w-dot w-dot-yellow"></span>
                      <span className="w-dot w-dot-green"></span>
                    </div>
                    <div className="mini-window-body">
                      <span className="code-bracket">&lt;/&gt;</span>
                    </div>
                    <div className="mini-orb-coral"></div>
                  </div>
                </div>
              </div>

              {/* Pillar 02: I DESIGN */}
              <div
                className="pillar-tile-obj pillar-cyan"
                onMouseEnter={() => playTactileClick(760, 'sine')}
              >
                <div className="pillar-tile-glow"></div>
                <div className="pillar-icon-badge">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <div className="pillar-content">
                  <div className="pillar-header">
                    <span className="pillar-num">02</span>
                    <span className="pillar-divider">—</span>
                    <h3 className="pillar-title">I DESIGN</h3>
                  </div>
                  <p className="pillar-desc">Crafting thoughtful UI with aesthetic intent and rhythm.</p>
                </div>
                <div className="pillar-3d-graphic graphic-design" aria-hidden="true">
                  <div className="mini-palette-3d">
                    <div className="mini-swatch swatch-peach"></div>
                    <div className="mini-swatch swatch-mint"></div>
                    <div className="mini-swatch swatch-amber"></div>
                    <div className="mini-orb-cyan"></div>
                  </div>
                </div>
              </div>

              {/* Pillar 03: I EXPLORE */}
              <div
                className="pillar-tile-obj pillar-purple"
                onMouseEnter={() => playTactileClick(800, 'sine')}
              >
                <div className="pillar-tile-glow"></div>
                <div className="pillar-icon-badge">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                </div>
                <div className="pillar-content">
                  <div className="pillar-header">
                    <span className="pillar-num">03</span>
                    <span className="pillar-divider">—</span>
                    <h3 className="pillar-title">I EXPLORE</h3>
                  </div>
                  <p className="pillar-desc">Learning modern AI, prompt craft, and system architecture.</p>
                </div>
                <div className="pillar-3d-graphic graphic-explore" aria-hidden="true">
                  <div className="mini-cube-3d">
                    <div className="mini-cube-inner"></div>
                    <div className="mini-orb-purple"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Perspective Tabs, Bio Narratives & Copy Bio Button */}
          <div className="who-story-right-col reveal visible">
            <div className="about-perspective-card">
              <div className="about-perspective-tabs-header">
                <span className="perspective-badge-label">PERSPECTIVES //</span>
                <div className="about-story-tabs" id="about-perspective-tabs">
                  <button
                    type="button"
                    className={`about-story-tab ${activePerspective === 'philosophy' ? 'active' : ''}`}
                    onClick={() => handlePerspectiveChange('philosophy')}
                  >
                    Philosophy
                  </button>
                  <button
                    type="button"
                    className={`about-story-tab ${activePerspective === 'ai' ? 'active' : ''}`}
                    onClick={() => handlePerspectiveChange('ai')}
                  >
                    AI Mindset
                  </button>
                  <button
                    type="button"
                    className={`about-story-tab ${activePerspective === 'architecture' ? 'active' : ''}`}
                    onClick={() => handlePerspectiveChange('architecture')}
                  >
                    Craft
                  </button>
                  <button
                    type="button"
                    className={`about-story-tab ${activePerspective === 'collaboration' ? 'active' : ''}`}
                    onClick={() => handlePerspectiveChange('collaboration')}
                  >
                    Team
                  </button>
                </div>
              </div>

              <div className="about-story-body">
                <div className="about-quote-box">
                  <p className="about-quote-text" id="about-quote-text">
                    {currentData.quote}
                  </p>
                </div>

                <div className="about-narrative-paragraphs" id="about-story-text-container">
                  <p className="about-story-p">{currentData.p1}</p>
                  <p className="about-story-p">{currentData.p2}</p>
                </div>

                <div className="about-card-footer">
                  <button
                    type="button"
                    className="btn-copy-bio"
                    id="btn-copy-bio"
                    onClick={handleCopyBio}
                  >
                    <span>{copiedBio ? '✓ Bio Copied!' : 'Copy Executive Bio'}</span>
                    <span className="copy-icon">📋</span>
                  </button>

                  <a
                    href="Arfa-Munam-Resume.pdf"
                    download="Arfa-Munam-Resume.pdf"
                    className="about-resume-cta js-resume-link"
                    onClick={() => playTactileClick(700, 'sine')}
                  >
                    <span>Download CV (PDF)</span>
                    <span className="arrow-icon">↓</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
