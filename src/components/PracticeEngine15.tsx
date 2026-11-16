import React, { useEffect, useMemo, useState } from 'react';
import { AppLanguage, InteractiveQuestionFormat, PracticeQuestion15 } from '../types';
import { GRAMMAR_CURRICULUM_37, PRACTICE_QUESTION_BANK_15, QUESTION_FORMAT_LABELS } from '../data/grammar37';
import { useAuth } from '../context/AuthContext';
import {
  recordQuizAttemptInFirestore,
  toggleBookmarkInFirestore,
  updateUserStatsInFirestore,
} from '../utils/firestoreDataService';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  Filter,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Award,
} from 'lucide-react';
import { audioFeedback } from '../utils/audioFeedback';

interface PracticeEngine15Props {
  language: AppLanguage;
  onAddXP: (amount: number) => void;
  initialQuestions?: PracticeQuestion15[];
  initialModuleFilter?: number;
  initialExamCategory?: string;
  initialMode?: 'practice' | 'timed';
  compactTitle?: string;
}

export const PracticeEngine15: React.FC<PracticeEngine15Props> = ({
  language,
  onAddXP,
  initialQuestions,
  initialModuleFilter,
  initialExamCategory,
  initialMode = 'practice',
  compactTitle,
}) => {
  const { firebaseUser, userProfile, bookmarks, refreshProfile } = useAuth();
  const isHi = language === 'hi';

  const sourcePool = initialQuestions && initialQuestions.length > 0 ? initialQuestions : PRACTICE_QUESTION_BANK_15;

  const [selectedModule, setSelectedModule] = useState<number | 'all'>(initialModuleFilter ?? 'all');
  const [selectedFormat, setSelectedFormat] = useState<InteractiveQuestionFormat | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<'all' | 'Verified PYQ' | 'Original Practice'>('all');
  const [selectedExam, setSelectedExam] = useState<string>(initialExamCategory || 'all');
  const [mode, setMode] = useState<'untimed' | 'timed'>(initialMode === 'timed' ? 'timed' : 'untimed');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState<Record<string, boolean>>({});
  const [arrangeDrafts, setArrangeDrafts] = useState<Record<string, string[]>>({});
  const [matchDrafts, setMatchDrafts] = useState<Record<string, Record<string, string>>>({});
  const [dragDrafts, setDragDrafts] = useState<Record<string, Record<string, string>>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [retryIncorrectOnly, setRetryIncorrectOnly] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(600);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialModuleFilter !== undefined) setSelectedModule(initialModuleFilter);
    if (initialExamCategory) setSelectedExam(initialExamCategory);
  }, [initialModuleFilter, initialExamCategory]);

  const examCategories = useMemo(
    () => Array.from(new Set(sourcePool.map((q) => q.examCategory))).sort(),
    [sourcePool]
  );

  const baseFiltered = useMemo(() => {
    return sourcePool.filter((q) => {
      if (selectedModule !== 'all' && q.moduleNumber !== selectedModule) return false;
      if (selectedFormat !== 'all' && q.format !== selectedFormat) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedSource !== 'all' && q.sourceType !== selectedSource) return false;
      if (selectedExam !== 'all' && q.examCategory !== selectedExam) return false;
      return true;
    });
  }, [sourcePool, selectedModule, selectedFormat, selectedDifficulty, selectedSource, selectedExam]);

  const activeDeck = useMemo(() => {
    const base = baseFiltered.slice(0, 25);
    if (retryIncorrectOnly) {
      return base.filter((q) => {
        const userAns = answers[q.id];
        return userAns !== undefined && userAns !== q.correctAnswer;
      });
    }
    return base;
  }, [baseFiltered, retryIncorrectOnly, answers]);

  const currentQ = activeDeck[currentIdx] || activeDeck[0];

  // Timer tick when Timed mode is active and quiz not finished
  useEffect(() => {
    if (mode !== 'timed' || quizSubmitted || activeDeck.length === 0) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(timer);
          setQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [mode, quizSubmitted, activeDeck.length]);

  const resetSession = (newMode?: 'untimed' | 'timed') => {
    setAnswers({});
    setValidated({});
    setArrangeDrafts({});
    setMatchDrafts({});
    setDragDrafts({});
    setQuizSubmitted(false);
    setRetryIncorrectOnly(false);
    setCurrentIdx(0);
    setSecondsLeft(Math.max(120, Math.min(1800, activeDeck.length * 45)));
    setSaveMessage(null);
    if (newMode) setMode(newMode);
  };

  const evaluateAnswer = (q: PracticeQuestion15, userAnswer?: string): boolean => {
    if (!userAnswer) return false;
    if (q.format === 'match-following' || q.format === 'drag-drop') {
      try {
        const expected = JSON.parse(q.correctAnswer) as Record<string, string>;
        const given = JSON.parse(userAnswer) as Record<string, string>;
        return Object.keys(expected).every((k) => given[k] === expected[k]);
      } catch {
        return userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
      }
    }
    return userAnswer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
  };

  const handleSelectOption = (q: PracticeQuestion15, val: string) => {
    if (quizSubmitted) return;
    if (mode === 'untimed' && validated[q.id]) return;
    setAnswers((prev) => ({ ...prev, [q.id]: val }));
  };

  const handleValidateSingle = (q: PracticeQuestion15) => {
    if (!answers[q.id]) return;
    const isRight = evaluateAnswer(q, answers[q.id]);
    if (isRight) {
      audioFeedback.playSuccess();
      onAddXP(15);
    } else {
      audioFeedback.playError();
    }
    setValidated((prev) => ({ ...prev, [q.id]: true }));
  };

  const scoreCount = useMemo(() => {
    return activeDeck.filter((q) => evaluateAnswer(q, answers[q.id])).length;
  }, [activeDeck, answers]);

  const handleFinishQuiz = async () => {
    setQuizSubmitted(true);
    const allValidated: Record<string, boolean> = {};
    activeDeck.forEach((q) => {
      allValidated[q.id] = true;
    });
    setValidated(allValidated);

    const earnedXp = scoreCount * 20;
    onAddXP(earnedXp);

    if (firebaseUser) {
      try {
        await recordQuizAttemptInFirestore(firebaseUser.uid, {
          quizId: `practice-${selectedModule}-${selectedFormat}-${Date.now()}`,
          quizTitle: compactTitle || (selectedModule === 'all' ? '15-Format Mixed Practice Quiz' : `Module ${selectedModule} Quiz`),
          category: selectedExam === 'all' ? 'Grammar & Practice' : selectedExam,
          score: scoreCount,
          totalQuestions: activeDeck.length,
          mode,
        });
        await updateUserStatsInFirestore(firebaseUser.uid, {
          xp: (userProfile?.xp || 0) + earnedXp,
        });
        await refreshProfile();
        setSaveMessage(
          isHi
            ? 'आपका परिणाम क्लाउड प्रोफ़ाइल (Firestore) में सुरक्षित हो गया है।'
            : 'Attempt and XP synced to your Crafty English cloud profile.'
        );
      } catch {
        setSaveMessage(
          isHi ? 'स्कोर स्थानीय रूप से दर्ज हुआ।' : 'Score recorded locally.'
        );
      }
    }
  };

  const isBookmarked = (qId: string) => bookmarks.some((b) => b.itemId === qId);

  const handleToggleBookmark = async (q: PracticeQuestion15) => {
    if (!firebaseUser) {
      setSaveMessage(
        isHi
          ? 'प्रश्नों को बुकमार्क करने के लिए कृपया My Learning टैब में Google से साइन इन करें।'
          : 'Sign in with Google inside My Learning to save cloud bookmarks.'
      );
      return;
    }
    await toggleBookmarkInFirestore(
      firebaseUser.uid,
      {
        itemId: q.id,
        itemType: 'question',
        title: q.prompt.slice(0, 160),
        category: q.examCategory,
      },
      isBookmarked(q.id)
    );
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const answeredCount = activeDeck.filter((q) => Boolean(answers[q.id])).length;
  const progressPercent = activeDeck.length > 0 ? Math.round((answeredCount / activeDeck.length) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Control & Filter Header */}
      <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0a192f] dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>
                {compactTitle ||
                  (isHi ? '15-प्रारूप इंटरैक्टिव अभ्यास इंजन' : '15-Format Interactive Practice Engine')}
              </span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {isHi
                ? 'उत्तर सबमिट करने से पहले नहीं दिखाए जाते · अंग्रेजी व हिन्दी व्याख्या · समयबद्ध व अभ्यास मोड'
                : 'Answers remain hidden until submitted · Bilingual EN/हिंदी explanations · Untimed & Timed exam modes'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => resetSession('untimed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                mode === 'untimed'
                  ? 'bg-[#0a192f] dark:bg-blue-600 text-white'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800'
              }`}
            >
              {isHi ? 'अभ्यास मोड (Untimed)' : 'Learning Mode (Untimed)'}
            </button>
            <button
              onClick={() => resetSession('timed')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                mode === 'timed'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{isHi ? 'समयबद्ध परीक्षा' : 'Timed Exam'}</span>
            </button>
            {mode === 'timed' && (
              <span className="px-3 py-1.5 rounded-lg bg-[#0a192f] text-amber-300 font-mono text-xs font-bold">
                {formatTimer(secondsLeft)}
              </span>
            )}
          </div>
        </div>

        {/* Multi-Filters (hidden if custom single-module compact deck has <= 12 items) */}
        {!initialQuestions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2 border-t border-blue-100 dark:border-blue-900/60">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> {isHi ? 'मॉड्यूल (1–37)' : 'Grammar Module'}
              </label>
              <select
                value={selectedModule}
                onChange={(e) => {
                  const v = e.target.value;
                  setSelectedModule(v === 'all' ? 'all' : Number(v));
                  setCurrentIdx(0);
                  setQuizSubmitted(false);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-blue-50/60 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white"
              >
                <option value="all">All 37 Modules ({PRACTICE_QUESTION_BANK_15.length} Qs)</option>
                {GRAMMAR_CURRICULUM_37.map((m) => (
                  <option key={m.moduleNumber} value={m.moduleNumber}>
                    M{m.moduleNumber}: {m.titleEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isHi ? 'प्रश्न प्रारूप (1–15)' : 'Question Format (15 Types)'}
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => {
                  setSelectedFormat(e.target.value as InteractiveQuestionFormat | 'all');
                  setCurrentIdx(0);
                  setQuizSubmitted(false);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-blue-50/60 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white"
              >
                <option value="all">All 15 Question Formats</option>
                {(Object.keys(QUESTION_FORMAT_LABELS) as InteractiveQuestionFormat[]).map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {isHi ? QUESTION_FORMAT_LABELS[fmt].hi : QUESTION_FORMAT_LABELS[fmt].en}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isHi ? 'कठिनाई स्तर' : 'Difficulty'}
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => {
                  setSelectedDifficulty(e.target.value);
                  setCurrentIdx(0);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-blue-50/60 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Easy">Easy</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isHi ? 'स्रोत प्रकार' : 'Question Source'}
              </label>
              <select
                value={selectedSource}
                onChange={(e) => {
                  setSelectedSource(e.target.value as 'all' | 'Verified PYQ' | 'Original Practice');
                  setCurrentIdx(0);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-blue-50/60 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white"
              >
                <option value="all">All Sources (PYQ + Original)</option>
                <option value="Verified PYQ">Verified Exam PYQs Only</option>
                <option value="Original Practice">Original Concept Practice</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">
                {isHi ? 'परीक्षा श्रेणी' : 'Exam Track'}
              </label>
              <select
                value={selectedExam}
                onChange={(e) => {
                  setSelectedExam(e.target.value);
                  setCurrentIdx(0);
                }}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-blue-50/60 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white"
              >
                <option value="all">All Exam Categories</option>
                {examCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span>
              {isHi
                ? `हल किए गए: ${answeredCount} / ${activeDeck.length}`
                : `Attempted: ${answeredCount} / ${activeDeck.length} questions`}
            </span>
            <span className="font-semibold text-blue-700 dark:text-amber-400">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-blue-100 dark:bg-blue-950 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-amber-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Empty Filter State */}
      {activeDeck.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-10 text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-blue-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {retryIncorrectOnly
              ? isHi
                ? 'कोई गलत उत्तर शेष नहीं है! शानदार!'
                : 'Zero incorrect answers remaining to retry!'
              : isHi
              ? 'इस फ़िल्टर संयोजन में कोई प्रश्न नहीं मिला।'
              : 'No questions matched this exact filter combination.'}
          </h3>
          <button
            onClick={() => {
              setSelectedModule('all');
              setSelectedFormat('all');
              setSelectedDifficulty('all');
              setSelectedSource('all');
              setSelectedExam('all');
              setRetryIncorrectOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold cursor-pointer"
          >
            {isHi ? 'सभी फ़िल्टर रीसेट करें' : 'Reset Filters'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Active Question Card */}
          <div className="lg:col-span-8 space-y-4">
            {currentQ && (
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 sm:p-6 shadow-sm space-y-5">
                {/* Question Metadata Strip (uses dot separators, clean typography) */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-blue-100 dark:border-blue-900/60">
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-1.5">
                    <span className="font-bold text-blue-700 dark:text-amber-400">
                      Q{currentIdx + 1}/{activeDeck.length}
                    </span>
                    <span>·</span>
                    <span>{isHi ? QUESTION_FORMAT_LABELS[currentQ.format].hi : QUESTION_FORMAT_LABELS[currentQ.format].en}</span>
                    <span>·</span>
                    <span>{currentQ.difficulty}</span>
                    <span>·</span>
                    <span
                      className={
                        currentQ.sourceType === 'Verified PYQ'
                          ? 'text-emerald-700 dark:text-emerald-400 font-semibold'
                          : 'text-blue-700 dark:text-blue-300 font-semibold'
                      }
                    >
                      {currentQ.examReference || currentQ.sourceType}
                    </span>
                  </div>

                  <button
                    onClick={() => handleToggleBookmark(currentQ)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      isBookmarked(currentQ.id)
                        ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                        : 'bg-blue-50/50 dark:bg-[#0a192f] border-blue-200 dark:border-blue-800 text-slate-600 dark:text-slate-300 hover:text-blue-700'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isBookmarked(currentQ.id) ? (isHi ? 'सहेजा गया' : 'Saved') : (isHi ? 'सहेजें' : 'Bookmark')}</span>
                  </button>
                </div>

                {/* Paragraph Passage if Paragraph-Grammar */}
                {currentQ.passage && (
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-amber-400 mb-1">
                      {isHi ? 'संदर्भ अनुच्छेद (Paragraph Context)' : 'Reference Paragraph'}
                    </div>
                    {currentQ.passage}
                  </div>
                )}

                {/* Question Prompt */}
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {isHi && currentQ.promptHi ? currentQ.promptHi : currentQ.prompt}
                  </h3>
                  {isHi && currentQ.promptHi && currentQ.promptHi !== currentQ.prompt && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{currentQ.prompt}</p>
                  )}
                </div>

                {/* Specialized Format Rendering */}
                {currentQ.format === 'arrange-words' && currentQ.dragItems ? (
                  <div className="space-y-3">
                    <div className="min-h-[52px] p-3 rounded-xl bg-blue-50/70 dark:bg-[#0a192f] border border-dashed border-blue-300 dark:border-blue-700 flex flex-wrap items-center gap-2">
                      {(arrangeDrafts[currentQ.id] || []).length === 0 ? (
                        <span className="text-xs text-slate-400">
                          {isHi ? 'नीचे दिए गए शब्दों पर क्रम से क्लिक करें...' : 'Click word chips below in grammatical order...'}
                        </span>
                      ) : (
                        (arrangeDrafts[currentQ.id] || []).map((word, idx) => (
                          <button
                            key={`${word}-${idx}`}
                            onClick={() => {
                              if (validated[currentQ.id] || quizSubmitted) return;
                              const next = [...(arrangeDrafts[currentQ.id] || [])];
                              next.splice(idx, 1);
                              setArrangeDrafts((p) => ({ ...p, [currentQ.id]: next }));
                              handleSelectOption(currentQ, next.join(' '));
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#0a192f] dark:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                          >
                            {word}
                          </button>
                        ))
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentQ.dragItems.map((word, idx) => {
                        const usedCount = (arrangeDrafts[currentQ.id] || []).filter((w) => w === word).length;
                        const totalCount = currentQ.dragItems!.filter((w) => w === word).length;
                        const disabled = usedCount >= totalCount || validated[currentQ.id] || quizSubmitted;
                        return (
                          <button
                            key={`${word}-src-${idx}`}
                            disabled={disabled}
                            onClick={() => {
                              const next = [...(arrangeDrafts[currentQ.id] || []), word];
                              setArrangeDrafts((p) => ({ ...p, [currentQ.id]: next }));
                              handleSelectOption(currentQ, next.join(' '));
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                              disabled
                                ? 'opacity-40 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                                : 'bg-white dark:bg-[#0a192f] border-blue-300 dark:border-blue-700 text-slate-800 dark:text-slate-100 hover:bg-blue-50 cursor-pointer'
                            }`}
                          >
                            {word}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : currentQ.format === 'match-following' && currentQ.matchPairs ? (
                  <div className="space-y-2.5">
                    {currentQ.matchPairs.map((pair) => {
                      const chosenMap = matchDrafts[currentQ.id] || {};
                      return (
                        <div
                          key={pair.left}
                          className="p-3 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <span className="text-sm font-semibold text-slate-900 dark:text-white">{pair.left}</span>
                          <select
                            disabled={Boolean(validated[currentQ.id] || quizSubmitted)}
                            value={chosenMap[pair.left] || ''}
                            onChange={(e) => {
                              const nextMap = { ...chosenMap, [pair.left]: e.target.value };
                              setMatchDrafts((p) => ({ ...p, [currentQ.id]: nextMap }));
                              handleSelectOption(currentQ, JSON.stringify(nextMap));
                            }}
                            className="px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-[#0d1d36] border border-blue-300 dark:border-blue-700 text-slate-900 dark:text-white"
                          >
                            <option value="">-- Select Match --</option>
                            {currentQ.matchPairs!.map((opt) => (
                              <option key={opt.right} value={opt.right}>
                                {opt.right}
                              </option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                ) : currentQ.format === 'drag-drop' && currentQ.dragItems && currentQ.dropTargets ? (
                  <div className="space-y-3">
                    {currentQ.dragItems.map((item) => {
                      const assigned = (dragDrafts[currentQ.id] || {})[item] || '';
                      return (
                        <div
                          key={item}
                          className="p-3 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <span className="text-sm font-bold text-blue-900 dark:text-amber-300">“{item}”</span>
                          <div className="flex flex-wrap gap-2">
                            {currentQ.dropTargets!.map((bucket) => (
                              <button
                                key={bucket}
                                disabled={Boolean(validated[currentQ.id] || quizSubmitted)}
                                onClick={() => {
                                  const nextMap = { ...(dragDrafts[currentQ.id] || {}), [item]: bucket };
                                  setDragDrafts((p) => ({ ...p, [currentQ.id]: nextMap }));
                                  handleSelectOption(currentQ, JSON.stringify(nextMap));
                                }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors ${
                                  assigned === bucket
                                    ? 'bg-blue-700 text-white border-blue-700'
                                    : 'bg-white dark:bg-[#0d1d36] text-slate-700 dark:text-slate-200 border-blue-200 dark:border-blue-700 hover:bg-blue-50'
                                }`}
                              >
                                {bucket}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Standard Options for MCQ, Fill-Blank, True/False, Identify Error, Correction, Transformation, POS, Tense, Voice, Narration, Correct Word, Paragraph Grammar */
                  <div className="space-y-2.5">
                    {(currentQ.options || []).map((opt, oIdx) => {
                      const selected = answers[currentQ.id] === opt;
                      const showFeedback = Boolean(validated[currentQ.id] || quizSubmitted);
                      const isCorrectOption = opt === currentQ.correctAnswer;

                      let btnStyle =
                        'bg-blue-50/40 dark:bg-[#0a192f] border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-200 hover:border-blue-500';
                      if (showFeedback) {
                        if (isCorrectOption) {
                          btnStyle =
                            'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200 font-semibold';
                        } else if (selected && !isCorrectOption) {
                          btnStyle =
                            'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-200';
                        }
                      } else if (selected) {
                        btnStyle =
                          'bg-blue-100 dark:bg-blue-900/70 border-blue-600 dark:border-amber-400 text-[#0a192f] dark:text-white font-semibold';
                      }

                      return (
                        <button
                          key={`${currentQ.id}-opt-${oIdx}`}
                          onClick={() => handleSelectOption(currentQ, opt)}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="font-bold text-xs px-2 py-0.5 rounded bg-white/80 dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-700 shrink-0 mt-0.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {showFeedback && isCorrectOption && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          )}
                          {showFeedback && selected && !isCorrectOption && (
                            <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Drawer (strictly hidden until validated or quiz submitted) */}
                {(validated[currentQ.id] || quizSubmitted) && (
                  <div
                    className={`p-4 rounded-xl border text-sm space-y-1.5 ${
                      evaluateAnswer(currentQ, answers[currentQ.id])
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                        : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-slate-900 dark:text-amber-100'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      {evaluateAnswer(currentQ, answers[currentQ.id]) ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{isHi ? 'सही उत्तर! (+15 XP)' : 'Accurate Answer! (+15 XP)'}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>
                            {isHi ? 'सही उत्तर: ' : 'Correct Answer: '}
                            <span className="underline">{currentQ.correctAnswer}</span>
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed">
                      <strong>English:</strong> {currentQ.explanationEn}
                    </p>
                    {currentQ.explanationHi && currentQ.explanationHi !== currentQ.explanationEn && (
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                        <strong>हिन्दी व्याख्या:</strong> {currentQ.explanationHi}
                      </p>
                    )}
                  </div>
                )}

                {/* Action Footer */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-blue-100 dark:border-blue-900/60">
                  <div className="flex items-center gap-2">
                    <button
                      disabled={currentIdx === 0}
                      onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>{isHi ? 'पिछला' : 'Previous'}</span>
                    </button>
                    <button
                      disabled={currentIdx >= activeDeck.length - 1}
                      onClick={() => setCurrentIdx((i) => Math.min(activeDeck.length - 1, i + 1))}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-40 cursor-pointer"
                    >
                      <span>{isHi ? 'अगला' : 'Next'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {mode === 'untimed' && !quizSubmitted && !validated[currentQ.id] && (
                      <button
                        disabled={!answers[currentQ.id]}
                        onClick={() => handleValidateSingle(currentQ)}
                        className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold disabled:opacity-40 cursor-pointer"
                      >
                        {isHi ? 'उत्तर जांचें' : 'Submit Answer'}
                      </button>
                    )}

                    {!quizSubmitted && (
                      <button
                        onClick={handleFinishQuiz}
                        className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
                      >
                        {isHi ? 'क्विज़ सबमिट करें' : 'Finish & Score Quiz'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Final Result Screen */}
            {quizSubmitted && (
              <div className="rounded-2xl bg-gradient-to-br from-[#0a192f] via-[#102a4e] to-blue-900 text-white p-6 shadow-lg space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        {isHi ? 'परीक्षा परिणाम सारांश' : 'Assessment Result Summary'}
                      </h3>
                      <p className="text-xs text-blue-200">
                        {scoreCount === activeDeck.length
                          ? 'Perfect Score! Badge criteria achieved.'
                          : 'Review bilingual explanations above to master weak rules.'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-extrabold text-amber-300">
                      {scoreCount} / {activeDeck.length}
                    </div>
                    <div className="text-xs text-blue-200">
                      {activeDeck.length > 0 ? Math.round((scoreCount / activeDeck.length) * 100) : 0}% Accuracy
                    </div>
                  </div>
                </div>

                {saveMessage && (
                  <div className="px-3 py-2 rounded-lg bg-white/10 text-xs text-emerald-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>{saveMessage}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      setRetryIncorrectOnly(true);
                      setQuizSubmitted(false);
                      setCurrentIdx(0);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#0a192f] text-xs font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{isHi ? 'गलत प्रश्नों का पुनः प्रयास करें' : 'Retry Incorrect Answers'}</span>
                  </button>
                  <button
                    onClick={() => resetSession()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{isHi ? 'नया सत्र शुरू करें' : 'Restart Full Deck'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Question Navigator Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-4 shadow-sm space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                {isHi ? 'प्रश्न नेविगेटर' : 'Question Navigator'}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {activeDeck.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = Boolean(answers[q.id]);
                  const showResult = Boolean(validated[q.id] || quizSubmitted);
                  const isRight = showResult && evaluateAnswer(q, answers[q.id]);

                  let boxClass =
                    'bg-blue-50/70 dark:bg-[#0a192f] text-slate-700 dark:text-slate-300 border-blue-200 dark:border-blue-800';
                  if (showResult) {
                    boxClass = isRight
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-rose-600 text-white border-rose-600';
                  } else if (isAnswered) {
                    boxClass = 'bg-blue-700 text-white border-blue-700';
                  }
                  if (isCurrent) {
                    boxClass += ' ring-2 ring-amber-400 ring-offset-1 dark:ring-offset-[#0d1d36]';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-lg border text-xs font-bold transition-all cursor-pointer ${boxClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
              <div className="pt-2 border-t border-blue-100 dark:border-blue-900/60 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <div>Blue: Answered · Green: Correct · Red: Incorrect</div>
                <div>
                  {isHi
                    ? 'समयबद्ध मोड में सभी प्रश्न हल होने तक उत्तर छिपे रहते हैं।'
                    : 'In Timed Mode, explanations unlock cleanly after final submission.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
