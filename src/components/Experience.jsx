import React from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Journey</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Work Experience & <span className="gradient-text-gold">Education</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mt-3 font-medium leading-relaxed">
            Professional developer internships, academic degree program, and specialized technical certifications.
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mt-4" />
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto pl-4 sm:pl-0">
          
          {/* Vertical Center Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-amber-600 to-slate-800 -translate-x-1/2" />

          <div className="space-y-12">
            {experienceData.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Node */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-slate-950 border-2 border-amber-500 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)]">
                    {item.type.includes('Degree') ? (
                      <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    ) : (
                      <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    )}
                  </div>

                  {/* Content Card Container */}
                  <div className="w-full sm:w-[calc(50%-2.5rem)] ml-14 sm:ml-0">
                    <div className="glass-panel rounded-2xl p-6 neon-border-hover shadow-2xl">
                      
                      {/* Period Badge & Type */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                          <Calendar className="w-3 h-3" />
                          <span>{item.period}</span>
                        </span>
                        <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-wider font-extrabold">
                          {item.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">
                        {item.role}
                      </h3>
                      <p className="text-sm font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                        {item.company}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>

                      {/* Certificate ID Badge if present */}
                      {item.certificateId && (
                        <div className="mb-4 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 font-mono font-bold">
                            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span>Certificate ID: {item.certificateId}</span>
                          </div>
                          <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-extrabold">
                            Verified
                          </span>
                        </div>
                      )}

                      {/* Experience Points */}
                      <ul className="space-y-2 mb-5">
                        {item.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
                        {item.skills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-slate-200 dark:border-slate-800 font-semibold"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
