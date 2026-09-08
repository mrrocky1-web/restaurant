import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Users, Search, ShoppingBag, ShieldCheck, Mail, Phone } from 'lucide-react';

export const CustomerManagement = () => {
  const { customers } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white">
            PATRON CUSTOMER DIRECTORY
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Registered Customers: <strong className="text-amber-600 dark:text-amber-400">{customers.length} Accounts</strong>
          </p>
        </div>

        <div className="w-full sm:w-64 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/50 dark:bg-slate-800/80 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-slate-800">
              <tr>
                <th className="p-4">Customer Name</th>
                <th className="p-4">Contact Details</th>
                <th className="p-4">Location</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Total Spent (₹)</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-600 font-bold flex items-center justify-center">
                      {cust.name[0]}
                    </div>
                    <div>
                      <span>{cust.name}</span>
                      <span className="block text-[10px] text-gray-400 font-normal">Joined {cust.joinDate}</span>
                    </div>
                  </td>
                  <td className="p-4 space-y-0.5">
                    <span className="block text-gray-800 dark:text-gray-200 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-amber-500" /> {cust.email}
                    </span>
                    <span className="block text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-amber-500" /> {cust.phone}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">{cust.city}</td>
                  <td className="p-4 font-bold text-amber-600">{cust.ordersCount} Orders</td>
                  <td className="p-4 font-extrabold text-amber-700 dark:text-amber-400">
                    ₹{cust.totalSpent.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4">
                    <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold text-[10px]">
                      ● Active
                    </span>
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
