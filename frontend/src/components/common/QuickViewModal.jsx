import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { DEFAULT_CURRENCY } from '../../config';

const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || null
  );
  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );
  const [quantity, setQuantity] = useState(1);

  const price = selectedVariant ? selectedVariant.price : product.price;
  const mrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const isFavorited = isInWishlist(product._id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-modal overflow-hidden border border-brand-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-500 hover:text-brand-700 bg-gray-100 hover:bg-brand-50 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-8 gap-6 md:gap-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-brand-50 rounded-xl overflow-hidden border border-gray-100">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images?.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-brand-600 scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-600 font-semibold">
                {product.category?.name || 'Organic Wellness'}
              </span>
              <h2 className="text-xl md:text-2xl font-bold font-serif-heading text-brand-700 mt-1">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-sm font-bold text-gray-800">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500">({product.numReviews} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mt-4">
                <span className="text-2xl font-bold text-brand-700">
                  {DEFAULT_CURRENCY}{price}
                </span>
                {mrp > price && (
                  <span className="text-base text-gray-400 line-through">
                    {DEFAULT_CURRENCY}{mrp}
                  </span>
                )}
                {mrp > price && (
                  <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-800 rounded">
                    Save {Math.round(((mrp - price) / mrp) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                {product.shortDescription || product.description}
              </p>

              {/* Variants */}
              {product.variants?.length > 0 && (
                <div className="mt-5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Select Pack Size / Weight:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                          selectedVariant?.name === v.name
                            ? 'bg-brand-700 text-white border-brand-700 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-brand-600'
                        }`}
                      >
                        {v.name} — {DEFAULT_CURRENCY}{v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-5 flex items-center space-x-4">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Qty:
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-semibold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-brand-700 hover:bg-brand-800 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-brand-600 pt-1">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Pure Organic • Lab Certified • Easy 7-Day Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
