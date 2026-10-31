import React, { useState } from 'react';
import { playTactileClick } from '../utils/audio';

export const HobbiesSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isTapePlaying, setIsTapePlaying] = useState(false);

  const hobbies = [
    {
      id: 'badminton',
      category: 'sports',
      categoryLabel: 'Sports & Agility',
      title: 'Badminton & Fast Reflexes',
      desc: 'High-intensity court rallies that keep my mind agile, fast-reacting, and energized for long dev sprints.',
      icon: '🏸',
      color: '#FA5538',
      tape: 'washi-coral'
    },
    {
      id: 'books',
      category: 'reading',
      categoryLabel: 'Deep Reading',
      title: 'System Design & Science',
      desc: 'Reading engineering papers, cognitive psychology, and speculative fiction to cross-pollinate new design ideas.',
      icon: '📚',
      color: '#6366F1',
      tape: 'washi-indigo'
    },
    {
      id: 'movies',
      category: 'cinema',
      categoryLabel: 'Cinematography',
      title: 'Sci-Fi & Visual Rhythm',
      desc: 'Analyzing lighting, pacing, frame balance, and soundscapes in classic cinema to inform spatial web UI.',
      icon: '🎬',
      color: '#EC4899',
      tape: 'washi-pink'
    },
    {
      id: 'travel',
      category: 'travel',
      categoryLabel: 'Exploration',
      title: 'Urban Architecture & Nature',
      desc: 'Traveling to new cities, studying physical signage, tactile materials, and organic textures.',
      icon: '✈️',
      color: '#10B981',
      tape: 'washi-emerald'
    },
    {
      id: 'writing',
      category: 'writing',
      categoryLabel: 'Expression',
      title: 'Creative Journaling',
      desc: 'Pen-and-paper reflective notes dissecting user journeys, prompt schemas, and philosophical musings.',
      icon: '✍️',
      color: '#F59E0B',
      tape: 'washi-amber'
    }
  ];

  const filtered = hobbies.filter(h => activeFilter === 'all' || h.category === activeFilter);

  const toggleTape = () => {
    playTactileClick(800, 'triangle');
    setIsTapePlaying(!isTapePlaying);
  };

  return (
    <section id="hobbies" className="py-20 bg-amber-50/30 border-t border-slate-200/60" aria-label="Creative Hobbies & Mood Board">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="who-kicker-badge mx-auto mb-3">
            <span className="who-kicker-num">07</span>
            <span className="who-kicker-spark">✦</span>
            <span className="who-kicker-text">OFFLINE CRAFT</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">
            Creative Mood Board &amp; Life Outside Code
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            A playful Polaroid-style scrapbook of hobbies and sensory inspirations that fuel my everyday engineering clarity.
          </p>

          {/* Washi Tape Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Inspirations' },
              { id: 'sports', label: '🏸 Badminton' },
              { id: 'reading', label: '📚 Reading' },
              { id: 'cinema', label: '🎬 Cinema' },
              { id: 'travel', label: '✈️ Travel' },
              { id: 'writing', label: '✍️ Writing' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                className={`px-4 py-1.5 rounded-md text-xs font-serif font-bold tracking-wide transition-all transform ${
                  activeFilter === tab.id
                    ? 'bg-amber-800 text-white shadow-md -rotate-1'
                    : 'bg-white text-slate-700 hover:bg-amber-100/60 border border-amber-200'
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

        {/* Cassette Tape Feature Row */}
        <div className="max-w-md mx-auto mb-12 bg-white rounded-2xl p-5 border-2 border-dashed border-amber-300 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`text-3xl ${isTapePlaying ? 'animate-spin' : ''}`}>
              📼
            </div>
            <div>
              <div className="text-xs font-bold font-mono text-slate-900 uppercase">Lo-Fi Ambient Focus Tape</div>
              <div className="text-[11px] text-slate-500">60-minute sensory background ambiance</div>
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all shadow"
            onClick={toggleTape}
          >
            {isTapePlaying ? 'Pause Tape ⏸' : 'Spin Tape ▶'}
          </button>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => {
            const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
            const rot = rotations[idx % rotations.length];

            return (
              <div
                key={item.id}
                className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform ${rot} hover:rotate-0 hover:scale-[1.02] flex flex-col justify-between`}
              >
                {/* Washi tape pin header */}
                <div className="relative mb-3 flex items-center justify-between">
                  <div className="h-4 w-16 bg-amber-200/70 border border-amber-300/80 rounded-sm -rotate-3"></div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="text-center py-6 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                  <div className="text-4xl mb-2">{item.icon}</div>
                  <h4 className="font-serif font-bold text-slate-900 text-lg">
                    {item.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-serif italic text-center">
                  "{item.desc}"
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
