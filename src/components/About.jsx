import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Code2, 
  Building2, 
  Calendar, 
  Award, 
  Sparkles, 
  Briefcase
} from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About <span className="gradient-text-gold">Janardhan Devarala</span>
          </h2>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mt-4" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story Panel */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-8 flex flex-col justify-between neon-border-hover shadow-2xl">
            <div className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Code2 className="w-6 h-6" />
                </span>
                <span>Passionate Engineer & Learner</span>
              </h3>

              {personalDetails.aboutText.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-slate-700 dark:text-slate-200 leading-relaxed text-sm sm:text-base font-normal"
                >
                  {paragraph}
                </p>
              ))}

              <div className="pt-2 flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-sm">
                <MapPin className="w-4.5 h-4.5 shrink-0" />
                <span>Based in {personalDetails.location}</span>
              </div>
            </div>

            {/* Sub Highlights */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-amber-500/30">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-500/30">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Python Specialist</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium">GUI apps with Tkinter, Matplotlib & SQLite</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-100 dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-amber-500/30">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 border border-amber-500/30">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">DSA & Algorithms</h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 font-medium">Certified by APSCHE & CSC India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Quick Facts Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Education Highlight Card */}
            <div className="glass-panel rounded-2xl p-6 neon-border-hover relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono font-extrabold">
                    CURRENT EDUCATION
                  </span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">
                    {personalDetails.degree}
                  </h4>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200 font-medium">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-extrabold text-slate-900 dark:text-white">{personalDetails.college}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-300 pl-6">
                  Affiliated to JNTU Anantapur
                </p>
                <div className="flex items-center gap-2 pl-6 text-xs font-mono text-amber-600 dark:text-amber-300 pt-1 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>August 2023 – August 2027</span>
                </div>
              </div>
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-4">
              {personalDetails.quickFacts.map((fact, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-xl p-4 flex flex-col justify-between hover:border-amber-400 transition-colors shadow-lg"
                >
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 uppercase font-mono tracking-wider font-extrabold">
                    {fact.label}
                  </span>
                  <span className="text-sm font-black text-slate-900 dark:text-white mt-2 line-clamp-2">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
