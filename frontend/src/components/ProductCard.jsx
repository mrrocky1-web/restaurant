import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart, navigateToProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = wishlist.includes(product.id);

  const regularPrice = product.regularPrice;
  const salePrice = product.salePrice;
  const discountPercent = salePrice
    ? Math.round(((regularPrice - salePrice) / regularPrice) * 100)
    : 0;

  const mainImage = product.images[product.mainImageIndex || 0] || product.images[0];
  const secondaryImage = product.images[1] || mainImage;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultColor = product.colors?.[0] || 'Standard';
    const defaultSize = product.sizes?.[0] || 'Standard';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => navigateToProduct(product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-slate-800">
        <img
          src={isHovered ? secondaryImage : mainImage}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="bg-gradient-to-r from-amber-600 to-amber-700 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-md">
              -{discountPercent}% OFF
            </span>
          )}
          {product.featured && (
            <span className="bg-slate-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-400/40 uppercase tracking-widest">
              👑 Royal Choice
            </span>
          )}
          {!product.published && (
            <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Draft
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-gray-700 dark:text-gray-200 hover:scale-110 transition-transform shadow-md z-10"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'text-rose-500 fill-rose-500' : 'hover:text-rose-500'
            }`}
          />
        </button>

        {/* Gallery Image Count Badge (10+ images indicator) */}
        <div className="absolute bottom-3 right-3 bg-slate-950/70 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-amber-400/30">
          <Eye className="w-3 h-3 text-amber-400" />
          <span>{product.images?.length || 1} Photos</span>
        </div>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-slate-950/90 dark:bg-amber-500 hover:bg-slate-900 dark:hover:bg-amber-600 text-amber-400 dark:text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs transition-all uppercase tracking-wider backdrop-blur-md"
          >
            <ShoppingBag className="w-4 h-4" />
            Quick Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase text-[10px]">
              {product.subcategory || product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-gray-400 dark:text-gray-500 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm line-clamp-2 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {product.name}
          </h3>
        </div>

        <div>
          {/* Color swatches preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-[11px] text-gray-400 dark:text-gray-500">Colors:</span>
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 3).map((color, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700 font-medium"
                  >
                    {color}
                  </span>
                ))}
                {product.colors.length > 3 && (
                  <span className="text-[10px] text-gray-400 font-semibold">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Price Section in Rupees (₹) */}
          <div className="flex items-baseline justify-between pt-1 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-amber-700 dark:text-amber-400 font-sans">
                ₹{(salePrice || regularPrice).toLocaleString('en-IN')}
              </span>
              {salePrice && salePrice < regularPrice && (
                <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                  ₹{regularPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <button
              onClick={handleQuickAdd}
              className="sm:hidden p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold text-xs"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
