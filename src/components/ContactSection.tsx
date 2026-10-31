import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick(850, 'triangle');

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ text: 'Please fill in your name, email, and message.', type: 'error' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({ text: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const mailtoUrl = `mailto:arfamunam01@gmail.com?subject=${encodeURIComponent(
        (subject || 'Portfolio Inquiry') + ' - ' + name
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
      )}`;

      setStatus({
        text: `Thank you, ${name}! Your email client will open to send your message. You can also reach me directly at arfamunam01@gmail.com.`,
        type: 'success'
      });

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);

      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-20 bg-white border-t border-slate-200/70" aria-label="Contact Section">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="who-kicker-badge mx-auto mb-3">
            <span className="who-kicker-num">10</span>
            <span className="who-kicker-spark">✦</span>
            <span className="who-kicker-text">LET'S CONNECT</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">
            Have a Project or Role in Mind?
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            I'm currently open for high-impact frontend engineering roles, creative web contracts, and frontier prompt architecture collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Direct Channels (Left Column 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-6">
                Direct Communication Channels
              </h3>

              <div className="space-y-4">
                {/* Email Card */}
                <a
                  href={`mailto:${PORTFOLIO_DATA.contact.email}`}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-orange-400 hover:shadow-md transition-all flex items-center gap-4 group"
                  onClick={() => playTactileClick(640, 'sine')}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    ✉️
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Email Inbox</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {PORTFOLIO_DATA.contact.email}
                    </div>
                  </div>
                </a>

                {/* GitHub Card */}
                <a
                  href={PORTFOLIO_DATA.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all flex items-center gap-4 group"
                  onClick={() => playTactileClick(640, 'sine')}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    🐙
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">GitHub Repositories</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      @ArfaMunam47
                    </div>
                  </div>
                </a>

                {/* LinkedIn Card */}
                <a
                  href={PORTFOLIO_DATA.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all flex items-center gap-4 group"
                  onClick={() => playTactileClick(640, 'sine')}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    💼
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Professional Network</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Arfa Munam on LinkedIn ↗
                    </div>
                  </div>
                </a>

                {/* Resume Download */}
                <a
                  href="Arfa-Munam-Resume.pdf"
                  download="Arfa-Munam-Resume.pdf"
                  className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg hover:shadow-orange-500/25 hover:brightness-105 transition-all flex items-center justify-between group"
                  onClick={() => playTactileClick(760, 'triangle')}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📄</span>
                    <div>
                      <div className="text-xs text-orange-100 font-semibold uppercase">Official Document</div>
                      <div className="text-sm font-bold">Download Full CV (PDF)</div>
                    </div>
                  </div>
                  <span className="text-xl group-hover:translate-y-0.5 transition-transform">↓</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form (Right Column 7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-6">
                Send a Direct Message
              </h3>

              {status && (
                <div
                  className={`p-4 rounded-2xl text-xs md:text-sm font-medium mb-6 ${
                    status.type === 'error'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}
                >
                  {status.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Chen"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Frontend Engineering Opportunity / Contract"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Message *
                    </label>
                    <span className="text-xs font-mono text-slate-400">
                      {message.length}/500
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    placeholder="Share project goals, timeline, or inquiries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>{isSubmitting ? 'Preparing Email Dispatch...' : 'Send Message'}</span>
                  <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">↗</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
