import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { RestaurantGallery } from '../components/RestaurantGallery';
import { Crown, Sparkles, ArrowRight, ShieldCheck, Star, Award, HeartHandshake } from 'lucide-react';

export const HomePage = () => {
  const { products, setCurrentView, setSelectedCategory } = useStore();

  const featuredProducts = products.filter((p) => p.published).slice(0, 6);

  return (
    <div className="space-y-16 pb-16">
      {/* Royal Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Background Image Overlay with Gradients */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
          <img
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=2000&q=80"
            alt="Royal Heritage Fashion"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-widest backdrop-blur-md">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>THE ROYAL COUTURE FESTIVAL 2026</span>
            </div>

            <h1 className="font-cinzel text-4xl sm:text-6xl font-extrabold leading-tight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-100 to-amber-300">
              EMBRACE THE MAJESTY OF ROYAL HEIRLOOMS
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
              Hand-embroidered bridal lehengas, pure zari Banarasi sarees, and bespoke royal sherwanis crafted by India’s legendary master artisans.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setSelectedCategory('Women');
                  setCurrentView('shop');
                }}
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-bold px-8 py-3.5 rounded-full shadow-lg shadow-amber-500/25 flex items-center gap-2.5 text-xs uppercase tracking-widest transition-all transform hover:-translate-y-0.5"
              >
                <span>Shop Bridal Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Men');
                  setCurrentView('shop');
                }}
                className="bg-slate-900/80 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold px-8 py-3.5 rounded-full backdrop-blur-md flex items-center gap-2.5 text-xs uppercase tracking-widest transition-all"
              >
                <span>Men's Royal Heritage</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Curated Collections
          </span>
          <h2 className="font-cinzel text-3xl font-bold text-gray-900 dark:text-white">
            EXPLORE BY CATEGORY
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Women Bridal */}
          <div
            onClick={() => {
              setSelectedCategory('Women');
              setCurrentView('shop');
            }}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-amber-900/20"
          >
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
              alt="Women Couture"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full">
                Bridal & Ethnic
              </span>
              <h3 className="font-cinzel text-2xl font-bold">WOMEN'S ROYAL COUTURE</h3>
              <p className="text-xs text-gray-300 line-clamp-1">Bridal Lehengas, Kanjeevaram Sarees & Anarkalis</p>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold group-hover:translate-x-2 transition-transform">
                <span>Explore Range</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 2: Men Royal */}
          <div
            onClick={() => {
              setSelectedCategory('Men');
              setCurrentView('shop');
            }}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-amber-900/20"
          >
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
              alt="Men Sherwanis"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full">
                Groom & Gala
              </span>
              <h3 className="font-cinzel text-2xl font-bold">MEN'S HERITAGE COLLECTION</h3>
              <p className="text-xs text-gray-300 line-clamp-1">Sherwanis, Bandhgalas & Italian Velvet Suits</p>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold group-hover:translate-x-2 transition-transform">
                <span>Explore Range</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Card 3: Royal Jewelry & Accessories */}
          <div
            onClick={() => {
              setSelectedCategory('Accessories');
              setCurrentView('shop');
            }}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-amber-900/20"
          >
            <img
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80"
              alt="Royal Jewelry"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500 text-slate-950 px-2.5 py-1 rounded-full">
                Fine Jewelry
              </span>
              <h3 className="font-cinzel text-2xl font-bold">KUNDAN & POLKI JEWELRY</h3>
              <p className="text-xs text-gray-300 line-clamp-1">Royal Chokers, Earrings & Statement Brooches</p>
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold group-hover:translate-x-2 transition-transform">
                <span>Explore Range</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Handcrafted Couture
            </span>
            <h2 className="font-cinzel text-3xl font-bold text-gray-900 dark:text-white">
              ROYAL FEATURED CREATIONS
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('shop');
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 uppercase tracking-widest"
          >
            <span>View Complete Catalogue ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 📸 5+ Visible Restaurant & Kitchen Photos Gallery */}
      <RestaurantGallery />

      {/* Royal Heritage Guarantee Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-xl space-y-4 relative z-10">
            <Crown className="w-10 h-10 text-amber-400" />
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-100">
              THE FASHIONVILLAROYAL CONCIERGE PROMISE
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Every garment is created to fit your precise measurements. Enjoy complimentary fitting calls with our master tailors in Mumbai, Delhi & Bengaluru.
            </p>
            <div className="pt-2 flex items-center gap-6 text-xs text-amber-300 font-bold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> 100% Insured Shipping
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" /> Museum Grade Silk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Client Impressions
          </span>
          <h2 className="font-cinzel text-3xl font-bold text-gray-900 dark:text-white">
            PATRON STORIES
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
              "The Maharani Velvet Lehenga exceeded my wildest expectations! The Zardozi embroidery weighs like true royal couture."
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-900 dark:text-white">Ananya Sharma</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold text-[10px]">Verified Royal Bride</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
              "My Banarasi Silk Sherwani arrived in immaculate packaging with a velvet garment suit bag. Fitting was absolute perfection."
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-900 dark:text-white">Rohan Kapoor</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold text-[10px]">Verified Groom Patron</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-300 italic leading-relaxed">
              "The pure zari tissue silk saree is an heirloom. The customer care team answered my customization questions immediately."
            </p>
            <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-900 dark:text-white">Sunita Reddy</span>
              <span className="text-amber-600 dark:text-amber-400 font-semibold text-[10px]">Verified Collector</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
