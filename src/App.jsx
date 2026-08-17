import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
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
import ResumeModal from './components/ResumeModal';
import JarvisBot from './components/JarvisBot';
import AdminModal from './components/AdminModal';
import RecruiterArcade from './components/RecruiterArcade';

const sectionsList = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track visit in local SQLite database on app load
  useEffect(() => {
    const recordLocalVisit = async () => {
      try {
        await fetch('http://localhost:5000/api/visit', { method: 'POST' });
      } catch (err) {
        console.warn('Local SQLite API server offline or restarting:', err);
      }
    };
    recordLocalVisit();
  }, []);

  // Active section scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionsList.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionsList[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionsList[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-amber-400 selection:text-slate-950">
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

      {/* AI Portfolio Assistant */}
      <JarvisBot
        activeSection={activeSection}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Live Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Author Admin Database Security Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Recruiter Arcade Mini-Games Modal */}
      <RecruiterArcade
        isOpen={isArcadeOpen}
        onClose={() => setIsArcadeOpen(false)}
      />
    </div>
  );
}
