import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Grid, List, RotateCcw, Search, Sparkles } from 'lucide-react';

export const ShopPage = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory
  } = useStore();

  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(50000);
  const [selectedColor, setSelectedColor] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter published products
  let filtered = products.filter((p) => p.published);

  // Category filter
  if (selectedCategory !== 'All') {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  // Subcategory filter
  if (selectedSubcategory !== 'All') {
    filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
  }

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  // Price filter
  filtered = filtered.filter((p) => (p.salePrice || p.regularPrice) <= maxPrice);

  // Color filter
  if (selectedColor !== 'All') {
    filtered = filtered.filter((p) => p.colors?.includes(selectedColor));
  }

  // Sort logic
  if (sortBy === 'price-low') {
    filtered.sort((a, b) => (a.salePrice || a.regularPrice) - (b.salePrice || b.regularPrice));
  } else if (sortBy === 'price-high') {
    filtered.sort((a, b) => (b.salePrice || b.regularPrice) - (a.salePrice || a.regularPrice));
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const subcategories = Array.from(
    new Set(
      products
        .filter((p) => selectedCategory === 'All' || p.category === selectedCategory)
        .map((p) => p.subcategory)
        .filter(Boolean)
    )
  );

  const colors = Array.from(new Set(products.flatMap((p) => p.colors || [])));

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setMaxPrice(50000);
    setSelectedColor('All');
    setSortBy('featured');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-6">
        <div>
          <h1 className="font-cinzel text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span>ROYAL COUTURE CATALOGUE</span>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Showing <strong className="text-amber-600 dark:text-amber-400">{filtered.length}</strong> items in luxury collection
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl text-xs font-bold"
          >
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-amber-500" />
            <span className="text-gray-500 dark:text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-900 dark:text-white font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured">Royal Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* View Switcher */}
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Sidebar Filters */}
        <aside
          className={`space-y-6 md:block bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm h-fit ${
            mobileFilterOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-3">
            <h3 className="font-cinzel text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Filter Collection
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          </div>

          {/* Search filter input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saree, sherwani..."
                className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-xs"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Main Category
            </label>
            <div className="space-y-1 text-xs">
              {['All', 'Women', 'Men', 'Accessories'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubcategory('All');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat} Collection
                </button>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          {subcategories.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Subcategory
              </label>
              <div className="space-y-1 text-xs max-h-48 overflow-y-auto pr-1">
                <button
                  onClick={() => setSelectedSubcategory('All')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs ${
                    selectedSubcategory === 'All'
                      ? 'text-amber-600 dark:text-amber-400 font-bold'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  All Subcategories
                </button>
                {subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSelectedSubcategory(sub)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      selectedSubcategory === sub
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Slider in Rupees (₹) */}
          <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Max Price
              </label>
              <span className="font-extrabold text-amber-600 dark:text-amber-400">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>₹5,000</span>
              <span>₹50,000</span>
            </div>
          </div>

          {/* Color Filter */}
          {colors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-slate-800">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Color Variant
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedColor('All')}
                  className={`text-[11px] px-2.5 py-1 rounded-full border ${
                    selectedColor === 'All'
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                      : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  All Colors
                </button>
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                      selectedColor === c
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                        : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-gray-400 hover:border-amber-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Product Grid */}
        <main className="md:col-span-3">
          {filtered.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-gray-200 dark:border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white">
                No Royal Pieces Found
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                No items match your active filters. Try adjusting price range or keyword search.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
