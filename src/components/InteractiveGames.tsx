import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Lightbulb, 
  Award, 
  BookOpen, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { IDIOM_CHALLENGES, SYNTAX_PUZZLES } from '../data/idiomsAndSyntax';
import { IdiomChallenge, SyntaxPuzzle } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface InteractiveGamesProps {
  onAddXP: (xp: number) => void;
}

export const InteractiveGames: React.FC<InteractiveGamesProps> = ({ onAddXP }) => {
  const [activeGame, setActiveGame] = useState<'idiom' | 'syntax'>('idiom');

  // Idiom Game State
  const [idiomIndex, setIdiomIndex] = useState(0);
  const [selectedIdiomOption, setSelectedIdiomOption] = useState<string | null>(null);
  const [idiomSubmitted, setIdiomSubmitted] = useState(false);
  const [idiomScore, setIdiomScore] = useState(0);

  const currentIdiom: IdiomChallenge = IDIOM_CHALLENGES[idiomIndex] || IDIOM_CHALLENGES[0];
  const idiomChoices = [currentIdiom.blankWord, ...currentIdiom.distractors].sort();

  // Syntax Game State
  const [syntaxLevelIndex, setSyntaxLevelIndex] = useState(0);
  const currentSyntax: SyntaxPuzzle = SYNTAX_PUZZLES[syntaxLevelIndex] || SYNTAX_PUZZLES[0];
  const [selectedTokens, setSelectedTokens] = useState<typeof currentSyntax.scrambledTokens>([]);
  const [availableTokens, setAvailableTokens] = useState<typeof currentSyntax.scrambledTokens>(
    currentSyntax.scrambledTokens
  );
  const [syntaxChecked, setSyntaxChecked] = useState(false);
  const [isSyntaxCorrect, setIsSyntaxCorrect] = useState(false);

  // Idiom Handler
  const handleSelectIdiom = (choice: string) => {
    if (idiomSubmitted) return;
    audioFeedback.playClick();
    setSelectedIdiomOption(choice);
    setIdiomSubmitted(true);

    if (choice === currentIdiom.blankWord) {
      audioFeedback.playSuccess();
      setIdiomScore((prev) => prev + 1);
      onAddXP(30);
    } else {
      audioFeedback.playCardFlip();
    }
  };

  const handleNextIdiom = () => {
    audioFeedback.playClick();
    setSelectedIdiomOption(null);
    setIdiomSubmitted(false);
    if (idiomIndex < IDIOM_CHALLENGES.length - 1) {
      setIdiomIndex((prev) => prev + 1);
    } else {
      setIdiomIndex(0);
    }
  };

  // Syntax Puzzle Handler
  const handleAddTokenToSentence = (token: typeof currentSyntax.scrambledTokens[0]) => {
    audioFeedback.playClick();
    setSelectedTokens([...selectedTokens, token]);
    setAvailableTokens(availableTokens.filter((t) => t.id !== token.id));
    setSyntaxChecked(false);
  };

  const handleRemoveToken = (token: typeof currentSyntax.scrambledTokens[0]) => {
    audioFeedback.playClick();
    setSelectedTokens(selectedTokens.filter((t) => t.id !== token.id));
    setAvailableTokens([...availableTokens, token]);
    setSyntaxChecked(false);
  };

  const handleResetSyntax = () => {
    audioFeedback.playClick();
    setSelectedTokens([]);
    setAvailableTokens(currentSyntax.scrambledTokens);
    setSyntaxChecked(false);
  };

  const handleVerifySyntax = () => {
    const constructed = selectedTokens.map((t) => t.text).join(' ');
    const correct = constructed.trim() === currentSyntax.targetSentence.trim();

    setSyntaxChecked(true);
    setIsSyntaxCorrect(correct);

    if (correct) {
      audioFeedback.playFanfare();
      confetti({ particleCount: 80, spread: 60 });
      onAddXP(50);
    } else {
      audioFeedback.playCardFlip();
    }
  };

  const handleNextSyntaxLevel = () => {
    audioFeedback.playClick();
    const nextIdx = (syntaxLevelIndex + 1) % SYNTAX_PUZZLES.length;
    setSyntaxLevelIndex(nextIdx);
    const nextPuzzle = SYNTAX_PUZZLES[nextIdx];
    setSelectedTokens([]);
    setAvailableTokens(nextPuzzle.scrambledTokens);
    setSyntaxChecked(false);
    setIsSyntaxCorrect(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Subject':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'Verb':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Object':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Modifier':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Conjunction':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100/70 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Word Craft · Interactive Workshops</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Idiom Builder & Syntax Puzzles
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans">
              Engage your grammatical reflexes with interactive phrase-slotting and clause restructuring games designed to hone deep syntactical intuition.
            </p>
          </div>

          {/* Game Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-sky-200 shadow-sm">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setActiveGame('idiom');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeGame === 'idiom'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              Idiom & Metaphor Builder
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setActiveGame('syntax');
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeGame === 'syntax'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              Syntax Puzzles (POS Coloring)
            </button>
          </div>
        </div>
      </div>

      {/* GAME 1: IDIOM & METAPHOR BUILDER */}
      {activeGame === 'idiom' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-sky-200 p-6 sm:p-8 space-y-6 shadow-md">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-sky-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Challenge {idiomIndex + 1} of {IDIOM_CHALLENGES.length}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Score:</span>
                <span className="text-sm font-bold text-sky-700 font-mono">
                  {idiomScore} / {IDIOM_CHALLENGES.length}
                </span>
              </div>
            </div>

            {/* Context Sentence with Blank Slot */}
            <div className="p-6 rounded-2xl bg-sky-50/75 border border-sky-200 text-center space-y-3">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 block">
                Complete the Contextual Passage:
              </span>
              <p className="font-editorial text-xl sm:text-2xl text-slate-900 leading-relaxed">
                {currentIdiom.incompleteSentence.split('_____')[0]}
                <span className="inline-block min-w-[140px] px-3 py-1 mx-1.5 rounded-lg border-2 border-dashed border-sky-500 bg-white text-sky-700 font-mono text-base font-bold">
                  {selectedIdiomOption || '_____ ? _____'}
                </span>
                {currentIdiom.incompleteSentence.split('_____')[1]}
              </p>
            </div>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {idiomChoices.map((choice, idx) => {
                const isSelected = selectedIdiomOption === choice;
                const isCorrect = choice === currentIdiom.blankWord;

                let style =
                  'bg-white border-sky-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50';

                if (idiomSubmitted) {
                  if (isCorrect) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-50 border-rose-500 text-rose-900';
                  }
                } else if (isSelected) {
                  style = 'bg-sky-100 border-sky-600 text-sky-950';
                }

                return (
                  <button
                    key={idx}
                    disabled={idiomSubmitted}
                    onClick={() => handleSelectIdiom(choice)}
                    className={`p-4 rounded-xl border text-sm font-medium transition-all text-left flex items-center justify-between cursor-pointer ${style}`}
                  >
                    <span>{choice}</span>
                    {idiomSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {idiomSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Revealed Origin and Meaning */}
            {idiomSubmitted && (
              <div className="p-5 rounded-2xl bg-sky-50/75 border border-sky-200 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-2">
                  {selectedIdiomOption === currentIdiom.blankWord ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Brilliant! Idiom identified correctly (+30 XP)</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4" />
                      <span>Incorrect! The correct idiom is "{currentIdiom.blankWord}"</span>
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <p>
                    <strong className="text-slate-900">Meaning:</strong> {currentIdiom.meaning}
                  </p>
                  <p className="text-slate-600">
                    <strong className="text-sky-700">Fascinating Historical Origin:</strong>{' '}
                    {currentIdiom.origin}
                  </p>
                </div>

                <button
                  onClick={handleNextIdiom}
                  className="w-full mt-2 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Next Idiom Challenge</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* GAME 2: SYNTAX PUZZLES & COLOR-CODING */}
      {activeGame === 'syntax' && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-3xl border border-sky-200 p-6 sm:p-8 space-y-6 shadow-md">
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-sky-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Level {currentSyntax.level} Syntactic Construction</span>
              </span>
              <button
                onClick={handleResetSyntax}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-sky-800 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Sentence</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentSyntax.instruction}
            </p>

            {/* Target Assembly Canvas */}
            <div className="min-h-[120px] p-4 rounded-2xl bg-sky-50/75 border-2 border-dashed border-sky-300 flex flex-wrap items-center gap-2.5">
              {selectedTokens.length === 0 ? (
                <span className="text-xs text-slate-500 italic mx-auto">
                  Click tokens from the palette below to build the syntactic clause in sequence...
                </span>
              ) : (
                selectedTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => handleRemoveToken(token)}
                    title="Click to remove from sentence"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-transform hover:scale-95 cursor-pointer ${getRoleBadgeColor(
                      token.role
                    )}`}
                  >
                    <span>{token.text}</span>
                    <span className="text-[9px] opacity-80 uppercase">({token.role})</span>
                  </button>
                ))
              )}
            </div>

            {/* Available Tokens Palette */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                Available Scrambled Tokens:
              </span>
              <div className="flex flex-wrap gap-2">
                {availableTokens.map((token) => (
                  <button
                    key={token.id}
                    onClick={() => handleAddTokenToSentence(token)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold shadow-sm hover:brightness-95 active:scale-95 transition-all cursor-pointer ${getRoleBadgeColor(
                      token.role
                    )}`}
                  >
                    <span>{token.text}</span>
                    <span className="text-[9px] opacity-80 uppercase">({token.role})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Verification Button */}
            <div className="flex items-center justify-between pt-4 border-t border-sky-100">
              <button
                onClick={handleVerifySyntax}
                disabled={availableTokens.length > 0}
                className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
              >
                Verify Sentence Syntax
              </button>

              {syntaxChecked && isSyntaxCorrect && (
                <button
                  onClick={handleNextSyntaxLevel}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <span>Advance to Next Puzzle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Check Feedback */}
            {syntaxChecked && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 animate-in fade-in ${
                  isSyntaxCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold">
                  {isSyntaxCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Syntactic Structure Perfect! (+50 XP)</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Incorrect Word Order! Check modifier placement.</span>
                    </>
                  )}
                </div>
                <p className="font-sans leading-relaxed text-slate-700">
                  {currentSyntax.syntaxNote}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
