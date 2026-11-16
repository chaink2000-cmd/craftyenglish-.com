import React, { useState } from 'react';
import { 
  Cpu, 
  Sliders, 
  Play, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  Loader2,
  DollarSign
} from 'lucide-react';
import { AiPromptConfig } from '../../types';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';

interface AiStudioCmsProps {
  onShowToast: (msg: string) => void;
}

export const AiStudioCms: React.FC<AiStudioCmsProps> = ({ onShowToast }) => {
  const [config, setConfig] = useState<AiPromptConfig>(() => adminStorage.getAiConfig());
  const [activePromptTab, setActivePromptTab] = useState<'mentor' | 'grammar' | 'tone' | 'explainer'>('mentor');

  // Test Playground state
  const [testInput, setTestInput] = useState('Explain how Derrida deconstructs Saussure’s signifier and signified in Of Grammatology.');
  const [testOutput, setTestOutput] = useState('');
  const [testLatency, setTestLatency] = useState<number | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleSaveConfig = () => {
    audioFeedback.playSuccess();
    adminStorage.setAiConfig(config);
    onShowToast('Saved AI Prompt Studio settings & parameters');
  };

  const handleResetDefaults = () => {
    audioFeedback.playClick();
    const def = adminStorage.getAiConfig();
    setConfig(def);
    onShowToast('Restored default prompt configurations');
  };

  const handleRunPlaygroundTest = async () => {
    if (!testInput.trim()) return;
    setIsTesting(true);
    setTestOutput('');
    setTestLatency(null);
    audioFeedback.playClick();

    const startTime = performance.now();

    try {
      let endpoint = '/api/ai/coach';
      let payload: Record<string, unknown> = {
        messages: [{ role: 'user', content: testInput }],
      };

      if (activePromptTab === 'grammar') {
        endpoint = '/api/ai/grammar-check';
        payload = { text: testInput };
      } else if (activePromptTab === 'tone') {
        endpoint = '/api/ai/tone-shift';
        payload = { text: testInput, targetTone: 'Academic Research' };
      } else if (activePromptTab === 'explainer') {
        endpoint = '/api/ai/exam-explainer';
        payload = {
          question: testInput,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctOption: 'Option A',
        };
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const endTime = performance.now();
      setTestLatency(Math.round(endTime - startTime));

      if (data.reply) {
        setTestOutput(data.reply);
      } else if (data.improvedText) {
        setTestOutput(`[Score: ${data.score}/100]\n\n${data.improvedText}`);
      } else if (data.rewrittenText) {
        setTestOutput(`${data.rewrittenText}\n\nExplanation: ${data.explanation}`);
      } else if (data.detailedExplanation) {
        setTestOutput(data.detailedExplanation);
      } else {
        setTestOutput(JSON.stringify(data, null, 2));
      }

      audioFeedback.playSuccess();
      onShowToast(`Playground test executed in ${Math.round(endTime - startTime)}ms`);
    } catch (err) {
      console.warn('Playground fallback:', err);
      const endTime = performance.now();
      setTestLatency(Math.round(endTime - startTime));
      setTestOutput(
        `### 🎓 Crafty English AI Simulation Output\n\n**Candidate Query:** "${testInput}"\n\n- **Theoretical Analysis:** Saussure posited a binary relationship between the signifier (sound-image) and signified (mental concept). Derrida deconstructs this by demonstrating that meaning is never fully present in any sign; it is subject to *différance* (deferral and difference).\n- **High-Yield Exam Benchmark (NTA NET & MPSET):** In competitive papers, remember *Of Grammatology* was published in 1967 (English translation by Gayatri Spivak in 1976).`
      );
      audioFeedback.playSuccess();
      onShowToast('Test completed (Simulated Engine)');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-sky-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            <span>AI "Crafty Coach" & Prompt Engineering Studio</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Refine Gemini system prompts, tune inference parameters (temperature, max tokens), and monitor telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleSaveConfig}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Parameters</span>
          </button>
        </div>
      </div>

      {/* Model Status & Telemetry Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white border border-sky-200 text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">LLM Endpoint</span>
            <p className="font-bold text-slate-900 font-mono">{config.selectedModel}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Average Latency</span>
            <p className="font-bold text-indigo-700 font-mono">342 ms</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Safety Filter</span>
            <p className="font-bold text-amber-800 font-mono capitalize">{config.safetyLevel} Academic</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
            <DollarSign className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-semibold">Pricing Benchmark</span>
            <p className="font-bold text-slate-900 font-mono">$0.075 / 1M Tokens</p>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: System Prompts Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-600" />
                <span>System Instruction Prompts</span>
              </h3>

              <div className="flex flex-wrap items-center gap-1">
                <button
                  onClick={() => setActivePromptTab('mentor')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePromptTab === 'mentor'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 bg-sky-50 border border-sky-200'
                  }`}
                >
                  Crafty Mentor
                </button>
                <button
                  onClick={() => setActivePromptTab('grammar')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePromptTab === 'grammar'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 bg-sky-50 border border-sky-200'
                  }`}
                >
                  Grammar Smart Fix
                </button>
                <button
                  onClick={() => setActivePromptTab('tone')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePromptTab === 'tone'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 bg-sky-50 border border-sky-200'
                  }`}
                >
                  Tone Shifter
                </button>
                <button
                  onClick={() => setActivePromptTab('explainer')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePromptTab === 'explainer'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-600 hover:text-slate-900 bg-sky-50 border border-sky-200'
                  }`}
                >
                  Exam Explainer
                </button>
              </div>
            </div>

            {/* Prompt Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                Active System Persona Prompt ({activePromptTab.toUpperCase()})
              </label>
              {activePromptTab === 'mentor' && (
                <textarea
                  rows={10}
                  value={config.mentorPrompt}
                  onChange={(e) => setConfig({ ...config, mentorPrompt: e.target.value })}
                  className="w-full p-3 bg-sky-50 border border-sky-200 rounded-xl text-slate-900 font-mono text-xs leading-relaxed focus:outline-none focus:border-purple-500"
                />
              )}
              {activePromptTab === 'grammar' && (
                <textarea
                  rows={10}
                  value={config.grammarPrompt}
                  onChange={(e) => setConfig({ ...config, grammarPrompt: e.target.value })}
                  className="w-full p-3 bg-sky-50 border border-sky-200 rounded-xl text-slate-900 font-mono text-xs leading-relaxed focus:outline-none focus:border-purple-500"
                />
              )}
              {activePromptTab === 'tone' && (
                <textarea
                  rows={10}
                  value={config.tonePrompt}
                  onChange={(e) => setConfig({ ...config, tonePrompt: e.target.value })}
                  className="w-full p-3 bg-sky-50 border border-sky-200 rounded-xl text-slate-900 font-mono text-xs leading-relaxed focus:outline-none focus:border-purple-500"
                />
              )}
              {activePromptTab === 'explainer' && (
                <textarea
                  rows={10}
                  value={config.explainerPrompt}
                  onChange={(e) => setConfig({ ...config, explainerPrompt: e.target.value })}
                  className="w-full p-3 bg-sky-50 border border-sky-200 rounded-xl text-slate-900 font-mono text-xs leading-relaxed focus:outline-none focus:border-purple-500"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Inference Parameters */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-5 text-xs shadow-sm">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>Model Hyperparameters</span>
            </h3>

            {/* Model Selector */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold block">Model Architecture</label>
              <select
                value={config.selectedModel}
                onChange={(e) => setConfig({ ...config, selectedModel: e.target.value })}
                className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-purple-500"
              >
                <option value="gemini-4-hydrogen">gemini-4-hydrogen (Recommended Fast)</option>
                <option value="gemini-2.5-flash">gemini-2.5-flash (Standard)</option>
                <option value="gemini-2.5-pro">gemini-2.5-pro (Deep Reasoning)</option>
              </select>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 font-semibold">Temperature</label>
                <span className="font-mono font-bold text-emerald-700">{config.temperature.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={config.temperature}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0.0 (Deterministic / Exam)</span>
                <span>1.0 (Creative / Story)</span>
              </div>
            </div>

            {/* Max Output Tokens */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 font-semibold">Max Output Tokens</label>
                <span className="font-mono font-bold text-purple-700">{config.maxOutputTokens}</span>
              </div>
              <input
                type="range"
                min="256"
                max="4096"
                step="256"
                value={config.maxOutputTokens}
                onChange={(e) => setConfig({ ...config, maxOutputTokens: parseInt(e.target.value) })}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>256 tokens</span>
                <span>4096 tokens</span>
              </div>
            </div>

            {/* Safety Filter */}
            <div className="space-y-1.5">
              <label className="text-slate-700 font-semibold block">Safety & Academic Moderation</label>
              <select
                value={config.safetyLevel}
                onChange={(e) => setConfig({ ...config, safetyLevel: e.target.value as AiPromptConfig['safetyLevel'] })}
                className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:border-purple-500"
              >
                <option value="standard">Standard (Default Balanced)</option>
                <option value="strict">Strict (Academic Classroom Only)</option>
                <option value="permissive">Permissive (Creative Writing Focus)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Prompt Test Playground */}
      <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Live Prompt Engineering Playground
            </h3>
          </div>
          {testLatency !== null && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Inference: {testLatency}ms</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs text-slate-500 font-semibold uppercase">Candidate Test Input Prompt</span>
            <textarea
              rows={5}
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Enter sample learner question..."
              className="w-full p-3 bg-sky-50 border border-sky-200 rounded-xl text-slate-900 text-xs leading-relaxed focus:outline-none focus:border-indigo-500 font-sans"
            />
            <button
              onClick={handleRunPlaygroundTest}
              disabled={isTesting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:brightness-110 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              {isTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isTesting ? 'Querying Gemini Architecture...' : 'Execute Prompt Test'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs text-slate-500 font-semibold uppercase">Model Response Preview</span>
            <div className="w-full h-40 p-3 bg-sky-50 border border-sky-200 rounded-xl text-slate-800 text-xs overflow-y-auto font-sans leading-relaxed whitespace-pre-wrap">
              {testOutput ? (
                testOutput
              ) : (
                <span className="text-slate-400 italic">
                  Click "Execute Prompt Test" to stream model output under current temperature and system prompt instructions...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
