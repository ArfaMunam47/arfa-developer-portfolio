import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const projects = PORTFOLIO_DATA.projects; // 6 curated projects in exact order
  const totalCards = projects.length;

  const [currentPos, setCurrentPos] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const posRef = useRef<number>(0);
  const targetPosRef = useRef<number>(0);
  const isTargetingRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  // Synchronize ref and state for currentPos and active index [0 .. totalCards - 1]
  const updatePos = useCallback((pos: number) => {
    posRef.current = pos;
    setCurrentPos(pos);
    const clampedIndex = Math.max(0, Math.min(totalCards - 1, Math.round(pos)));
    setActiveIndex(clampedIndex);
  }, [totalCards]);

  const navigateToProject = useCallback((targetIndex: number) => {
    playTactileClick(680, 'sine');
    targetPosRef.current = Math.max(0, Math.min(totalCards - 1, targetIndex));
    isTargetingRef.current = true;
  }, [totalCards]);

  // Main animation loop: smooth target snapping when settling, zero auto-drift
  useEffect(() => {
    const tick = () => {
      if (isTargetingRef.current) {
        const diff = targetPosRef.current - posRef.current;
        if (Math.abs(diff) < 0.001) {
          posRef.current = targetPosRef.current;
          isTargetingRef.current = false;
          updatePos(targetPosRef.current);
        } else {
          const next = posRef.current + diff * 0.14;
          updatePos(next);
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updatePos]);

  // Mouse Drag Gestures
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.project-view-action-btn') || (e.target as HTMLElement).closest('.carousel-arrow-btn')) return;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = posRef.current;
    isTargetingRef.current = false;
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - dragStartXRef.current;
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
      }
      const sensitivity = window.innerWidth <= 768 ? 320 : Math.min(window.innerWidth * 0.75, 1100);
      let newPos = dragStartPosRef.current - (deltaX / sensitivity);
      if (newPos < -0.3) {
        newPos = -0.3 + (newPos + 0.3) * 0.2;
      } else if (newPos > totalCards - 0.7) {
        const over = newPos - (totalCards - 0.7);
        newPos = (totalCards - 0.7) + over * 0.2;
      }
      updatePos(newPos);
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);

      if (hasDraggedRef.current) {
        // Settle smoothly into nearest project and stop completely
        targetPosRef.current = Math.max(0, Math.min(totalCards - 1, Math.round(posRef.current)));
        isTargetingRef.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [updatePos, totalCards]);

  // Mobile Touch Gestures
  const touchState = useRef({ startX: 0, startY: 0, isHorizontal: false });

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('.project-view-action-btn') || (e.target as HTMLElement).closest('.carousel-arrow-btn')) return;
    const touch = e.touches[0];
    touchState.current.startX = touch.clientX;
    touchState.current.startY = touch.clientY;
    touchState.current.isHorizontal = false;
    dragStartPosRef.current = posRef.current;
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    isTargetingRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchState.current.startX;
    const deltaY = touch.clientY - touchState.current.startY;

    if (!touchState.current.isHorizontal) {
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        touchState.current.isHorizontal = true;
      } else if (Math.abs(deltaY) > 8) {
        isDraggingRef.current = false;
        return;
      }
    }

    if (touchState.current.isHorizontal) {
      hasDraggedRef.current = true;
      const sensitivity = window.innerWidth <= 768 ? 300 : 450;
      let newPos = dragStartPosRef.current - (deltaX / sensitivity);
      if (newPos < -0.3) {
        newPos = -0.3 + (newPos + 0.3) * 0.2;
      } else if (newPos > totalCards - 0.7) {
        const over = newPos - (totalCards - 0.7);
        newPos = (totalCards - 0.7) + over * 0.2;
      }
      updatePos(newPos);
    }
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current && !hasDraggedRef.current) return;
    isDraggingRef.current = false;
    if (hasDraggedRef.current) {
      targetPosRef.current = Math.max(0, Math.min(totalCards - 1, Math.round(posRef.current)));
      isTargetingRef.current = true;
    }
  };

  // Card click: neighbor artwork brings itself to center; center artwork opens GitHub link
  const handleArtworkClick = (e: React.MouseEvent, index: number, project: Project) => {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }

    const currentActive = Math.max(0, Math.min(totalCards - 1, Math.round(posRef.current)));
    if (index !== currentActive) {
      e.preventDefault();
      navigateToProject(index);
    } else {
      if (project.githubUrl) {
        window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
      }
    }
  };

  // Compute Horizontal Exhibition Positioning for each artwork canvas
  const getArtworkStyle = (index: number) => {
    const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
    const canvasSpacing = isMobile
      ? Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.92 : 360, 440)
      : Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.88 : 1200, 1440);
    const perspectivePx = isMobile ? 950 : 1400;

    const diff = index - currentPos;
    const absDiff = Math.abs(diff);

    const translateX = diff * canvasSpacing;
    const translateZ = -Math.min(120, absDiff * 55);
    const rotateY = -Math.max(-10, Math.min(10, diff * 6));
    const scale = Math.max(0.85, 1.0 - absDiff * 0.08);

    let opacity = 0;
    if (absDiff <= 2.2) {
      opacity = Math.max(0, 1.0 - absDiff * 0.35);
    }

    const zIndex = Math.max(1, Math.round(50 - absDiff * 10));
    const pointerEvents: React.CSSProperties['pointerEvents'] = absDiff < 1.35 ? 'auto' : 'none';

    return {
      transform: `perspective(${perspectivePx}px) translate3d(calc(-50% + ${translateX.toFixed(2)}px), -50%, ${translateZ.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
      opacity: opacity.toFixed(3),
      zIndex,
      pointerEvents,
      '--proj-accent': projects[index].accentColor,
    } as React.CSSProperties;
  };

  return (
    <section id="projects" className="cinematic-gallery-section" aria-label="Selected Projects Exhibition">
      <div className="gallery-container">
        
        {/* Project Showcase Gallery Stage (Full Bleed Viewport) */}
        <div className="projects-showcase-gallery" id="projects-showcase-gallery" role="region" aria-label="Featured Projects Showcase">
          
          {/* SINGLE Clean Top Navigation Row (Preserved Sequence: 6 Projects) */}
          <div className="showcase-selector-bar" id="showcase-selector-bar" role="tablist" aria-label="Featured Projects Selection">
            {projects.map((proj, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={proj.id}
                  type="button"
                  className={`showcase-tab-btn ${isActive ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  style={{ '--proj-accent': proj.accentColor } as React.CSSProperties}
                  onClick={() => navigateToProject(idx)}
                >
                  <span className="tab-btn-idx">{proj.number}</span>
                  <span className="tab-btn-title">{proj.title}</span>
                </button>
              );
            })}
          </div>

          {/* Clean Full-Image Exhibition Stage */}
          <div className="art-exhibition-stage" id="project-carousel-wrapper">

            {/* Horizontal Gallery Viewport */}
            <div
              ref={viewportRef}
              className={`horizontal-carousel-viewport art-gallery-viewport ${isDragging ? 'is-dragging' : ''}`}
              id="horizontal-carousel-viewport"
              tabIndex={0}
              role="region"
              aria-label="Digital Website Exhibition Gallery"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="horizontal-carousel-track art-gallery-track" id="horizontal-carousel-track">
                {projects.map((proj, idx) => {
                  const diff = idx - currentPos;
                  const absDiff = Math.abs(diff);
                  const isCenter = absDiff < 0.4;
                  const isSide = absDiff >= 0.4 && absDiff <= 1.45;

                  return (
                    <article
                      key={proj.id}
                      className={`exhibition-artwork-canvas carousel-project-card ${isCenter ? 'is-center' : ''} ${isSide ? 'is-side' : ''}`}
                      data-index={idx}
                      data-project-url={proj.githubUrl}
                      style={getArtworkStyle(idx)}
                      onClick={(e) => handleArtworkClick(e, idx, proj)}
                    >
                      <div className="artwork-presentation-wrap">
                        {/* Pure uncropped website screenshot with subtle, elegant border */}
                        <div className="artwork-image-container">
                          <img
                            src={proj.image || 'pastel.png'}
                            alt={`${proj.title} Website Screenshot`}
                            className="artwork-pure-image"
                            loading="eager"
                          />
                        </div>

                        {/* Color-coordinated View Project button */}
                        <div className="artwork-action-bar">
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-view-action-btn"
                            style={{ backgroundColor: proj.accentColor }}
                            aria-label={`View ${proj.title} Project`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>View Project</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Single Elegant Italic Closing Line */}
        <div className="portfolio-closing-note-container" id="portfolio-closing-note">
          <p className="portfolio-closing-note-text">
            Thank you for stopping by my little corner of the internet. ❤️
          </p>
        </div>

      </div>
    </section>
  );
};
