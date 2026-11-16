import React, { useMemo, useState } from 'react';
import {
  Trophy,
  Flame,
  Zap,
  CheckCircle2,
  Bookmark,
  Award,
  Printer,
  LogIn,
  LogOut,
  BookOpen,
  ShieldCheck,
  BarChart3,
} from 'lucide-react';
import { AppLanguage, CertificateRecord, NavTab, UserStats } from '../types';
import { useAuth } from '../context/AuthContext';
import { issueCertificateInFirestore, toggleBookmarkInFirestore } from '../utils/firestoreDataService';
import { CraftyLogo } from './CraftyLogo';

interface ProgressDashboardProps {
  userStats: UserStats;
  language?: AppLanguage;
  onNavigateTab?: (tab: NavTab) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  userStats,
  language = 'en',
  onNavigateTab,
}) => {
  const {
    firebaseUser,
    userProfile,
    isSigningIn,
    authError,
    progressRecords,
    quizAttempts,
    bookmarks,
    certificates,
    signInWithGoogle,
    logout,
  } = useAuth();

  const isHi = language === 'hi';
  const [issuingCert, setIssuingCert] = useState<string | null>(null);
  const [activePrintCert, setActivePrintCert] = useState<CertificateRecord | null>(null);

  const liveXP = userProfile?.xp ?? userStats.xp;
  const liveStreak = userProfile?.streakDays ?? userStats.streakDays;
  const completedModules = progressRecords.filter((p) => p.status === 'completed');
  const inProgressModules = progressRecords.filter((p) => p.status === 'in_progress');
  const completedCount = completedModules.length;
  const hasPerfectQuiz = quizAttempts.some((a) => a.percentage === 100);

  // All 7 Required Achievement Badges computed dynamically from real progress + attempts
  const badges = useMemo(
    () => [
      {
        id: 'first-lesson',
        title: 'First Lesson Completed',
        desc: 'Complete your first grammar module in the 37-module curriculum.',
        unlocked: completedCount >= 1 || liveXP > 100,
      },
      {
        id: 'first-quiz',
        title: 'First Quiz Completed',
        desc: 'Submit your first scored quiz attempt.',
        unlocked: quizAttempts.length >= 1,
      },
      {
        id: 'grammar-beginner',
        title: 'Grammar Beginner',
        desc: 'Complete 4+ Level 1–2 Foundation & Elementary modules.',
        unlocked: completedCount >= 4,
      },
      {
        id: 'grammar-intermediate',
        title: 'Grammar Intermediate',
        desc: 'Complete 10+ Grammar Modules across Levels 1–3.',
        unlocked: completedCount >= 10,
      },
      {
        id: 'grammar-advanced',
        title: 'Grammar Advanced',
        desc: 'Complete 20+ Modules reaching Clauses, Inversion & Punctuation.',
        unlocked: completedCount >= 20,
      },
      {
        id: 'master-grammar',
        title: 'Master Grammar',
        desc: 'Complete 30+ Modules across Linguistics & Competitive Grammar.',
        unlocked: completedCount >= 30,
      },
      {
        id: 'perfect-quiz',
        title: 'Perfect Quiz Score',
        desc: 'Score 100% accuracy in any interactive assessment.',
        unlocked: hasPerfectQuiz,
      },
    ],
    [completedCount, liveXP, quizAttempts.length, hasPerfectQuiz]
  );

  const certTracks = [
    {
      title: 'Certificate in Foundation & Functional English Grammar',
      eligible: completedCount >= 3 || quizAttempts.length >= 1 || !firebaseUser,
    },
    {
      title: 'Advanced Diploma in Applied Linguistics & Competitive English',
      eligible: completedCount >= 10 || quizAttempts.length >= 3,
    },
    {
      title: 'NTA UGC NET & MPESB Literature & Grammar Scholar Distinction',
      eligible: completedCount >= 18 || hasPerfectQuiz,
    },
  ];

  const handleIssueCertificate = async (courseTitle: string) => {
    if (!firebaseUser) {
      await signInWithGoogle();
      return;
    }
    setIssuingCert(courseTitle);
    try {
      const cert = await issueCertificateInFirestore(
        firebaseUser.uid,
        userProfile?.displayName || firebaseUser.displayName || 'Crafty Scholar',
        courseTitle
      );
      setActivePrintCert(cert);
    } finally {
      setIssuingCert(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Google Sign-In Status Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f2544] to-blue-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              {isHi ? 'मेरी प्रगति · विद्यार्थी डैशबोर्ड एवं प्रमाणपत्र' : 'My Learning · Cloud Progress, Badges & Certificates'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {firebaseUser
                ? `${userProfile?.displayName || firebaseUser.displayName || 'Scholar'}’s Learning Hub`
                : 'Crafty English Scholar Dashboard'}
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl">
              {firebaseUser
                ? `Synced via Google Account (${firebaseUser.email}) · Level: ${userProfile?.learningLevel || userStats.level}`
                : 'Sign in with Google to sync module completions, quiz history, bookmarks, badges, and verifiable certificates across devices.'}
            </p>
            {authError && (
              <div className="text-xs text-rose-200 bg-rose-950/60 border border-rose-700 px-3 py-1.5 rounded-lg inline-block">
                {authError}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] text-blue-200">Total XP</div>
              <div className="text-xl font-extrabold text-amber-300 flex items-center gap-1 justify-center">
                <Zap className="w-4 h-4 fill-current" />
                {liveXP}
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] text-blue-200">Streak</div>
              <div className="text-xl font-extrabold text-orange-300 flex items-center gap-1 justify-center">
                <Flame className="w-4 h-4 fill-current" />
                {liveStreak}d
              </div>
            </div>
            <div className="px-4 py-3 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="text-[11px] text-blue-200">Modules Done</div>
              <div className="text-xl font-extrabold text-emerald-300">{completedCount}/37</div>
            </div>

            {firebaseUser ? (
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={signInWithGoogle}
                disabled={isSigningIn}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-extrabold cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{isSigningIn ? 'Signing In...' : 'Sign In with Google'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Course Progress & Quiz Accuracy Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-700 dark:text-amber-400" />
              <span>37-Module Grammar Curriculum Progress</span>
            </h2>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('grammar')}
                className="text-xs font-bold text-blue-700 dark:text-amber-400 hover:underline cursor-pointer"
              >
                Continue Learning →
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Completed Modules</span>
              <span>{Math.round((completedCount / 37) * 100)}% ({completedCount} / 37)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-blue-100 dark:bg-blue-950 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-amber-500 transition-all"
                style={{ width: `${Math.max(4, Math.round((completedCount / 37) * 100))}%` }}
              />
            </div>
          </div>

          {completedModules.length === 0 && inProgressModules.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Open any lesson in English Grammar and click "Mark Complete (+50 XP)" to record completed modules here.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pt-1">
              {completedModules.map((rec) => (
                <div
                  key={rec.id}
                  className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-900 dark:text-white truncate">{rec.moduleTitle}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quiz Score Chart & Recent Attempts */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-700 dark:text-amber-400" />
            <span>Recent Quiz Scores ({quizAttempts.length})</span>
          </h2>
          {quizAttempts.length === 0 ? (
            <div className="p-6 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-900 text-xs text-slate-500 dark:text-slate-400 text-center">
              Complete any quiz inside Practice Zone or Grammar Exercises to visualise live accuracy analytics here.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {quizAttempts.slice(0, 6).map((att) => (
                <div
                  key={att.id}
                  className="p-3 rounded-xl bg-blue-50/60 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-900 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 dark:text-white truncate">{att.quizTitle}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {att.category} · {att.mode}
                    </div>
                  </div>
                  <span className="font-extrabold text-blue-700 dark:text-amber-400 shrink-0">
                    {att.score}/{att.totalQuestions} ({att.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 7 Achievement Badges */}
      <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
        <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>7 Academic Achievement Badges</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border transition-all space-y-1.5 ${
                b.unlocked
                  ? 'bg-gradient-to-br from-blue-50 to-amber-50/60 dark:from-[#0a192f] dark:to-amber-950/30 border-amber-300 dark:border-amber-700'
                  : 'bg-slate-50 dark:bg-[#0a192f]/60 border-blue-100 dark:border-blue-900 opacity-65'
              }`}
            >
              <div className="flex items-center justify-between">
                <Award
                  className={`w-5 h-5 ${
                    b.unlocked ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'
                  }`}
                />
                <span className="text-[11px] font-bold">
                  {b.unlocked ? 'Unlocked ✓' : 'Locked'}
                </span>
              </div>
              <div className="font-bold text-sm text-[#0a192f] dark:text-white">{b.title}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certificates + Saved Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Verifiable Crafty English Certificates</span>
          </h2>
          <div className="space-y-3">
            {certTracks.map((ct) => {
              const issued = certificates.find((c) => c.courseTitle === ct.title);
              return (
                <div
                  key={ct.title}
                  className="p-4 rounded-xl bg-blue-50/60 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="font-bold text-sm text-[#0a192f] dark:text-white">{ct.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {issued
                        ? `Verification ID: ${issued.certificateCode}`
                        : ct.eligible
                        ? 'Eligible to issue verified certificate'
                        : 'Complete more modules & quizzes to unlock'}
                    </div>
                  </div>
                  {issued ? (
                    <button
                      onClick={() => setActivePrintCert(issued)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>View &amp; Print</span>
                    </button>
                  ) : (
                    <button
                      disabled={!ct.eligible || issuingCert === ct.title}
                      onClick={() => handleIssueCertificate(ct.title)}
                      className="px-3.5 py-2 rounded-xl bg-[#0a192f] dark:bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold disabled:opacity-45 shrink-0 cursor-pointer"
                    >
                      {issuingCert === ct.title
                        ? 'Issuing...'
                        : firebaseUser
                        ? 'Generate Certificate'
                        : 'Sign in to Claim'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cloud Bookmarks */}
        <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500" />
            <span>Saved Bookmarks ({bookmarks.length})</span>
          </h2>
          {bookmarks.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Bookmark difficult questions in Practice Zone or lessons in Grammar Curriculum for rapid last-minute revision.
            </p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-3 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-900 flex items-center justify-between gap-2 text-xs"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 dark:text-white truncate">{bm.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {bm.itemType} · {bm.category}
                    </div>
                  </div>
                  {firebaseUser && (
                    <button
                      onClick={() =>
                        toggleBookmarkInFirestore(
                          firebaseUser.uid,
                          {
                            itemId: bm.itemId,
                            itemType: bm.itemType,
                            title: bm.title,
                            category: bm.category,
                          },
                          true
                        )
                      }
                      className="text-rose-600 dark:text-rose-400 font-semibold shrink-0 cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Printable Certificate Preview */}
      {activePrintCert && (
        <div className="rounded-3xl bg-white text-[#0a192f] border-8 border-double border-amber-500 p-8 sm:p-12 shadow-2xl space-y-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <CraftyLogo className="w-12 h-12" />
            <div className="text-left">
              <div className="text-xl font-extrabold tracking-tight">CRAFTY ENGLISH ACADEMY</div>
              <div className="text-xs text-blue-700 font-semibold">
                Learn Smart. Speak Confidently. Master English.
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs uppercase tracking-[0.25em] text-amber-700 font-bold">
              Certificate of Academic Achievement
            </div>
            <p className="text-sm text-slate-600">This certifies that</p>
            <h3 className="text-3xl font-extrabold text-[#0a192f] font-serif">
              {activePrintCert.studentName}
            </h3>
            <p className="text-sm text-slate-700 max-w-xl mx-auto">
              has successfully completed rigorous bilingual instruction and verified assessments for
            </p>
            <div className="text-lg font-bold text-blue-800">{activePrintCert.courseTitle}</div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div>
              <strong>Verification Code:</strong> {activePrintCert.certificateCode}
            </div>
            <div>
              <strong>Director &amp; Lead Educator:</strong> Mr. ChainSingh Kushro (chaink2000@gmail.com)
            </div>
          </div>

          <div className="flex justify-center gap-3 print:hidden">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0a192f] text-white text-xs font-bold cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setActivePrintCert(null)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
