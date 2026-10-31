import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const GitHubSection: React.FC = () => {
  const [hoveredCell, setHoveredCell] = useState<{ week: number; day: number; count: number } | null>(null);

  // Generate a mock contribution grid (52 weeks x 7 days)
  const weeks = Array.from({ length: 48 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => {
      // Deterministic pseudo-activity distribution
      const val = (w * 7 + d * 3) % 11;
      const count = val > 7 ? (val % 5) + 1 : val > 4 ? 1 : 0;
      return count;
    })
  );

  return (
    <section id="github-section" className="py-20 bg-slate-950 text-white" aria-label="GitHub & Version Control Showcase">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-orange-400 border border-slate-700 mb-3">
            <span>🐙</span>
            <span>OPEN SOURCE &amp; COMMITS</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3">
            GitHub Activity &amp; Engineering Velocity
          </h2>
          <p className="text-sm md:text-base text-slate-400">
            Maintaining clean, documented Git commit histories, continuous code pushes, and reproducible software architectures.
          </p>
        </div>

        {/* Big Numbers Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {PORTFOLIO_DATA.stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 text-center hover:border-slate-700 transition-all"
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-mono text-2xl md:text-3xl font-bold text-white">
                {s.value}{s.suffix}
              </div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Heatmap Matrix Card */}
        <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="font-bold text-white text-base">Continuous Integration Heatmap</h4>
                <p className="text-xs text-slate-400">Past 12 Months of Git Velocity</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-800 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-700 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block"></span>
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Matrix Scroll Area */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[700px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5 flex-1">
                  {week.map((count, dIdx) => {
                    const bgClass =
                      count === 0
                        ? 'bg-slate-800 hover:ring-1 hover:ring-white'
                        : count === 1
                        ? 'bg-emerald-950'
                        : count === 2
                        ? 'bg-emerald-800'
                        : count === 3
                        ? 'bg-emerald-600'
                        : 'bg-emerald-400';

                    return (
                      <div
                        key={dIdx}
                        className={`w-3 h-3 rounded-[3px] transition-all cursor-pointer ${bgClass}`}
                        onMouseEnter={() => {
                          setHoveredCell({ week: wIdx + 1, day: dIdx + 1, count });
                          if (count > 0) playTactileClick(700 + count * 50, 'sine');
                        }}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Tooltip Readout */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>
              {hoveredCell
                ? `${hoveredCell.count} contribution${hoveredCell.count === 1 ? '' : 's'} on Week ${hoveredCell.week}, Day ${hoveredCell.day}`
                : 'Hover any cell to inspect commit intensity'}
            </span>

            <a
              href={PORTFOLIO_DATA.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
            >
              <span>View @ArfaMunam47 on GitHub</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
