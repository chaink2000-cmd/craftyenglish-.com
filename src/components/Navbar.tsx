import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Layers,
  PenTool,
  Mic,
  Trophy,
  Crown,
  Volume2,
  VolumeX,
  Menu,
  X,
  Flame,
  Zap,
  Bot,
  ShieldCheck,
  Search,
  ChevronDown,
  FolderKanban,
  UserCheck,
  Mail,
  Sun,
  Moon,
  Globe,
  Feather,
  LogIn,
  LogOut,
  Puzzle,
} from 'lucide-react';
import { AppLanguage, LiteratureTrack, NavTab, ResourceSubTab, ThemeMode, UserStats } from '../types';
import { audioFeedback } from '../utils/audioFeedback';
import { CraftyLogo } from './CraftyLogo';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userStats: UserStats;
  language: AppLanguage;
  onToggleLanguage: (lang: AppLanguage) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
  onOpenPricing: () => void;
  onOpenAdmin: () => void;
  onOpenLiteratureTrack: (track: LiteratureTrack) => void;
  onOpenPracticeMode: (view: 'interactive' | 'yearwise-archive', mode: 'practice' | 'timed') => void;
  onOpenResourceTab: (subTab: ResourceSubTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userStats,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  onOpenSearch,
  onOpenPricing,
  onOpenAdmin,
}) => {
  const { firebaseUser, userProfile, isAdmin, signInWithGoogle, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(audioFeedback.getIsMuted());
  const headerRef = useRef<HTMLElement | null>(null);

  const isHi = language === 'hi';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab: NavTab) => {
    audioFeedback.playClick();
    setActiveTab(tab);
    setMegaOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSoundToggle = () => {
    const muted = audioFeedback.toggleMute();
    setIsMuted(muted);
    if (!muted) audioFeedback.playSuccess();
  };

  // All 13 Main Website Navigation Sections
  const all13Sections: {
    id: NavTab;
    labelEn: string;
    labelHi: string;
    group: 'Core Learning' | 'Practice & Exams' | 'Account & Academy';
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ', group: 'Core Learning', icon: Home },
    { id: 'grammar', labelEn: 'English Grammar', labelHi: 'अंग्रेज़ी व्याकरण (37)', group: 'Core Learning', icon: BookOpen },
    { id: 'literature', labelEn: 'English Literature', labelHi: 'अंग्रेज़ी साहित्य', group: 'Core Learning', icon: Feather },
    { id: 'speech-lab', labelEn: 'Spoken English', labelHi: 'स्पोकन अंग्रेज़ी', group: 'Core Learning', icon: Mic },
    { id: 'vocab', labelEn: 'Vocabulary', labelHi: 'शब्द-संपदा', group: 'Core Learning', icon: Layers },
    { id: 'writing-studio', labelEn: 'Writing Skills', labelHi: 'लेखन कौशल', group: 'Core Learning', icon: PenTool },
    { id: 'mcqs', labelEn: 'Practice Zone', labelHi: 'अभ्यास क्षेत्र (15 प्रारूप)', group: 'Practice & Exams', icon: FileCheck2 },
    { id: 'competitive', labelEn: 'Competitive Exams', labelHi: 'प्रतियोगी परीक्षाएँ', group: 'Practice & Exams', icon: GraduationCap },
    { id: 'resources', labelEn: 'Study Materials', labelHi: 'अध्ययन सामग्री', group: 'Practice & Exams', icon: FolderKanban },
    { id: 'coach', labelEn: 'AI English Tutor', labelHi: 'AI अंग्रेज़ी शिक्षक', group: 'Practice & Exams', icon: Bot },
    { id: 'progress', labelEn: 'My Learning', labelHi: 'मेरी प्रगति', group: 'Account & Academy', icon: Trophy },
    { id: 'about', labelEn: 'About Us', labelHi: 'हमारे बारे में', group: 'Account & Academy', icon: UserCheck },
    { id: 'contact', labelEn: 'Contact Us', labelHi: 'संपर्क करें', group: 'Account & Academy', icon: Mail },
  ];

  // Primary compact bar tabs for clean single-line navigation
  const primaryBarTabs: { id: NavTab; labelEn: string; labelHi: string }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'grammar', labelEn: 'Grammar', labelHi: 'व्याकरण' },
    { id: 'literature', labelEn: 'Literature', labelHi: 'साहित्य' },
    { id: 'competitive', labelEn: 'Exams', labelHi: 'परीक्षाएँ' },
    { id: 'mcqs', labelEn: 'Practice', labelHi: 'अभ्यास' },
    { id: 'coach', labelEn: 'AI Tutor', labelHi: 'AI शिक्षक' },
    { id: 'progress', labelEn: 'My Learning', labelHi: 'मेरी प्रगति' },
  ];

  const liveXP = userProfile?.xp ?? userStats.xp;
  const liveStreak = userProfile?.streakDays ?? userStats.streakDays;

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-[#0a192f]/95 dark:bg-[#061121]/95 backdrop-blur-xl border-b border-blue-900/80 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Logo + Explore Menu */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <CraftyLogo className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform" />
            <div className="leading-tight">
              <span className="font-bold text-white text-base sm:text-lg tracking-tight block whitespace-nowrap">
                Crafty English
              </span>
              <span className="text-[10px] text-amber-300 font-medium hidden sm:block whitespace-nowrap">
                Learn Smart. Speak Confidently. Master English.
              </span>
            </div>
          </button>

          {/* Mega Menu Trigger revealing all 13 sections + Syntax Games + MPESB Common */}
          <button
            onClick={() => {
              audioFeedback.playClick();
              setMegaOpen((o) => !o);
            }}
            className={`hidden md:inline-flex items-center gap-1 ml-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              megaOpen
                ? 'bg-blue-700 text-white border-blue-500'
                : 'bg-[#0f2544] text-blue-100 border-blue-800 hover:border-amber-400 hover:text-white'
            }`}
          >
            <Menu className="w-3.5 h-3.5" />
            <span>{isHi ? 'सभी अनुभाग (13)' : 'Explore (13)'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Center: Clean Single-Line Core Tabs */}
        <nav className="hidden xl:flex items-center gap-1" aria-label="Primary navigation">
          {primaryBarTabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTabClick(t.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {isHi ? t.labelHi : t.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Right: Global Search, Language Toggle, Theme Toggle, Stats & Auth */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Global Search Trigger */}
          <button
            onClick={() => {
              audioFeedback.playClick();
              onOpenSearch();
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0f2544] hover:bg-blue-900 border border-blue-800 text-blue-100 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer"
            title="Search lessons, grammar rules, authors, books, exam questions (Ctrl+K)"
            aria-label="Global Search"
          >
            <Search className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">{isHi ? 'खोजें' : 'Search'}</span>
          </button>

          {/* Bilingual EN / हिंदी Switch */}
          <button
            onClick={() => {
              audioFeedback.playClick();
              onToggleLanguage(language === 'en' ? 'hi' : 'en');
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer"
            title="Toggle English / हिंदी Lesson & UI Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'EN / हिं' : 'हिं / EN'}</span>
          </button>

          {/* Light / Dark Mode Switch */}
          <button
            onClick={() => {
              audioFeedback.playClick();
              onToggleTheme();
            }}
            className="p-1.5 rounded-lg bg-[#0f2544] hover:bg-blue-900 border border-blue-800 text-amber-300 shrink-0 cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Light/Dark theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* XP & Streak compact pill */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0f2544] border border-blue-800 text-[11px] font-bold text-white whitespace-nowrap shrink-0">
            <span className="inline-flex items-center gap-0.5 text-amber-300">
              <Zap className="w-3 h-3 fill-current" />
              {liveXP}
            </span>
            <span className="text-blue-400">·</span>
            <span className="inline-flex items-center gap-0.5 text-orange-300">
              <Flame className="w-3 h-3 fill-current" />
              {liveStreak}d
            </span>
          </div>

          {/* Auth / Profile */}
          {firebaseUser ? (
            <button
              onClick={() => handleTabClick('progress')}
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{userProfile?.displayName?.split(' ')[0] || 'Scholar'}</span>
            </button>
          ) : (
            <button
              onClick={() => signInWithGoogle()}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-[#0a192f] text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isHi ? 'साइन इन' : 'Sign In'}</span>
            </button>
          )}

          {/* Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#0f2544] hover:bg-blue-900 border border-blue-800 text-blue-200 hover:text-amber-300 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer"
            title="Admin Dashboard (RBAC Protected)"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isAdmin ? 'Admin CMS' : 'Admin'}</span>
          </button>

          {/* Audio Mute */}
          <button
            onClick={handleSoundToggle}
            className="hidden md:inline-flex p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 shrink-0 cursor-pointer"
            aria-label={isMuted ? 'Unmute audio feedback' : 'Mute audio feedback'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="xl:hidden p-2 rounded-lg text-blue-100 hover:bg-white/10 shrink-0 cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Mega Menu revealing all 13 main sections + specialized labs */}
      {megaOpen && (
        <div className="hidden md:block bg-white dark:bg-[#0d1d36] border-b border-blue-200 dark:border-blue-800 shadow-2xl">
          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['Core Learning', 'Practice & Exams', 'Account & Academy'] as const).map((group) => (
              <div key={group} className="space-y-2">
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-amber-400">
                  {group}
                </div>
                <div className="space-y-1">
                  {all13Sections
                    .filter((s) => s.group === group)
                    .map((sec) => {
                      const Icon = sec.icon;
                      const isActive = activeTab === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => handleTabClick(sec.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                            isActive
                              ? 'bg-[#0a192f] dark:bg-blue-700 text-white'
                              : 'text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-[#0a192f]'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0 text-blue-700 dark:text-amber-400" />
                          <span>{isHi ? sec.labelHi : sec.labelEn}</span>
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}

            <div className="md:col-span-3 pt-3 border-t border-blue-100 dark:border-blue-900 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleTabClick('mpesb-paper1')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-900 dark:text-blue-200 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>MPESB Common Paper 1 (100 Points)</span>
                </button>
                <button
                  onClick={() => handleTabClick('syntax-games')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-900 dark:text-blue-200 cursor-pointer"
                >
                  <Puzzle className="w-3.5 h-3.5" />
                  <span>Interactive Syntax Games</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setMegaOpen(false);
                  onOpenPricing();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-extrabold cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Scholar Membership (₹600/mo · ₹7,000/yr)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-[#0d1d36] border-b border-blue-200 dark:border-blue-800 max-h-[82vh] overflow-y-auto p-4 space-y-4 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {all13Sections.map((sec) => {
              const Icon = sec.icon;
              const active = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleTabClick(sec.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold text-left cursor-pointer ${
                    active
                      ? 'bg-[#0a192f] dark:bg-blue-700 text-white border-[#0a192f]'
                      : 'bg-blue-50/50 dark:bg-[#0a192f] text-slate-800 dark:text-slate-200 border-blue-100 dark:border-blue-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0 text-blue-700 dark:text-amber-400" />
                  <span className="truncate">{isHi ? sec.labelHi : sec.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-blue-100 dark:border-blue-900">
            {firebaseUser ? (
              <button
                onClick={() => logout()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-bold cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out ({userProfile?.displayName})</span>
              </button>
            ) : (
              <button
                onClick={() => signInWithGoogle()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0a192f] dark:bg-blue-700 text-white text-xs font-bold cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Google</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-700 dark:text-amber-400" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
