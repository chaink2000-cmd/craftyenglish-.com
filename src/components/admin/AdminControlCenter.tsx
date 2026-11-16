import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  BookMarked,
  FileQuestion,
  Cpu,
  CreditCard,
  Settings,
  ArrowLeft,
  Sparkles,
  LogOut,
  CheckCircle2,
  Database,
  ShieldAlert,
  LogIn,
} from 'lucide-react';
import { AdminSection, NavTab } from '../../types';
import { audioFeedback } from '../../utils/audioFeedback';
import { useAuth } from '../../context/AuthContext';
import { AdminOverview } from './AdminOverview';
import { UserManagement } from './UserManagement';
import { SyllabusManager } from './SyllabusManager';
import { QuestionBankCms } from './QuestionBankCms';
import { AiStudioCms } from './AiStudioCms';
import { FinancialsCms } from './FinancialsCms';
import { SystemSettingsCms } from './SystemSettingsCms';
import { FirestoreAdminPanel } from './FirestoreAdminPanel';

interface AdminControlCenterProps {
  onExitToStudentView: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const AdminControlCenter: React.FC<AdminControlCenterProps> = ({
  onExitToStudentView,
}) => {
  const { firebaseUser, isAdmin, isSigningIn, signInWithGoogle, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection | 'cloud-cms'>('cloud-cms');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Enforce Real Firebase Auth Admin RBAC strictly (chaink2000@gmail.com / Firestore /admins/{uid})
  if (!firebaseUser || !isAdmin) {
    return (
      <div className="max-w-xl mx-auto rounded-3xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-8 shadow-xl text-center space-y-5 my-8">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-400 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-extrabold text-[#0a192f] dark:text-white">
            Protected Admin Control Center (RBAC Required)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {firebaseUser
              ? `Signed in as ${firebaseUser.email}, which holds a Student role. Only verified Administrator accounts (such as Mr. ChainSingh Kushro — chaink2000@gmail.com) may modify Crafty English cloud courses, questions, and site settings.`
              : 'Sign in with your authorized Crafty English Administrator Google account (chaink2000@gmail.com) to manage courses, questions, CSV imports, and student accounts.'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {!firebaseUser ? (
            <button
              onClick={signInWithGoogle}
              disabled={isSigningIn}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a192f] dark:bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>{isSigningIn ? 'Signing in...' : 'Sign In with Google Admin Account'}</span>
            </button>
          ) : (
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Switch Google Account</span>
            </button>
          )}
          <button
            onClick={onExitToStudentView}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    );
  }

  const navItems: { id: AdminSection | 'cloud-cms'; label: string; icon: React.ReactNode }[] = [
    { id: 'cloud-cms', label: 'Cloud Firestore & CSV', icon: <Database className="w-4 h-4" /> },
    { id: 'overview', label: 'Analytics Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', label: 'Student Directory', icon: <Users className="w-4 h-4" /> },
    { id: 'syllabus-cms', label: 'Syllabus Tree CMS', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'questions-cms', label: 'Question Bank CMS', icon: <FileQuestion className="w-4 h-4" /> },
    { id: 'ai-studio', label: 'AI Prompt Studio', icon: <Cpu className="w-4 h-4" /> },
    { id: 'financials', label: 'Membership Plans', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', label: 'Banners & Audit Logs', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 pb-12">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white dark:bg-[#0d1d36] border border-emerald-400 shadow-lg text-slate-900 dark:text-white text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0a192f] to-blue-700 flex items-center justify-center text-amber-300 shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#0a192f] dark:text-white">
              Crafty English Admin Control Center
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Verified RBAC Session: {firebaseUser.email} · Educator: Mr. ChainSingh Kushro
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioFeedback.playClick();
              onExitToStudentView();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Student View</span>
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-blue-200 dark:border-blue-800">
        {navItems.map((item) => {
          const active = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                active
                  ? 'bg-[#0a192f] dark:bg-blue-700 text-white'
                  : 'bg-white dark:bg-[#0d1d36] text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {activeSection === 'cloud-cms' && <FirestoreAdminPanel onShowToast={showToast} />}
      {activeSection === 'overview' && <AdminOverview onNavigateSection={setActiveSection} />}
      {activeSection === 'users' && <UserManagement onShowToast={showToast} />}
      {activeSection === 'syllabus-cms' && <SyllabusManager onShowToast={showToast} />}
      {activeSection === 'questions-cms' && <QuestionBankCms onShowToast={showToast} />}
      {activeSection === 'ai-studio' && <AiStudioCms onShowToast={showToast} />}
      {activeSection === 'financials' && <FinancialsCms onShowToast={showToast} />}
      {activeSection === 'settings' && <SystemSettingsCms onShowToast={showToast} />}
    </div>
  );
};
