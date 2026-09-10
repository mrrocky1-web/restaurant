import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Crown,
  Search,
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  User,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  PackageCheck,
  Truck,
  Utensils
} from 'lucide-react';

export const Navbar = ({ onOpenAdminLogin }) => {
  const {
    theme,
    toggleTheme,
    cart,
    cartSubtotal,
    wishlist,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setIsCartOpen,
    isAdminLoggedIn,
    products,
    navigateToProduct,
    orderType,
    setOrderType
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Search filtered items preview
  const searchResults = searchQuery.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
      setShowSearchDropdown(false);
    }
  };

  const categories = [
    { label: 'All', value: 'All' },
    { label: 'Women', value: 'Women' },
    { label: 'Men', value: 'Men' },
    { label: 'Accessories', value: 'Accessories' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-amber-200/50 dark:border-amber-900/30 transition-colors duration-200">
      {/* Top Banner with King Burger Style Order Mode Switcher */}
      <div className="bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-amber-100 text-xs py-1.5 px-4 font-medium tracking-wide flex justify-between items-center px-6 border-b border-amber-500/20">
        <div className="hidden md:flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>KING BURGER & ROYAL DINING PLATFORM</span>
        </div>

        {/* KING BURGER STYLE DINE-IN / TAKEAWAY vs DELIVERY SELECTOR PILL */}
        <div className="mx-auto md:mx-0 flex items-center bg-slate-900/90 p-1 rounded-full border border-amber-500/30 text-[11px]">
          <button
            onClick={() => setOrderType('Delivery')}
            className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 transition-all ${
              orderType === 'Delivery'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-amber-200 hover:text-white'
            }`}
          >
            <Truck className="w-3 h-3" />
            <span>🚴 Delivery</span>
          </button>
          <button
            onClick={() => setOrderType('Dine-In')}
            className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 transition-all ${
              orderType === 'Dine-In'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-amber-200 hover:text-white'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>🍽️ Dine-In / Takeaway</span>
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-4 text-amber-200 text-[11px]">
          <span>Concierge: +91 1800-ROYAL-FVR</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-amber-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setCurrentView('home');
              }}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-300 dark:via-amber-400 dark:to-amber-500 bg-clip-text text-transparent block uppercase">
                  Fashionvillaroyal
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gray-500 dark:text-amber-400/70 font-semibold block uppercase">
                  Royal Couture & Heritage
                </span>
              </div>
            </button>
          </div>

          {/* Center: Search Bar with Autocomplete */}
          <div className="hidden md:block flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search royal lehengas, sherwanis, sarees..."
                className="w-full pl-10 pr-10 py-2.5 bg-gray-100 dark:bg-slate-800/80 border border-gray-200 dark:border-amber-900/40 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-gray-900 dark:text-white transition-all placeholder-gray-400"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Autocomplete Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-amber-200 dark:border-amber-900/40 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider px-3 border-b border-gray-100 dark:border-gray-800">
                  Search Results ({searchResults.length})
                </div>
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      navigateToProduct(product.id);
                      setShowSearchDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-amber-50 dark:hover:bg-slate-800/80 text-left transition-colors border-b last:border-0 border-gray-100 dark:border-gray-800"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-11 h-11 object-cover rounded-lg border border-amber-200 dark:border-slate-700"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-bold">
                        ₹{(product.salePrice || product.regularPrice).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Orders shortcut */}
            <button
              onClick={() => setCurrentView('orders')}
              className={`p-2.5 rounded-full transition-colors relative ${
                currentView === 'orders'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
              }`}
              title="My Orders"
            >
              <PackageCheck className="w-5 h-5" />
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentView('shop');
              }}
              className="p-2.5 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-3.5 py-2 rounded-full shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all text-xs font-semibold"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Bag</span>
              <span className="bg-white/20 text-white px-1.5 py-0.5 rounded-full text-[11px] font-bold">
                {cartItemCount}
              </span>
            </button>

            {/* Admin Switch / Portal Button */}
            <button
              onClick={() => {
                if (isAdminLoggedIn) {
                  setCurrentView('admin-dashboard');
                } else {
                  onOpenAdminLogin();
                }
              }}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-full border transition-all ${
                isAdminLoggedIn
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-amber-400/50 text-amber-700 dark:text-amber-300 hover:bg-amber-500/10'
              }`}
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span className="hidden lg:inline">
                {isAdminLoggedIn ? 'Admin Panel' : 'Admin Login'}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center gap-8 py-3 border-t border-gray-100 dark:border-slate-800 text-sm font-medium">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentView('home');
            }}
            className={`transition-colors py-1 relative ${
              currentView === 'home'
                ? 'text-amber-600 dark:text-amber-400 font-bold'
                : 'text-gray-700 dark:text-gray-300 hover:text-amber-500'
            }`}
          >
            HOME
          </button>

          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategory(cat.value);
                setCurrentView('shop');
              }}
              className={`transition-colors py-1 uppercase tracking-wider ${
                currentView === 'shop' && selectedCategory === cat.value
                  ? 'text-amber-600 dark:text-amber-400 font-bold border-b-2 border-amber-500'
                  : 'text-gray-700 dark:text-gray-300 hover:text-amber-500'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <button
            onClick={() => {
              setSelectedCategory('Women');
              setCurrentView('shop');
            }}
            className="text-amber-600 dark:text-amber-400 font-semibold tracking-wider hover:text-amber-700 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            BRIDAL COUTURE
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-3 animate-in slide-in-from-top-4">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </form>

          <div className="space-y-1 font-semibold text-sm">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200"
            >
              Home Page
            </button>
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setCurrentView('shop');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200"
              >
                {cat.label} Collection
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentView('orders');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200"
            >
              My Orders & Track
            </button>
            <button
              onClick={() => {
                if (isAdminLoggedIn) {
                  setCurrentView('admin-dashboard');
                } else {
                  onOpenAdminLogin();
                }
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-3 rounded-lg bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400 font-bold"
            >
              👑 Admin Panel Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
