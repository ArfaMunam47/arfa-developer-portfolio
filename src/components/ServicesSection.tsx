import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/70" aria-label="Services & Capabilities">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="who-kicker-badge mx-auto mb-3">
            <span className="who-kicker-num">09</span>
            <span className="who-kicker-spark">✦</span>
            <span className="who-kicker-text">CAPABILITIES</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">
            How I Can Help Your Product Ship
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            From zero-to-one front-end prototyping to production LLM prompt architectures, here is how we can collaborate.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.services.map((svc) => (
            <div
              key={svc.num}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group"
              onMouseEnter={() => playTactileClick(680, 'sine')}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl p-3 rounded-2xl bg-orange-50 group-hover:scale-110 transition-transform">
                    {svc.icon}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-orange-600 transition-colors">
                    SERVICE {svc.num}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {svc.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-orange-600">
                <span>Inquire details</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
