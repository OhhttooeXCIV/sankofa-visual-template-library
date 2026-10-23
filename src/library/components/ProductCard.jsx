import React, { useState } from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';

/**
 * ProductCard - Reusable e-commerce card with pricing, badges, ratings, and actions.
 * 
 * @param {string} id - Product ID
 * @param {string} name - Product title
 * @param {string} [subtitle] - Terroir, category, or variety
 * @param {number} price - Current price
 * @param {number} [originalPrice] - Strikethrough price for discounts
 * @param {string} [currency='R'] - Currency symbol
 * @param {string} image - Image URL
 * @param {number} [rating=5] - Star rating (1-5)
 * @param {number} [reviewCount=0] - Review count
 * @param {string} [badge] - Tag (e.g. 'New', 'Best Seller', 'Raw & Unfiltered')
 * @param {boolean} [inStock=true] - Availability flag
 * @param {Function} [onAddToCart] - Quick add callback
 * @param {Function} [onViewDetails] - Card click callback
 */
export const ProductCard = ({
  id,
  name,
  subtitle,
  price,
  originalPrice,
  currency = 'R',
  image,
  rating = 5,
  reviewCount = 0,
  badge,
  inStock = true,
  onAddToCart,
  onViewDetails,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-amber-500/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10"
    >
      {/* Media Window */}
      <div
        onClick={() => onViewDetails?.(id)}
        className="relative aspect-square w-full overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge Ribbon */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950 shadow-md">
              {badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isFavorite
              ? 'bg-rose-500 text-white shadow-lg'
              : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Stock Out Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-lg bg-rose-950/80 border border-rose-500/50 text-rose-300 text-xs font-bold uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col p-5">
        {subtitle && (
          <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-400 mb-1">
            {subtitle}
          </p>
        )}

        <h3
          onClick={() => onViewDetails?.(id)}
          className="font-serif text-base sm:text-lg font-medium text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1"
        >
          {name}
        </h3>

        {/* Rating Stars */}
        <div className="flex items-center gap-1.5 mt-2 mb-3">
          <div className="flex items-center text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                className={i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-600'}
              />
            ))}
          </div>
          {reviewCount > 0 && (
            <span className="text-[11px] text-slate-400 font-medium">({reviewCount})</span>
          )}
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-800/60">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white tracking-tight">
              {currency}{price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-slate-500 line-through">
                {currency}{originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart?.(id)}
            disabled={!inStock}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              inStock
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
