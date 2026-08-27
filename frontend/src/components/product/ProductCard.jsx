import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import QuickViewModal from '../common/QuickViewModal';
import { DEFAULT_CURRENCY } from '../../config';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showQuickView, setShowQuickView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const price = product.price;
  const mrp = product.mrp;
  const discountPercent = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;
  const isFavorited = isInWishlist(product._id);
  const mainImage = product.images?.[0] || product.image;
  const hoverImage = product.images?.[1] || mainImage;

  return (
    <>
      <div
        className="group relative bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Badges & Wishlist */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          {discountPercent > 0 ? (
            <span className="bg-red-700 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm pointer-events-auto">
              {discountPercent}% OFF
            </span>
          ) : product.isBestSeller ? (
            <span className="bg-brand-gold text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm pointer-events-auto">
              Best Seller
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full backdrop-blur-md transition-all pointer-events-auto ${
              isFavorited
                ? 'bg-red-50 text-red-600 shadow-sm scale-110'
                : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
            }`}
            title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Product Image Area */}
        <div className="relative aspect-square bg-brand-50/60 overflow-hidden cursor-pointer">
          <Link to={`/products/${product.slug}`}>
            <img
              src={isHovered ? hoverImage : mainImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </Link>

          {/* Quick View Button on Hover */}
          <button
            onClick={() => setShowQuickView(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 hover:bg-brand-700 text-brand-700 hover:text-white rounded-full text-xs font-bold shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 flex items-center space-x-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>QUICK VIEW</span>
          </button>
        </div>

        {/* Product Content Details */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Category */}
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">
              {product.category?.name || 'Organic Wellness'}
            </span>

            {/* Name */}
            <Link to={`/products/${product.slug}`}>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2 mt-0.5 min-h-[40px]">
                {product.name}
              </h3>
            </Link>

            {/* Star Rating */}
            <div className="flex items-center space-x-1 mt-1.5">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-xs font-bold text-gray-800">{product.rating || 5.0}</span>
              </div>
              <span className="text-[11px] text-gray-400">({product.numReviews || 12})</span>
            </div>
          </div>

          {/* Pricing & Add to Cart CTA */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div>
              <div className="flex items-baseline space-x-1.5">
                <span className="text-base font-extrabold text-brand-700">
                  {DEFAULT_CURRENCY}{price}
                </span>
                {mrp > price && (
                  <span className="text-xs text-gray-400 line-through">
                    {DEFAULT_CURRENCY}{mrp}
                  </span>
                )}
              </div>
              {product.variants?.length > 0 && (
                <span className="text-[10px] text-gray-500 font-medium">
                  {product.variants.length} pack options
                </span>
              )}
            </div>

            <button
              onClick={() => addToCart(product)}
              className="p-2.5 bg-brand-50 hover:bg-brand-700 text-brand-700 hover:text-white rounded-xl transition-colors duration-200 border border-brand-200 hover:border-brand-700 shadow-xs"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
