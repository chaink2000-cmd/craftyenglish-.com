import React, { useEffect, useMemo, useState } from 'react';
import { AppLanguage, LiteratureTrack, NavTab } from '../types';
import { GRAMMAR_CURRICULUM_37, PRACTICE_QUESTION_BANK_15 } from '../data/grammar37';
import { UNIFIED_NET_MPSET_PAPER2_UNITS } from '../data/literatureSyllabus';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { NET_PAPER1_UNITS } from '../data/netPaper1Syllabus';
import { MPESB_COMMON_PAPER1_UNITS } from '../data/mpesbCommonPaper1Syllabus';
import {
  Search,
  X,
  BookOpen,
  Feather,
  HelpCircle,
  Sparkles,
  ArrowRight,
  GraduationCap,
} from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: AppLanguage;
  onNavigateModule: (moduleNumber: number) => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenLiteratureTrack: (track: LiteratureTrack) => void;
  onOpenPracticeQuestion: (moduleNumber?: number, examCategory?: string) => void;
}

type SearchCategory = 'all' | 'grammar' | 'literature' | 'questions' | 'vocabulary' | 'exams';

interface SearchResultItem {
  id: string;
  category: Exclude<SearchCategory, 'all'>;
  title: string;
  subtitle: string;
  tag: string;
  onSelect: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateModule,
  onNavigateTab,
  onOpenLiteratureTrack,
  onOpenPracticeQuestion,
}) => {
  const [queryText, setQueryText] = useState('');
  const [category, setCategory] = useState<SearchCategory>('all');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const allEntries = useMemo<SearchResultItem[]>(() => {
    const items: SearchResultItem[] = [];

    for (const mod of GRAMMAR_CURRICULUM_37) {
      const lesson = mod.lessons[0];
      items.push({
        id: `gram-${mod.moduleNumber}`,
        category: 'grammar',
        title: `Module ${mod.moduleNumber}: ${mod.titleEn} · ${mod.titleHi}`,
        subtitle: lesson?.definitionEn || mod.visualFocus,
        tag: mod.levelTitle,
        onSelect: () => {
          onNavigateModule(mod.moduleNumber);
          onClose();
        },
      });
      for (const rule of lesson?.rules || []) {
        items.push({
          id: `rule-${mod.moduleNumber}-${rule.titleEn}`,
          category: 'grammar',
          title: `${rule.titleEn} (Module ${mod.moduleNumber})`,
          subtitle: `${rule.explanationEn} ${rule.titleHi}`,
          tag: 'Grammar Rule',
          onSelect: () => {
            onNavigateModule(mod.moduleNumber);
            onClose();
          },
        });
      }
    }

    for (const unit of UNIFIED_NET_MPSET_PAPER2_UNITS) {
      items.push({
        id: `lit-unit-${unit.id}`,
        category: 'literature',
        title: unit.title,
        subtitle: `${unit.periodOrDomain} — ${unit.overview}`,
        tag: 'Literature Unit',
        onSelect: () => {
          onOpenLiteratureTrack('net-mpset-paper2');
          onClose();
        },
      });
      for (const w of unit.keyWritersAndWorks) {
        items.push({
          id: `lit-writer-${unit.id}-${w.writer}`,
          category: 'literature',
          title: `${w.writer} (${w.years})`,
          subtitle: `Major works: ${w.majorWorks.join(', ')} · ${w.criticalThemes}`,
          tag: 'Author & Works',
          onSelect: () => {
            onOpenLiteratureTrack('net-mpset-paper2');
            onClose();
          },
        });
      }
    }

    for (const p1 of NET_PAPER1_UNITS) {
      items.push({
        id: `net-p1-${p1.id}`,
        category: 'exams',
        title: `NTA NET Paper 1 Unit ${p1.unitNumber}: ${p1.title}`,
        subtitle: p1.overview,
        tag: 'NET Paper 1',
        onSelect: () => {
          onOpenLiteratureTrack('paper1');
          onClose();
        },
      });
    }

    for (const mp of MPESB_COMMON_PAPER1_UNITS) {
      items.push({
        id: `mpesb-p1-${mp.id}`,
        category: 'exams',
        title: `MPESB Paper 1 Unit ${mp.unitNumber}: ${mp.title}`,
        subtitle: `${mp.hindiTitle} — ${mp.overview}`,
        tag: 'MPESB Common',
        onSelect: () => {
          onNavigateTab('mpesb-paper1');
          onClose();
        },
      });
    }

    for (const word of VOCABULARY_LIST) {
      items.push({
        id: `voc-${word.id}`,
        category: 'vocabulary',
        title: `${word.word} (${word.partOfSpeech}) ${word.phonetic}`,
        subtitle: `${word.definition} · Synonyms: ${word.synonyms.join(', ')}`,
        tag: 'Vocabulary',
        onSelect: () => {
          onNavigateTab('vocab');
          onClose();
        },
      });
    }

    for (const q of PRACTICE_QUESTION_BANK_15.slice(0, 180)) {
      items.push({
        id: `q-${q.id}`,
        category: 'questions',
        title: q.prompt,
        subtitle: `${q.examCategory} · ${q.topic} · ${q.sourceType}`,
        tag: q.sourceType,
        onSelect: () => {
          onOpenPracticeQuestion(q.moduleNumber, q.examCategory);
          onClose();
        },
      });
    }

    return items;
  }, [onClose, onNavigateModule, onNavigateTab, onOpenLiteratureTrack, onOpenPracticeQuestion]);

  const filteredResults = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    return allEntries
      .filter((item) => category === 'all' || item.category === category)
      .filter((item) => {
        if (!q) return true;
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
        );
      })
      .slice(0, 24);
  }, [allEntries, category, queryText]);

  if (!isOpen) return null;

  const isHi = language === 'hi';

  const tabs: { id: SearchCategory; label: string }[] = [
    { id: 'all', label: isHi ? 'सभी' : 'All' },
    { id: 'grammar', label: isHi ? 'व्याकरण (37 मॉड्यूल)' : 'Grammar & Rules' },
    { id: 'literature', label: isHi ? 'साहित्य व लेखक' : 'Authors & Books' },
    { id: 'exams', label: isHi ? 'प्रतियोगी परीक्षा' : 'Competitive Exams' },
    { id: 'questions', label: isHi ? 'प्रश्न बैंक' : 'Questions' },
    { id: 'vocabulary', label: isHi ? 'शब्दकोश' : 'Vocabulary' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a192f]/65 backdrop-blur-sm flex items-start justify-center p-4 sm:pt-16"
      role="dialog"
      aria-modal="true"
      aria-label="Global curriculum search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-blue-100 dark:border-blue-800/80 flex items-center gap-3 bg-blue-50/70 dark:bg-[#0a192f]">
          <Search className="w-5 h-5 text-blue-700 dark:text-amber-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder={
              isHi
                ? 'पाठ, व्याकरण नियम, लेखक, पुस्तकें या परीक्षा प्रश्न खोजें...'
                : 'Search lessons, grammar rules, authors, books, or exam questions...'
            }
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-2.5 border-b border-blue-100 dark:border-blue-800/70 flex flex-wrap gap-1.5 bg-white dark:bg-[#0d1d36]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                category === tab.id
                  ? 'bg-[#0a192f] dark:bg-blue-600 text-white'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-blue-50 dark:divide-blue-900/50">
          {filteredResults.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
              {isHi
                ? `"${queryText}" के लिए कोई परिणाम नहीं मिला। कृपया कोई अन्य शब्द खोजें।`
                : `No matching curriculum results for "${queryText}". Try searching for "Tense", "Shakespeare", "Concord", or "Pragmatics".`}
            </div>
          ) : (
            filteredResults.map((item) => {
              const Icon =
                item.category === 'grammar'
                  ? BookOpen
                  : item.category === 'literature'
                  ? Feather
                  : item.category === 'exams'
                  ? GraduationCap
                  : item.category === 'vocabulary'
                  ? Sparkles
                  : HelpCircle;

              return (
                <button
                  key={item.id}
                  onClick={item.onSelect}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50/80 dark:hover:bg-blue-950/60 transition-colors flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {item.title}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5">
                        {item.subtitle}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-medium text-blue-700 dark:text-amber-400">
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
