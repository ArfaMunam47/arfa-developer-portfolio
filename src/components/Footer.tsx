import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const Footer: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playTactileClick(700, 'sine');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white py-16 border-t border-slate-900 relative">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800/80 items-center">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/30 flex items-center justify-center font-bold text-orange-400 font-serif">
                AM
              </div>
              <div>
                <span className="font-serif font-bold text-xl tracking-tight block">
                  ARFA MUNAM
                </span>
                <span className="text-xs text-slate-400">
                  Frontend Developer • Prompt Engineer • AI Explorer
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-sm pt-2">
              Building bold interfaces with pixel precision and deterministic generative intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400 font-medium">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Work</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#exploring" className="hover:text-white transition-colors">Learning</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certificates</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Active Status Badge */}
          <div className="md:col-span-3 flex md:justify-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Available For High-Impact Roles</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Arfa Munam. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href={PORTFOLIO_DATA.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              GitHub
            </a>
            <span>•</span>
            <a href={PORTFOLIO_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              LinkedIn
            </a>
            <span>•</span>
            <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="hover:text-white">
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Floating Back To Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-orange-600 hover:bg-orange-500 text-white shadow-xl flex items-center justify-center text-lg font-bold transition-all hover:scale-110 active:scale-95"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </footer>
  );
};
