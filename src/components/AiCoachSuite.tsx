import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Sliders,
  Copy,
  Check,
  Wand2,
  Globe,
  GraduationCap,
} from 'lucide-react';
import { AppLanguage, TutorLearningMode } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface GrammarError {
  original: string;
  replacement: string;
  category: string;
  severity: 'error' | 'warning' | 'style';
  explanation: string;
}

interface GrammarCheckResult {
  errors: GrammarError[];
  score: number;
  improvedText?: string;
  readabilityNote?: string;
}

interface AiCoachSuiteProps {
  language?: AppLanguage;
}

export const AiCoachSuite: React.FC<AiCoachSuiteProps> = ({ language = 'en' }) => {
  const isHi = language === 'hi';
  const [subTab, setSubTab] = useState<'chat' | 'grammar' | 'tone'>('chat');
  const [learningMode, setLearningMode] = useState<TutorLearningMode>('INTERMEDIATE');
  const [tutorLanguage, setTutorLanguage] = useState<'en' | 'hi' | 'bilingual'>(
    isHi ? 'bilingual' : 'en'
  );

  // Chat State
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant' | 'error'; content: string; time: string }[]
  >([
    {
      role: 'assistant',
      content:
        'Welcome to your **Crafty English AI Tutor**! Select your learning level above (**Beginner**, **Intermediate**, or **Advanced**) and language preference (**English / हिंदी / Bilingual**). Ask me to explain grammar rules, check mistakes, translate English ↔ हिंदी, build vocabulary, practice spoken English, clarify literature concepts, or generate custom quizzes.',
      time: 'Ready',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCoachThinking, setIsCoachThinking] = useState(false);

  // Grammar Checker State
  const [grammarInput, setGrammarInput] = useState(
    'Neither the lecturer nor the candidates was informed about the schedule revision. Everybody should review their syllabus carefully.'
  );
  const [isCheckingGrammar, setIsCheckingGrammar] = useState(false);
  const [grammarResult, setGrammarResult] = useState<GrammarCheckResult | null>(null);
  const [grammarErrorAlert, setGrammarErrorAlert] = useState<string | null>(null);

  // Tone Shifter State
  const [toneInput, setToneInput] = useState(
    'We have to read lots of old plays and poems to clear this hard test. It takes very long but there is no shortcut.'
  );
  const [targetTone, setTargetTone] = useState<string>('Academic Research');
  const [isShiftingTone, setIsShiftingTone] = useState(false);
  const [toneResult, setToneResult] = useState<{
    rewrittenText: string;
    explanation: string;
    keyVocabularyUsed?: string[];
  } | null>(null);
  const [toneErrorAlert, setToneErrorAlert] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const quickPrompts = [
    {
      label: 'Explain Rule (Concord)',
      prompt: 'Explain the Proximity Rule in Subject-Verb Agreement with 5 clear examples and common mistakes.',
    },
    {
      label: 'EN ↔ हिंदी Translation',
      prompt: 'Translate naturally between English and Hindi: "Had she prepared systematically, she would have qualified with distinction." and explain the conditional grammar.',
    },
    {
      label: 'Sentence Analysis',
      prompt: 'Break down the clauses and parts of speech of: "Although it rained heavily, the dedicated scholars completed their revision."',
    },
    {
      label: 'Literary Criticism',
      prompt: 'Summarise T.S. Eliot’s "Tradition and the Individual Talent" for NTA UGC NET Paper 2 revision.',
    },
    {
      label: '5-Question Mini Quiz',
      prompt: 'Create a 5-question practice quiz on Active-Passive Voice and Modals with answers and explanations at the bottom.',
    },
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputMessage).trim();
    if (!textToSend || isCoachThinking) return;

    audioFeedback.playClick();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const updatedMessages = [
      ...messages,
      { role: 'user' as const, content: textToSend, time: timestamp },
    ];
    setMessages(updatedMessages);
    if (!customPrompt) setInputMessage('');
    setIsCoachThinking(true);

    try {
      const apiMessages = updatedMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }));

      const res = await fetch('/api/ai/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: apiMessages,
          learningMode,
          language: tutorLanguage,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `Tutor service returned HTTP ${res.status}`);
      }

      audioFeedback.playSuccess();
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: data.reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      audioFeedback.playError();
      setMessages([
        ...updatedMessages,
        {
          role: 'error',
          content:
            err instanceof Error
              ? err.message
              : 'Unable to reach AI Tutor service right now. Please try again shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsCoachThinking(false);
    }
  };

  const handleCheckGrammar = async () => {
    if (!grammarInput.trim() || isCheckingGrammar) return;
    audioFeedback.playClick();
    setIsCheckingGrammar(true);
    setGrammarErrorAlert(null);

    try {
      const res = await fetch('/api/ai/grammar-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: grammarInput, language: tutorLanguage }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Grammar analysis failed (${res.status})`);
      audioFeedback.playSuccess();
      setGrammarResult(data);
    } catch (err) {
      audioFeedback.playError();
      setGrammarErrorAlert(err instanceof Error ? err.message : 'Unable to analyze grammar.');
    } finally {
      setIsCheckingGrammar(false);
    }
  };

  const handleShiftTone = async () => {
    if (!toneInput.trim() || isShiftingTone) return;
    audioFeedback.playClick();
    setIsShiftingTone(true);
    setToneErrorAlert(null);

    try {
      const res = await fetch('/api/ai/tone-shift', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: toneInput, targetTone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Tone transformation failed (${res.status})`);
      audioFeedback.playSuccess();
      setToneResult(data);
    } catch (err) {
      audioFeedback.playError();
      setToneErrorAlert(err instanceof Error ? err.message : 'Unable to rewrite text tone.');
    } finally {
      setIsShiftingTone(false);
    }
  };

  const handleCopy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Banner Header with Learning Mode + Bilingual Controls */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f2544] to-blue-800 text-white p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>AI English Tutor · Server-Secured Academic Coach</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isHi ? 'AI अंग्रेज़ी शिक्षक, व्याकरण परीक्षक एवं शैली परिशोधक' : 'AI English Tutor, Grammar Diagnostic & Academic Rewriter'}
            </h1>
            <p className="text-sm text-blue-100 max-w-2xl">
              {isHi
                ? 'स्तर चुनें (Beginner / Intermediate / Advanced) और अंग्रेज़ी या हिन्दी में व्याकरण नियम, अनुवाद, त्रुटि सुधार और साहित्य सहायता प्राप्त करें।'
                : 'Adapts explanations across Beginner, Intermediate, and Advanced proficiency levels in English, हिंदी, or Bilingual format.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            {/* Learning Mode Selector */}
            <div className="p-2 rounded-xl bg-white/10 border border-white/15 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> Learning Level
              </div>
              <div className="flex gap-1">
                {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as TutorLearningMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setLearningMode(m)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                      learningMode === m
                        ? 'bg-amber-500 text-[#0a192f]'
                        : 'bg-white/10 text-blue-100 hover:bg-white/20'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Tutor Response Language Selector */}
            <div className="p-2 rounded-xl bg-white/10 border border-white/15 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
                <Globe className="w-3 h-3" /> Tutor Language
              </div>
              <div className="flex gap-1">
                {(
                  [
                    { id: 'en', label: 'English' },
                    { id: 'hi', label: 'हिंदी' },
                    { id: 'bilingual', label: 'Bilingual' },
                  ] as const
                ).map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setTutorLanguage(l.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                      tutorLanguage === l.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 text-blue-100 hover:bg-white/20'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tool Switcher */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/15">
          {[
            { id: 'chat', label: '1. Interactive AI Tutor Chat', icon: Bot },
            { id: 'grammar', label: '2. Deep Grammar Checker', icon: CheckCircle2 },
            { id: 'tone', label: '3. Academic Tone Shifter', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id as 'chat' | 'grammar' | 'tone')}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  subTab === tab.id
                    ? 'bg-white text-[#0a192f]'
                    : 'bg-white/10 text-blue-100 hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-tab 1: Tutor Chat */}
      {subTab === 'chat' && (
        <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-blue-100 dark:border-blue-900 bg-blue-50/60 dark:bg-[#0a192f] flex flex-wrap gap-2">
            {quickPrompts.map((qp) => (
              <button
                key={qp.label}
                onClick={() => handleSendMessage(qp.prompt)}
                disabled={isCoachThinking}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-800 dark:text-amber-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer"
              >
                {qp.label}
              </button>
            ))}
          </div>

          <div className="h-[420px] overflow-y-auto p-5 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#0a192f] dark:bg-blue-700 text-white'
                      : msg.role === 'error'
                      ? 'bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      : 'bg-blue-50/70 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {msg.role === 'error' && (
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>AI Service Notice</span>
                    </div>
                  )}
                  <div>{msg.content}</div>
                  <div className="text-[10px] opacity-65 mt-1 text-right">{msg.time}</div>
                </div>
              </div>
            ))}
            {isCoachThinking && (
              <div className="text-xs font-semibold text-blue-700 dark:text-amber-300">
                Crafty Coach ({learningMode}) is preparing your response...
              </div>
            )}
          </div>

          <div className="p-4 border-t border-blue-100 dark:border-blue-900 flex gap-2 bg-white dark:bg-[#0d1d36]">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask any grammar question, translation, spoken English phrase, or NET topic..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isCoachThinking || !inputMessage.trim()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Grammar Checker */}
      {subTab === 'grammar' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white">
              Submit Draft for Grammatical Audit
            </h2>
            <textarea
              rows={8}
              value={grammarInput}
              onChange={(e) => setGrammarInput(e.target.value)}
              className="w-full p-3.5 rounded-xl text-sm bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={handleCheckGrammar}
              disabled={isCheckingGrammar}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a192f] dark:bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold disabled:opacity-50 cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              <span>{isCheckingGrammar ? 'Analyzing...' : 'Run Grammar Diagnostic'}</span>
            </button>

            {grammarErrorAlert && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{grammarErrorAlert}</span>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white">
              Diagnostic Report
            </h2>
            {!grammarResult ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Click "Run Grammar Diagnostic" to inspect concord, tense, punctuation, and clarity suggestions.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-blue-50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800">
                  <span className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300">
                    Grammatical Accuracy Score
                  </span>
                  <span className="text-2xl font-extrabold text-blue-700 dark:text-amber-400">
                    {grammarResult.score}%
                  </span>
                </div>
                {grammarResult.improvedText && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-sm text-emerald-950 dark:text-emerald-100">
                    <div className="text-xs font-bold uppercase mb-1">Polished Revision:</div>
                    {grammarResult.improvedText}
                  </div>
                )}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {grammarResult.errors.map((err, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-xs space-y-1"
                    >
                      <div>
                        <span className="line-through text-rose-600 dark:text-rose-400 font-semibold">
                          {err.original}
                        </span>{' '}
                        →{' '}
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                          {err.replacement}
                        </span>{' '}
                        <span className="text-slate-500">({err.category})</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{err.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sub-tab 3: Tone Shifter */}
      {subTab === 'tone' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white">
              Input Passage &amp; Target Register
            </h2>
            <textarea
              rows={6}
              value={toneInput}
              onChange={(e) => setToneInput(e.target.value)}
              className="w-full p-3.5 rounded-xl text-sm bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
            />
            <div className="flex flex-wrap gap-2">
              {['Academic Research', 'Formal Official Letter', 'Concise Editorial', 'Literary Critique'].map(
                (tone) => (
                  <button
                    key={tone}
                    onClick={() => setTargetTone(tone)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                      targetTone === tone
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-50 dark:bg-[#0a192f] text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    {tone}
                  </button>
                )
              )}
            </div>
            <button
              onClick={handleShiftTone}
              disabled={isShiftingTone}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isShiftingTone ? 'Rewriting...' : `Transform to ${targetTone}`}</span>
            </button>
            {toneErrorAlert && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200">
                {toneErrorAlert}
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-extrabold text-[#0a192f] dark:text-white">
                Rewritten Academic Output
              </h2>
              {toneResult && (
                <button
                  onClick={() => handleCopy(toneResult.rewrittenText)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-amber-400 cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>
            {!toneResult ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Select a target academic or formal register and rewrite your sentence naturally.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-sm text-slate-900 dark:text-white leading-relaxed">
                  {toneResult.rewrittenText}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">{toneResult.explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
