import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { DEFAULT_CURRENCY } from '../config';
import { Trash2, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    isFreeShipping,
    shippingFee,
    grandTotal,
    amountNeededForFreeShipping
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-6">
        <SEOHead title="Your Shopping Cart | Natural Mantra" />
        <div className="w-24 h-24 bg-brand-50 rounded-full flex items-center justify-center text-brand-400 mx-auto">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-serif-heading text-brand-700">Your Cart is Currently Empty</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Explore our range of stone-ground masalas, wooden cold-pressed oils, and organic Ayurvedic teas.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
        >
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Your Cart | Natural Mantra Organic Store" />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-8">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <h1 className="text-2xl md:text-4xl font-bold font-serif-heading text-brand-700">
          Shopping Cart ({cartItems.length} items)
        </h1>

        {/* Free Shipping Bar */}
        <div className="bg-brand-50 p-4 rounded-2xl border border-brand-100 flex items-center justify-between">
          {isFreeShipping ? (
            <div className="flex items-center space-x-2 text-xs md:text-sm font-bold text-green-800">
              <Truck className="w-5 h-5 text-green-600" />
              <span>🎉 Congratulations! You qualify for <strong>FREE Shipping</strong> across India!</span>
            </div>
          ) : (
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs md:text-sm text-brand-700">
              <span>Add <strong>{DEFAULT_CURRENCY}{amountNeededForFreeShipping}</strong> more to your order to unlock <strong>FREE Shipping</strong></span>
              <div className="w-full md:w-48 bg-gray-200 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-brand-gold h-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (subtotal / 500) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Item Table */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.itemKey}
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-soft gap-4"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-brand-50 border border-gray-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-brand-700">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Pack: {item.variant}</p>
                    <span className="text-xs font-extrabold text-brand-700 sm:hidden block mt-1">
                      {DEFAULT_CURRENCY}{item.price} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-6 w-full sm:w-auto">
                  <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                    <button
                      onClick={() => updateQuantity(item.itemKey, -1)}
                      className="px-3 py-1 text-xs text-gray-600 font-bold hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.itemKey, 1)}
                      className="px-3 py-1 text-xs text-gray-600 font-bold hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <span className="text-sm font-extrabold text-brand-700">
                    {DEFAULT_CURRENCY}{item.price * item.quantity}
                  </span>

                  <button
                    onClick={() => removeFromCart(item.itemKey)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft h-fit space-y-6">
            <h2 className="text-lg font-bold font-serif-heading text-brand-700 border-b border-gray-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-bold text-gray-800">{DEFAULT_CURRENCY}{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping Fee</span>
                <span className="font-bold text-gray-800">
                  {shippingFee === 0 ? <span className="text-green-700 font-extrabold">FREE</span> : `${DEFAULT_CURRENCY}${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-brand-700 pt-3 border-t border-gray-200">
                <span>Total Amount</span>
                <span>{DEFAULT_CURRENCY}{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-xs text-brand-600 pt-2 border-t border-gray-100">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Safe & Encrypted Checkout • Authentic Organic Assurance</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
