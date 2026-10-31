import React from 'react';

export const DualMarquee: React.FC = () => {
  return (
    <div className="dual-marquee-container" aria-label="Capabilities Marquee">
      {/* Ribbon 1: Coral */}
      <div className="editorial-marquee-ribbon ribbon-coral">
        <div className="marquee-track">
          <span className="marquee-item"><span className="marquee-spark">✦</span> FRONT-END DEVELOPMENT</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> RESPONSIVE WEB DESIGN</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> HTML &amp; CSS</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> JAVASCRIPT</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> BOOTSTRAP</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> UI/UX IMPLEMENTATION</span>
          {/* Duplicate set for seamless continuous 50% loop */}
          <span className="marquee-item"><span className="marquee-spark">✦</span> FRONT-END DEVELOPMENT</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> RESPONSIVE WEB DESIGN</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> HTML &amp; CSS</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> JAVASCRIPT</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> BOOTSTRAP</span>
          <span className="marquee-item"><span className="marquee-spark">✦</span> UI/UX IMPLEMENTATION</span>
        </div>
      </div>

      {/* Ribbon 2: Teal (Reverse Direction) */}
      <div className="editorial-marquee-ribbon ribbon-teal">
        <div className="marquee-track marquee-track-reverse">
          <span className="marquee-item"><span className="marquee-spark">★</span> INTERACTIVE WEB EXPERIENCES</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> MODERN WEBSITE DESIGN</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> CREATIVE INTERFACES</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> AI-ASSISTED DEVELOPMENT</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> PROMPT ENGINEERING</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> CONTINUOUSLY LEARNING &amp; BUILDING</span>
          {/* Duplicate set for seamless continuous 50% loop */}
          <span className="marquee-item"><span className="marquee-spark">★</span> INTERACTIVE WEB EXPERIENCES</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> MODERN WEBSITE DESIGN</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> CREATIVE INTERFACES</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> AI-ASSISTED DEVELOPMENT</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> PROMPT ENGINEERING</span>
          <span className="marquee-item"><span className="marquee-spark">★</span> CONTINUOUSLY LEARNING &amp; BUILDING</span>
        </div>
      </div>
    </div>
  );
};
