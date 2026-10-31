import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const ProjectsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // StudyPilot Simulator State
  const flashcardConcepts = [
    {
      topic: "OPERATING SYSTEMS // DEADLOCKS",
      question: "What are the 4 Coffman conditions required for a system deadlock to occur?",
      answer: "1. Mutual Exclusion<br>2. Hold & Wait<br>3. No Preemption<br>4. Circular Wait",
      interval: "Interval: +4 Days",
      streak: "Recall Streak: 4"
    },
    {
      topic: "LLM REASONING // VECTOR EMBEDDINGS",
      question: "Why does Cosine Similarity outperform Euclidean distance for semantic text embeddings?",
      answer: "Cosine similarity measures vector directional angle rather than document length magnitude, normalizing token frequency variations.",
      interval: "Interval: +7 Days",
      streak: "Recall Streak: 6"
    },
    {
      topic: "COMPUTER ARCHITECTURE // MEMORY PAGING",
      question: "What is the purpose of the Translation Lookaside Buffer (TLB)?",
      answer: "Hardware cache that stores recent virtual-to-physical page mappings to avoid multi-level page table memory lookups.",
      interval: "Interval: +3 Days",
      streak: "Recall Streak: 3"
    },
    {
      topic: "DATA STRUCTURES // SELF-BALANCING TREES",
      question: "How does an AVL Tree guarantee O(log N) worst-case search and insertion times?",
      answer: "By enforcing a strict balance factor (height difference of at most 1 between subtrees) and performing single/double rotations on violation.",
      interval: "Interval: +12 Days",
      streak: "Recall Streak: 8"
    }
  ];
  const [conceptIdx, setConceptIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Velora Simulator State
  const [veloraQty, setVeloraQty] = useState(1);
  const [veloraCheckedOut, setVeloraCheckedOut] = useState(false);
  const unitPrice = 185;
  const shipping = 15;

  // Kumo Simulator State
  const [kumoBroth, setKumoBroth] = useState<'classic' | 'spicy' | 'truffle'>('classic');
  const [kumoNoodle, setKumoNoodle] = useState<'soft' | 'firm' | 'katame'>('firm');
  const [kumoOrdered, setKumoOrdered] = useState(false);

  const kumoBasePrice = 17.50;
  const kumoExtra = kumoBroth === 'spicy' ? 2.00 : kumoBroth === 'truffle' ? 3.50 : 0;
  const kumoTotal = (kumoBasePrice + kumoExtra).toFixed(2);

  // Filter projects
  const filteredProjects = PORTFOLIO_DATA.projects.filter(p => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return ['prism', 'studypilot', 'velora'].includes(p.id);
    return p.category === activeFilter;
  });

  const openProject = (proj: Project) => {
    playTactileClick(740, 'triangle');
    setSelectedProject(proj);
    setShowAnswer(false);
    setVeloraCheckedOut(false);
    setKumoOrdered(false);
  };

  const closeProject = () => {
    playTactileClick(540, 'sine');
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="projects-showcase-section" aria-label="Projects Exhibition">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-editorial text-center mb-10">
          <div className="who-kicker-badge mx-auto mb-3">
            <span className="who-kicker-num">03</span>
            <span className="who-kicker-spark">✦</span>
            <span className="who-kicker-text">FEATURED WORK</span>
          </div>
          <h2 className="section-editorial-title font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">
            Crafted Interfaces &amp; Intelligent Systems
          </h2>
          <p className="section-editorial-desc max-w-2xl mx-auto text-slate-600">
            A curated collection of web experiences combining modern frontend craft, 3D spatial graphics, and structured AI agent workflows.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'featured', label: '⭐ Featured' },
              { id: 'spatial-3d', label: '💎 3D & Spatial' },
              { id: 'ai-study', label: '🤖 AI Copilots' },
              { id: 'e-commerce', label: '🛍️ E-Commerce' },
              { id: 'culinary', label: '🍜 Culinary' },
              { id: 'creative-ui', label: '🎨 Creative UI' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200'
                }`}
                onClick={() => {
                  playTactileClick(640, 'sine');
                  setActiveFilter(tab.id);
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => openProject(proj)}
            >
              {/* Card Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={proj.image || 'portfolio.png'}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'portfolio.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
                  <span>{proj.icon}</span>
                  <span>{proj.categoryLabel}</span>
                </div>
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-mono px-2.5 py-1 rounded-full border border-white/20">
                  {proj.number}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-orange-600 font-medium mb-3">
                    {proj.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {proj.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1 mb-4">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="text-xs text-slate-500 flex items-center gap-1.5">
                        <span className="text-orange-500">✦</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {proj.technologies.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      className="text-xs font-bold text-slate-900 group-hover:text-orange-600 flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProject(proj);
                      }}
                    >
                      <span>Interactive Preview</span>
                      <span>→</span>
                    </button>

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                      <span>Code ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-PAGE INTERACTIVE PROJECT SIMULATOR MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-md">
          <div
            className="absolute inset-0"
            onClick={closeProject}
          ></div>

          <div className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 z-10 flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedProject.icon}</span>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-bold text-slate-900 leading-tight">
                    {selectedProject.title}
                  </h3>
                  <span className="text-xs text-orange-600 font-semibold">
                    {selectedProject.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <span>↗</span>
                </a>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center"
                  onClick={closeProject}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Embedded Project Simulator Stage */}
              <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-inner border border-slate-800">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-mono uppercase font-bold tracking-wider">LIVE INTERACTIVE RUNTIME SIMULATOR</span>
                  </div>
                  <span className="font-mono text-slate-400">Project #{selectedProject.number}</span>
                </div>

                {/* 1. StudyPilot Simulator */}
                {selectedProject.id === 'studypilot' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center relative overflow-hidden">
                      <div className="text-xs font-mono text-indigo-400 mb-2 uppercase tracking-wide">
                        {flashcardConcepts[conceptIdx].topic}
                      </div>
                      <div className="text-base md:text-lg font-serif font-bold text-white mb-4">
                        {flashcardConcepts[conceptIdx].question}
                      </div>

                      {showAnswer ? (
                        <div
                          className="bg-indigo-950/60 border border-indigo-500/30 rounded-lg p-4 text-sm text-indigo-200 text-left my-4 transition-all"
                          dangerouslySetInnerHTML={{ __html: flashcardConcepts[conceptIdx].answer }}
                        />
                      ) : (
                        <div className="h-16 flex items-center justify-center text-xs text-slate-500 italic">
                          Click below to test conceptual recall
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                        <button
                          type="button"
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md"
                          onClick={() => {
                            playTactileClick(700, 'sine');
                            setShowAnswer(!showAnswer);
                          }}
                        >
                          {showAnswer ? 'Hide Answer' : 'Reveal Answer ↺'}
                        </button>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all border border-slate-700"
                          onClick={() => {
                            playTactileClick(840, 'triangle');
                            setConceptIdx((conceptIdx + 1) % flashcardConcepts.length);
                            setShowAnswer(false);
                          }}
                        >
                          Next Card →
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mt-4 pt-3 border-t border-slate-800">
                        <span>{flashcardConcepts[conceptIdx].interval}</span>
                        <span>{flashcardConcepts[conceptIdx].streak}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Velora Store Simulator */}
                {selectedProject.id === 'velora' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-lg bg-stone-800 overflow-hidden flex items-center justify-center text-2xl">
                            🧥
                          </div>
                          <div>
                            <div className="font-bold text-white text-base">Atelier Minimalist Trench</div>
                            <div className="text-xs text-slate-400">Camel Tan • Japanese Twill • Size M</div>
                            <div className="text-sm font-semibold text-orange-400 mt-1">${unitPrice}.00 USD</div>
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                          <button
                            type="button"
                            className="w-6 h-6 rounded-full hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center"
                            onClick={() => {
                              if (veloraQty > 1) {
                                playTactileClick(520, 'sine');
                                setVeloraQty(veloraQty - 1);
                              }
                            }}
                          >
                            -
                          </button>
                          <span className="font-mono text-sm font-bold text-white w-6 text-center">{veloraQty}</span>
                          <button
                            type="button"
                            className="w-6 h-6 rounded-full hover:bg-slate-700 text-slate-300 font-bold flex items-center justify-center"
                            onClick={() => {
                              if (veloraQty < 10) {
                                playTactileClick(720, 'sine');
                                setVeloraQty(veloraQty + 1);
                              }
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Calculations */}
                      <div className="py-4 space-y-2 text-xs font-mono text-slate-300">
                        <div className="flex justify-between">
                          <span>Subtotal ({veloraQty} items):</span>
                          <span>${(veloraQty * unitPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Express Courier:</span>
                          <span>${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                          <span>Estimated Total:</span>
                          <span className="text-emerald-400">${(veloraQty * unitPrice + shipping).toFixed(2)}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className={`w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                          veloraCheckedOut
                            ? 'bg-emerald-600 text-white'
                            : 'bg-orange-600 hover:bg-orange-500 text-white'
                        }`}
                        onClick={() => {
                          playTactileClick(900, 'triangle');
                          setVeloraCheckedOut(true);
                          setTimeout(() => setVeloraCheckedOut(false), 2400);
                        }}
                      >
                        {veloraCheckedOut ? '✓ Order Confirmed! (Stripe Sandbox)' : 'Instant Checkout →'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Kumo Ramen Simulator */}
                {selectedProject.id === 'kumo-ramen' && (
                  <div className="space-y-4">
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                      <div className="font-bold text-amber-400 text-base mb-3 flex items-center gap-2">
                        <span>🍜</span>
                        <span>Tokyo Artisan Bowl Customizer</span>
                      </div>

                      {/* Broth Selection */}
                      <div className="mb-4">
                        <label className="text-xs font-mono text-slate-400 block mb-2">1. SELECT BROTH BODY:</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'classic', label: 'Classic Tonkotsu', price: '$17.50' },
                            { id: 'spicy', label: 'Spicy Chili Miso', price: '+$2.00' },
                            { id: 'truffle', label: 'Black Truffle', price: '+$3.50' }
                          ].map(b => (
                            <button
                              key={b.id}
                              type="button"
                              className={`p-2.5 rounded-lg text-xs font-semibold text-center border transition-all ${
                                kumoBroth === b.id
                                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                              onClick={() => {
                                playTactileClick(600, 'sine');
                                setKumoBroth(b.id as 'classic' | 'spicy' | 'truffle');
                              }}
                            >
                              <div>{b.label}</div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{b.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Noodle Firmness */}
                      <div className="mb-4">
                        <label className="text-xs font-mono text-slate-400 block mb-2">2. NOODLE FIRMNESS (HAKATA STYLE):</label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: 'soft', label: 'Futsu (Medium)' },
                            { id: 'firm', label: 'Katame (Firm)' },
                            { id: 'katame', label: 'Barikata (Extra Firm)' }
                          ].map(n => (
                            <button
                              key={n.id}
                              type="button"
                              className={`p-2 rounded-lg text-xs font-semibold text-center border transition-all ${
                                kumoNoodle === n.id
                                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                              }`}
                              onClick={() => {
                                playTactileClick(640, 'sine');
                                setKumoNoodle(n.id as 'soft' | 'firm' | 'katame');
                              }}
                            >
                              {n.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Summary and Order */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                        <div>
                          <div className="text-xs text-slate-400">Bowl Total:</div>
                          <div className="text-xl font-bold text-amber-400 font-mono">${kumoTotal}</div>
                        </div>

                        <button
                          type="button"
                          className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow-md"
                          onClick={() => {
                            playTactileClick(880, 'triangle');
                            setKumoOrdered(true);
                            setTimeout(() => setKumoOrdered(false), 2400);
                          }}
                        >
                          {kumoOrdered ? '✓ Bowl Fired in Kitchen!' : 'Order Ramen Counter →'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Prism or PastelForm Simulator Fallback */}
                {selectedProject.id === 'prism' && (
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center space-y-3">
                    <div className="text-3xl">💎</div>
                    <div className="text-base font-bold text-purple-300">Prism 3D AR Spatial Viewport</div>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Interactive Three.js environment simulating optical refraction shaders, real-time light physics, and AR eyewear orientation.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-purple-950/50 border border-purple-500/30 px-3 py-1.5 rounded-full text-xs text-purple-300 font-mono">
                      <span>Shader: GLSL Fragment Refraction v2.4</span>
                    </div>
                  </div>
                )}

                {selectedProject.id === 'pastelform' && (
                  <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center space-y-3">
                    <div className="text-3xl">🎨</div>
                    <div className="text-base font-bold text-pink-300">PastelForm Aesthetic Survey Engine</div>
                    <p className="text-xs text-slate-400 max-w-md mx-auto">
                      Human-centered multi-step questionnaire with dynamic branch logic, soft pastel themes, and real-time schema export.
                    </p>
                    <div className="inline-flex items-center gap-2 bg-pink-950/50 border border-pink-500/30 px-3 py-1.5 rounded-full text-xs text-pink-300 font-mono">
                      <span>Schema: Validated JSON Loop v1.2</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Project Deep Dive Text */}
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Architectural Overview</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-2">Technologies &amp; Libraries</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
