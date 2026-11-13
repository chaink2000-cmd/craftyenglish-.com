import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookMarked, 
  Sparkles, 
  Search, 
  Volume2, 
  Layers, 
  School,
  FileText,
  Flame
} from 'lucide-react';
import { audioFeedback } from '../utils/audioFeedback';
import { adminStorage } from '../utils/adminStorage';

interface LiteratureAcademyProps {
  onNavigateToMCQ?: (examFilter: string) => void;
}

export const LiteratureAcademy: React.FC<LiteratureAcademyProps> = () => {
  // Master category tabs:
  // 1: 'paper1' (NTA NET Paper 1 All 10 Units)
  // 2: 'net-mpset-paper2' (NTA NET & MPSET Paper 2 Literature Together - All 10 Units)
  // 3: 'mp-grade1' (MPESB Grade 1 High School Teacher)
  // 4: 'mp-grade2' (MPESB Grade 2 Middle School & TET Pedagogy)
  const [masterTab, setMasterTab] = useState<'paper1' | 'net-mpset-paper2' | 'mp-grade1' | 'mp-grade2'>('net-mpset-paper2');

  const [p1Units, setP1Units] = useState(() => adminStorage.getPaper1Syllabus());
  const [p2Units, setP2Units] = useState(() => adminStorage.getLiteratureSyllabus());
  const [g1Units, setG1Units] = useState(() => adminStorage.getMpesbGrade1Syllabus());
  const [g2Units, setG2Units] = useState(() => adminStorage.getMpesbGrade2Syllabus());

  React.useEffect(() => {
    const handleUpdate = () => {
      setP1Units(adminStorage.getPaper1Syllabus());
      setP2Units(adminStorage.getLiteratureSyllabus());
      setG1Units(adminStorage.getMpesbGrade1Syllabus());
      setG2Units(adminStorage.getMpesbGrade2Syllabus());
    };
    window.addEventListener('crafty_storage_update', handleUpdate);
    return () => window.removeEventListener('crafty_storage_update', handleUpdate);
  }, []);

  // Selected unit states for each tab
  const [selectedPaper1Id, setSelectedPaper1Id] = useState<string>(p1Units[0]?.id || '');
  const [selectedPaper2Id, setSelectedPaper2Id] = useState<string>(p2Units[0]?.id || '');
  const [selectedGrade1Id, setSelectedGrade1Id] = useState<string>(g1Units[0]?.id || '');
  const [selectedGrade2Id, setSelectedGrade2Id] = useState<string>(g2Units[0]?.id || '');

  const [searchQuery, setSearchQuery] = useState('');

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    }
  };

  // Active units
  const currentPaper1 = p1Units.find(u => u.id === selectedPaper1Id) || p1Units[0];
  const currentPaper2 = p2Units.find(u => u.id === selectedPaper2Id) || p2Units[0];
  const currentGrade1 = g1Units.find(u => u.id === selectedGrade1Id) || g1Units[0];
  const currentGrade2 = g2Units.find(u => u.id === selectedGrade2Id) || g2Units[0];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50 to-blue-100/75 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-4xl space-y-2.5">
          <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-semibold">
            <GraduationCap className="w-4 h-4" />
            <span>Complete Syllabi Architecture · Curated by Mr. ChainSingh Kushro</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Curriculum & Exam Syllabus Portal
          </h1>
          <p className="text-slate-600 text-sm font-sans leading-relaxed">
            Exhaustive, unit-by-unit syllabi with integrated <strong className="text-amber-700 font-semibold">Exam Points</strong> by Founder & Educator <strong className="text-slate-900 font-semibold">Mr. ChainSingh Kushro</strong> (<a href="mailto:chaink2000@gmail.com" className="text-sky-700 hover:underline font-medium">chaink2000@gmail.com</a>):
            <span className="block mt-1 text-slate-800 font-medium">
              NTA NET Paper 1 (Units 1–10) · NTA NET & MPSET Paper 2 Literature · MPESB TET Grade-1 · MPESB TET Grade-2
            </span>
          </p>
        </div>
      </div>

      {/* 4 Master Category Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <button
          onClick={() => {
            audioFeedback.playClick();
            setMasterTab('paper1');
            setSearchQuery('');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            masterTab === 'paper1'
              ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-200 shadow-sm'
              : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 uppercase tracking-wider">
              Compulsory Paper
            </span>
            <FileText className="w-4 h-4 text-sky-600" />
          </div>
          <h3 className="font-editorial text-base font-bold text-slate-900">NTA NET Paper 1</h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-1">All 10 Units (Teaching, Research, Logic, ICT, Environment)</p>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setMasterTab('net-mpset-paper2');
            setSearchQuery('');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            masterTab === 'net-mpset-paper2'
              ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-200 shadow-sm'
              : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase tracking-wider">
              Unified Literature
            </span>
            <GraduationCap className="w-4 h-4 text-amber-600" />
          </div>
          <h3 className="font-editorial text-base font-bold text-slate-900">NET & MPSET Paper 2</h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-1">Units I-X (Drama, Poetry, Fiction, Theory, Criticism)</p>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setMasterTab('mp-grade1');
            setSearchQuery('');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            masterTab === 'mp-grade1'
              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-sm'
              : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 uppercase tracking-wider">
              High School (Varg 1)
            </span>
            <School className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="font-editorial text-base font-bold text-slate-900">MPESB Grade-1 Teacher</h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-1">NCERT Class 9-12 Flamingo, Vistas, Poetic Devices</p>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setMasterTab('mp-grade2');
            setSearchQuery('');
          }}
          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
            masterTab === 'mp-grade2'
              ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-200 shadow-sm'
              : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase tracking-wider">
              Middle School (Varg 2)
            </span>
            <Layers className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="font-editorial text-base font-bold text-slate-900">MPESB Grade-2 & TET</h3>
          <p className="text-xs text-slate-600 mt-1 line-clamp-1">Functional Grammar, Vocabulary & TET Pedagogy</p>
        </button>
      </div>

      {/* SECTION 1: NTA NET PAPER 1 (ALL 10 UNITS) */}
      {masterTab === 'paper1' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Section banner */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-600" />
                <span>NTA UGC NET General Paper on Teaching & Research Aptitude (Paper 1)</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                50 Questions • 100 Marks • Common to all candidates • Complete 10 Units with High-Yield Exam Points
              </p>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics in Paper 1..."
                className="bg-white border border-sky-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 w-full sm:w-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Unit Navigation List */}
            <div className="lg:col-span-4 space-y-2">
              {p1Units.filter(u => u.title.toLowerCase().includes(searchQuery.toLowerCase()) || u.overview.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => {
                const isSelected = u.id === currentPaper1.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      audioFeedback.playClick();
                      setSelectedPaper1Id(u.id);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 shadow-sm'
                        : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-700 font-mono">
                        UNIT {u.unitNumber}
                      </span>
                      <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-600" />
                        <span>Exam Points</span>
                      </span>
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                      {u.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{u.subTitle}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Unit View */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-mono font-semibold">
                      Unit {currentPaper1.unitNumber} of 10
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-slate-900 mt-2">
                      {currentPaper1.title}
                    </h3>
                    <p className="text-xs text-sky-700 font-medium mt-1">{currentPaper1.subTitle}</p>
                  </div>
                  <button
                    onClick={() => handleSpeak(`${currentPaper1.title}. ${currentPaper1.overview}`)}
                    title="Listen to audio overview"
                    className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-sans">{currentPaper1.overview}</p>
              </div>

              {/* HIGH YIELD EXAM POINTS BANNER */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/70 border-2 border-amber-300 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="font-editorial text-sm font-bold text-amber-800 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600 fill-current" />
                    <span>🔥 High-Yield Exam Points (Examiner's Favorite Takeaways)</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-mono font-semibold">Repeated PYQs</span>
                </div>
                <div className="space-y-2">
                  {currentPaper1.examPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <p className="leading-relaxed font-sans">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-topics with topic-level exam notes */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-sky-600" />
                  <span>Key Syllabus Concepts & Topic Drills</span>
                </h4>

                {currentPaper1.topics.map((t, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-sky-200 space-y-3 shadow-xs">
                    <h5 className="font-editorial text-base font-bold text-slate-900">{t.name}</h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">{t.description}</p>

                    <div className="p-3 rounded-xl bg-sky-50/80 border border-sky-200 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Core Memorization Pointers:</span>
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {t.highYieldExamPoints.map((item, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-sky-600 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: NTA NET & MPSET PAPER 2 (UNIFIED 10 UNITS TOGETHER) */}
      {masterTab === 'net-mpset-paper2' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Section banner */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-amber-600" />
                <span>NTA UGC NET & MPSET English Literature (Unified Paper II Syllabus)</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Exact identical 10-Unit Syllabus tested in NTA NET & MPPSC MPSET • 100 Questions • 200 Marks
              </p>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search authors, theories..."
                className="bg-white border border-amber-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 w-full sm:w-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Unit Navigator */}
            <div className="lg:col-span-4 space-y-2">
              {p2Units.filter(u => u.title.toLowerCase().includes(searchQuery.toLowerCase()) || u.overview.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => {
                const isSelected = u.id === currentPaper2.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      audioFeedback.playClick();
                      setSelectedPaper2Id(u.id);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-500 shadow-sm'
                        : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">
                        {u.title.split(':')[0]}
                      </span>
                      <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-600" />
                        <span>Exam Points</span>
                      </span>
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                      {u.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{u.periodOrDomain}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Unit View */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                      {currentPaper2.periodOrDomain}
                    </span>
                    <h3 className="font-editorial text-2xl font-bold text-slate-900 mt-2">
                      {currentPaper2.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSpeak(`${currentPaper2.title}. ${currentPaper2.overview}`)}
                    className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{currentPaper2.overview}</p>
              </div>

              {/* DEDICATED EXAM POINTS BOX */}
              {currentPaper2.examPoints && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/70 border-2 border-amber-300 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                    <span className="font-editorial text-sm font-bold text-amber-800 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-amber-600 fill-current" />
                      <span>🔥 High-Yield Exam Points (NTA NET & MPSET Direct Hits)</span>
                    </span>
                    <span className="text-[10px] text-amber-700 font-mono font-semibold">Paper II Guarantee</span>
                  </div>
                  <div className="space-y-2">
                    {currentPaper2.examPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                        <p className="leading-relaxed font-sans">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Canonical Writers & Works */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-amber-600" />
                  <span>Prescribed Writers, Works & Textual Critical Themes</span>
                </h4>

                {currentPaper2.keyWritersAndWorks.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-sky-200 p-5 space-y-3 shadow-xs">
                    <div className="flex items-start justify-between">
                      <h5 className="font-editorial text-base font-bold text-slate-900 flex items-center gap-2">
                        <span>{item.writer}</span>
                        <span className="text-xs font-sans text-amber-700 font-medium">({item.years})</span>
                      </h5>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {item.majorWorks.map((work, wIdx) => (
                        <span key={wIdx} className="px-2.5 py-0.5 rounded-lg bg-sky-50 text-xs text-slate-800 border border-sky-200 font-serif">
                          {work}
                        </span>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-sky-50/75 border border-sky-200 text-xs space-y-1">
                      <span className="font-semibold text-slate-800">Dominant Hermeneutic Themes:</span>
                      <p className="text-slate-600 leading-relaxed font-sans">{item.criticalThemes}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <span className="font-bold text-amber-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>High-Yield Exam Takeaway:</span>
                      </span>
                      <p className="leading-relaxed font-sans">{item.highYieldExamNote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: MPESB TET GRADE-1 (HIGH SCHOOL TEACHER SELECTION) */}
      {masterTab === 'mp-grade1' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Section banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <School className="w-5 h-5 text-emerald-600" />
                <span>MPESB High School Teacher Selection Test (Grade 1 / Varg 1)</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Specialized Madhya Pradesh Curriculum: NCERT Class 9-12 Prescribed Prose, Poetry, Figures of Speech & Prosody
              </p>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search NCERT texts..."
                className="bg-white border border-emerald-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 w-full sm:w-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Navigation List */}
            <div className="lg:col-span-4 space-y-2">
              {g1Units.filter(u => u.title.toLowerCase().includes(searchQuery.toLowerCase()) || u.overview.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => {
                const isSelected = u.id === currentGrade1.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      audioFeedback.playClick();
                      setSelectedGrade1Id(u.id);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                        : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono uppercase">
                        {u.classLevel || 'MP Core'}
                      </span>
                      <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-600" />
                        <span>Exam Points</span>
                      </span>
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                      {u.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{u.section}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Grade 1 View */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-3 shadow-sm">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  {currentGrade1.section}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  {currentGrade1.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{currentGrade1.overview}</p>
              </div>

              {/* DEDICATED EXAM POINTS BOX */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/70 border-2 border-amber-300 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="font-editorial text-sm font-bold text-amber-800 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600 fill-current" />
                    <span>🔥 High-Yield Exam Points (MPESB Grade-1 Direct Questions)</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-mono font-semibold">High School Pattern</span>
                </div>
                <div className="space-y-2">
                  {currentGrade1.examPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <p className="leading-relaxed font-sans">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescribed Texts Cards */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-emerald-600" />
                  <span>Prescribed Textual Deep-Dive & Character Notes</span>
                </h4>

                {currentGrade1.prescribedTexts.map((text, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-sky-200 p-5 space-y-3 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-editorial text-lg font-bold text-slate-900">{text.title}</h5>
                        <p className="text-xs text-emerald-700 font-sans font-medium">
                          By {text.author} • <span className="text-slate-500">({text.bookSource})</span>
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed font-sans bg-sky-50/75 p-3 rounded-xl border border-sky-200">
                      {text.plotAndThemes}
                    </p>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>High-Yield Exam Pointers for this Text:</span>
                      </span>
                      <ul className="space-y-1 text-xs text-slate-800">
                        {text.highYieldExamPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: MPESB TET GRADE-2 (MIDDLE SCHOOL & PEDAGOGY) */}
      {masterTab === 'mp-grade2' && (
        <div className="space-y-6 animate-in fade-in">
          {/* Section banner */}
          <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                <span>MPESB Middle School Teacher (Grade 2 / Varg 2) & TET Pedagogy</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Functional Applied Grammar, Lexical Affixes, and 15-Mark Language Development Pedagogy for TET
              </p>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Grade 2 topics..."
                className="bg-white border border-purple-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 w-full sm:w-60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Navigation List */}
            <div className="lg:col-span-4 space-y-2">
              {g2Units.filter(u => u.title.toLowerCase().includes(searchQuery.toLowerCase()) || u.overview.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => {
                const isSelected = u.id === currentGrade2.id;
                return (
                  <div
                    key={u.id}
                    onClick={() => {
                      audioFeedback.playClick();
                      setSelectedGrade2Id(u.id);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50 border-purple-500 shadow-sm'
                        : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono uppercase">
                        {u.section}
                      </span>
                      <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-600" />
                        <span>Exam Points</span>
                      </span>
                    </div>
                    <h4 className="font-editorial text-sm font-bold text-slate-900 mt-1.5 leading-snug">
                      {u.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{u.overview}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Grade 2 View */}
            <div className="lg:col-span-8 space-y-5">
              <div className="bg-white rounded-2xl border border-sky-200 p-6 space-y-3 shadow-sm">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                  {currentGrade2.section}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900">
                  {currentGrade2.title}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{currentGrade2.overview}</p>
              </div>

              {/* DEDICATED EXAM POINTS BOX */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/70 border-2 border-amber-300 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="font-editorial text-sm font-bold text-amber-800 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600 fill-current" />
                    <span>🔥 High-Yield Exam Points (MPESB Grade-2 & TET Guaranteed Questions)</span>
                  </span>
                  <span className="text-[10px] text-amber-700 font-mono font-semibold">TET Syllabus</span>
                </div>
                <div className="space-y-2">
                  {currentGrade2.examPoints.map((pt, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                      <p className="leading-relaxed font-sans">{pt}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Topics Breakdown */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-purple-600" />
                  <span>Curriculum Breakdown & Instructional Modules</span>
                </h4>

                {currentGrade2.topics.map((t, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-sky-200 p-5 space-y-3 shadow-xs">
                    <h5 className="font-editorial text-base font-bold text-slate-900">{t.name}</h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans bg-sky-50/75 p-3 rounded-xl border border-sky-200">
                      {t.content}
                    </p>

                    <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>High-Yield Examination Tips:</span>
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {t.highYieldExamPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
