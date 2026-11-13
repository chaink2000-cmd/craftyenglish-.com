import React, { useState, useRef, useEffect } from 'react';
import {
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
  Landmark,
  Puzzle,
  ChevronDown,
  LayoutGrid,
} from 'lucide-react';
import { NavTab, UserStats } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  userStats: UserStats;
  onOpenPricing: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userStats,
  onOpenPricing,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [workshopsOpen, setWorkshopsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(audioFeedback.getIsMuted());
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setWorkshopsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab: NavTab) => {
    audioFeedback.playClick();
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setWorkshopsOpen(false);
  };

  const handleSoundToggle = () => {
    const muted = audioFeedback.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      audioFeedback.playSuccess();
    }
  };

  const primaryNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'coach', label: 'AI Coach', icon: <Bot className="w-4 h-4" /> },
    { id: 'grammar', label: 'Grammar', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'literature', label: 'Syllabi', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'mpesb-paper1', label: 'MPESB P1', icon: <Landmark className="w-4 h-4" /> },
    { id: 'mcqs', label: 'PYQs', icon: <FileCheck2 className="w-4 h-4" /> },
  ];

  const studioItems: { id: NavTab; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'vocab',
      label: 'Vocabulary Forge',
      desc: 'Spaced repetition flashcards & roots',
      icon: <Layers className="w-4 h-4 text-sky-600" />,
    },
    {
      id: 'syntax-games',
      label: 'Idiom & Syntax Puzzles',
      desc: 'Interactive clause & idiom workshops',
      icon: <Puzzle className="w-4 h-4 text-emerald-600" />,
    },
    {
      id: 'writing-studio',
      label: 'Writing Studio',
      desc: 'Readability meter & peer showcase',
      icon: <PenTool className="w-4 h-4 text-blue-600" />,
    },
    {
      id: 'speech-lab',
      label: 'Speech & Phonetics Lab',
      desc: 'Waveform visualizer & UK/US scoring',
      icon: <Mic className="w-4 h-4 text-sky-600" />,
    },
    {
      id: 'progress',
      label: 'Progress & Skill Tree',
      desc: 'CEFR mastery, quests & leaderboard',
      icon: <Trophy className="w-4 h-4 text-amber-600" />,
    },
  ];

  const isStudioActive = studioItems.some((item) => item.id === activeTab);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-sky-200 shadow-sm shadow-sky-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-150">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-editorial text-xl font-bold tracking-tight text-slate-900 group-hover:text-sky-700 transition-colors whitespace-nowrap">
              Crafty English
            </span>
          </button>

          {/* Zone 2: Clean Single-Line Navigation + Organized Studios Dropdown */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'text-sky-800 bg-sky-100/90'
                      : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50'
                  }`}
                >
                  <span className={isActive ? 'text-sky-600' : 'text-sky-500'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-sky-600 rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Organized Practice Studios Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  setWorkshopsOpen((prev) => !prev);
                }}
                aria-expanded={workshopsOpen}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isStudioActive || workshopsOpen
                    ? 'text-sky-800 bg-sky-100/90'
                    : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50'
                }`}
              >
                <LayoutGrid className={`w-4 h-4 ${isStudioActive ? 'text-sky-600' : 'text-sky-500'}`} />
                <span>Studios</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${
                    workshopsOpen ? 'rotate-180' : ''
                  }`}
                />
                {isStudioActive && (
                  <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-sky-600 rounded-full" />
                )}
              </button>

              {workshopsOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white border border-sky-200 shadow-xl shadow-sky-900/10 p-2 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-sky-700">
                    Practice Studios & Progression
                  </div>
                  <div className="space-y-0.5">
                    {studioItems.map((studio) => {
                      const active = activeTab === studio.id;
                      return (
                        <button
                          key={studio.id}
                          onClick={() => handleTabClick(studio.id)}
                          className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                            active
                              ? 'bg-sky-100 text-sky-950'
                              : 'hover:bg-sky-50 text-slate-700'
                          }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center shrink-0">
                            {studio.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900 truncate">
                              {studio.label}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">
                              {studio.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Disciplined Right Action Cluster */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Compact Tabular Scholar Readout */}
            <button
              onClick={() => handleTabClick('progress')}
              title="View Progress & Streak"
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 hover:border-sky-400 text-xs font-mono tabular-nums text-slate-800 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                {userStats.streakDays}d
              </span>
              <span className="text-sky-200" aria-hidden="true">|</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                {userStats.xp} XP
              </span>
            </button>

            {/* Sound Effects Toggle */}
            <button
              onClick={handleSoundToggle}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-sky-200 bg-white text-slate-600 hover:text-sky-900 hover:bg-sky-50 transition-colors cursor-pointer shrink-0"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-600" />
              ) : (
                <Volume2 className="w-4 h-4 text-sky-600" />
              )}
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => {
                audioFeedback.playClick();
                onOpenAdmin();
              }}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-sky-600 border-sky-600 text-white'
                  : 'bg-white border-sky-200 text-sky-800 hover:bg-sky-50 hover:border-sky-300'
              }`}
              title="Admin Control Center & CMS"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === 'admin' ? 'text-white' : 'text-sky-600'}`} />
              <span>Admin</span>
            </button>

            {/* Primary Membership CTA */}
            <button
              onClick={() => {
                audioFeedback.playClick();
                onOpenPricing();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-sky-600/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>{userStats.isPremium ? 'Pro Scholar' : 'Unlock Pro'}</span>
            </button>

            {/* Mobile/Tablet Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-sky-200 bg-white text-slate-700 hover:text-sky-900 hover:bg-sky-50 transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Organized Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-sky-200 px-4 pt-3 pb-5 space-y-4 shadow-lg">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs">
              <Flame className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <span className="text-slate-500 text-[11px] block">Daily Streak</span>
                <span className="font-semibold font-mono tabular-nums text-slate-900">{userStats.streakDays} Days</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-500 text-[11px] block">Scholar XP</span>
                <span className="font-semibold font-mono tabular-nums text-slate-900">{userStats.xp} XP</span>
              </div>
            </div>
          </div>

          {/* Group 1: Core Curriculum & Exams */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-sky-800 px-1">
              01. Core Curriculum & Exam Prep
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {primaryNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white'
                        : 'bg-sky-50/70 text-slate-800 hover:bg-sky-100 border border-sky-200'
                    }`}
                  >
                    <span className={isActive ? 'text-white' : 'text-sky-600'}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Practice Studios & Progress */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-sky-800 px-1">
              02. Practice Studios & Analytics
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {studioItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-sky-600 text-white'
                        : 'bg-sky-50/70 text-slate-800 hover:bg-sky-100 border border-sky-200'
                    }`}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-sky-200">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 font-semibold text-xs hover:bg-sky-100 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Admin Control Center & CMS</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
