import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  ChevronDown, 
  ChevronRight, 
  Flame, 
  BookMarked
} from 'lucide-react';
import { Paper1Unit, LiteratureUnit, MpesbGrade1Unit, MpesbGrade2Unit } from '../../types';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';

interface SyllabusManagerProps {
  onShowToast: (msg: string) => void;
}

export const SyllabusManager: React.FC<SyllabusManagerProps> = ({ onShowToast }) => {
  const [activeTrack, setActiveTrack] = useState<'p1' | 'p2' | 'g1' | 'g2'>('p2');

  // Track Data
  const [p1Units, setP1Units] = useState<Paper1Unit[]>(() => adminStorage.getPaper1Syllabus());
  const [p2Units, setP2Units] = useState<LiteratureUnit[]>(() => adminStorage.getLiteratureSyllabus());
  const [g1Units, setG1Units] = useState<MpesbGrade1Unit[]>(() => adminStorage.getMpesbGrade1Syllabus());
  const [g2Units, setG2Units] = useState<MpesbGrade2Unit[]>(() => adminStorage.getMpesbGrade2Syllabus());

  // Expanded accordion ids
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>(p2Units[0]?.id || null);

  // Edit Unit State
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editOverview, setEditOverview] = useState('');
  const [newExamPoint, setNewExamPoint] = useState('');

  // Start editing a unit
  const handleStartEdit = (id: string, title: string, overview: string) => {
    audioFeedback.playClick();
    setEditingUnitId(id);
    setEditTitle(title);
    setEditOverview(overview);
  };

  // Save edited unit
  const handleSaveEdit = (id: string) => {
    audioFeedback.playSuccess();
    if (activeTrack === 'p2') {
      const updated = p2Units.map((u) => u.id === id ? { ...u, title: editTitle, overview: editOverview } : u);
      setP2Units(updated);
      adminStorage.saveLiteratureSyllabus(updated);
    } else if (activeTrack === 'p1') {
      const updated = p1Units.map((u) => u.id === id ? { ...u, title: editTitle, overview: editOverview } : u);
      setP1Units(updated);
      adminStorage.savePaper1Syllabus(updated);
    } else if (activeTrack === 'g1') {
      const updated = g1Units.map((u) => u.id === id ? { ...u, title: editTitle, overview: editOverview } : u);
      setG1Units(updated);
      adminStorage.saveMpesbGrade1Syllabus(updated);
    } else if (activeTrack === 'g2') {
      const updated = g2Units.map((u) => u.id === id ? { ...u, title: editTitle, overview: editOverview } : u);
      setG2Units(updated);
      adminStorage.saveMpesbGrade2Syllabus(updated);
    }
    setEditingUnitId(null);
    onShowToast(`Successfully saved syllabus unit`);
  };

  // Add high-yield exam point to a unit
  const handleAddExamPoint = (id: string) => {
    if (!newExamPoint.trim()) return;
    audioFeedback.playSuccess();

    if (activeTrack === 'p2') {
      const updated = p2Units.map((u) => {
        if (u.id === id) {
          return { ...u, examPoints: [...(u.examPoints || []), newExamPoint.trim()] };
        }
        return u;
      });
      setP2Units(updated);
      adminStorage.saveLiteratureSyllabus(updated);
    } else if (activeTrack === 'p1') {
      const updated = p1Units.map((u) => {
        if (u.id === id) {
          return { ...u, examPoints: [...(u.examPoints || []), newExamPoint.trim()] };
        }
        return u;
      });
      setP1Units(updated);
      adminStorage.savePaper1Syllabus(updated);
    } else if (activeTrack === 'g1') {
      const updated = g1Units.map((u) => {
        if (u.id === id) {
          return { ...u, examPoints: [...(u.examPoints || []), newExamPoint.trim()] };
        }
        return u;
      });
      setG1Units(updated);
      adminStorage.saveMpesbGrade1Syllabus(updated);
    } else if (activeTrack === 'g2') {
      const updated = g2Units.map((u) => {
        if (u.id === id) {
          return { ...u, examPoints: [...(u.examPoints || []), newExamPoint.trim()] };
        }
        return u;
      });
      setG2Units(updated);
      adminStorage.saveMpesbGrade2Syllabus(updated);
    }

    setNewExamPoint('');
    onShowToast('Added High-Yield Exam Point to unit');
  };

  // Remove high-yield exam point
  const handleRemoveExamPoint = (unitId: string, pointIndex: number) => {
    audioFeedback.playClick();
    if (activeTrack === 'p2') {
      const updated = p2Units.map((u) => {
        if (u.id === unitId) {
          return { ...u, examPoints: (u.examPoints || []).filter((_, i) => i !== pointIndex) };
        }
        return u;
      });
      setP2Units(updated);
      adminStorage.saveLiteratureSyllabus(updated);
    } else if (activeTrack === 'p1') {
      const updated = p1Units.map((u) => {
        if (u.id === unitId) {
          return { ...u, examPoints: (u.examPoints || []).filter((_, i) => i !== pointIndex) };
        }
        return u;
      });
      setP1Units(updated);
      adminStorage.savePaper1Syllabus(updated);
    } else if (activeTrack === 'g1') {
      const updated = g1Units.map((u) => {
        if (u.id === unitId) {
          return { ...u, examPoints: (u.examPoints || []).filter((_, i) => i !== pointIndex) };
        }
        return u;
      });
      setG1Units(updated);
      adminStorage.saveMpesbGrade1Syllabus(updated);
    } else if (activeTrack === 'g2') {
      const updated = g2Units.map((u) => {
        if (u.id === unitId) {
          return { ...u, examPoints: (u.examPoints || []).filter((_, i) => i !== pointIndex) };
        }
        return u;
      });
      setG2Units(updated);
      adminStorage.saveMpesbGrade2Syllabus(updated);
    }
    onShowToast('Removed Exam Point');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-sky-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-600" />
            <span>Curriculum & Syllabus Tree CMS</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Maintain official syllabi, update unit overviews, and curate 🔥 High-Yield Exam Points for candidates
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-700 font-semibold px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
            Auto-Syncs with Candidate Portal
          </span>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-semibold">
        <button
          onClick={() => {
            audioFeedback.playClick();
            setActiveTrack('p2');
            setExpandedUnitId(p2Units[0]?.id || null);
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTrack === 'p2'
              ? 'bg-sky-50 border-sky-500 text-slate-900 ring-2 ring-sky-200 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center gap-2 text-amber-700 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>NTA NET & MPSET Lit</span>
          </div>
          <span className="text-[11px] text-slate-500">Paper 2 (Units 1-10)</span>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setActiveTrack('p1');
            setExpandedUnitId(p1Units[0]?.id || null);
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTrack === 'p1'
              ? 'bg-sky-50 border-sky-500 text-slate-900 ring-2 ring-sky-200 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center gap-2 text-emerald-700 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>NTA NET Paper 1</span>
          </div>
          <span className="text-[11px] text-slate-500">General Paper (Units 1-10)</span>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setActiveTrack('g1');
            setExpandedUnitId(g1Units[0]?.id || null);
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTrack === 'g1'
              ? 'bg-sky-50 border-sky-500 text-slate-900 ring-2 ring-sky-200 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center gap-2 text-sky-700 mb-1">
            <Layers className="w-4 h-4" />
            <span>MPESB Grade-1</span>
          </div>
          <span className="text-[11px] text-slate-500">NCERT Class 9-12 Literature</span>
        </button>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setActiveTrack('g2');
            setExpandedUnitId(g2Units[0]?.id || null);
          }}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeTrack === 'g2'
              ? 'bg-sky-50 border-sky-500 text-slate-900 ring-2 ring-sky-200 shadow-xs'
              : 'bg-white border-sky-200 text-slate-600 hover:text-slate-900 hover:bg-sky-50/40'
          }`}
        >
          <div className="flex items-center gap-2 text-indigo-700 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>MPESB Grade-2</span>
          </div>
          <span className="text-[11px] text-slate-500">Functional Grammar & Pedagogy</span>
        </button>
      </div>

      {/* Accordion List for Active Track */}
      <div className="space-y-3">
        {activeTrack === 'p2' &&
          p2Units.map((unit) => {
            const isExpanded = expandedUnitId === unit.id;
            const isEditing = editingUnitId === unit.id;
            return (
              <div
                key={unit.id}
                className="rounded-xl border border-sky-200 bg-white overflow-hidden transition-all shadow-xs"
              >
                {/* Unit Header Bar */}
                <div
                  onClick={() => {
                    audioFeedback.playClick();
                    setExpandedUnitId(isExpanded ? null : unit.id);
                  }}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-sky-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 flex-wrap">
                        <span>{unit.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {unit.periodOrDomain}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{unit.overview}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs font-mono text-slate-500">
                      {(unit.examPoints || []).length} Exam Points
                    </span>
                    <button
                      onClick={() => handleStartEdit(unit.id, unit.title, unit.overview)}
                      className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                      title="Edit Unit Details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-sky-50/60 border-t border-sky-100 space-y-6 text-xs">
                    {/* Inline Edit Form */}
                    {isEditing ? (
                      <div className="p-4 rounded-xl bg-white border border-sky-300 space-y-3 shadow-xs">
                        <span className="font-bold text-sky-700 block text-xs">Editing Unit Information</span>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Unit Title</label>
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full p-2 bg-sky-50 border border-sky-200 rounded text-slate-900 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Unit Overview</label>
                          <textarea
                            rows={3}
                            value={editOverview}
                            onChange={(e) => setEditOverview(e.target.value)}
                            className="w-full p-2 bg-sky-50 border border-sky-200 rounded text-slate-900 focus:outline-none focus:border-sky-500"
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => setEditingUnitId(null)}
                            className="px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-slate-700 cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(unit.id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                          Canonical Scope & Theoretical Domain
                        </span>
                        <p className="text-slate-700 leading-relaxed">{unit.overview}</p>
                      </div>
                    )}

                    {/* High Yield Exam Points */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-800 flex items-center gap-1.5 text-xs">
                          <Flame className="w-4 h-4 fill-amber-500 text-amber-600" />
                          <span>🔥 High-Yield Exam Points for Candidates</span>
                        </span>
                      </div>

                      <div className="space-y-2">
                        {(unit.examPoints || []).map((pt, idx) => (
                          <div
                            key={idx}
                            className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-white border border-sky-200 group hover:border-sky-300"
                          >
                            <span className="text-slate-800 leading-relaxed flex-1">{pt}</span>
                            <button
                              onClick={() => handleRemoveExamPoint(unit.id, idx)}
                              className="text-slate-400 hover:text-rose-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              title="Delete point"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add point form */}
                      <div className="flex gap-2 pt-2">
                        <input
                          type="text"
                          placeholder="Add new high-yield exam point, chronological fact, or theory mnemonic..."
                          value={newExamPoint}
                          onChange={(e) => setNewExamPoint(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddExamPoint(unit.id);
                            }
                          }}
                          className="flex-1 p-2 bg-white border border-sky-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                        />
                        <button
                          onClick={() => handleAddExamPoint(unit.id)}
                          className="px-3.5 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Point</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        {/* Paper 1 Units */}
        {activeTrack === 'p1' &&
          p1Units.map((unit) => {
            const isExpanded = expandedUnitId === unit.id;
            return (
              <div key={unit.id} className="rounded-xl border border-sky-200 bg-white overflow-hidden shadow-xs">
                <div
                  onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-sky-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Unit {unit.unitNumber}: {unit.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{unit.subTitle}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {unit.examPoints.length} Exam Points
                  </span>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-sky-50/60 border-t border-sky-100 space-y-4 text-xs">
                    <p className="text-slate-700 leading-relaxed">{unit.overview}</p>
                    <div className="space-y-2">
                      <span className="font-semibold text-emerald-700 block">Unit High-Yield Points:</span>
                      {unit.examPoints.map((pt, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-sky-200 text-slate-800">
                          {pt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        {/* MPESB Grade 1 Units */}
        {activeTrack === 'g1' &&
          g1Units.map((unit) => {
            const isExpanded = expandedUnitId === unit.id;
            return (
              <div key={unit.id} className="rounded-xl border border-sky-200 bg-white overflow-hidden shadow-xs">
                <div
                  onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-sky-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-700">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{unit.title}</h4>
                      <p className="text-xs text-slate-500">{unit.section} • {unit.classLevel || 'High School'}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {unit.prescribedTexts.length} Prescribed Texts
                  </span>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-sky-50/60 border-t border-sky-100 space-y-4 text-xs">
                    <p className="text-slate-700 leading-relaxed">{unit.overview}</p>
                    <div className="space-y-2">
                      <span className="font-semibold text-sky-700 block">High-Yield Exam Focus:</span>
                      {unit.examPoints.map((pt, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-sky-200 text-slate-800">
                          {pt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        {/* MPESB Grade 2 Units */}
        {activeTrack === 'g2' &&
          g2Units.map((unit) => {
            const isExpanded = expandedUnitId === unit.id;
            return (
              <div key={unit.id} className="rounded-xl border border-sky-200 bg-white overflow-hidden shadow-xs">
                <div
                  onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-sky-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{unit.title}</h4>
                      <p className="text-xs text-slate-500">{unit.section}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {unit.topics.length} Sub-Topics
                  </span>
                </div>

                {isExpanded && (
                  <div className="p-4 sm:p-6 bg-sky-50/60 border-t border-sky-100 space-y-4 text-xs">
                    <p className="text-slate-700 leading-relaxed">{unit.overview}</p>
                    <div className="space-y-2">
                      <span className="font-semibold text-indigo-700 block">Pedagogy Exam Points:</span>
                      {unit.examPoints.map((pt, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-sky-200 text-slate-800">
                          {pt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
