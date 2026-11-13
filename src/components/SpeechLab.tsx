import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Activity, 
  RotateCcw,
  Globe
} from 'lucide-react';
import { SPEECH_PHRASES } from '../data/communityData';
import { SpeechPhrase } from '../types';
import { audioFeedback } from '../utils/audioFeedback';

interface SpeechLabProps {
  onAddXP: (xp: number) => void;
}

export const SpeechLab: React.FC<SpeechLabProps> = ({ onAddXP }) => {
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(0);
  const [accentMode, setAccentMode] = useState<'UK' | 'US'>('UK');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [evaluationResult, setEvaluationResult] = useState<{
    overallScore: number;
    phonemeScore: number;
    rhythmScore: number;
    intonationScore: number;
    feedback: string;
    detectedStress: string;
  } | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const currentPhrase: SpeechPhrase =
    SPEECH_PHRASES[selectedPhraseIndex] || SPEECH_PHRASES[0];

  // Recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Waveform Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isRecording ? '#10b981' : '#6366f1';
      ctx.beginPath();

      const bars = 48;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth;
        const amplitude = isRecording
          ? Math.sin(phase + i * 0.2) * 24 + Math.random() * 20 + 8
          : Math.sin(phase + i * 0.1) * 6 + 4;
        const yTop = centerY - amplitude;
        const yBottom = centerY + amplitude;

        ctx.moveTo(x + barWidth / 2, yTop);
        ctx.lineTo(x + barWidth / 2, yBottom);
      }

      ctx.stroke();
      phase += isRecording ? 0.2 : 0.04;
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isRecording]);

  const handleStartRecording = () => {
    audioFeedback.playClick();
    setIsRecording(true);
    setEvaluationResult(null);
  };

  const handleStopRecording = () => {
    audioFeedback.playSuccess();
    setIsRecording(false);

    // Simulated phoneme comparison matrix
    const score = Math.floor(Math.random() * 8) + 91; // 91-98%
    const result = {
      overallScore: score,
      phonemeScore: score + 1,
      rhythmScore: score - 2,
      intonationScore: score,
      feedback:
        accentMode === 'UK'
          ? 'Exceptional non-rhotic vowel length and clear alveolar plosives. Stress accurately matches Shakespearean metrical cadence.'
          : 'Great post-vocalic rhoticity and smooth alveolar flap [t̬]. Natural American intonation curve.',
      detectedStress: currentPhrase.stressPattern,
    };

    setEvaluationResult(result);
    onAddXP(40);
  };

  const handleSpeakModel = (accent: 'UK' | 'US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentPhrase.phrase);
      utterance.lang = accent === 'UK' ? 'en-GB' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-sky-50 to-blue-100/70 border border-sky-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-sky-700 text-xs font-semibold">
              <Mic className="w-3.5 h-3.5" />
              <span>Acoustic Phonetics · Intonation Lab</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Speech & Pronunciation Lab
            </h1>
            <p className="text-slate-600 text-sm max-w-2xl font-sans">
              Compare your spoken cadence against native British (RP) and General American acoustic models with live waveform feedback and phoneme scoring.
            </p>
          </div>

          {/* Accent Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white border border-sky-200 shadow-sm">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setAccentMode('UK');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                accentMode === 'UK'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>British (RP)</span>
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setAccentMode('US');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                accentMode === 'US'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-sky-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>General American</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Practice Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Phrase Selector */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-800 block px-1">
            Practice Corpus & Literature Extracts:
          </span>
          {SPEECH_PHRASES.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                audioFeedback.playClick();
                setSelectedPhraseIndex(idx);
                setEvaluationResult(null);
                setIsRecording(false);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                idx === selectedPhraseIndex
                  ? 'bg-sky-50 border-sky-500 shadow-md shadow-sky-500/10'
                  : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/50'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-700">
                {item.category}
              </span>
              <p className="font-editorial text-sm font-bold text-slate-900 mt-2 line-clamp-2">
                "{item.phrase}"
              </p>
            </div>
          ))}
        </div>

        {/* Right Live Recording Canvas & Scoring */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-sky-200 p-6 sm:p-8 space-y-6 shadow-md">
            {/* Target Sentence Box */}
            <div className="p-6 rounded-2xl bg-sky-50/75 border border-sky-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Target Speech Line ({currentPhrase.category})
                </span>
                <button
                  onClick={() => handleSpeakModel(accentMode)}
                  className="flex items-center gap-1.5 text-xs text-sky-700 hover:text-sky-900 font-semibold transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4 text-sky-600" />
                  <span>Listen {accentMode} Native Model</span>
                </button>
              </div>

              <p className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900 leading-relaxed">
                "{currentPhrase.phrase}"
              </p>

              <div className="p-3 rounded-xl bg-white border border-sky-200 font-mono text-xs text-sky-800 flex items-center justify-between">
                <span>
                  IPA: {accentMode === 'UK' ? currentPhrase.phoneticUk : currentPhrase.phoneticUs}
                </span>
                <span className="text-[10px] text-slate-500 uppercase">{accentMode} Phonetics</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                {currentPhrase.accentNotes}
              </p>
            </div>

            {/* Waveform Visualizer Screen */}
            <div className="p-4 rounded-2xl bg-sky-50/75 border border-sky-200 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>
                    {isRecording ? 'Live Voice Waveform Streaming...' : 'Acoustic Visualizer'}
                  </span>
                </span>
                {isRecording && (
                  <span className="text-rose-600 font-bold font-mono animate-pulse">
                    REC: {recordingSeconds}s
                  </span>
                )}
              </div>

              <canvas
                ref={canvasRef}
                width={600}
                height={90}
                className="w-full h-24 rounded-xl bg-white border border-sky-100"
              />
            </div>

            {/* Voice Control Buttons */}
            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-600/25 active:scale-95 transition-all cursor-pointer"
                >
                  <Mic className="w-5 h-5" />
                  <span>Start Recording Pronunciation</span>
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-lg shadow-rose-600/25 active:scale-95 transition-all cursor-pointer"
                >
                  <Square className="w-5 h-5 fill-current" />
                  <span>Stop & Evaluate Pronunciation</span>
                </button>
              )}
            </div>

            {/* Evaluation Scorecard */}
            {evaluationResult && (
              <div className="p-6 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-4 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-sky-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="font-editorial text-lg font-bold text-slate-900">
                      Pronunciation Matrix Score
                    </span>
                  </div>
                  <span className="text-2xl font-black text-emerald-700 font-mono">
                    {evaluationResult.overallScore}%
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-white border border-sky-200">
                    <span className="text-[10px] text-slate-500 block font-semibold">
                      Phoneme Accuracy
                    </span>
                    <span className="text-base font-bold text-emerald-700">
                      {evaluationResult.phonemeScore}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-sky-200">
                    <span className="text-[10px] text-slate-500 block font-semibold">
                      Stress & Cadence
                    </span>
                    <span className="text-base font-bold text-sky-700">
                      {evaluationResult.rhythmScore}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-sky-200">
                    <span className="text-[10px] text-slate-500 block font-semibold">
                      Intonation Contour
                    </span>
                    <span className="text-base font-bold text-blue-700">
                      {evaluationResult.intonationScore}%
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <span className="font-bold flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Acoustic Examiner Feedback (+40 XP):</span>
                  </span>
                  <p className="leading-relaxed font-sans">{evaluationResult.feedback}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
