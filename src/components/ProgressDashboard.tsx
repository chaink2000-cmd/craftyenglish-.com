import React from 'react';
import { 
  Trophy, 
  Flame, 
  Zap, 
  CheckCircle, 
  Lock, 
  Users, 
  Target, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { UserStats } from '../types';

interface ProgressDashboardProps {
  userStats: UserStats;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userStats }) => {
  const cefrLevels = [
    { code: 'A1', title: 'Breakthrough', desc: 'Basic grammatical nouns, pronouns & present simple', completed: true },
    { code: 'A2', title: 'Waystage', desc: 'Routine past narration & simple descriptions', completed: true },
    { code: 'B1', title: 'Threshold', desc: 'Compound sentences, modals & active/passive basics', completed: true },
    { code: 'B2', title: 'Vantage', desc: 'Complex clauses, conditionals & formal correspondence', completed: true },
    { code: 'C1', title: 'Effective Operational', desc: 'Subjunctive mood, adverbial inversion & rhetorical tropes', completed: true },
    { code: 'C2', title: 'Mastery', desc: 'Nuanced literary prose, polysemy & historical etymology', completed: false },
    { code: 'JRF', title: 'NET / SET Scholar', desc: 'Advanced literary theory, post-structuralism & ELT pedagogy', completed: false },
  ];

  const badges = [
    { id: 'b1', name: 'Grammar Guru', desc: 'Solved 10+ Subject-Verb & Tense quizzes', icon: '📜', unlocked: true },
    { id: 'b2', name: 'Shakespearean Quill', desc: 'Studied First Folio & Soliloquies', icon: '🪶', unlocked: true },
    { id: 'b3', name: 'Syntax Alchemist', desc: 'Restructured 5 complex clause puzzles', icon: '🧩', unlocked: true },
    { id: 'b4', name: 'NET JRF Aspirant', desc: 'Attempted 15+ authentic past year papers', icon: '🎓', unlocked: true },
    { id: 'b5', name: 'SRS Polyglot', desc: 'Mastered 20+ words in Spaced Repetition', icon: '⚡', unlocked: false },
    { id: 'b6', name: 'Speech Virtuoso', desc: 'Scored 90%+ in British / American lab', icon: '🎙️', unlocked: false },
  ];

  const leaderboard = [
    { rank: 1, name: 'Ananya Deshmukh', score: '3,840 XP', streak: '24d', badge: 'NET JRF Rank 12' },
    { rank: 2, name: 'You (Scholar)', score: `${userStats.xp} XP`, streak: `${userStats.streakDays}d`, badge: 'Rising Star' },
    { rank: 3, name: 'Vikramaditya Verma', score: '2,190 XP', streak: '18d', badge: 'MPSET English Top 5' },
    { rank: 4, name: 'Swati Raghavan', score: '1,980 XP', streak: '12d', badge: 'ELT Pedagogue' },
    { rank: 5, name: 'Rohit Khandelwal', score: '1,840 XP', streak: '9d', badge: 'Grammar Alchemist' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100/70 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Scholar Progression · Analytics</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Progress, Quests & CEFR Skill Tree
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans">
              Track your journey from A1 foundations to C2 and NTA NET JRF mastery with daily streak continuity and achievement unlocks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-4 rounded-2xl bg-white border border-sky-200 text-center min-w-[100px] shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Total Level</span>
              <span className="text-2xl font-black text-sky-700">{userStats.level}</span>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-sky-200 text-center min-w-[100px] shadow-sm">
              <span className="text-xs text-slate-500 font-semibold block">Daily Streak</span>
              <span className="text-2xl font-black text-amber-600 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5 text-amber-500 fill-current" />
                <span>{userStats.streakDays}d</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Streak Calendar */}
      <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Weekly Study Activity & Habit Chain</span>
          </span>
          <span className="text-xs text-emerald-700 font-semibold font-mono">
            {userStats.streakDays} Days Consecutive Revision
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div
              key={day}
              className={`p-3 rounded-xl border text-center space-y-1 ${
                idx < 6
                  ? 'bg-sky-50 border-sky-200 text-sky-800'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-slate-500 block">{day}</span>
              <span className="text-xs font-mono">
                {idx < 6 ? '✓ 45m' : '★ Today'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CEFR Skill Tree Map */}
      <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-sky-600" />
            <span>CEFR & NET Examination Skill Tree</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">7 Mastery Checkpoints</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cefrLevels.map((lvl) => (
            <div
              key={lvl.code}
              className={`p-5 rounded-2xl border transition-all ${
                lvl.completed
                  ? 'bg-sky-50/75 border-emerald-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full font-mono ${
                    lvl.completed
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {lvl.code}
                </span>
                {lvl.completed ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <h3 className="font-editorial text-base font-bold text-slate-900">{lvl.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{lvl.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Badges and Leaderboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Unlockable Badges */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-sky-200 p-6 space-y-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Unlockable Scholar Badges ({badges.filter((b) => b.unlocked).length}/{badges.length})</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                  b.unlocked
                    ? 'bg-sky-50/80 border-sky-200 shadow-sm'
                    : 'bg-slate-50 border-slate-200 opacity-60 grayscale'
                }`}
              >
                <div className="text-3xl">{b.icon}</div>
                <h4 className="font-bold text-xs text-slate-900 leading-tight">{b.name}</h4>
                <p className="text-[10px] text-slate-600 leading-tight">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Leaderboard */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-sky-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-sky-600" />
              <span>Weekly All-India Scholar Leaderboard</span>
            </h3>
            <span className="text-[11px] text-emerald-700 font-semibold font-mono">Live Sync</span>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  user.name.includes('You')
                    ? 'bg-sky-50 border-sky-400 shadow-sm'
                    : 'bg-white border-sky-100 hover:bg-sky-50/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold font-mono text-xs ${
                      user.rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : user.rank === 2
                        ? 'bg-sky-600 text-white'
                        : user.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-sky-100 text-sky-700'
                    }`}
                  >
                    {user.rank}
                  </span>
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">{user.name}</span>
                    <span className="text-[10px] text-slate-500">{user.badge}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-emerald-700 block">
                    {user.score}
                  </span>
                  <span className="text-[10px] text-amber-600 flex items-center gap-1 justify-end font-semibold">
                    <Flame className="w-3 h-3" />
                    <span>{user.streak}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
