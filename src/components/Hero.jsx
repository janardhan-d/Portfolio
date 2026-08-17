import React from 'react';
import { 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  CheckCircle2, 
  Award, 
  Briefcase, 
  Gamepad2
} from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export default function Hero({ onOpenResume, onOpenArcade }) {
  return (
    <section id="home" className="pt-28 sm:pt-36 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Recruiter & Hiring Manager Spotlight Notification Banner */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-amber-300 font-bold">
              OPEN FOR INTERNSHIPS & FULL-STACK / PYTHON ROLES
            </span>
            <button
              onClick={onOpenArcade}
              className="ml-2 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 hover:bg-amber-400 transition-colors"
            >
              <Gamepad2 className="w-3 h-3" />
              <span>Dev PlaySpace</span>
            </button>
          </div>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>B.Tech AI Student & Python Developer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Hi, I'm <span className="gradient-text-gold">Janardhan Devarala</span>
            </h1>

            <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
              {personalDetails.tagline}
            </p>

            {/* Core Capability Highlights */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-amber-500/30">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Python & Tkinter Specialist</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-amber-500/30">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>React & Node Full-Stack</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-amber-500/30">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Certified DSA (APSCHE & CSC India)</span>
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
                className="px-6 py-3.5 rounded-xl bg-slate-900 text-white border border-amber-500/40 hover:border-amber-400 text-sm font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Interactive Resume</span>
              </button>

              <button
                onClick={onOpenArcade}
                className="px-5 py-3.5 rounded-xl bg-slate-900/80 text-amber-400 border border-slate-800 hover:border-amber-400 text-sm font-extrabold flex items-center gap-2 transition-all hover:scale-105"
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
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-400 border border-slate-300 dark:border-slate-800 transition-colors"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-400 border border-slate-300 dark:border-slate-800 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalDetails.email}`}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-amber-400 border border-slate-300 dark:border-slate-800 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Premium Shimmer Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md glass-panel rounded-3xl p-8 border border-amber-500/40 neon-border-hover shimmer-card shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-black text-amber-400 text-lg">
                      JD
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">
                      {personalDetails.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-mono">
                      B.Tech AI (2023 - 2027)
                    </p>
                  </div>
                </div>

                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              </div>

              {/* Key Capstones Highlights */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  CAPSTONE HIGHLIGHTS
                </span>
                
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Finance Manager (Python Desktop GUI)</h4>
                    <p className="text-[10px] text-slate-400">InnoByte Services Internship Capstone</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">DSA Certification (Python)</h4>
                    <p className="text-[10px] text-slate-400">APSCHE & CSC India Verified: CSCIndia-663B777P</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-semibold">Location:</span>
                <span className="text-amber-300 font-bold">Andhra Pradesh, India</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
