import React, { useState } from 'react';
import { Sliders, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { promptChallenges } from '../../data/arcadeData';

export default function PromptTuner() {
  const [promptIdx, setPromptIdx] = useState(0);
  const [tempVal, setTempVal] = useState(0.2);
  const [topPVal, setTopPVal] = useState(0.9);
  const [promptEvaluated, setPromptEvaluated] = useState(false);
  const [promptPassed, setPromptPassed] = useState(false);

  const evaluatePromptSettings = () => {
    setPromptEvaluated(true);
    if (promptIdx === 0) {
      if (tempVal <= 0.3 && topPVal >= 0.8) {
        setPromptPassed(true);
        confetti({ particleCount: 75, spread: 70 });
      } else {
        setPromptPassed(false);
      }
    } else {
      if (tempVal >= 0.7) {
        setPromptPassed(true);
        confetti({ particleCount: 75, spread: 70 });
      } else {
        setPromptPassed(false);
      }
    }
  };

  // Real-time simulated output text preview based on sliders
  const getSimulatedOutput = () => {
    if (promptIdx === 0) {
      if (tempVal <= 0.3) {
        return `# Generated with Temp: ${tempVal}, Top-P: ${topPVal}\ndef parse_transaction(payload: dict) -> dict:\n    """Deterministic, type-safe financial processing."""\n    return {\n        "status": "APPROVED",\n        "amount": round(float(payload.get("amount", 0)), 2)\n    }`;
      } else if (tempVal <= 0.6) {
        return `# Generated with Temp: ${tempVal}, Top-P: ${topPVal}\ndef parse_transaction(payload):\n    # Moderate creativity - might include comments or slight syntax drift\n    return {"status": "ok", "data": payload}`;
      } else {
        return `// Warning: Non-deterministic output detected!\n"The transactions flow like cosmic rivers through computational ether..."\n[ERROR: SyntaxError: Expected valid Python code, received imaginative prose]`;
      }
    } else {
      if (tempVal >= 0.7) {
        return `"Under the dual moons of Kepler-452b, the explorer gazed into the neon ruins of an ancient synthetic mind..."\n[SUCCESS: High variance creative narrative output]`;
      } else {
        return `"The astronaut arrived at the planet. The weather was normal. The mission proceeded."\n[FEEDBACK: Too robotic! Increase temperature for creative storytelling]`;
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <span>{promptChallenges[promptIdx].title}</span>
          </h3>
          <div className="flex gap-1.5">
            {promptChallenges.map((_, i) => (
              <button
                key={i}
                onClick={() => { setPromptIdx(i); setPromptEvaluated(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  promptIdx === i ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                }`}
              >
                Challenge #{i + 1}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-slate-300">{promptChallenges[promptIdx].description}</p>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
          Goal: {promptChallenges[promptIdx].task}
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Temperature (Creativity):</span>
              <span className="text-amber-400 font-bold">{tempVal}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={tempVal}
              onChange={(e) => {
                setTempVal(parseFloat(e.target.value));
                setPromptEvaluated(false);
              }}
              className="w-full accent-amber-500"
              aria-label="Temperature"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Deterministic (0.0)</span>
              <span>Creative (1.0)</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Top-P (Nucleus Sampling):</span>
              <span className="text-amber-400 font-bold">{topPVal}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.05"
              value={topPVal}
              onChange={(e) => {
                setTopPVal(parseFloat(e.target.value));
                setPromptEvaluated(false);
              }}
              className="w-full accent-amber-500"
              aria-label="Top-P"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Focused (0.1)</span>
              <span>Broad (1.0)</span>
            </div>
          </div>
        </div>

        {/* Real-time LLM Output Simulation Preview */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            Live AI Token Stream Preview:
          </span>
          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-mono text-xs whitespace-pre-wrap leading-relaxed shadow-inner">
            {getSimulatedOutput()}
          </pre>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={evaluatePromptSettings}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition-transform"
          >
            Verify Model Configuration
          </button>

          {promptEvaluated && (
            <div className={`px-4 py-2 rounded-xl border font-mono text-xs font-bold ${
              promptPassed
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                : 'bg-rose-500/20 border-rose-500 text-rose-300'
            }`}>
              {promptPassed
                ? "✅ Verified! Optimal parameters for this AI workload."
                : "⚠️ Adjust parameters to match challenge objective."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
