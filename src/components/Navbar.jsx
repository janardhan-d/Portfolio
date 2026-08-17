import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  Gamepad2
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme, onOpenResume, onOpenArcade }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-3 shadow-2xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Professional Full Brand Logo */}
        <a href="#home" className="flex items-center gap-3.5 group">
          {/* Logo Mark Emblem */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 p-[1.5px] shadow-[0_0_25px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-amber-300/10 opacity-70" />
              <div className="relative flex items-center justify-center font-black font-mono text-amber-400 tracking-tighter text-base">
                <span className="gradient-text-gold font-extrabold text-lg">JD</span>
              </div>
            </div>
          </div>

          {/* Full Name & Tagline */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight group-hover:text-amber-400 transition-colors">
                Janardhan
              </span>
              <span className="font-black text-lg sm:text-xl gradient-text-gold tracking-tight">
                Devarala
              </span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="text-[10px] font-mono font-bold tracking-wider text-amber-600 dark:text-amber-400/90 uppercase">
                AI Engineer & Full-Stack
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-200/60 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-300/70 dark:border-amber-500/30 shadow-lg backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-amber-500/20 transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Controls (Dev PlaySpace, Theme, Resume) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Dev PlaySpace Trigger Button */}
          <button
            onClick={onOpenArcade}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 hover:text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-md hover:scale-105"
            title="Play Developer Mini-Games"
          >
            <Gamepad2 className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="hidden md:inline font-extrabold">Dev PlaySpace</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300 dark:border-amber-500/30 text-slate-700 dark:text-amber-400 hover:scale-105 transition-all shadow-md"
            title="Toggle Light / Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-900" />}
          </button>

          {/* Interactive Resume Button */}
          <button
            onClick={onOpenResume}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] transition-all hover:scale-105 active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenArcade}
            className="p-2 rounded-lg bg-slate-900 border border-amber-500/40 text-amber-400"
          >
            <Gamepad2 className="w-4 h-4" />
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-amber-500/30 text-slate-700 dark:text-amber-400"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-900" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-amber-500/30 text-slate-800 dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-nav border-b border-amber-500/30 p-4 space-y-3 mt-2 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenArcade();
              }}
              className="w-full py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-amber-400 font-extrabold text-xs flex items-center justify-center gap-2"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Dev PlaySpace (Mini-Games)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>View Full Resume</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
