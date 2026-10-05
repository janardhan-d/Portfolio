import React, { useState, useRef } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Code2, 
  Building2, 
  Calendar, 
  Award, 
  Sparkles, 
  Briefcase,
  Lightbulb,
  Terminal,
  Cpu
} from 'lucide-react';
import { motion } from 'framer-motion';
import { personalDetails } from '../data/portfolioData';
import ScrollReveal from './ScrollReveal';

export default function About() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 10;
    const ry = (x / (rect.width / 2)) * 12;
    setTilt({ rx, ry, s: 1.02 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, s: 1 });
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get To Know Me</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            About <span className="gradient-text-gold">Janardhan Devarala</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mt-3 font-medium">
            AI student, Python developer, and rapid prototyper building reliable real-world systems.
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mt-4" />
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Cinematic Portrait Card */}
          <ScrollReveal direction="left" className="lg:col-span-5 flex flex-col justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`,
                transition: 'transform 0.15s ease-out'
              }}
              className="relative group cursor-pointer w-full max-w-md mx-auto"
            >
              {/* Backlight Aura Glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/30 via-slate-800 to-amber-600/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Glass Frame */}
              <div className="relative rounded-3xl bg-slate-950/90 border-2 border-amber-500/40 p-3 shadow-2xl overflow-hidden backdrop-blur-xl">
                
                {/* Photo Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-slate-800">
                  <img 
                    src="/photos/janardhan-cinematic.jpg" 
                    alt="Janardhan Devarala - Thinking Stance" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter contrast-110"
                  />

                  {/* Dramatic vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 border border-amber-500/40 text-[10px] font-mono text-amber-300 font-extrabold flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    <Lightbulb className="w-3 h-3 text-amber-400" />
                    <span>System Thinker</span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 inset-x-3 p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md text-left shadow-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-extrabold text-sm">Janardhan Devarala</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold">
                        B.Tech AI '27
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 font-medium">
                      "Building practical, real-world software — from financial analytics to full-stack AI web apps."
                    </p>
                  </div>
                </div>

                {/* Subtle corner tech ornaments */}
                <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Cpu className="w-3.5 h-3.5" /> AI Engineer
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Terminal className="w-3.5 h-3.5" /> Python / Full-Stack
                  </span>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Story Narrative, Education & Facts */}
          <ScrollReveal direction="right" className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Story Panel */}
            <div className="glass-panel rounded-2xl p-7 neon-border-hover shadow-2xl space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Code2 className="w-5 h-5" />
                </span>
                <span>Passionate Engineer &amp; Learner</span>
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
                <span>Based in {personalDetails.location} • Open to Remote &amp; Relocation</span>
              </div>
            </div>

            {/* Education Highlight Card */}
            <div className="glass-panel rounded-2xl p-6 neon-border-hover relative overflow-hidden shadow-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono font-extrabold">
                    ACADEMIC FOUNDATION
                  </span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">
                    {personalDetails.degree}
                  </h4>
                </div>
              </div>

              <div className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200 font-medium">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span className="font-extrabold text-slate-900 dark:text-white">{personalDetails.college}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-300 pl-6">
                  Affiliated to JNTU Anantapur • CGPA 8.2+
                </p>
                <div className="flex items-center gap-2 pl-6 text-xs font-mono text-amber-600 dark:text-amber-300 pt-0.5 font-bold">
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
                  <span className="text-sm font-black text-slate-900 dark:text-white mt-1.5 line-clamp-2">
                    {fact.value}
                  </span>
                </div>
              ))}
            </div>

          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
