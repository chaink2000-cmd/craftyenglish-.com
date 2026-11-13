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
  CheckCircle2
} from 'lucide-react';
import { AdminSection, NavTab } from '../../types';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';
import { AdminOverview } from './AdminOverview';
import { UserManagement } from './UserManagement';
import { SyllabusManager } from './SyllabusManager';
import { QuestionBankCms } from './QuestionBankCms';
import { AiStudioCms } from './AiStudioCms';
import { FinancialsCms } from './FinancialsCms';
import { SystemSettingsCms } from './SystemSettingsCms';

interface AdminControlCenterProps {
  onExitToStudentView: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const AdminControlCenter: React.FC<AdminControlCenterProps> = ({ 
  onExitToStudentView,
}) => {
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const auth = adminStorage.getAdminAuth();

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleLogout = () => {
    audioFeedback.playClick();
    adminStorage.logoutAdmin();
    onExitToStudentView();
  };

  const navItems: { id: AdminSection; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Mission Control', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', label: 'User & Role RBAC', icon: <Users className="w-4 h-4" /> },
    { id: 'syllabus-cms', label: 'Syllabus & Tree CMS', icon: <BookMarked className="w-4 h-4" />, badge: 'P1/P2/TET' },
    { id: 'questions-cms', label: 'Question Bank CMS', icon: <FileQuestion className="w-4 h-4" />, badge: 'AI Explainer' },
    { id: 'ai-studio', label: 'AI Prompt Studio', icon: <Cpu className="w-4 h-4" /> },
    { id: 'financials', label: 'Financials & Coupons', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', label: 'System & Audit Logs', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-emerald-400 shadow-lg text-slate-900 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Bar & Role Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-sky-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-editorial text-lg sm:text-xl font-bold text-slate-900">
                Admin Control Center & CMS
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                {auth.role || 'Super Admin'}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono">
              Founder & Educator: Mr. ChainSingh Kushro · Session: {auth.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioFeedback.playClick();
              onExitToStudentView();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Student View</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-sky-50 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-sky-200 hover:border-rose-200 transition-colors cursor-pointer"
            title="Lock Admin Session & Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Admin Horizontal Tabs / Sidebar Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-sky-200">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                audioFeedback.playClick();
                setActiveSection(item.id);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white border border-sky-200 text-slate-700 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-sky-50 text-sky-700 border border-sky-200'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Admin Section View */}
      <div className="pt-2">
        {activeSection === 'overview' && (
          <AdminOverview onNavigateSection={(sec) => setActiveSection(sec)} />
        )}
        {activeSection === 'users' && <UserManagement onShowToast={showToast} />}
        {activeSection === 'syllabus-cms' && <SyllabusManager onShowToast={showToast} />}
        {activeSection === 'questions-cms' && <QuestionBankCms onShowToast={showToast} />}
        {activeSection === 'ai-studio' && <AiStudioCms onShowToast={showToast} />}
        {activeSection === 'financials' && <FinancialsCms onShowToast={showToast} />}
        {activeSection === 'settings' && <SystemSettingsCms onShowToast={showToast} />}
      </div>
    </div>
  );
};
