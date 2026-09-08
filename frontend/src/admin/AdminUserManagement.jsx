import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, UserCheck, Trash2, Key, Search, Sparkles, Mail, Calendar } from 'lucide-react';

export const AdminUserManagement = () => {
  const { adminUsers, deleteAdminUser, currentAdminUser } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [msg, setMsg] = useState('');

  const filteredAdmins = adminUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (adminId, name) => {
    if (window.confirm(`Revoke admin access for "${name}"?`)) {
      const res = deleteAdminUser(adminId);
      setMsg(res.message);
      setTimeout(() => setMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-500" />
            <span>ADMIN USERS DATABASE</span>
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Registered Admin Accounts: <strong className="text-amber-600 dark:text-amber-400">{adminUsers.length} Admin Users</strong>
          </p>
        </div>

        <div className="w-full sm:w-64 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search admin users..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {msg && (
        <div className="p-3 bg-amber-500/10 border border-amber-500 text-amber-600 dark:text-amber-400 text-xs rounded-xl font-bold">
          {msg}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/50 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-slate-800">
              <tr>
                <th className="p-4">Admin Profile</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Assigned Role</th>
                <th className="p-4">Registration Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold flex items-center justify-center shadow-sm">
                      👑
                    </div>
                    <div>
                      <span>{admin.name}</span>
                      {currentAdminUser?.id === admin.id && (
                        <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                          (Your Active Session)
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-gray-700 dark:text-gray-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-amber-500" />
                      {admin.email}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full font-bold text-[10px] border border-amber-500/20">
                      {admin.role}
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {admin.joinDate || '2026-01-01'}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-extrabold text-[10px]">
                      ● Active
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    {admin.role !== 'Super Admin' && currentAdminUser?.id !== admin.id && (
                      <button
                        onClick={() => handleDelete(admin.id, admin.name)}
                        className="p-2 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                        title="Revoke Admin Access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
