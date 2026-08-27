import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { DEFAULT_CURRENCY } from '../../config';

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    isFreeShipping,
    shippingFee,
    grandTotal,
    amountNeededForFreeShipping
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-brand-cream">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-700" />
              <h2 className="text-lg font-bold font-serif-heading text-brand-700">Your Shopping Cart</h2>
              <span className="bg-brand-700 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-500 hover:text-brand-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-brand-50 p-4 border-b border-brand-100">
            {isFreeShipping ? (
              <div className="flex items-center space-x-2 text-xs font-semibold text-green-800">
                <Truck className="w-4 h-4 text-green-600" />
                <span>🎉 Congratulations! You have unlocked <strong>FREE Shipping!</strong></span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between text-xs text-brand-700 font-medium mb-1">
                  <span>Add <strong>{DEFAULT_CURRENCY}{amountNeededForFreeShipping}</strong> more for <strong>FREE Shipping</strong></span>
                  <span>{Math.round((subtotal / 500) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-gold h-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center text-brand-400 mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Your cart is empty</h3>
                <p className="text-sm text-gray-500 max-w-xs mt-1">
                  Explore our pure stone-ground spices, wooden cold-pressed oils, and herbal wellness teas.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.itemKey}
                  className="flex space-x-4 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-brand-200 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 object-cover rounded-lg bg-white border border-gray-200"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-brand-700 line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.itemKey)}
                          className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Pack: {item.variant}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-md bg-white">
                        <button
                          onClick={() => updateQuantity(item.itemKey, -1)}
                          className="px-2 py-0.5 text-xs text-gray-600 font-bold hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.itemKey, 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 font-bold hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-brand-700">
                        {DEFAULT_CURRENCY}{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTAs */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-100 bg-brand-cream space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">{DEFAULT_CURRENCY}{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-800">
                    {shippingFee === 0 ? <span className="text-green-700 font-bold">FREE</span> : `${DEFAULT_CURRENCY}${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-700 pt-2 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span>{DEFAULT_CURRENCY}{grandTotal}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="py-3 px-4 text-center border border-brand-700 text-brand-700 hover:bg-brand-50 font-bold text-xs rounded-xl transition-all"
                >
                  VIEW CART
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="py-3 px-4 text-center bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-1"
                >
                  <span>CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
