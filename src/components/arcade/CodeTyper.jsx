import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { codeSnippets } from '../../data/arcadeData';

export default function CodeTyper() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [scoreWpm, setScoreWpm] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [typerGameOver, setTyperGameOver] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTyperGameOver(true);
      confetti({ particleCount: 80, spread: 70 });
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const handleTypeChange = (e) => {
    const val = e.target.value;
    setTypedInput(val);
    if (!isTimerRunning && !typerGameOver) setIsTimerRunning(true);

    const target = codeSnippets[snippetIndex];
    if (val === target) {
      setCompletedCount((c) => c + 1);
      setScoreWpm((w) => w + Math.round(target.length * 1.5));
      setTypedInput('');
      setSnippetIndex((idx) => (idx + 1) % codeSnippets.length);
    }
  };

  const resetTyperGame = () => {
    setSnippetIndex(0);
    setTypedInput('');
    setScoreWpm(0);
    setCompletedCount(0);
    setTimeLeft(30);
    setIsTimerRunning(false);
    setTyperGameOver(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Time Left</span>
            <p className="text-2xl font-black text-amber-400 font-mono">{timeLeft}s</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Snippets Passed</span>
            <p className="text-2xl font-black text-white font-mono">{completedCount}</p>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Score (WPM)</span>
            <p className="text-2xl font-black text-amber-500 font-mono">{scoreWpm}</p>
          </div>
        </div>

        <button
          onClick={resetTyperGame}
          className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Target Snippet with Character-by-Character Highlighting */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 text-left space-y-4">
        <span className="text-xs font-mono text-amber-400 uppercase font-bold block">
          Type exact code syntax below (watch character match):
        </span>

        {/* Character by character display */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xl sm:text-2xl tracking-wide flex flex-wrap items-center">
          {codeSnippets[snippetIndex].split('').map((char, i) => {
            let colorClass = 'text-slate-500';
            let bgClass = '';
            const isCurrent = i === typedInput.length;

            if (i < typedInput.length) {
              if (typedInput[i] === char) {
                colorClass = 'text-emerald-400 font-bold';
                bgClass = 'bg-emerald-500/10';
              } else {
                colorClass = 'text-rose-400 font-bold underline';
                bgClass = 'bg-rose-500/20';
              }
            }

            return (
              <span
                key={i}
                className={`relative px-0.5 rounded ${colorClass} ${bgClass} ${
                  isCurrent ? 'border-b-2 border-amber-400 animate-pulse' : ''
                }`}
              >
                {char === ' ' ? ' ' : char}
              </span>
            );
          })}
        </div>

        <input
          type="text"
          value={typedInput}
          onChange={handleTypeChange}
          disabled={typerGameOver}
          placeholder="Type snippet here to start timer..."
          className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-amber-500/50 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
          autoFocus
          aria-label="Code typing input"
        />
      </div>
    </div>
  );
}
