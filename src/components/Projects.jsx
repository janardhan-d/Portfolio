import React, { useState } from 'react';
import { 
  Github, 
  ExternalLink, 
  Sparkles, 
  Info,
  Star
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Python / GUI', 'Full-Stack & AI', 'Full-Stack'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proof Of Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Featured <span className="gradient-text-gold">Projects</span>
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-xl mt-3 font-medium leading-relaxed">
            Real-world software built during my Python developer internship, open-source work, and full-stack projects.
          </p>

          <div className="w-20 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full mt-4" />
        </div>

        {/* Filter Tabs Bar */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-slate-200/80 dark:bg-slate-900/90 p-2 rounded-2xl border border-slate-300 dark:border-amber-500/30 shadow-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105'
                    : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-slate-800/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel rounded-3xl overflow-hidden flex flex-col justify-between neon-border-hover group shimmer-card shadow-2xl"
            >
              <div>
                {/* Project Header Banner (Dark Naval Obsidian for Crisp Legibility in BOTH Themes) */}
                <div className="p-6 bg-slate-950 border-b border-amber-500/30 relative">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-slate-950" />
                        <span>Capstone Project</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-white mt-4 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-amber-300/90 font-mono mt-1 font-semibold">
                    {project.subtitle}
                  </p>
                </div>

                {/* Body Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-100 dark:bg-slate-900 text-amber-800 dark:text-amber-300 border border-slate-300 dark:border-amber-500/30 font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Links Footer */}
              <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800/80 mt-4 pt-4">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-extrabold text-amber-600 dark:text-amber-400 hover:text-amber-500 flex items-center gap-1.5 group/btn"
                >
                  <Info className="w-4 h-4" />
                  <span>View Details & Demo</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white hover:text-amber-500 border border-slate-300 dark:border-slate-700 hover:border-amber-500 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 text-xs font-extrabold flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                    title="Open Live Interactive Demo Showcase"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal Window Render */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
}
