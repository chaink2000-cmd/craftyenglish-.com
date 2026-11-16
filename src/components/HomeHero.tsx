import React from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  FileCheck2,
  Layers,
  PenTool,
  Mic,
  Trophy,
  Bot,
  Flame,
  Zap,
  ArrowRight,
  Search,
  Sparkles,
  Mail,
  UserCheck,
  FolderKanban,
  Feather,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { AppLanguage, LiteratureTrack, NavTab, ResourceSubTab, UserStats } from '../types';
import { LEVEL_DEFINITIONS } from '../data/grammar37';
import { audioFeedback } from '../utils/audioFeedback';
import { CraftyLogo } from './CraftyLogo';

interface HomeHeroProps {
  setActiveTab: (tab: NavTab) => void;
  userStats: UserStats;
  language: AppLanguage;
  onToggleLanguage: (lang: AppLanguage) => void;
  onOpenSearch: () => void;
  onOpenGrammarLevelModule: (moduleNumber: number) => void;
  onOpenPricing: () => void;
  onOpenLiteratureTrack: (track: LiteratureTrack) => void;
  onOpenPracticeMode: (view: 'interactive' | 'yearwise-archive' | 'practice-15', mode: 'practice' | 'timed') => void;
  onOpenResourceTab: (subTab: ResourceSubTab) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  setActiveTab,
  userStats,
  language,
  onToggleLanguage,
  onOpenSearch,
  onOpenGrammarLevelModule,
  onOpenLiteratureTrack,
  onOpenPracticeMode,
}) => {
  const isHi = language === 'hi';

  const handleNav = (tab: NavTab) => {
    audioFeedback.playClick();
    setActiveTab(tab);
  };

  // All 13 Main Navigation Sections Grid
  const all13Directory: {
    id: NavTab;
    labelEn: string;
    labelHi: string;
    subEn: string;
    subHi: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'मुख्य पृष्ठ', subEn: 'Academy Overview', subHi: 'संस्थान परिचय', icon: Home },
    { id: 'grammar', labelEn: 'English Grammar', labelHi: 'अंग्रेज़ी व्याकरण', subEn: '37 Bilingual Modules', subHi: '37 द्विभाषी मॉड्यूल', icon: BookOpen },
    { id: 'literature', labelEn: 'English Literature', labelHi: 'अंग्रेज़ी साहित्य', subEn: 'NET / MPSET / NCERT', subHi: 'साहित्य व आलोचना', icon: Feather },
    { id: 'speech-lab', labelEn: 'Spoken English', labelHi: 'स्पोकन अंग्रेज़ी', subEn: 'Pronunciation & Lab', subHi: 'उच्चारण व संवाद', icon: Mic },
    { id: 'vocab', labelEn: 'Vocabulary', labelHi: 'शब्द-संपदा', subEn: 'Roots, SRS & Idioms', subHi: 'मूल शब्द व मुहावरे', icon: Layers },
    { id: 'writing-studio', labelEn: 'Writing Skills', labelHi: 'लेखन कौशल', subEn: 'Letters, Précis & Essays', subHi: 'पत्र, संक्षेपण व निबंध', icon: PenTool },
    { id: 'mcqs', labelEn: 'Practice Zone', labelHi: 'अभ्यास क्षेत्र', subEn: '15 Question Formats', subHi: '15 प्रारूप व प्रश्न बैंक', icon: FileCheck2 },
    { id: 'competitive', labelEn: 'Competitive Exams', labelHi: 'प्रतियोगी परीक्षाएँ', subEn: 'UGC NET & MPESB TET', subHi: 'NET, MPSET व वर्ग 1-2', icon: GraduationCap },
    { id: 'resources', labelEn: 'Study Materials', labelHi: 'अध्ययन सामग्री', subEn: 'Notes, PDF & Charts', subHi: 'नोट्स, PDF व चार्ट', icon: FolderKanban },
    { id: 'coach', labelEn: 'AI English Tutor', labelHi: 'AI अंग्रेज़ी शिक्षक', subEn: '3 Adaptive Levels', subHi: '3 शिक्षण स्तर', icon: Bot },
    { id: 'progress', labelEn: 'My Learning', labelHi: 'मेरी प्रगति', subEn: 'Badges & Certificates', subHi: 'बैज व प्रमाणपत्र', icon: Trophy },
    { id: 'about', labelEn: 'About Us', labelHi: 'हमारे बारे में', subEn: 'Mr. ChainSingh Kushro', subHi: 'संस्थापक परिचय', icon: UserCheck },
    { id: 'contact', labelEn: 'Contact Us', labelHi: 'संपर्क करें', subEn: 'Academic Support', subHi: 'सीधा संवाद व पूछताछ', icon: Mail },
  ];

  return (
    <div className="space-y-8">
      {/* Main Brand Hero Showcase */}
      <section className="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f2544] to-blue-800 text-white p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2.5">
              <CraftyLogo className="w-11 h-11 shrink-0" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Crafty English · Learn Smart. Speak Confidently. Master English.
                </div>
                <div className="text-xs text-blue-200">
                  Founded &amp; Directed by Mr. ChainSingh Kushro · chaink2000@gmail.com
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {isHi
                ? 'अंग्रेज़ी सीखें. व्याकरण में महारत पाएं. साहित्य का अन्वेषण करें.'
                : 'Learn English. Master Grammar. Explore Literature.'}
            </h1>

            <p className="text-sm sm:text-base text-blue-100 max-w-2xl leading-relaxed">
              {isHi
                ? '6 प्रगतिशील स्तरों में विभाजित 37 द्विभाषी (अंग्रेज़ी / हिन्दी) व्याकरण मॉड्यूल, 15 प्रकार के इंटरैक्टिव अभ्यास प्रश्न, NTA UGC NET व MPESB प्रतियोगी परीक्षा पाठ्यक्रम और AI शिक्षक के साथ संपूर्ण शैक्षणिक मंच।'
                : 'A complete academic platform uniting 37 bilingual English/हिंदी grammar modules across 6 progressive levels, 15 interactive practice formats, NTA UGC NET & MPESB TET competitive tracks, and an adaptive AI English Tutor.'}
            </p>

            {/* Quick Action Search Bar + Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                onClick={onOpenSearch}
                className="flex-1 max-w-md flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/25 text-left text-sm text-blue-100 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4 text-amber-300 shrink-0" />
                <span className="truncate">
                  {isHi
                    ? 'पाठ, नियम, लेखक, पुस्तक या प्रश्न खोजें...'
                    : 'Search lessons, grammar rules, authors, or PYQs...'}
                </span>
              </button>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleNav('grammar')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-sm font-extrabold shadow-lg cursor-pointer transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isHi ? '37 व्याकरण मॉड्यूल शुरू करें' : 'Start 37 Grammar Modules'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenPracticeMode('practice-15', 'practice')}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isHi ? '15-प्रारूप अभ्यास' : '15-Format Practice'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Bilingual & Scholar Summary Card */}
          <div className="lg:col-span-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Scholar Snapshot
              </span>
              <button
                onClick={() => onToggleLanguage(language === 'en' ? 'hi' : 'en')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-[#0a192f] text-xs font-extrabold cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#0a192f]/60 border border-white/10">
                <div className="text-[11px] text-blue-200">Current Level</div>
                <div className="text-base font-extrabold text-white mt-0.5">{userStats.level}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0a192f]/60 border border-white/10">
                <div className="text-[11px] text-blue-200">Active Streak</div>
                <div className="text-base font-extrabold text-orange-300 flex items-center gap-1 mt-0.5">
                  <Flame className="w-4 h-4 fill-current" />
                  {userStats.streakDays} Days
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#0a192f]/60 border border-white/10">
                <div className="text-[11px] text-blue-200">Scholar XP</div>
                <div className="text-base font-extrabold text-amber-300 flex items-center gap-1 mt-0.5">
                  <Zap className="w-4 h-4 fill-current" />
                  {userStats.xp} XP
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#0a192f]/60 border border-white/10">
                <div className="text-[11px] text-blue-200">Curriculum</div>
                <div className="text-base font-extrabold text-emerald-300 mt-0.5">37 Modules</div>
              </div>
            </div>

            <button
              onClick={() => handleNav('coach')}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#0a192f] text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Bot className="w-4 h-4 text-blue-700" />
              <span>{isHi ? 'AI अंग्रेज़ी शिक्षक से पूछें' : 'Ask AI English Tutor Now'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6 Progressive Grammar Levels Overview */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] dark:text-white">
              {isHi
                ? '6 प्रगतिशील व्याकरण स्तर (37 पूर्ण मॉड्यूल)'
                : '6 Progressive Grammar Levels (37 Complete Modules)'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              {isHi
                ? 'प्रत्येक स्तर में अंग्रेज़ी और हिन्दी व्याख्या, सूत्र, 10+ उदाहरण, 20 MCQs व मूल्यांकन शामिल हैं।'
                : 'Click any level to jump straight into bilingual 19-section lessons, formulas, and assessments.'}
            </p>
          </div>
          <button
            onClick={() => handleNav('grammar')}
            className="text-xs font-bold text-blue-700 dark:text-amber-400 hover:underline cursor-pointer"
          >
            Explore All 37 Modules →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LEVEL_DEFINITIONS.map((lvl) => (
            <button
              key={lvl.levelNumber}
              onClick={() => {
                audioFeedback.playClick();
                onOpenGrammarLevelModule(lvl.moduleRange[0]);
              }}
              className="text-left p-5 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-amber-400 shadow-sm transition-all space-y-2 cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs font-extrabold">
                <span className="text-blue-700 dark:text-amber-400">
                  Modules {lvl.moduleRange[0]}–{lvl.moduleRange[1]}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 dark:group-hover:text-amber-400 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-[#0a192f] dark:text-white">
                {isHi ? lvl.titleHi : lvl.titleEn}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {isHi ? lvl.subtitleHi : lvl.subtitleEn}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Complete 13-Section Academy Directory */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] dark:text-white">
            {isHi ? 'Crafty English के सभी 13 मुख्य अनुभाग' : 'All 13 Academic Platform Sections'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {isHi
              ? 'व्याकरण, साहित्य, स्पोकन अंग्रेज़ी, शब्दकोश, अभ्यास क्षेत्र और प्रतियोगी परीक्षाओं तक त्वरित पहुँच।'
              : 'Direct access to every learning lab, examination track, and cloud student utility.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {all13Directory.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-left p-4 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-amber-400 shadow-sm transition-all flex flex-col gap-2 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-amber-400 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0a192f] dark:text-white">
                    {isHi ? item.labelHi : item.labelEn}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {isHi ? item.subHi : item.subEn}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Competitive Examinations Highlight Strip */}
      <section className="rounded-2xl bg-blue-50/80 dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>NTA UGC NET · MPSET · MPESB TET Grade 1, Grade 2 &amp; Common Paper 1</span>
          </div>
          <h3 className="text-lg font-extrabold text-[#0a192f] dark:text-white">
            {isHi
              ? 'प्रतियोगी परीक्षाओं के लिए एकीकृत तैयारी और प्रमाणित PYQs'
              : 'Dedicated Syllabi & Transparent PYQ Practice for National & State Exams'}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={() => handleNav('competitive')}
            className="px-4 py-2.5 rounded-xl bg-[#0a192f] dark:bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
          >
            Competitive Exams Hub
          </button>
          <button
            onClick={() => onOpenLiteratureTrack('net-mpset-paper2')}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#0a192f] border border-blue-300 dark:border-blue-700 text-[#0a192f] dark:text-white text-xs font-bold cursor-pointer"
          >
            NET Paper 2 Canon
          </button>
          <button
            onClick={() => handleNav('mpesb-paper1')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-extrabold cursor-pointer"
          >
            MPESB Common Paper 1
          </button>
        </div>
      </section>
    </div>
  );
};
