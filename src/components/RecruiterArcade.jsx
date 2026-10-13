import React, { useState } from 'react';
import { Gamepad2, X } from 'lucide-react';
import { useEscapeKey } from '../hooks/useEscapeKey';
import NeonSnake from './arcade/NeonSnake';
import CodeTyper from './arcade/CodeTyper';
import StackMemory from './arcade/StackMemory';
import PromptTuner from './arcade/PromptTuner';
import BugSmasher from './arcade/BugSmasher';

const tabsList = [
  { id: 'snake', label: '🐍 Neon Snake', badge: 'Canvas 60fps' },
  { id: 'typer', label: '⚡ Code Typer', badge: 'Live WPM' },
  { id: 'memory', label: '🧠 Stack Memory', badge: '3D Flip' },
  { id: 'prompt', label: '🤖 LLM Prompt Tuner', badge: 'AI Preview' },
  { id: 'bugs', label: '🐛 Bug Smasher', badge: 'Combo' }
];

// Shell for the Dev PlaySpace. Each game is an isolated component
// under ./arcade/ and mounts only when its tab is active, so hidden
// games never run timers or keyboard listeners in the background.
export default function RecruiterArcade({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('snake');

  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-4xl glass-panel rounded-3xl p-5 sm:p-7 border border-amber-500/40 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Dev PlaySpace arcade"
      >

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
              <Gamepad2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Dev PlaySpace <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono border border-amber-500/30">60FPS Arcade</span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">Interactive games testing speed, logic, debugging &amp; snake skills!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close arcade"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80" role="tablist">
          {tabsList.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20 scale-102'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 text-[9px] rounded-md bg-slate-950/80 text-amber-300 border border-amber-500/30 font-mono">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Active Game — only the visible game is mounted */}
        {activeTab === 'snake' && <NeonSnake />}
        {activeTab === 'typer' && <CodeTyper />}
        {activeTab === 'memory' && <StackMemory />}
        {activeTab === 'prompt' && <PromptTuner />}
        {activeTab === 'bugs' && <BugSmasher />}

      </div>
    </div>
  );
}
