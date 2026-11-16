import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Award,
  Sparkles,
  Volume2,
  AlertTriangle,
  Bookmark,
  Globe,
  Layers,
  ListChecks,
  GraduationCap,
  GitBranch,
  Target,
} from 'lucide-react';
import { AppLanguage, GrammarLevelNumber } from '../types';
import { GRAMMAR_CURRICULUM_37, LEVEL_DEFINITIONS } from '../data/grammar37';
import { GRAMMAR_TOPICS } from '../data/grammarTopics';
import { audioFeedback } from '../utils/audioFeedback';
import { GrammarVisualLab } from './GrammarVisualLab';
import { PracticeEngine15 } from './PracticeEngine15';
import { useAuth } from '../context/AuthContext';
import {
  saveStudentModuleProgress,
  toggleBookmarkInFirestore,
  updateUserStatsInFirestore,
} from '../utils/firestoreDataService';

interface GrammarHubProps {
  onAddXP: (xp: number) => void;
  language: AppLanguage;
  onToggleLanguage: (lang: AppLanguage) => void;
  initialModuleNumber?: number;
}

type ModuleSubView = 'lesson' | 'exercises' | 'mcqs' | 'assessment' | 'revision' | 'visual-atlas';

export const GrammarHub: React.FC<GrammarHubProps> = ({
  onAddXP,
  language,
  onToggleLanguage,
  initialModuleNumber,
}) => {
  const { firebaseUser, userProfile, progressRecords, bookmarks, refreshProfile } = useAuth();
  const isHi = language === 'hi';

  const [selectedLevel, setSelectedLevel] = useState<GrammarLevelNumber>(1);
  const [selectedModuleNum, setSelectedModuleNum] = useState<number>(initialModuleNumber || 1);
  const [subView, setSubView] = useState<ModuleSubView>('lesson');
  const [selectedVisualId, setSelectedVisualId] = useState<string>(GRAMMAR_TOPICS[0]?.id || '');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);
  const [savingComplete, setSavingComplete] = useState(false);

  useEffect(() => {
    if (initialModuleNumber) {
      const target = GRAMMAR_CURRICULUM_37.find((m) => m.moduleNumber === initialModuleNumber);
      if (target) {
        setSelectedLevel(target.levelNumber);
        setSelectedModuleNum(target.moduleNumber);
        setSubView('lesson');
      }
    }
  }, [initialModuleNumber]);

  const activeModule = useMemo(
    () =>
      GRAMMAR_CURRICULUM_37.find((m) => m.moduleNumber === selectedModuleNum) ||
      GRAMMAR_CURRICULUM_37[0],
    [selectedModuleNum]
  );

  const modulesInLevel = useMemo(
    () => GRAMMAR_CURRICULUM_37.filter((m) => m.levelNumber === selectedLevel),
    [selectedLevel]
  );

  const activeVisualTopic = useMemo(
    () => GRAMMAR_TOPICS.find((t) => t.id === selectedVisualId) || GRAMMAR_TOPICS[0],
    [selectedVisualId]
  );

  const completedIds = useMemo(
    () => new Set(progressRecords.filter((p) => p.status === 'completed').map((p) => p.moduleId)),
    [progressRecords]
  );

  const isModuleCompleted = completedIds.has(activeModule.id);
  const isBookmarked = bookmarks.some((b) => b.itemId === activeModule.id);
  const lesson = activeModule.lessons[0];

  const handleSelectModule = (modNumber: number) => {
    audioFeedback.playClick();
    setSelectedModuleNum(modNumber);
    setStatusNotice(null);
  };

  const handleSpeakSentence = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-IN';
    utter.rate = 0.92;
    window.speechSynthesis.speak(utter);
  };

  const handleMarkModuleComplete = async () => {
    setSavingComplete(true);
    setStatusNotice(null);
    audioFeedback.playSuccess();
    onAddXP(50);

    try {
      if (firebaseUser) {
        await saveStudentModuleProgress(
          firebaseUser.uid,
          activeModule.id,
          `Module ${activeModule.moduleNumber}: ${activeModule.titleEn}`,
          'completed',
          100
        );
        const newCount = completedIds.has(activeModule.id)
          ? completedIds.size
          : completedIds.size + 1;
        await updateUserStatsInFirestore(firebaseUser.uid, {
          xp: (userProfile?.xp || 100) + 50,
          completedModulesCount: newCount,
        });
        await refreshProfile();
        setStatusNotice(
          isHi
            ? `मॉड्यूल ${activeModule.moduleNumber} पूर्ण के रूप में सहेजा गया (+50 XP)!`
            : `Module ${activeModule.moduleNumber} saved as Completed to your cloud profile (+50 XP)!`
        );
      } else {
        setStatusNotice(
          isHi
            ? '+50 XP जोड़े गए! स्थायी क्लाउड प्रगति के लिए My Learning में Google से लॉगिन करें।'
            : '+50 XP earned! Sign in via My Learning to save module completion permanently.'
        );
      }
    } finally {
      setSavingComplete(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!firebaseUser) {
      setStatusNotice(
        isHi
          ? 'बुकमार्क सहेजने के लिए My Learning में Google से साइन इन करें।'
          : 'Sign in via Google in My Learning to bookmark lessons.'
      );
      return;
    }
    await toggleBookmarkInFirestore(
      firebaseUser.uid,
      {
        itemId: activeModule.id,
        itemType: 'lesson',
        title: `Module ${activeModule.moduleNumber}: ${activeModule.titleEn}`,
        category: activeModule.levelTitle,
      },
      isBookmarked
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f2544] to-blue-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-300">
              {isHi
                ? '37 मॉड्यूल · 6 प्रगतिशील स्तर · द्विभाषी अंग्रेज़ी / हिन्दी पाठ्यक्रम'
                : '37 Modules · 6 Progressive Levels · Bilingual EN / हिंदी Engine'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isHi
                ? 'सम्पूर्ण अंग्रेज़ी व्याकरण एवं भाषाविज्ञान पाठ्यक्रम'
                : 'Complete English Grammar & Applied Linguistics Curriculum'}
            </h1>
            <p className="text-sm text-blue-100 leading-relaxed">
              {isHi
                ? 'प्रत्येक मॉड्यूल में 19-चरणीय शिक्षण संरचना: उद्देश्य, अंग्रेजी व हिन्दी परिभाषा, सूत्र, 10+ उदाहरण, तुलना तालिका, त्रुटि सुधार, अभ्यास, 20 MCQs व विज़ुअल डायग्राम।'
                : 'Every module follows our 19-point academic structure: objectives, bilingual definitions, rules & formulas, 10+ translated examples, comparison tables, BrE/AmE notes, 20 MCQs, and revision tests.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleLanguage(language === 'en' ? 'hi' : 'en')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-extrabold shadow-md cursor-pointer transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'Switch to हिंदी View' : 'Switch to English View'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Progressive Levels Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {LEVEL_DEFINITIONS.map((lvl) => {
          const isSelected = selectedLevel === lvl.levelNumber;
          const lvlMods = GRAMMAR_CURRICULUM_37.filter((m) => m.levelNumber === lvl.levelNumber);
          const doneCount = lvlMods.filter((m) => completedIds.has(m.id)).length;

          return (
            <button
              key={lvl.levelNumber}
              onClick={() => {
                audioFeedback.playClick();
                setSelectedLevel(lvl.levelNumber);
                if (lvlMods[0]) setSelectedModuleNum(lvlMods[0].moduleNumber);
                setSubView('lesson');
              }}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0a192f] dark:bg-blue-700 text-white border-[#0a192f] dark:border-blue-500 shadow-lg'
                  : 'bg-white dark:bg-[#0d1d36] text-slate-900 dark:text-white border-blue-200 dark:border-blue-800 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className={isSelected ? 'text-amber-300' : 'text-blue-700 dark:text-amber-400'}>
                  Modules {lvl.moduleRange[0]}–{lvl.moduleRange[1]}
                </span>
                <span className={isSelected ? 'text-blue-200' : 'text-slate-500 dark:text-slate-400'}>
                  {doneCount}/{lvlMods.length} Done
                </span>
              </div>
              <div className="font-bold text-sm">{isHi ? lvl.titleHi : lvl.titleEn}</div>
              <p
                className={`text-xs mt-1 line-clamp-2 ${
                  isSelected ? 'text-blue-100' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {isHi ? lvl.subtitleHi : lvl.subtitleEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Split Workspace: Module List + Active Lesson / Practice Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Module Selector */}
        <aside className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-4 shadow-sm space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-blue-100 dark:border-blue-900">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-700 dark:text-amber-400" />
              <span>Level {selectedLevel} Modules</span>
            </h2>
            <span className="text-[11px] font-semibold text-blue-700 dark:text-amber-400">
              {modulesInLevel.length} Modules
            </span>
          </div>

          <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
            {modulesInLevel.map((mod) => {
              const active = mod.moduleNumber === activeModule.moduleNumber;
              const done = completedIds.has(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => handleSelectModule(mod.moduleNumber)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    active
                      ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                      : 'bg-blue-50/50 dark:bg-[#0a192f] text-slate-800 dark:text-slate-200 border-blue-100 dark:border-blue-900 hover:border-blue-400'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="font-bold truncate">
                      Module {mod.moduleNumber}: {isHi ? mod.titleHi : mod.titleEn}
                    </div>
                    <div
                      className={`text-[11px] truncate mt-0.5 ${
                        active ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {isHi ? mod.titleEn : mod.titleHi} · {mod.estimatedMinutes} min
                    </div>
                  </div>
                  {done && (
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 ${
                        active ? 'text-amber-300' : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Workspace */}
        <section className="lg:col-span-8 space-y-5">
          {/* Active Module Top Bar & Sub-Views */}
          <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-blue-700 dark:text-amber-400">
                  {isHi ? activeModule.levelTitleHi : activeModule.levelTitle} · Module {activeModule.moduleNumber}
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a192f] dark:text-white mt-0.5">
                  {isHi ? activeModule.titleHi : activeModule.titleEn}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {isHi ? activeModule.titleEn : activeModule.titleHi} · Visual Focus: {activeModule.visualFocus}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handleToggleBookmark}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    isBookmarked
                      ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                      : 'bg-blue-50 dark:bg-[#0a192f] border-blue-200 dark:border-blue-800 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
                </button>

                <button
                  disabled={savingComplete}
                  onClick={handleMarkModuleComplete}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    isModuleCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#0a192f] hover:bg-blue-800 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-[#0a192f] text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isModuleCompleted
                      ? isHi
                        ? 'पूर्ण (Completed)'
                        : 'Completed ✓'
                      : isHi
                      ? 'पूर्ण चिह्नित करें (+50 XP)'
                      : 'Mark Complete (+50 XP)'}
                  </span>
                </button>
              </div>
            </div>

            {statusNotice && (
              <div className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 font-medium">
                {statusNotice}
              </div>
            )}

            {/* Sub-Navigation Tabs inside the Module */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-blue-100 dark:border-blue-900">
              {(
                [
                  { id: 'lesson', labelEn: '19-Part Bilingual Lesson', labelHi: '19-चरणीय द्विभाषी पाठ', icon: BookOpen },
                  { id: 'exercises', labelEn: `Exercises (${activeModule.practiceExercises.length})`, labelHi: 'अभ्यास प्रश्न', icon: ListChecks },
                  { id: 'mcqs', labelEn: `20 MCQs`, labelHi: '20 बहुविकल्पीय', icon: Target },
                  { id: 'assessment', labelEn: 'Topic Assessment', labelHi: 'विषय मूल्यांकन', icon: GraduationCap },
                  { id: 'revision', labelEn: 'Revision Test', labelHi: 'पुनरावृत्ति टेस्ट', icon: Award },
                  { id: 'visual-atlas', labelEn: 'Visual Diagrams & Flowcharts', labelHi: 'विज़ुअल चार्ट व फ़्लोचार्ट', icon: GitBranch },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = subView === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSubView(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'bg-blue-50/70 dark:bg-[#0a192f] text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{isHi ? tab.labelHi : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 19-Part Structured Lesson View */}
          {subView === 'lesson' && lesson && (
            <div className="space-y-5">
              {/* 1–5: Objectives, Intro, Bilingual Definitions */}
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-blue-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                    1–2. {isHi ? 'शिक्षण उद्देश्य (Learning Objectives)' : 'Learning Objectives'}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-200 list-disc pl-5">
                    {(isHi ? lesson.objectivesHi : lesson.objectivesEn).map((obj, idx) => (
                      <li key={idx}>{obj}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-blue-100 dark:border-blue-900 space-y-2">
                  <h3 className="text-sm font-bold text-blue-800 dark:text-amber-400 uppercase tracking-wider">
                    3. {isHi ? 'प्रस्तावना (Introduction)' : 'Introduction'}
                  </h3>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {isHi ? lesson.introHi : lesson.introEn}
                  </p>
                </div>

                {/* 4 & 5: Bilingual English + Hindi Definitions Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800">
                    <div className="text-xs font-extrabold text-blue-800 dark:text-blue-300 uppercase mb-1">
                      4. Definition in English
                    </div>
                    <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                      {lesson.definitionEn}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                    <div className="text-xs font-extrabold text-amber-800 dark:text-amber-300 uppercase mb-1">
                      5. हिन्दी में परिभाषा
                    </div>
                    <p className="text-sm text-slate-800 dark:text-slate-100 leading-relaxed">
                      {lesson.definitionHi}
                    </p>
                  </div>
                </div>

                {/* 6: Detailed Explanation */}
                <div className="pt-4 border-t border-blue-100 dark:border-blue-900 space-y-2">
                  <h3 className="text-sm font-bold text-blue-800 dark:text-amber-400 uppercase tracking-wider">
                    6. {isHi ? 'विस्तृत व्याख्या (Detailed Explanation)' : 'Detailed Explanation'}
                  </h3>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {isHi ? lesson.detailedExplanationHi : lesson.detailedExplanationEn}
                  </p>
                </div>
              </div>

              {/* 7: Classifications & Types */}
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0a192f] dark:text-white">
                  7. {isHi ? 'वर्गीकरण एवं प्रकार (Classification & Types)' : 'Classification and Types'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {lesson.typesClassification.map((tc, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 space-y-2"
                    >
                      <div className="font-bold text-sm text-blue-900 dark:text-amber-300">
                        {isHi ? tc.nameHi : tc.nameEn}
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {isHi ? tc.descriptionHi : tc.descriptionEn}
                      </p>
                      {tc.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="text-xs pt-1 border-t border-blue-100 dark:border-blue-900">
                          <div className="font-semibold text-slate-900 dark:text-white">{ex.en}</div>
                          <div className="text-slate-600 dark:text-slate-400">{ex.hi}</div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* 8 & 9: Rules & Structures / Formulas */}
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0a192f] dark:text-white">
                  8–9. {isHi ? 'प्रमुख नियम, संरचनाएँ एवं सूत्र (Rules & Formulas)' : 'Core Rules, Structures & Formulas'}
                </h3>

                <div className="p-4 rounded-xl bg-[#0a192f] text-white space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    {isHi ? 'वाक्य संरचना सूत्र (Structures & Formulas)' : 'Syntactic Formulas'}
                  </div>
                  <ul className="space-y-1 text-xs sm:text-sm font-mono text-blue-100">
                    {lesson.structuresAndFormulas.map((f, idx) => (
                      <li key={idx}>• {f}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3">
                  {lesson.rules.map((r, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-4 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-bold text-sm text-blue-900 dark:text-amber-300">
                          Rule {rIdx + 1}: {isHi ? r.titleHi : r.titleEn}
                        </span>
                        {r.formula && (
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-900 dark:text-blue-200">
                            {r.formula}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {isHi ? r.explanationHi : r.explanationEn}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200">
                          <strong>Correct:</strong> {r.correctExample.en}
                          <div className="text-emerald-800 dark:text-emerald-300 mt-0.5">{r.correctExample.hi}</div>
                        </div>
                        {r.incorrectExample && (
                          <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200">
                            <strong>Avoid:</strong> <span className="line-through">{r.incorrectExample}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10 & 11: >= 10 Examples in English + Natural Hindi Translations */}
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0a192f] dark:text-white">
                  10–11. {isHi ? `${lesson.examples.length} द्विभाषी उदाहरण एवं उच्चारण` : `${lesson.examples.length} Bilingual Examples (English + Natural हिंदी)`}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lesson.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-blue-50/40 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-800 flex items-start justify-between gap-2"
                    >
                      <div className="space-y-1 text-xs sm:text-sm">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {idx + 1}. {ex.en}
                        </div>
                        <div className="text-slate-600 dark:text-slate-300">{ex.hi}</div>
                      </div>
                      <button
                        onClick={() => handleSpeakSentence(ex.en)}
                        className="p-1.5 rounded-lg text-blue-700 dark:text-amber-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 shrink-0 cursor-pointer"
                        title="Listen pronunciation"
                        aria-label={`Pronounce example ${idx + 1}`}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 12: Comparison Tables */}
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-[#0a192f] dark:text-white">
                  12. {isHi ? 'तुलनात्मक तालिकाएँ (Comparison Tables)' : 'Comparison Tables'}
                </h3>
                {lesson.comparisonTables.map((tbl, tIdx) => (
                  <div key={tIdx} className="space-y-2 overflow-x-auto">
                    <div className="text-xs font-bold text-blue-800 dark:text-amber-300">
                      {isHi ? tbl.titleHi : tbl.titleEn}
                    </div>
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-[#0a192f] text-white">
                          {tbl.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-3 py-2 font-semibold border border-blue-900">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tbl.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="odd:bg-blue-50/40 even:bg-white dark:odd:bg-[#0a192f] dark:even:bg-[#0d1d36]"
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className="px-3 py-2 border border-blue-100 dark:border-blue-900 text-slate-800 dark:text-slate-200"
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* 13–16: Real-Life Applications, Common Mistakes, Exam Points, Summary */}
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-blue-800 dark:text-amber-400 uppercase tracking-wider mb-2">
                    13. {isHi ? 'दैनिक जीवन में उपयोग (Real-Life Applications)' : 'Real-Life Applications'}
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-200 space-y-1">
                    {(isHi ? lesson.realLifeApplicationsHi : lesson.realLifeApplicationsEn).map((app, idx) => (
                      <li key={idx}>{app}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-blue-100 dark:border-blue-900 space-y-2.5">
                  <h3 className="text-sm font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>14. {isHi ? 'सामान्य गलतियाँ एवं ब्रिटिश/अमेरिकी अंतर' : 'Common Mistakes & British vs American Notes'}</span>
                  </h3>
                  {lesson.commonMistakes.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm space-y-1"
                    >
                      <div>
                        <span className="font-bold text-rose-700 dark:text-rose-400">Wrong:</span>{' '}
                        <span className="line-through text-slate-700 dark:text-slate-300">{m.wrong}</span>
                        {' · '}
                        <span className="font-bold text-emerald-700 dark:text-emerald-400">Right:</span>{' '}
                        <span className="font-semibold text-slate-900 dark:text-white">{m.right}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">{isHi ? m.reasonHi : m.reasonEn}</p>
                      {m.britishVsAmericanNote && (
                        <p className="text-blue-800 dark:text-blue-300 font-medium">
                          BrE vs AmE: {m.britishVsAmericanNote}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-blue-100 dark:border-blue-900 space-y-2">
                  <h3 className="text-sm font-bold text-blue-800 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>15. {isHi ? 'महत्वपूर्ण परीक्षा बिंदु (Important Exam Points)' : 'Important Examination Points'}</span>
                  </h3>
                  <ul className="list-disc pl-5 text-sm text-slate-800 dark:text-slate-200 space-y-1">
                    {(isHi ? lesson.examPointsHi : lesson.examPointsEn).map((pt, idx) => (
                      <li key={idx}>{pt}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-blue-800 dark:text-amber-400 mb-1">
                    16. {isHi ? 'पाठ सारांश (Summary)' : 'Lesson Summary'}
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {isHi ? lesson.summaryHi : lesson.summaryEn}
                  </p>
                </div>

                {/* Quick Jump Buttons to Sections 17–19 */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => setSubView('exercises')}
                    className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
                  >
                    17. {isHi ? 'अभ्यास प्रश्न हल करें' : 'Open Practice Exercises'}
                  </button>
                  <button
                    onClick={() => setSubView('mcqs')}
                    className="px-4 py-2 rounded-xl bg-[#0a192f] hover:bg-blue-900 text-white text-xs font-bold cursor-pointer"
                  >
                    18. {isHi ? '20 MCQs हल करें' : 'Take 20-MCQ Quiz'}
                  </button>
                  <button
                    onClick={() => setSubView('assessment')}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
                  >
                    19. {isHi ? 'अंतिम मूल्यांकन एवं पुनरावृत्ति' : 'Topic Assessment & Revision'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 17: Interactive Practice Exercises */}
          {subView === 'exercises' && (
            <PracticeEngine15
              language={language}
              onAddXP={onAddXP}
              initialQuestions={activeModule.practiceExercises}
              compactTitle={`Module ${activeModule.moduleNumber} Practice Exercises (${activeModule.practiceExercises.length} Questions)`}
            />
          )}

          {/* 18: 20 MCQs */}
          {subView === 'mcqs' && (
            <PracticeEngine15
              language={language}
              onAddXP={onAddXP}
              initialQuestions={activeModule.mcqs}
              compactTitle={`Module ${activeModule.moduleNumber}: 20-MCQ Comprehensive Bank`}
            />
          )}

          {/* 19a: Topic Assessment */}
          {subView === 'assessment' && (
            <PracticeEngine15
              language={language}
              onAddXP={onAddXP}
              initialQuestions={activeModule.topicAssessment}
              initialMode="timed"
              compactTitle={`Module ${activeModule.moduleNumber} Timed Topic Assessment`}
            />
          )}

          {/* 19b: Revision Test */}
          {subView === 'revision' && (
            <PracticeEngine15
              language={language}
              onAddXP={onAddXP}
              initialQuestions={activeModule.revisionTest}
              compactTitle={`Module ${activeModule.moduleNumber} Revision Test`}
            />
          )}

          {/* Visual Atlas & Interactive Flowcharts */}
          {subView === 'visual-atlas' && activeVisualTopic && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-4 flex flex-wrap gap-2">
                {GRAMMAR_TOPICS.map((vt) => (
                  <button
                    key={vt.id}
                    onClick={() => setSelectedVisualId(vt.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      vt.id === activeVisualTopic.id
                        ? 'bg-[#0a192f] dark:bg-blue-600 text-white'
                        : 'bg-blue-50 dark:bg-[#0a192f] text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800'
                    }`}
                  >
                    {vt.moduleNumber}. {vt.title}
                  </button>
                ))}
              </div>
              <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 shadow-sm">
                <GrammarVisualLab topic={activeVisualTopic} onSpeak={handleSpeakSentence} />
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
