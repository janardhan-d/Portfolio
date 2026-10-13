import React, { useState, useEffect } from 'react';
import { Bug, Flame, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { bugItemsList } from '../../data/arcadeData';

export default function BugSmasher() {
  const [bugs, setBugs] = useState(bugItemsList);
  const [smashedScore, setSmashedScore] = useState(0);
  const [bugsTimeLeft, setBugsTimeLeft] = useState(25);
  const [bugsRunning, setBugsRunning] = useState(false);
  const [bugsGameOver, setBugsGameOver] = useState(false);
  const [combo, setCombo] = useState(1);

  useEffect(() => {
    let t = null;
    if (bugsRunning && bugsTimeLeft > 0) {
      t = setInterval(() => setBugsTimeLeft((time) => time - 1), 1000);
    } else if (bugsTimeLeft === 0 && bugsRunning) {
      setBugsRunning(false);
      setBugsGameOver(true);
      confetti({ particleCount: 70, spread: 70 });
    }
    return () => clearInterval(t);
  }, [bugsRunning, bugsTimeLeft]);

  const smashBug = (id) => {
    if (!bugsRunning) setBugsRunning(true);
    const added = 100 * combo;
    setSmashedScore((s) => s + added);
    setCombo((c) => Math.min(c + 1, 5));
    setBugs((prev) => prev.filter((b) => b.id !== id));

    if (bugs.length <= 2) {
      setTimeout(() => setBugs(bugItemsList.sort(() => Math.random() - 0.5)), 250);
    }
  };

  const resetBugsGame = () => {
    setBugs(bugItemsList);
    setSmashedScore(0);
    setBugsTimeLeft(25);
    setCombo(1);
    setBugsRunning(false);
    setBugsGameOver(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Time Left</span>
            <p className="text-2xl font-black text-amber-400 font-mono">{bugsTimeLeft}s</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Score</span>
            <p className="text-2xl font-black text-amber-500 font-mono">{smashedScore}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Combo Streak</span>
            <p className="text-2xl font-black text-emerald-400 font-mono flex items-center gap-1">
              <span>{combo}x</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </p>
          </div>
        </div>

        <button
          onClick={resetBugsGame}
          className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {bugs.map((bug) => (
          <div
            key={bug.id}
            onClick={() => smashBug(bug.id)}
            className="p-4 rounded-xl bg-slate-900 border border-rose-500/40 hover:bg-rose-500/20 cursor-pointer flex items-center justify-between transition-all transform hover:scale-102 active:scale-95 group shadow-md"
            role="button"
            aria-label={`Smash bug: ${bug.label}`}
          >
            <div className="flex items-center gap-3">
              <Bug className="w-5 h-5 text-rose-400 group-hover:animate-bounce" />
              <span className="text-xs font-mono font-bold text-slate-200">{bug.label}</span>
            </div>
            <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold uppercase shadow-sm">
              Smash!
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
