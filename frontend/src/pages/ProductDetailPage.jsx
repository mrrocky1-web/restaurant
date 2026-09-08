import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ImageZoomGallery } from '../components/ImageZoomModal';
import {
  Heart,
  ShoppingBag,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Plus,
  Minus,
  MessageSquarePlus,
  ThumbsUp,
  Share2
} from 'lucide-react';

export const ProductDetailPage = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    wishlist,
    toggleWishlist,
    setCurrentView,
    updateProduct
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);

  // Variant selection states
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);

  // Find dynamic price/stock override from variant matrix if exists
  const activeVariant = product.variants?.find(
    (v) => v.color === selectedColor && v.size === selectedSize
  );

  const displayPrice = activeVariant?.price || product.salePrice || product.regularPrice;
  const regularPrice = product.regularPrice;
  const stockAvailable = activeVariant?.stock ?? product.stock ?? 10;
  const isOutOfStock = stockAvailable <= 0;

  const discountPercent = regularPrice > displayPrice
    ? Math.round(((regularPrice - displayPrice) / regularPrice) * 100)
    : 0;

  const handleAddToCart = (isBuyNow = false) => {
    if (isOutOfStock) return;
    addToCart(product, selectedColor, selectedSize, quantity, displayPrice);
    if (isBuyNow) {
      setCurrentView('checkout');
    }
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newReview = {
      id: 'rev-' + Date.now(),
      user: reviewName,
      rating: Number(reviewRating),
      date: new Date().toISOString().split('T')[0],
      text: reviewComment,
      helpful: 0
    };

    const updatedReviews = [newReview, ...(product.reviews || [])];
    const newAvgRating = Number(
      (updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1)
    );

    updateProduct(product.id, {
      reviews: updatedReviews,
      rating: newAvgRating,
      reviewCount: updatedReviews.length
    });

    setReviewName('');
    setReviewComment('');
    setShowReviewSuccess(true);
    setTimeout(() => setShowReviewSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Breadcrumb */}
      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
        <button onClick={() => setCurrentView('home')} className="hover:text-amber-500">
          Home
        </button>
        <span>/</span>
        <button onClick={() => setCurrentView('shop')} className="hover:text-amber-500">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400 font-bold truncate max-w-xs">
          {product.name}
        </span>
      </div>

      {/* Main Product Section: Gallery + Options */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: 10+ Image Gallery with Zoom (7 cols) */}
        <div className="lg:col-span-7">
          <ImageZoomGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Details & Variant Selection (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs mb-1">
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {product.subcategory || product.category}
              </span>
              <span className="text-gray-400">| SKU: {product.sku}</span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars Summary */}
            <div className="flex items-center gap-3 mt-2.5">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-gray-300 dark:text-gray-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-gray-400">
                ({product.reviewCount || product.reviews?.length || 0} Royal Patron Reviews)
              </span>
            </div>
          </div>

          {/* Pricing Box in Rupees (₹) */}
          <div className="p-4 bg-amber-50/60 dark:bg-slate-900/80 rounded-2xl border border-amber-200/60 dark:border-amber-900/30 flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-cinzel text-3xl font-extrabold text-amber-700 dark:text-amber-400 font-sans">
                  ₹{displayPrice.toLocaleString('en-IN')}
                </span>
                {regularPrice > displayPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{regularPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                Inclusive of all taxes & Royal Insured Packaging
              </p>
            </div>

            {discountPercent > 0 && (
              <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow">
                SAVE {discountPercent}%
              </span>
            )}
          </div>

          {/* 🎨 Color Variant Options */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  Color Choice:
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedColor === color
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-2 ring-amber-500/30'
                        : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-amber-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 🎨 Size Variant Options */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
                  Select Size:
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">{selectedSize}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-11 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-amber-500 bg-amber-500 text-slate-950 shadow-md'
                        : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-amber-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Indicator */}
          <div className="text-xs font-semibold">
            {isOutOfStock ? (
              <span className="text-rose-500 flex items-center gap-1.5">
                ● Out of Stock currently (Bespoke order available)
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                In Stock ({stockAvailable} pieces remaining for fast dispatch)
              </span>
            )}
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Quantity:
            </span>
            <div className="flex items-center border border-gray-300 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-900">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-500"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-bold text-sm text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-amber-500"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAddToCart(false)}
                disabled={isOutOfStock}
                className="flex-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-xs uppercase tracking-widest transition-all disabled:opacity-50"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isWishlisted
                    ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                    : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-amber-400'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(true)}
              disabled={isOutOfStock}
              className="w-full bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-2xl border border-amber-500/40 text-xs uppercase tracking-widest transition-all disabled:opacity-50"
            >
              Buy Now with Instant Royal Checkout
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 dark:border-slate-800 text-[11px] text-gray-500 dark:text-gray-400">
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 dark:bg-slate-900">
              <Truck className="w-4 h-4 text-amber-500 mb-1" />
              <span>Complimentary Express Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 dark:bg-slate-900">
              <RotateCcw className="w-4 h-4 text-amber-500 mb-1" />
              <span>7-Day Easy Size Returns</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 dark:bg-slate-900">
              <ShieldCheck className="w-4 h-4 text-amber-500 mb-1" />
              <span>Guaranteed Authentic Craft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Specifications Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 dark:border-slate-800 pt-10">
        <div className="space-y-4">
          <h3 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Couture Craft Description
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Specifications Table */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Garment Specifications
          </h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden divide-y divide-gray-100 dark:divide-slate-800">
            {product.specifications?.map((spec, i) => (
              <div key={i} className="flex justify-between p-3 text-xs">
                <span className="font-semibold text-gray-500 dark:text-gray-400">{spec.key}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ⭐ Customer Reviews & Ratings Section */}
      <div className="border-t border-gray-200 dark:border-slate-800 pt-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-cinzel text-2xl font-bold text-gray-900 dark:text-white">
              ⭐ PATRON REVIEWS & RATINGS
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Verified feedback from Fashionvillaroyal buyers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Rating Breakdown Score Card (4 cols) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-4 h-fit">
            <div className="text-center space-y-1">
              <span className="font-cinzel text-5xl font-extrabold text-amber-600 dark:text-amber-400">
                {product.rating}
              </span>
              <div className="flex justify-center text-amber-400 gap-1 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500">Based on {product.reviews?.length || 0} reviews</p>
            </div>

            {/* Rating distribution progress bars */}
            <div className="space-y-2 text-xs pt-2 border-t border-gray-100 dark:border-slate-800">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = product.reviews?.filter((r) => Math.round(r.rating) === stars).length || 0;
                const pct = product.reviews?.length ? (count / product.reviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="w-12 text-gray-500 font-semibold">{stars} Stars</span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-6 text-right font-bold text-gray-400">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List & Write Review Form (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Write a Review Interactive Form */}
            <div className="bg-amber-50/50 dark:bg-slate-900 p-6 rounded-2xl border border-amber-200/60 dark:border-amber-900/30 space-y-4">
              <h4 className="font-cinzel text-base font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-amber-500" />
                <span>WRITE A PATRON REVIEW</span>
              </h4>

              {showReviewSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-600 dark:text-emerald-400 text-xs p-3 rounded-xl font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! Your review has been submitted and published.</span>
                </div>
              )}

              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Radhika Merchant"
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                      Your Score (1 to 5 Stars) *
                    </label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-amber-600"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ 5 - Royal Perfection</option>
                      <option value="4">⭐⭐⭐⭐ 4 - Very Satisfied</option>
                      <option value="3">⭐⭐⭐ 3 - Average</option>
                      <option value="2">⭐⭐ 2 - Subpar</option>
                      <option value="1">⭐ 1 - Disappointed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                    Your Detailed Review Comments *
                  </label>
                  <textarea
                    rows="3"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience regarding fabric quality, embroidery finish, and royal fit..."
                    required
                    className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded-xl uppercase tracking-wider transition-all"
                >
                  Submit Official Review
                </button>
              </form>
            </div>

            {/* List of Reviews */}
            <div className="space-y-4">
              {product.reviews?.map((review) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 font-bold flex items-center justify-center text-xs">
                        {review.user[0]}
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-gray-900 dark:text-white">
                          {review.user}
                        </h5>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          Verified Buyer
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] text-gray-400">{review.date}</span>
                  </div>

                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating ? 'fill-amber-400' : 'text-gray-300 dark:text-gray-700'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
