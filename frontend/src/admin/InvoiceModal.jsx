import React from 'react';
import { Crown, Printer, X, MapPin, CheckCircle2, ShieldCheck } from 'lucide-react';

export const InvoiceModal = ({ isOpen, onClose, order }) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const taxRate = 0.05; // 5% total GST (2.5% CGST + 2.5% SGST)
  const subtotal = order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || order.total;
  const taxAmount = Math.round(subtotal * taxRate);
  const grandTotal = subtotal + taxAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 print:p-0 animate-in fade-in">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-amber-500/30 shadow-2xl overflow-hidden print:shadow-none print:border-0 print:rounded-none print:bg-white print:text-black my-8 print:my-0">
        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-8 sm:p-10 space-y-6 text-gray-800 dark:text-gray-200 print:text-black print:p-6">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-amber-500/40 pb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-950 p-2 flex items-center justify-center border border-amber-500">
                <Crown className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <h1 className="font-cinzel text-2xl font-extrabold tracking-wider text-amber-600 dark:text-amber-400 print:text-black uppercase">
                  FASHIONVILLAROYAL & KING’S DINING
                </h1>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 print:text-gray-600">
                  GSTIN: 27AABCF1234M1Z8 | FSSAI License: 11522001000984
                </p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 print:text-gray-600">
                  Royal Heritage Plaza, Bandra West, Mumbai - 400050
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 print:bg-gray-100 print:text-black text-xs font-bold uppercase rounded-full tracking-widest">
                TAX INVOICE / BILL
              </span>
              <p className="text-xs font-mono font-bold text-gray-900 dark:text-white print:text-black">
                Invoice #: <strong className="text-amber-600 print:text-black">{order.id}</strong>
              </p>
              <p className="text-xs text-gray-500 print:text-gray-600">Date: {order.date}</p>
            </div>
          </div>

          {/* Order Meta & Customer info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 dark:bg-slate-800/40 print:bg-gray-50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 print:border-gray-300 text-xs">
            <div className="space-y-1">
              <h4 className="font-bold text-amber-600 dark:text-amber-400 print:text-black uppercase tracking-wider text-[11px]">
                PATRON CUSTOMER DETAILS
              </h4>
              <p className="font-bold text-gray-900 dark:text-white print:text-black text-sm">{order.customerName}</p>
              <p>📞 Phone: {order.phone}</p>
              <p>✉️ Email: {order.email}</p>
              <p className="pt-1">
                <strong>Order Type:</strong>{' '}
                <span className="font-bold text-amber-600 dark:text-amber-400 print:text-black">
                  {order.orderType === 'Dine-In' ? `🍽️ Dine-In (${order.tableNumber || 'Table'})` : '🚴 Home Delivery'}
                </span>
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-amber-600 dark:text-amber-400 print:text-black uppercase tracking-wider text-[11px]">
                DELIVERY & LOCATION INFO
              </h4>
              <p className="line-clamp-2"><strong>Address:</strong> {order.address}</p>
              {order.customerLocation && (
                <div className="pt-1 text-[11px] text-emerald-600 dark:text-emerald-400 print:text-black font-semibold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    Verified GPS Coordinates: Lat {order.customerLocation.lat?.toFixed(4)}, Lng {order.customerLocation.lng?.toFixed(4)}
                  </span>
                </div>
              )}
              <p className="pt-1">
                <strong>Payment Mode:</strong>{' '}
                <span className="font-bold text-emerald-600 dark:text-emerald-400 print:text-black">
                  {order.paymentMethod} (PAID)
                </span>
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white print:bg-gray-200 print:text-black border-b border-gray-200">
                  <th className="p-3 rounded-l-xl print:rounded-none">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3 text-center">Variant / Size</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price (₹)</th>
                  <th className="p-3 text-right rounded-r-xl print:rounded-none">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-800 print:divide-gray-300">
                {order.items?.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 print:hover:bg-transparent">
                    <td className="p-3 font-mono font-bold">{idx + 1}</td>
                    <td className="p-3 font-bold text-gray-900 dark:text-white print:text-black">
                      {item.name}
                    </td>
                    <td className="p-3 text-center text-gray-500 print:text-gray-700">
                      {item.color} / {item.size}
                    </td>
                    <td className="p-3 text-center font-bold">{item.quantity}</td>
                    <td className="p-3 text-right">₹{item.price.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-right font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Summary Calculation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-t-2 border-gray-100 dark:border-slate-800 print:border-gray-300 pt-4 gap-4">
            <div className="text-[11px] text-gray-500 dark:text-gray-400 print:text-gray-600 space-y-1">
              <p className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 print:text-black">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Computer Generated Official Tax Receipt</span>
              </p>
              <p>Thank you for choosing King’s Dining & Fashionvillaroyal!</p>
              <p>For support, call +91 1800-ROYAL-FVR</p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs bg-gray-50 dark:bg-slate-800/50 print:bg-gray-50 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 print:border-gray-300">
              <div className="flex justify-between text-gray-500 print:text-gray-700">
                <span>Subtotal:</span>
                <span className="font-bold text-gray-900 dark:text-white print:text-black">
                  ₹{subtotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 print:text-gray-700">
                <span>CGST (2.5%):</span>
                <span>₹{(taxAmount / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-500 print:text-gray-700">
                <span>SGST (2.5%):</span>
                <span>₹{(taxAmount / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-amber-600 dark:text-amber-400 print:text-black border-t border-gray-200 dark:border-slate-700 print:border-gray-400 pt-2">
                <span>Grand Total:</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Controls (Hidden during print) */}
        <div className="p-4 bg-gray-100 dark:bg-slate-800 flex justify-end gap-3 print:hidden border-t border-gray-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 font-bold text-xs hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>🖨️ Print Official Invoice / Bill</span>
          </button>
        </div>
      </div>
    </div>
  );
};
