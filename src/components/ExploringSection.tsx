import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const ExploringSection: React.FC = () => {
  const [activeRadar, setActiveRadar] = useState('ai-automation');
  const [activeLab, setActiveLab] = useState('ai-agents');
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "[09:42:01] INIT: Initializing Multi-Agent Orchestration Bus...",
    "[09:42:02] PLAN: Planner agent decomposed user query into 3 parallel sub-tasks",
    "[09:42:03] EXEC: Sub-agent 'Researcher' returned verified citations (100% precision)",
    "[09:42:04] SUCCESS: Synthesized response delivered in 410ms with zero hallucination."
  ]);

  const radarData: Record<string, string> = {
    'ai-automation': "Architecting intelligent prompt workflows and LLM agent pipelines using Claude and ChatGPT — turning multi-hour manual engineering tasks into high-velocity, production-grade output.",
    'full-stack': "Integrating frontend interfaces with backend engines, Supabase PostgreSQL databases, authentication flows, and edge APIs to build full-scale web applications.",
    'modern-web': "Crafting responsive, performant user interfaces with clean semantic HTML, modular CSS architectures, fluid animations, and strict WCAG accessibility standards.",
    'digital-products': "Studying product mechanics, founder workflows, rapid iteration cycles, and user feedback loops to build tools that solve genuine problems."
  };

  const labLogsData: Record<string, string[]> = {
    'ai-agents': [
      "[09:42:01] INIT: Initializing Multi-Agent Orchestration Bus...",
      "[09:42:02] PLAN: Planner agent decomposed user query into 3 parallel sub-tasks",
      "[09:42:03] EXEC: Sub-agent 'Researcher' returned verified citations (100% precision)",
      "[09:42:04] SUCCESS: Synthesized response delivered in 410ms with zero hallucination."
    ],
    'fullstack-edge': [
      "[11:15:10] PING: Connecting to Edge PostgreSQL node (iad-iad1)...",
      "[11:15:11] RLS: Evaluating Row-Level Security policy for auth.uid() -> PERMIT",
      "[11:15:11] CACHE: Stale-while-revalidate hit at edge CDN (TTL: 3600s)",
      "[11:15:12] SUCCESS: Response dispatched with 12ms latency."
    ],
    'fluid-canvas': [
      "[14:02:44] GPU: Requesting WebGL2 / WebGPU compute device context...",
      "[14:02:45] SIM: 24,000 particle spring-lattice simulation loaded to VRAM",
      "[14:02:45] RAF: Compositor frame rate: steady 60.0 FPS under 8x MSAA",
      "[14:02:46] SUCCESS: Fluid surface rendering with zero memory leaks."
    ],
    'autonomous-systems': [
      "[16:30:20] CRON: n8n Workflow #704 triggered by inbound webhook",
      "[16:30:21] PIPE: Sanitizing payload -> running sentiment vector classification",
      "[16:30:22] SYNC: Dispatching database update & Slack team notification",
      "[16:30:22] SUCCESS: Pipeline executed cleanly in 142ms. Zero manual steps."
    ]
  };

  const inspectLab = (labKey: string) => {
    playTactileClick(720, 'sine');
    setActiveLab(labKey);
    setTelemetryLogs(labLogsData[labKey] || []);
  };

  return (
    <section id="exploring" className="py-20 bg-white" aria-label="Learning Journey & Exploration">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="who-kicker-badge mx-auto mb-3">
            <span className="who-kicker-num">05</span>
            <span className="who-kicker-spark">✦</span>
            <span className="who-kicker-text">CONTINUOUS EXPLORATION</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">
            Learning Journey &amp; Research Labs
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            A real-time snapshot of the technologies, experiments, and architectural patterns I'm actively mastering.
          </p>
        </div>

        {/* 2-Column Exploration: Radar on Left, Lab Terminal on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-stretch">
          {/* Left: Active Radar Focus */}
          <div className="bg-gradient-to-br from-orange-50/60 to-amber-50/40 rounded-3xl p-8 border border-orange-200/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-widest mb-4">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
                <span>Active Learning Radar</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { id: 'ai-automation', label: 'AI Agent Automations' },
                  { id: 'full-stack', label: '2026 Full-Stack Edge' },
                  { id: 'modern-web', label: 'Tactile Motion UX' },
                  { id: 'digital-products', label: 'Product Architecture' }
                ].map(r => (
                  <button
                    key={r.id}
                    type="button"
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeRadar === r.id
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-orange-100 border border-orange-200/60'
                    }`}
                    onClick={() => {
                      playTactileClick(650, 'sine');
                      setActiveRadar(r.id);
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/50 min-h-[140px] flex items-center shadow-sm">
                <p className="text-sm md:text-base text-slate-800 leading-relaxed font-serif italic">
                  "{radarData[activeRadar]}"
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-orange-700 font-mono">
              <span>Status: Active Exploration Cycle</span>
              <span>Updated: Weekly</span>
            </div>
          </div>

          {/* Right: Lab Telemetry Terminal */}
          <div className="bg-slate-950 rounded-3xl p-6 md:p-8 border border-slate-800 text-white flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  </div>
                  <span className="font-mono text-xs text-slate-400 pl-2">arfa@frontier-lab:~</span>
                </div>

                <div className="flex gap-1">
                  {[
                    { id: 'ai-agents', label: 'Agents' },
                    { id: 'fullstack-edge', label: 'Edge SQL' },
                    { id: 'fluid-canvas', label: 'WebGL' },
                    { id: 'autonomous-systems', label: 'n8n' }
                  ].map(lab => (
                    <button
                      key={lab.id}
                      type="button"
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-all ${
                        activeLab === lab.id
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                      onClick={() => inspectLab(lab.id)}
                    >
                      {lab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="font-mono text-xs space-y-2.5 min-h-[160px] py-2">
                <div className="text-emerald-400 text-[11px]">
                  $ telnet labs.arfamunam.dev --channel={activeLab}
                </div>
                {telemetryLogs.map((line, i) => (
                  <div key={i} className="text-slate-300">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex justify-between">
              <span>Latency: 12ms</span>
              <span className="text-emerald-400">● Link Active</span>
            </div>
          </div>
        </div>

        {/* Timeline Milestones Section */}
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 text-center mb-12">
            Chronological Evolution (2022 — 2026)
          </h3>

          <div className="relative max-w-4xl mx-auto space-y-8 before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:bg-gradient-to-b before:from-orange-500 before:via-indigo-500 before:to-emerald-500 hidden md:block">
            {PORTFOLIO_DATA.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Center Node Marker */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-orange-500 shadow-md flex items-center justify-center text-xs z-10">
                    {item.icon}
                  </div>

                  {/* Card */}
                  <div className={`w-[45%] bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all ${isEven ? 'text-right' : 'text-left'}`}>
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold font-mono bg-orange-100 text-orange-800 mb-2">
                      {item.year} • {item.period}
                    </div>
                    <h4 className="font-bold text-slate-900 text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Linear List */}
          <div className="md:hidden space-y-4">
            {PORTFOLIO_DATA.timeline.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-orange-100 text-orange-800">
                    {item.year}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">• {item.period}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
