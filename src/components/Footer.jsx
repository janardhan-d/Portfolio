import React from 'react';
import { 
  Github, 
  Linkedin, 
  FileText, 
  ArrowUp, 
  Database,
  Gamepad2
} from 'lucide-react';
import { personalDetails } from '../data/portfolioData';

export default function Footer({ onOpenResume, onOpenAdmin, onOpenArcade }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative bg-slate-950 border-t border-amber-500/30 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Full Name & Copyright */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-[1px] shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-black font-mono text-amber-400 text-sm">
              JD
            </div>
          </div>
          <div>
            <p className="text-sm text-white font-extrabold flex items-center gap-1.5">
              <span>Janardhan</span>
              <span className="gradient-text-gold">Devarala</span>
            </p>
            <p className="text-[11px] text-slate-400">
              © 2026. Audisankara College of Engineering & Technology (A) • B.Tech AI
            </p>
          </div>
        </div>

        {/* Quick Links & Admin DB Trigger */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
          <button
            onClick={onOpenArcade}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-md"
            title="Play Developer Mini-Games"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Dev PlaySpace</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 font-bold hover:bg-amber-500/20 transition-all flex items-center gap-1.5 shadow-md"
            title="View Local SQLite DB Visitor Stats & Saved Messages"
          >
            <Database className="w-3.5 h-3.5" />
            <span>Author DB & Stats</span>
          </button>

          <a
            href={personalDetails.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-300 font-semibold"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={personalDetails.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-300 font-semibold"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>

          <button
            onClick={onOpenResume}
            className="hover:text-amber-400 transition-colors flex items-center gap-1 text-slate-300 font-semibold"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-all"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}
