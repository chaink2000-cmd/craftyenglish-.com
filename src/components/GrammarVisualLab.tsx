import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Volume2,
  GitBranch,
  Image as ImageIcon,
  Maximize2,
  X,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { GrammarTopic, GrammarVisualType } from '../types';
import partsTreeImg from '../assets/images/grammar_parts_speech_tree_1794577616722.jpg';
import tensesTimelineImg from '../assets/images/grammar_tenses_timeline_1794577616009.jpg';
import voiceBridgeImg from '../assets/images/grammar_voice_transformation_1794577616907.jpg';
import clausesArchImg from '../assets/images/grammar_clauses_architecture_1794577617759.jpg';
import stylisticsProsodyImg from '../assets/images/grammar_stylistics_prosody_1794577618258.jpg';

const ASSET_MAP: Record<GrammarTopic['visualAssetKey'], { src: string; badge: string }> = {
  'parts-tree': { src: partsTreeImg, badge: 'Figure 01 · Grammar Taxonomy & Morphology' },
  'tenses-timeline': { src: tensesTimelineImg, badge: 'Figure 02 · Grammatical Time & Aspect' },
  'voice-bridge': { src: voiceBridgeImg, badge: 'Figure 03 · Syntactic Transformation Bridge' },
  'clauses-arch': { src: clausesArchImg, badge: 'Figure 04 · Clause & Sentence Engineering' },
  'stylistics-prosody': { src: stylisticsProsodyImg, badge: 'Figure 05 · Poetics, Figures & Prosody' }
};

interface GrammarVisualLabProps {
  topic: GrammarTopic;
  onSpeak: (text: string) => void;
}

export const GrammarVisualLab: React.FC<GrammarVisualLabProps> = ({ topic, onSpeak }) => {
  const [imgError, setImgError] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const asset = ASSET_MAP[topic.visualAssetKey];

  return (
    <div className="space-y-6">
      {/* 1. Curated Illustration + Animated Interactive Simulator */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
        {/* Generated Editorial Visual Card */}
        <div className="xl:col-span-5 bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm flex flex-col">
          <div className="px-4 py-3 border-b border-sky-100 flex items-center justify-between gap-2 bg-sky-50/60">
            <div className="flex items-center gap-2 min-w-0">
              <ImageIcon className="w-4 h-4 text-sky-600 shrink-0" />
              <span className="text-xs font-semibold text-slate-800 truncate">{asset.badge}</span>
            </div>
            {!imgError && (
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-[11px] font-semibold text-sky-700 transition-colors shrink-0 cursor-pointer"
                title="Enlarge illustration"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Zoom</span>
              </button>
            )}
          </div>

          <div className="relative flex-1 min-h-[220px] bg-sky-50 flex items-center justify-center overflow-hidden">
            {!imgError ? (
              <img
                src={asset.src}
                alt={topic.visualCaption}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            ) : (
              <div className="p-6 text-center space-y-2 bg-gradient-to-br from-sky-50 to-blue-100 w-full h-full flex flex-col items-center justify-center">
                <ImageIcon className="w-8 h-8 text-sky-600" />
                <p className="text-xs font-semibold text-slate-800">{topic.visualCaption}</p>
                <p className="text-[11px] text-slate-600">Interactive schematic loaded alongside.</p>
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 bg-white border-t border-sky-100 text-xs text-slate-600 leading-snug">
            {topic.visualCaption}
          </div>
        </div>

        {/* Interactive Animated SVG Diagram Sandbox */}
        <div className="xl:col-span-7 bg-white rounded-2xl border border-sky-200 p-5 shadow-sm flex flex-col justify-between">
          <InteractiveAnimatedDiagram
            type={topic.animatedDiagramType}
            onSpeak={onSpeak}
          />
        </div>
      </div>

      {/* 2. Animated Decision Flowchart Strip */}
      <div className="bg-white rounded-2xl border border-sky-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-sky-600 shrink-0" />
            <h3 className="font-editorial text-lg font-bold text-slate-900">
              {topic.flowchartTitle}
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Step-by-step exam decision sequence
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 relative">
          {topic.flowchartSteps.map((node, index) => (
            <div key={node.step} className="relative flex items-stretch gap-2">
              <div className="flex-1 rounded-xl bg-sky-50/75 border border-sky-200 p-3.5 space-y-1.5 hover:border-sky-400 transition-colors">
                <div className="flex items-center justify-between text-xs font-semibold text-sky-700 tabular-nums">
                  <span>Step {node.step}</span>
                  {index < topic.flowchartSteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-sky-500 xl:hidden" />
                  )}
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {node.label}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {node.detail}
                </p>
                {node.example && (
                  <p className="text-[11px] font-mono text-sky-800 bg-white border border-sky-100 rounded-lg px-2.5 py-1.5 mt-1">
                    {node.example}
                  </p>
                )}
              </div>
              {index < topic.flowchartSteps.length - 1 && (
                <div className="hidden xl:flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="text-sky-500">
                    <line
                      x1="2"
                      y1="12"
                      x2="18"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="animate-grammar-flow"
                    />
                    <polyline
                      points="13 7 19 12 13 17"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Structured Reference Tables */}
      {topic.tables.length > 0 && (
        <div className="space-y-4">
          {topic.tables.map((table, tIdx) => (
            <div
              key={tIdx}
              className="bg-white rounded-2xl border border-sky-200 overflow-hidden shadow-sm"
            >
              <div className="px-5 py-3.5 bg-sky-50/80 border-b border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className="font-editorial text-base font-bold text-slate-900">
                  {table.title}
                </h4>
                {table.caption && (
                  <span className="text-xs text-slate-600">{table.caption}</span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-sky-50/40 border-b border-sky-200 text-sky-900">
                      {table.headers.map((header, hIdx) => (
                        <th
                          key={hIdx}
                          className="px-4 py-2.5 font-bold whitespace-nowrap"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sky-100 tabular-nums">
                    {table.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className={rIdx % 2 === 1 ? 'bg-sky-50/35' : 'bg-white'}
                      >
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-2.5 leading-relaxed align-top ${
                              cIdx === 0
                                ? 'font-semibold text-slate-900 whitespace-nowrap'
                                : 'text-slate-700'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal for Enlarged Diagram */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/70 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl border border-sky-200 shadow-2xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-sky-100 flex items-center justify-between bg-sky-50">
              <span className="text-sm font-bold text-slate-900">{topic.visualCaption}</span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-1.5 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-slate-700 cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 bg-white flex items-center justify-center">
              <img
                src={asset.src}
                alt={topic.visualCaption}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto rounded-xl border border-sky-100"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// INTERACTIVE ANIMATED SVG SIMULATORS (ONE BESPOKE LAB PER GRAMMAR PILLAR)
// ============================================================================

const InteractiveAnimatedDiagram: React.FC<{
  type: GrammarVisualType;
  onSpeak: (text: string) => void;
}> = ({ type, onSpeak }) => {
  switch (type) {
    case 'parts-of-speech':
      return <PartsOfSpeechInteractive onSpeak={onSpeak} />;
    case 'verbs-modifiers':
      return <VerbsModifiersInteractive onSpeak={onSpeak} />;
    case 'prepositions-motion':
      return <PrepositionsMotionInteractive onSpeak={onSpeak} />;
    case 'articles-quantifiers':
      return <ArticlesQuantifiersInteractive onSpeak={onSpeak} />;
    case 'tenses-timeline':
      return <TensesTimelineInteractive onSpeak={onSpeak} />;
    case 'concord-balance':
      return <ConcordBalanceInteractive onSpeak={onSpeak} />;
    case 'voice-transform':
      return <VoiceTransformInteractive onSpeak={onSpeak} />;
    case 'narration-conditionals':
      return <NarrationConditionalsInteractive onSpeak={onSpeak} />;
    case 'clauses-bridge':
      return <ClausesBridgeInteractive onSpeak={onSpeak} />;
    case 'morphology-roots':
      return <MorphologyRootsInteractive onSpeak={onSpeak} />;
    case 'figures-of-speech':
      return <FiguresOfSpeechInteractive onSpeak={onSpeak} />;
    case 'prosody-scansion':
      return <ProsodyScansionInteractive onSpeak={onSpeak} />;
    default:
      return null;
  }
};

// 1. Parts of Speech Tree Animator
const PartsOfSpeechInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const nodes = [
    { key: 'Noun', detail: 'Proper / Common / Collective / Abstract / Material', sample: 'Shakespeare (Proper) wrote dramas (Common) with wisdom (Abstract).' },
    { key: 'Pronoun', detail: 'Personal · Demonstrative · Relative · Indefinite · Reflexive', sample: 'The scholar whom we honored corrected the proofs herself.' },
    { key: 'Number Trap', detail: 'Greek/Latin plurals & uncountables', sample: 'This criterion is valid; those criteria are faulty. Advice is uncountable.' }
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Animated Noun-Pronoun Flow Inspector
          </h4>
          <p className="text-xs text-slate-600">Select a branch node to trace live syntactic flow.</p>
        </div>
        <div className="flex items-center gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {nodes.map((n, i) => (
            <button
              key={n.key}
              type="button"
              onClick={() => setActive(i)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                active === i ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {n.key}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 560 155" className="w-full h-36 bg-sky-50/70 rounded-xl border border-sky-200">
        <rect x="210" y="12" width="140" height="30" rx="8" fill="#0284c7" />
        <text x="280" y="31" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">
          Noun Phrase Root
        </text>

        <path d="M240 42 C200 68, 130 68, 95 92" fill="none" stroke={active === 0 ? '#0284c7' : '#94a3b8'} strokeWidth={active === 0 ? 3 : 1.5} className={active === 0 ? 'animate-grammar-flow' : ''} />
        <path d="M280 42 L280 92" fill="none" stroke={active === 1 ? '#0284c7' : '#94a3b8'} strokeWidth={active === 1 ? 3 : 1.5} className={active === 1 ? 'animate-grammar-flow' : ''} />
        <path d="M320 42 C360 68, 430 68, 465 92" fill="none" stroke={active === 2 ? '#0284c7' : '#94a3b8'} strokeWidth={active === 2 ? 3 : 1.5} className={active === 2 ? 'animate-grammar-flow' : ''} />

        <g className="cursor-pointer" onClick={() => setActive(0)}>
          <rect x="20" y="92" width="150" height="44" rx="10" fill={active === 0 ? '#e0f2fe' : '#ffffff'} stroke={active === 0 ? '#0284c7' : '#bae6fd'} strokeWidth="2" />
          <text x="95" y="112" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="700">5 Noun Classes</text>
          <text x="95" y="126" textAnchor="middle" fill="#0369a1" fontSize="9.5">Gender & Number</text>
        </g>

        <g className="cursor-pointer" onClick={() => setActive(1)}>
          <rect x="200" y="92" width="160" height="44" rx="10" fill={active === 1 ? '#e0f2fe' : '#ffffff'} stroke={active === 1 ? '#0284c7' : '#bae6fd'} strokeWidth="2" />
          <text x="280" y="112" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="700">7 Pronoun Types</text>
          <text x="280" y="126" textAnchor="middle" fill="#0369a1" fontSize="9.5">2-3-1 Person Order</text>
        </g>

        <g className="cursor-pointer" onClick={() => setActive(2)}>
          <rect x="390" y="92" width="150" height="44" rx="10" fill={active === 2 ? '#e0f2fe' : '#ffffff'} stroke={active === 2 ? '#0284c7' : '#bae6fd'} strokeWidth="2" />
          <text x="465" y="112" textAnchor="middle" fill="#0f172a" fontSize="11.5" fontWeight="700">Plural & Case</text>
          <text x="465" y="126" textAnchor="middle" fill="#0369a1" fontSize="9.5">-on/-um &rarr; -a · Whom</text>
        </g>
      </svg>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="text-xs font-bold text-sky-900">{nodes[active].detail}</div>
          <div className="text-xs text-slate-700 italic">"{nodes[active].sample}"</div>
        </div>
        <button
          type="button"
          onClick={() => onSpeak(nodes[active].sample)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
          title="Listen to example"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 2. Verbs, Adjectives & Adverbs Simulator
const VerbsModifiersInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const [degreeIdx, setDegreeIdx] = useState(0);
  const degrees = [
    { label: 'Positive', scale: 'w-1/3', sentence: 'Few Indian poets are as lyrical as Sarojini Naidu.' },
    { label: 'Comparative', scale: 'w-2/3', sentence: 'Sarojini Naidu is more lyrical than most Indian poets.' },
    { label: 'Superlative', scale: 'w-full', sentence: 'Sarojini Naidu is one of the most lyrical Indian poets.' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Degree Escalator & Non-Finite Filter
          </h4>
          <p className="text-xs text-slate-600">Switch degree level to animate equivalent transformation syntax.</p>
        </div>
        <div className="flex items-center gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {degrees.map((d, i) => (
            <button
              key={d.label}
              type="button"
              onClick={() => setDegreeIdx(i)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                degreeIdx === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Degree Bar Animation */}
      <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span>Adjective Intensity Ladder</span>
          <span className="text-sky-700">{degrees[degreeIdx].label} Degree</span>
        </div>
        <div className="h-3 w-full bg-white rounded-full border border-sky-200 overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600 transition-all duration-300 ${degrees[degreeIdx].scale}`}
          />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-medium text-center">
          <div className="p-2 rounded-lg bg-white border border-sky-200 text-slate-800">
            <div className="font-bold text-sky-700">Infinitive</div>
            to compose (purpose)
          </div>
          <div className="p-2 rounded-lg bg-white border border-sky-200 text-slate-800">
            <div className="font-bold text-sky-700">Gerund</div>
            composing (verbal noun)
          </div>
          <div className="p-2 rounded-lg bg-white border border-sky-200 text-slate-800">
            <div className="font-bold text-sky-700">Adverb M-P-T</div>
            clearly · here · today
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-800 font-medium italic">
          "{degrees[degreeIdx].sentence}"
        </p>
        <button
          type="button"
          onClick={() => onSpeak(degrees[degreeIdx].sentence)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 3. Prepositions Spatial Motion & Time Pyramid
const PrepositionsMotionInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const modes = [
    { id: 'across', label: 'Across (Surface)', x: 240, y: 58, caption: 'Movement from one side of a 2D surface to the other: "He walked across the bridge."' },
    { id: 'through', label: 'Through (Tunnel)', x: 240, y: 102, caption: 'Movement inside an enclosed 3D space: "The train passed through the tunnel."' },
    { id: 'into', label: 'Into (Entry)', x: 390, y: 80, caption: 'Inward motion entering an enclosure: "She walked into the examination hall."' },
    { id: 'between', label: 'Between / Among', x: 110, y: 80, caption: 'Between links distinct items; Among groups >2 collectively.' }
  ];
  const [selected, setSelected] = useState(0);
  const current = modes[selected];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Spatial Preposition Trajectory Lab
          </h4>
          <p className="text-xs text-slate-600">Click each spatial vector to animate object trajectory.</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {modes.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelected(idx)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                selected === idx ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 560 150" className="w-full h-36 bg-sky-50/70 rounded-xl border border-sky-200">
        {/* Surface line for Across */}
        <line x1="50" y1="70" x2="310" y2="70" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="180" y="38" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="700">ACROSS (2D Surface)</text>

        {/* Tunnel box for Through */}
        <rect x="130" y="88" width="120" height="32" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <line x1="60" y1="104" x2="300" y2="104" stroke="#0369a1" strokeWidth="2" className="animate-grammar-flow" />
        <text x="190" y="136" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="700">THROUGH (3D Volume)</text>

        {/* Enclosure for Into */}
        <rect x="355" y="45" width="160" height="75" rx="12" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
        <line x1="315" y1="80" x2="405" y2="80" stroke="#0284c7" strokeWidth="2.5" className="animate-grammar-flow" />
        <text x="435" y="36" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="700">INTO (Inward Motion)</text>

        {/* Animated Moving Sphere */}
        <circle
          cx={current.x}
          cy={current.y}
          r="11"
          fill="#0284c7"
          stroke="#ffffff"
          strokeWidth="3"
          className="transition-all duration-300 animate-grammar-beat"
        />
      </svg>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-800">{current.caption}</span>
        <button
          type="button"
          onClick={() => onSpeak(current.caption)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 4. Articles & Quantifiers Meter
const ArticlesQuantifiersInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const levels = [
    { key: 'Few / Little', fill: '10%', tone: 'Negative (Almost Zero)', color: 'bg-rose-500', sentence: 'There is little water left in the flask, and few scholars arrived.' },
    { key: 'A few / A little', fill: '42%', tone: 'Positive (Small Sufficient Amount)', color: 'bg-sky-500', sentence: 'A little perseverance and a few practice papers build confidence.' },
    { key: 'The few / The little', fill: '92%', tone: 'Definite Whole Remainder', color: 'bg-emerald-600', sentence: 'The few books he saved from the fire remain priceless.' }
  ];
  const [idx, setIdx] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Animated Quantifier Fill Meter
          </h4>
          <p className="text-xs text-slate-600">Compare semantic volume across zero-article, a-, and the- quantifiers.</p>
        </div>
        <div className="flex gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {levels.map((l, i) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                idx === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {l.key}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-sky-50/75 border border-sky-200 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-800">{levels[idx].key}</span>
          <span className="text-sky-800">{levels[idx].tone}</span>
        </div>
        <div className="w-full h-6 bg-white rounded-xl border border-sky-200 p-1 overflow-hidden">
          <div
            style={{ width: levels[idx].fill }}
            className={`h-full rounded-lg transition-all duration-300 ${levels[idx].color}`}
          />
        </div>
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Countable: Few / A few / The few</span>
          <span>Uncountable: Little / A little / The little</span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-800 italic">"{levels[idx].sentence}"</span>
        <button
          type="button"
          onClick={() => onSpeak(levels[idx].sentence)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 5. 12-Tense Animated Timeline
const TensesTimelineInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const aspects = [
    { name: 'Simple', startX: 110, width: 18, note: 'Point / Habit: V2 (Past) · V1(s) (Present) · will V1 (Future)' },
    { name: 'Continuous', startX: 205, width: 95, note: 'In Progress: was/were V-ing · is/am/are V-ing · will be V-ing' },
    { name: 'Perfect', startX: 145, width: 135, note: 'Completed Before Reference: had V3 · has/have V3 · will have V3' },
    { name: 'Perfect Continuous', startX: 110, width: 170, note: 'Duration up to Point (since/for): had/has/will have + been + V-ing' }
  ];
  const [aspectIdx, setAspectIdx] = useState(2);
  const current = aspects[aspectIdx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Interactive Grammatical Time & Aspect Axis
          </h4>
          <p className="text-xs text-slate-600">Select an aspect to see its span relative to Now.</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {aspects.map((a, i) => (
            <button
              key={a.name}
              type="button"
              onClick={() => setAspectIdx(i)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                aspectIdx === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 560 130" className="w-full h-32 bg-sky-50/70 rounded-xl border border-sky-200">
        {/* Axis */}
        <line x1="40" y1="75" x2="520" y2="75" stroke="#0284c7" strokeWidth="2.5" className="animate-grammar-flow" />
        <line x1="280" y1="30" x2="280" y2="112" stroke="#0f172a" strokeWidth="1.5" strokeDasharray="3 3" />

        <text x="90" y="108" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">PAST</text>
        <text x="280" y="22" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="700">NOW (PRESENT)</text>
        <text x="470" y="108" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="700">FUTURE</text>

        {/* Active Aspect Highlight Span */}
        <rect
          x={current.startX}
          y="58"
          width={current.width}
          height="34"
          rx="10"
          fill="#0284c7"
          fillOpacity="0.2"
          stroke="#0284c7"
          strokeWidth="2.5"
          className="transition-all duration-300"
        />
        <circle
          cx={current.startX + current.width}
          cy="75"
          r="7"
          fill="#0284c7"
          className="transition-all duration-300 animate-grammar-beat"
        />
      </svg>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-800 font-medium">{current.note}</span>
        <button
          type="button"
          onClick={() => onSpeak(current.note)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 6. Subject-Verb Concord Animated Balance
const ConcordBalanceInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const cases = [
    {
      label: 'As well as / Along with',
      s1: 'The Dean (Sing.)',
      connector: 'along with',
      s2: 'twelve teachers (Pl.)',
      winner: 'S1 Controls -> IS presiding',
      isPlural: false
    },
    {
      label: 'Either ... Or (Proximity)',
      s1: 'The Dean (Sing.)',
      connector: 'or',
      s2: 'his assistants (Pl.)',
      winner: 'Nearest S2 Controls -> ARE presiding',
      isPlural: true
    },
    {
      label: 'Distance / Sum Unit',
      s1: 'Fifty miles',
      connector: '(single aggregate)',
      s2: 'of road',
      winner: 'Single Unit -> IS exhausting',
      isPlural: false
    }
  ];
  const [idx, setIdx] = useState(0);
  const c = cases[idx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Concord Head-Selection Animator
          </h4>
          <p className="text-xs text-slate-600">Inspect which noun phrase legally governs the verb.</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {cases.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                idx === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center bg-sky-50/75 p-4 rounded-xl border border-sky-200">
        <div className={`p-3 rounded-xl border text-center transition-all ${!c.isPlural ? 'bg-sky-600 text-white border-sky-600 shadow-sm' : 'bg-white text-slate-600 border-sky-200'}`}>
          <div className="text-[10px] uppercase tracking-wider opacity-80">Subject 1</div>
          <div className="text-xs font-bold mt-0.5">{c.s1}</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-xs font-mono font-bold text-sky-700">{c.connector}</div>
          <div className="text-[11px] font-semibold text-slate-700">+</div>
        </div>
        <div className={`p-3 rounded-xl border text-center transition-all ${c.isPlural ? 'bg-sky-600 text-white border-sky-600 shadow-sm' : 'bg-white text-slate-600 border-sky-200'}`}>
          <div className="text-[10px] uppercase tracking-wider opacity-80">Subject 2</div>
          <div className="text-xs font-bold mt-0.5">{c.s2}</div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{c.winner}</span>
        </div>
        <button
          type="button"
          onClick={() => onSpeak(`${c.s1} ${c.connector} ${c.s2}. ${c.winner}`)}
          className="p-2 rounded-lg bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 7. Active <-> Passive Animated Swap
const VoiceTransformInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const [isPassive, setIsPassive] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Active ↔ Passive Subject-Object Crossover Animator
          </h4>
          <p className="text-xs text-slate-600">Toggle voice to watch Subject and Object exchange grammatical slots.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsPassive((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
        >
          {isPassive ? <RotateCcw className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPassive ? 'Show Active Voice' : 'Transform to Passive'}</span>
        </button>
      </div>

      <div className="p-4 rounded-xl bg-sky-50/75 border border-sky-200 space-y-3">
        <div className="grid grid-cols-3 gap-2.5 text-center items-center">
          <div className={`p-3 rounded-xl border transition-all duration-300 ${isPassive ? 'bg-emerald-50 border-emerald-400 text-emerald-950' : 'bg-white border-sky-300 text-slate-900'}`}>
            <div className="text-[10px] font-bold uppercase text-sky-700">Slot 1 (Subject)</div>
            <div className="text-xs font-bold mt-1">
              {isPassive ? 'An epic ode' : 'John Keats'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-sky-600 text-white shadow-xs">
            <div className="text-[10px] font-bold uppercase opacity-80">Verb Chain</div>
            <div className="text-xs font-bold mt-1">
              {isPassive ? 'was composed' : 'composed'}
            </div>
          </div>

          <div className={`p-3 rounded-xl border transition-all duration-300 ${isPassive ? 'bg-white border-sky-300 text-slate-900' : 'bg-emerald-50 border-emerald-400 text-emerald-950'}`}>
            <div className="text-[10px] font-bold uppercase text-sky-700">
              {isPassive ? 'Agent (by + S)' : 'Direct Object'}
            </div>
            <div className="text-xs font-bold mt-1">
              {isPassive ? 'by John Keats' : 'an epic ode'}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-slate-600 font-mono">
          {isPassive
            ? 'Passive Formula: New Subject + [was/were] + V3 + by + Agent'
            : 'Active Formula: Agent Subject + V2 + Direct Object'}
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-800 italic">
          {isPassive ? '"An epic ode was composed by John Keats."' : '"John Keats composed an epic ode."'}
        </span>
        <button
          type="button"
          onClick={() => onSpeak(isPassive ? 'An epic ode was composed by John Keats.' : 'John Keats composed an epic ode.')}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 8. Narration, Conditionals & Question Tags Switcher
const NarrationConditionalsInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const [condType, setCondType] = useState(2);
  const items = [
    { label: '0 · Fact', ifClause: 'If you heat water', mainClause: 'it boils at 100°C.', tag: 'doesn\'t it?' },
    { label: '1st · Likely', ifClause: 'If he studies hard', mainClause: 'he will qualify NET.', tag: 'won\'t he?' },
    { label: '2nd · Unreal Pres.', ifClause: 'Were I the examiner', mainClause: 'I would simplify this prompt.', tag: 'wouldn\'t I?' },
    { label: '3rd · Inverted Past', ifClause: 'Had she checked notes', mainClause: 'she would have scored 100%.', tag: 'wouldn\'t she?' }
  ];
  const cur = items[condType];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Conditional & Inversion Builder + Tag Flipper
          </h4>
          <p className="text-xs text-slate-600">Select conditional type to inspect clause pairing and tag agreement.</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {items.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setCondType(i)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                condType === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-4 rounded-xl bg-sky-50/75 border border-sky-200 text-center">
        <div className="sm:col-span-5 p-3 rounded-xl bg-white border border-sky-200">
          <div className="text-[10px] font-bold uppercase text-sky-700">Condition / Inverted Protasis</div>
          <div className="text-xs font-bold text-slate-900 mt-1">{cur.ifClause}</div>
        </div>
        <div className="sm:col-span-5 p-3 rounded-xl bg-white border border-emerald-200">
          <div className="text-[10px] font-bold uppercase text-emerald-700">Result Apodosis</div>
          <div className="text-xs font-bold text-slate-900 mt-1">{cur.mainClause}</div>
        </div>
        <div className="sm:col-span-2 p-3 rounded-xl bg-sky-600 text-white">
          <div className="text-[10px] font-bold uppercase opacity-80">Tag</div>
          <div className="text-xs font-bold mt-1">{cur.tag}</div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-800 italic">
          "{cur.ifClause}, {cur.mainClause}"
        </span>
        <button
          type="button"
          onClick={() => onSpeak(`${cur.ifClause}, ${cur.mainClause}`)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 9. Simple / Compound / Complex Clause Architecture
const ClausesBridgeInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const [arch, setArch] = useState<'Simple' | 'Compound' | 'Complex'>('Complex');
  const data = {
    Simple: {
      spanA: 'Independent Main Clause (1 Finite Verb)',
      bridge: 'Preposition / Participle Phrase',
      spanB: 'Despite heavy rain',
      example: 'Despite heavy rain, the candidates arrived punctually.'
    },
    Compound: {
      spanA: 'Independent Clause 1',
      bridge: 'FANBOYS (yet / but / and)',
      spanB: 'Independent Clause 2',
      example: 'It rained heavily, yet the candidates arrived punctually.'
    },
    Complex: {
      spanA: 'Independent Main Pillar',
      bridge: 'Subordinator (Although / Since / Who)',
      spanB: 'Dependent Subordinate Span',
      example: 'Although it rained heavily, the candidates arrived punctually.'
    }
  };
  const d = data[arch];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Clause Bridge Architecture Switcher
          </h4>
          <p className="text-xs text-slate-600">Switch sentence type to contrast pillar and connector geometry.</p>
        </div>
        <div className="flex gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {(['Simple', 'Compound', 'Complex'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setArch(type)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                arch === type ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-sky-50/75 border border-sky-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center text-center">
        <div className="p-3 rounded-xl bg-white border-2 border-sky-500">
          <div className="text-[10px] font-bold text-sky-700 uppercase">Block A</div>
          <div className="text-xs font-bold text-slate-900 mt-1">{d.spanA}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-sky-600 text-white">
          <div className="text-[10px] uppercase opacity-80">Connector Link</div>
          <div className="text-xs font-bold mt-0.5">{d.bridge}</div>
        </div>
        <div className={`p-3 rounded-xl border-2 ${arch === 'Compound' ? 'bg-white border-sky-500' : 'bg-sky-50 border-dashed border-sky-400'}`}>
          <div className="text-[10px] font-bold text-sky-700 uppercase">Block B</div>
          <div className="text-xs font-bold text-slate-900 mt-1">{d.spanB}</div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-800 italic">"{d.example}"</span>
        <button
          type="button"
          onClick={() => onSpeak(d.example)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 10. Morphology Root Assembler
const MorphologyRootsInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const roots = [
    { prefix: 'bene- (good)', root: 'vol (wish)', suffix: '-ent (adj)', word: 'Benevolent', meaning: 'Well-meaning and kindly' },
    { prefix: 'mal- (bad)', root: 'diction (speak)', suffix: '-tion (noun)', word: 'Malediction', meaning: 'A spoken curse or slander' },
    { prefix: 'ana- (against)', root: 'chron (time)', suffix: '-ism (state)', word: 'Anachronism', meaning: 'Thing placed in wrong historical era' },
    { prefix: 'phil- (love)', root: 'anthrop (human)', suffix: '-ist (person)', word: 'Philanthropist', meaning: 'Generous donor aiding humanity' }
  ];
  const [idx, setIdx] = useState(0);
  const r = roots[idx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Morphological Root-Affix Decoder
          </h4>
          <p className="text-xs text-slate-600">Select a Latin/Greek word family to snap morphemes together.</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {roots.map((item, i) => (
            <button
              key={item.word}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                idx === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {item.word}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-sky-50/75 border border-sky-200 grid grid-cols-3 gap-2.5 text-center">
        <div className="p-3 rounded-xl bg-white border border-sky-200">
          <div className="text-[10px] font-bold uppercase text-sky-700">Prefix / Stem 1</div>
          <div className="text-xs font-bold text-slate-900 mt-1">{r.prefix}</div>
        </div>
        <div className="p-3 rounded-xl bg-sky-600 text-white">
          <div className="text-[10px] font-bold uppercase opacity-80">Core Root</div>
          <div className="text-xs font-bold mt-1">{r.root}</div>
        </div>
        <div className="p-3 rounded-xl bg-white border border-sky-200">
          <div className="text-[10px] font-bold uppercase text-sky-700">Suffix</div>
          <div className="text-xs font-bold text-slate-900 mt-1">{r.suffix}</div>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-800">
          <strong className="text-sky-800">{r.word}:</strong> {r.meaning}
        </div>
        <button
          type="button"
          onClick={() => onSpeak(`${r.word}. ${r.meaning}`)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 11. Figures of Speech Comparator
const FiguresOfSpeechInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const pairs = [
    {
      pairName: 'Synecdoche vs Metonymy',
      leftTitle: 'Synecdoche (Physical Part)',
      leftText: '"All hands on deck!" -> Hands are literally part of the sailor.',
      rightTitle: 'Metonymy (Associated Emblem)',
      rightText: '"The Crown declared peace." -> Crown symbolizes the monarch.'
    },
    {
      pairName: 'Simile vs Metaphor',
      leftTitle: 'Simile (like / as)',
      leftText: '"O my Luve is like a red, red rose."',
      rightTitle: 'Metaphor (Direct Identity)',
      rightText: '"All the world\'s a stage."'
    },
    {
      pairName: 'Personification vs Apostrophe',
      leftTitle: 'Personification (3rd Person)',
      leftText: '"Because I could not stop for Death, He kindly stopped for me."',
      rightTitle: 'Apostrophe (Direct Address)',
      rightText: '"O Wild West Wind, thou breath of Autumn\'s being!"'
    }
  ];
  const [idx, setIdx] = useState(0);
  const p = pairs[idx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Confusing Tropes Side-by-Side Lab
          </h4>
          <p className="text-xs text-slate-600">Select an exam distinction pair to compare mechanics.</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {pairs.map((item, i) => (
            <button
              key={item.pairName}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                idx === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {item.pairName}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-1.5">
          <div className="text-xs font-bold text-sky-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{p.leftTitle}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{p.leftText}</p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-sky-300 space-y-1.5">
          <div className="text-xs font-bold text-indigo-800 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{p.rightTitle}</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{p.rightText}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => onSpeak(`${p.leftTitle}. ${p.leftText}. ${p.rightTitle}. ${p.rightText}`)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-semibold text-sky-700 cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Listen to Contrast</span>
        </button>
      </div>
    </div>
  );
};

// 12. Animated Prosody Metrical Scansion Wave
const ProsodyScansionInteractive: React.FC<{ onSpeak: (t: string) => void }> = ({ onSpeak }) => {
  const meters = [
    {
      name: 'Iambic (u /)',
      beats: [
        { syl: 'Shall', stress: false },
        { syl: 'I', stress: true },
        { syl: 'com-', stress: false },
        { syl: 'PARE', stress: true },
        { syl: 'thee', stress: false },
        { syl: 'TO', stress: true },
        { syl: 'a', stress: false },
        { syl: 'SUM-', stress: true },
        { syl: 'mer\'s', stress: false },
        { syl: 'DAY?', stress: true }
      ],
      line: 'Shall I compare thee to a summer\'s day?'
    },
    {
      name: 'Trochaic (/ u)',
      beats: [
        { syl: 'TY-', stress: true },
        { syl: 'ger', stress: false },
        { syl: 'TY-', stress: true },
        { syl: 'ger', stress: false },
        { syl: 'BURN-', stress: true },
        { syl: 'ing', stress: false },
        { syl: 'BRIGHT', stress: true }
      ],
      line: 'Tyger Tyger, burning bright'
    },
    {
      name: 'Anapestic (u u /)',
      beats: [
        { syl: 'The', stress: false },
        { syl: 'As-', stress: false },
        { syl: 'SYR-', stress: true },
        { syl: 'ian', stress: false },
        { syl: 'came', stress: false },
        { syl: 'DOWN', stress: true },
        { syl: 'like', stress: false },
        { syl: 'a', stress: false },
        { syl: 'WOLF', stress: true }
      ],
      line: 'The Assyrian came down like a wolf on the fold'
    },
    {
      name: 'Dactylic (/ u u)',
      beats: [
        { syl: 'CAN-', stress: true },
        { syl: 'non', stress: false },
        { syl: 'to', stress: false },
        { syl: 'RIGHT', stress: true },
        { syl: 'of', stress: false },
        { syl: 'them', stress: false }
      ],
      line: 'Cannon to right of them'
    },
    {
      name: 'Spondaic (/ /)',
      beats: [
        { syl: 'ROCKS,', stress: true },
        { syl: 'CAVES,', stress: true },
        { syl: 'LAKES,', stress: true },
        { syl: 'FENS', stress: true }
      ],
      line: 'Rocks, caves, lakes, fens, bogs, dens, and shades of death'
    }
  ];
  const [idx, setIdx] = useState(0);
  const current = meters[idx];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-editorial text-base font-bold text-slate-900">
            Animated Poetic Meter Scansion Visualizer
          </h4>
          <p className="text-xs text-slate-600">Select a metrical foot to inspect stressed (/) vs unstressed (u) pulse rhythm.</p>
        </div>
        <div className="flex flex-wrap gap-1 bg-sky-50 p-1 rounded-xl border border-sky-200">
          {meters.map((m, i) => (
            <button
              key={m.name}
              type="button"
              onClick={() => setIdx(i)}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold cursor-pointer ${
                idx === i ? 'bg-sky-600 text-white' : 'text-slate-700 hover:bg-white'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Syllable Stress Cards */}
      <div className="p-4 rounded-xl bg-sky-50/75 border border-sky-200 space-y-3">
        <div className="flex flex-wrap items-end justify-center gap-2 min-h-[72px]">
          {current.beats.map((b, i) => (
            <div
              key={i}
              className={`px-2.5 py-2 rounded-xl border text-center transition-all ${
                b.stress
                  ? 'bg-sky-600 text-white border-sky-700 shadow-sm animate-grammar-beat -translate-y-1'
                  : 'bg-white text-slate-700 border-sky-200'
              }`}
            >
              <div className="text-[11px] font-mono font-bold">
                {b.stress ? '/' : 'u'}
              </div>
              <div className="text-xs font-bold mt-0.5">{b.syl}</div>
            </div>
          ))}
        </div>
        <div className="text-center text-[11px] text-slate-600">
          Legend: <strong className="text-sky-700">/ = Stressed Syllable (Ictus)</strong> · <strong>u = Unstressed Syllable (Breve)</strong>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-between gap-3">
        <span className="text-xs text-slate-800 italic">"{current.line}"</span>
        <button
          type="button"
          onClick={() => onSpeak(current.line)}
          className="p-2 rounded-lg bg-white hover:bg-sky-100 border border-sky-200 text-sky-700 shrink-0 cursor-pointer"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
