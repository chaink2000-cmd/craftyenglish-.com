import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FirebaseUserProfile, PracticeQuestion15 } from '../../types';
import {
  adminDeleteQuestionFromFirestore,
  adminListAllStudents,
  adminSaveQuestionToFirestore,
  adminSaveSiteConfig,
  adminToggleStudentAccountStatus,
  fetchAllQuestionsFromFirestore,
} from '../../utils/firestoreDataService';
import {
  Database,
  Upload,
  Plus,
  Trash2,
  Users,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface FirestoreAdminPanelProps {
  onShowToast: (msg: string) => void;
}

export const FirestoreAdminPanel: React.FC<FirestoreAdminPanelProps> = ({ onShowToast }) => {
  const { firebaseUser } = useAuth();
  const [cloudQuestions, setCloudQuestions] = useState<PracticeQuestion15[]>([]);
  const [students, setStudents] = useState<FirebaseUserProfile[]>([]);
  const [loading, setLoading] = useState(false);

  // Quick Question Create Form
  const [prompt, setPrompt] = useState('');
  const [opt1, setOpt1] = useState('');
  const [opt2, setOpt2] = useState('');
  const [opt3, setOpt3] = useState('');
  const [opt4, setOpt4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [moduleNum, setModuleNum] = useState(1);
  const [topic, setTopic] = useState('Grammar');
  const [difficulty, setDifficulty] = useState<PracticeQuestion15['difficulty']>('Intermediate');
  const [examCategory, setExamCategory] = useState('NTA NET / MPESB');
  const [explanationEn, setExplanationEn] = useState('');
  const [explanationHi, setExplanationHi] = useState('');

  // Bulk CSV Import
  const [csvText, setCsvText] = useState(
    'prompt,opt1,opt2,opt3,opt4,correctAnswer,moduleNumber,topic,difficulty,examCategory,explanationEn,explanationHi\n' +
      '"Neither Ramesh nor his friends _____ present.",was,were,is,has been,were,15,Subject-Verb Agreement,Intermediate,MPESB TET,"Proximity rule matches nearest plural subject friends.","निकटता नियम के अनुसार बहुवचन कर्ता friends के साथ were आएगा।"'
  );

  // Site Config Settings
  const [siteName, setSiteName] = useState('Crafty English');
  const [tagline, setTagline] = useState('Learn Smart. Speak Confidently. Master English.');
  const [educatorName, setEducatorName] = useState('Mr. ChainSingh Kushro');
  const [contactEmail, setContactEmail] = useState('chaink2000@gmail.com');
  const [heroNotice, setHeroNotice] = useState(
    '37 Bilingual Grammar Modules & NTA NET / MPESB Prep Live!'
  );

  const loadCloudData = async () => {
    setLoading(true);
    try {
      const [qs, users] = await Promise.all([
        fetchAllQuestionsFromFirestore(),
        adminListAllStudents(),
      ]);
      setCloudQuestions(qs);
      setStudents(users);
    } catch (err) {
      onShowToast(err instanceof Error ? err.message : 'Unable to sync Firestore records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCloudData();
  }, []);

  const handleCreateQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseUser || !prompt.trim() || !correctAnswer.trim()) return;
    try {
      await adminSaveQuestionToFirestore(firebaseUser.uid, {
        moduleNumber: moduleNum,
        moduleTitle: `Module ${moduleNum}`,
        topic,
        subtopic: examCategory,
        format: 'mcq',
        difficulty,
        language: 'bilingual',
        examCategory,
        sourceType: 'Original Practice',
        prompt,
        options: [opt1, opt2, opt3, opt4].filter(Boolean),
        correctAnswer,
        explanationEn: explanationEn || 'Verified grammar explanation.',
        explanationHi: explanationHi || explanationEn || 'सत्यापित व्याकरण व्याख्या।',
      });
      setPrompt('');
      setOpt1('');
      setOpt2('');
      setOpt3('');
      setOpt4('');
      setCorrectAnswer('');
      setExplanationEn('');
      setExplanationHi('');
      onShowToast('Saved new question directly to Cloud Firestore!');
      await loadCloudData();
    } catch (err) {
      onShowToast(err instanceof Error ? err.message : 'Failed to save question.');
    }
  };

  const handleBulkCsvImport = async () => {
    if (!firebaseUser || !csvText.trim()) return;
    const lines = csvText
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 2) {
      onShowToast('Provide header row + at least 1 CSV data row.');
      return;
    }

    let imported = 0;
    for (let i = 1; i < lines.length; i++) {
      // Split CSV safely respecting double quotes
      const cols =
        lines[i]
          .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
          ?.map((c) => c.replace(/^"|"$/g, '').trim()) || [];
      if (cols.length < 6) continue;
      await adminSaveQuestionToFirestore(firebaseUser.uid, {
        prompt: cols[0],
        options: [cols[1], cols[2], cols[3], cols[4]].filter(Boolean),
        correctAnswer: cols[5],
        moduleNumber: Number(cols[6]) || 1,
        moduleTitle: `Module ${Number(cols[6]) || 1}`,
        topic: cols[7] || 'Grammar',
        subtopic: cols[9] || 'General',
        format: 'mcq',
        difficulty: (cols[8] as PracticeQuestion15['difficulty']) || 'Intermediate',
        language: 'bilingual',
        examCategory: cols[9] || 'Competitive Grammar',
        sourceType: 'Original Practice',
        explanationEn: cols[10] || 'Imported question.',
        explanationHi: cols[11] || cols[10] || 'आयातित प्रश्न।',
      });
      imported++;
    }
    onShowToast(`Imported ${imported} question(s) into Cloud Firestore!`);
    await loadCloudData();
  };

  const handleDeleteCloudQuestion = async (id: string) => {
    await adminDeleteQuestionFromFirestore(id);
    onShowToast('Deleted question from Cloud Firestore.');
    await loadCloudData();
  };

  const handleToggleStatus = async (student: FirebaseUserProfile) => {
    const next = student.accountStatus === 'active' ? 'suspended' : 'active';
    await adminToggleStudentAccountStatus(student.uid, next);
    onShowToast(`Updated ${student.displayName} status to ${next.toUpperCase()}`);
    await loadCloudData();
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseUser) return;
    await adminSaveSiteConfig(firebaseUser.uid, {
      siteName,
      tagline,
      educatorName,
      contactEmail,
      heroNotice,
    });
    onShowToast('Saved Cloud Website Settings (/settings/siteConfig)!');
  };

  return (
    <div className="space-y-6">
      {/* Cloud Sync Status Strip */}
      <div className="rounded-2xl bg-[#0a192f] text-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Database className="w-6 h-6 text-amber-400" />
          <div>
            <h2 className="text-base font-bold">Live Cloud Firestore CMS &amp; CSV Importer</h2>
            <p className="text-xs text-blue-200">
              {cloudQuestions.length} custom cloud questions · {students.length} registered Firebase student profiles
            </p>
          </div>
        </div>
        <button
          onClick={loadCloudData}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Cloud Data</span>
        </button>
      </div>

      {/* Add Cloud Question + CSV Bulk Import */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          onSubmit={handleCreateQuestion}
          className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 space-y-3"
        >
          <h3 className="text-sm font-extrabold text-[#0a192f] dark:text-white flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-blue-700" />
            <span>Create Cloud Question (/questions)</span>
          </h3>
          <input
            type="text"
            required
            placeholder="Question Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              placeholder="Option A"
              value={opt1}
              onChange={(e) => setOpt1(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
            <input
              type="text"
              required
              placeholder="Option B"
              value={opt2}
              onChange={(e) => setOpt2(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Option C"
              value={opt3}
              onChange={(e) => setOpt3(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Option D"
              value={opt4}
              onChange={(e) => setOpt4(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              required
              placeholder="Exact Correct Option"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              className="col-span-2 px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
            <input
              type="number"
              min={1}
              max={37}
              value={moduleNum}
              onChange={(e) => setModuleNum(Number(e.target.value))}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Exam Category"
              value={examCategory}
              onChange={(e) => setExamCategory(e.target.value)}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as PracticeQuestion15['difficulty'])}
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            >
              <option value="Beginner">Beginner</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="English Explanation"
            value={explanationEn}
            onChange={(e) => setExplanationEn(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
          />
          <input
            type="text"
            placeholder="हिन्दी व्याख्या (Optional)"
            value={explanationHi}
            onChange={(e) => setExplanationHi(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
          >
            Save to Firestore
          </button>
        </form>

        {/* CSV Bulk Importer */}
        <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 space-y-3">
          <h3 className="text-sm font-extrabold text-[#0a192f] dark:text-white flex items-center gap-1.5">
            <Upload className="w-4 h-4 text-amber-600" />
            <span>Bulk CSV Question Importer</span>
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Format: prompt,opt1,opt2,opt3,opt4,correctAnswer,moduleNumber,topic,difficulty,examCategory,explanationEn,explanationHi
          </p>
          <textarea
            rows={7}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full p-3 rounded-xl font-mono text-[11px] border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
          />
          <button
            onClick={handleBulkCsvImport}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import CSV Rows to Firestore</span>
          </button>

          {cloudQuestions.length > 0 && (
            <div className="pt-2 border-t border-blue-100 dark:border-blue-900 space-y-1.5 max-h-36 overflow-y-auto">
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300">
                Cloud Questions ({cloudQuestions.length})
              </div>
              {cloudQuestions.map((cq) => (
                <div
                  key={cq.id}
                  className="flex items-center justify-between gap-2 text-xs p-2 rounded-lg bg-blue-50/50 dark:bg-[#0a192f]"
                >
                  <span className="truncate text-slate-800 dark:text-slate-200">{cq.prompt}</span>
                  <button
                    onClick={() => handleDeleteCloudQuestion(cq.id)}
                    className="text-rose-600 hover:text-rose-800 cursor-pointer shrink-0"
                    title="Delete cloud question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Registered Cloud Students + Cloud Site Config */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 space-y-3">
          <h3 className="text-sm font-extrabold text-[#0a192f] dark:text-white flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-700" />
            <span>Firestore Student Accounts ({students.length})</span>
          </h3>
          {students.length === 0 ? (
            <p className="text-xs text-slate-500">No external students registered yet.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {students.map((st) => (
                <div
                  key={st.uid}
                  className="p-3 rounded-xl bg-blue-50/50 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-900 flex items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{st.displayName}</div>
                    <div className="text-[11px] text-slate-500">
                      {st.email} · {st.xp} XP · {st.completedModulesCount} Modules
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleStatus(st)}
                    className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                      st.accountStatus === 'active'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {st.accountStatus === 'active' ? (
                      <span className="inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Suspended
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <form
          onSubmit={handleSaveSiteSettings}
          className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-5 space-y-3"
        >
          <h3 className="text-sm font-extrabold text-[#0a192f] dark:text-white flex items-center gap-1.5">
            <Save className="w-4 h-4 text-blue-700" />
            <span>Cloud Site Config (/settings/siteConfig)</span>
          </h3>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Site Name"
            className="w-full px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
          />
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Tagline"
            className="w-full px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={educatorName}
              onChange={(e) => setEducatorName(e.target.value)}
              placeholder="Educator Name"
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="Contact Email"
              className="px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
            />
          </div>
          <input
            type="text"
            value={heroNotice}
            onChange={(e) => setHeroNotice(e.target.value)}
            placeholder="Hero Notice"
            className="w-full px-3 py-2 rounded-lg text-xs border border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-[#0a192f] text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-[#0a192f] dark:bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold cursor-pointer"
          >
            Save Website Settings
          </button>
        </form>
      </div>
    </div>
  );
};
