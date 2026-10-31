import React, { useEffect, useRef } from 'react';

export const BespokeCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReduced || window.innerWidth < 992) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let flareX = mouseX;
    let flareY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        dotRef.current.style.opacity = '1';
      }
      if (ringRef.current) ringRef.current.style.opacity = '1';
      if (flareRef.current) flareRef.current.style.opacity = '1';
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (flareRef.current) flareRef.current.style.opacity = '0';
    };

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      flareX += (mouseX - flareX) * 0.08;
      flareY += (mouseY - flareY) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      if (flareRef.current) {
        flareRef.current.style.transform = `translate3d(${flareX}px, ${flareY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" style={{ opacity: 0 }}></div>
      <div className="cursor-follower" ref={ringRef} aria-hidden="true" style={{ opacity: 0 }}></div>
      <div className="cursor-flare" ref={flareRef} aria-hidden="true" style={{ opacity: 0 }}></div>
    </>
  );
};
