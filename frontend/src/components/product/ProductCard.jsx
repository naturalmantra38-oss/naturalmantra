import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Eye, CheckCircle } from 'lucide-react';
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
  const discountPercent = product.discountPercentage || (mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0);
  const isFavorited = isInWishlist(product._id);
  const mainImage = product.images?.[0] || product.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';
  const hoverImage = product.images?.[1] || mainImage;
  const isOutOfStock = product.stock === 0;

  return (
    <>
      <div
        className="group relative bg-white rounded-2xl border border-gray-100 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Badges & Wishlist */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {isOutOfStock ? (
              <span className="bg-gray-800 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm pointer-events-auto">
                Out of Stock
              </span>
            ) : discountPercent > 0 ? (
              <span className="bg-red-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm pointer-events-auto">
                {discountPercent}% OFF
              </span>
            ) : product.isBestSeller ? (
              <span className="bg-brand-gold text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm pointer-events-auto">
                Best Seller
              </span>
            ) : null}
          </div>

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
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800'; }}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOutOfStock ? 'grayscale opacity-75' : ''}`}
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
            {/* Category & COD Badge */}
            <div className="flex items-center justify-between gap-1 text-[10px]">
              <span className="font-bold uppercase tracking-wider text-brand-600 truncate">
                {product.category?.name || 'Natural Mantra'}
              </span>
              <span className="shrink-0 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-1.5 py-0.5 rounded">
                COD Available
              </span>
            </div>

            {/* Name */}
            <Link to={`/products/${product.slug}`}>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2 mt-1 min-h-[40px]">
                {product.name}
              </h3>
            </Link>

            {/* Weight/Qty & Rating */}
            <div className="flex items-center justify-between mt-1.5 text-xs">
              <span className="text-gray-500 font-medium">
                {product.weightQty ? `${product.weightQty} ${product.unit || ''}` : 'Standard Pack'}
              </span>

              <div className="flex items-center space-x-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-gray-800">{product.rating || 5.0}</span>
                <span className="text-[11px] text-gray-400">({product.numReviews || 12})</span>
              </div>
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
            </div>

            <button
              onClick={() => !isOutOfStock && addToCart(product)}
              disabled={isOutOfStock}
              className={`p-2.5 rounded-xl transition-colors duration-200 shadow-xs flex items-center space-x-1 ${
                isOutOfStock
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-brand-50 hover:bg-brand-700 text-brand-700 hover:text-white border border-brand-200 hover:border-brand-700'
              }`}
              title={isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
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
