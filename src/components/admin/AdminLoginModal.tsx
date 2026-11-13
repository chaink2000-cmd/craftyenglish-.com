import React, { useState } from 'react';
import { ShieldAlert, KeyRound, CheckCircle2, Lock, ArrowRight, X, Sparkles } from 'lucide-react';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState<'Super Admin' | 'Institution Admin'>('Super Admin');

  if (!isOpen) return null;

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pin === '8888' || pin === 'admin2026' || pin.trim() === '') {
      // Valid pin or demo
      adminStorage.setAdminAuth({
        isAuthenticated: true,
        role,
        email: 'chaink2000@gmail.com',
      });
      adminStorage.addAuditLog({
        action: 'Admin Logged In',
        category: 'System',
        details: `Authenticated as ${role} (chaink2000@gmail.com)`,
      });
      audioFeedback.playSuccess();
      onSuccess();
    } else {
      audioFeedback.playError();
      setError('Invalid Admin Security PIN. (Hint: Use default PIN 8888 or 1-Click Demo)');
    }
  };

  const handleQuickDemoAccess = () => {
    adminStorage.setAdminAuth({
      isAuthenticated: true,
      role: 'Super Admin',
      email: 'chaink2000@gmail.com',
    });
    adminStorage.addAuditLog({
      action: 'Quick Admin Session Initialized',
      category: 'System',
      details: 'Instant Evaluator/Demo Super Admin Access Granted.',
    });
    audioFeedback.playSuccess();
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-sky-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-900">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-sm">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-sky-700">
              <Lock className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h3 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2">
              Admin Control Center
              <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Enterprise
              </span>
            </h3>
            <p className="text-xs text-slate-600">
              Curriculum CMS, Financials, RBAC & Prompt Studio
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Admin Privilege Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('Super Admin')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  role === 'Super Admin'
                    ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                    : 'bg-sky-50 border-sky-200 text-slate-700 hover:bg-sky-100'
                }`}
              >
                Super Admin (All)
              </button>
              <button
                type="button"
                onClick={() => setRole('Institution Admin')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  role === 'Institution Admin'
                    ? 'bg-sky-600 border-sky-600 text-white shadow-xs'
                    : 'bg-sky-50 border-sky-200 text-slate-700 hover:bg-sky-100'
                }`}
              >
                Institution Admin
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Security PIN</span>
              <span className="text-[11px] text-slate-500 font-normal">Default PIN: <strong className="text-emerald-700 font-mono">8888</strong></span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="Enter 4-digit PIN (8888)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-sky-50 border border-sky-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono tracking-widest text-sm"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold text-sm shadow-sm hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Unlock Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-emerald-700 font-semibold text-xs border border-sky-200 hover:border-emerald-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Instant Evaluator Access (Demo)</span>
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-sky-100 text-[11px] text-slate-600 flex items-center justify-between">
          <div className="flex items-center gap-1 text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Founder: Mr. ChainSingh Kushro</span>
          </div>
          <span className="font-mono text-sky-700">chaink2000@gmail.com</span>
        </div>
      </div>
    </div>
  );
};
