import React, { useState, useEffect, useCallback } from 'react';
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
import { apiFetch, getAdminToken, setAdminToken, clearAdminToken } from '../lib/api';

export default function AdminModal({ isOpen, onClose }) {
  const [stats, setStats] = useState({ totalVisits: 0, totalMessages: 0, messages: [] });
  const [loading, setLoading] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [authError, setAuthError] = useState('');

  // Auth state is derived entirely from the server-issued token —
  // the PIN is never present in this bundle.
  useEffect(() => {
    setIsAuthenticated(Boolean(getAdminToken()));
  }, [isOpen]);

  const fetchLocalStats = useCallback(async () => {
    setLoading(true);
    try {
      const token = getAdminToken();
      const [statsData, msgsData] = await Promise.all([
        apiFetch('/api/stats', { headers: token ? { Authorization: `Bearer ${token}` } : {} }),
        apiFetch('/api/messages', { headers: token ? { Authorization: `Bearer ${token}` } : {} })
      ]);

      setStats({
        totalVisits: statsData.totalVisits || 0,
        totalMessages: statsData.totalMessages || 0,
        messages: msgsData.messages || []
      });
      setErrorMsg('');
    } catch (err) {
      if (err.status === 401) {
        // Token expired or revoked — drop back to the PIN screen.
        clearAdminToken();
        setIsAuthenticated(false);
        setErrorMsg('Session expired. Please re-enter the passcode.');
      } else {
        setErrorMsg(err.message || 'Could not load analytics.');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchLocalStats();
    }
  }, [isOpen, isAuthenticated, fetchLocalStats]);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setErrorMsg('');

    try {
      const data = await apiFetch('/api/admin/verify', {
        method: 'POST',
        body: JSON.stringify({ pin: pinInput })
      });
      setAdminToken(data.token);
      setIsAuthenticated(true);
      fetchLocalStats();
    } catch (err) {
      if (err.status === 401) {
        setAuthError('Incorrect Author Passcode. Access Denied.');
      } else if (err.status === 429) {
        setAuthError('Too many attempts. Please wait a few minutes.');
      } else if (err.status === 503) {
        setAuthError('Admin access is not configured on this server.');
      } else {
        setAuthError('Could not reach the server. Is the API online?');
      }
      setPinInput('');
    }
  };

  const handleClose = () => {
    setPinInput('');
    setAuthError('');
    setErrorMsg('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn" role="dialog" aria-modal="true" aria-label="Author analytics dashboard">
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
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Protected analytics — server-verified access
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dashboard"
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
                Sensitive visitor analytics and contact form messages are verified server-side.
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
                  aria-label="Author passcode"
                />
              </div>

              {(authError || errorMsg) && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-mono font-bold" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  <span>{authError || errorMsg}</span>
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
              🔒 Server-verified session • Token expires after 6 hours
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
                  <span>Recent Messages</span>
                </h4>
                <button
                  onClick={fetchLocalStats}
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 font-bold"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {errorMsg && (
                <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-mono font-bold" role="alert">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {stats.messages.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                  No contact form messages yet. Submit a test message on the contact form!
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
            Admin session active
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
