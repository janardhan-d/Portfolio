import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  BarChart3, 
  Cpu, 
  Trophy,
  X,
  Maximize2,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  Cloud,
  Medal,
  Terminal,
  Layers,
  Flame,
  Check
} from 'lucide-react';
import { certsData } from '../data/portfolioData';
import ScrollReveal, { StaggerContainer, staggerItem } from './ScrollReveal';
import { motion } from 'framer-motion';

const iconMap = {
  Award: Award,
  BarChart3: BarChart3,
  ShieldCheck: ShieldCheck,
  Sparkles: Sparkles,
  Cpu: Cpu,
  Trophy: Trophy,
  GraduationCap: GraduationCap,
  Cloud: Cloud
};

const categoryTabs = [
  { id: 'all', label: 'All Credentials', icon: Sparkles },
  { id: 'internships', label: '🎓 Internships', icon: GraduationCap },
  { id: 'hackathons', label: '🏅 Hackathons', icon: Trophy },
  { id: 'cloud', label: '🌐 Cloud & Tech', icon: Cloud },
  { id: 'recognitions', label: '📑 Simulations & Badges', icon: Medal },
];

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredCerts = selectedCategory === 'all' 
    ? certsData 
    : certsData.filter(c => c.category === selectedCategory);

  return (
    <section id="achievements" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up" className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Credentials &amp; Honors</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Achievements &amp; <span className="gradient-text-gold">Certifications</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl mt-3 font-medium leading-relaxed">
            Verified internship completion credentials, hackathon finalist trophies, cloud badges, and software engineering simulations.
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mt-4" />
        </ScrollReveal>

        {/* Category Filter Tabs Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categoryTabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = selectedCategory === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Aligned Icon & Symbol Badge Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCerts.map((cert, idx) => {
            const IconComponent = iconMap[cert.icon] || Award;
            const isHovered = hoveredIndex === idx;

            return (
              <motion.div
                key={idx}
                variants={staggerItem}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedCert(cert)}
                className="glass-panel rounded-3xl overflow-hidden border border-amber-500/30 neon-border-hover flex flex-col justify-between group cursor-pointer shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(245,158,11,0.25)] relative"
              >
                {/* 3D Symbol & Metallic Banner Header */}
                <div className="relative h-44 w-full bg-gradient-to-br from-amber-950/70 via-slate-950 to-slate-900 flex flex-col items-center justify-center p-6 border-b border-slate-800/80 overflow-hidden">
                  
                  {/* Background Radial Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent transition-opacity duration-500 ${
                    isHovered ? 'opacity-100' : 'opacity-40'
                  }`} />

                  {/* Sleek Glowing 3D Icon Badge Container */}
                  <div className={`p-4 rounded-2xl bg-slate-900/90 border border-amber-500/50 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)] transform transition-transform duration-500 z-10 ${
                    isHovered ? 'scale-110 border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.45)]' : 'scale-100'
                  }`}>
                    <IconComponent className="w-9 h-9" />
                  </div>

                  {/* Hover Overlay Lightbox Trigger */}
                  <div className={`absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center gap-2 transition-opacity duration-300 z-20 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="p-3 rounded-full bg-amber-500 text-slate-950 shadow-xl transform scale-100 hover:scale-110 transition-transform">
                      <Maximize2 className="w-5 h-5 font-bold" />
                    </div>
                    <span className="text-xs font-bold text-amber-300 font-mono tracking-wide">
                      Click to Inspect Credential
                    </span>
                  </div>

                  {/* Top Badge Overlay */}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-mono font-extrabold bg-slate-900/90 text-amber-400 border border-amber-500/40 backdrop-blur-md shadow-lg flex items-center gap-1 z-10">
                    <FileCheck className="w-3 h-3 text-amber-400" />
                    <span>{cert.badge}</span>
                  </span>
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-extrabold text-amber-500 uppercase tracking-wide">
                        {cert.issuer}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-amber-400 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-medium line-clamp-3">
                      {cert.description}
                    </p>
                  </div>

                  {/* Footer Credential Bar */}
                  <div className="mt-6 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold">
                      ID: {cert.credentialId}
                    </span>
                    <span className="text-xs text-amber-500 hover:text-amber-400 font-extrabold flex items-center gap-1.5">
                      <span>View Record</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </StaggerContainer>

        {/* Certificate Full Lightbox Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-fade-in">
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/50 shadow-2xl space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Verified Credential Record</span>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Title Info */}
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
                  {selectedCert.issuer} • {selectedCert.date}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {selectedCert.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              {/* Certificate Image Document Preview inside Lightbox */}
              {selectedCert.image && (
                <div className="rounded-2xl overflow-hidden border border-amber-500/40 bg-slate-950 p-3 shadow-2xl flex items-center justify-center">
                  <img 
                    src={selectedCert.image} 
                    alt={selectedCert.title} 
                    className="max-h-[450px] w-auto object-contain rounded-xl"
                  />
                </div>
              )}

              {/* Metadata Record */}
              <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 text-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <p><span className="text-slate-400">Recipient:</span> <strong className="text-white">Janardhan Devarala</strong></p>
                  <p><span className="text-slate-400">Issuer:</span> <strong className="text-amber-400">{selectedCert.issuer}</strong></p>
                  <p><span className="text-slate-400">Credential ID:</span> <strong className="text-amber-400">{selectedCert.credentialId}</strong></p>
                  <p><span className="text-slate-400">Verification Status:</span> <strong className="text-emerald-400">100% Authentic & Verified</strong></p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-colors"
                >
                  Close Record
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
