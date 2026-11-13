import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  XCircle,
  Award,
  Sparkles,
  Volume2,
  AlertTriangle,
  Check,
  ArrowRight,
  ChevronRight,
  Filter
} from 'lucide-react';
import { GRAMMAR_TOPICS } from '../data/grammarTopics';
import { GrammarTopic } from '../types';
import { audioFeedback } from '../utils/audioFeedback';
import { GrammarVisualLab } from './GrammarVisualLab';

interface GrammarHubProps {
  onAddXP: (xp: number) => void;
}

export const GrammarHub: React.FC<GrammarHubProps> = ({ onAddXP }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(GRAMMAR_TOPICS[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completedTopicQuizzes, setCompletedTopicQuizzes] = useState<Record<string, boolean>>({});

  const categories: { id: string; label: string }[] = [
    { id: 'All', label: 'All 7 Modules' },
    { id: 'Parts of Speech', label: '01. Parts of Speech' },
    { id: 'Determiners & Articles', label: '02. Determiners & Articles' },
    { id: 'Tenses & Agreement', label: '03. Tenses & Agreement' },
    { id: 'Transformations', label: '04. Transformations' },
    { id: 'Clauses & Syntax', label: '05. Clauses & Syntax' },
    { id: 'Word Power', label: '06. Word Power' },
    { id: 'Stylistics & Errors', label: '07. Stylistics & Errors' }
  ];

  const filteredTopics = GRAMMAR_TOPICS.filter((t) => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.moduleNumber.toLowerCase().includes(q) ||
      t.keyRules.some(
        (r) =>
          r.rule.toLowerCase().includes(q) ||
          r.explanation.toLowerCase().includes(q) ||
          r.correctExample.toLowerCase().includes(q)
      ) ||
      t.tables.some(
        (tb) =>
          tb.title.toLowerCase().includes(q) ||
          tb.rows.some((row) => row.some((cell) => cell.toLowerCase().includes(q)))
      );
    return matchesCategory && matchesSearch;
  });

  const currentTopic: GrammarTopic =
    filteredTopics.find((t) => t.id === selectedTopicId) ||
    GRAMMAR_TOPICS.find((t) => t.id === selectedTopicId) ||
    GRAMMAR_TOPICS[0];

  const currentTopicIndex = GRAMMAR_TOPICS.findIndex((t) => t.id === currentTopic.id);
  const nextTopic =
    currentTopicIndex >= 0 && currentTopicIndex < GRAMMAR_TOPICS.length - 1
      ? GRAMMAR_TOPICS[currentTopicIndex + 1]
      : null;

  const handleSelectTopic = (id: string) => {
    audioFeedback.playClick();
    setSelectedTopicId(id);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);
  };

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleQuizSubmit = () => {
    if (selectedQuizAnswer === null) return;
    setQuizSubmitted(true);
    const isCorrect = selectedQuizAnswer === currentTopic.quickCheck.correctIndex;

    if (isCorrect) {
      audioFeedback.playSuccess();
      if (!completedTopicQuizzes[currentTopic.id]) {
        onAddXP(50);
        setCompletedTopicQuizzes((prev) => ({ ...prev, [currentTopic.id]: true }));
      }
    } else {
      audioFeedback.playCardFlip();
    }
  };

  const completedCount = Object.keys(completedTopicQuizzes).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100/70 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-sky-700 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>7-Pillar Visual Grammar Atlas</span>
              <span aria-hidden="true">·</span>
              <span>Curated by Mr. ChainSingh Kushro (chaink2000@gmail.com)</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              English Grammar, Stylistics & Visual Rules Curriculum
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              Master Foundations through Literary Stylistics with illustrated concept artwork, interactive animated simulators, step-by-step flowcharts, structured comparison tables, and exam error drills.
            </p>
          </div>

          <div className="bg-white/90 border border-sky-200 rounded-xl px-4 py-3 shrink-0 tabular-nums space-y-0.5">
            <div className="text-xs font-medium text-slate-500">Curriculum Progress</div>
            <div className="text-lg font-bold text-slate-900">
              {completedCount} / {GRAMMAR_TOPICS.length} Topics Mastered
            </div>
            <div className="text-xs text-sky-700 font-semibold">
              {GRAMMAR_TOPICS.reduce((acc, t) => acc + t.tables.length, 0)} Reference Tables · 12 Animated Labs
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-sky-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <Filter className="w-4 h-4 text-sky-600 ml-2 mr-1 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                audioFeedback.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topic, rule, root, or figure..."
          className="bg-sky-50/70 border border-sky-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 lg:w-64 shrink-0"
        />
      </div>

      {/* Main 2-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Topic Navigator List */}
        <div className="lg:col-span-4 space-y-2.5 lg:sticky lg:top-20 max-h-[82vh] overflow-y-auto pr-1">
          {filteredTopics.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white border border-sky-200 text-center space-y-2">
              <p className="text-sm font-semibold text-slate-800">No matching grammar topics</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const isSelected = topic.id === currentTopic.id;
              const isCompleted = completedTopicQuizzes[topic.id];
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 border-sky-500 shadow-sm'
                      : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
                    <span className="text-sky-700">
                      {topic.moduleNumber} · {topic.category}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-emerald-700 shrink-0">
                        <Check className="w-3 h-3" />
                        <span>Passed</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-editorial text-base font-bold text-slate-900 mt-1 leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                    {topic.summary}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Right Topic Learning Stage */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overview Card */}
          <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-3 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 tabular-nums">
                  <span className="font-semibold text-sky-700">{currentTopic.moduleNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentTopic.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentTopic.tables.length} Reference Tables</span>
                  <span aria-hidden="true">·</span>
                  <span>{currentTopic.keyRules.length} Core Rules</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 text-balance">
                  {currentTopic.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => handleSpeak(currentTopic.summary)}
                title="Listen to audio overview"
                className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 transition-colors shrink-0 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {currentTopic.summary}
            </p>
          </div>

          {/* Visual Lab: Illustration + Animated Simulator + Flowchart + Tables */}
          <GrammarVisualLab topic={currentTopic} onSpeak={handleSpeak} />

          {/* Key Rules Breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Exam Rules, Formulas & Contrastive Examples</span>
            </h3>

            {currentTopic.keyRules.map((rule, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-sky-200 p-5 space-y-3 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-editorial text-lg font-bold text-slate-900">
                    Rule {idx + 1}: {rule.rule}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleSpeak(rule.correctExample)}
                    className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors shrink-0 cursor-pointer"
                    title="Pronounce correct example"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {rule.explanation}
                </p>

                {rule.formula && (
                  <div className="p-3 rounded-xl bg-sky-50 font-mono text-xs text-sky-950 border border-sky-200">
                    <span className="text-sky-700 font-bold mr-2">Formula:</span>
                    {rule.formula}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Correct Usage</span>
                    </span>
                    <p className="text-xs text-slate-800 italic leading-relaxed">
                      "{rule.correctExample}"
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
                    <span className="text-[11px] font-bold text-rose-700 flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Common Error to Spot</span>
                    </span>
                    <p className="text-xs text-slate-700 line-through decoration-rose-500/80 leading-relaxed">
                      "{rule.incorrectExample}"
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2 text-xs text-amber-950">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    <strong>Candidate Pitfall:</strong> {rule.commonPitfall}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Mini-Quiz Card */}
          <div className="bg-gradient-to-br from-white to-sky-50 rounded-2xl border border-sky-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Instant Mastery Check (+50 XP)</span>
              </span>
              <span className="text-xs text-slate-500">Exam-Pattern Verification</span>
            </div>

            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentTopic.quickCheck.question}
            </p>

            <div className="space-y-2">
              {currentTopic.quickCheck.options.map((opt, i) => {
                const isSelected = selectedQuizAnswer === i;
                const isCorrect = i === currentTopic.quickCheck.correctIndex;
                let optStyle =
                  'bg-white border-sky-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/60';

                if (quizSubmitted) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-sky-100 border-sky-600 text-slate-950 font-medium';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={quizSubmitted}
                    onClick={() => {
                      audioFeedback.playClick();
                      setSelectedQuizAnswer(i);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-center justify-between gap-2 cursor-pointer ${optStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    {quizSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                type="button"
                onClick={handleQuizSubmit}
                disabled={selectedQuizAnswer === null}
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Verify Answer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-white border border-sky-200 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2">
                  {selectedQuizAnswer === currentTopic.quickCheck.correctIndex ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Correct! +50 XP Earned</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect. Review the rule rationale below:</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentTopic.quickCheck.explanation}
                </p>
              </div>
            )}

            {nextTopic && (
              <div className="pt-2 border-t border-sky-200/80 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSelectTopic(nextTopic.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-700 transition-colors cursor-pointer"
                >
                  <span>Next Topic: {nextTopic.title}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
