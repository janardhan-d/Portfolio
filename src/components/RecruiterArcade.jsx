import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  X, 
  Sparkles, 
  Trophy, 
  Timer, 
  Zap, 
  RefreshCw, 
  Brain,
  Cpu,
  Bug,
  Flame,
  CheckCircle2,
  Sliders,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Game 1 Snippets
const codeSnippets = [
  "import sqlite3",
  "def train_model(x, y):",
  "const [state, setState] = useState()",
  "fig, ax = plt.subplots()",
  "app.get('/api/stats', (req, res))",
  "import torch.nn as nn",
  "cursor.execute('SELECT * FROM visits')",
  "export default function App()",
  "np.linspace(0, 10, num=50)",
  "df.groupby('category').mean()"
];

// Game 2 Memory Cards
const memoryCardsList = [
  { id: 1, name: 'Python', icon: '🐍' },
  { id: 2, name: 'React', icon: '⚛️' },
  { id: 3, name: 'SQLite', icon: '🗄️' },
  { id: 4, name: 'Node.js', icon: '🟢' },
  { id: 5, name: 'AI / ML', icon: '🤖' },
  { id: 6, name: 'Tailwind', icon: '🎨' },
];

// Game 3 Prompt Challenges
const promptChallenges = [
  {
    id: 1,
    title: "Optimize LLM Code Generator",
    description: "Adjust Temperature and Top-P to make LLM output deterministic Python code without hallucinations.",
    optimalTemp: 0.2,
    optimalTopP: 0.9,
    task: "Set Temperature <= 0.3 and Top-P >= 0.8 to generate production-ready Python."
  },
  {
    id: 2,
    title: "Creative Storytelling AI",
    description: "Adjust settings to generate imaginative AI response for interactive gaming.",
    optimalTemp: 0.8,
    optimalTopP: 0.95,
    task: "Set Temperature >= 0.7 for max creativity."
  }
];

// Game 4 Bugs List
const bugItemsList = [
  { id: 1, label: "SyntaxError: missing ':'", type: "syntax" },
  { id: 2, label: "Uncaught ReferenceError: x is not defined", type: "reference" },
  { id: 3, label: "TypeError: Cannot read property 'map' of undefined", type: "type" },
  { id: 4, label: "IndentationError: unexpected indent", type: "indent" },
  { id: 5, label: "UnhandledPromiseRejectionWarning: Missing await", type: "async" },
  { id: 6, label: "RecursionError: maximum depth exceeded", type: "recursion" },
];

export default function RecruiterArcade({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('typer'); // 'typer', 'memory', 'prompt', 'bugs'

  // --- Game 1: Speed Typer State ---
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [scoreWpm, setScoreWpm] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [typerGameOver, setTyperGameOver] = useState(false);

  // --- Game 2: Memory Matcher State ---
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryGameOver, setMemoryGameOver] = useState(false);

  // --- Game 3: Prompt Engineer State ---
  const [promptIdx, setPromptIdx] = useState(0);
  const [tempVal, setTempVal] = useState(0.7);
  const [topPVal, setTopPVal] = useState(0.9);
  const [promptScore, setPromptScore] = useState(0);
  const [promptResult, setPromptResult] = useState('');

  // --- Game 4: Bug Smasher State ---
  const [activeBugs, setActiveBugs] = useState([]);
  const [smashedCount, setSmashedCount] = useState(0);
  const [bugTimeLeft, setBugTimeLeft] = useState(20);
  const [bugGameActive, setBugGameActive] = useState(false);

  // Initialize Memory Game
  const initMemoryGame = () => {
    const duplicated = [...memoryCardsList, ...memoryCardsList].map((card, idx) => ({
      ...card,
      uniqueId: idx
    }));
    const shuffled = duplicated.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedIds([]);
    setMemoryMoves(0);
    setMemoryGameOver(false);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'memory') {
      initMemoryGame();
    }
  }, [isOpen, activeTab]);

  // Typer Timer Countdown
  useEffect(() => {
    let timer = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setTyperGameOver(true);
      try { confetti({ particleCount: 70, spread: 60 }); } catch (e) {}
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Bug Smasher Timer Countdown
  useEffect(() => {
    let bTimer = null;
    if (bugGameActive && bugTimeLeft > 0) {
      bTimer = setInterval(() => {
        setBugTimeLeft((prev) => prev - 1);
        // Randomly spawn bugs
        if (Math.random() > 0.4) {
          const randomBug = bugItemsList[Math.floor(Math.random() * bugItemsList.length)];
          setActiveBugs((prev) => [...prev.slice(-4), { ...randomBug, key: Date.now() + Math.random() }]);
        }
      }, 1000);
    } else if (bugTimeLeft === 0 && bugGameActive) {
      setBugGameActive(false);
      try { confetti({ particleCount: 80, spread: 70 }); } catch (e) {}
    }
    return () => clearInterval(bTimer);
  }, [bugGameActive, bugTimeLeft]);

  // Typer Input Handler
  const handleTyperChange = (e) => {
    const val = e.target.value;
    if (!isTimerRunning && !typerGameOver) {
      setIsTimerRunning(true);
    }

    setTypedInput(val);

    const targetSnippet = codeSnippets[snippetIndex];
    if (val === targetSnippet) {
      setCompletedCount((prev) => prev + 1);
      setTypedInput('');
      setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
      setScoreWpm((prev) => prev + Math.floor(targetSnippet.length / 2));
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

  // Memory Card Flip Handler
  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedIds.includes(cards[index].uniqueId)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((prev) => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;

      if (cards[firstIdx].id === cards[secondIdx].id) {
        setMatchedIds((prev) => [...prev, cards[firstIdx].uniqueId, cards[secondIdx].uniqueId]);
        setFlippedCards([]);
        
        if (matchedIds.length + 2 === cards.length) {
          setMemoryGameOver(true);
          try { confetti({ particleCount: 90, spread: 70 }); } catch (e) {}
        }
      } else {
        setTimeout(() => setFlippedCards([]), 900);
      }
    }
  };

  // Prompt Engineer Test
  const handleRunPromptSim = () => {
    const currChallenge = promptChallenges[promptIdx];
    if (tempVal <= currChallenge.optimalTemp + 0.15 && topPVal >= currChallenge.optimalTopP - 0.1) {
      setPromptResult(`✅ Optimal Parameters Matched! LLM Output: Perfect Python Code Generation with 100% Deterministic Precision! Score: +100`);
      setPromptScore((prev) => prev + 100);
      try { confetti({ particleCount: 60, spread: 50 }); } catch (e) {}
    } else {
      setPromptResult(`⚠️ Suboptimal Parameters. Temperature is too high (${tempVal}), causing hallucinations. Lower Temperature to <= 0.3!`);
    }
  };

  // Bug Smash Handler
  const handleSmashBug = (key) => {
    setActiveBugs((prev) => prev.filter((b) => b.key !== key));
    setSmashedCount((prev) => prev + 1);
  };

  const startBugGame = () => {
    setBugTimeLeft(20);
    setSmashedCount(0);
    setActiveBugs([bugItemsList[0], bugItemsList[1]]);
    setBugGameActive(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#0e1322] rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* PlaySpace Header */}
        <div className="p-6 bg-slate-950 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Gamepad2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-white">
                  Dev PlaySpace
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  4 Interactive Mini-Games
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Explore speed typing, AI prompt tuning, memory grids, and real-time debugging!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PlaySpace Game Selector Tabs */}
        <div className="flex items-center justify-center bg-slate-900 border-b border-slate-800 p-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-amber-500/30">
            
            <button
              onClick={() => setActiveTab('typer')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                activeTab === 'typer'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>1. Code Speed Typer</span>
            </button>

            <button
              onClick={() => setActiveTab('memory')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                activeTab === 'memory'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5" />
              <span>2. Memory Matcher</span>
            </button>

            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                activeTab === 'prompt'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>3. AI Prompt Tuner</span>
            </button>

            <button
              onClick={() => setActiveTab('bugs')}
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all ${
                activeTab === 'bugs'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Bug className="w-3.5 h-3.5" />
              <span>4. Bug Smasher</span>
            </button>

          </div>
        </div>

        {/* Game Body Container */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#0e1322]">
          
          {/* Game 1: Speed Typer */}
          {activeTab === 'typer' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">TIME REMAINING</span>
                  <span className="text-xl font-black text-amber-400 font-mono mt-0.5 block flex items-center justify-center gap-1">
                    <Timer className="w-4 h-4 text-amber-400" />
                    <span>{timeLeft}s</span>
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">SNIPPETS TYPED</span>
                  <span className="text-xl font-black text-emerald-400 font-mono mt-0.5 block">{completedCount}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400 block font-bold">ESTIMATED WPM</span>
                  <span className="text-xl font-black text-amber-300 font-mono mt-0.5 block">{scoreWpm}</span>
                </div>
              </div>

              {!typerGameOver ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 text-center relative overflow-hidden shadow-inner">
                    <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest font-bold block mb-1">
                      TARGET CODE SNIPPET ({snippetIndex + 1}/{codeSnippets.length})
                    </span>
                    <div className="font-mono text-lg font-bold text-white tracking-wide bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      {codeSnippets[snippetIndex]}
                    </div>
                  </div>
                  <input
                    type="text"
                    disabled={typerGameOver}
                    placeholder={isTimerRunning ? "Type code snippet here..." : "Start typing to begin 30s timer!"}
                    value={typedInput}
                    onChange={handleTyperChange}
                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-950 border border-amber-500/50 font-mono text-base text-amber-300 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-lg"
                  />
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-950 border border-amber-500/50 text-center space-y-4 shadow-2xl">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto animate-bounce">
                    <Trophy className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-black text-white">Challenge Complete! Score: {scoreWpm} WPM</h4>
                </div>
              )}

              <div className="flex justify-center pt-2">
                <button onClick={resetTyperGame} className="px-5 py-2.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 text-xs font-mono font-bold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Restart Typer
                </button>
              </div>
            </div>
          )}

          {/* Game 2: Tech Stack Memory Matcher */}
          {activeTab === 'memory' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                <span>Moves: <strong className="text-amber-400 text-base">{memoryMoves}</strong></span>
                <span>Matched: <strong className="text-emerald-400 text-base">{matchedIds.length / 2} / 6</strong></span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {cards.map((card, idx) => {
                  const isFlipped = flippedCards.includes(idx) || matchedIds.includes(card.uniqueId);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCardClick(idx)}
                      className={`h-20 rounded-2xl text-2xl font-extrabold flex flex-col items-center justify-center transition-all duration-300 border ${
                        isFlipped ? 'bg-slate-950 border-amber-500/60 text-white' : 'bg-slate-900 border-slate-800 text-slate-600'
                      }`}
                    >
                      {isFlipped ? (
                        <>
                          <span className="text-2xl">{card.icon}</span>
                          <span className="text-[10px] font-mono text-amber-300 font-bold mt-1">{card.name}</span>
                        </>
                      ) : <span className="text-slate-600 font-mono text-xs">?</span>}
                    </button>
                  );
                })}
              </div>
              <div className="flex justify-center pt-2">
                <button onClick={initMemoryGame} className="px-5 py-2.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 text-xs font-mono font-bold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Reset Grid
                </button>
              </div>
            </div>
          )}

          {/* Game 3: Trending AI Prompt Tuner */}
          {activeTab === 'prompt' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase">GenAI Parameter Tuning Lab</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">Total Score: {promptScore}</span>
                </div>
                <h4 className="text-base font-extrabold text-white">{promptChallenges[promptIdx].title}</h4>
                <p className="text-xs text-slate-300">{promptChallenges[promptIdx].description}</p>
                <div className="p-2.5 rounded-xl bg-slate-900 text-[11px] font-mono text-amber-300 border border-slate-800">
                  {promptChallenges[promptIdx].task}
                </div>
              </div>

              <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300 font-bold">Temperature: {tempVal}</span>
                    <span className="text-slate-500">(0.0 = Deterministic, 1.0 = Creative)</span>
                  </div>
                  <input
                    type="range" min="0" max="1" step="0.05"
                    value={tempVal}
                    onChange={(e) => setTempVal(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-slate-300 font-bold">Top-P (Nucleus Sampling): {topPVal}</span>
                    <span className="text-slate-500">(0.1 - 1.0)</span>
                  </div>
                  <input
                    type="range" min="0.1" max="1" step="0.05"
                    value={topPVal}
                    onChange={(e) => setTopPVal(parseFloat(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <button
                  onClick={handleRunPromptSim}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-lg hover:bg-amber-400 transition-colors"
                >
                  Simulate LLM Generation
                </button>
              </div>

              {promptResult && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300">
                  {promptResult}
                </div>
              )}
            </div>
          )}

          {/* Game 4: Trending Bug Smasher Arcade */}
          {activeTab === 'bugs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-amber-500/40">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold block">REAL-TIME SYNTAX DEBUGGER</span>
                  <span className="text-sm font-bold text-white">Smash syntax bugs before timer expires!</span>
                </div>
                <div className="flex items-center gap-4 font-mono text-xs">
                  <span>Timer: <strong className="text-amber-400 text-sm">{bugTimeLeft}s</strong></span>
                  <span>Bugs Smashed: <strong className="text-emerald-400 text-sm">{smashedCount}</strong></span>
                </div>
              </div>

              {!bugGameActive ? (
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                    <Bug className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-black text-white">Ready to Smash Bugs?</h4>
                  <p className="text-xs text-slate-300">Clicking active bug alerts in 20s window earns points!</p>
                  <button
                    onClick={startBugGame}
                    className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg hover:bg-amber-400"
                  >
                    Start 20s Bug Smash Challenge
                  </button>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[220px] flex flex-wrap gap-3 items-center justify-center relative">
                  {activeBugs.map((b) => (
                    <button
                      key={b.key}
                      onClick={() => handleSmashBug(b.key)}
                      className="px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/60 text-rose-300 font-mono text-xs font-bold flex items-center gap-2 shadow-lg animate-pulse hover:scale-105 transition-transform"
                    >
                      <Bug className="w-4 h-4 text-rose-400" />
                      <span>{b.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* PlaySpace Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Dev PlaySpace Interactive Lounge</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-colors shadow-lg"
          >
            Close PlaySpace
          </button>
        </div>

      </div>
    </div>
  );
}
