import React, { useRef, useState } from 'react';
import { playTactileClick } from '../utils/audio';

interface CreativeIntroCoverProps {
  onExplore: () => void;
}

export const CreativeIntroCover: React.FC<CreativeIntroCoverProps> = ({ onExplore }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const revealStoryVideo = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    playTactileClick(700, 'sine');
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }, 450);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    playTactileClick(650, 'sine');
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    playTactileClick(540, 'sine');
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pos * duration;
    setCurrentTime(pos * duration);
  };

  const handleExplore = () => {
    if (isExiting) return;
    setIsExiting(true);
    playTactileClick(840, 'triangle');
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }
    setTimeout(() => {
      onExplore();
    }, 450);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!imgWrapRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    const baseRotation = -5;
    imgWrapRef.current.style.transform = `rotate(${baseRotation + (x * 4)}deg) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(10px)`;
  };

  const handlePointerLeave = () => {
    if (imgWrapRef.current) {
      imgWrapRef.current.style.transform = '';
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <aside
      id="creative-intro-cover"
      className={`cip-overlay ${isExiting ? 'cip-exiting' : ''}`}
      aria-label="Portfolio Introduction Gallery"
      role="region"
    >
      <div className="cip-gallery-stage" id="cip-gallery-stage">
        <div className={`cip-composition-row ${isRevealed ? 'is-revealed' : ''}`} id="cip-composition-row">
          
          {/* LEFT: LAYERED CREATIVE PORTFOLIO IMAGE */}
          <div className="cip-image-column" id="cip-image-column">
            <div className="cip-note-card" aria-hidden="true">
              <svg className="cip-paperclip-icon" width="18" height="26" viewBox="0 0 24 36" fill="none" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v22a5 5 0 0 0 10 0V11a8 8 0 0 0-16 0v17a10 10 0 0 0 20 0V9" />
              </svg>
              <p className="cip-note-text">
                A small preview<br />of my world ♡
              </p>
            </div>

            <div
              className="cip-image-stack"
              role="button"
              tabIndex={0}
              aria-label="Click to reveal story video"
              onClick={revealStoryVideo}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  revealStoryVideo();
                }
              }}
            >
              <div className="cip-paper-layer layer-peach" aria-hidden="true"></div>
              <div className="cip-paper-layer layer-ivory" aria-hidden="true"></div>
              <div className="cip-paper-layer layer-beige" aria-hidden="true"></div>

              <div className="cip-main-image-wrap" ref={imgWrapRef}>
                <img
                  src="portfolio.png"
                  alt="Arfa Munam - Creative Portfolio"
                  className="cip-portfolio-img"
                  loading="eager"
                  width="1600"
                  height="901"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('portfolio.png.jpeg')) {
                      target.src = 'portfolio.png.jpeg';
                    }
                  }}
                />
                {!isRevealed && (
                  <div className="cip-click-hint" aria-hidden="true">
                    <span>Click image to watch story</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CENTER: CREATIVE HANDWRITTEN ORANGE ARROW */}
          <div className="cip-arrow-column" aria-hidden="true">
            <div className="cip-arrow-caption">
              <span className="cip-caption-line-1">Click to</span>
              <span className="cip-caption-line-2">Watch My Story</span>
            </div>

            <svg className="cip-curved-arrow-svg" viewBox="0 0 220 120" fill="none">
              <defs>
                <marker id="cip-arrowhead-react" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
                  <path d="M 0 0 L 8 4 L 0 8 Z" fill="#FA5538" />
                </marker>
              </defs>
              <path
                className="cip-arrow-path"
                d="M 25 25 C 75 10, 125 35, 155 75 C 168 92, 185 96, 202 85"
                stroke="#FA5538"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                markerEnd="url(#cip-arrowhead-react)"
              />
            </svg>
          </div>

          {/* RIGHT: FLOATING CINEMATIC VIDEO DISPLAY */}
          <div className="cip-video-column">
            <div className="cip-video-screen-stack">
              <div className="cip-video-back-layer v-layer-charcoal" aria-hidden="true"></div>
              <div className="cip-video-back-layer v-layer-peach" aria-hidden="true"></div>

              <div className={`cip-video-player-frame ${isPlaying ? 'is-playing' : 'is-paused'}`}>
                <video
                  ref={videoRef}
                  className="cip-story-video"
                  playsInline
                  preload="metadata"
                  tabIndex={0}
                  aria-label="Arfa Munam Story Video"
                  onClick={togglePlay}
                  onLoadedMetadata={() => {
                    if (videoRef.current) setDuration(videoRef.current.duration);
                  }}
                  onTimeUpdate={() => {
                    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                  }}
                  onEnded={() => setIsPlaying(false)}
                >
                  <source src="portfolio.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>

                {!isPlaying && (
                  <button
                    type="button"
                    className="cip-play-btn"
                    onClick={togglePlay}
                    aria-label="Play story video"
                  >
                    <span className="cip-play-icon" aria-hidden="true">
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="#0F172A">
                        <polygon points="6 3 20 12 6 21 6 3"></polygon>
                      </svg>
                    </span>
                  </button>
                )}

                <div className="cip-video-controls" aria-label="Video Controls">
                  <button type="button" className="cip-ctrl-btn" onClick={togglePlay} aria-label="Play/Pause">
                    {isPlaying ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    )}
                  </button>

                  <div
                    className="cip-seek-track"
                    role="slider"
                    aria-label="Video progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progressPercent)}
                    tabIndex={0}
                    onClick={handleSeek}
                  >
                    <div className="cip-seek-fill" style={{ width: `${progressPercent}%` }}></div>
                    <div className="cip-seek-thumb" style={{ left: `${progressPercent}%` }}></div>
                  </div>

                  <span className="cip-time-display">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  <button type="button" className="cip-ctrl-btn" onClick={toggleMute} aria-label="Mute/Unmute">
                    {isMuted ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: LET'S EXPLORE PILL BUTTON */}
        <div className="cip-bottom-controls">
          <div className="cip-sparkle-decor" aria-hidden="true">
            <span className="cip-wing-line"></span>
            <span className="cip-sparkle-star">✦</span>
            <span className="cip-wing-line"></span>
          </div>

          <button
            type="button"
            className="cip-explore-btn"
            onClick={handleExplore}
            aria-label="Enter portfolio website"
          >
            <span className="cip-explore-text">Let's Explore</span>
            <span className="cip-explore-arrow" aria-hidden="true">→</span>
          </button>

          <span className="cip-explore-kicker" aria-hidden="true">PORTFOLIO AWAITS</span>
        </div>

        <svg className="cip-bottom-curve-svg" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 0 55 C 380 20, 860 70, 1440 35" stroke="#FA5538" strokeWidth="1.2" strokeOpacity="0.28" strokeLinecap="round" />
        </svg>
      </div>
    </aside>
  );
};
