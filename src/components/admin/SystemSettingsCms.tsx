import React, { useState } from 'react';
import { 
  Settings, 
  Megaphone, 
  Activity, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  Search, 
  Sparkles, 
  ArrowRight,
  Database,
  Eye
} from 'lucide-react';
import { GlobalAnnouncement, AuditLog, NavTab } from '../../types';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';

interface SystemSettingsCmsProps {
  onShowToast: (msg: string) => void;
}

export const SystemSettingsCms: React.FC<SystemSettingsCmsProps> = ({ onShowToast }) => {
  // Global announcement state
  const [announcement, setAnnouncement] = useState<GlobalAnnouncement>(() => adminStorage.getGlobalAnnouncement());
  
  // Audit logs state
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => adminStorage.getAuditLogs());
  const [searchLog, setSearchLog] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Backup state
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  // Save announcement banner
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    audioFeedback.playSuccess();
    adminStorage.setGlobalAnnouncement(announcement);
    onShowToast(`Global banner is now ${announcement.isLive ? 'LIVE across platform' : 'HIDDEN'}`);
  };

  // Export full JSON backup
  const handleExportBackup = () => {
    audioFeedback.playClick();
    const backupStr = adminStorage.exportFullBackup();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(backupStr);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `crafty_english_full_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('Exported complete CMS JSON backup');
  };

  // Import JSON backup
  const handleImportBackup = () => {
    if (!importJsonText.trim()) {
      onShowToast('Please paste the JSON backup data.');
      return;
    }
    audioFeedback.playClick();
    const success = adminStorage.importFullBackup(importJsonText);
    if (success) {
      audioFeedback.playSuccess();
      setAnnouncement(adminStorage.getGlobalAnnouncement());
      setAuditLogs(adminStorage.getAuditLogs());
      setShowImportArea(false);
      setImportJsonText('');
      onShowToast('Successfully restored CMS database from JSON archive!');
    } else {
      audioFeedback.playError();
      onShowToast('Invalid JSON archive format. Please check the backup string.');
    }
  };

  // Reset to defaults
  const handleResetDefaults = () => {
    audioFeedback.playClick();
    adminStorage.resetToDefaults();
    setAnnouncement(adminStorage.getGlobalAnnouncement());
    setAuditLogs(adminStorage.getAuditLogs());
    onShowToast('Reset CMS database to factory initial state');
  };

  // Filtered audit logs
  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchLog.toLowerCase()) ||
      log.details.toLowerCase().includes(searchLog.toLowerCase()) ||
      log.adminUser.toLowerCase().includes(searchLog.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-sky-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-sky-600" />
            <span>System Settings, Announcements & Audit Logs</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Broadcast platform-wide notifications, inspect immutable audit trails, and manage database snapshots
          </p>
        </div>
      </div>

      {/* Global Announcement Broadcast Controller */}
      <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-5 text-xs shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Global Platform Broadcast Banner
            </h3>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-slate-600 font-semibold text-xs">
              {announcement.isLive ? 'Banner Active (Live)' : 'Banner Hidden'}
            </span>
            <input
              type="checkbox"
              checked={announcement.isLive}
              onChange={(e) => setAnnouncement({ ...announcement, isLive: e.target.checked })}
              className="w-4 h-4 rounded accent-emerald-600"
            />
          </label>
        </div>

        <form onSubmit={handleSaveAnnouncement} className="space-y-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Banner Announcement Copy *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 📢 NTA NET June 2026 Crash Course + MPSET Mock Series Live! Use code CRAFTY50 for 50% discount."
              value={announcement.text}
              onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
              className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Banner Accent Variant</label>
              <select
                value={announcement.variant}
                onChange={(e) => setAnnouncement({ ...announcement, variant: e.target.value as GlobalAnnouncement['variant'] })}
                className="w-full p-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900"
              >
                <option value="success">Success (Light Sky & Emerald)</option>
                <option value="info">Info (Sky Blue)</option>
                <option value="warning">Warning (Amber Gold)</option>
                <option value="urgent">Urgent / Breaking (Rose Red)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Call-To-Action Button Label</label>
              <input
                type="text"
                placeholder="e.g. Explore Syllabus, Unlock Pro"
                value={announcement.linkText || ''}
                onChange={(e) => setAnnouncement({ ...announcement, linkText: e.target.value })}
                className="w-full p-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Destination Tab</label>
              <select
                value={announcement.linkTab || 'literature'}
                onChange={(e) => setAnnouncement({ ...announcement, linkTab: e.target.value as NavTab })}
                className="w-full p-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900"
              >
                <option value="literature">Syllabi & Units (Paper 1 & 2)</option>
                <option value="mcqs">PYQ & MCQ Simulator</option>
                <option value="coach">AI Crafty Coach</option>
                <option value="grammar">Grammar Hub</option>
                <option value="pricing">Membership & Pricing</option>
              </select>
            </div>
          </div>

          {/* Live Preview of Banner */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] text-slate-500 font-semibold uppercase flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>Real-Time Banner Preview</span>
            </span>
            <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
              announcement.variant === 'urgent'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : announcement.variant === 'warning'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : announcement.variant === 'info'
                ? 'bg-sky-50 border-sky-200 text-sky-900'
                : 'bg-white border-sky-200 text-slate-800 shadow-xs'
            }`}>
              <div className="flex items-center gap-2 truncate">
                <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="truncate font-medium">{announcement.text || 'Sample Announcement...'}</span>
              </div>
              {announcement.linkText && (
                <span className="shrink-0 px-2.5 py-0.5 rounded-full bg-sky-600 text-white font-bold text-[10px] flex items-center gap-1">
                  <span>{announcement.linkText}</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Publish Broadcast Announcement</span>
            </button>
          </div>
        </form>
      </div>

      {/* Database Snapshot & State Recovery */}
      <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-4 text-xs shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-600" />
              <span>Database Snapshot & Disaster Recovery</span>
            </h3>
            <p className="text-slate-500 text-xs">
              Export complete platform state (syllabi, questions, coupons, users) or restore from JSON backup
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportBackup}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export Full Platform Backup (JSON)</span>
          </button>

          <button
            onClick={() => setShowImportArea(!showImportArea)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 font-semibold transition-colors shadow-xs cursor-pointer"
          >
            <Upload className="w-4 h-4 text-indigo-600" />
            <span>Restore / Import JSON Snapshot</span>
          </button>

          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold transition-colors ml-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            <span>Factory Reset</span>
          </button>
        </div>

        {showImportArea && (
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-3 animate-in fade-in">
            <span className="font-semibold text-sky-800 block">Paste JSON Backup Content:</span>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder="Paste exported JSON here..."
              className="w-full p-2 bg-white border border-sky-200 rounded font-mono text-xs text-slate-900"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowImportArea(false)}
                className="px-3 py-1.5 rounded-lg bg-white border border-sky-200 text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleImportBackup}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold cursor-pointer"
              >
                Apply & Restore Database
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Immutable Audit Trail Log */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Administrative Audit Logs ({auditLogs.length} Records)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Tamper-evident activity logs recording syllabus mutations, coupon creation, and RBAC events
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white border border-sky-200 rounded-lg text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-1.5 px-2.5 bg-white border border-sky-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:border-sky-500"
            >
              <option value="All">All Categories</option>
              <option value="Syllabus">Syllabus</option>
              <option value="Questions">Questions</option>
              <option value="User RBAC">User RBAC</option>
              <option value="Coupons">Coupons</option>
              <option value="AI Prompt">AI Prompt</option>
              <option value="Financials">Financials</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-sky-200 bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-sky-200">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Administrator</th>
                  <th className="p-3">Action Executed</th>
                  <th className="p-3">Details & Parameters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100">
                {filteredLogs.slice(0, 15).map((log) => (
                  <tr key={log.id} className="hover:bg-sky-50/70 transition-colors">
                    <td className="p-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200 font-mono text-[10px]">
                        {log.category}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">
                      {log.adminUser}
                    </td>
                    <td className="p-3 text-emerald-700 font-medium">
                      {log.action}
                    </td>
                    <td className="p-3 text-slate-700 leading-relaxed">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
