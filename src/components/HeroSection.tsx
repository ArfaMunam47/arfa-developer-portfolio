import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { TiltedGridHero } from '../../components/ui/tilted-grid-hero';
import { playTactileClick } from '../utils/audio';

export const HeroSection: React.FC = () => {
  const [enlargeModalOpen, setEnlargeModalOpen] = useState(false);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const circleCoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && enlargeModalOpen) {
        setEnlargeModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargeModalOpen]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!spotlightRef.current || !circleCoreRef.current) return;
    const rect = circleCoreRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlightRef.current.style.opacity = '1';
    spotlightRef.current.style.transform = `translate3d(${x - 120}px, ${y - 120}px, 0)`;
  };

  const handlePointerLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
  };

  const openEnlargedModal = () => {
    playTactileClick(760, 'triangle');
    setEnlargeModalOpen(true);
  };

  return (
    <section id="hero" className="editorial-poster-hero" aria-label="Hero Section">
      {/* Background Ambient Hues */}
      <div className="hero-canvas-decor" aria-hidden="true">
        <div className="ambient-glow glow-peach"></div>
        <div className="ambient-glow glow-teal"></div>
        <div className="ambient-subtle-grain"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-poster-grid">
          {/* LEFT: EDITORIAL POSTER TYPOGRAPHY */}
          <div className="hero-typography-column reveal visible">
            <div className="hero-eyebrow-container">
              <div className="hero-eyebrow-pill">
                <span className="eyebrow-sparkle-icon" aria-hidden="true">✦</span>
                <span className="eyebrow-text">DESIGNING DIGITAL EXPERIENCES</span>
              </div>
            </div>

            <div className="hero-name-poster-wrap" aria-label={PORTFOLIO_DATA.personal.name}>
              <h1 className="hero-editorial-brand-name">
                <span className="name-row name-row-arfa">
                  <span className="name-text">ARFA</span>
                  <span className="name-accent-star" aria-hidden="true">✦</span>
                </span>
                <span className="name-row name-row-munam">
                  <span className="name-text">MUNAM</span>
                </span>
              </h1>
            </div>

            {/* 3 Role Badges */}
            <div className="hero-identities-bar">
              <div className="identities-pill-container">
                <div className="hero-role-pill role-pill-frontend">
                  <svg className="role-badge-icon icon-code" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <strong className="role-pill-text">FRONT-END DEVELOPER</strong>
                </div>

                <div className="hero-role-pill role-pill-prompt">
                  <svg className="role-badge-icon icon-prompt" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>
                  </svg>
                  <strong className="role-pill-text">PROMPT ENGINEER</strong>
                </div>

                <div className="hero-role-pill role-pill-ai">
                  <svg className="role-badge-icon icon-ai" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="3"></circle>
                    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)"></ellipse>
                    <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)"></ellipse>
                  </svg>
                  <strong className="role-pill-text">AI ENTHUSIAST</strong>
                </div>
              </div>
            </div>

            {/* Tagline & Script Touch */}
            <div className="hero-tagline-group">
              <p className="hero-primary-tagline">
                Building bold interfaces. Crafting intelligent experiences.
              </p>
              <p className="hero-script-touch">
                Design that connects. Experiences that work.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="hero-cta-action-row">
              <a
                href="#projects"
                className="btn-editorial-primary tactile-btn"
                onClick={() => playTactileClick(720, 'sine')}
              >
                <span>VIEW MY WORK</span>
                <span className="btn-arrow" aria-hidden="true">↗</span>
              </a>
              <a
                href="#contact"
                className="btn-editorial-secondary tactile-btn"
                onClick={() => playTactileClick(640, 'sine')}
              >
                <span>LET'S CONNECT</span>
              </a>
            </div>

            {/* Editorial Micro Meta Footer */}
            <div className="hero-editorial-meta">
              <div className="editorial-meta-node">
                <span className="meta-status-beacon" aria-hidden="true"></span>
                <span>AI × WEB × DESIGN</span>
              </div>
              <div className="editorial-meta-sep" aria-hidden="true">/</div>
              <div className="editorial-meta-node">
                <span>CREATIVE FRONTEND</span>
              </div>
              <div className="editorial-meta-sep" aria-hidden="true">/</div>
              <div className="editorial-meta-node">
                <span>OPEN FOR COLLABORATION</span>
              </div>
            </div>
          </div>

          {/* RIGHT: HERO PORTRAIT STAGE */}
          <div className="hero-visual-column reveal visible">
            <div className="hero-creative-visual-stage">
              <div
                className="hero-portrait-composition-wrap cursor-pointer"
                role="region"
                aria-label="Portrait of Arfa Munam - Click to enlarge"
                onClick={openEnlargedModal}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                {/* Circular Backdrop with Living Spotlight */}
                <div className="hero-portrait-circle-backdrop" aria-hidden="true">
                  <div className="hero-backdrop-soft-glow"></div>
                  <div className="hero-backdrop-circle-core" ref={circleCoreRef}>
                    <div
                      className="hero-living-spotlight"
                      ref={spotlightRef}
                      style={{ opacity: 0, transition: 'opacity 0.25s ease' }}
                    ></div>
                  </div>
                  <div className="hero-backdrop-circle-ring">
                    <div className="hero-ring-accents" aria-hidden="true">
                      <div className="ring-flare flare-1">
                        <svg viewBox="0 0 32 32" fill="none" className="flare-svg">
                          <circle cx="16" cy="16" r="3" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <div className="ring-flare flare-2">
                        <svg viewBox="0 0 32 32" fill="none" className="flare-svg">
                          <circle cx="16" cy="16" r="2.8" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <div className="ring-flare flare-3">
                        <svg viewBox="0 0 36 36" fill="none" className="flare-svg">
                          <circle cx="18" cy="18" r="3.2" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <div className="ring-flare flare-4">
                        <svg viewBox="0 0 32 32" fill="none" className="flare-svg">
                          <circle cx="16" cy="16" r="2.8" fill="#FFFFFF" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Girl Cutout Portrait */}
                <div className="hero-portrait-main-wrapper">
                  <img
                    src="port.png"
                    alt="Arfa Munam — Creative Developer"
                    className="hero-portrait-cutout-img hero-portrait-main-img"
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'portrait-cutout.png';
                    }}
                  />
                </div>

                {/* Small Circular Chest Badge displaying mine.png */}
                <div className="hero-small-circle-frame" aria-hidden="true">
                  <img
                    src="mine.png"
                    alt="Arfa Munam portrait"
                    className="hero-small-circle-img"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = 'mine.jpeg';
                    }}
                  />
                </div>

                {/* Cursor-Activated Creative Message Group */}
                <div className="hero-hover-creative-group" aria-hidden="true">
                  <div className="creative-script-headline">
                    <span className="script-line-1">Crafting</span>
                    <span className="script-line-2">Ideas</span>
                  </div>
                  <p className="creative-supporting-sub">Building the Future.</p>
                  <div className="creative-sparkle-symbol" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="#FF7A1A" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Tilted Grid Streaming Ribbon */}
      <div className="w-full mt-10">
        <TiltedGridHero
          items={PORTFOLIO_DATA.projects.map((p) => ({
            id: p.id,
            image: p.image || 'portfolio.png',
            title: p.title,
            subtitle: p.categoryLabel,
            href: `#projects`
          }))}
          tileWidth={340}
          tileHeight={220}
          slices={12}
          tiltAngle={10}
        />
      </div>

      {/* Dedicated Cinematic Enlarged Portrait Modal */}
      {enlargeModalOpen && (
        <div
          className="hero-portrait-enlarge-modal active"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged Portrait of Arfa Munam"
        >
          <div
            className="enlarge-modal-backdrop"
            onClick={() => setEnlargeModalOpen(false)}
          ></div>
          <div className="enlarge-modal-dialog">
            <button
              type="button"
              className="enlarge-modal-close-btn"
              onClick={() => setEnlargeModalOpen(false)}
              aria-label="Close enlarged portrait"
            >
              <span className="close-icon">✕</span>
              <span className="close-text">Close</span>
            </button>

            <div className="enlarge-portrait-stage">
              <div className="enlarge-aura-disc disc-coral" aria-hidden="true"></div>
              <div className="enlarge-aura-disc disc-cyan" aria-hidden="true"></div>
              <div className="enlarge-aura-disc disc-purple" aria-hidden="true"></div>
              <div className="enlarge-aura-glow" aria-hidden="true"></div>

              <div className="enlarge-image-wrapper">
                <img
                  src="me.png"
                  alt="Arfa Munam — Creative Developer"
                  className="enlarge-portrait-img"
                  loading="eager"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'port.png';
                  }}
                />
              </div>
            </div>

            <div className="enlarge-modal-footer">
              <span className="enlarge-footer-hint">Click backdrop or press <kbd>Esc</kbd> to return</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
