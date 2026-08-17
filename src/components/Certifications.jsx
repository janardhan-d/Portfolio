import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Trophy,
  X
} from 'lucide-react';
import { certsData } from '../data/portfolioData';

const iconMap = {
  Award: Award,
  BarChart3: BarChart3,
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  Cpu: Cpu,
  Trophy: Trophy,
};

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honors & Credentials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Achievements & <span className="gradient-text-gold">Certifications</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mt-3 font-medium leading-relaxed">
            Verified skill badges, hackathon achievements, and industry certifications.
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mt-4" />
        </div>

        {/* Badge Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certsData.map((cert, idx) => {
            const IconComponent = iconMap[cert.icon] || Award;

            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 neon-border-hover flex flex-col justify-between group shadow-2xl"
              >
                <div>
                  {/* Top Badge Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      {cert.badge}
                    </span>
                  </div>

                  {/* Cert Title & Issuer */}
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-200 mt-2 leading-relaxed line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                {/* Footer Credential */}
                <div className="mt-6 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-300 font-semibold">
                    ID: {cert.credentialId}
                  </span>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-500 font-extrabold flex items-center gap-1"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Certificate Modal Verification Popup */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
            <div className="relative w-full max-w-lg glass-panel rounded-3xl p-6 border border-amber-500/40 shadow-2xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Credential Verification Record</span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 uppercase font-bold">
                  {selectedCert.issuer}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-200 mt-3 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5 text-slate-800 dark:text-slate-200">
                <p><span className="text-slate-500 dark:text-slate-400">Recipient:</span> Janardhan Devarala</p>
                <p><span className="text-slate-500 dark:text-slate-400">Credential ID:</span> <span className="text-amber-600 dark:text-amber-400 font-bold">{selectedCert.credentialId}</span></p>
                <p><span className="text-slate-500 dark:text-slate-400">Issue Date:</span> {selectedCert.date}</p>
                <p><span className="text-slate-500 dark:text-slate-400">Status:</span> <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Verified & Authentic</span></p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg"
                >
                  Done
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
