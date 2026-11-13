import React from 'react';
import {
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
  ShieldCheck,
  Landmark,
  Puzzle,
  Sparkles,
  Mail,
  UserCheck,
} from 'lucide-react';
import { NavTab, UserStats } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface HomeHeroProps {
  setActiveTab: (tab: NavTab) => void;
  userStats: UserStats;
  onOpenPricing: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  setActiveTab,
  userStats,
  onOpenPricing,
}) => {
  const handleNav = (tab: NavTab) => {
    audioFeedback.playClick();
    setActiveTab(tab);
  };

  // Group 1: Exactly 4 Core Academic Pillars
  const corePillars = [
    {
      tab: 'coach' as NavTab,
      meta: 'AI Mentor · Smart Fix',
      title: 'AI Crafty Coach',
      desc: 'Real-time writing & literature tutoring with dynamic grammar correction and 5-mode academic tone rewriting.',
      icon: <Bot className="w-5 h-5 text-sky-700" />,
      iconWrap: 'bg-sky-100 border-sky-200',
      cta: 'Open AI Coach',
    },
    {
      tab: 'grammar' as NavTab,
      meta: 'Syntax · 12 Modules',
      title: 'English Grammar Hub',
      desc: 'Master the 20 Golden Rules of Subject-Verb Agreement, Correlative Inversions, Tenses, and Quasi-Passives.',
      icon: <BookOpen className="w-5 h-5 text-blue-700" />,
      iconWrap: 'bg-blue-100 border-blue-200',
      cta: 'Explore Grammar',
    },
    {
      tab: 'literature' as NavTab,
      meta: 'NET · MPSET · TET',
      title: 'Literature & Syllabi',
      desc: 'Complete 10-unit NTA NET Paper 1 & 2, unified MPSET Literature, and MPESB Grade 1 & 2 NCERT texts with exam points.',
      icon: <GraduationCap className="w-5 h-5 text-sky-700" />,
      iconWrap: 'bg-sky-100 border-sky-200',
      cta: 'View All Syllabi',
    },
    {
      tab: 'mpesb-paper1' as NavTab,
      meta: 'Grade 1 & 2 Common',
      title: 'MPESB Paper 1 Hub',
      desc: 'Full 5-unit Part-A syllabus covering CDP, Hindi, English, MP GK & Reasoning plus Top 100 Exam Points and PYQs.',
      icon: <Landmark className="w-5 h-5 text-amber-700" />,
      iconWrap: 'bg-amber-50 border-amber-200',
      cta: 'Open Paper 1 Hub',
    },
  ];

  // Group 2: Exactly 6 Practice & Mastery Studios (symmetric 3x2 grid)
  const practiceStudios = [
    {
      tab: 'mcqs' as NavTab,
      meta: '2014–2024 Archive · Timed Mock',
      title: 'PYQs & Exam Simulator',
      desc: 'Year-wise past paper engine for NTA NET, MPSET, MPESB Grade 1 & 2, and Grammar with step-by-step rationales.',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-700" />,
      iconWrap: 'bg-emerald-50 border-emerald-200',
      cta: 'Launch Simulator',
    },
    {
      tab: 'vocab' as NavTab,
      meta: 'SRS Algorithm · UK Audio',
      title: 'Vocabulary Forge',
      desc: 'Spaced repetition flashcards featuring literary terminology, etymology roots, and contextual usage.',
      icon: <Layers className="w-5 h-5 text-sky-700" />,
      iconWrap: 'bg-sky-100 border-sky-200',
      cta: 'Review Flashcards',
    },
    {
      tab: 'syntax-games' as NavTab,
      meta: 'Interactive · POS Tagging',
      title: 'Idiom & Syntax Puzzles',
      desc: 'Clause restructuring challenges and contextual idiom builders with historical origin notes.',
      icon: <Puzzle className="w-5 h-5 text-emerald-700" />,
      iconWrap: 'bg-emerald-50 border-emerald-200',
      cta: 'Play Workshops',
    },
    {
      tab: 'writing-studio' as NavTab,
      meta: 'Flesch-Kincaid · Showcase',
      title: 'Writing Studio & Portfolio',
      desc: 'Editorial manuscript canvas with live readability indexing, passive voice checks, and peer review.',
      icon: <PenTool className="w-5 h-5 text-blue-700" />,
      iconWrap: 'bg-blue-100 border-blue-200',
      cta: 'Open Manuscript',
    },
    {
      tab: 'speech-lab' as NavTab,
      meta: 'Waveform · UK RP & US',
      title: 'Speech & Pronunciation Lab',
      desc: 'Acoustic waveform simulator and phonemic accuracy matrix comparing British RP and American stress.',
      icon: <Mic className="w-5 h-5 text-sky-700" />,
      iconWrap: 'bg-sky-100 border-sky-200',
      cta: 'Open Speech Lab',
    },
    {
      tab: 'progress' as NavTab,
      meta: 'CEFR Tree · Leaderboard',
      title: 'Progress & Skill Tree',
      desc: 'Track A1-to-JRF milestones, consecutive revision streaks, scholar XP, and unlockable badges.',
      icon: <Trophy className="w-5 h-5 text-amber-700" />,
      iconWrap: 'bg-amber-50 border-amber-200',
      cta: 'View Progress',
    },
  ];

  const examBlueprints = [
    {
      title: 'NTA NET Paper 1',
      meta: 'Units 1–10',
      desc: 'Teaching Aptitude, Research Ethics, Square of Opposition, Indian Logic, ICT, SDGs, and Higher Education.',
      tab: 'literature' as NavTab,
    },
    {
      title: 'NET & MPSET Paper 2',
      meta: 'Unified Literature',
      desc: 'Drama, Poetry, Fiction, Prose, ELT, Indian Writing, Cultural Studies, and Post-WWII Literary Theory.',
      tab: 'literature' as NavTab,
    },
    {
      title: 'MPESB Grade-1 & Paper 1',
      meta: 'Varg 1 Selection',
      desc: 'Class 9–12 NCERT texts, Figures of Speech, Poetic Forms, plus complete Part-A Common Paper syllabus.',
      tab: 'mpesb-paper1' as NavTab,
    },
    {
      title: 'MPESB Grade-2 & TET',
      meta: 'Varg 2 Pedagogy',
      desc: 'Applied Grammar, Lexical Affixes, and 15-Mark Language Development Pedagogy (Chomsky, Krashen, LSRW).',
      tab: 'literature' as NavTab,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Hero Split Frame */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50 to-blue-100/75 border border-sky-200 p-7 sm:p-10 shadow-lg shadow-sky-900/5">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Editorial Headline & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-sky-700">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>NTA UGC NET</span>
                <span className="text-sky-300" aria-hidden="true">·</span>
                <span>MPSET Literature</span>
                <span className="text-sky-300" aria-hidden="true">·</span>
                <span>MPESB Grade 1 & 2</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.12] [text-wrap:balance]">
                Master English, Literature &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-sky-800">
                  Competitive Excellence.
                </span>
              </h1>

              <p className="text-slate-700 text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
                An integrated academic workspace by <strong className="text-slate-900 font-semibold">Mr. ChainSingh Kushro</strong> combining AI grammar & essay mentoring, complete 10-unit syllabi, 100-point MPESB Paper 1 notes, and 10 years of authentic PYQs.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleNav('coach')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm shadow-md shadow-sky-600/20 transition-colors cursor-pointer"
                >
                  <Bot className="w-4 h-4" />
                  <span>Launch AI Crafty Coach</span>
                </button>
                <button
                  onClick={() => handleNav('mcqs')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-slate-800 font-semibold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>Solve Authentic PYQs</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-slate-600 font-medium">
                <button
                  onClick={() => handleNav('grammar')}
                  className="inline-flex items-center gap-1.5 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  <span>Grammar Curriculum</span>
                </button>
                <button
                  onClick={() => handleNav('mpesb-paper1')}
                  className="inline-flex items-center gap-1.5 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  <Landmark className="w-3.5 h-3.5 text-amber-600" />
                  <span>MPESB Paper 1 (100 Points)</span>
                </button>
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    onOpenPricing();
                  }}
                  className="inline-flex items-center gap-1.5 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pro Access Plans</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Scholar Readiness & Telemetry Snapshot */}
          <div className="lg:col-span-5 rounded-2xl bg-white/95 border border-sky-200 p-6 flex flex-col justify-between space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3.5">
              <div>
                <span className="text-[11px] font-medium text-slate-500 block">Active Track</span>
                <span className="font-editorial text-lg font-bold text-slate-900">{userStats.level}</span>
              </div>
              <button
                onClick={() => handleNav('progress')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
              >
                <span>Skill Tree</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span>Daily Streak</span>
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="text-xl font-bold font-mono tabular-nums text-slate-900">
                  {userStats.streakDays} Days
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80">
                <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                  <span>Scholar XP</span>
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-xl font-bold font-mono tabular-nums text-slate-900">
                  {userStats.xp} XP
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">Grammar Mastery</span>
                  <span className="font-mono tabular-nums text-sky-700 font-semibold">
                    {userStats.grammarMasteryPercent}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-sky-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                    style={{ width: `${userStats.grammarMasteryPercent}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-700 font-medium">Literature & Exam Readiness</span>
                  <span className="font-mono tabular-nums text-emerald-700 font-semibold">
                    {userStats.literatureMasteryPercent}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-sky-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ width: `${userStats.literatureMasteryPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-sky-100 text-xs text-slate-600 font-mono tabular-nums">
              <span>{userStats.solvedMCQs} PYQs Solved</span>
              <span aria-hidden="true">·</span>
              <span>{userStats.vocabWordsMastered} Words Mastered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 01: Core Examination Tracks & Curriculum (Symmetric 4-Column Row) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-slate-900 tracking-tight">
              01. Core Curriculum & Exam Prep
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              AI coaching, prescriptive grammar, and complete syllabus hubs aligned to official exam blueprints.
            </p>
          </div>
          <span className="text-xs text-sky-700 font-semibold font-mono tabular-nums">4 Core Modules</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {corePillars.map((card) => (
            <button
              key={card.tab}
              onClick={() => handleNav(card.tab)}
              className="text-left bg-white hover:bg-sky-50/70 rounded-2xl border border-sky-200 hover:border-sky-400 p-5 flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105 ${card.iconWrap}`}>
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-sky-700 truncate">
                    {card.meta}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-editorial text-lg font-bold text-slate-900 group-hover:text-sky-800 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-sky-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-900">
                <span>{card.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 02: Interactive Practice Studios & Analytics (Symmetric 3x2 Grid) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-slate-900 tracking-tight">
              02. Practice Studios & Skill Analytics
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Timed PYQ papers, spaced-repetition flashcards, syntax puzzles, manuscript review, and speech scoring.
            </p>
          </div>
          <span className="text-xs text-sky-700 font-semibold font-mono tabular-nums">6 Interactive Studios</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {practiceStudios.map((card) => (
            <button
              key={card.tab}
              onClick={() => handleNav(card.tab)}
              className="text-left bg-white hover:bg-sky-50/70 rounded-2xl border border-sky-200 hover:border-sky-400 p-5 flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-105 ${card.iconWrap}`}>
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-sky-700 truncate">
                    {card.meta}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-editorial text-lg font-bold text-slate-900 group-hover:text-sky-800 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-sky-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-900">
                <span>{card.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Section 03: Target Examination Blueprints */}
      <section className="rounded-2xl bg-white border border-sky-200 p-6 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-sky-600" />
              <span>Target Examination Syllabi Covered</span>
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Official syllabus breakdowns, 100-point high-yield digests, and previous year trends.
            </p>
          </div>
          <button
            onClick={() => handleNav('literature')}
            className="text-xs text-sky-700 font-semibold hover:text-sky-900 inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Open Syllabus Portal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {examBlueprints.map((exam) => (
            <button
              key={exam.title}
              onClick={() => handleNav(exam.tab)}
              className="text-left p-4 rounded-xl bg-sky-50/75 border border-sky-200 hover:border-sky-400 hover:bg-sky-100/60 space-y-2 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-editorial text-sm font-bold text-slate-900">
                  {exam.title}
                </span>
                <span className="text-[11px] text-sky-700 font-semibold shrink-0">
                  {exam.meta}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {exam.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Section 04: Educator & Founder Profile Bar */}
      <section className="rounded-2xl bg-gradient-to-r from-sky-50 via-white to-blue-50 border border-sky-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0">
              <UserCheck className="w-6 h-6 text-sky-700" />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-sky-700">
                Founder & Lead Educator
              </div>
              <h3 className="font-editorial text-xl font-bold text-slate-900">
                Mr. ChainSingh Kushro
              </h3>
              <p className="text-xs text-slate-600 max-w-2xl">
                Educator & Curriculum Architect for English Literature, Applied Linguistics, NTA UGC NET (Paper 1 & Paper 2), MPSET, and MPESB Grade 1 & Grade 2 Selection Tests.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <a
              href="mailto:chaink2000@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 hover:border-sky-400 text-xs font-semibold text-slate-800 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4 text-sky-600 shrink-0" />
              <span>chaink2000@gmail.com</span>
            </a>
            <button
              onClick={() => handleNav('literature')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
            >
              <span>Browse Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
