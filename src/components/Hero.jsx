import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Gamepad2,
  Code2,
  Bot,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { personalDetails } from '../data/portfolioData';
import Avatar3D from './Avatar3D';

export default function Hero({ onOpenResume, onOpenArcade }) {
  const [activeVisual, setActiveVisual] = useState('photo'); // 'photo' | 'avatar'

  // 3D Tilt calculation for photo card
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 12;
    const ry = (x / (rect.width / 2)) * 14;
    setTilt({ rx, ry, s: 1.02 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, s: 1 });
  };

  return (
    <section id="home" className="pt-24 sm:pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Recruiter & Hiring Manager Spotlight Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)] backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-amber-300 font-bold">
              OPEN FOR INTERNSHIPS &amp; FULL-STACK / PYTHON ROLES
            </span>
            <button
              onClick={onOpenArcade}
              className="ml-2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 hover:bg-amber-400 transition-colors shadow-sm"
            >
              <Gamepad2 className="w-3 h-3" />
              <span>Dev PlaySpace</span>
            </button>
          </div>
        </motion.div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Bio & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>B.Tech AI Engineer &amp; Full-Stack Python Developer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Hi, I'm <span className="gradient-text-gold">Janardhan Devarala</span>
            </h1>

            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
              {personalDetails.tagline}
            </p>

            {/* Core Capability Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-amber-500/30 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Python &amp; Tkinter Specialist</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-amber-500/30 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>React &amp; Node Full-Stack</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-amber-500/30 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Certified DSA (APSCHE &amp; CSC India)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-sm flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>View Proof Of Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white border border-amber-500/40 hover:border-amber-400 text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Interactive Resume</span>
              </button>

              <button
                onClick={onOpenArcade}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 text-amber-400 border border-slate-800 hover:border-amber-400 text-sm font-extrabold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                title="Play Developer Mini-Games"
              >
                <Gamepad2 className="w-4.5 h-4.5 text-amber-400 animate-pulse" />
                <span>Dev PlaySpace</span>
              </button>
            </div>

            {/* Social Quick Links */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-slate-400">
              <span className="text-xs font-mono text-slate-500 font-bold">CONNECT:</span>
              <a
                href={personalDetails.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-400 border border-slate-300 dark:border-slate-800 transition-all hover:scale-110"
                title="GitHub Profile"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-400 border border-slate-300 dark:border-slate-800 transition-all hover:scale-110"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href={`mailto:${personalDetails.email}`}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-400 border border-slate-300 dark:border-slate-800 transition-all hover:scale-110"
                title="Send Email"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </div>

          </motion.div>

          {/* Right Column: 3D Holographic Portrait Card & AI Avatar Toggle */}
          <motion.div 
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            
            {/* View Mode Toggle Switcher */}
            <div className="mb-4 inline-flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md shadow-lg">
              <button
                onClick={() => setActiveVisual('photo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeVisual === 'photo'
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>3D Profile</span>
              </button>
              <button
                onClick={() => setActiveVisual('avatar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeVisual === 'avatar'
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Companion</span>
              </button>
            </div>

            {activeVisual === 'photo' ? (
              /* 3D Interactive Parallax Photo Card */
              <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`,
                  transition: 'transform 0.15s ease-out'
                }}
                className="relative group cursor-pointer w-72 sm:w-80"
              >
                {/* Ambient Golden Glow Backdrop */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500/40 via-yellow-500/20 to-amber-600/40 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Main Card Frame */}
                <div className="relative rounded-3xl bg-slate-950/90 border-2 border-amber-500/50 p-3 shadow-2xl overflow-hidden backdrop-blur-xl">
                  
                  {/* Photo Container with subtle inner border */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 border border-amber-500/30">
                    <img 
                      src="/photos/janardhan-blazer.jpg" 
                      alt="Janardhan Devarala" 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient bottom overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                    {/* Floating Tech Chips Inside Photo */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 border border-amber-500/40 backdrop-blur-md text-[10px] font-mono text-amber-300 font-extrabold flex items-center gap-1 shadow-md">
                      <Code2 className="w-3 h-3 text-amber-400" />
                      <span>Python &amp; AI</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-[10px] font-mono text-emerald-300 font-extrabold flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Available</span>
                    </div>

                    {/* Bottom Info Banner */}
                    <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-900/90 border border-amber-500/40 backdrop-blur-md shadow-xl text-left">
                      <h3 className="text-white font-extrabold text-sm flex items-center gap-1.5">
                        <span>Janardhan Devarala</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      </h3>
                      <p className="text-[11px] text-amber-300 font-mono mt-0.5">
                        Python Specialist • B.Tech AI (2023-27)
                      </p>
                    </div>
                  </div>

                  {/* Corner Accent Glow Orbs */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
                </div>
              </div>
            ) : (
              /* 3D Animated Interactive Avatar Companion */
              <div className="w-full flex justify-center">
                <Avatar3D />
              </div>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
