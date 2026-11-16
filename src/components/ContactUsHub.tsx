import React, { useState } from 'react';
import { AppLanguage } from '../types';
import { useAuth } from '../context/AuthContext';
import { submitContactInquiryToFirestore } from '../utils/firestoreDataService';
import {
  Mail,
  MapPin,
  Send,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';

interface ContactUsHubProps {
  language: AppLanguage;
}

export const ContactUsHub: React.FC<ContactUsHubProps> = ({ language }) => {
  const { firebaseUser, userProfile, signInWithGoogle, isSigningIn } = useAuth();
  const isHi = language === 'hi';

  const [senderName, setSenderName] = useState(userProfile?.displayName || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOk, setSubmittedOk] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);
    setSubmittedOk(false);

    if (!firebaseUser) {
      setErrorText(
        isHi
          ? 'संदेश भेजने के लिए कृपया पहले Google खाते से साइन इन करें ताकि आपकी पूछताछ सुरक्षित रूप से दर्ज हो सके।'
          : 'Please sign in with Google first so your academic inquiry is securely logged to your account.'
      );
      return;
    }

    if (senderName.trim().length < 2 || subject.trim().length < 3 || message.trim().length < 10) {
      setErrorText(
        isHi
          ? 'कृपया नाम, विषय और कम-से-कम 10 अक्षरों का संदेश दर्ज करें।'
          : 'Please fill in your name, subject, and a message of at least 10 characters.'
      );
      return;
    }

    setSubmitting(true);
    try {
      await submitContactInquiryToFirestore(firebaseUser.uid, {
        senderName,
        subject,
        message,
      });
      setSubmittedOk(true);
      setSubject('');
      setMessage('');
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : 'Could not send inquiry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f2544] to-blue-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
            {isHi ? 'संपर्क एवं शैक्षणिक सहायता' : 'Contact & Academic Guidance'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isHi ? 'Crafty English टीम व संस्थापक से संपर्क करें' : 'Connect with Crafty English & Faculty'}
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed">
            {isHi
              ? 'पाठ्यक्रम मार्गदर्शन, NTA NET / MPESB बैच पूछताछ या तकनीकी सहायता के लिए सीधे संदेश भेजें।'
              : 'Reach out directly for curriculum guidance, NTA UGC NET / MPESB exam queries, institutional partnerships, or technical support.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Faculty Info Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0a192f] dark:bg-blue-700 text-amber-300 flex items-center justify-center font-bold text-lg">
                CK
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-[#0a192f] dark:text-white">
                  Mr. ChainSingh Kushro
                </h2>
                <p className="text-xs font-semibold text-blue-700 dark:text-amber-400">
                  Founder &amp; Lead Educator · Crafty English
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-blue-100 dark:border-blue-900 text-sm">
              <a
                href="mailto:chaink2000@gmail.com"
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-800 hover:border-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-700 dark:text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Official Educator Email</div>
                  <div className="font-bold text-slate-900 dark:text-white">chaink2000@gmail.com</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-800">
                <MapPin className="w-5 h-5 text-blue-700 dark:text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Academic Jurisdiction</div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Madhya Pradesh, India (NTA NET · MPSET · MPESB Focus)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50/70 dark:bg-[#0a192f] border border-blue-100 dark:border-blue-800">
                <BookOpen className="w-5 h-5 text-blue-700 dark:text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Office Hours</div>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    Monday – Saturday · 10:00 AM to 6:00 PM IST
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-white dark:bg-[#0d1d36] border border-blue-200 dark:border-blue-800 p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-extrabold text-[#0a192f] dark:text-white">
                {isHi ? 'सीधा शैक्षणिक संदेश भेजें' : 'Send Direct Academic Inquiry'}
              </h2>
              {firebaseUser ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified: {firebaseUser.email}</span>
                </span>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  disabled={isSigningIn}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a192f] dark:bg-blue-700 text-white text-xs font-bold cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isSigningIn ? 'Signing in...' : 'Sign in with Google to Submit'}</span>
                </button>
              )}
            </div>

            {submittedOk && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {isHi
                    ? 'आपका संदेश सफलतापूर्वक प्राप्त हो गया है। Mr. ChainSingh Kushro शीघ्र ही उत्तर देंगे।'
                    : 'Your inquiry has been securely recorded. Mr. ChainSingh Kushro & team will respond shortly.'}
                </span>
              </div>
            )}

            {errorText && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs sm:text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isHi ? 'आपका पूरा नाम' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g., Ananya Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isHi ? 'विषय (Subject)' : 'Inquiry Subject'}
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Question regarding NTA UGC NET Paper 2 Linguistics unit"
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isHi ? 'संदेश विवरण' : 'Message Details'}
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your academic query or syllabus question here..."
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-blue-50/50 dark:bg-[#0a192f] border border-blue-200 dark:border-blue-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>
                  {submitting
                    ? isHi
                      ? 'भेजा जा रहा है...'
                      : 'Submitting...'
                    : isHi
                    ? 'संदेश सबमिट करें'
                    : 'Submit Inquiry'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
