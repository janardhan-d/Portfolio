import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  RefreshCw, 
  MessageSquare, 
  Eye, 
  Clock, 
  User, 
  Lock,
  KeyRound,
  AlertCircle
} from 'lucide-react';

export default function AdminModal({ isOpen, onClose }) {
  const [stats, setStats] = useState({ totalVisits: 0, totalMessages: 0, messages: [] });
  const [loading, setLoading] = useState(true);
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Author Private Security Passcode (Secret PIN: 102308)
  const AUTHOR_PIN = '102308';

  const fetchLocalStats = async () => {
    setLoading(true);
    try {
      const statsRes = await fetch('http://localhost:5000/api/stats');
      const statsData = await statsRes.json();
      
      const msgsRes = await fetch('http://localhost:5000/api/messages');
      const msgsData = await msgsRes.json();

      setStats({
        totalVisits: statsData.totalVisits || 0,
        totalMessages: msgsData.total || 0,
        messages: msgsData.messages || []
      });
    } catch (err) {
      console.warn('Local SQLite server offline:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchLocalStats();
    }
  }, [isOpen, isAuthenticated]);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === AUTHOR_PIN) {
      setIsAuthenticated(true);
      setErrorMsg('');
      fetchLocalStats();
    } else {
      setErrorMsg('Incorrect Author Passcode. Access Denied.');
      setPinInput('');
    }
  };

  const handleClose = () => {
    setIsAuthenticated(false);
    setPinInput('');
    setErrorMsg('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e1322] rounded-3xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg text-white">
                  Author Control & Visitor Analytics
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  SQLite Local
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Protected Database: <span className="text-amber-400">portfolio.db</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Lock Screen if Not Authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-5 bg-[#0e1322]">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-xl font-black text-white">
                Author Security Lock
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mt-1">
                Sensitive visitor analytics and contact form messages are protected for Janardhan Devarala.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-3">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter Author Passcode..."
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-amber-500/40 text-center font-mono text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              {errorMsg && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-mono font-bold">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Unlock Author Dashboard
              </button>
            </form>

            <p className="text-[11px] font-mono text-slate-500">
              🔒 Author Verification Required • Private Passcode Protected
            </p>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh] bg-[#0e1322]">
            
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Visitor Stats Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    TOTAL SITE VISITS RECORDED
                  </span>
                  <span className="text-3xl font-black text-white mt-1 block">
                    {loading ? '...' : stats.totalVisits}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                    Tracked in SQLite visitor_stats
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <Eye className="w-6 h-6" />
                </div>
              </div>

              {/* Saved Messages Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    CONTACT FORM MESSAGES
                  </span>
                  <span className="text-3xl font-black text-white mt-1 block">
                    {loading ? '...' : stats.totalMessages}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">
                    Saved in SQLite contact_messages
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Saved Messages List Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Messages Saved In Local SQLite Database</span>
                </h4>
                <button
                  onClick={fetchLocalStats}
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 font-bold"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh DB</span>
                </button>
              </div>

              {stats.messages.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                  No contact form messages saved in `portfolio.db` yet. Submit a test message on the contact form!
                </div>
              ) : (
                <div className="space-y-2.5">
                  {stats.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 hover:border-amber-500/40 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-900 pb-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-white">
                          <User className="w-3.5 h-3.5 text-amber-400" />
                          <span>{msg.name}</span>
                          <span className="text-slate-400 font-mono text-[11px] font-normal">
                            (&lt;{msg.email}&gt;)
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(msg.created_at).toLocaleString()}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-200 leading-relaxed font-mono pt-1">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-amber-500/30 flex items-center justify-between">
          <span className="text-[11px] text-slate-400 font-mono">
            SQLite Database File: <span className="text-amber-400">portfolio.db</span>
          </span>
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition-colors shadow-lg"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
