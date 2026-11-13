import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  Volume2, 
  Sparkles, 
  Check, 
  Clock, 
  BookOpen, 
  Search, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { VocabWord } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface VocabularyForgeProps {
  onAddXP: (xp: number) => void;
}

export const VocabularyForge: React.FC<VocabularyForgeProps> = ({ onAddXP }) => {
  const [cards, setCards] = useState<VocabWord[]>(VOCABULARY_LIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'learning' | 'mastered'>('all');

  const filteredCards = cards.filter((c) => {
    const matchesFilter = filterStatus === 'all' || c.status === filterStatus;
    const matchesSearch =
      c.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const currentCard: VocabWord = filteredCards[currentIndex] || cards[0];

  const handleFlip = () => {
    audioFeedback.playCardFlip();
    setIsFlipped(!isFlipped);
  };

  const handlePronounce = (word: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.85;
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSRSResponse = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    audioFeedback.playClick();
    onAddXP(15);

    // Calculate new interval
    let nextStatus: 'new' | 'learning' | 'mastered' = currentCard.status;
    let nextInterval = currentCard.interval;

    if (rating === 'again') {
      nextStatus = 'learning';
      nextInterval = 1;
    } else if (rating === 'hard') {
      nextStatus = 'learning';
      nextInterval = Math.max(1, Math.round(currentCard.interval * 1.2));
    } else if (rating === 'good') {
      nextStatus = currentCard.repetitions >= 2 ? 'mastered' : 'learning';
      nextInterval = Math.round(currentCard.interval * 2.2);
    } else if (rating === 'easy') {
      nextStatus = 'mastered';
      nextInterval = Math.round(currentCard.interval * 3.5);
    }

    const updated = cards.map((c) =>
      c.id === currentCard.id
        ? {
            ...c,
            status: nextStatus,
            interval: nextInterval,
            repetitions: c.repetitions + 1,
            dueDate: new Date(Date.now() + nextInterval * 24 * 60 * 60 * 1000).toISOString(),
          }
        : c
    );

    setCards(updated);
    setIsFlipped(false);

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Retention counts
  const masteredCount = cards.filter((c) => c.status === 'mastered').length;
  const learningCount = cards.filter((c) => c.status === 'learning').length;
  const newCount = cards.filter((c) => c.status === 'new').length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100/70 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              <span>Spaced Repetition · SuperMemo-2</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Vocabulary Forge
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans">
              Master high-yield literary lexicon, rare terminology, rhetorical tropes, and pedagogical jargon with timed memory intervals and native audio synthesis.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-2">
            <div className="p-3 rounded-xl bg-white border border-sky-200 text-center min-w-[72px] shadow-sm">
              <span className="text-[10px] text-slate-500 block font-semibold">Mastered</span>
              <span className="text-lg font-bold text-emerald-600">{masteredCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-sky-200 text-center min-w-[72px] shadow-sm">
              <span className="text-[10px] text-slate-500 block font-semibold">Learning</span>
              <span className="text-lg font-bold text-amber-600">{learningCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-sky-200 text-center min-w-[72px] shadow-sm">
              <span className="text-[10px] text-slate-500 block font-semibold">New</span>
              <span className="text-lg font-bold text-sky-600">{newCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-sky-200 shadow-sm">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'new', 'learning', 'mastered'] as const).map((status) => (
            <button
              key={status}
              onClick={() => {
                audioFeedback.playClick();
                setFilterStatus(status);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-900 hover:bg-sky-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            placeholder="Search words, roots..."
            className="bg-sky-50/70 border border-sky-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 sm:w-60"
          />
        </div>
      </div>

      {/* 3D Flashcard Display */}
      {filteredCards.length > 0 ? (
        <div className="max-w-2xl mx-auto space-y-6">
          <div
            onClick={handleFlip}
            className="min-h-[380px] bg-white rounded-3xl border border-sky-200 p-8 flex flex-col justify-between shadow-lg shadow-sky-900/5 relative cursor-pointer hover:border-sky-400 transition-all group"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200 uppercase tracking-wider">
                {currentCard.partOfSpeech} • Interval: {currentCard.interval}d
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePronounce(currentCard.word);
                  }}
                  title="Pronounce with British accent"
                  className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-xs text-slate-500 font-mono">
                  {currentIndex + 1} / {filteredCards.length}
                </span>
              </div>
            </div>

            {/* Front vs Back Content */}
            {!isFlipped ? (
              <div className="text-center py-10 space-y-3 my-auto">
                <h2 className="font-editorial text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-wide">
                  {currentCard.word}
                </h2>
                <p className="text-sm font-mono text-sky-700">{currentCard.phonetic}</p>
                <p className="text-xs text-slate-500 pt-4 flex items-center justify-center gap-1">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Click card to reveal definition, etymology & context</span>
                </p>
              </div>
            ) : (
              <div className="space-y-4 my-auto animate-in fade-in zoom-in-95">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-slate-900">
                    {currentCard.word}
                  </h3>
                  <p className="text-xs font-mono text-sky-700">{currentCard.phonetic}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-sky-50/75 border border-sky-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800">
                    Definition
                  </span>
                  <p className="text-sm text-slate-800 leading-relaxed font-sans">
                    {currentCard.definition}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                    Contextual Literature Example
                  </span>
                  <p className="text-xs text-slate-700 italic font-serif">
                    "{currentCard.contextSentence}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-slate-500 font-semibold block text-[10px]">Synonyms:</span>
                    <span className="text-slate-800 text-xs">
                      {currentCard.synonyms.slice(0, 3).join(', ')}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200">
                    <span className="text-slate-500 font-semibold block text-[10px]">Etymology:</span>
                    <span className="text-slate-800 text-[11px] leading-tight line-clamp-2">
                      {currentCard.etymology}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] text-amber-700 font-mono font-semibold">
                  Exam Focus: {currentCard.examRelevance}
                </div>
              </div>
            )}

            {/* Bottom Flip Reminder */}
            <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
              <span>Spaced Repetition Flashcard</span>
              <span className="text-sky-700 font-semibold">Click to flip</span>
            </div>
          </div>

          {/* Spaced Repetition Ease Rating Buttons (Active when flipped) */}
          {isFlipped ? (
            <div className="grid grid-cols-4 gap-2 sm:gap-3 animate-in fade-in">
              <button
                onClick={() => handleSRSResponse('again')}
                className="p-3 rounded-xl bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>Again</span>
                <span className="text-[10px] text-rose-600">1 Day</span>
              </button>
              <button
                onClick={() => handleSRSResponse('hard')}
                className="p-3 rounded-xl bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 font-semibold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>Hard</span>
                <span className="text-[10px] text-amber-700">2-3 Days</span>
              </button>
              <button
                onClick={() => handleSRSResponse('good')}
                className="p-3 rounded-xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-800 font-semibold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>Good</span>
                <span className="text-[10px] text-sky-700">5 Days</span>
              </button>
              <button
                onClick={() => handleSRSResponse('easy')}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-all flex flex-col items-center gap-1 cursor-pointer"
              >
                <span>Easy</span>
                <span className="text-[10px] text-emerald-700">8+ Days</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={handleFlip}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-md shadow-sky-600/20 transition-all cursor-pointer"
              >
                Show Card Answer & Details
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-sky-200">
          <p className="text-slate-600 text-sm">No vocabulary words matching your query.</p>
        </div>
      )}
    </div>
  );
};
