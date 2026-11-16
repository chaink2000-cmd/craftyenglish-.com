import React, { useState, useEffect } from 'react';
import {
  AppLanguage,
  LiteratureTrack,
  NavTab,
  PracticePreset,
  ResourceSubTab,
  ThemeMode,
  UserStats,
} from './types';
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
import { StudyResourcesHub } from './components/StudyResourcesHub';
import { AboutEducatorHub } from './components/AboutEducatorHub';
import { ProgressDashboard } from './components/ProgressDashboard';
import { CompetitiveExamsHub } from './components/CompetitiveExamsHub';
import { ContactUsHub } from './components/ContactUsHub';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { MembershipModal } from './components/MembershipModal';
import { GlobalAnnouncementBanner } from './components/GlobalAnnouncementBanner';
import { AdminControlCenter } from './components/admin/AdminControlCenter';
import { CraftyLogo } from './components/CraftyLogo';
import { ShieldCheck, Lock, Mail, UserCheck } from 'lucide-react';
import { audioFeedback } from './utils/audioFeedback';
import { useAuth } from './context/AuthContext';
import { updateUserStatsInFirestore } from './utils/firestoreDataService';

const STORAGE_KEY = 'crafty_english_scholar_data_v1';
const THEME_STORAGE_KEY = 'crafty_english_theme';
const LANG_STORAGE_KEY = 'crafty_english_lang';

export default function App() {
  const { firebaseUser, userProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [literatureTrack, setLiteratureTrack] = useState<LiteratureTrack>('net-mpset-paper2');
  const [trackNonce, setTrackNonce] = useState(0);
  const [grammarModuleInit, setGrammarModuleInit] = useState<number | undefined>(undefined);
  const [practicePreset, setPracticePreset] = useState<PracticePreset>({
    view: 'practice-15',
    mode: 'practice',
    nonce: 0,
  });
  const [resourceSubTab, setResourceSubTab] = useState<ResourceSubTab>('notes');
  const [resourceNonce, setResourceNonce] = useState(0);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'light';
  });

  const [language, setLanguage] = useState<AppLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'hi' || saved === 'en') return saved;
    }
    return 'en';
  });

  useEffect(() => {
    const rootEl = document.documentElement;
    if (theme === 'dark') {
      rootEl.classList.add('dark');
    } else {
      rootEl.classList.remove('dark');
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LANG_STORAGE_KEY, language);
  }, [language]);

  // Ctrl+K / Cmd+K opens Global Search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // User Stats with LocalStorage Persistence
  const [userStats, setUserStats] = useState<UserStats>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userStats));
    } catch {
      // Ignore quota errors
    }
  }, [userStats]);

  const handleToggleLanguage = async (nextLang: AppLanguage) => {
    setLanguage(nextLang);
    if (firebaseUser) {
      try {
        await updateUserStatsInFirestore(firebaseUser.uid, { preferredLanguage: nextLang });
      } catch {
        // Silent background preference sync
      }
    }
  };

  const handleAddXP = (amount: number) => {
    setUserStats((prev) => {
      const newXP = prev.xp + amount;
      let newLevel = prev.level;
      if (newXP >= 4000) newLevel = 'NET Scholar';
      else if (newXP >= 3000) newLevel = 'C1 Operational';
      else if (newXP >= 2000) newLevel = 'B2 Vantage';
      else if (newXP >= 1000) newLevel = 'B1 Threshold';

      return { ...prev, xp: newXP, level: newLevel };
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
    audioFeedback.playClick();
    setActiveTab('admin');
  };

  const handleOpenLiteratureTrack = (track: LiteratureTrack) => {
    setLiteratureTrack(track);
    setTrackNonce((n) => n + 1);
    setActiveTab('literature');
  };

  const handleOpenGrammarModule = (moduleNumber: number) => {
    setGrammarModuleInit(moduleNumber);
    setActiveTab('grammar');
  };

  const handleOpenPracticeMode = (
    view: 'interactive' | 'yearwise-archive' | 'practice-15',
    mode: 'practice' | 'timed',
    moduleNumber?: number,
    examCategory?: string
  ) => {
    setPracticePreset((prev) => ({
      view,
      mode,
      moduleNumber,
      examCategory,
      nonce: prev.nonce + 1,
    }));
    setActiveTab('mcqs');
  };

  const handleOpenResourceTab = (subTab: ResourceSubTab) => {
    setResourceSubTab(subTab);
    setResourceNonce((n) => n + 1);
    setActiveTab('resources');
  };

  const syncedStats: UserStats = userProfile
    ? {
        ...userStats,
        xp: userProfile.xp,
        streakDays: userProfile.streakDays,
        level: userProfile.learningLevel,
      }
    : userStats;

  return (
    <div className="min-h-screen bg-[#f4f7fc] dark:bg-[#061121] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200 selection:bg-blue-200 dark:selection:bg-blue-800">
      {/* Global Announcement Alert Banner */}
      <GlobalAnnouncementBanner onNavigateTab={(tab) => setActiveTab(tab)} />

      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStats={syncedStats}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        onOpenLiteratureTrack={handleOpenLiteratureTrack}
        onOpenPracticeMode={handleOpenPracticeMode}
        onOpenResourceTab={handleOpenResourceTab}
      />

      {/* Main View Router covering all 13 Navigation Sections + Specialized Labs */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto w-full">
        {activeTab === 'home' && (
          <HomeHero
            setActiveTab={setActiveTab}
            userStats={syncedStats}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenGrammarLevelModule={handleOpenGrammarModule}
            onOpenPricing={() => setIsPricingOpen(true)}
            onOpenLiteratureTrack={handleOpenLiteratureTrack}
            onOpenPracticeMode={handleOpenPracticeMode}
            onOpenResourceTab={handleOpenResourceTab}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarHub
            onAddXP={handleAddXP}
            language={language}
            onToggleLanguage={handleToggleLanguage}
            initialModuleNumber={grammarModuleInit}
          />
        )}

        {activeTab === 'literature' && (
          <LiteratureAcademy initialTrack={literatureTrack} trackNonce={trackNonce} />
        )}

        {activeTab === 'competitive' && (
          <CompetitiveExamsHub language={language} onAddXP={handleAddXP} />
        )}

        {activeTab === 'mpesb-paper1' && <MpesbPaper1Hub onAddXP={handleAddXP} />}

        {activeTab === 'mcqs' && (
          <McqPyqSimulator
            onAddXP={handleAddXP}
            initialPreset={practicePreset}
            language={language}
          />
        )}

        {activeTab === 'vocab' && <VocabularyForge onAddXP={handleAddXP} />}

        {activeTab === 'syntax-games' && <InteractiveGames onAddXP={handleAddXP} />}

        {activeTab === 'writing-studio' && <WritingStudio onAddXP={handleAddXP} />}

        {activeTab === 'speech-lab' && <SpeechLab onAddXP={handleAddXP} />}

        {activeTab === 'resources' && (
          <StudyResourcesHub
            initialSubTab={resourceSubTab}
            subTabNonce={resourceNonce}
            onAddXP={handleAddXP}
          />
        )}

        {activeTab === 'coach' && <AiCoachSuite language={language} />}

        {activeTab === 'progress' && (
          <ProgressDashboard
            userStats={syncedStats}
            language={language}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && (
          <AboutEducatorHub
            onNavigateTab={setActiveTab}
            onOpenLiteratureTrack={handleOpenLiteratureTrack}
            onOpenResourceTab={handleOpenResourceTab}
          />
        )}

        {activeTab === 'contact' && <ContactUsHub language={language} />}

        {activeTab === 'admin' && (
          <AdminControlCenter
            onExitToStudentView={() => setActiveTab('home')}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Navy / Royal Blue / Gold Academic Footer */}
      <footer className="bg-[#0a192f] text-blue-100 border-t border-blue-900 mt-16 py-12 px-4 sm:px-6 lg:px-8 print:hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <CraftyLogo className="w-9 h-9 shrink-0" />
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight block">
                  Crafty English
                </span>
                <span className="text-[11px] text-amber-300 font-medium">
                  Learn Smart. Speak Confidently. Master English.
                </span>
              </div>
            </div>
            <p className="leading-relaxed text-blue-200">
              Complete bilingual educational platform for 37 Grammar Modules, English Literature, NTA UGC NET, MPSET, and MPESB Grade 1 &amp; 2 preparation.
            </p>
            <div className="pt-2 space-y-1.5 border-t border-blue-900">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Founder &amp; Educator: Mr. ChainSingh Kushro</span>
              </div>
              <a
                href="mailto:chaink2000@gmail.com"
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>chaink2000@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider">
              Grammar &amp; Skills
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('grammar')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  37-Module Bilingual Grammar (EN / हिंदी)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('speech-lab')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Spoken English &amp; Phonetics Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('vocab')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Vocabulary, Roots &amp; SRS Deck
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('writing-studio')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Writing Skills (Letters, Précis &amp; Essays)
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider">
              Exams &amp; Practice
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('competitive')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Competitive Exams Hub (NET / MPSET / TET)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenPracticeMode('practice-15', 'practice')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  15-Format Interactive Practice Zone
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOpenResourceTab('notes')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Study Materials: Notes, PDF &amp; Charts
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('coach')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  AI English Tutor (3 Adaptive Levels)
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-bold text-amber-300 text-xs uppercase tracking-wider">
              Academy &amp; Administration
            </h4>
            <p className="leading-relaxed text-blue-200">
              Directed by <strong className="text-white">Mr. ChainSingh Kushro</strong>. Verified cloud progress, badges, and certificates powered by Firebase.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-300 font-semibold pt-0.5">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Authenticated Cloud Curriculum</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={() => setActiveTab('about')}
                className="px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab('contact')}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-bold cursor-pointer"
              >
                Contact Us
              </button>
              <button
                onClick={handleOpenAdmin}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-blue-900 flex flex-col sm:flex-row items-center justify-between text-xs text-blue-300 gap-2">
          <span>© 2026 Crafty English – Learn English. Master Grammar. Explore Literature.</span>
          <a
            href="mailto:chaink2000@gmail.com"
            className="text-amber-300 hover:text-amber-200 font-medium transition-colors"
          >
            Founder: Mr. ChainSingh Kushro · chaink2000@gmail.com
          </a>
        </div>
      </footer>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        language={language}
        onNavigateModule={handleOpenGrammarModule}
        onNavigateTab={setActiveTab}
        onOpenLiteratureTrack={handleOpenLiteratureTrack}
        onOpenPracticeQuestion={(modNum, examCategory) =>
          handleOpenPracticeMode('practice-15', 'practice', modNum, examCategory)
        }
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
