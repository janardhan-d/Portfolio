import React, { useState, useEffect } from 'react';
import {
  X,
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
  Bot,
  Zap,
  BarChart2,
  FileText,
  Download,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Terminal,
  Clock
} from 'lucide-react';
import { quizTopics, prebuiltQuestions, generateAIQuizFromPrompt } from '../../data/quizData';

export default function QuizHubModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // View state: 'selector' | 'custom_ai' | 'quiz' | 'scorecard' | 'history'
  const [activeTab, setActiveTab] = useState('selector');

  // Quiz Configuration State
  const [selectedTopic, setSelectedTopic] = useState(quizTopics[0]);
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [timerMode, setTimerMode] = useState(60); // 60s per question, 0 = untimed
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [generationStep, setGenerationStep] = useState('');

  // Active Quiz State
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { questionIdx: optionIdx }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { questionIdx: true }
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  // Scorecard & Database History State
  const [scoreResult, setScoreResult] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [expandedReviewIdx, setExpandedReviewIdx] = useState(null);

  // Fetch saved quiz history from backend API when switching to history tab
  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory();
    }
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
      console.warn('Could not fetch quiz history from backend API:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Live Timer Countdown Effect during Quiz Session
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

  // Start Pre-built Quiz
  const handleStartPrebuiltQuiz = (topic) => {
    setSelectedTopic(topic);
    const qList = prebuiltQuestions[topic.id] || prebuiltQuestions.dsa;
    setQuestions(qList);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(timerMode > 0 ? timerMode : 0);
    setQuizStartTime(Date.now());
    setActiveTab('quiz');
  };

  // Start Custom AI Prompt Generated Quiz
  const handleGenerateCustomAIQuiz = async (e) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGeneratingAI(true);
    setGenerationStep('Parsing topic semantics and concept dependencies...');
    await new Promise((r) => setTimeout(r, 600));

    setGenerationStep('Synthesizing adaptive distractor choices & code snippets...');
    await new Promise((r) => setTimeout(r, 700));

    setGenerationStep('Finalizing automated evaluation matrix...');
    await new Promise((r) => setTimeout(r, 500));

    const generated = generateAIQuizFromPrompt(customPrompt, difficulty);
    setSelectedTopic({
      id: 'custom_ai',
      title: customPrompt.trim(),
      badge: 'Custom AI',
      color: 'from-amber-400 to-yellow-500'
    });
    setQuestions(generated);
    setCurrentQuestionIdx(0);
    setUserAnswers({});
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

  // Toggle Flag Question
  const handleToggleFlag = () => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQuestionIdx]: !prev[currentQuestionIdx]
    }));
  };

  // Advance or Submit Quiz
  const handleNextOrSubmit = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setTimeLeft(timerMode > 0 ? timerMode : 0);
    } else {
      evaluateQuiz();
    }
  };

  // Evaluate Quiz Results & Generate AI Feedback
  const evaluateQuiz = async () => {
    const timeSpent = Math.round((Date.now() - (quizStartTime || Date.now())) / 1000);
    setTotalTimeSpent(timeSpent);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    // Performance Tier Title
    let tier = 'Novice Explorer';
    if (percentage === 100) tier = '🏆 Master CS & AI Architect';
    else if (percentage >= 80) tier = '⚡ Senior Tech Lead';
    else if (percentage >= 60) tier = '💡 Proficient Engineer';
    else if (percentage >= 40) tier = '🌱 Developing Practitioner';

    // Generate Written AI Evaluation Review
    let aiEvaluation = '';
    if (percentage >= 80) {
      aiEvaluation = `Exceptional mastery demonstrated in ${selectedTopic.title}! You correctly identified core algorithmic bottlenecks, syntax semantics, and architectural constraints. Recommended next step: Explore advanced distributed consensus and deep LLM RAG pipelines.`;
    } else if (percentage >= 50) {
      aiEvaluation = `Solid foundational performance in ${selectedTopic.title}. You showed strong reasoning in basic concepts, but missed key edge-case complexities under timed conditions. Recommended next step: Practice Big-O recursion depth and state mutation mechanics.`;
    } else {
      aiEvaluation = `Good effort on ${selectedTopic.title}. Your answers reflect familiarity with terms, but core conceptual patterns require review. Recommended next step: Revisit fundamental data structure traversals and REST API request lifecycles.`;
    }

    const resultObj = {
      topicId: selectedTopic.id,
      topicName: selectedTopic.title,
      difficulty,
      score: correctCount,
      totalQuestions: questions.length,
      percentage,
      timeSpentSeconds: timeSpent,
      tier,
      aiEvaluation
    };

    setScoreResult(resultObj);
    setActiveTab('scorecard');

    // Post Result to Backend Express SQLite API
    try {
      await fetch('http://localhost:5000/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resultObj)
      });
    } catch (err) {
      console.warn('Could not persist quiz result to SQLite API server:', err);
    }
  };

  // Export Scorecard as JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      title: "Smart AI Quiz & Assessment Scorecard",
      timestamp: new Date().toISOString(),
      topic: selectedTopic.title,
      difficulty,
      score: `${scoreResult.score} / ${scoreResult.totalQuestions} (${scoreResult.percentage}%)`,
      tier: scoreResult.tier,
      aiEvaluation: scoreResult.aiEvaluation,
      breakdown: questions.map((q, idx) => ({
        question: q.question,
        userAnswer: q.options[userAnswers[idx]] || 'Not Answered',
        correctAnswer: q.options[q.correctAnswerIndex],
        isCorrect: userAnswers[idx] === q.correctAnswerIndex,
        explanation: q.explanation
      }))
    }, null, 2));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `quiz_scorecard_${selectedTopic.id}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const getTopicIcon = (iconName) => {
    switch (iconName) {
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6" />;
      case 'Code2': return <Code2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Database': return <Database className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  const currentQ = questions[currentQuestionIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] rounded-3xl border border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden max-h-[92vh] flex flex-col">

        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-slate-950 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  Smart AI Quiz & Assessment Hub
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  v2.6 Live
                </span>
              </div>
              <p className="text-xs text-amber-300/80 font-mono">
                Full-Stack Interactive Platform & Express SQLite Backend
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

        {/* View Navigation Bar (Hidden during active quiz) */}
        {activeTab !== 'quiz' && (
          <div className="px-4 sm:px-6 py-3 bg-slate-900/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('selector')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                  activeTab === 'selector'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Topic Collections</span>
              </button>

              <button
                onClick={() => setActiveTab('custom_ai')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                  activeTab === 'custom_ai'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>AI Prompt Generator</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
                  activeTab === 'history'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Database History</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              <span>Timer: {timerMode > 0 ? `${timerMode}s / Q` : 'Untimed'}</span>
            </div>
          </div>
        )}

        {/* Modal Body Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#0b0f19]">

          {/* VIEW 1: TOPIC SELECTOR & CONFIGURATOR */}
          {activeTab === 'selector' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Configuration Controls Bar */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Difficulty:
                  </span>
                  <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                    {['Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          difficulty === diff
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Timer Mode:
                  </span>
                  <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                    {[
                      { label: '45s Timed', val: 45 },
                      { label: '60s Standard', val: 60 },
                      { label: 'Zen Mode', val: 0 }
                    ].map((t) => (
                      <button
                        key={t.val}
                        onClick={() => setTimerMode(t.val)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          timerMode === t.val
                            ? 'bg-amber-500 text-slate-950 shadow'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Topic Collection Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizTopics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 transition-all group flex flex-col justify-between space-y-4 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 group-hover:scale-110 transition-transform">
                          {getTopicIcon(topic.icon)}
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {topic.badge}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1.5 font-normal">
                        {topic.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">
                        5 Adaptive Questions • ~5 min
                      </span>
                      <button
                        onClick={() => handleStartPrebuiltQuiz(topic)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 hover:from-amber-300 hover:to-amber-400 transition-colors shadow-md shadow-amber-500/20"
                      >
                        <span>Start Quiz</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* VIEW 2: CUSTOM AI PROMPT GENERATOR */}
          {activeTab === 'custom_ai' && (
            <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto py-4">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-2">
                  <Zap className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-white">
                  Dynamic AI Prompt Quiz Generator
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Type any Computer Science, Software Engineering, or AI topic. The AI generator will instantly construct a tailored timed assessment module!
                </p>
              </div>

              <form onSubmit={handleGenerateCustomAIQuiz} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                    Enter Custom Quiz Topic or Technology Prompt:
                  </label>
                  <input
                    type="text"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Docker & Kubernetes Architecture, Rust Ownership, GraphQL vs REST, Neural RAG..."
                    className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-amber-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 shadow-inner font-mono"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Target Difficulty:
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                    >
                      <option value="Beginner">Beginner Level</option>
                      <option value="Intermediate">Intermediate Practitioner</option>
                      <option value="Advanced">Advanced Architect</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                      Question Timer:
                    </label>
                    <select
                      value={timerMode}
                      onChange={(e) => setTimerMode(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
                    >
                      <option value={45}>45 Seconds per Question</option>
                      <option value={60}>60 Seconds per Question</option>
                      <option value={0}>Untimed (Zen Mode)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingAI || !customPrompt.trim()}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 hover:from-amber-300 hover:to-amber-400 transition-all disabled:opacity-50 shadow-lg shadow-amber-500/25"
                >
                  {isGeneratingAI ? (
                    <>
                      <Bot className="w-5 h-5 animate-spin" />
                      <span>{generationStep}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate AI Quiz & Launch</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* VIEW 3: ACTIVE TIMED QUIZ SESSION */}
          {activeTab === 'quiz' && currentQ && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Quiz Status & Navigation Header */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                    {selectedTopic.title} • Question {currentQuestionIdx + 1} of {questions.length}
                  </span>
                  <h4 className="text-sm font-bold text-slate-200">
                    Topic: <span className="text-white font-mono">{currentQ.subTopic || selectedTopic.title}</span>
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  {/* Timer Ring/Badge */}
                  {timerMode > 0 && (
                    <div className={`px-3 py-1.5 rounded-xl font-mono text-xs font-black flex items-center gap-1.5 border transition-all ${
                      timeLeft <= 10
                        ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}>
                      <Clock className="w-4 h-4" />
                      <span>{timeLeft}s</span>
                    </div>
                  )}

                  {/* Flag Question Button */}
                  <button
                    onClick={handleToggleFlag}
                    className={`p-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 ${
                      flaggedQuestions[currentQuestionIdx]
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title="Flag question for review"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress Indicator Pills */}
              <div className="flex items-center gap-2">
                {questions.map((_, idx) => {
                  const isAnswered = userAnswers[idx] !== undefined;
                  const isCurrent = idx === currentQuestionIdx;
                  const isFlagged = flaggedQuestions[idx];

                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`flex-1 h-2 rounded-full transition-all ${
                        isCurrent
                          ? 'bg-amber-400 ring-2 ring-amber-400/50 scale-105'
                          : isFlagged
                          ? 'bg-yellow-500'
                          : isAnswered
                          ? 'bg-emerald-500'
                          : 'bg-slate-800'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Question & Code Snippet Box */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-inner">
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>

                {currentQ.codeSnippet && (
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-amber-200 overflow-x-auto relative">
                    <div className="text-[10px] text-slate-500 mb-2 font-mono flex items-center gap-1 border-b border-slate-800 pb-1">
                      <Terminal className="w-3 h-3 text-amber-400" />
                      <span>Code Viewport</span>
                    </div>
                    <pre className="leading-relaxed"><code>{currentQ.codeSnippet}</code></pre>
                  </div>
                )}
              </div>

              {/* Option Choice Cards */}
              <div className="grid grid-cols-1 gap-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQuestionIdx] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleOptionSelect(optIdx)}
                      className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all border flex items-center justify-between group ${
                        isSelected
                          ? 'bg-amber-500/20 text-white border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                          : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-xl text-xs font-mono font-bold flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-900 text-slate-400 group-hover:text-amber-300'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'border-amber-400 bg-amber-400 text-slate-950'
                          : 'border-slate-700'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-slate-950 text-amber-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons Footer */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 disabled:opacity-40 text-xs font-bold"
                >
                  Previous
                </button>

                <button
                  onClick={handleNextOrSubmit}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 hover:from-amber-300 hover:to-amber-400 transition-all shadow-md shadow-amber-500/20"
                >
                  <span>{currentQuestionIdx === questions.length - 1 ? 'Submit & Review' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* VIEW 4: ANALYTICAL SCORECARD & AUTOMATED AI PERFORMANCE REVIEW */}
          {activeTab === 'scorecard' && scoreResult && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Scorecard Hero Gauge Card */}
              <div className="p-6 rounded-3xl bg-slate-950 border border-amber-500/40 text-center space-y-4 relative overflow-hidden shadow-2xl">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-1">
                  <Award className="w-8 h-8" />
                </div>

                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {scoreResult.tier}
                  </span>
                  <h3 className="text-3xl font-black text-white mt-3">
                    Assessment Score: {scoreResult.percentage}%
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {scoreResult.score} of {scoreResult.totalQuestions} Questions Correct • Completed in {scoreResult.timeSpentSeconds} seconds
                  </p>
                </div>

                {/* Accuracy Bar */}
                <div className="max-w-md mx-auto h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 transition-all duration-1000 shadow-[0_0_15px_#f59e0b]"
                    style={{ width: `${scoreResult.percentage}%` }}
                  />
                </div>
              </div>

              {/* Automated AI Review Summary Box */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  <Bot className="w-4 h-4 text-amber-400" />
                  <span>Automated AI Performance Review</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                  {scoreResult.aiEvaluation}
                </p>
              </div>

              {/* Question-by-Question Detailed Review Accordion */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Question-by-Question Breakdown & Explanations:
                </h4>

                {questions.map((q, idx) => {
                  const userAnsIdx = userAnswers[idx];
                  const isCorrect = userAnsIdx === q.correctAnswerIndex;
                  const isExpanded = expandedReviewIdx === idx;

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isCorrect
                          ? 'bg-slate-950/80 border-emerald-500/30'
                          : 'bg-slate-950/80 border-rose-500/30'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedReviewIdx(isExpanded ? null : idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-900/60 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          )}
                          <div>
                            <span className="text-[11px] font-mono text-slate-400">
                              Question {idx + 1} • {q.subTopic || 'Core Concept'}
                            </span>
                            <h5 className="text-xs sm:text-sm font-bold text-white">
                              {q.question}
                            </h5>
                          </div>
                        </div>

                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="p-4 border-t border-slate-800 bg-slate-900/40 space-y-3 text-xs">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                              <span className="text-[10px] text-slate-500 block">Your Answer:</span>
                              <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                {userAnsIdx !== undefined ? q.options[userAnsIdx] : 'Not Answered'}
                              </span>
                            </div>
                            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                              <span className="text-[10px] text-slate-500 block">Correct Answer:</span>
                              <span className="text-amber-400 font-bold">
                                {q.options[q.correctAnswerIndex]}
                              </span>
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/20 font-sans text-slate-300 leading-relaxed">
                            <span className="font-mono text-amber-400 font-bold block mb-1">Explanation & Mechanics:</span>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Scorecard Action Controls */}
              <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                <button
                  onClick={() => setActiveTab('selector')}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Take Another Quiz</span>
                </button>

                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Scorecard Report (JSON)</span>
                </button>
              </div>

            </div>
          )}

          {/* VIEW 5: DATABASE HISTORY & ANALYTICS */}
          {activeTab === 'history' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>Saved Quiz History (SQLite Backend DB)</span>
                </h4>
                <button
                  onClick={fetchHistory}
                  className="text-xs text-amber-400 hover:underline font-mono"
                >
                  Refresh Log
                </button>
              </div>

              {isLoadingHistory ? (
                <div className="p-8 text-center text-slate-400 text-xs font-mono">
                  Loading saved quiz records from database...
                </div>
              ) : quizHistory.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-400">
                    No saved quiz attempts in database yet. Complete your first quiz to record metrics!
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-900 text-amber-400 border-b border-slate-800">
                        <tr>
                          <th className="p-3">Date</th>
                          <th className="p-3">Topic</th>
                          <th className="p-3">Difficulty</th>
                          <th className="p-3">Score</th>
                          <th className="p-3">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {quizHistory.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/50">
                            <td className="p-3 text-slate-400">
                              {new Date(item.created_at || Date.now()).toLocaleDateString()}
                            </td>
                            <td className="p-3 font-bold text-white">{item.topic_name}</td>
                            <td className="p-3">{item.difficulty}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                                {item.percentage}% ({item.score}/{item.total_questions})
                              </span>
                            </td>
                            <td className="p-3">{item.time_spent_seconds}s</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
