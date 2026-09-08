import React from 'react';
import { Crown, Mail, Phone, MapPin, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  return (
    <footer className="bg-slate-950 text-gray-300 pt-16 pb-12 border-t border-amber-900/40">
      {/* Brand Value Props */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white">Complimentary Delivery</h4>
            <p className="text-xs text-gray-400">Free express insured shipping across India & international destinations.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white">100% Authentic Handloom</h4>
            <p className="text-xs text-gray-400">Certified pure Banarasi silk, Kanjeevarams and hand Zardozi craft.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white">7-Day Easy Returns</h4>
            <p className="text-xs text-gray-400">Hassle-free size exchange and seamless returns policy.</p>
          </div>
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-white">Royal Concierge</h4>
            <p className="text-xs text-gray-400">Custom fit consultation and personal stylist support 24/7.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Crown className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-cinzel text-xl font-bold tracking-widest bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent uppercase">
                Fashionvillaroyal
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed pr-6">
              Fashionvillaroyal epitomizes opulent Indian heritage, luxury bridal couture, handcrafted Zardozi masterpieces, and modern regal attire. Designed to make every moment unforgettable.
            </p>
            <div className="pt-2 text-xs space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" /> 42 Royal Heritage Blvd, Juhu, Mumbai, 400049
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" /> +91 (022) 8800-ROYAL / 1800-769-25
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" /> concierge@fashionvillaroyal.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-cinzel text-amber-400 font-semibold mb-4 tracking-wider uppercase text-sm">Collections</h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => { setSelectedCategory('Women'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">
                  Bridal Lehengas
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Women'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">
                  Kanjeevaram Sarees
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Men'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">
                  Royal Sherwanis
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Men'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">
                  Velvet Tuxedos
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('Accessories'); setCurrentView('shop'); }} className="hover:text-amber-300 transition-colors">
                  Polki Jewelry Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-cinzel text-amber-400 font-semibold mb-4 tracking-wider uppercase text-sm">Customer Care</h5>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li><button onClick={() => setCurrentView('orders')} className="hover:text-amber-300">Track Order</button></li>
              <li><a href="#size-guide" className="hover:text-amber-300">Royal Fitting & Size Guide</a></li>
              <li><a href="#customization" className="hover:text-amber-300">Bespoke Customization</a></li>
              <li><a href="#terms" className="hover:text-amber-300">Shipping & Returns</a></li>
              <li><a href="#faq" className="hover:text-amber-300">FAQ & Care Instructions</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="font-cinzel text-amber-400 font-semibold mb-4 tracking-wider uppercase text-sm">VIP Club</h5>
            <p className="text-xs text-gray-400 mb-3">Subscribe for private trunk show invites and secret collection drops.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Fashionvillaroyal VIP Club!'); }} className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-2 rounded text-xs transition-all uppercase tracking-wider"
              >
                Join Privilege Club
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
        <p>© 2026 Fashionvillaroyal Couture Ltd. All rights reserved.</p>
        <div className="flex items-center gap-4 text-amber-400/80 font-mono text-[11px]">
          <span>💳 COD Available</span>
          <span>•</span>
          <span>⚡ UPI Instant</span>
          <span>•</span>
          <span>🔒 256-Bit SSL Encrypted</span>
        </div>
      </div>
    </footer>
  );
};
