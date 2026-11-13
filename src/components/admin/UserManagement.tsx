import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  ShieldAlert, 
  Crown, 
  Key, 
  Eye, 
  Trash2, 
  CheckCircle, 
  X, 
  GraduationCap, 
  BookOpen, 
  Zap, 
  CheckCircle2
} from 'lucide-react';
import { AdminUser } from '../../types';
import { adminStorage } from '../../utils/adminStorage';
import { audioFeedback } from '../../utils/audioFeedback';

interface UserManagementProps {
  onShowToast: (msg: string) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onShowToast }) => {
  const [users, setUsers] = useState<AdminUser[]>(() => adminStorage.getUsers());
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals state
  const [selectedUserForProgress, setSelectedUserForProgress] = useState<AdminUser | null>(null);
  const [selectedUserForReset, setSelectedUserForReset] = useState<AdminUser | null>(null);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminUser['role']>('Student');
  const [newUserInstitution, setNewUserInstitution] = useState('');

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.institution && u.institution.toLowerCase().includes(search.toLowerCase()));

    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleToggleStatus = (user: AdminUser) => {
    audioFeedback.playClick();
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    const updatedUser = { ...user, status: newStatus as AdminUser['status'] };
    const updatedList = adminStorage.saveUser(updatedUser);
    setUsers(updatedList);
    onShowToast(`User ${user.name} status updated to ${newStatus.toUpperCase()}`);
  };

  const handleRoleChange = (user: AdminUser, newRole: AdminUser['role']) => {
    audioFeedback.playSuccess();
    const updatedUser = { ...user, role: newRole };
    const updatedList = adminStorage.saveUser(updatedUser);
    setUsers(updatedList);
    onShowToast(`Granted ${newRole} privileges to ${user.name}`);
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete user: ${name}?`)) {
      audioFeedback.playClick();
      const updatedList = adminStorage.deleteUser(id);
      setUsers(updatedList);
      onShowToast(`Deleted user ${name}`);
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      alert('Please enter Name and Email');
      return;
    }

    const newUser: AdminUser = {
      id: `usr-${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      lastActive: 'Just registered',
      solvedMCQs: 0,
      xp: newUserRole === 'Pro Scholar' ? 500 : 0,
      institution: newUserInstitution.trim() || undefined,
      notes: 'Manually invited via Enterprise Admin Directory.',
    };

    audioFeedback.playSuccess();
    const updatedList = adminStorage.saveUser(newUser);
    setUsers(updatedList);
    setIsAddUserOpen(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserInstitution('');
    onShowToast(`Successfully added user ${newUser.name}`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-sky-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>User & Role Management (RBAC)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Manage student directories, grant Pro Scholar privileges, reset credentials, and inspect quiz telemetry
          </p>
        </div>

        <button
          onClick={() => {
            audioFeedback.playClick();
            setIsAddUserOpen(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add / Invite User</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-xl bg-white border border-sky-200 text-xs shadow-xs">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by candidate name, university, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500 shrink-0" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full py-2 px-3 bg-sky-50 border border-sky-200 rounded-lg text-slate-800 focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Roles</option>
            <option value="Student">Student</option>
            <option value="Pro Scholar">Pro Scholar</option>
            <option value="Institution Admin">Institution Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 bg-sky-50 border border-sky-200 rounded-lg text-slate-800 focus:outline-none focus:border-sky-500"
          >
            <option value="All">All Account Statuses</option>
            <option value="active">Active Accounts</option>
            <option value="suspended">Suspended Accounts</option>
            <option value="pending">Pending Invitations</option>
          </select>
        </div>
      </div>

      {/* Users Directory Table */}
      <div className="rounded-xl border border-sky-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sky-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-sky-200">
              <tr>
                <th className="p-3.5">Candidate / User</th>
                <th className="p-3.5">Role (RBAC)</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Solved MCQs</th>
                <th className="p-3.5">XP Mastery</th>
                <th className="p-3.5">Joined Date</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No users matching criteria. Try broadening your search or filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-sky-50/70 transition-colors">
                    {/* User Info */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">{u.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono truncate">{u.email}</p>
                          {u.institution && (
                            <p className="text-[10px] text-sky-700 flex items-center gap-1 mt-0.5 font-medium">
                              <GraduationCap className="w-3 h-3" />
                              <span>{u.institution}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Role Badge & Upgrade Menu */}
                    <td className="p-3.5">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            u.role === 'Super Admin'
                              ? 'bg-purple-50 text-purple-800 border border-purple-200'
                              : u.role === 'Institution Admin'
                              ? 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                              : u.role === 'Pro Scholar'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-sky-50 text-slate-700 border border-sky-200'
                          }`}
                        >
                          {u.role === 'Pro Scholar' && <Crown className="w-3 h-3 text-amber-600 fill-current" />}
                          {u.role}
                        </span>

                        {u.role !== 'Super Admin' && (
                          <div className="flex items-center gap-1">
                            {u.role !== 'Pro Scholar' ? (
                              <button
                                onClick={() => handleRoleChange(u, 'Pro Scholar')}
                                className="text-[10px] text-emerald-700 hover:underline font-medium cursor-pointer"
                              >
                                Grant Pro Free
                              </button>
                            ) : (
                              <button
                                onClick={() => handleRoleChange(u, 'Student')}
                                className="text-[10px] text-slate-500 hover:text-slate-800 hover:underline font-medium cursor-pointer"
                              >
                                Demote to Student
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          u.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {u.status === 'active' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <ShieldAlert className="w-3 h-3" />
                        )}
                        <span>{u.status}</span>
                      </span>
                    </td>

                    {/* MCQs */}
                    <td className="p-3.5 font-mono text-slate-700">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{u.solvedMCQs}</span>
                      </div>
                    </td>

                    {/* XP */}
                    <td className="p-3.5 font-mono font-bold text-slate-900">
                      <div className="flex items-center gap-1 text-emerald-700">
                        <Zap className="w-3.5 h-3.5" />
                        <span>{u.xp} XP</span>
                      </div>
                    </td>

                    {/* Joined Date */}
                    <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                      {u.joinedDate}
                      <span className="block text-[10px] text-slate-400">{u.lastActive}</span>
                    </td>

                    {/* Actions */}
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Progress */}
                        <button
                          onClick={() => {
                            audioFeedback.playClick();
                            setSelectedUserForProgress(u);
                          }}
                          className="p-1.5 rounded-lg bg-sky-50 hover:bg-indigo-100 border border-sky-200 text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
                          title="View Quiz Scores & Analytics"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Reset Password */}
                        <button
                          onClick={() => {
                            audioFeedback.playClick();
                            setSelectedUserForReset(u);
                          }}
                          className="p-1.5 rounded-lg bg-sky-50 hover:bg-amber-100 border border-sky-200 text-slate-700 hover:text-amber-700 transition-colors cursor-pointer"
                          title="Reset Password PIN"
                        >
                          <Key className="w-3.5 h-3.5" />
                        </button>

                        {/* Toggle Ban */}
                        {u.role !== 'Super Admin' && (
                          <button
                            onClick={() => handleToggleStatus(u)}
                            className={`p-1.5 rounded-lg border border-sky-200 transition-colors cursor-pointer ${
                              u.status === 'active'
                                ? 'bg-sky-50 hover:bg-rose-100 text-slate-700 hover:text-rose-700'
                                : 'bg-sky-50 hover:bg-emerald-100 text-slate-700 hover:text-emerald-700'
                            }`}
                            title={u.status === 'active' ? 'Suspend User' : 'Reactivate User'}
                          >
                            {u.status === 'active' ? (
                              <ShieldAlert className="w-3.5 h-3.5" />
                            ) : (
                              <CheckCircle className="w-3.5 h-3.5" />
                            )}
                          </button>
                        )}

                        {/* Delete User */}
                        {u.role !== 'Super Admin' && (
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="p-1.5 rounded-lg bg-sky-50 hover:bg-rose-100 border border-sky-200 text-slate-600 hover:text-rose-700 transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Individual Student Progress & Quiz Telemetry */}
      {selectedUserForProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white border border-sky-200 rounded-2xl shadow-2xl p-6 text-slate-900">
            <button
              onClick={() => setSelectedUserForProgress(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold text-lg">
                {selectedUserForProgress.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-slate-900">
                  {selectedUserForProgress.name}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {selectedUserForProgress.email} • {selectedUserForProgress.role}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Total XP</span>
                  <p className="text-emerald-700 font-bold font-mono text-sm mt-0.5">
                    {selectedUserForProgress.xp} XP
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Solved MCQs</span>
                  <p className="text-indigo-700 font-bold font-mono text-sm mt-0.5">
                    {selectedUserForProgress.solvedMCQs}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Status</span>
                  <p className="text-slate-900 font-bold uppercase text-xs mt-0.5">
                    {selectedUserForProgress.status}
                  </p>
                </div>
              </div>

              {/* Institution / Notes */}
              {selectedUserForProgress.institution && (
                <div className="p-3 rounded-xl bg-sky-50/75 border border-sky-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Affiliated Institution</span>
                  <p className="text-slate-900 font-medium mt-0.5">{selectedUserForProgress.institution}</p>
                </div>
              )}

              {selectedUserForProgress.notes && (
                <div className="p-3 rounded-xl bg-sky-50/75 border border-sky-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Administrative Notes</span>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{selectedUserForProgress.notes}</p>
                </div>
              )}

              {/* Quiz scores history */}
              <div className="space-y-2">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Recent Examination & Drill Scores</span>
                {selectedUserForProgress.recentQuizScores && selectedUserForProgress.recentQuizScores.length > 0 ? (
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {selectedUserForProgress.recentQuizScores.map((q, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-xs"
                      >
                        <div className="truncate pr-2">
                          <p className="font-semibold text-slate-900 truncate">{q.quiz}</p>
                          <span className="text-[10px] text-slate-500 font-mono">{q.date}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono">
                          {q.score}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic p-3 bg-sky-50 rounded-lg border border-sky-200">
                    No recorded mock tests yet. User recently enrolled.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedUserForProgress(null)}
                className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-800 text-xs font-semibold cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Reset Password Dialog */}
      {selectedUserForReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-sky-200 rounded-2xl shadow-2xl p-6 text-slate-900">
            <button
              onClick={() => setSelectedUserForReset(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-slate-900">
                  Reset Password PIN
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedUserForReset.name} ({selectedUserForReset.email})
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              A temporary 6-digit one-time access PIN has been provisioned for this account:
            </p>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-center mb-4">
              <span className="text-[10px] text-slate-500 uppercase font-semibold block mb-1">Temporary Security Code</span>
              <span className="font-mono text-xl font-bold tracking-widest text-emerald-700">
                CRFT-9482
              </span>
            </div>

            <button
              onClick={() => {
                audioFeedback.playSuccess();
                onShowToast(`Password reset link emailed to ${selectedUserForReset.email}`);
                setSelectedUserForReset(null);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Send Instructions & Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL 3: Add / Invite User */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-200/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white border border-sky-200 rounded-2xl shadow-2xl p-6 text-slate-900">
            <button
              onClick={() => setIsAddUserOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-editorial text-lg font-bold text-slate-900">
                  Add / Invite Candidate
                </h3>
                <p className="text-xs text-slate-500">
                  Provision student or faculty account credentials
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kavita Krishnan"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. kavita.k@univ.edu"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Role / Privilege Level</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as AdminUser['role'])}
                  className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 focus:outline-none focus:border-sky-500"
                >
                  <option value="Student">Student (Standard Access)</option>
                  <option value="Pro Scholar">Pro Scholar (Full Bank & AI Unlocked)</option>
                  <option value="Institution Admin">Institution Admin (Department Head)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">University / Department (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Barkatullah University, Bhopal"
                  value={newUserInstitution}
                  onChange={(e) => setNewUserInstitution(e.target.value)}
                  className="w-full p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm cursor-pointer"
                >
                  Confirm & Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
