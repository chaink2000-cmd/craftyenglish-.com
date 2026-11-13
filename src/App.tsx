import React, { useState, useEffect } from 'react';
import { NavTab, UserStats } from './types';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { AiCoachSuite } from './components/AiCoachSuite';
import { GrammarHub } from './components/GrammarHub';
import { LiteratureAcademy } from './components/LiteratureAcademy';
import { MpesbPaper1Hub } from './components/MpesbPaper1Hub';
import { McqPyqSimulator } from './components/McqPyqSimulator';
import { VocabularyForge } from './components/VocabularyForge';
import { InteractiveGames } from './components/InteractiveGames';
import { WritingStudio } from './components/WritingStudio';
import { SpeechLab } from './components/SpeechLab';
import { ProgressDashboard } from './components/ProgressDashboard';
import { MembershipModal } from './components/MembershipModal';
import { GlobalAnnouncementBanner } from './components/GlobalAnnouncementBanner';
import { AdminControlCenter } from './components/admin/AdminControlCenter';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { Sparkles, BookOpen, GraduationCap, ShieldCheck, Lock, Mail, UserCheck } from 'lucide-react';
import { audioFeedback } from './utils/audioFeedback';
import { adminStorage } from './utils/adminStorage';

const STORAGE_KEY = 'crafty_english_scholar_data_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);


  // User Stats with LocalStorage Persistence
  const [userStats, setUserStats] = useState<UserStats>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // Ignore parse error
      }
    }
    return {
      xp: 2450,
      level: 'B2 Vantage',
      streakDays: 7,
      lastActiveDate: new Date().toISOString(),
      solvedMCQs: 42,
      grammarMasteryPercent: 88,
      literatureMasteryPercent: 76,
      vocabWordsMastered: 18,
      unlockedBadges: ['b1', 'b2', 'b3', 'b4'],
      isPremium: false,
    };
  });

  // Save to LocalStorage whenever userStats change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userStats));
    } catch {
      // Ignore quota errors
    }
  }, [userStats]);

  const handleAddXP = (amount: number) => {
    setUserStats((prev) => {
      const newXP = prev.xp + amount;
      let newLevel = prev.level;
      if (newXP >= 4000) newLevel = 'NET Scholar';
      else if (newXP >= 3000) newLevel = 'C1 Operational';
      else if (newXP >= 2000) newLevel = 'B2 Vantage';
      else if (newXP >= 1000) newLevel = 'B1 Threshold';

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
    });
  };

  const handleUpgradeSuccess = (tier: 'Scholar' | 'Enterprise') => {
    setUserStats((prev) => ({
      ...prev,
      isPremium: true,
      premiumTier: tier,
      xp: prev.xp + 500,
    }));
  };

  const handleOpenAdmin = () => {
    const auth = adminStorage.getAdminAuth();
    if (auth.isAuthenticated) {
      setActiveTab('admin');
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 flex flex-col font-sans selection:bg-sky-200 selection:text-sky-950">
      {/* Global Announcement Alert Banner */}
      <GlobalAnnouncementBanner onNavigateTab={(tab) => setActiveTab(tab)} />

      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStats={userStats}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main View Router */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        {activeTab === 'home' && (
          <HomeHero
            setActiveTab={setActiveTab}
            userStats={userStats}
            onOpenPricing={() => setIsPricingOpen(true)}
          />
        )}

        {activeTab === 'coach' && <AiCoachSuite />}

        {activeTab === 'grammar' && <GrammarHub onAddXP={handleAddXP} />}

        {activeTab === 'literature' && <LiteratureAcademy />}

        {activeTab === 'mpesb-paper1' && <MpesbPaper1Hub onAddXP={handleAddXP} />}

        {activeTab === 'mcqs' && <McqPyqSimulator onAddXP={handleAddXP} />}

        {activeTab === 'vocab' && <VocabularyForge onAddXP={handleAddXP} />}

        {activeTab === 'syntax-games' && <InteractiveGames onAddXP={handleAddXP} />}

        {activeTab === 'writing-studio' && <WritingStudio onAddXP={handleAddXP} />}

        {activeTab === 'speech-lab' && <SpeechLab onAddXP={handleAddXP} />}

        {activeTab === 'progress' && <ProgressDashboard userStats={userStats} />}

        {activeTab === 'admin' && (
          <AdminControlCenter
            onExitToStudentView={() => setActiveTab('home')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-sky-50/95 via-white/95 to-sky-100/95 backdrop-blur-xl border-t border-sky-200 mt-16 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs text-slate-600">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-editorial text-lg font-bold text-slate-900 tracking-tight">Crafty English</span>
            </div>
            <p className="leading-relaxed text-slate-600">
              Comprehensive academic platform for English Grammar, Applied Linguistics, NTA UGC NET, MPSET, and MPESB Grade 1 & 2 Teacher Selection exams.
            </p>
            <div className="pt-2 space-y-1.5 border-t border-sky-200/80">
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Founder & Educator: Mr. ChainSingh Kushro</span>
              </div>
              <a
                href="mailto:chaink2000@gmail.com"
                className="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-900 font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>chaink2000@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-900 text-xs tracking-wide">
              Curriculum & Syllabi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('grammar');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  20 Golden Rules of Subject-Verb Agreement
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('grammar');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  Tenses, Inversions & Non-Finites
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('literature');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  NTA NET Paper II English (Units 1–10)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('literature');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  MPESB Grade 1 & 2 NCERT Texts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('mpesb-paper1');
                  }}
                  className="hover:text-blue-900 transition-colors text-sky-700 font-semibold text-left"
                >
                  MPESB Paper 1 Common (100 Exam Points)
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-900 text-xs tracking-wide">
              Practice Studios
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('coach');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  AI Crafty Coach & Smart Fix
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('mcqs');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  PYQ Vault & Timed Exam Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('vocab');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  Vocabulary Forge (SRS Flashcards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setActiveTab('speech-lab');
                  }}
                  className="hover:text-sky-700 transition-colors text-left"
                >
                  Speech & Pronunciation Lab
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-semibold text-slate-900 text-xs tracking-wide">
              Educator & Academic Standards
            </h4>
            <p className="leading-relaxed">
              Directed & curated by <strong className="text-slate-900 font-semibold">Mr. ChainSingh Kushro</strong> (Founder & Lead Educator), adhering to UGC-NET and MPESB examination blueprints.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold pt-0.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Verified Academic Curriculum</span>
            </div>
            <a
              href="mailto:chaink2000@gmail.com"
              className="inline-flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>chaink2000@gmail.com</span>
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  handleOpenAdmin();
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white hover:bg-sky-50 border border-sky-200 text-sky-800 hover:text-sky-950 transition-colors text-xs font-semibold shadow-sm cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-sky-600" />
                <span>Admin Control Center</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-sky-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
          <span>© 2026 Crafty English Academy · Founded by Mr. ChainSingh Kushro. All rights reserved.</span>
          <a href="mailto:chaink2000@gmail.com" className="text-sky-700 hover:text-sky-900 font-medium transition-colors">
            Contact: chaink2000@gmail.com
          </a>
        </div>
      </footer>

      {/* Admin Security PIN Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false);
          setActiveTab('admin');
        }}
      />

      {/* Membership & Checkout Modal */}
      <MembershipModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onUpgradeSuccess={handleUpgradeSuccess}
      />
    </div>
  );
}
