import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { CustomerManagement } from './CustomerManagement';
import { AdminUserManagement } from './AdminUserManagement';
import {
  Crown,
  TrendingUp,
  ShoppingBag,
  Package,
  Users,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Sparkles,
  Layers,
  Store,
  Key,
  ShieldCheck
} from 'lucide-react';

export const AdminDashboard = () => {
  const {
    products,
    orders,
    customers,
    adminUsers,
    currentAdminUser,
    logoutAdmin,
    setCurrentView,
    updateOrderStatus
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview'); // overview, products, orders, customers, admin-users

  // Metrics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalProducts = products.length;
  const totalOrdersCount = orders.length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      {/* Top Admin Bar */}
      <header className="bg-slate-900 text-white border-b border-amber-500/30 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Logo & Active Admin Badge */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold tracking-widest text-amber-400 block uppercase">
                  Fashionvillaroyal
                </span>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="text-gray-400">Admin:</span>
                  <strong className="text-amber-300 font-bold">{currentAdminUser?.name || 'Super Admin'}</strong>
                  <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-[9px] font-bold border border-amber-500/30">
                    {currentAdminUser?.role || 'Super Admin'}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Nav Tabs */}
            <nav className="hidden lg:flex items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  activeTab === 'overview'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                📊 Dashboard KPI
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                ➕ Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                📦 Orders Desk ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`px-3 py-2 rounded-xl transition-all ${
                  activeTab === 'customers'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                👥 Customers ({customers.length})
              </button>
              <button
                onClick={() => setActiveTab('admin-users')}
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  activeTab === 'admin-users'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Admin Users DB ({adminUsers?.length || 1})</span>
              </button>
            </nav>

            {/* Right Buttons */}
            <div className="flex items-center gap-3 text-xs font-bold">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/30 px-3 py-1.5 rounded-xl hover:bg-amber-500/20"
              >
                <Store className="w-4 h-4" />
                <span className="hidden sm:inline">View Store</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="flex items-center gap-1.5 bg-rose-500/20 text-rose-300 px-3 py-1.5 rounded-xl hover:bg-rose-500/30"
                title="Logout Admin"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Admin Tabs */}
          <div className="lg:hidden flex overflow-x-auto pb-3 gap-2 text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'overview' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-gray-300'}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'products' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-gray-300'}`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'orders' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-gray-300'}`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'customers' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-gray-300'}`}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab('admin-users')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap ${activeTab === 'admin-users' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-gray-300'}`}
            >
              Admin DB
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Metric 1: Revenue */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Sales Revenue</span>
                  <span className="font-cinzel text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-sans block mt-1">
                    ₹{totalRevenue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold mt-1 inline-block">↑ +18.4% this month</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              {/* Metric 2: Orders */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Total Customer Orders</span>
                  <span className="font-cinzel text-2xl font-extrabold text-gray-900 dark:text-white block mt-1">
                    {totalOrdersCount}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold mt-1 inline-block">● {orders.filter(o => o.status === 'Processing').length} Active Processing</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              {/* Metric 3: Products */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Product Inventory</span>
                  <span className="font-cinzel text-2xl font-extrabold text-gray-900 dark:text-white block mt-1">
                    {totalProducts}
                  </span>
                  <span className="text-[10px] text-amber-500 font-bold mt-1 inline-block">
                    {products.filter(p => p.published).length} Published Live
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              {/* Metric 4: Admin DB Users */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Admin Users DB</span>
                  <span className="font-cinzel text-2xl font-extrabold text-gray-900 dark:text-white block mt-1">
                    {adminUsers?.length || 1} Admins
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold mt-1 inline-block">100% Authorized Staff</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Low Stock Warning Section */}
            {lowStockProducts.length > 0 && (
              <div className="bg-rose-500/10 border border-rose-500/40 rounded-3xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5" />
                  <span>⚠️ LOW STOCK INVENTORY ALERTS ({lowStockProducts.length} Products)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {lowStockProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-rose-200 dark:border-slate-800 flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-gray-900 dark:text-white truncate">{prod.name}</p>
                        <p className="text-[10px] text-gray-400">SKU: {prod.sku}</p>
                      </div>
                      <span className="bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded text-[10px]">
                        {prod.stock} left
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Orders Overview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
                <h3 className="font-cinzel text-lg font-bold text-gray-900 dark:text-white">
                  RECENT PATRON ORDERS
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>View All Orders</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-slate-800">
                    <tr>
                      <th className="py-3">Order ID</th>
                      <th className="py-3">Customer</th>
                      <th className="py-3">Date</th>
                      <th className="py-3">Total (₹)</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id}>
                        <td className="py-3 font-mono font-bold text-amber-600">{ord.id}</td>
                        <td className="py-3 font-semibold text-gray-800 dark:text-gray-200">{ord.customerName}</td>
                        <td className="py-3 text-gray-400">{ord.date}</td>
                        <td className="py-3 font-extrabold text-amber-700 dark:text-amber-400">
                          ₹{ord.total.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3">
                          <span className="bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full font-bold text-[10px]">
                            {ord.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'orders' && <OrderManagement />}
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'admin-users' && <AdminUserManagement />}
      </main>
    </div>
  );
};
