import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Bookmark, 
  Award, 
  Filter, 
  Bot, 
  RefreshCw,
  Trophy,
  Calendar,
  Search,
  ChevronDown,
  ChevronUp,
  FileCheck2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AppLanguage, MCQQuestion, PracticePreset } from '../types';
import { audioFeedback } from '../utils/audioFeedback';
import { adminStorage } from '../utils/adminStorage';
import { PracticeEngine15 } from './PracticeEngine15';

interface McqPyqSimulatorProps {
  onAddXP: (xp: number) => void;
  initialPreset?: PracticePreset;
  language?: AppLanguage;
}

export const McqPyqSimulator: React.FC<McqPyqSimulatorProps> = ({
  onAddXP,
  initialPreset,
  language = 'en',
}) => {
  // Simulator View: 'practice-15' (15-Format Interactive Practice Engine), 'interactive' (MCQ simulator), or 'yearwise-archive'
  const [simulatorView, setSimulatorView] = useState<'interactive' | 'yearwise-archive' | 'practice-15'>(
    initialPreset?.view || 'practice-15'
  );

  const [examFilter, setExamFilter] = useState<string>('All');
  const [yearFilter, setYearFilter] = useState<string>('All Years');
  const [topicFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [testMode, setTestMode] = useState<'practice' | 'timed'>(
    initialPreset?.mode || 'practice'
  );

  const yearsList = [
    'All Years',
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014'
  ];

  const examsList = [
    'All',
    'NTA NET Paper 1',
    'NTA NET',
    'MPSET',
    'MPESB Paper 1 (Common)',
    'MPESB Grade 1',
    'MPESB Grade 2',
    'All-Exam Grammar'
  ];

  const [allQuestions, setAllQuestions] = useState<MCQQuestion[]>(() => adminStorage.getAllMCQs());

  useEffect(() => {
    const handleStorageUpdate = () => {
      setAllQuestions(adminStorage.getAllMCQs());
    };
    window.addEventListener('crafty_storage_update', handleStorageUpdate);
    return () => window.removeEventListener('crafty_storage_update', handleStorageUpdate);
  }, []);

  useEffect(() => {
    if (initialPreset) {
      setSimulatorView(initialPreset.view);
      setTestMode(initialPreset.mode);
      setIsTestActive(false);
      setIsTestSubmitted(false);
      setCurrentIndex(0);
    }
  }, [initialPreset]);

  // Filtered Questions for interactive simulator
  const filteredQuestions = allQuestions.filter((q) => {
    const matchesExam = examFilter === 'All' || q.exam === examFilter;
    const matchesYear = yearFilter === 'All Years' || (q.year && q.year.includes(yearFilter));
    const matchesTopic = topicFilter === 'All' || q.topic === topicFilter;
    const matchesSearch =
      searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.options.some((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.relatedSyllabusTopic.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesExam && matchesYear && matchesTopic && matchesSearch;
  });

  // Current Question Index
  const [currentIndex, setCurrentIndex] = useState(0);

  // User selections: record question id -> selected option index
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  // Practice mode revealed state: question id -> boolean
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});
  // Marked for review in timed mode: question id -> boolean
  const [markedForReview, setMarkedForReview] = useState<Record<string, boolean>>({});

  // Timed Exam State
  const [timerSeconds, setTimerSeconds] = useState(600);
  const [isTestActive, setIsTestActive] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);

  // Expanded year accordions for Yearwise Archive view
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>({
    '2024': true,
    '2023': true,
  });

  // AI Explainer State
  const [aiExplanation, setAiExplanation] = useState<{
    questionId: string;
    loading: boolean;
    data: {
      detailedExplanation?: string;
      authorWorksTable?: { author: string; work: string; yearOrSignificance: string }[];
      pyqTrendNote?: string;
      examTip?: string;
    } | null;
  }>({ questionId: '', loading: false, data: null });

  // Safe question retrieval
  const activeQuestion: MCQQuestion = filteredQuestions[currentIndex] || allQuestions[0];

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (testMode === 'timed' && isTestActive && !isTestSubmitted && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testMode, isTestActive, isTestSubmitted, timerSeconds]);

  const handleSelectOption = (index: number) => {
    audioFeedback.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: index,
    }));

    if (testMode === 'practice') {
      setRevealedQuestions((prev) => ({
        ...prev,
        [activeQuestion.id]: true,
      }));
      if (index === activeQuestion.correctIndex) {
        audioFeedback.playSuccess();
        onAddXP(20);
      } else {
        audioFeedback.playCardFlip();
      }
    }
  };

  const handleNext = () => {
    audioFeedback.playClick();
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    audioFeedback.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleMarkForReview = () => {
    audioFeedback.playCardFlip();
    setMarkedForReview((prev) => ({
      ...prev,
      [activeQuestion.id]: !prev[activeQuestion.id],
    }));
  };

  const handleStartTimedTest = () => {
    audioFeedback.playSuccess();
    setTestMode('timed');
    setIsTestActive(true);
    setIsTestSubmitted(false);
    setSelectedAnswers({});
    setMarkedForReview({});
    setCurrentIndex(0);
    setTimerSeconds(Math.max(300, filteredQuestions.length * 60)); // 1 min per question
  };

  const handleSubmitTest = () => {
    audioFeedback.playFanfare();
    setIsTestSubmitted(true);
    setIsTestActive(false);

    let count = 0;
    filteredQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        count++;
      }
    });

    const percent = Math.round((count / Math.max(1, filteredQuestions.length)) * 100);
    if (percent >= 70) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
    onAddXP(count * 25);
  };

  const handleLaunchYearQuiz = (year: string, mode: 'practice' | 'timed' = 'practice') => {
    audioFeedback.playClick();
    setYearFilter(year);
    setExamFilter('All');
    setSearchQuery('');
    setCurrentIndex(0);
    setSelectedAnswers({});
    setRevealedQuestions({});
    setSimulatorView('interactive');

    if (mode === 'timed') {
      const yearQuestions = allQuestions.filter((q) => q.year && q.year.includes(year));
      setTestMode('timed');
      setIsTestActive(true);
      setIsTestSubmitted(false);
      setTimerSeconds(Math.max(300, yearQuestions.length * 60));
    } else {
      setTestMode('practice');
      setIsTestActive(false);
      setIsTestSubmitted(false);
    }
  };

  const toggleYearAccordion = (year: string) => {
    audioFeedback.playClick();
    setExpandedYears((prev) => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  const handleAskAiExplainer = async (q: MCQQuestion) => {
    audioFeedback.playClick();
    setAiExplanation({ questionId: q.id, loading: true, data: null });

    try {
      const res = await fetch('/api/ai/exam-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          options: q.options,
          selectedOption: selectedAnswers[q.id] !== undefined ? q.options[selectedAnswers[q.id]] : undefined,
          correctOption: q.options[q.correctIndex],
          examContext: `${q.exam} (${q.year || 'Standard'}) - ${q.topic}`,
        }),
      });
      const data = await res.json();
      setAiExplanation({ questionId: q.id, loading: false, data });
      audioFeedback.playSuccess();
    } catch {
      setAiExplanation({
        questionId: q.id,
        loading: false,
        data: {
          detailedExplanation: q.detailedExplanation,
          examTip: q.mnemonicOrTip || 'Review the primary publication dates and foundational treatises.',
        },
      });
    }
  };

  // Score calculation for timed mode result
  const correctCount = filteredQuestions.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;
  const incorrectCount = filteredQuestions.filter(
    (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctIndex
  ).length;
  const unattemptedCount = filteredQuestions.length - correctCount - incorrectCount;
  const scorePercent = filteredQuestions.length > 0 ? Math.round((correctCount / filteredQuestions.length) * 100) : 0;

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Group questions by Year for Archive view
  const pureYears = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014'];
  const questionsByYear = pureYears.map((yr) => {
    const list = allQuestions.filter((q) => q.year && q.year.includes(yr));
    return {
      year: yr,
      count: list.length,
      questions: list,
    };
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50 to-blue-100/75 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>2014–2024 Archive · Year-Wise PYQ & MCQ Bank</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Year-Wise PYQ Vault & Exam Engine
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans">
              Authentic past 10 years question papers from <strong className="text-slate-900">NTA NET Paper 1, NTA NET English Literature, MPSET, MPESB Grade 1 (High School), MPESB Grade 2 (Middle School TET)</strong>, and All-Exam Grammar with interactive option selection, answers, and AI explanations.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white border border-sky-200 shadow-xs self-start md:self-auto">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setSimulatorView('practice-15');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                simulatorView === 'practice-15'
                  ? 'bg-[#0a192f] text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>15-Format Practice</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setSimulatorView('interactive');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                simulatorView === 'interactive'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>MCQ Simulator</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setSimulatorView('yearwise-archive');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                simulatorView === 'yearwise-archive'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Year-Wise Papers</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 0: 15-FORMAT INTERACTIVE PRACTICE ENGINE */}
      {simulatorView === 'practice-15' && (
        <PracticeEngine15
          language={language}
          onAddXP={onAddXP}
          initialModuleFilter={initialPreset?.moduleNumber}
          initialExamCategory={initialPreset?.examCategory}
          initialMode={initialPreset?.mode}
        />
      )}

      {/* VIEW 1: INTERACTIVE QUESTION SIMULATOR (PRACTICE OR TIMED) */}
      {simulatorView === 'interactive' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Dual Filter Bar: Exam Pills + Year-Wise Pills */}
          {!isTestActive && !isTestSubmitted && (
            <div className="bg-white rounded-2xl border border-sky-200 p-4 space-y-3.5 shadow-sm">
              {/* Row 1: Exam Filter Pills */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <Filter className="w-3.5 h-3.5 text-rose-600 mr-1 shrink-0" />
                  <span className="text-xs text-slate-600 font-medium shrink-0">Exam:</span>
                  {examsList.map((exam) => (
                    <button
                      key={exam}
                      onClick={() => {
                        audioFeedback.playClick();
                        setExamFilter(exam);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        examFilter === exam
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-sky-200'
                      }`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>

                {/* Practice vs Timed Switcher */}
                <div className="flex items-center gap-1 p-1 bg-sky-50 rounded-xl border border-sky-200 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setTestMode('practice');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      testMode === 'practice' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Practice
                  </button>
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      handleStartTimedTest();
                    }}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      testMode === 'timed' ? 'bg-rose-600 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>Timed Mock</span>
                  </button>
                </div>
              </div>

              {/* Row 2: YEAR-WISE FILTER PILLS */}
              <div className="flex items-center justify-between gap-3 pt-2 border-t border-sky-100">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 mr-1 shrink-0" />
                  <span className="text-xs text-slate-600 font-medium shrink-0">Select Year:</span>
                  {yearsList.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => {
                        audioFeedback.playClick();
                        setYearFilter(yr);
                        setCurrentIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                        yearFilter === yr
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'text-slate-700 hover:text-sky-700 hover:bg-sky-50 border border-sky-200'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>

                <div className="relative shrink-0 hidden md:block">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentIndex(0);
                    }}
                    placeholder="Search keywords or authors..."
                    className="bg-sky-50 border border-sky-200 rounded-xl pl-8 pr-3 py-1 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 w-48"
                  />
                </div>
              </div>

              {/* Status counter */}
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                <span>
                  Showing <strong className="text-slate-900">{filteredQuestions.length}</strong> Questions for {examFilter} ({yearFilter})
                </span>
                {yearFilter !== 'All Years' && (
                  <button
                    onClick={() => {
                      audioFeedback.playClick();
                      setYearFilter('All Years');
                    }}
                    className="text-amber-700 hover:underline font-medium cursor-pointer"
                  >
                    Clear Year Filter
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TIMED EXAM SUBMITTED SCORECARD */}
          {isTestSubmitted && (
            <div className="bg-white rounded-2xl border border-sky-200 p-6 sm:p-8 space-y-6 animate-in zoom-in-95 shadow-sm">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-amber-50 border border-amber-200 text-amber-600">
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="font-editorial text-3xl font-bold text-slate-900">Year-Wise Exam Simulation Complete!</h2>
                <p className="text-sm text-slate-600">
                  Performance Report across {filteredQuestions.length} Questions ({yearFilter})
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-1">
                  <span className="text-xs text-slate-600">Accuracy Score</span>
                  <p className="text-2xl font-black text-emerald-700">{scorePercent}%</p>
                </div>
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-1">
                  <span className="text-xs text-slate-600">Correct Answers</span>
                  <p className="text-2xl font-black text-emerald-700">+{correctCount}</p>
                </div>
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-1">
                  <span className="text-xs text-slate-600">Incorrect</span>
                  <p className="text-2xl font-black text-rose-600">-{incorrectCount}</p>
                </div>
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center space-y-1">
                  <span className="text-xs text-slate-600">Unattempted</span>
                  <p className="text-2xl font-black text-slate-600">{unattemptedCount}</p>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setIsTestSubmitted(false);
                    setTestMode('practice');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-slate-800 border border-sky-200 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Review Questions with Explanations
                </button>
                <button
                  onClick={handleStartTimedTest}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake {yearFilter} Test</span>
                </button>
              </div>
            </div>
          )}

          {/* QUESTION INTERFACE */}
          {(!isTestSubmitted || testMode === 'practice') && filteredQuestions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Question Box */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-5 shadow-sm">
                  {/* Question Meta Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-sky-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        {activeQuestion.exam}
                      </span>
                      {activeQuestion.year && (
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-600" />
                          <span>{activeQuestion.year}</span>
                        </span>
                      )}
                      <span className="text-xs text-slate-500 font-mono">
                        {activeQuestion.topic}
                      </span>
                    </div>

                    {testMode === 'timed' ? (
                      <div className="flex items-center gap-2 text-rose-700 font-mono font-bold text-sm bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                        <Clock className="w-4 h-4 animate-spin-slow" />
                        <span>{formatTimer(timerSeconds)}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">
                        {currentIndex + 1} of {filteredQuestions.length}
                      </span>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="space-y-2">
                    <p className="font-editorial text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                      {activeQuestion.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 pt-2">
                    {activeQuestion.options.map((opt, i) => {
                      const isSelected = selectedAnswers[activeQuestion.id] === i;
                      const isRevealed =
                        (testMode === 'practice' && revealedQuestions[activeQuestion.id]) ||
                        isTestSubmitted;
                      const isCorrect = i === activeQuestion.correctIndex;

                      let style =
                        'bg-sky-50/75 border-sky-200 text-slate-800 hover:border-sky-400 hover:bg-sky-100/70';

                      if (isRevealed) {
                        if (isCorrect) {
                          style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-50 border-rose-500 text-rose-900';
                        }
                      } else if (isSelected) {
                        style = 'bg-sky-100 border-sky-500 text-sky-950 font-medium';
                      }

                      return (
                        <button
                          key={i}
                          disabled={isTestSubmitted}
                          onClick={() => handleSelectOption(i)}
                          className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm leading-relaxed transition-all flex items-center justify-between cursor-pointer ${style}`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-6 h-6 rounded-lg border flex items-center justify-center font-mono text-xs shrink-0 ${
                                isRevealed && isCorrect
                                  ? 'bg-emerald-600 border-emerald-600 text-white'
                                  : isRevealed && isSelected && !isCorrect
                                  ? 'bg-rose-600 border-rose-600 text-white'
                                  : 'bg-white border-sky-200 text-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isRevealed && isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isRevealed && isSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Practice Mode Explanation Box */}
                  {testMode === 'practice' && revealedQuestions[activeQuestion.id] && (
                    <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3 animate-in fade-in">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Detailed Conceptual Rationale & Verification</span>
                        </span>
                        <button
                          onClick={() => handleAskAiExplainer(activeQuestion)}
                          disabled={aiExplanation.loading}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 text-xs font-semibold transition-all cursor-pointer"
                        >
                          {aiExplanation.loading && aiExplanation.questionId === activeQuestion.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>AI Coach Analyzing...</span>
                            </>
                          ) : (
                            <>
                              <Bot className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Ask AI Coach for Deep Breakdown</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-sans">
                        {activeQuestion.detailedExplanation}
                      </p>

                      {activeQuestion.mnemonicOrTip && (
                        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-amber-800">Exam Mnemonic / Memory Hack: </strong>
                            {activeQuestion.mnemonicOrTip}
                          </div>
                        </div>
                      )}

                      {/* Dynamic AI Explainer Result */}
                      {aiExplanation.data && aiExplanation.questionId === activeQuestion.id && (
                        <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 space-y-2.5 text-xs text-slate-800 animate-in fade-in">
                          <div className="flex items-center gap-1.5 text-indigo-700 font-bold">
                            <Sparkles className="w-4 h-4" />
                            <span>AI Professor High-Yield Synthesis</span>
                          </div>
                          <div className="whitespace-pre-wrap leading-relaxed font-sans text-xs">
                            {aiExplanation.data.detailedExplanation}
                          </div>
                          {aiExplanation.data.pyqTrendNote && (
                            <p className="text-emerald-700 italic pt-1 font-medium">
                              Trend: {aiExplanation.data.pyqTrendNote}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Nav Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                    <button
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 disabled:opacity-40 text-slate-800 border border-sky-200 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    {testMode === 'timed' && (
                      <button
                        onClick={toggleMarkForReview}
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          markedForReview[activeQuestion.id]
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-sky-50 text-slate-700 border-sky-200 hover:bg-sky-100'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{markedForReview[activeQuestion.id] ? 'Marked' : 'Mark for Review'}</span>
                      </button>
                    )}

                    {testMode === 'timed' && currentIndex === filteredQuestions.length - 1 ? (
                      <button
                        onClick={handleSubmitTest}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Submit Exam</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        disabled={currentIndex === filteredQuestions.length - 1}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Question Palette Sidebar */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Question Palette ({filteredQuestions.length})
                      </h3>
                      <span className="text-[10px] text-amber-700 font-mono font-semibold">
                        {yearFilter !== 'All Years' ? `Paper Year: ${yearFilter}` : 'All Years'}
                      </span>
                    </div>
                    {testMode === 'timed' && (
                      <button
                        onClick={handleSubmitTest}
                        className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
                      >
                        Submit Test
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-[360px] overflow-y-auto pr-1">
                    {filteredQuestions.map((q, idx) => {
                      const isCurrent = idx === currentIndex;
                      const isAnswered = selectedAnswers[q.id] !== undefined;
                      const isMarked = markedForReview[q.id];

                      let btnStyle = 'bg-sky-50 border-sky-200 text-slate-700 hover:border-sky-400';
                      if (isCurrent) {
                        btnStyle = 'bg-rose-600 border-rose-600 text-white font-bold ring-2 ring-rose-200';
                      } else if (isMarked) {
                        btnStyle = 'bg-amber-100 border-amber-400 text-amber-800 font-bold';
                      } else if (isAnswered) {
                        btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-800 font-bold';
                      }

                      return (
                        <button
                          key={q.id}
                          onClick={() => {
                            audioFeedback.playClick();
                            setCurrentIndex(idx);
                          }}
                          className={`h-9 rounded-xl border text-xs font-mono flex items-center justify-center transition-all cursor-pointer ${btnStyle}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-sky-100 text-[11px] text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400" />
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-amber-100 border border-amber-400" />
                      <span>Marked</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-sky-50 border border-sky-200" />
                      <span>Unanswered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-rose-600 border border-rose-600" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-sky-200 space-y-3 shadow-sm">
              <Calendar className="w-10 h-10 text-sky-400 mx-auto" />
              <h3 className="font-editorial text-lg font-bold text-slate-900">No Questions Matching Criteria</h3>
              <p className="text-xs text-slate-600">
                Try selecting "All Years" or clearing your search keywords.
              </p>
              <button
                onClick={() => {
                  setYearFilter('All Years');
                  setExamFilter('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: DEDICATED YEAR-WISE PAPERS ARCHIVE (2014 TO 2024 CATALOG) */}
      {simulatorView === 'yearwise-archive' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-4 rounded-2xl bg-white border border-sky-200 flex items-center justify-between text-xs text-slate-700 shadow-xs">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-slate-900">Last 10 Years Question Paper Packs (2014–2024)</span>
            </div>
            <span className="text-slate-500 font-mono">11 Annual Exam Collections</span>
          </div>

          <div className="space-y-4">
            {questionsByYear.map((pack) => {
              const isExpanded = expandedYears[pack.year];
              return (
                <div
                  key={pack.year}
                  className="bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm transition-all"
                >
                  {/* Year Header Card */}
                  <div
                    onClick={() => toggleYearAccordion(pack.year)}
                    className="p-5 flex items-center justify-between bg-white hover:bg-sky-50/70 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-100 to-amber-100 border border-sky-200 flex items-center justify-center font-mono font-bold text-sm text-sky-900">
                        {pack.year}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-editorial text-lg font-bold text-slate-900">
                            {pack.year} Examination Question Papers
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 font-mono font-semibold">
                            {pack.count} Verified PYQs
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Includes NTA NET Paper 1, NTA NET Literature, MPSET, MPESB High School/Middle School, and Grammar
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLaunchYearQuiz(pack.year, 'practice');
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                        >
                          Practice {pack.year}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLaunchYearQuiz(pack.year, 'timed');
                          }}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-xs transition-colors cursor-pointer"
                        >
                          <Clock className="w-3 h-3" />
                          <span>Timed Test</span>
                        </button>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Questions List for this Year */}
                  {isExpanded && (
                    <div className="p-5 pt-4 border-t border-sky-100 space-y-4 bg-sky-50/50 animate-in fade-in">
                      {pack.questions.length > 0 ? (
                        pack.questions.map((q, qIdx) => (
                          <div
                            key={q.id}
                            className="p-4 rounded-xl bg-white border border-sky-200 space-y-3 shadow-xs"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-amber-700">
                                  #{qIdx + 1}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                                  {q.exam}
                                </span>
                                <span className="text-slate-500 font-mono">
                                  {q.year} • {q.topic}
                                </span>
                              </div>
                              <span className="text-emerald-700 font-semibold font-mono text-[11px]">
                                Correct: Option {String.fromCharCode(65 + q.correctIndex)}
                              </span>
                            </div>

                            <p className="font-editorial text-sm font-bold text-slate-900 leading-relaxed">
                              {q.question}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {q.options.map((opt, oIdx) => (
                                <div
                                  key={oIdx}
                                  className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                                    oIdx === q.correctIndex
                                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                                      : 'bg-sky-50/75 border-sky-200 text-slate-700'
                                  }`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded text-center font-mono text-[10px] flex items-center justify-center shrink-0 ${
                                      oIdx === q.correctIndex
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white border border-sky-200 text-slate-600'
                                    }`}
                                  >
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                  <span>{opt}</span>
                                </div>
                              ))}
                            </div>

                            <div className="p-3 rounded-lg bg-sky-50/75 border border-sky-200 text-xs text-slate-700 space-y-1">
                              <span className="font-bold text-emerald-700 block text-[11px]">
                                Detailed Solution:
                              </span>
                              <p className="leading-relaxed font-sans">{q.detailedExplanation}</p>
                              {q.mnemonicOrTip && (
                                <p className="text-amber-800 italic pt-1 text-[11px]">
                                  Memory Hack: {q.mnemonicOrTip}
                                </p>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-xs text-slate-500">
                          Questions for {pack.year} loaded into main question bank.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
