import React, { useEffect, useRef, useState } from 'react';

interface WelcomeVideoIntroProps {
  onComplete: () => void;
}

export const WelcomeVideoIntro: React.FC<WelcomeVideoIntroProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasSound, setHasSound] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const RING_PERIMETER = 56.548; // 2 * Math.PI * 9

  const exitIntro = () => {
    if (isExiting) return;
    setIsExiting(true);
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.play().catch(() => {});

    const handleTimeUpdate = () => {
      if (video.duration && isFinite(video.duration)) {
        const pct = Math.min(100, Math.max(0, (video.currentTime / video.duration) * 100));
        setProgress(pct);
      }
    };

    const handleEnded = () => {
      exitIntro();
    };

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);
    const handleError = () => {
      setIsBuffering(false);
      setTimeout(exitIntro, 1200);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('canplay', handlePlaying);
    video.addEventListener('error', handleError);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        exitIntro();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('canplay', handlePlaying);
      video.removeEventListener('error', handleError);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const newSoundState = !hasSound;
    videoRef.current.muted = !newSoundState;
    if (newSoundState) {
      videoRef.current.volume = 1.0;
    }
    setHasSound(newSoundState);
  };

  const ringOffset = RING_PERIMETER - (RING_PERIMETER * (progress / 100));

  return (
    <aside
      id="welcome-video-intro"
      className={`wvi-overlay ${isExiting ? 'wvi-exiting' : ''}`}
      aria-label="Welcome Intro Video"
      role="region"
    >
      <div className={`wvi-video-container ${isBuffering ? 'is-buffering' : ''}`}>
        <video
          ref={videoRef}
          id="welcome-intro-video"
          className="wvi-video"
          autoPlay
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          onClick={toggleSound}
        >
          <source src="Welcome.mp4" type="video/mp4" />
          <source src="welcome.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="wvi-vignette" aria-hidden="true"></div>

        <div className="wvi-buffer-spinner" aria-hidden="true">
          <div className="wvi-spinner-ring"></div>
        </div>
      </div>

      <div className="wvi-top-bar">
        <button
          type="button"
          onClick={toggleSound}
          className="wvi-sound-toggle-btn"
          aria-label={hasSound ? 'Mute sound' : 'Unmute sound'}
        >
          <span className="wvi-sound-icon" aria-hidden="true">
            {hasSound ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </span>
          <span className="wvi-sound-label">{hasSound ? 'Sound on' : 'Sound off'}</span>
        </button>

        <button
          type="button"
          onClick={exitIntro}
          className="wvi-skip-btn-redesigned"
          aria-label="Skip welcome intro (Esc or Space)"
        >
          <span className="wvi-skip-progress-ring" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24">
              <circle className="wvi-ring-bg" cx="12" cy="12" r="9" />
              <circle
                className="wvi-ring-bar"
                cx="12"
                cy="12"
                r="9"
                style={{ strokeDashoffset: ringOffset }}
              />
            </svg>
            <svg className="wvi-ring-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"></line>
            </svg>
          </span>
          <span className="wvi-skip-label">Skip Intro</span>
          <kbd className="wvi-kbd-hint" aria-hidden="true">Esc</kbd>
        </button>
      </div>

      <div className="wvi-progress-track" aria-hidden="true">
        <div className="wvi-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </aside>
  );
};
