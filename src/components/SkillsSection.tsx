import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(PORTFOLIO_DATA.skillsCategories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCat = PORTFOLIO_DATA.skillsCategories.find(c => c.id === activeCategory) || PORTFOLIO_DATA.skillsCategories[0];

  const filteredSkills = currentCat.skills.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="skills" className="py-20 bg-slate-50 border-y border-slate-200/70" aria-label="Skills & Expertise">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="who-kicker-badge mx-auto mb-3">
            <span className="who-kicker-num">04</span>
            <span className="who-kicker-spark">✦</span>
            <span className="who-kicker-text">SKILLS &amp; STACK</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">
            Technical Foundations &amp; Frontier AI
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            A balanced spectrum combining modern frontend standards, 2026 backend architectures, deterministic prompt engineering, and autonomous agent workflows.
          </p>

          {/* Search Box */}
          <div className="mt-6 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search technologies (e.g. React, Node, Claude)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white shadow-sm"
            />
            <span className="absolute left-3.5 top-2.5 text-slate-400">🔍</span>
            {searchQuery && (
              <button
                type="button"
                className="absolute right-3.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {PORTFOLIO_DATA.skillsCategories.map(cat => (
            <button
              key={cat.id}
              type="button"
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-orange-50 border border-slate-200 shadow-sm'
              }`}
              onClick={() => {
                playTactileClick(650, 'sine');
                setActiveCategory(cat.id);
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Current Category Info Banner */}
        <div className="text-center mb-8">
          <p className="text-xs md:text-sm text-slate-500 max-w-xl mx-auto italic">
            "{currentCat.subtitle}"
          </p>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-orange-300 transition-all group flex flex-col justify-between"
              onClick={() => playTactileClick(700 + idx * 20, 'sine')}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-50 group-hover:scale-110 transition-transform">
                  {skill.icon}
                </span>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  {skill.tag}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-base group-hover:text-orange-600 transition-colors">
                  {skill.name}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {skill.level}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active In Production
                </span>
                <span className="font-mono">#0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-slate-500 text-sm">
            No matching technologies found for "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};
