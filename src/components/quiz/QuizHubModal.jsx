import React, { useState, useEffect } from 'react';
import {
  X,
  Bot,
  BrainCircuit,
  Code2,
  Sparkles,
  Database,
  Timer,
  Award,
  CheckCircle2,
  XCircle,
  Flag,
  ArrowRight,
  RotateCcw,
  History,
  Zap,
  Download,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Terminal,
  Clock,
  Flame,
  BookOpen,
  Play,
  ShieldCheck,
  Upload
} from 'lucide-react';
import {
  quizCategories,
  prebuiltQuestions,
  generateAIQuizFromPrompt,
  getAITutorStepByStepExplanation,
  generateFlashcardsFromMissedQuestions
} from '../../data/quizData';

export default function QuizHubModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // View state: 'dashboard' | 'quiz_hub' | 'custom_ai' | 'quiz' | 'scorecard' | 'flashcards' | 'sandbox' | 'history'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Quiz Configuration State
  const [selectedCategory, setSelectedCategory] = useState(quizCategories[0]);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questionType, setQuestionType] = useState('All');
  const [timerMode, setTimerMode] = useState(60);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Active Quiz State
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [confidenceRatings, setConfidenceRatings] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizStartTime, setQuizStartTime] = useState(null);

  // AI Tutor Drawer State
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [aiTutorBreakdown, setAiTutorBreakdown] = useState(null);

  // Scorecard, Flashcards, Certificate State
  const [scoreResult, setScoreResult] = useState(null);
  const [flashcardDeck, setFlashcardDeck] = useState([]);
  const [flippedCardIdx, setFlippedCardIdx] = useState(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [expandedReviewIdx, setExpandedReviewIdx] = useState(null);

  // Code Sandbox State
  const [sandboxCode, setSandboxCode] = useState(`// JavaScript Code Sandbox
function searchTarget(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log("Search Result Index:", searchTarget([10, 20, 30, 40, 50], 30));`);
  const [sandboxLogs, setSandboxLogs] = useState([]);

  // Fetch History
  useEffect(() => {
    fetchHistory();
    setFlashcardDeck(generateFlashcardsFromMissedQuestions([]));
  }, [activeTab]);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await fetch('http://localhost:5000/api/quiz/history');
      if (res.ok) {
        const data = await res.json();
        setQuizHistory(data.history || []);
      }
    } catch (err) {
      console.warn('Could not fetch quiz history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Live Timer Countdown Effect
  useEffect(() => {
    let timer = null;
    if (activeTab === 'quiz' && timerMode > 0 && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleNextOrSubmit();
            return timerMode;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, timerMode, timeLeft, currentQuestionIdx]);

  // Start Prebuilt Quiz
  const handleStartPrebuiltQuiz = (cat) => {
    setSelectedCategory(cat);
    let qList = prebuiltQuestions[cat.id] || prebuiltQuestions.dsa;
    if (questionType !== 'All') {
      const filtered = qList.filter(q => q.type === questionType.toLowerCase());
      if (filtered.length > 0) qList = filtered;
    }
    setQuestions(qList);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setConfidenceRatings({});
    setFlaggedQuestions({});
    setTimeLeft(timerMode > 0 ? timerMode : 0);
    setQuizStartTime(Date.now());
    setActiveTab('quiz');
  };

  // Start Custom AI Generated Quiz
  const handleGenerateCustomAIQuiz = async (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGeneratingAI(true);
    setGenerationStep('Parsing prompt context & topic semantics...');
    await new Promise((r) => setTimeout(r, 600));

    setGenerationStep('Synthesizing adaptive distractor choices & code snippets...');
    await new Promise((r) => setTimeout(r, 700));

    setGenerationStep('Finalizing automated evaluation matrix...');
    await new Promise((r) => setTimeout(r, 500));

    const generated = generateAIQuizFromPrompt(customPrompt, difficulty);
    setSelectedCategory({
      id: 'custom_ai',
      title: customPrompt.trim(),
      badge: 'Custom AI',
      color: 'from-red-600 to-rose-600'
    });
    setQuestions(generated);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setConfidenceRatings({});
    setFlaggedQuestions({});
    setTimeLeft(timerMode > 0 ? timerMode : 0);
    setQuizStartTime(Date.now());
    setIsGeneratingAI(false);
    setActiveTab('quiz');
  };

  // Handle Option Select
  const handleOptionSelect = (optionIdx) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
  };

  // Set Confidence Rating
  const handleSetConfidence = (rating) => {
    setConfidenceRatings((prev) => ({
      ...prev,
      [currentQuestionIdx]: rating
    }));
  };

  // Toggle Flag Question
  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIdx]: !prev[currentQuestionIdx]
    }));
  };

  // Open AI Tutor Explanation
  const handleOpenAITutor = (q = questions[currentQuestionIdx], ansIdx = userAnswers[currentQuestionIdx]) => {
    const breakdown = getAITutorStepByStepExplanation(q, ansIdx ?? -1);
    setAiTutorBreakdown({ question: q, breakdown });
    setIsAITutorOpen(true);
  };

  // Advance or Submit
  const handleNextOrSubmit = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setTimeLeft(timerMode > 0 ? timerMode : 0);
    } else {
      evaluateQuiz();
    }
  };

  // Evaluate Quiz Results
  const evaluateQuiz = async () => {
    const timeSpent = Math.round((Date.now() - (quizStartTime || Date.now())) / 1000);

    let correctCount = 0;
    const missedList = [];
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      } else {
        missedList.push(q);
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    let tier = 'Novice Practitioner';
    if (percentage === 100) tier = '🏆 Master CS & AI Architect';
    else if (percentage >= 80) tier = '⚡ Senior Tech Lead';
    else if (percentage >= 60) tier = '💡 Proficient Engineer';
    else if (percentage >= 40) tier = '🌱 Developing Developer';

    let aiEvaluation = '';
    if (percentage >= 80) {
      aiEvaluation = `Exceptional performance in ${selectedCategory.title}! You demonstrated strong mastery in execution paths and system design constraints. Recommended next step: Explore distributed consensus & deep transformer fine-tuning.`;
    } else if (percentage >= 50) {
      aiEvaluation = `Solid foundational performance in ${selectedCategory.title}. You showed good logic, but missed edge-case constraints under timed pressure. Recommended next step: Revisit Big-O bounds and non-mutating state patterns.`;
    } else {
      aiEvaluation = `Good practice effort on ${selectedCategory.title}. Review core language syntax and async event-loop mechanics to strengthen accuracy. Recommended next step: Practice generated flashcard deck.`;
    }

    const resultObj = {
      topicId: selectedCategory.id,
      topicName: selectedCategory.title,
      difficulty,
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
      timeSpentSeconds: timeSpent,
      confidenceRating: confidenceRatings[0] || '100% Sure',
      tier,
      aiEvaluation
    };

    setScoreResult(resultObj);
    setFlashcardDeck(generateFlashcardsFromMissedQuestions(missedList));
    setActiveTab('scorecard');

    try {
      await fetch('http://localhost:5000/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultObj)
      });
    } catch (err) {
      console.warn('Could not save result to SQLite API:', err);
    }
  };

  // Run Sandbox
  const handleRunSandbox = () => {
    let logs = [];
    const customConsole = { log: (...args) => logs.push(args.join(' ')) };
    try {
      new Function('console', sandboxCode)(customConsole);
      setSandboxLogs(logs.length > 0 ? logs : ['Execution completed successfully.']);
    } catch (err) {
      setSandboxLogs([`[Error]: ${err.message}`]);
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      title: "Smart AI Quiz & Assessment Scorecard",
      timestamp: new Date().toISOString(),
      student: "Janardhan Devarala",
      topic: selectedCategory.title,
      difficulty,
      score: `${scoreResult.score} / ${scoreResult.totalQuestions} (${scoreResult.percentage}%)`,
      tier: scoreResult.tier,
      aiEvaluation: scoreResult.aiEvaluation
    }, null, 2));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `quiz_scorecard_${selectedCategory.id}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const currentQ = questions[currentQuestionIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#080a11] rounded-3xl border border-red-500/40 shadow-[0_0_50px_rgba(220,38,38,0.2)] overflow-hidden max-h-[92vh] flex flex-col text-slate-100">

        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0c0f1a] border-b border-red-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-rose-600 to-red-500 p-0.5 shadow-lg shadow-red-600/30">
              <div className="w-full h-full bg-[#080a11] rounded-[14px] flex items-center justify-center text-red-500">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">
                  Smart AI Quiz & Assessment Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40">
                  Red & Black Edition
                </span>
              </div>
              <p className="text-xs text-rose-300/80 font-mono">
                Interactive Learning Workspace • Express & SQLite Backend
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

        {/* Navigation Bar */}
        {activeTab !== 'quiz' && (
          <div className="px-4 py-2.5 bg-[#0b0e17] border-b border-red-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'quiz_hub', label: 'Quiz Hub' },
                { id: 'custom_ai', label: 'AI Prompt Generator' },
                { id: 'flashcards', label: 'AI Flashcards' },
                { id: 'sandbox', label: 'Code Sandbox' },
                { id: 'history', label: 'Database History' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-red-400 font-bold">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>7 Day Streak</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#080a11]">

          {/* DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-6 rounded-3xl bg-[#0c0f1a] border border-red-500/30 space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-500/20 text-rose-300 border border-red-500/40">
                  AI Recommendation Active
                </span>
                <h3 className="text-2xl font-black text-white">
                  Welcome Back, <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-400 bg-clip-text text-transparent">Janardhan</span> 🚀
                </h3>
                <p className="text-xs text-slate-300">
                  Recommended focus: Data Structures & Dynamic Programming optimizations.
                </p>
                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setActiveTab('quiz_hub')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white text-xs font-black flex items-center gap-2"
                  >
                    <span>Start Practice Quiz</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('sandbox')}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-white border border-red-500/30 text-xs font-bold"
                  >
                    Code Sandbox
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* QUIZ HUB */}
          {activeTab === 'quiz_hub' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-[#0c0f1a] border border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold bg-red-500/20 text-rose-300">
                          {cat.badge}
                        </span>
                      </div>
                      <h4 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">
                        {cat.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{cat.description}</p>
                    </div>

                    <button
                      onClick={() => handleStartPrebuiltQuiz(cat)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-md shadow-red-600/20"
                    >
                      <span>Start Quiz</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM AI GENERATOR */}
          {activeTab === 'custom_ai' && (
            <div className="space-y-4 animate-fadeIn max-w-xl mx-auto py-4">
              <h4 className="text-xl font-black text-white text-center">AI Prompt Quiz Generator</h4>
              <form onSubmit={handleGenerateCustomAIQuiz} className="space-y-4 p-6 rounded-2xl bg-[#0c0f1a] border border-red-500/30">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Docker, Rust, System Architecture..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-red-500/40 text-white text-xs font-mono"
                  required
                />
                <button
                  type="submit"
                  disabled={isGeneratingAI}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs"
                >
                  {isGeneratingAI ? generationStep : 'Generate Quiz & Launch'}
                </button>
              </form>
            </div>
          )}

          {/* ACTIVE QUIZ */}
          {activeTab === 'quiz' && currentQ && (
            <div className="space-y-6 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#0c0f1a] border border-red-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-red-400 uppercase">
                    {selectedCategory.title} • Q{currentQuestionIdx + 1}/{questions.length}
                  </span>
                  <h4 className="text-xs font-bold text-white">{currentQ.question}</h4>
                </div>
                {timerMode > 0 && (
                  <div className="px-3 py-1 rounded-xl bg-red-500/20 text-rose-400 font-mono text-xs font-bold border border-red-500/30">
                    {timeLeft}s
                  </div>
                )}
              </div>

              {currentQ.codeSnippet && (
                <div className="p-4 rounded-2xl bg-[#080a11] border border-slate-800 font-mono text-xs text-rose-300 overflow-x-auto">
                  <pre><code>{currentQ.codeSnippet}</code></pre>
                </div>
              )}

              <div className="space-y-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestionIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      className={`w-full p-3.5 rounded-xl text-left text-xs font-medium border flex items-center justify-between ${
                        isSelected
                          ? 'bg-red-500/20 text-white border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]'
                          : 'bg-[#0c0f1a] text-slate-300 border-slate-800'
                      }`}
                    >
                      <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold disabled:opacity-40"
                >
                  Previous
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenAITutor()}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-rose-400 border border-red-500/30 text-xs font-bold flex items-center gap-1"
                  >
                    <Bot className="w-4 h-4 text-red-500" />
                    <span>AI Tutor</span>
                  </button>
                  <button
                    onClick={handleNextOrSubmit}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black flex items-center gap-1.5"
                  >
                    <span>{currentQuestionIdx === questions.length - 1 ? 'Submit' : 'Next'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCORECARD */}
          {activeTab === 'scorecard' && scoreResult && (
            <div className="space-y-6 animate-fadeIn text-center">
              <div className="p-6 rounded-3xl bg-[#0c0f1a] border border-red-500/40 space-y-3">
                <Award className="w-10 h-10 text-red-500 mx-auto" />
                <h3 className="text-3xl font-black text-white">Score: {scoreResult.percentage}%</h3>
                <p className="text-xs text-slate-300">{scoreResult.aiEvaluation}</p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setIsCertificateOpen(true)}
                    className="px-4 py-2 rounded-xl bg-red-500/20 text-rose-300 border border-red-500/40 text-xs font-bold"
                  >
                    View Certificate
                  </button>
                  <button
                    onClick={() => setActiveTab('quiz_hub')}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div className="space-y-4 animate-fadeIn max-w-xl mx-auto py-4">
              <h4 className="text-xl font-black text-white text-center">Self-Learning AI Flashcards</h4>
              {flashcardDeck.map((card, idx) => {
                const isFlipped = flippedCardIdx === idx;
                return (
                  <div
                    key={card.id}
                    onClick={() => setFlippedCardIdx(isFlipped ? null : idx)}
                    className="p-6 rounded-2xl bg-[#0c0f1a] border border-red-500/30 cursor-pointer min-h-[140px] flex flex-col justify-between text-center"
                  >
                    <span className="text-[10px] font-mono text-red-400">Topic: {card.topic}</span>
                    <p className="text-sm font-bold text-white py-4">{isFlipped ? card.back : card.front}</p>
                    <span className="text-[10px] font-mono text-slate-500">Click to Flip</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* SANDBOX */}
          {activeTab === 'sandbox' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-mono font-bold text-red-400">JavaScript Code Sandbox</h4>
                <button
                  onClick={handleRunSandbox}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black"
                >
                  Run Code
                </button>
              </div>
              <textarea
                value={sandboxCode}
                onChange={(e) => setSandboxCode(e.target.value)}
                rows={10}
                className="w-full p-4 bg-[#080a11] text-rose-300 font-mono text-xs rounded-2xl border border-red-500/30 focus:outline-none"
              />
              <div className="p-4 rounded-2xl bg-[#080a11] border border-slate-800 font-mono text-xs text-emerald-400">
                {sandboxLogs.map((l, i) => <div key={i}>&gt; {l}</div>)}
              </div>
            </div>
          )}

          {/* HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-sm font-mono font-bold text-red-400">Saved Quiz History (SQLite DB)</h4>
              <div className="rounded-2xl border border-slate-800 bg-[#0c0f1a] overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-red-400">
                    <tr>
                      <th className="p-3">Date</th>
                      <th className="p-3">Topic</th>
                      <th className="p-3">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {quizHistory.map((h, i) => (
                      <tr key={i}>
                        <td className="p-3 text-slate-400">{new Date(h.created_at || Date.now()).toLocaleDateString()}</td>
                        <td className="p-3 font-bold text-white">{h.topic_name}</td>
                        <td className="p-3 text-red-400 font-bold">{h.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* AI Tutor Drawer */}
      {isAITutorOpen && aiTutorBreakdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md h-full bg-[#0c0f1a] border-l border-red-500/40 p-6 flex flex-col justify-between overflow-y-auto space-y-4 shadow-2xl text-slate-100">
            <div className="flex items-center justify-between border-b border-red-500/30 pb-3">
              <span className="text-xs font-mono font-bold text-red-500">AI Tutor Step-by-Step Explanation</span>
              <button onClick={() => setIsAITutorOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white">{aiTutorBreakdown.breakdown.headline}</h4>
              {aiTutorBreakdown.breakdown.steps.map((s) => (
                <div key={s.step} className="p-3 rounded-xl bg-[#080a11] border border-red-500/20 text-xs">
                  <span className="font-mono text-red-400 font-bold block mb-1">Step {s.step}: {s.title}</span>
                  <p className="text-slate-300 leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>

            <button onClick={() => setIsAITutorOpen(false)} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 font-black text-xs text-white">
              Got It, Thanks!
            </button>
          </div>
        </div>
      )}

      {/* Official Certificate Modal */}
      {isCertificateOpen && scoreResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-[#0c0f1a] rounded-3xl border-2 border-red-500/60 p-6 shadow-2xl text-center space-y-4">
            <h3 className="text-2xl font-black text-white">Official Certificate of Completion</h3>
            <p className="text-xs text-slate-300">Certifies that <span className="text-red-400 font-bold">Janardhan Devarala</span> has mastered <span className="font-bold text-white">{scoreResult.topicName}</span> with {scoreResult.percentage}% score.</p>
            <div className="pt-2 flex justify-center gap-2">
              <button onClick={() => window.print()} className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-black">
                Print / Download Certificate
              </button>
              <button onClick={() => setIsCertificateOpen(false)} className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
