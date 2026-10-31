import React, { useEffect, useState } from 'react';
import { playTactileClick } from '../utils/audio';

export const FloatingNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ['hero', 'about', 'projects', 'skills', 'exploring', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    playTactileClick(680, 'sine');
    setMobileOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="nav-wrapper" id="nav-wrapper">
        <nav className={`floating-nav ${isScrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
          <a
            href="#hero"
            className="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            aria-label="Arfa Munam"
          >
            <div className="brand-badge">
              <img
                src="logo.png"
                alt="Arfa Munam"
                className="brand-logo-img"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.retry) {
                    target.dataset.retry = '1';
                    target.src = 'public/logo.png';
                  } else if (target.dataset.retry === '1') {
                    target.dataset.retry = '2';
                    target.src = 'LOGO.jpg';
                  }
                }}
              />
            </div>
            <span className="brand-name">ARFA MUNAM</span>
          </a>

          <ul className="nav-menu">
            <li>
              <a
                href="#about"
                className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('projects');
                }}
              >
                Work
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('skills');
                }}
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#exploring"
                className={`nav-link ${activeSection === 'exploring' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('exploring');
                }}
              >
                Learning
              </a>
            </li>
            <li>
              <a
                href="#certifications"
                className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('certifications');
                }}
              >
                Certificates
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
              >
                Contact
              </a>
            </li>
          </ul>

          <div className="nav-actions">
            <a
              href="#contact"
              className="btn-nav-cta"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
            >
              <span>Let's Talk</span>
              <span style={{ fontSize: '1.1em', lineHeight: 1 }}>↗</span>
            </a>
          </div>

          <button
            className="btn-hamburger"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              playTactileClick(600, 'triangle');
              setMobileOpen(!mobileOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>

      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} id="mobile-drawer">
        <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a>
        <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick('projects'); }}>Work</a>
        <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick('skills'); }}>Skills</a>
        <a href="#exploring" onClick={(e) => { e.preventDefault(); handleNavClick('exploring'); }}>Exploring</a>
        <a href="#certifications" onClick={(e) => { e.preventDefault(); handleNavClick('certifications'); }}>Certificates</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Let's Connect</a>
      </div>
    </>
  );
};
