import React, { useState, useEffect } from 'react';
import {
  Landmark,
  BookOpen,
  Flame,
  HelpCircle,
  Search,
  Volume2,
  CheckCircle2,
  XCircle,
  Award,
  Layers,
  Filter,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Bot,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MPESB_COMMON_PAPER1_UNITS } from '../data/mpesbCommonPaper1Syllabus';
import { MCQQuestion } from '../types';
import { adminStorage } from '../utils/adminStorage';
import { audioFeedback } from '../utils/audioFeedback';

interface MpesbPaper1HubProps {
  onAddXP: (xp: number) => void;
}

const MASTERED_POINTS_STORAGE_KEY = 'crafty_mpesb_p1_mastered_points_v1';

export const MpesbPaper1Hub: React.FC<MpesbPaper1HubProps> = ({ onAddXP }) => {
  const [subTab, setSubTab] = useState<'syllabus' | 'top-100' | 'pyqs-mcqs'>('syllabus');

  // Tab 1: Syllabus selected unit
  const [selectedUnitId, setSelectedUnitId] = useState<string>(MPESB_COMMON_PAPER1_UNITS[0].id);

  // Tab 2: Top 100 Exam Points Vault state
  const [pointsUnitFilter, setPointsUnitFilter] = useState<number | 'all'>('all');
  const [pointsSearch, setPointsSearch] = useState('');
  const [masteredPoints, setMasteredPoints] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(MASTERED_POINTS_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(MASTERED_POINTS_STORAGE_KEY, JSON.stringify(masteredPoints));
    } catch {}
  }, [masteredPoints]);

  // Tab 3: MPESB Paper 1 PYQs & MCQs Practice state
  const [allMcqs, setAllMcqs] = useState<MCQQuestion[]>(() => adminStorage.getAllMCQs());
  useEffect(() => {
    const handleUpdate = () => setAllMcqs(adminStorage.getAllMCQs());
    window.addEventListener('crafty_storage_update', handleUpdate);
    return () => window.removeEventListener('crafty_storage_update', handleUpdate);
  }, []);

  const paper1Mcqs = allMcqs.filter((q) => q.exam === 'MPESB Paper 1 (Common)');
  const [mcqTopicFilter, setMcqTopicFilter] = useState<string>('All');
  const [currentMcqIdx, setCurrentMcqIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});
  const [aiBreakdown, setAiBreakdown] = useState<{
    questionId: string;
    loading: boolean;
    text: string | null;
  }>({ questionId: '', loading: false, text: null });

  const filteredPaper1Mcqs = paper1Mcqs.filter(
    (q) => mcqTopicFilter === 'All' || q.topic === mcqTopicFilter
  );
  const activeMcq = filteredPaper1Mcqs[currentMcqIdx] || paper1Mcqs[0];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMasteredPoint = (num: number) => {
    audioFeedback.playClick();
    setMasteredPoints((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      } else {
        onAddXP(5);
        return [...prev, num];
      }
    });
  };

  const handleSelectMcqOption = (optIdx: number) => {
    if (!activeMcq || revealedQuestions[activeMcq.id]) return;

    setSelectedAnswers((prev) => ({ ...prev, [activeMcq.id]: optIdx }));
    setRevealedQuestions((prev) => ({ ...prev, [activeMcq.id]: true }));

    if (optIdx === activeMcq.correctIndex) {
      audioFeedback.playSuccess();
      onAddXP(25);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } else {
      audioFeedback.playError();
    }
  };

  const handleAskAiExplainer = async (q: MCQQuestion) => {
    audioFeedback.playClick();
    setAiBreakdown({ questionId: q.id, loading: true, text: null });
    try {
      const res = await fetch('/api/ai/exam-explainer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q.question,
          options: q.options,
          selectedOption: selectedAnswers[q.id] !== undefined ? q.options[selectedAnswers[q.id]] : undefined,
          correctOption: q.options[q.correctIndex],
          examContext: `MPESB Paper 1 Common Paper (Varg 1 & Varg 2) - ${q.topic}`,
        }),
      });
      const data = await res.json();
      setAiBreakdown({
        questionId: q.id,
        loading: false,
        text: data.detailedExplanation || q.detailedExplanation,
      });
    } catch {
      setAiBreakdown({
        questionId: q.id,
        loading: false,
        text: q.detailedExplanation,
      });
    }
  };

  const currentUnit =
    MPESB_COMMON_PAPER1_UNITS.find((u) => u.id === selectedUnitId) || MPESB_COMMON_PAPER1_UNITS[0];

  // Gather all 100 exam points
  const all100Points = MPESB_COMMON_PAPER1_UNITS.flatMap((u) =>
    u.examPoints.map((ep) => ({
      ...ep,
      unitNumber: u.unitNumber,
      unitTitle: u.title,
    }))
  );

  const filtered100Points = all100Points.filter((item) => {
    const matchesUnit = pointsUnitFilter === 'all' || item.unitNumber === pointsUnitFilter;
    const matchesSearch =
      pointsSearch.trim() === '' ||
      item.point.toLowerCase().includes(pointsSearch.toLowerCase()) ||
      item.tag.toLowerCase().includes(pointsSearch.toLowerCase()) ||
      `#${item.number}`.includes(pointsSearch.trim());
    return matchesUnit && matchesSearch;
  });

  const correctCount = paper1Mcqs.filter(
    (q) => selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50 to-blue-100/75 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-amber-700 text-xs font-semibold">
              <Landmark className="w-4 h-4" />
              <span>Compulsory Part-A · Curated by Mr. ChainSingh Kushro</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              MPESB Paper 1 <span className="text-sky-700">Common Paper</span> Hub
            </h1>
            <p className="text-slate-600 text-sm font-sans leading-relaxed">
              Complete unit-wise syllabus for Madhya Pradesh High School & Middle School Teacher Selection/TET Part-A:
              <strong className="text-slate-900"> CDP & Pedagogy, सामान्य हिंदी, General English, MP GK & Current Affairs, and Reasoning & Numerical Ability</strong> — compiled by <strong className="text-slate-900">Mr. ChainSingh Kushro</strong> (<a href="mailto:chaink2000@gmail.com" className="text-sky-700 hover:underline font-medium">chaink2000@gmail.com</a>) with{' '}
              <strong className="text-amber-700">Top 100 Exam Points</strong> and{' '}
              <strong className="text-emerald-700">PYQs & MCQs</strong>.
            </p>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white border border-sky-200 text-center shadow-xs">
              <span className="text-2xl font-bold font-mono tabular-nums text-amber-700 block">5</span>
              <span className="text-[11px] text-slate-600 font-medium">Core Units</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-sky-200 text-center shadow-xs">
              <span className="text-2xl font-bold font-mono tabular-nums text-sky-700 block">100</span>
              <span className="text-[11px] text-slate-600 font-medium">Exam Points</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white border border-sky-200 text-center shadow-xs">
              <span className="text-2xl font-bold font-mono tabular-nums text-emerald-700 block">
                {paper1Mcqs.length}
              </span>
              <span className="text-[11px] text-slate-600 font-medium">PYQs & MCQs</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Sub-Navigation Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => {
            audioFeedback.playClick();
            setSubTab('syllabus');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
            subTab === 'syllabus'
              ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-200 shadow-sm'
              : 'bg-white border-sky-200 hover:border-sky-300'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-orange-100 text-orange-700 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-editorial text-base font-bold text-slate-900">Full Unit-Wise Syllabus</h3>
            <p className="text-xs text-slate-600">Units 1–5 Complete Topics & Notes</p>
          </div>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setSubTab('top-100');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
            subTab === 'top-100'
              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200 shadow-sm'
              : 'bg-white border-sky-200 hover:border-sky-300'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 shrink-0">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-editorial text-base font-bold text-slate-900">Top 100 Exam Points</h3>
            <p className="text-xs text-slate-600">
              Mastered: {masteredPoints.length} / 100 High-Yield Facts
            </p>
          </div>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setSubTab('pyqs-mcqs');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
            subTab === 'pyqs-mcqs'
              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm'
              : 'bg-white border-sky-200 hover:border-sky-300'
          }`}
        >
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-editorial text-base font-bold text-slate-900">Paper 1 PYQs & MCQs</h3>
            <p className="text-xs text-slate-600">
              {paper1Mcqs.length} Authentic Practice Questions
            </p>
          </div>
        </button>
      </div>

      {/* SUB-VIEW 1: UNIT-WISE FULL SYLLABUS */}
      {subTab === 'syllabus' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
          {/* Left Unit Navigator */}
          <div className="lg:col-span-4 space-y-2.5">
            {MPESB_COMMON_PAPER1_UNITS.map((unit) => {
              const isSelected = unit.id === currentUnit.id;
              return (
                <button
                  key={unit.id}
                  onClick={() => {
                    audioFeedback.playClick();
                    setSelectedUnitId(unit.id);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 shadow-sm'
                      : 'bg-white border-sky-200 hover:border-sky-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
                      UNIT {unit.unitNumber}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {unit.examPoints.length} Exam Points
                    </span>
                  </div>
                  <h4 className="font-editorial text-sm font-bold text-slate-900 leading-snug">
                    {unit.title}
                  </h4>
                  <p className="text-xs text-orange-700 mt-0.5 font-medium">{unit.hindiTitle}</p>
                </button>
              );
            })}

            {/* Jump to Top 100 CTA */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-white border border-amber-200 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <Flame className="w-4 h-4 text-amber-600 fill-current" />
                <span>Quick Revision Mode</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Want all 100 numbered exam points across all 5 units on a single revision sheet?
              </p>
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  setSubTab('top-100');
                }}
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open Top 100 Exam Points</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Unit Details Pane */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-sky-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-sky-100 pb-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200">
                      Unit {currentUnit.unitNumber}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {currentUnit.marksWeightage}
                    </span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900">
                    {currentUnit.title}
                  </h2>
                  <p className="text-xs font-medium text-orange-700">{currentUnit.hindiTitle}</p>
                </div>

                <button
                  onClick={() => handleSpeak(`${currentUnit.title}. ${currentUnit.overview}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-slate-800 border border-sky-200 text-xs font-semibold shrink-0 self-start cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-orange-600" />
                  <span>Listen Summary</span>
                </button>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-sky-50/75 p-4 rounded-xl border border-sky-200">
                {currentUnit.overview}
              </p>

              {/* Topics Breakdown */}
              <div className="space-y-4">
                <h3 className="font-editorial text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Prescribed Unit Syllabus & Sub-Topics</span>
                </h3>

                <div className="space-y-3">
                  {currentUnit.topics.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-3"
                    >
                      <h4 className="font-bold text-sm text-slate-900">{topic.name}</h4>
                      <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                        {topic.subtopics.map((sub, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-900">
                        <strong className="text-orange-700">Exam Focus:</strong> {topic.keyDetails}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unit's 20 High-Yield Exam Points */}
              <div className="space-y-3 pt-2 border-t border-sky-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-lg font-bold text-amber-800 flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-600 fill-current" />
                    <span>
                      Unit {currentUnit.unitNumber} Top 20 High-Yield Exam Points (#
                      {currentUnit.examPoints[0]?.number}–#
                      {currentUnit.examPoints[currentUnit.examPoints.length - 1]?.number})
                    </span>
                  </h3>
                </div>

                <div className="space-y-2">
                  {currentUnit.examPoints.map((ep) => {
                    const isMastered = masteredPoints.includes(ep.number);
                    return (
                      <div
                        key={ep.number}
                        onClick={() => toggleMasteredPoint(ep.number)}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-3 cursor-pointer transition-all ${
                          isMastered
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                            : 'bg-sky-50/70 border-sky-200 hover:border-amber-400 text-slate-800'
                        }`}
                      >
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] shrink-0 ${
                            isMastered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          #{ep.number}
                        </span>
                        <div className="flex-1 leading-relaxed">
                          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white border border-sky-200 text-slate-700 mr-2">
                            {ep.tag}
                          </span>
                          <span>{ep.point}</span>
                        </div>
                        <div className="shrink-0 mt-0.5">
                          {isMastered ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-sky-300 bg-white" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: TOP 100 MOST IMPORTANT EXAM POINTS VAULT */}
      {subTab === 'top-100' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Progress & Filter Header */}
          <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-600 fill-current" />
                  <span>100 Most Important Exam Points (MPESB Part-A)</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Click any point to mark it as mastered (+5 XP per fact). Covers all 5 units (#1 to #100).
                </p>
              </div>

              <div className="flex items-center gap-3 bg-sky-50 px-4 py-2.5 rounded-xl border border-sky-200">
                <Award className="w-5 h-5 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                    Revision Progress
                  </span>
                  <span className="text-sm font-mono font-bold text-emerald-700">
                    {masteredPoints.length} / 100 Mastered ({masteredPoints.length}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 rounded-full bg-sky-100 border border-sky-200 overflow-hidden">
              <div
                style={{ width: `${masteredPoints.length}%` }}
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              />
            </div>

            {/* Unit Pills + Search */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <Filter className="w-3.5 h-3.5 text-amber-600 mr-1 shrink-0" />
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setPointsUnitFilter('all');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    pointsUnitFilter === 'all'
                      ? 'bg-amber-600 text-white font-bold'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100 border border-sky-200'
                  }`}
                >
                  All 100 Points
                </button>
                {MPESB_COMMON_PAPER1_UNITS.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      audioFeedback.playClick();
                      setPointsUnitFilter(u.unitNumber);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      pointsUnitFilter === u.unitNumber
                        ? 'bg-amber-600 text-white font-bold'
                        : 'bg-sky-50 text-slate-700 hover:bg-sky-100 border border-sky-200'
                    }`}
                  >
                    Unit {u.unitNumber} ({u.examPoints[0].number}–{u.examPoints[u.examPoints.length - 1].number})
                  </button>
                ))}
              </div>

              <div className="relative shrink-0">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search 100 points (e.g. Piaget, संधि, Narmada)..."
                  value={pointsSearch}
                  onChange={(e) => setPointsSearch(e.target.value)}
                  className="w-full md:w-72 pl-9 pr-3 py-1.5 bg-sky-50 border border-sky-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Grid of 100 Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered100Points.map((item) => {
              const isMastered = masteredPoints.includes(item.number);
              return (
                <div
                  key={item.number}
                  onClick={() => toggleMasteredPoint(item.number)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 shadow-xs ${
                    isMastered
                      ? 'bg-emerald-50 border-emerald-400'
                      : 'bg-white border-sky-200 hover:border-amber-400'
                  }`}
                >
                  <span
                    className={`w-9 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                      isMastered
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    #{item.number}
                  </span>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 text-orange-700 border border-sky-200">
                          Unit {item.unitNumber}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-slate-700">
                          {item.tag}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSpeak(item.point);
                        }}
                        className="p-1 rounded hover:bg-sky-100 text-slate-500 hover:text-sky-700 cursor-pointer"
                        title="Read point aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{item.point}</p>
                  </div>

                  <div className="shrink-0 pt-1">
                    {isMastered ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-sky-300 bg-white" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: MPESB PAPER 1 PYQS & MCQS PRACTICE ENGINE */}
      {subTab === 'pyqs-mcqs' && activeMcq && (
        <div className="space-y-6 animate-in fade-in">
          {/* Topic Filter & Score Bar */}
          <div className="bg-white rounded-2xl border border-sky-200 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <Filter className="w-3.5 h-3.5 text-emerald-600 mr-1 shrink-0" />
              {[
                'All',
                'CDP & Pedagogy',
                'General Hindi',
                'General English',
                'MP GK & Current Affairs',
                'Reasoning & Numerical',
              ].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    audioFeedback.playClick();
                    setMcqTopicFilter(t);
                    setCurrentMcqIdx(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    mcqTopicFilter === t
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100 border border-sky-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 font-mono text-emerald-700 font-bold">
                Score: {correctCount} / {paper1Mcqs.length}
              </span>
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  setSelectedAnswers({});
                  setRevealedQuestions({});
                  setCurrentMcqIdx(0);
                }}
                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-slate-700 border border-sky-200 cursor-pointer"
                title="Reset Practice Session"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Active Question Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-white rounded-2xl border border-sky-200 p-6 sm:p-8 space-y-6 shadow-sm">
              {/* Question Tags */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 font-bold">
                    {activeMcq.exam}
                  </span>
                  {activeMcq.year && (
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-slate-700 border border-sky-200">
                      PYQ: {activeMcq.year}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {activeMcq.topic}
                  </span>
                </div>
                <span className="font-mono text-slate-500">
                  Question {currentMcqIdx + 1} of {filteredPaper1Mcqs.length}
                </span>
              </div>

              {/* Question Prompt */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                {activeMcq.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3">
                {activeMcq.options.map((opt, idx) => {
                  const isRevealed = revealedQuestions[activeMcq.id];
                  const isSelected = selectedAnswers[activeMcq.id] === idx;
                  const isCorrect = idx === activeMcq.correctIndex;

                  let styleClass =
                    'bg-sky-50/75 border-sky-200 hover:border-sky-400 text-slate-800';
                  if (isRevealed) {
                    if (isCorrect) {
                      styleClass =
                        'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      styleClass = 'bg-rose-50 border-rose-500 text-rose-900';
                    } else {
                      styleClass = 'bg-sky-50/40 border-sky-100 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectMcqOption(idx)}
                      disabled={isRevealed}
                      className={`w-full p-4 rounded-xl border text-left text-sm flex items-center gap-3 transition-all cursor-pointer disabled:cursor-default ${styleClass}`}
                    >
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                          isRevealed && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isRevealed && isSelected && !isCorrect
                            ? 'bg-rose-600 text-white'
                            : 'bg-white border border-sky-200 text-slate-700'
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {isRevealed && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isRevealed && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Mnemonic Box */}
              {revealedQuestions[activeMcq.id] && (
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified Answer Rationale</span>
                    </span>
                    <button
                      onClick={() => handleAskAiExplainer(activeMcq)}
                      disabled={aiBreakdown.loading}
                      className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>
                        {aiBreakdown.loading && aiBreakdown.questionId === activeMcq.id
                          ? 'Analyzing...'
                          : 'AI Deep Dive'}
                      </span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {activeMcq.detailedExplanation}
                  </p>

                  {activeMcq.mnemonicOrTip && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                      💡 <strong>Memory Hack:</strong> {activeMcq.mnemonicOrTip}
                    </div>
                  )}

                  {aiBreakdown.questionId === activeMcq.id && aiBreakdown.text && (
                    <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap">
                      <span className="font-bold text-indigo-700 block mb-1">
                        🤖 Gemini Crafty Explainer:
                      </span>
                      {aiBreakdown.text}
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-sky-100">
                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setCurrentMcqIdx((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={currentMcqIdx === 0}
                  className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 disabled:opacity-40 text-xs font-semibold text-slate-800 border border-sky-200 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => {
                    audioFeedback.playClick();
                    setCurrentMcqIdx((prev) =>
                      Math.min(filteredPaper1Mcqs.length - 1, prev + 1)
                    );
                  }}
                  disabled={currentMcqIdx >= filteredPaper1Mcqs.length - 1}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Question Palette */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-sky-200 p-5 space-y-4 h-fit shadow-sm">
              <h4 className="font-editorial text-base font-bold text-slate-900 flex items-center justify-between">
                <span>Question Palette</span>
                <span className="text-xs font-mono text-slate-500">
                  {filteredPaper1Mcqs.length} Qs
                </span>
              </h4>

              <div className="grid grid-cols-5 gap-2">
                {filteredPaper1Mcqs.map((q, idx) => {
                  const isAnswered = revealedQuestions[q.id];
                  const isRight = isAnswered && selectedAnswers[q.id] === q.correctIndex;
                  const isCurrent = idx === currentMcqIdx;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        audioFeedback.playClick();
                        setCurrentMcqIdx(idx);
                      }}
                      className={`h-9 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-orange-300 border-orange-500 bg-orange-600 text-white'
                          : isAnswered
                          ? isRight
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800'
                            : 'bg-rose-100 border-rose-400 text-rose-800'
                          : 'bg-sky-50 border-sky-200 text-slate-600 hover:border-sky-400'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-sky-100 space-y-1.5 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-400 inline-block" />
                  <span>Answered Correctly (+25 XP)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-rose-100 border border-rose-400 inline-block" />
                  <span>Needs Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-sky-50 border border-sky-200 inline-block" />
                  <span>Unattempted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
