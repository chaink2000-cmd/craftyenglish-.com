import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  FileText,
  FileDown,
  BarChart3,
  Search,
  Copy,
  Check,
  Volume2,
  Printer,
  Download,
  Eye,
  X,
  BookOpen,
  GraduationCap,
  Landmark,
  Sparkles,
  ZoomIn,
  Table2,
} from 'lucide-react';
import { ResourceSubTab } from '../types';
import { audioFeedback } from '../utils/audioFeedback';
import partsTreeImg from '../assets/images/grammar_parts_speech_tree_1794577616722.jpg';
import tensesTimelineImg from '../assets/images/grammar_tenses_timeline_1794577616009.jpg';
import voiceBridgeImg from '../assets/images/grammar_voice_transformation_1794577616907.jpg';
import clausesArchImg from '../assets/images/grammar_clauses_architecture_1794577617759.jpg';
import stylisticsProsodyImg from '../assets/images/grammar_stylistics_prosody_1794577618258.jpg';

interface StudyResourcesHubProps {
  initialSubTab?: ResourceSubTab;
  subTabNonce?: number;
  onAddXP?: (xp: number) => void;
}

interface RevisionNote {
  id: string;
  track: 'Grammar' | 'NTA NET Paper 1' | 'NET & MPSET Lit' | 'MPESB TET';
  title: string;
  subtitle: string;
  summary: string;
  bulletPoints: string[];
  examTip: string;
}

interface PdfPack {
  id: string;
  title: string;
  examBadge: string;
  pagesLabel: string;
  updatedLabel: string;
  description: string;
  contents: string[];
  sampleExcerpt: string[];
}

const REVISION_NOTES: RevisionNote[] = [
  {
    id: 'note-concord',
    track: 'Grammar',
    title: '20 Golden Rules of Subject-Verb Agreement & Inversion',
    subtitle: 'High-Frequency MPESB Grade 1/2 & Competitive Grammar',
    summary:
      'Master singular vs. plural agreement triggers including additive connectors (as well as, along with), proximity rules (neither...nor), collective nouns, and negative adverbial inversions.',
    bulletPoints: [
      'When subjects are joined by "as well as", "with", "together with", or "in addition to", the verb agrees with the FIRST subject.',
      'With "Neither...nor", "Either...or", and "Not only...but also", the verb matches the NEAREST subject.',
      '"Each", "Every", "Everyone", "Neither of", and "One of the + Plural Noun" ALWAYS take a singular verb.',
      'Negative adverbs at the start ("Hardly", "Scarcely", "Seldom", "Never") trigger obligatory inversion: Hardly had + S + V3... when...',
    ],
    examTip: 'Never use "than" after Hardly/Scarcely (always use "when"). Use "than" strictly after "No sooner... had/did".',
  },
  {
    id: 'note-net-p1',
    track: 'NTA NET Paper 1',
    title: 'NTA NET Paper 1: Teaching, Research & Square of Opposition',
    subtitle: 'Units 1, 2 & 6 Rapid Revision Sheet',
    summary:
      'Essential synthesis of Bloom Taxonomy domains, Positivism vs. Post-Positivism paradigms, Indian Logic Pramanas, and Classical Square of Opposition truth-value inference.',
    bulletPoints: [
      'Levels of Teaching: Memory (Herbart - recall), Understanding (Morrison - mastery of concepts), Reflective (Hunt - problem solving).',
      'Sampling Probability Methods: Simple Random, Stratified (heterogeneous groups), Systematic, Cluster (geographical units).',
      'Square of Opposition: Contradictories (A-O, E-I) never share the same truth value; Contraries (A-E) cannot both be true but can both be false.',
      'Nyaya Syllogism (5 steps): Pratijna (Proposition), Hetu (Reason), Udaharana (Example), Upanaya (Application), Nigamana (Conclusion).',
    ],
    examTip: 'Look for the middle term (Hetu) and major term (Sadhya) carefully when solving Hetvabhasa (fallacy) questions.',
  },
  {
    id: 'note-lit-theory',
    track: 'NET & MPSET Lit',
    title: 'Literary Criticism & Post-WWII Theory Map',
    subtitle: 'Unit 8 & Unit 9 Chronological Anchor Notes',
    summary:
      'High-yield mapping of Russian Formalism, New Criticism, Structuralism, Deconstruction, Postcolonial Studies, and Reader-Response theorists.',
    bulletPoints: [
      'Viktor Shklovsky coined "Ostranenie" (Defamiliarization) in "Art as Technique" (1917).',
      'Cleanth Brooks ("The Well Wrought Urn", 1947) warned against the "Heresy of Paraphrase"; Wimsatt & Beardsley defined Intentional and Affective Fallacies.',
      'Jacques Derrida delivered "Structure, Sign, and Play in the Discourse of the Human Sciences" (1966), launching Poststructuralism.',
      'Homi Bhabha formulated "Mimicry", "Hybridity", and "Third Space" in "The Location of Culture" (1994).',
    ],
    examTip: 'NTA NET frequently asks chronological matching of seminal critical texts (e.g., 1957 Frye Anatomy -> 1967 Barthes Death of the Author -> 1978 Said Orientalism).',
  },
  {
    id: 'note-mpesb-p1',
    track: 'MPESB TET',
    title: 'MPESB TET Grade 1, Grade 2 & Common Paper 1 Essentials',
    subtitle: 'Part-A (CDP, Hindi, English, MP GK) & Language Pedagogy',
    summary:
      'Focused notes for MPESB Varg 1 & Varg 2 combining Piaget/Vygotsky/Kohlberg CDP principles, Chomsky LAD vs. Krashen Monitor Hypothesis, and MP cultural landmarks.',
    bulletPoints: [
      'Noam Chomsky: Language Acquisition Device (LAD) and Universal Grammar; Lev Vygotsky: Zone of Proximal Development (ZPD) & Scaffolding.',
      'Stephen Krashen 5 Hypotheses: Acquisition-Learning, Monitor, Natural Order, Input (i + 1), Affective Filter.',
      'MPESB Common Paper 1 Hindi: Tatpurush vs. Karmadharaya Samas, Sandhi rules, and Ras-Chhand-Alankar distinctions.',
      'MP GK Core: Bhimbetka (UNESCO 2003), Sanchi Stupa (1989), Khajuraho (1986), Narmada origin at Amarkantak.',
    ],
    examTip: 'Distinguish clearly between Krashen "Comprehensible Input (i+1)" and Vygotsky "MKO / ZPD" in pedagogy MCQs.',
  },
  {
    id: 'note-prosody',
    track: 'NET & MPSET Lit',
    title: 'Prosody, Metrical Scansion & Figures of Speech',
    subtitle: 'Unit 2 Poetry & MPESB Grade 1 Stylistics',
    summary:
      'Quick memory blueprint for English poetic feet, Shakespearean vs. Petrarchan sonnet rhyme schemes, and easily confused rhetorical figures.',
    bulletPoints: [
      'Iambic (da-DUM), Trochaic (DA-dum), Anapestic (da-da-DUM), Dactylic (DA-da-dum), Spondaic (DA-DA).',
      'Petrarchan Sonnet: Octave (ABBA ABBA) + Volta + Sestet (CDE CDE / CDC DCD).',
      'Shakespearean Sonnet: 3 Quatrains + Couplet (ABAB CDCD EFEF GG); Spenserian Sonnet: Linked rhyme (ABAB BCBC CDCD EE).',
      'Synecdoche (part for whole: "all hands on deck") vs. Metonymy (associated attribute: "the Crown" for monarchy).',
    ],
    examTip: 'Check whether the figure substitutes a physical part of the object (Synecdoche) or an external attribute/institution (Metonymy).',
  },
];

const PDF_PACKS: PdfPack[] = [
  {
    id: 'pdf-grammar',
    title: 'English Grammar 7-Pillar Visual Handbook & Rules',
    examBadge: 'All Competitive Exams',
    pagesLabel: '42 Pages · Structured Rules + Tables',
    updatedLabel: '2026 Edition · Mr. ChainSingh Kushro',
    description:
      'Complete reference covering Parts of Speech, Determiners, 12 Tenses, Subject-Verb Concord, Active/Passive Voice, Narration, Clauses, Word Roots, and Figures of Speech.',
    contents: [
      'Module 1: 8 Parts of Speech & Verb Classification Matrix',
      'Module 2: Articles (A/An/The/Zero) & Quantifiers Chart',
      'Module 3: 12 Verb Tenses + 20 Subject-Verb Agreement Rules',
      'Module 4: Voice Transformation, Narration Shifts & Mixed Conditionals',
      'Module 5–7: Clauses, Latin/Greek Roots, Figures of Speech & Prosody',
    ],
    sampleExcerpt: [
      'GOLDEN RULE #4 (Additive Connectors): When two subjects are connected by "as well as", "with", "together with", "along with", "accompanied by", or "besides", the finite verb agrees strictly with the FIRST subject. Example: The Captain, along with all his sailors, WAS rescued.',
      'CONDITIONAL MATRIX: Type 0 (General truth: If + V1, V1) | Type 1 (Real future: If + V1, will + V1) | Type 2 (Unreal present: If + were/V2, would + V1) | Type 3 (Unreal past: If + had + V3, would have + V3).',
      'QUESTION TAG EXCEPTIONS: "Let us go -> shall we?" | "I am right -> aren’t I?" | "Nobody called -> did they?" | "Open the door -> will you?"',
    ],
  },
  {
    id: 'pdf-net-p1',
    title: 'NTA UGC NET Paper 1 Complete 10-Unit Study Digest',
    examBadge: 'NTA NET Compulsory Paper 1',
    pagesLabel: '58 Pages · Units 1–10 Summary',
    updatedLabel: 'Aligned to NTA Syllabus',
    description:
      'High-yield printable compendium covering Teaching & Research Aptitude, Communication, Reasoning, Indian Logic (Hetvabhasa), Data Interpretation, ICT, People & Environment, and NEP 2020.',
    contents: [
      'Units 1–2: Teaching Levels, Learner Characteristics & Research Ethics',
      'Units 3–5: Reading Comprehension & Mathematical Ratio/Percentage Tricks',
      'Unit 6: Classical Square of Opposition, Venn Diagrams & Indian Logic',
      'Units 7–10: ICT Protocols, Kyoto/Paris/SDGs & Higher Education Bodies',
    ],
    sampleExcerpt: [
      'SQUARE OF OPPOSITION QUICK KEY: Universal Affirmative (A: All S are P) vs Universal Negative (E: No S are P) = CONTRARIES. They cannot both be true simultaneously, though both may be false.',
      'ENVIRONMENT LANDMARKS: Stockholm Conference (1972) -> Montreal Protocol (1987, Ozone) -> Rio Earth Summit (1992) -> Kyoto Protocol (1997, GHGs) -> Paris Agreement (2015, <2°C) -> International Solar Alliance (2015).',
      'HIGHER EDUCATION BODIES: Radhakrishnan Commission (1948–49) -> Kothari Commission (1964–66) -> NEP 2020 (5+3+3+4 structure, GER target 50% by 2035).',
    ],
  },
  {
    id: 'pdf-net-p2',
    title: 'NTA NET & MPSET English Literature Paper 2 Canon Guide',
    examBadge: 'NTA NET Paper 2 & MPSET',
    pagesLabel: '84 Pages · Units 1–10 Chronology',
    updatedLabel: 'Includes Indian Writing & Theory',
    description:
      'Unified literary chronology across British, American, Indian, and Postcolonial canons, plus Schools of Criticism and ELT frameworks curated by Mr. ChainSingh Kushro.',
    contents: [
      'Units 1–4: Drama, Poetry, Fiction & Non-Fictional Prose Chronology',
      'Units 5–6: English in India (Macaulay 1835, Wood Despatch 1854) & ELT',
      'Unit 7: Cultural Studies (Stuart Hall, Raymond Williams, Hoggart)',
      'Units 8–10: Classical Aesthetics, Modern Critical Theory & Research Methods',
    ],
    sampleExcerpt: [
      'DRAMA TIMELINE: Everyman (c.1495 Morality) -> Gorboduc (1561 Blank Verse Tragedy) -> Marlowe Doctor Faustus (c.1592) -> Dryden Essay of Dramatick Poesie (1668) -> Shaw Arms and the Man (1894) -> Beckett Waiting for Godot (1953).',
      'CULTURAL STUDIES TRIO: Richard Hoggart ("The Uses of Literacy", 1957), Raymond Williams ("Culture and Society", 1958), E.P. Thompson ("The Making of the English Working Class", 1963), followed by Stuart Hall CCCS Birmingham (1964).',
      'RESEARCH METHODS UNIT 10: MLA 9th Edition works cited core elements (Author, Title of source, Container, Contributors, Version, Number, Publisher, Publication date, Location).',
    ],
  },
  {
    id: 'pdf-mpesb',
    title: 'MPESB TET Grade 1, Grade 2 & Common Paper 1 (100 Points)',
    examBadge: 'MPESB Varg 1 & Varg 2',
    pagesLabel: '48 Pages · NCERT + 100 Points',
    updatedLabel: 'Latest MPESB Selection Blueprint',
    description:
      'Complete bilingual-friendly study dossier covering Common Paper 1 (CDP, Hindi, English, MP GK, Reasoning), Top 100 Exam Points, Class 9–12 NCERT chapters, and Varg 2 Pedagogy.',
    contents: [
      'MPESB Common Paper 1: Units 1–5 Complete Breakdown',
      'Top 100 One-Liner High-Yield Exam Points for Revision',
      'MPESB Grade 1 (Varg 1): NCERT Hornbill, Snapshots, Flamingo & Vistas Notes',
      'MPESB Grade 2 (Varg 2): Grammar, Reading Skills & 15-Mark TET Pedagogy',
    ],
    sampleExcerpt: [
      'MPESB COMMON PAPER 1 WEIGHTAGE: General Hindi (8 Qs), General English (5 Qs), General Knowledge / MP GK (7 Qs), Reasoning & Numerical Ability (7 Qs), Child Development & Pedagogy (10 Qs) — Part A Total Concept Map.',
      'GRADE 1 NCERT ANCHORS: Kushwant Singh "The Portrait of a Lady" (Hornbill), Alphonse Daudet "The Last Lesson" (Flamingo, Franco-Prussian War setting), Pearl S. Buck "The Enemy" (Vistas, Dr. Sadao Hoki).',
      'GRADE 2 PEDAGOGY: Whole Language Approach vs. Phonics, Formative Assessment (Assessment FOR Learning) vs. Summative Assessment (Assessment OF Learning).',
    ],
  },
];

const VISUAL_CHARTS = [
  {
    id: 'chart-pos',
    title: 'Parts of Speech & Syntactic Tree Chart',
    category: 'Foundation Grammar',
    image: partsTreeImg,
    caption: 'Complete taxonomic branching of Nouns, Pronouns, Verbs, Adjectives, Adverbs, Prepositions, Conjunctions, and Interjections.',
  },
  {
    id: 'chart-tenses',
    title: '12 Verb Tenses Timeline & Aspect Matrix',
    category: 'Tenses & Agreement',
    image: tensesTimelineImg,
    caption: 'Visual past-present-future timeline mapping Simple, Continuous, Perfect, and Perfect Continuous auxiliary formulas.',
  },
  {
    id: 'chart-voice',
    title: 'Active-Passive & Transformation Flow Chart',
    category: 'Transformations',
    image: voiceBridgeImg,
    caption: 'Subject-Object crossover transformation path alongside Direct-Indirect reporting tense backshift rules.',
  },
  {
    id: 'chart-clauses',
    title: 'Clauses & Complex Sentence Architecture',
    category: 'Clause & Syntax',
    image: clausesArchImg,
    caption: 'Architectural diagram contrasting Independent Main Clauses, Subordinate Clauses (Noun/Adjective/Adverb), and FANBOYS coordination.',
  },
  {
    id: 'chart-stylistics',
    title: 'Figures of Speech & Metrical Prosody Wheel',
    category: 'Stylistics & Literature',
    image: stylisticsProsodyImg,
    caption: 'Visual scansion guide for Iambic/Trochaic/Anapestic/Dactylic meters, Sonnet octave-sestet division, and poetic devices.',
  },
];

export const StudyResourcesHub: React.FC<StudyResourcesHubProps> = ({
  initialSubTab,
  subTabNonce,
  onAddXP,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ResourceSubTab>(initialSubTab || 'notes');
  const [noteFilter, setNoteFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewPack, setPreviewPack] = useState<PdfPack | null>(null);
  const [zoomChart, setZoomChart] = useState<(typeof VISUAL_CHARTS)[number] | null>(null);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab, subTabNonce]);

  const filteredNotes = REVISION_NOTES.filter((note) => {
    const matchesTrack = noteFilter === 'All' || note.track === noteFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      note.title.toLowerCase().includes(q) ||
      note.summary.toLowerCase().includes(q) ||
      note.bulletPoints.some((b) => b.toLowerCase().includes(q));
    return matchesTrack && matchesQuery;
  });

  const handleCopyNote = (note: RevisionNote) => {
    const text = `${note.title}\n${note.subtitle}\n\n${note.bulletPoints.map((b, i) => `${i + 1}. ${b}`).join('\n')}\n\nExam Tip: ${note.examTip}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    audioFeedback.playSuccess();
    setCopiedId(note.id);
    if (onAddXP) onAddXP(10);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeakNote = (note: RevisionNote) => {
    audioFeedback.playClick();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `${note.title}. ${note.summary} Key points: ${note.bulletPoints.join('. ')}`
      );
      utterance.rate = 0.96;
      utterance.lang = 'en-GB';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDownloadPack = (pack: PdfPack) => {
    audioFeedback.playSuccess();
    if (onAddXP) onAddXP(25);
    const htmlContent = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${pack.title} — Crafty English</title>
<style>
  body { font-family: Georgia, serif; max-width: 820px; margin: 40px auto; color: #0f172a; line-height: 1.6; padding: 0 20px; }
  header { border-bottom: 2px solid #0284c7; padding-bottom: 14px; margin-bottom: 24px; }
  h1 { color: #0369a1; margin: 0 0 6px; font-size: 26px; }
  .meta { font-family: sans-serif; font-size: 13px; color: #475569; }
  h2 { font-family: sans-serif; color: #0f172a; font-size: 17px; margin-top: 24px; border-left: 4px solid #0284c7; padding-left: 10px; }
  ul, .excerpt { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 14px 20px; }
  .excerpt p { margin: 10px 0; }
  footer { margin-top: 36px; border-top: 1px solid #cbd5e1; padding-top: 12px; font-family: sans-serif; font-size: 12px; color: #64748b; }
</style>
</head>
<body>
  <header>
    <h1>${pack.title}</h1>
    <div class="meta">${pack.examBadge} · ${pack.pagesLabel} · Curated by Mr. ChainSingh Kushro (chaink2000@gmail.com)</div>
  </header>
  <p>${pack.description}</p>
  <h2>Included Modules</h2>
  <ul>${pack.contents.map((item) => `<li>${item}</li>`).join('')}</ul>
  <h2>High-Yield Revision Excerpts</h2>
  <div class="excerpt">${pack.sampleExcerpt.map((ex) => `<p>${ex}</p>`).join('')}</div>
  <footer>© 2026 Crafty English Academy · Founder &amp; Lead Educator: Mr. ChainSingh Kushro · Contact: chaink2000@gmail.com</footer>
</body>
</html>`;
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${pack.id}-crafty-english.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintPdf = () => {
    audioFeedback.playClick();
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-white via-sky-50 to-blue-100/75 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700">
              <FolderKanban className="w-4 h-4 text-sky-600" />
              <span>Study Resources Vault · Notes, Printable PDF Booklets & Visual Charts</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curated Notes, PDF Packs & Study Charts
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Structured revision sheets, printable handbooks, and high-resolution reference tables curated by{' '}
              <strong className="text-slate-900 font-semibold">Mr. ChainSingh Kushro</strong> for Grammar, NTA NET Paper 1 &amp; 2, MPSET, and MPESB Grade 1 &amp; 2.
            </p>
          </div>

          {/* 3-Tab Sub-Navigation: Notes | PDF | Charts */}
          <div className="inline-flex p-1.5 rounded-2xl bg-white border border-sky-200 shadow-sm shrink-0 self-start lg:self-auto">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setActiveSubTab('notes');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'notes'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-sky-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Notes</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setActiveSubTab('pdf');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'pdf'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-sky-50'
              }`}
            >
              <FileDown className="w-4 h-4" />
              <span>PDF Booklets</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setActiveSubTab('charts');
              }}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'charts'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-sky-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Charts & Tables</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: NOTES */}
      {activeSubTab === 'notes' && (
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white border border-sky-200 rounded-2xl p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Grammar', 'NTA NET Paper 1', 'NET & MPSET Lit', 'MPESB TET'].map((track) => (
                <button
                  key={track}
                  onClick={() => {
                    audioFeedback.playClick();
                    setNoteFilter(track);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    noteFilter === track
                      ? 'bg-sky-600 text-white'
                      : 'bg-sky-50 text-slate-700 hover:bg-sky-100 border border-sky-200'
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-sky-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, scholars, rules..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredNotes.map((note) => (
              <article
                key={note.id}
                className="rounded-2xl bg-white border border-sky-200 p-6 space-y-4 shadow-sm hover:border-sky-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-sky-700 block">
                      {note.track} · {note.subtitle}
                    </span>
                    <h2 className="font-editorial text-xl font-bold text-slate-900 mt-1">
                      {note.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleSpeakNote(note)}
                      title="Listen to Summary"
                      className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleCopyNote(note)}
                      title="Copy Revision Note"
                      className="p-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-700 cursor-pointer"
                    >
                      {copiedId === note.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{note.summary}</p>

                <ul className="space-y-2 bg-sky-50/75 border border-sky-200/80 rounded-xl p-4">
                  {note.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 leading-relaxed">
                      <span className="w-5 h-5 rounded-md bg-white border border-sky-200 text-sky-700 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded-xl bg-amber-50/90 border border-amber-200 p-3 flex items-start gap-2 text-xs text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="font-semibold">Exam Tip:</strong> {note.examTip}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PDF BOOKLETS */}
      {activeSubTab === 'pdf' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PDF_PACKS.map((pack) => (
              <div
                key={pack.id}
                className="rounded-2xl bg-white border border-sky-200 p-6 flex flex-col justify-between space-y-5 shadow-sm hover:border-sky-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-sky-700">{pack.examBadge}</span>
                    <span className="font-mono text-[11px] text-slate-500">{pack.pagesLabel}</span>
                  </div>

                  <h2 className="font-editorial text-xl font-bold text-slate-900">{pack.title}</h2>
                  <p className="text-xs text-slate-600 leading-relaxed">{pack.description}</p>

                  <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3.5 space-y-1.5">
                    <div className="text-[11px] font-semibold text-sky-900">Booklet Contents</div>
                    {pack.contents.map((item) => (
                      <div key={item} className="text-xs text-slate-700 flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-sky-100 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">{pack.updatedLabel}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        audioFeedback.playClick();
                        setPreviewPack(pack);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-semibold cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={handlePrintPdf}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-sky-50 border border-sky-200 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-sky-600" />
                      <span>Save PDF</span>
                    </button>
                    <button
                      onClick={() => handleDownloadPack(pack)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VISUAL CHARTS & MASTER TABLES */}
      {activeSubTab === 'charts' && (
        <div className="space-y-8">
          {/* Illustrated Charts Gallery */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-editorial text-2xl font-bold text-slate-900">
                  Visual Grammar &amp; Prosody Poster Charts
                </h2>
                <p className="text-xs text-slate-600">
                  Click any visual diagram to inspect high-resolution details or download for offline revision.
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-sky-700">5 Visual Posters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VISUAL_CHARTS.map((chart) => (
                <div
                  key={chart.id}
                  className="rounded-2xl bg-white border border-sky-200 overflow-hidden shadow-sm hover:border-sky-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative bg-sky-50 border-b border-sky-200 aspect-[16/10] overflow-hidden">
                      <img
                        src={chart.image}
                        alt={chart.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                      />
                      <button
                        onClick={() => {
                          audioFeedback.playClick();
                          setZoomChart(chart);
                        }}
                        className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/95 border border-sky-200 text-sky-800 text-[11px] font-semibold shadow-sm hover:bg-sky-50 cursor-pointer"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </button>
                    </div>
                    <div className="p-4 space-y-1.5">
                      <span className="text-[11px] font-semibold text-sky-700">{chart.category}</span>
                      <h3 className="font-editorial text-base font-bold text-slate-900">{chart.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{chart.caption}</p>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex items-center justify-between">
                    <a
                      href={chart.image}
                      download={`${chart.id}.jpg`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Chart</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Master Reference Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Table 1: 12 Tenses Formula Chart */}
            <div className="rounded-2xl bg-white border border-sky-200 p-5 space-y-4 shadow-sm overflow-x-auto">
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-sky-600" />
                <h3 className="font-editorial text-lg font-bold text-slate-900">
                  12 Verb Tenses Quick Formula Chart
                </h3>
              </div>
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-sky-50 text-sky-900 border-b border-sky-200">
                    <th className="p-2.5 font-semibold">Aspect</th>
                    <th className="p-2.5 font-semibold">Present</th>
                    <th className="p-2.5 font-semibold">Past</th>
                    <th className="p-2.5 font-semibold">Future</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Simple</td>
                    <td className="p-2.5 font-mono">V1 / V1+s</td>
                    <td className="p-2.5 font-mono">V2</td>
                    <td className="p-2.5 font-mono">will + V1</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Continuous</td>
                    <td className="p-2.5 font-mono">is/am/are + V-ing</td>
                    <td className="p-2.5 font-mono">was/were + V-ing</td>
                    <td className="p-2.5 font-mono">will be + V-ing</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Perfect</td>
                    <td className="p-2.5 font-mono">has/have + V3</td>
                    <td className="p-2.5 font-mono">had + V3</td>
                    <td className="p-2.5 font-mono">will have + V3</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">Perf. Cont.</td>
                    <td className="p-2.5 font-mono">has/have been + V-ing</td>
                    <td className="p-2.5 font-mono">had been + V-ing</td>
                    <td className="p-2.5 font-mono">will have been + V-ing</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table 2: Exam Track Blueprint Comparison Chart */}
            <div className="rounded-2xl bg-white border border-sky-200 p-5 space-y-4 shadow-sm overflow-x-auto">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-600" />
                <h3 className="font-editorial text-lg font-bold text-slate-900">
                  Exam Structure &amp; Syllabus Weightage Chart
                </h3>
              </div>
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-sky-50 text-sky-900 border-b border-sky-200">
                    <th className="p-2.5 font-semibold">Exam Track</th>
                    <th className="p-2.5 font-semibold">Paper / Marks</th>
                    <th className="p-2.5 font-semibold">Core Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sky-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">NTA NET Paper 1</td>
                    <td className="p-2.5 font-mono">50 Qs · 100 Marks</td>
                    <td className="p-2.5">Teaching, Research, Logic, ICT, Environment</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">NET / MPSET Paper 2</td>
                    <td className="p-2.5 font-mono">100 Qs · 200 Marks</td>
                    <td className="p-2.5">British, Indian Lit, Theory, Cultural Studies, ELT</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">MPESB Paper 1 Common</td>
                    <td className="p-2.5 font-mono">Part A · Grade 1 &amp; 2</td>
                    <td className="p-2.5">CDP, General Hindi, English, MP GK, Reasoning</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-semibold text-slate-900">MPESB Grade 1 &amp; 2</td>
                    <td className="p-2.5 font-mono">Main Subject Paper</td>
                    <td className="p-2.5">NCERT Class 9–12 Texts, Grammar &amp; TET Pedagogy</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Printable Booklet Preview Modal */}
      {previewPack && (
        <div className="fixed inset-0 z-50 bg-sky-200/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white border border-sky-200 shadow-2xl p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-sky-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-sky-700">{previewPack.examBadge}</span>
                <h3 className="font-editorial text-2xl font-bold text-slate-900 mt-0.5">
                  {previewPack.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewPack(null)}
                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-slate-600 cursor-pointer"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-800">High-Yield Excerpt Samples</div>
              {previewPack.sampleExcerpt.map((ex, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-800 leading-relaxed"
                >
                  {ex}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-sky-100">
              <div className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                <Landmark className="w-4 h-4 text-sky-600" />
                <span>Curated by Mr. ChainSingh Kushro</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintPdf}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 text-xs font-semibold cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => handleDownloadPack(previewPack)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Booklet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Chart Zoom Modal */}
      {zoomChart && (
        <div className="fixed inset-0 z-50 bg-sky-200/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-3xl bg-white border border-sky-200 shadow-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-sky-700">{zoomChart.category}</span>
                <h3 className="font-editorial text-xl font-bold text-slate-900">{zoomChart.title}</h3>
              </div>
              <button
                onClick={() => setZoomChart(null)}
                className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-slate-700 cursor-pointer"
                aria-label="Close Zoom"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-sky-200 bg-sky-50 max-h-[65vh] flex items-center justify-center">
              <img src={zoomChart.image} alt={zoomChart.title} className="w-full h-full object-contain max-h-[65vh]" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-600">{zoomChart.caption}</p>
              <a
                href={zoomChart.image}
                download={`${zoomChart.id}.jpg`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Save Chart Image</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
