import React, { useState } from 'react';
import { PORTFOLIO_DATA, Certificate } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

export const CertificationsSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const openCertModal = (cert: Certificate) => {
    playTactileClick(760, 'triangle');
    setSelectedCert(cert);
  };

  const closeCertModal = () => {
    playTactileClick(540, 'sine');
    setSelectedCert(null);
  };

  return (
    <section id="certifications" className="py-20 bg-slate-50 border-t border-slate-200/70" aria-label="Google Certifications">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="who-kicker-badge mx-auto mb-3">
            <span className="who-kicker-num">06</span>
            <span className="who-kicker-spark">✦</span>
            <span className="who-kicker-text">CREDENTIALS</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 mb-3">
            Verified Google Certifications
          </h2>
          <p className="text-sm md:text-base text-slate-600">
            Official specializations earned directly through Google covering practical machine learning, frontier prompt engineering, and generative AI architecture.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.certificates.map(cert => (
            <div
              key={cert.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              onClick={() => openCertModal(cert)}
            >
              <div>
                {/* Certificate Frame Preview */}
                <div className="relative h-44 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100/50 border border-amber-200/80 p-4 mb-6 flex flex-col justify-between overflow-hidden shadow-inner group-hover:border-orange-400 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-800 bg-amber-200/80 px-2.5 py-0.5 rounded-full">
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold">{cert.date}</span>
                  </div>

                  <div className="text-center my-auto">
                    <div className="text-3xl mb-1">🎓</div>
                    <div className="font-serif font-bold text-slate-900 text-sm md:text-base">
                      {cert.badge}
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-orange-600 font-semibold tracking-wider uppercase">
                    Click for full lightbox credential →
                  </div>
                </div>

                <div className="text-xs font-mono text-orange-600 font-bold mb-1">
                  CREDENTIAL {cert.number}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              {/* Skills list */}
              <div>
                <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-950/80 backdrop-blur-md">
          <div className="absolute inset-0" onClick={closeCertModal}></div>

          <div className="relative bg-white max-w-xl w-full rounded-3xl p-6 md:p-8 border border-slate-200 shadow-2xl z-10 text-center space-y-4">
            <button
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center"
              onClick={closeCertModal}
            >
              ✕
            </button>

            <div className="text-4xl">🎓</div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900">
              {selectedCert.issuer} • Verified Credential
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-900">
              {selectedCert.title}
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed text-left bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              {selectedCert.description}
            </p>

            <div className="pt-2 text-left">
              <div className="text-xs font-bold text-slate-700 mb-2">Verified Competencies:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-50 text-orange-800 rounded-full text-xs font-medium border border-orange-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-slate-800"
              onClick={closeCertModal}
            >
              Close Credential Preview
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
