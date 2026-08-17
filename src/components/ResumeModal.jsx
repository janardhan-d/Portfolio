import React from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Code2,
  Sparkles
} from 'lucide-react';
import { personalDetails, experienceData, certsData, skillsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Triggers direct print to save as PDF or prompt file download
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border border-slate-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-bold text-slate-100 text-sm">
              Janardhan_Devarala_Resume.pdf
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-cyan-400 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Sheet Content (Print Optimized) */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-900 text-slate-100 space-y-6 print:p-0 print:bg-white print:text-black">
          
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 print:border-gray-300">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 print:text-black tracking-tight">
              {personalDetails.name}
            </h1>
            <p className="text-sm font-semibold text-cyan-400 print:text-blue-700 mt-1">
              {personalDetails.headline}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400 print:text-gray-700 mt-3 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalDetails.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalDetails.phone}</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{personalDetails.email}</span>
              </span>
              <a
                href={personalDetails.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-cyan-400"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400 print:text-blue-700 border-b border-slate-800 print:border-gray-300 pb-1 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </h2>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-100 print:text-black text-sm">
                  {personalDetails.college}
                </h3>
                <span className="text-xs font-mono text-slate-400 print:text-gray-600">
                  {personalDetails.batch}
                </span>
              </div>
              <p className="text-xs text-cyan-300 print:text-gray-800 font-medium">
                {personalDetails.degree} (Affiliated to JNTU Anantapur)
              </p>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400 print:text-blue-700 border-b border-slate-800 print:border-gray-300 pb-1 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>Work Experience & Internships</span>
            </h2>
            <div className="space-y-4">
              {experienceData.map((exp, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-100 print:text-black text-sm">
                      {exp.role} — <span className="text-cyan-400 print:text-blue-700">{exp.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-400 print:text-gray-600">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 print:text-gray-800 pl-2">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400 print:text-blue-700 border-b border-slate-800 print:border-gray-300 pb-1 mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skillsData.map((cat) => (
                <div key={cat.category} className="bg-slate-950/60 print:bg-gray-100 p-2.5 rounded-lg">
                  <span className="font-bold text-slate-200 print:text-black block mb-1">
                    {cat.category}:
                  </span>
                  <span className="text-slate-400 print:text-gray-700">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs uppercase font-mono font-bold tracking-wider text-cyan-400 print:text-blue-700 border-b border-slate-800 print:border-gray-300 pb-1 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Certifications & Achievements</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {certsData.map((c, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-semibold text-slate-200 print:text-black">{c.title}</span>
                  <span className="text-[11px] text-cyan-400 print:text-blue-700 font-mono">
                    {c.issuer} • ID: {c.credentialId}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            Janardhan Devarala • B.Tech AI (2023-2027)
          </span>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(0,243,255,0.3)] flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-slate-100 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
