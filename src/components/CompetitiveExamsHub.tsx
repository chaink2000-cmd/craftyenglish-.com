import React, { useState } from 'react';
import { AppLanguage, LiteratureTrack } from '../types';
import { LiteratureAcademy } from './LiteratureAcademy';
import { MpesbPaper1Hub } from './MpesbPaper1Hub';
import { PracticeEngine15 } from './PracticeEngine15';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Compass,
  Feather,
  FileText,
  GraduationCap,
  ShieldCheck,
  Target,
} from 'lucide-react';

interface CompetitiveExamsHubProps {
  language: AppLanguage;
  onAddXP: (xp: number) => void;
  initialTrack?: LiteratureTrack;
}

type ExamSectionMode = 'overview' | 'net-paper1' | 'net-mpset-paper2' | 'mpesb-paper1' | 'mpesb-grade1-2' | 'exam-practice';

export const CompetitiveExamsHub: React.FC<CompetitiveExamsHubProps> = ({
  language,
  onAddXP,
}) => {
  const isHi = language === 'hi';
  const [section, setSection] = useState<ExamSectionMode>('overview');
  const [practiceExamFilter, setPracticeExamFilter] = useState<string>('all');

  const tracks: {
    id: ExamSectionMode;
    titleEn: string;
    titleHi: string;
    descEn: string;
    descHi: string;
    tag: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    {
      id: 'net-mpset-paper2',
      titleEn: 'NTA UGC NET & MPSET English Paper 2',
      titleHi: 'NTA UGC NET एवं MPSET अंग्रेज़ी पेपर 2',
      descEn: 'Complete 10-Unit Literary History, Criticism, Cultural Studies, Linguistics & Research Methodology.',
      descHi: 'संपूर्ण 10 इकाइयाँ: ब्रिटिश व विश्व साहित्य, आलोचना, भाषाविज्ञान एवं शोध प्रविधि।',
      tag: 'Verified Syllabus + PYQs',
      icon: Feather,
    },
    {
      id: 'net-paper1',
      titleEn: 'NTA UGC NET Paper 1 (Teaching & Research)',
      titleHi: 'NTA UGC NET पेपर 1 (शिक्षण एवं शोध अभिवृत्ति)',
      descEn: 'Teaching Aptitude, Research Aptitude, Comprehension, Communication, ICT, Logical Reasoning & Higher Education.',
      descHi: 'शिक्षण अभिवृत्ति, शोध, बोध, संप्रेषण, तर्कशास्त्र, आईसीटी, पर्यावरण व उच्च शिक्षा।',
      tag: 'All 10 General Units',
      icon: Compass,
    },
    {
      id: 'mpesb-paper1',
      titleEn: 'MPESB Paper 1 Common (Grade 1 & Grade 2)',
      titleHi: 'MPESB पेपर 1 कॉमन (वर्ग 1 एवं वर्ग 2)',
      descEn: 'Full unit-wise General Hindi, General English, GK, Reasoning & Pedagogy with 100 High-Yield Exam Points.',
      descHi: 'सामान्य हिन्दी, अंग्रेज़ी, सामान्य ज्ञान, तार्किक योग्यता एवं शिक्षाशास्त्र के 100 परीक्षा बिंदु।',
      tag: '100 High-Yield Points',
      icon: FileText,
    },
    {
      id: 'mpesb-grade1-2',
      titleEn: 'MPESB TET Grade 1 & Grade 2 English',
      titleHi: 'MPESB TET वर्ग 1 एवं वर्ग 2 अंग्रेज़ी',
      descEn: 'SCERT/NCERT Class 9–12 Prescribed Prose, Poetry & Drama for Grade 1, plus Functional Grammar & ELT for Grade 2.',
      descHi: 'वर्ग 1 के लिए NCERT/SCERT निर्धारित पाठ और वर्ग 2 के लिए व्यावहारिक व्याकरण व शिक्षण शास्त्र।',
      tag: 'State Selection Blueprint',
      icon: GraduationCap,
    },
  ];

  const handleLaunchExamPractice = (examCategory: string) => {
    setPracticeExamFilter(examCategory);
    setSection('exam-practice');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f2544] to-blue-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {isHi
                  ? 'सत्यापित PYQs बनाम मौलिक अभ्यास प्रश्नों का स्पष्ट विभाजन'
                  : 'Transparent Separation: Verified PYQs vs Original Practice Questions'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isHi
                ? 'प्रतियोगी परीक्षा उत्कृष्टता केंद्र'
                : 'Competitive Examinations Mastery Hub'}
            </h1>
            <p className="text-sm text-blue-100 leading-relaxed">
              {isHi
                ? 'NTA UGC NET (पेपर 1 व पेपर 2), MPSET अंग्रेज़ी, तथा MPESB TET वर्ग 1, वर्ग 2 एवं कॉमन पेपर 1 के संपूर्ण पाठ्यक्रम और समयबद्ध अभ्यास टेस्ट।'
                : 'Structured preparation across NTA UGC NET Paper 1 & Paper 2, MPSET English Literature, and MPESB High School / Middle School Teacher Selection tests.'}
            </p>
          </div>
          {section !== 'overview' && (
            <button
              onClick={() => setSection('overview')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0a192f] text-xs font-extrabold cursor-pointer self-start lg:self-center"
            >
              ← {isHi ? 'सभी परीक्षा श्रेणियाँ देखें' : 'All Exam Tracks'}
            </button>
          )}
        </div>
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-2">
        {(
          [
            { id: 'overview', label: isHi ? 'मुख्य परीक्षा डैशबोर्ड' : 'Exam Tracks Overview' },
            { id: 'net-mpset-paper2', label: 'NTA NET / MPSET Paper 2' },
            { id: 'net-paper1', label: 'NTA NET Paper 1' },
            { id: 'mpesb-paper1', label: 'MPESB Common Paper 1' },
            { id: 'mpesb-grade1-2', label: 'MPESB Grade 1 & 2' },
            { id: 'exam-practice', label: isHi ? 'PYQ एवं अभ्यास बैंक' : 'PYQ & Practice Drill' },
          ] as { id: ExamSectionMode; label: string }[]
        ).map((t) => (
          <button
            key={t.id}
            onClick={() => setSection(t.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              section === t.id
                ? 'bg-[#0a192f] dark:bg-blue-600 text-white'
                : 'bg-white dark:bg-[#0d1d36] text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview Grid */}
      {section === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tracks.map((tr) => {
              const Icon = tr.icon;
              return (
                <div
                  key={tr.id}
                  className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm flex flex-col justify-between gap-4 hover:border-blue-400 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-amber-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        {tr.tag}
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold text-[#0a192f] dark:text-white">
                      {isHi ? tr.titleHi : tr.titleEn}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isHi ? tr.descHi : tr.descEn}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-100 dark:border-blue-900">
                    <button
                      onClick={() => setSection(tr.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0a192f] dark:bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isHi ? 'पूरा पाठ्यक्रम खोलें' : 'Open Full Syllabus'}</span>
                    </button>
                    <button
                      onClick={() =>
                        handleLaunchExamPractice(
                          tr.id === 'net-paper1'
                            ? 'NTA NET Paper 1'
                            : tr.id === 'net-mpset-paper2'
                            ? 'NTA NET'
                            : tr.id === 'mpesb-paper1'
                            ? 'MPESB Paper 1 (Common)'
                            : 'MPESB Grade 1'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 text-xs font-bold cursor-pointer"
                    >
                      <Target className="w-3.5 h-3.5" />
                      <span>{isHi ? 'PYQ / अभ्यास प्रश्न' : 'Launch Practice & PYQs'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Academic Honesty Notice */}
          <div className="rounded-2xl bg-blue-50/80 dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 flex items-start gap-3">
            <Award className="w-6 h-6 text-blue-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
              <div className="font-bold text-[#0a192f] dark:text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  {isHi
                    ? 'प्रमाणिकता मानक: Verified PYQs बनाम Original Practice'
                    : 'Editorial Accuracy Guarantee: Verified PYQs vs Original Practice'}
                </span>
              </div>
              <p>
                {isHi
                  ? 'Crafty English में प्रत्येक वर्ष-वार प्रश्न पर स्पष्ट रूप से दर्ज होता है कि वह प्रमाणित पूर्व-वर्ष प्रश्न (Verified PYQ) है या पाठ्यक्रम के अनुरूप मौलिक अभ्यास प्रश्न (Original Practice)।'
                  : 'Every question inside Practice Zone explicitly displays whether it is a Verified Past Examination Reference (PYQ) with documented session details or an Original Syllabus Practice question—zero fabricated exam citations.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {section === 'net-mpset-paper2' && (
        <LiteratureAcademy initialTrack="net-mpset-paper2" trackNonce={1} />
      )}

      {section === 'net-paper1' && (
        <LiteratureAcademy initialTrack="paper1" trackNonce={2} />
      )}

      {section === 'mpesb-grade1-2' && (
        <LiteratureAcademy initialTrack="mp-grade1" trackNonce={3} />
      )}

      {section === 'mpesb-paper1' && <MpesbPaper1Hub onAddXP={onAddXP} />}

      {section === 'exam-practice' && (
        <PracticeEngine15
          language={language}
          onAddXP={onAddXP}
          initialExamCategory={practiceExamFilter === 'all' ? undefined : practiceExamFilter}
          compactTitle={
            isHi
              ? 'प्रतियोगी परीक्षा प्रश्न बैंक (Verified PYQs + Original Practice)'
              : 'Competitive Exam Practice Bank (Verified PYQs + Original Questions)'
          }
        />
      )}
    </div>
  );
};
