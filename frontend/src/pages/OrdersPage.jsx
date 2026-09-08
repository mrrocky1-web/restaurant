import React from 'react';
import { useStore } from '../context/StoreContext';
import { Package, Clock, CheckCircle2, Truck, AlertCircle, ArrowLeft, MapPin, Utensils, Sparkles } from 'lucide-react';

export const OrdersPage = () => {
  const { orders, setCurrentView } = useStore();

  const getStepProgressIndex = (status) => {
    switch (status) {
      case 'Processing':
        return 1;
      case 'Shipped':
        return 2;
      case 'Delivered':
        return 3;
      case 'Cancelled':
        return -1;
      default:
        return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="font-cinzel text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-amber-500" />
            <span>MY ORDERS & LIVE TRACKING</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Track real-time order status, kitchen preparation, and delivery progress
          </p>
        </div>

        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-gray-200 dark:border-slate-800 space-y-4">
          <Package className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="font-cinzel text-xl font-bold">No Past Orders Found</h3>
          <p className="text-xs text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const currentStep = getStepProgressIndex(order.status);

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-md space-y-6"
              >
                {/* Order Top Bar */}
                <div className="bg-amber-50/50 dark:bg-slate-800/80 p-4 px-6 flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase">ORDER NUMBER</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 font-mono text-sm">
                      {order.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase">ORDER DATE</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{order.date}</span>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase">ORDER MODE</span>
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                      {order.orderType === 'Dine-In' ? <Utensils className="w-3.5 h-3.5 text-purple-500" /> : <Truck className="w-3.5 h-3.5 text-amber-500" />}
                      <span>{order.orderType === 'Dine-In' ? `Dine-In (${order.tableNumber || 'Table'})` : 'Home Delivery'}</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[10px] font-bold uppercase">TOTAL AMOUNT</span>
                    <span className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">
                      ₹{order.total.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-400 block text-[10px] mb-0.5 font-bold uppercase">CURRENT STATUS</span>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : order.status === 'Shipped'
                          ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-500/20 text-rose-600'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      ● {order.status === 'Shipped' ? 'Out for Delivery / Shipped' : order.status}
                    </span>
                  </div>
                </div>

                {/* 🚚 LIVE ORDER STATUS PROGRESS TIMELINE (4-STEPS) */}
                {order.status !== 'Cancelled' && (
                  <div className="px-6 py-2">
                    <h5 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                      LIVE ORDER STATUS TRACKER
                    </h5>
                    <div className="grid grid-cols-4 gap-2 relative">
                      {/* Step 1: Placed */}
                      <div className="text-center space-y-2 relative z-10">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${currentStep >= 1 ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
                          ✓
                        </div>
                        <span className="block text-[11px] font-bold text-gray-900 dark:text-white">Order Received</span>
                        <span className="block text-[9px] text-gray-400">Kitchen confirmed</span>
                      </div>

                      {/* Step 2: Processing */}
                      <div className="text-center space-y-2 relative z-10">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${currentStep >= 1 ? 'bg-amber-500 text-slate-950 shadow-md animate-pulse' : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
                          🍳
                        </div>
                        <span className="block text-[11px] font-bold text-gray-900 dark:text-white">Processing</span>
                        <span className="block text-[9px] text-gray-400">Preparing fresh</span>
                      </div>

                      {/* Step 3: Shipped */}
                      <div className="text-center space-y-2 relative z-10">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${currentStep >= 2 ? 'bg-blue-500 text-white shadow-md' : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
                          🚴
                        </div>
                        <span className="block text-[11px] font-bold text-gray-900 dark:text-white">Out for Delivery</span>
                        <span className="block text-[9px] text-gray-400">On the way</span>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="text-center space-y-2 relative z-10">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center font-bold text-xs ${currentStep >= 3 ? 'bg-emerald-500 text-white shadow-md' : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
                          🎉
                        </div>
                        <span className="block text-[11px] font-bold text-gray-900 dark:text-white">Delivered</span>
                        <span className="block text-[9px] text-gray-400">Enjoy your order!</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="px-6 space-y-3">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 py-2 border-b last:border-0 border-gray-100 dark:border-slate-800 text-xs">
                      <img src={item.image} alt="" className="w-14 h-16 object-cover rounded-xl border" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-gray-500 text-[11px]">
                          Color/Variant: {item.color} | Size: {item.size} | Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address & GPS Pin */}
                <div className="bg-gray-50 dark:bg-slate-950 p-4 px-6 text-xs text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row justify-between gap-2 border-t border-gray-100 dark:border-slate-800">
                  <div className="space-y-1">
                    <p><strong>Customer Address:</strong> {order.customerName} - {order.address}</p>
                    {order.customerLocation && (
                      <p className="text-amber-600 dark:text-amber-400 font-mono text-[11px] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Verified Live GPS: Lat {order.customerLocation.lat?.toFixed(4)}, Lng {order.customerLocation.lng?.toFixed(4)}</span>
                      </p>
                    )}
                  </div>
                  <p className="text-right"><strong>Payment Method:</strong> <span className="font-bold text-emerald-600">{order.paymentMethod}</span></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
