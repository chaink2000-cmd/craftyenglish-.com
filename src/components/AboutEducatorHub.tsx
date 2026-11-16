import React, { useState } from 'react';
import {
  UserCheck,
  Mail,
  GraduationCap,
  BookOpen,
  Award,
  ShieldCheck,
  Landmark,
  FileCheck2,
  Send,
  CheckCircle,
  ArrowRight,
  FolderKanban,
} from 'lucide-react';
import { LiteratureTrack, NavTab, ResourceSubTab } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface AboutEducatorHubProps {
  onNavigateTab: (tab: NavTab) => void;
  onOpenLiteratureTrack: (track: LiteratureTrack) => void;
  onOpenResourceTab: (subTab: ResourceSubTab) => void;
}

const INQUIRY_STORAGE_KEY = 'crafty_english_educator_inquiries_v1';

export const AboutEducatorHub: React.FC<AboutEducatorHubProps> = ({
  onNavigateTab,
  onOpenLiteratureTrack,
  onOpenResourceTab,
}) => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [examTarget, setExamTarget] = useState('NTA NET English Paper 1 & 2');
  const [message, setMessage] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentEmail.trim() || !message.trim()) return;

    audioFeedback.playSuccess();
    try {
      const existing = JSON.parse(localStorage.getItem(INQUIRY_STORAGE_KEY) || '[]');
      existing.unshift({
        id: `inq-${Date.now()}`,
        studentName: studentName.trim(),
        studentEmail: studentEmail.trim(),
        examTarget,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(existing.slice(0, 25)));
    } catch {
      // Ignore storage error
    }

    setSubmittedSuccess(true);
    setStudentName('');
    setStudentEmail('');
    setMessage('');
    setTimeout(() => setSubmittedSuccess(false), 5000);
  };

  const specializations = [
    {
      title: 'NTA UGC NET Paper 1 & English Paper 2',
      desc: '10-unit Research & Teaching Aptitude framework paired with complete British, American, Indian, and Critical Theory canon.',
      icon: <GraduationCap className="w-5 h-5 text-sky-700" />,
      actionLabel: 'Explore NET Syllabus',
      onClick: () => onOpenLiteratureTrack('net-mpset-paper2'),
    },
    {
      title: 'MPESB TET Grade 1, Grade 2 & Paper 1',
      desc: 'Targeted preparation for Varg 1 NCERT texts, Varg 2 Functional Grammar & Pedagogy, and the 100-Point Common Paper 1 blueprint.',
      icon: <Landmark className="w-5 h-5 text-amber-600" />,
      actionLabel: 'Open MPESB Paper 1',
      onClick: () => onNavigateTab('mpesb-paper1'),
    },
    {
      title: '7-Pillar Visual English Grammar',
      desc: 'Prescriptive and descriptive syntax mastery covering Parts of Speech, 12 Verb Tenses, Voice, Narration, Clauses, and Prosody.',
      icon: <BookOpen className="w-5 h-5 text-blue-700" />,
      actionLabel: 'Visit Grammar Atlas',
      onClick: () => onNavigateTab('grammar'),
    },
    {
      title: '2014–2024 Year-Wise PYQ Mastery',
      desc: 'Decade-long authentic exam bank with detailed distractor elimination strategies and conceptual rationale.',
      icon: <FileCheck2 className="w-5 h-5 text-emerald-700" />,
      actionLabel: 'Launch Practice Zone',
      onClick: () => onNavigateTab('mcqs'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Educator Hero Bio Banner */}
      <section className="rounded-3xl bg-gradient-to-br from-white via-sky-50 to-blue-100/80 border border-sky-200 p-7 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700">
              <UserCheck className="w-4 h-4 text-sky-600" />
              <span>Founder, Curriculum Architect &amp; Lead Educator</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Mr. ChainSingh Kushro
            </h1>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
              Educator and Founder of <strong className="text-slate-900 font-semibold">Crafty English</strong>, dedicated to empowering aspirants of{' '}
              <strong className="text-sky-800 font-semibold">NTA UGC NET (Paper 1 &amp; English Paper 2)</strong>,{' '}
              <strong className="text-sky-800 font-semibold">MPSET</strong>, and{' '}
              <strong className="text-sky-800 font-semibold">MPESB Teacher Selection Examinations (Grade 1, Grade 2 &amp; Common Paper 1)</strong> through visual grammar clarity, chronological literary mastery, and rigorous past-paper analysis.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:chaink2000@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email: chaink2000@gmail.com</span>
              </a>
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  onOpenResourceTab('notes');
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-slate-800 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
              >
                <FolderKanban className="w-4 h-4 text-sky-600" />
                <span>Browse Study Resources</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl bg-white border border-sky-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-sky-100 pb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white font-editorial text-xl font-bold shadow-md shadow-sky-500/20">
                CK
              </div>
              <div>
                <div className="font-editorial text-lg font-bold text-slate-900">ChainSingh Kushro</div>
                <div className="text-xs text-sky-700 font-semibold">Lead English Educator</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="font-mono text-xl font-bold text-sky-800">20+</div>
                <div className="text-[11px] text-slate-600 font-medium">Syllabus Units</div>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="font-mono text-xl font-bold text-emerald-700">100 Pts</div>
                <div className="text-[11px] text-slate-600 font-medium">MPESB Paper 1</div>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="font-mono text-xl font-bold text-blue-800">2014–24</div>
                <div className="text-[11px] text-slate-600 font-medium">PYQ Vault</div>
              </div>
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="font-mono text-xl font-bold text-amber-700">7 Pillars</div>
                <div className="text-[11px] text-slate-600 font-medium">Visual Grammar</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Official Exam Blueprint Aligned</span>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Pillars Taught */}
      <section className="space-y-4">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Academic Tracks &amp; Pedagogical Expertise
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Direct pathways to every curriculum curated and maintained by Mr. ChainSingh Kushro.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {specializations.map((spec) => (
            <div
              key={spec.title}
              className="rounded-2xl bg-white border border-sky-200 p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-sky-300 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center">
                  {spec.icon}
                </div>
                <h3 className="font-editorial text-lg font-bold text-slate-900">{spec.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{spec.desc}</p>
              </div>
              <button
                onClick={() => {
                  audioFeedback.playClick();
                  spec.onClick();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-900 self-start cursor-pointer"
              >
                <span>{spec.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching Philosophy + Direct Mentorship Inquiry Form */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 rounded-2xl bg-white border border-sky-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-sky-700 font-semibold text-xs">
            <Award className="w-4 h-4" />
            <span>Teaching Philosophy</span>
          </div>
          <h2 className="font-editorial text-2xl font-bold text-slate-900">
            Clarity First, Chronology Second, PYQs Daily
          </h2>
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p>
              Competitive English examinations demand more than rote memorization. Crafty English combines visual structural diagrams, exact grammatical exceptions, and authentic past-year question deconstruction so learners truly internalize concepts.
            </p>
            <p>
              Whether you are mastering Subject-Verb Concord for MPESB TET Grade 1 &amp; 2 or mapping Cultural Studies and Literary Theory for NTA UGC NET, every unit includes structured takeaways and printable PDF notes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-1 text-xs">
            <div className="font-semibold text-slate-900">Direct Educator Contact</div>
            <div className="text-slate-600">Founder &amp; Educator: Mr. ChainSingh Kushro</div>
            <a href="mailto:chaink2000@gmail.com" className="text-sky-700 font-semibold hover:underline inline-block">
              chaink2000@gmail.com
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-2xl bg-white border border-sky-200 p-6 space-y-4 shadow-sm">
          <div>
            <h2 className="font-editorial text-xl font-bold text-slate-900">
              Ask the Educator · Academic Doubt &amp; Mentorship Inquiry
            </h2>
            <p className="text-xs text-slate-600 mt-0.5">
              Send syllabus queries, PDF requests, or mentorship questions directly for Mr. ChainSingh Kushro.
            </p>
          </div>

          {submittedSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-800 font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Your inquiry has been saved. You can also write directly to chaink2000@gmail.com.</span>
            </div>
          )}

          <form onSubmit={handleSubmitInquiry} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g., Aarav Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Target Exam Track</label>
              <select
                value={examTarget}
                onChange={(e) => setExamTarget(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              >
                <option>NTA NET English Paper 1 & 2</option>
                <option>MPSET English Literature</option>
                <option>MPESB TET Grade 1 (Varg 1)</option>
                <option>MPESB TET Grade 2 (Varg 2)</option>
                <option>MPESB Common Paper 1</option>
                <option>Complete Visual Grammar</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Question or Feedback</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about syllabus topics, grammar rules, or study packs..."
                className="w-full px-3 py-2 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-slate-900 focus:outline-none focus:border-sky-500 resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <a
                href="mailto:chaink2000@gmail.com"
                className="text-xs text-sky-700 font-semibold hover:underline"
              >
                Or compose direct email to chaink2000@gmail.com
              </a>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
