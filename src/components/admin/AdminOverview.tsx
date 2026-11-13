import React, { useState } from 'react';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  Cpu, 
  Sparkles, 
  HelpCircle, 
  Tag, 
  Megaphone, 
  ArrowUpRight, 
  Activity,
  Layers,
  Calendar
} from 'lucide-react';
import { AdminSection } from '../../types';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';

interface AdminOverviewProps {
  onNavigateSection: (section: AdminSection) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateSection }) => {
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(11);

  const users = adminStorage.getUsers();
  const mcqs = adminStorage.getAllMCQs();
  const auditLogs = adminStorage.getAuditLogs();

  // Metrics
  const totalStudents = 24890 + users.length;
  const proSubscribers = users.filter((u) => u.role === 'Pro Scholar' || u.role === 'Institution Admin').length + 3410;
  const mrrUsd = 48250;
  const mrrInr = 3980000;
  const dailyActiveUsers = 3420;
  const tokensConsumedToday = 1248500;
  const aiCostTodayUsd = 93.64;

  // Monthly revenue trend (Last 12 Months)
  const revenueTrend = [
    { month: 'Dec 25', usd: 28400, inr: 2350000, students: 16200 },
    { month: 'Jan 26', usd: 31200, inr: 2580000, students: 17800 },
    { month: 'Feb 26', usd: 33800, inr: 2790000, students: 19100 },
    { month: 'Mar 26', usd: 36500, inr: 3010000, students: 20400 },
    { month: 'Apr 26', usd: 39100, inr: 3230000, students: 21600 },
    { month: 'May 26', usd: 41800, inr: 3450000, students: 22800 },
    { month: 'Jun 26', usd: 44200, inr: 3650000, students: 23900 },
    { month: 'Jul 26', usd: 43500, inr: 3590000, students: 24100 },
    { month: 'Aug 26', usd: 45100, inr: 3720000, students: 24400 },
    { month: 'Sep 26', usd: 46200, inr: 3810000, students: 24650 },
    { month: 'Oct 26', usd: 47400, inr: 3910000, students: 24800 },
    { month: 'Nov 26', usd: 48250, inr: 3980000, students: 24890 },
  ];

  // Exam Track breakdown
  const examBreakdown = [
    { name: 'NTA NET & MPSET Paper 2 (Literature)', percent: 42, count: '10,450 Aspirants', color: 'bg-indigo-600' },
    { name: 'NTA NET Paper 1 (General Paper)', percent: 34, count: '8,460 Aspirants', color: 'bg-emerald-600' },
    { name: 'MPESB Grade 1 (High School Teacher)', percent: 15, count: '3,730 Aspirants', color: 'bg-amber-500' },
    { name: 'MPESB Grade 2 & TET Pedagogy', percent: 9, count: '2,250 Aspirants', color: 'bg-sky-600' },
  ];

  const maxRevenue = Math.max(...revenueTrend.map((d) => d.usd));
  const activeMonthData = hoveredMonth !== null ? revenueTrend[hoveredMonth] : revenueTrend[11];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner & Currency Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-white via-sky-50 to-blue-100/75 border border-sky-200 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-editorial text-slate-900 flex items-center gap-2">
            Mission Control & Global Analytics
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Real-time telemetry, MRR economics, user telemetry, and syllabus performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-white border border-sky-200 text-xs font-semibold shadow-xs">
            <button
              onClick={() => {
                audioFeedback.playClick();
                setCurrency('USD');
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => {
                audioFeedback.playClick();
                setCurrency('INR');
              }}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                currency === 'INR' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              INR (₹)
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-sky-200 text-xs text-slate-700 font-mono">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>Nov 2026 Live Session</span>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Students */}
        <div className="p-4 rounded-xl bg-white border border-sky-200 hover:border-sky-300 transition-all group shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Scholars</span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-700 group-hover:scale-110 transition-transform">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
            {totalStudents.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-2 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+14.8% from last cycle</span>
          </div>
        </div>

        {/* Pro Subscribers */}
        <div className="p-4 rounded-xl bg-white border border-sky-200 hover:border-sky-300 transition-all group shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Pro Members</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:scale-110 transition-transform">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700 tracking-tight font-mono">
            {proSubscribers.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 mt-2 font-medium">
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
              13.7% Conversion
            </span>
          </div>
        </div>

        {/* MRR */}
        <div className="p-4 rounded-xl bg-white border border-sky-200 hover:border-sky-300 transition-all group shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Monthly Revenue (MRR)</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
            {currency === 'USD' ? `$${mrrUsd.toLocaleString()}` : `₹${(mrrInr / 100000).toFixed(1)} Lakh`}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-indigo-700 mt-2 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            <span>+12.4% ARR Run Rate</span>
          </div>
        </div>

        {/* Daily Active Users */}
        <div className="p-4 rounded-xl bg-white border border-sky-200 hover:border-sky-300 transition-all group shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Daily Active (DAU)</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">
            {dailyActiveUsers.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-2">
            <span>Peak: 20:00 - 22:30 IST</span>
          </div>
        </div>

        {/* AI Tokens & Gemini Cost */}
        <div className="p-4 rounded-xl bg-white border border-sky-200 hover:border-sky-300 transition-all group shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gemini AI Usage</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-700 tracking-tight font-mono">
            {(tokensConsumedToday / 1000000).toFixed(2)}M <span className="text-xs text-slate-500 font-normal">tokens</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
            <span>Est. Cost:</span>
            <span className="text-slate-900 font-bold">${aiCostTodayUsd}</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 12-Month Interactive SVG Revenue Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-sky-200 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Revenue & Subscription Expansion (Last 12 Months)</span>
              </h3>
              <p className="text-xs text-slate-500">
                Tracked ARR acceleration across NTA NET and MPESB examination application cycles
              </p>
            </div>
            {activeMonthData && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-sky-50 border border-sky-200 text-xs">
                <span className="text-slate-600">{activeMonthData.month}:</span>
                <span className="font-mono font-bold text-emerald-700">
                  {currency === 'USD' ? `$${activeMonthData.usd.toLocaleString()}` : `₹${activeMonthData.inr.toLocaleString()}`}
                </span>
                <span className="text-slate-600">({activeMonthData.students.toLocaleString()} scholars)</span>
              </div>
            )}
          </div>

          {/* Area & Bar Interactive Chart */}
          <div className="h-64 w-full pt-4">
            <div className="h-48 flex items-end justify-between gap-1.5 sm:gap-3 px-2 border-b border-sky-200 relative">
              {revenueTrend.map((item, idx) => {
                const heightPercent = Math.round((item.usd / maxRevenue) * 100);
                const isHovered = hoveredMonth === idx;
                return (
                  <div
                    key={item.month}
                    onMouseEnter={() => setHoveredMonth(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  >
                    {/* Tooltip on hover */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 px-2 py-1 rounded-md bg-white border border-sky-300 text-[10px] text-slate-900 shadow-lg whitespace-nowrap pointer-events-none font-mono">
                        <span className="font-bold text-emerald-700">
                          {currency === 'USD' ? `$${item.usd.toLocaleString()}` : `₹${item.inr.toLocaleString()}`}
                        </span>
                        <div className="text-[9px] text-slate-500">{item.students} Students</div>
                      </div>
                    )}
                    {/* Bar */}
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-md transition-all duration-200 ${
                        isHovered
                          ? 'bg-gradient-to-t from-sky-600 to-emerald-500 shadow-sm'
                          : 'bg-gradient-to-t from-sky-200 to-sky-500 hover:from-sky-300 hover:to-sky-600'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
            {/* X-axis labels */}
            <div className="flex justify-between gap-1.5 sm:gap-3 px-2 pt-2 text-[10px] text-slate-500 font-mono">
              {revenueTrend.map((item, idx) => (
                <div
                  key={item.month}
                  className={`flex-1 text-center truncate ${hoveredMonth === idx ? 'text-sky-700 font-bold' : ''}`}
                >
                  {item.month.split(' ')[0]}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exam Track Popularity Breakdown */}
        <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-5 flex flex-col justify-between shadow-sm">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Exam Track Popularity</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Active student enrollment breakdown by state and national exam syllabus
            </p>
          </div>

          <div className="space-y-4">
            {examBreakdown.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 truncate pr-2">{item.name}</span>
                  <span className="font-mono font-bold text-slate-900">{item.percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-sky-100 overflow-hidden border border-sky-200">
                  <div
                    style={{ width: `${item.percent}%` }}
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono text-right">{item.count}</div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between text-slate-900 font-semibold">
              <span>Question Bank Volume:</span>
              <span className="font-mono text-emerald-700">{mcqs.length} Live Questions</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Unified NTA NET + MPSET Literature Paper 2 represents the highest demand, followed by Paper 1 Teaching & Research Aptitude.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Action Shortcuts */}
        <div className="p-6 rounded-2xl bg-white border border-sky-200 space-y-4 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Administrative Quick Actions</span>
          </h3>
          <p className="text-xs text-slate-500">
            Rapid shortcut triggers for common administrative operations
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => {
                audioFeedback.playClick();
                onNavigateSection('questions-cms');
              }}
              className="p-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 hover:border-indigo-400 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs mb-1">
                <HelpCircle className="w-4 h-4" />
                <span>Add Past Year MCQ</span>
              </div>
              <p className="text-[11px] text-slate-600">Create new 2014-2024 question with AI Rationale</p>
            </button>

            <button
              onClick={() => {
                audioFeedback.playClick();
                onNavigateSection('financials');
              }}
              className="p-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 hover:border-emerald-400 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs mb-1">
                <Tag className="w-4 h-4" />
                <span>Create Promo Coupon</span>
              </div>
              <p className="text-[11px] text-slate-600">Issue custom discount codes (e.g. CRAFTY60)</p>
            </button>

            <button
              onClick={() => {
                audioFeedback.playClick();
                onNavigateSection('settings');
              }}
              className="p-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 hover:border-amber-400 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-amber-700 font-semibold text-xs mb-1">
                <Megaphone className="w-4 h-4" />
                <span>Broadcast Site Banner</span>
              </div>
              <p className="text-[11px] text-slate-600">Publish exam alert banner at top of site</p>
            </button>

            <button
              onClick={() => {
                audioFeedback.playClick();
                onNavigateSection('ai-studio');
              }}
              className="p-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 hover:border-purple-400 text-left transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-purple-700 font-semibold text-xs mb-1">
                <Cpu className="w-4 h-4" />
                <span>Tune AI Prompts</span>
              </div>
              <p className="text-[11px] text-slate-600">Adjust temperature & test Crafty Mentor</p>
            </button>
          </div>
        </div>

        {/* Live Immutable Audit Stream */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-sky-200 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Live Administrative Audit Trail</span>
              </h3>
              <p className="text-xs text-slate-500">
                Immutable activity logs recording syllabus changes, user upgrades, and billing events
              </p>
            </div>
            <button
              onClick={() => {
                audioFeedback.playClick();
                onNavigateSection('settings');
              }}
              className="text-xs font-semibold text-sky-700 hover:text-sky-800 transition-colors cursor-pointer"
            >
              View All Logs →
            </button>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-sky-50/75 border border-sky-200 text-xs hover:border-sky-300 transition-all"
              >
                <div className="p-1.5 rounded-lg bg-white border border-sky-200 shrink-0 text-sky-700 font-mono text-[10px]">
                  {log.category}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-900 truncate">{log.action}</span>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed truncate">{log.details}</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-mono">{log.adminUser}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
