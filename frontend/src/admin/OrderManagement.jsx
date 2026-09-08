import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { InvoiceModal } from './InvoiceModal';
import { Package, Truck, CheckCircle2, Clock, Filter, Printer, MapPin, ExternalLink, Utensils } from 'lucide-react';

export const OrderManagement = () => {
  const { orders, updateOrderStatus } = useStore();
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);

  const filteredOrders = orders.filter(
    (o) => selectedStatusFilter === 'All' || o.status === selectedStatusFilter
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white">
            ADMIN ORDER FULFILLMENT & INVOICE DESK
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Total Orders Received: <strong className="text-amber-600 dark:text-amber-400">{orders.length} Orders</strong>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500" />
          <select
            value={selectedStatusFilter}
            onChange={(e) => setSelectedStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-xs font-bold"
          >
            <option value="All">All Order Statuses</option>
            <option value="Processing">🟡 Processing</option>
            <option value="Shipped">🔵 Shipped / Out for Delivery</option>
            <option value="Delivered">🟢 Delivered</option>
            <option value="Cancelled">🔴 Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const mapUrl = order.customerLocation
            ? `https://maps.google.com/?q=${order.customerLocation.lat},${order.customerLocation.lng}`
            : null;

          return (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm space-y-4 text-xs"
            >
              {/* Order Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm block">
                    {order.id}
                  </span>
                  <span className="text-gray-400 text-[11px]">Placed on: {order.date}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">PATRON CUSTOMER</span>
                  <span className="font-bold text-gray-900 dark:text-white block">{order.customerName}</span>
                  <span className="text-gray-400 block text-[10px]">{order.phone}</span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">ORDER TYPE</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                      order.orderType === 'Dine-In'
                        ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400'
                        : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {order.orderType === 'Dine-In' ? <Utensils className="w-3 h-3" /> : <Truck className="w-3 h-3" />}
                    <span>{order.orderType === 'Dine-In' ? `Dine-In (${order.tableNumber || 'Table'})` : 'Home Delivery'}</span>
                  </span>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">TOTAL AMOUNT (₹)</span>
                  <span className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Status Updater Select */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="px-3 py-1.5 bg-gray-50 dark:bg-slate-800 border border-amber-500/40 rounded-xl font-extrabold text-amber-600 dark:text-amber-400 cursor-pointer"
                  >
                    <option value="Processing">🟡 Processing</option>
                    <option value="Shipped">🔵 Shipped (Out for Delivery)</option>
                    <option value="Delivered">🟢 Delivered</option>
                    <option value="Cancelled">🔴 Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Items & Location Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Items list (7 cols) */}
                <div className="lg:col-span-7 space-y-2">
                  <h5 className="font-bold text-gray-800 dark:text-gray-200">
                    Ordered Items ({order.items?.length} items)
                  </h5>
                  <div className="space-y-2">
                    {order.items?.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800/40 p-2.5 rounded-2xl border border-gray-100 dark:border-slate-800"
                      >
                        <img src={item.image} alt="" className="w-10 h-12 object-cover rounded-lg border" />
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-gray-400">
                            {item.color} | Size: {item.size} | Qty: {item.quantity}
                          </p>
                        </div>
                        <span className="font-bold text-amber-600">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Location & Address Box (5 cols) */}
                <div className="lg:col-span-5 bg-amber-50/40 dark:bg-slate-800/40 p-4 rounded-2xl border border-amber-200/50 dark:border-slate-800 space-y-3">
                  <h5 className="font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    <span>Customer Address & Live GPS Location</span>
                  </h5>

                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Address:</strong> {order.address}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Payment Mode:</strong> <span className="text-emerald-600 font-bold">{order.paymentMethod}</span>
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Email:</strong> {order.email}
                  </p>

                  {/* Customer GPS Coordinates Display */}
                  {order.customerLocation ? (
                    <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-300 dark:border-amber-900/50 space-y-1 text-[11px]">
                      <span className="font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                        📍 Verified Live GPS Pin
                      </span>
                      <p className="text-gray-600 dark:text-gray-300 font-mono">
                        Lat: <strong>{order.customerLocation.lat}</strong>, Lng: <strong>{order.customerLocation.lng}</strong>
                      </p>
                      {order.customerLocation.accuracy && (
                        <p className="text-gray-400 text-[10px]">
                          Accuracy Radius: ±{order.customerLocation.accuracy} meters
                        </p>
                      )}

                      {mapUrl && (
                        <a
                          href={mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold hover:underline pt-1 text-[11px]"
                        >
                          <span>📍 View Pin on Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="p-2 bg-gray-100 dark:bg-slate-900 rounded-xl text-gray-400 text-[11px]">
                      GPS coordinates manually entered / Dine-In order.
                    </div>
                  )}

                  {/* Generate & Print Invoice Button */}
                  <div className="pt-2 border-t border-amber-200/50 dark:border-slate-700">
                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Printer className="w-4 h-4" />
                      <span>🖨️ Generate & Print Bill Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Invoice Printable Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          isOpen={!!selectedInvoiceOrder}
          onClose={() => setSelectedInvoiceOrder(null)}
          order={selectedInvoiceOrder}
        />
      )}
    </div>
  );
};
