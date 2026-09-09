import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    setCurrentView
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 10000;
  const progressPercent = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - cartSubtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-amber-200/50 dark:border-amber-900/30 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-amber-500/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-cinzel text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Shopping Bag ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-amber-50 dark:bg-slate-800/80 px-6 py-3 border-b border-amber-100 dark:border-amber-900/20 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <p className="text-gray-700 dark:text-gray-300 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Add <span className="font-bold text-amber-600 dark:text-amber-400">₹{remainingForFreeShipping.toLocaleString('en-IN')}</span> more for Free Royal Express Delivery!
                </p>
                <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Congratulations! You unlocked Free Royal Express Shipping.
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-cinzel text-lg font-bold text-gray-800 dark:text-gray-200">
                  Your Bag is Empty
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                  Explore our royal couture bridal lehengas, handloom sarees, and designer sherwanis.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentView('shop');
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartId}
                  className="flex gap-4 p-3 rounded-2xl bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-800 relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl border border-gray-200 dark:border-slate-700 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-xs text-gray-900 dark:text-gray-100 line-clamp-2 pr-4">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                        <span>Color: <strong className="text-gray-800 dark:text-gray-200">{item.color}</strong></span>
                        <span>•</span>
                        <span>Size: <strong className="text-gray-800 dark:text-gray-200">{item.size}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60 dark:border-slate-700/60">
                      <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900">
                        <button
                          onClick={() => updateCartQuantity(item.cartId, -1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-l-lg"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-gray-900 dark:text-gray-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartId, 1)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-r-lg"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-extrabold text-sm text-amber-700 dark:text-amber-400">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/50 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">
                    ₹{cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Insured Express Shipping</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {cartSubtotal >= freeShippingThreshold ? 'FREE' : '₹500'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-amber-600 dark:text-amber-400">
                    ₹{(cartSubtotal + (cartSubtotal >= freeShippingThreshold ? 0 : 500)).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('checkout');
                }}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-bold py-3.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm uppercase tracking-wider transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
