import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { useTheme } from './hooks/useTheme';
import { apiFetch } from './lib/api';
import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Lazy-loaded: modals + arcade (1,000+ lines of game code) leave the
// initial bundle and only load when a visitor actually opens them.
const ResumeModal = lazy(() => import('./components/ResumeModal'));
const JarvisBot = lazy(() => import('./components/JarvisBot'));
const AdminModal = lazy(() => import('./components/AdminModal'));
const RecruiterArcade = lazy(() => import('./components/RecruiterArcade'));

const sectionsList = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track visit in the portfolio database on app load
  useEffect(() => {
    const recordLocalVisit = async () => {
      try {
        await apiFetch('/api/visit', { method: 'POST' });
      } catch (err) {
        console.warn('Portfolio API server offline or restarting:', err);
      }
    };
    recordLocalVisit();
  }, []);

  // Active section & scroll progress tracking.
  // Scroll events fire far faster than renders — batch all state
  // updates into a single requestAnimationFrame callback so the app
  // renders at most once per frame instead of once per event.
  useEffect(() => {
    let rafId = null;

    const updateFromScroll = () => {
      rafId = null;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      const scrollPosition = window.scrollY + 200;
      for (let i = sectionsList.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionsList[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionsList[i]);
          break;
        }
      }
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateFromScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-amber-400 selection:text-slate-950">

      {/* Trending Top Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 z-50 shadow-[0_0_10px_#f59e0b]"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Page scroll progress"
      />

      {/* Dynamic Reactive Particle Canvas */}
      <ParticleCanvas isDark={theme === 'dark'} />

      {/* Glassmorphic Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenArcade={() => setIsArcadeOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="relative z-10 space-y-12 sm:space-y-20">
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenArcade={() => setIsArcadeOpen(true)}
        />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      {/* Page Footer */}
      <Footer
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenArcade={() => setIsArcadeOpen(true)}
      />

      {/* AI Portfolio Assistant (loaded on demand) */}
      <Suspense fallback={null}>
        <JarvisBot
          activeSection={activeSection}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </Suspense>

      {/* Live Resume Modal (loaded on demand) */}
      <Suspense fallback={null}>
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </Suspense>

      {/* Author Admin Database Security Modal (loaded on demand) */}
      <Suspense fallback={null}>
        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </Suspense>

      {/* Recruiter Arcade Mini-Games Modal (loaded on demand) */}
      <Suspense fallback={null}>
        <RecruiterArcade
          isOpen={isArcadeOpen}
          onClose={() => setIsArcadeOpen(false)}
        />
      </Suspense>
    </div>
  );
}
