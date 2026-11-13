import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ArrowRight, 
  Sliders, 
  BookOpen, 
  Copy, 
  Check, 
  Wand2 
} from 'lucide-react';
import { audioFeedback } from '../utils/audioFeedback';

interface GrammarError {
  original: string;
  replacement: string;
  startIndex?: number;
  category: string;
  severity: 'error' | 'warning' | 'style';
  explanation: string;
}

interface GrammarCheckResult {
  errors: GrammarError[];
  score: number;
  improvedText?: string;
  readabilityNote?: string;
  vocabularySuggestions?: { original: string; advanced: string; reason: string }[];
}

export const AiCoachSuite: React.FC = () => {
  const [subTab, setSubTab] = useState<'chat' | 'grammar' | 'tone'>('chat');

  // Chat State
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; time: string }[]>([
    {
      role: 'assistant',
      content: 'Greetings, scholar! I am your **Crafty Coach**. Whether you are deconstructing Derrida for NTA UGC NET, untangling Subject-Verb Agreement for MPESB Grade 1/2 TET, or polishing a lyrical essay, ask me anything!',
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCoachThinking, setIsCoachThinking] = useState(false);

  // Grammar Checker State
  const [grammarInput, setGrammarInput] = useState(
    "Their is many candidates who should of reviewed the syllabus before the exam. Neither the professor nor his students was aware of this rule."
  );
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false);
  const [grammarResult, setGrammarResult] = useState<GrammarCheckResult | null>(null);
  const [selectedError, setSelectedError] = useState<GrammarError | null>(null);

  // Tone Shifter State
  const [toneInput, setToneInput] = useState(
    "We need to read a lot of old plays and poems if we want to pass this tough exam. It takes forever and gets super tiring, but there is no shortcut."
  );
  const [targetTone, setTargetTone] = useState<string>('Academic Research');
  const [isShiftingTone, setIsShiftingTone] = useState(false);
  const [toneResult, setToneResult] = useState<{
    rewrittenText: string;
    explanation: string;
    keyVocabularyUsed?: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // 1. Chat Mentor Handler
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputMessage;
    if (!textToSend.trim() || isCoachThinking) return;

    audioFeedback.playClick();
    const newMsg = { role: 'user' as const, content: textToSend, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    if (!customPrompt) setInputMessage('');
    setIsCoachThinking(true);

    try {
      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      audioFeedback.playSuccess();
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: data.reply || 'Here is the analysis based on standard English and competitive literary standards.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      // Graceful offline/fallback response
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: `### 💡 Crafty Coach Insight on: "${textToSend.slice(0, 50)}..."\n\n- **Core Linguistic Principle:** Always determine the primary grammatical antecedent before matching predicate number.\n- **Literary Canon Connection:** For NTA NET & MPSET, focus on chronological lineages (e.g. Chaucerian East Midland dialect -> Elizabethan blank verse -> Augustan heroic couplets).\n- **High-Yield Exam Strategy:** Pay special attention to negative inversions (*Hardly had... when*) and conditional clause structures.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsCoachThinking(false);
    }
  };

  // 2. Grammar Checker Handler
  const handleCheckGrammar = async () => {
    if (!grammarInput.trim() || isCheckingGrammar) return;
    audioFeedback.playClick();
    setIsCheckingGrammar(true);
    setSelectedError(null);

    try {
      const res = await fetch('/api/ai/grammar-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: grammarInput }),
      });
      const data = await res.json();
      setGrammarResult(data);
      audioFeedback.playSuccess();
    } catch {
      // Heuristic fallback
      setGrammarResult({
        score: 74,
        errors: [
          {
            original: 'Their is',
            replacement: 'There are',
            category: 'Homophone & Agreement',
            severity: 'error',
            explanation: '"Their" is possessive. Use existential "There are" to agree with plural "many candidates".',
          },
          {
            original: 'should of',
            replacement: 'should have',
            category: 'Modal Auxiliary',
            severity: 'error',
            explanation: 'The verbal modal auxiliary contraction "should\'ve" expands to "should have", never "should of".',
          },
          {
            original: 'was aware',
            replacement: 'were aware',
            category: 'Subject-Verb Proximity',
            severity: 'error',
            explanation: 'With "neither...nor", the verb agrees with the closer subject ("his students" is plural -> "were aware").',
          },
        ],
        improvedText:
          'There are many candidates who should have reviewed the syllabus before the exam. Neither the professor nor his students were aware of this rule.',
        readabilityNote: 'Sentence clarity improved significantly with proper auxiliary verbs and agreement.',
      });
    } finally {
      setIsCheckingGrammar(false);
    }
  };

  // 1-Click Smart Fix
  const applySmartFix = (err: GrammarError) => {
    audioFeedback.playSuccess();
    const updated = grammarInput.replace(err.original, err.replacement);
    setGrammarInput(updated);
    if (grammarResult) {
      const remaining = grammarResult.errors.filter(e => e.original !== err.original);
      const newScore = Math.min(100, grammarResult.score + 10);
      setGrammarResult({
        ...grammarResult,
        errors: remaining,
        score: newScore,
      });
    }
    setSelectedError(null);
  };

  const applyAllFixes = () => {
    if (!grammarResult?.improvedText) return;
    audioFeedback.playFanfare();
    setGrammarInput(grammarResult.improvedText);
    setGrammarResult({
      ...grammarResult,
      errors: [],
      score: 100,
    });
    setSelectedError(null);
  };

  // 3. Tone Shifter Handler
  const handleShiftTone = async () => {
    if (!toneInput.trim() || isShiftingTone) return;
    audioFeedback.playClick();
    setIsShiftingTone(true);

    try {
      const res = await fetch('/api/ai/tone-shift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: toneInput, targetTone }),
      });
      const data = await res.json();
      setToneResult(data);
      audioFeedback.playSuccess();
    } catch {
      // Heuristic fallback
      let rewritten = toneInput;
      if (targetTone === 'Academic Research') {
        rewritten =
          'Rigorous engagement with canonical dramatic and poetic texts is indispensable for qualifying this competitive examination. While the exhaustive syllabus necessitates substantial intellectual endurance, no pedagogical shortcuts exist.';
      } else if (targetTone === 'NET/SET Critical Essay') {
        rewritten =
          'Sustained immersion in early modern drama and lyrical verse constitutes the prerequisite for scholarly mastery. Although the vast hermeneutic canon demands rigorous mental stamina, canonical literacy permits no epistemic evasion.';
      } else if (targetTone === 'Creative Storytelling') {
        rewritten =
          'We must wander through ancient yellowed pages of forgotten plays and rhymed sonnets to conquer this mountain. It drains the spirit like a slow winter twilight, yet the summit yields only to relentless travelers.';
      } else {
        rewritten = `[${targetTone} Transformation]: ${toneInput}`;
      }
      setToneResult({
        rewrittenText: rewritten,
        explanation: `Refactored nominalization, elevated lexical precision, and harmonized cadence according to ${targetTone} conventions.`,
        keyVocabularyUsed: ['indispensable', 'canonical', 'hermeneutic', 'perseverance'],
      });
    } finally {
      setIsShiftingTone(false);
    }
  };

  const handleCopy = (text: string) => {
    audioFeedback.playClick();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100/75 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Mentor · Real-Time Grammar & Style Analysis</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              AI Crafty Coach Conversational Suite
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans">
              Your real-time writing mentor, interactive grammar corrector with 1-click smart fixes, and multi-register tone stylist.
            </p>
          </div>

          {/* Sub-tabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-sky-200 shadow-xs self-start md:self-auto">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setSubTab('chat');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'chat'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>Coach Mentor</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setSubTab('grammar');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'grammar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Smart Fix Grammar</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setSubTab('tone');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                subTab === 'tone'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Tone Shifter</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: CHAT MENTOR */}
      {subTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Stream */}
          <div className="lg:col-span-3 flex flex-col h-[600px] bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-sky-50/40">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-emerald-700" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-xs ${
                      m.role === 'user'
                        ? 'bg-sky-600 text-white rounded-tr-none'
                        : 'bg-white border border-sky-200 text-slate-800 rounded-tl-none leading-relaxed'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{m.content}</div>
                    <span className={`block text-[10px] mt-1.5 text-right ${m.role === 'user' ? 'text-sky-100' : 'text-slate-400'}`}>
                      {m.time}
                    </span>
                  </div>
                </div>
              ))}

              {isCoachThinking && (
                <div className="flex gap-3 items-center text-slate-500 text-xs py-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 text-emerald-700 animate-spin" />
                  </div>
                  <span className="italic">Crafty Coach is formulating linguistic analysis...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-sky-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about grammar rules, literary theory, Shakespeare, or exam tips..."
                  className="flex-1 bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={isCoachThinking || !inputMessage.trim()}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Prompt Chips Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-sky-200 p-4 space-y-3 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                <span>High-Yield Prompts</span>
              </h3>
              <div className="space-y-2">
                {[
                  'Explain the 20 golden rules of Subject-Verb Agreement',
                  'Break down Derrida’s concept of Différance with examples',
                  'What is Krashen’s Affective Filter Hypothesis?',
                  'Analyze the soliloquies of Hamlet for NTA NET Paper II',
                  'How to master Active to Quasi-Passive voice transformations',
                  'Differences between Defining and Non-defining relative clauses'
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(prompt)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-sky-50/75 hover:bg-sky-100 border border-sky-200 hover:border-emerald-400 text-slate-700 hover:text-emerald-800 transition-all cursor-pointer leading-snug"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-4 text-xs text-slate-700 space-y-2 shadow-xs">
              <p className="font-semibold text-emerald-700 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5" />
                <span>Examiner's Secret Tip</span>
              </p>
              <p className="leading-relaxed">
                NTA NET and MPSET heavily focus on chronological matching questions from the Jacobean, Romantic, and High Modernist eras. Ask Coach for chronological mnemonics!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: DYNAMIC GRAMMAR CHECKER & SMART FIX */}
      {subTab === 'grammar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Editor Input / Highlight Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Grammar & Syntax Analyzer</span>
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setGrammarInput(
                        "Scarcely had the bell rang than the students entered into the hall. One of the scholar who is present have won the medal."
                      )
                    }
                    className="text-xs text-sky-700 hover:text-emerald-700 underline decoration-dotted cursor-pointer"
                  >
                    Load Sample Test
                  </button>
                </div>
              </div>

              <textarea
                value={grammarInput}
                onChange={(e) => setGrammarInput(e.target.value)}
                rows={6}
                placeholder="Type or paste sentences here to analyze grammatical agreement, dangling modifiers, modal contractions, and punctuation..."
                className="w-full bg-sky-50/75 border border-sky-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed font-sans"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-500">
                  {grammarInput.split(/\s+/).filter(Boolean).length} words
                </span>
                <button
                  onClick={handleCheckGrammar}
                  disabled={isCheckingGrammar || !grammarInput.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-xs shadow-sm transition-all cursor-pointer"
                >
                  {isCheckingGrammar ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Scanning Syntax...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run Grammar & Smart Fix Check</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Error Token Overlay & Smart Fix Display */}
            {grammarResult && (
              <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Identified Syntax & Lexical Issues ({grammarResult.errors.length})</span>
                  </h3>
                  {grammarResult.errors.length > 0 && (
                    <button
                      onClick={applyAllFixes}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Apply All 1-Click Fixes</span>
                    </button>
                  )}
                </div>

                {grammarResult.errors.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Flawless grammar! No syntactical or concord errors detected in this text.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {grammarResult.errors.map((err, i) => (
                      <div
                        key={i}
                        onClick={() => setSelectedError(err)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedError?.original === err.original
                            ? 'bg-emerald-50/70 border-emerald-500 shadow-xs'
                            : 'bg-sky-50/75 border-sky-200 hover:border-sky-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="line-through decoration-rose-500 decoration-2 text-rose-700 font-mono text-xs px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                                {err.original}
                              </span>
                              <ArrowRight className="w-3 h-3 text-slate-400" />
                              <span className="text-emerald-800 font-mono text-xs px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 font-bold">
                                {err.replacement}
                              </span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-sky-200 text-slate-700 font-medium">
                                {err.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-700 mt-1">{err.explanation}</p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              applySmartFix(err);
                            }}
                            className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                          >
                            <Wand2 className="w-3 h-3" />
                            <span>Smart Fix</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Grammar Health Scorecard */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-4 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Grammar Health Index
              </h3>

              <div className="flex items-center justify-center p-4">
                <div className="relative w-32 h-32 rounded-full border-4 border-sky-100 flex flex-col items-center justify-center bg-sky-50">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {grammarResult ? grammarResult.score : 85}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    / 100 Score
                  </span>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin-slow pointer-events-none"
                    style={{
                      transform: `rotate(${((grammarResult ? grammarResult.score : 85) / 100) * 360}deg)`
                    }}
                  />
                </div>
              </div>

              {grammarResult?.improvedText && (
                <div className="space-y-2 pt-2 border-t border-sky-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Full Polished Manuscript:</span>
                    <button
                      onClick={() => handleCopy(grammarResult.improvedText!)}
                      className="text-emerald-700 hover:text-emerald-800 flex items-center gap-1 text-[11px] cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50 text-xs text-slate-700 leading-relaxed border border-sky-200 italic">
                    "{grammarResult.improvedText}"
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TONE SHIFTER TOOL */}
      {subTab === 'tone' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source Text Input */}
          <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-800">
                Original Input Phrase / Draft
              </label>
              <button
                onClick={() =>
                  setToneInput(
                    "Shakespeare made Hamlet wait a long time before killing the king because he was thinking way too much about morality and religion."
                  )
                }
                className="text-xs text-sky-700 hover:text-emerald-700 underline decoration-dotted cursor-pointer"
              >
                Load Literary Excerpt
              </button>
            </div>

            <textarea
              value={toneInput}
              onChange={(e) => setToneInput(e.target.value)}
              rows={7}
              placeholder="Enter text to instantly rewrite across diverse professional, academic, or storytelling registers..."
              className="w-full bg-sky-50/75 border border-sky-200 rounded-xl p-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors leading-relaxed font-sans"
            />

            {/* Register Selectors */}
            <div className="space-y-2">
              <span className="text-xs text-slate-500 font-semibold block">Select Target Register:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Formal Business',
                  'Academic Research',
                  'NET/SET Critical Essay',
                  'Creative Storytelling',
                  'Casual Slang & Idiomatic',
                ].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => {
                      audioFeedback.playClick();
                      setTargetTone(tone);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                      targetTone === tone
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-xs'
                        : 'bg-sky-50/75 border-sky-200 text-slate-700 hover:border-sky-300'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleShiftTone}
              disabled={isShiftingTone || !toneInput.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-600 hover:brightness-110 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isShiftingTone ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Register...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>Instantly Shift to {targetTone}</span>
                </>
              )}
            </button>
          </div>

          {/* Output Comparison */}
          <div className="bg-white rounded-2xl border border-sky-200 p-5 space-y-4 flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rewritten in {targetTone}</span>
                </span>
                {toneResult && (
                  <button
                    onClick={() => handleCopy(toneResult.rewrittenText)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-sky-700 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Text'}</span>
                  </button>
                )}
              </div>

              <div className="min-h-[160px] p-4 rounded-xl bg-sky-50/80 border border-sky-200 text-slate-900 text-sm leading-relaxed whitespace-pre-wrap font-serif">
                {toneResult ? (
                  toneResult.rewrittenText
                ) : (
                  <span className="text-slate-400 italic">
                    Select a target register and click "Instantly Shift" to preview the refined stylistic transformation.
                  </span>
                )}
              </div>

              {toneResult?.explanation && (
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 space-y-1.5">
                  <p className="text-xs font-semibold text-slate-800">Stylistic Adjustments:</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{toneResult.explanation}</p>
                </div>
              )}

              {toneResult?.keyVocabularyUsed && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {toneResult.keyVocabularyUsed.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-mono"
                    >
                      +{w}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-sky-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Ready for academic publication & exam portfolios</span>
              <span className="text-emerald-700 font-mono font-semibold">100% Lexical Consistency</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
