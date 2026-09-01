import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api';
import { DEFAULT_CURRENCY } from '../config';
import { ShieldCheck, Truck, CheckCircle2, CreditCard, Smartphone, Banknote, ArrowRight } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, subtotal, shippingFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'Punjab',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (cartItems.length === 0 && !completedOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-brand-700">No items in checkout</h1>
        <Link to="/shop" className="px-6 py-2.5 bg-brand-700 text-white rounded-xl font-bold text-xs">
          GO TO SHOP
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderPayload = {
      customer: formData,
      items: cartItems,
      subtotal,
      shippingFee,
      totalAmount: grandTotal,
      paymentMethod
    };

    try {
      const res = await orderService.createOrder(orderPayload);
      if (res?.success && res.order) {
        setCompletedOrder(res.order);
        clearCart();
      }
    } catch (err) {
      console.error('Order creation failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <SEOHead title="Order Confirmed | Natural Mantra" />
        <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold font-serif-heading text-brand-700">
          Order Successfully Placed!
        </h1>
        <p className="text-sm text-gray-600">
          Thank you for choosing Natural Mantra. Your order <strong>#{completedOrder._id}</strong> has been received and is being prepared for dispatch.
        </p>

        <div className="bg-brand-cream p-6 rounded-2xl border border-brand-100 text-left space-y-3 max-w-md mx-auto text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-bold font-mono text-brand-700">{completedOrder._id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Mode:</span>
            <span className="font-bold text-gray-800">{completedOrder.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Amount:</span>
            <span className="font-bold text-brand-700">{DEFAULT_CURRENCY}{completedOrder.totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping To:</span>
            <span className="font-bold text-gray-800">{completedOrder.customer.city}, {completedOrder.customer.state}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center space-x-4">
          <Link
            to={`/track-order?orderId=${completedOrder._id}&contact=${completedOrder.customer.phone}`}
            className="px-6 py-3 bg-brand-gold hover:bg-brand-goldHover text-brand-900 font-bold text-xs rounded-xl shadow-md"
          >
            TRACK YOUR ORDER
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead title="Checkout | Natural Mantra" />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-8">
        <Breadcrumb items={[{ label: 'Cart', link: '/cart' }, { label: 'Checkout' }]} />

        <h1 className="text-2xl md:text-4xl font-bold font-serif-heading text-brand-700">
          Delivery & Payment Checkout
        </h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Address Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-soft space-y-4">
              <h2 className="text-lg font-bold font-serif-heading text-brand-700 border-b border-gray-100 pb-3">
                1. Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="10-digit mobile number"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">Street Address / House No / Landmark *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="House/Flat No, Building Name, Colony"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="City / Town"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="6-digit Pincode"
                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-soft space-y-4">
              <h2 className="text-lg font-bold font-serif-heading text-brand-700 border-b border-gray-100 pb-3">
                2. Select Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-4 rounded-xl border-2 text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'UPI'
                      ? 'border-brand-700 bg-brand-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-brand-300'
                  }`}
                >
                  <Smartphone className="w-6 h-6 text-brand-700 mb-2" />
                  <span className="text-xs font-bold text-gray-800">UPI / QR Code</span>
                  <span className="text-[10px] text-gray-500">Google Pay, PhonePe, Paytm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Razorpay')}
                  className={`p-4 rounded-xl border-2 text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'Razorpay'
                      ? 'border-brand-700 bg-brand-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-brand-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-brand-700 mb-2" />
                  <span className="text-xs font-bold text-gray-800">Cards / NetBanking</span>
                  <span className="text-[10px] text-gray-500">Credit/Debit & Netbanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-4 rounded-xl border-2 text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-brand-700 bg-brand-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-brand-300'
                  }`}
                >
                  <Banknote className="w-6 h-6 text-brand-700 mb-2" />
                  <span className="text-xs font-bold text-gray-800">Cash on Delivery</span>
                  <span className="text-[10px] text-gray-500">Pay cash upon delivery</span>
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary & Submit Button */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft h-fit space-y-6">
            <h2 className="text-lg font-bold font-serif-heading text-brand-700 border-b border-gray-100 pb-3">
              Order Items ({cartItems.length})
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.itemKey} className="flex justify-between text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-800">{item.quantity}x</span>
                    <span className="text-gray-700 line-clamp-1">{item.name} ({item.variant})</span>
                  </div>
                  <span className="font-bold text-brand-700 shrink-0">{DEFAULT_CURRENCY}{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-4 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>{DEFAULT_CURRENCY}{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span>{shippingFee === 0 ? <strong className="text-green-700">FREE</strong> : `${DEFAULT_CURRENCY}${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-brand-700 pt-2 border-t border-gray-200">
                <span>Total Pay</span>
                <span>{DEFAULT_CURRENCY}{grandTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'PLACING ORDER...' : 'PLACE ORDER NOW'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>100% Encrypted & Safe Organic Delivery</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
