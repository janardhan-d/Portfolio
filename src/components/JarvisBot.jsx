import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  Mic,
  Activity
} from 'lucide-react';
import { sectionContexts, getAiResponse } from '../data/jarvisKnowledge';

export default function JarvisBot({ activeSection = 'home', onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showProactiveTip, setShowProactiveTip] = useState(true);
  const [inputQuery, setInputQuery] = useState('');
  
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: "Hello! I am Janardhan's AI Portfolio Guide. Feel free to ask me anything about his technical skills, capstone Finance Manager app, internship credentials, or education.",
      chips: [
        "Why hire Janardhan?",
        "Tell me about his Finance Manager app",
        "How to contact Janardhan?"
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Audio Chime Generator using Web Audio API
  const playChimeSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5 note

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  };

  // Voice synthesis helper with active speech animation tracking
  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    if (query.toLowerCase().includes('resume')) {
      onOpenResume?.();
    }

    setTimeout(() => {
      playChimeSound();
      const response = getAiResponse(query, activeSection);
      const assistantMsg = {
        sender: 'assistant',
        text: response.text,
        chips: response.chips,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMsg]);
      speakText(response.text);
    }, 350);
  };

  const activeContext = sectionContexts[activeSection] || sectionContexts.home;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      
      {/* Proactive Tip Popup */}
      {!isOpen && showProactiveTip && (
        <div className="pointer-events-auto mb-3 max-w-xs bg-slate-950 text-slate-100 rounded-2xl p-3.5 border border-amber-500/50 shadow-2xl text-xs flex items-start gap-3 relative">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 p-0.5 shrink-0 shadow-md">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-extrabold text-white">
              <span>AI Portfolio Guide</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Viewing <span className="text-amber-400 font-bold">{activeContext.title}</span>. Click to ask a question!
            </p>
          </div>
          <button
            onClick={() => setShowProactiveTip(false)}
            className="text-slate-400 hover:text-white ml-auto p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Drawer Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[92vw] sm:w-96 bg-slate-950 text-slate-100 rounded-3xl border border-amber-500/50 shadow-2xl overflow-hidden flex flex-col h-[520px] mb-4">
          
          {/* Header Bar with Live Voice Waveform Visualizer */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-600 p-0.5 shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-amber-400">
                  <Sparkles className="w-4.5 h-4.5" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">
                    AI Portfolio Assistant
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                  <span>Observing:</span>
                  <span className="text-amber-400 font-semibold">{activeContext.title}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice Equalizer Soundwave Animation */}
              {isSpeaking && (
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-mono font-bold">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 bg-amber-400 rounded-full soundwave-bar-1" />
                    <span className="w-1 bg-amber-400 rounded-full soundwave-bar-2" />
                    <span className="w-1 bg-amber-400 rounded-full soundwave-bar-3" />
                    <span className="w-1 bg-amber-400 rounded-full soundwave-bar-4" />
                  </div>
                  <span className="ml-1 hidden sm:inline">Speaking...</span>
                </div>
              )}

              <button
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (isSpeaking) window.speechSynthesis?.cancel();
                }}
                className={`p-2 rounded-xl border transition-colors ${
                  voiceEnabled
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title={voiceEnabled ? 'Voice Output ON' : 'Voice Output Muted'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-950/90 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed relative ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold rounded-br-none shadow-md'
                      : 'bg-slate-900 text-slate-100 border border-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Speech Indicator Banner inside assistant message */}
                  {msg.sender === 'assistant' && idx === messages.length - 1 && isSpeaking && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-amber-400 font-mono">
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-end gap-0.5 h-3">
                          <span className="w-0.5 bg-amber-400 rounded-full soundwave-bar-1" />
                          <span className="w-0.5 bg-amber-400 rounded-full soundwave-bar-2" />
                          <span className="w-0.5 bg-amber-400 rounded-full soundwave-bar-3" />
                        </div>
                        <span>Synthesizing Voice...</span>
                      </div>
                    </div>
                  )}

                  {/* Clean Suggestion Chips */}
                  {msg.chips && msg.chips.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-3 pt-2.5 border-t border-slate-800">
                      {msg.chips.map((chip, cIdx) => (
                        <button
                          key={cIdx}
                          onClick={() => handleSendMessage(chip)}
                          className="px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-slate-950 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-slate-800 hover:border-amber-500/50 transition-all text-left flex items-center justify-between group"
                        >
                          <span>{chip}</span>
                          <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-slate-500 font-mono mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question about Janardhan..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors font-medium"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_0_12px_rgba(245,158,11,0.3)] disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Trigger Pill */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowProactiveTip(false);
          playChimeSound();
        }}
        className="pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full bg-slate-950 hover:bg-slate-900 border border-amber-500/50 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:border-amber-400 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        aria-label="Toggle AI Assistant"
      >
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 flex items-center justify-center shrink-0">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-amber-400">
            {isSpeaking ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-amber-400 soundwave-bar-1" />
                <span className="w-0.5 bg-amber-400 soundwave-bar-2" />
                <span className="w-0.5 bg-amber-400 soundwave-bar-3" />
              </div>
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
          </div>
        </div>
        <span className="text-xs font-bold tracking-tight text-white">
          Ask AI Assistant
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

    </div>
  );
}
