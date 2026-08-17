import React from 'react';
import { 
  X, 
  Github, 
  ExternalLink, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  Terminal,
  Play,
  Monitor
} from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0e1322] rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-amber-500/30 relative flex items-start justify-between">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {project.category}
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              {project.title}
            </h3>
            <p className="text-xs text-amber-300/90 font-mono mt-1 font-semibold">
              {project.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 bg-[#0e1322]">
          
          {/* Interactive Demo Graphic Frame */}
          <div className="rounded-2xl bg-slate-950 border border-amber-500/30 overflow-hidden shadow-inner">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">
                  demo://janardhan-d/{project.id}
                </span>
              </div>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                Live Interactive Preview
              </span>
            </div>

            <div className="p-8 flex flex-col items-center justify-center text-center space-y-3 bg-gradient-to-b from-slate-950 to-slate-900">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                <Monitor className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold text-white">
                {project.title} Preview
              </h4>
              <p className="text-xs text-slate-300 max-w-md">
                {project.description}
              </p>
              <div className="flex items-center gap-2 pt-2">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-amber-400 tracking-wider mb-2">
              Project Overview
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h4 className="text-xs uppercase font-mono font-bold text-amber-400 tracking-wider mb-2">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 text-amber-300 border border-amber-500/30 font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features List */}
          {project.features && (
            <div>
              <h4 className="text-xs uppercase font-mono font-bold text-amber-400 tracking-wider mb-2">
                Key Highlights & Features
              </h4>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* System Architecture */}
          {project.architecture && (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <h4 className="text-xs uppercase font-mono font-bold text-amber-400 tracking-wider mb-1 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-amber-400" />
                <span>Architecture Note</span>
              </h4>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">
                {project.architecture}
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:text-amber-400 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 text-xs font-extrabold shadow-lg"
          >
            Close Demonstration
          </button>
        </div>

      </div>
    </div>
  );
}
