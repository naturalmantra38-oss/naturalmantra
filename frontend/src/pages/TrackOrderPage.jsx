import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { orderService } from '../services/api';
import { Search, PackageCheck, Truck, Clock, CheckCircle2, MapPin } from 'lucide-react';
import { DEFAULT_CURRENCY } from '../config';

const TrackOrderPage = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('orderId') || '');
  const [contact, setContact] = useState(searchParams.get('contact') || '');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await orderService.trackOrder(orderId, contact);
      if (res?.order) {
        setTrackedOrder(res.order);
      } else {
        setError('Order not found. Please double-check your Order ID.');
      }
    } catch (err) {
      setError('Unable to track order at this moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('orderId')) {
      handleTrack();
    }
  }, []);

  const steps = ['Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStepIndex = trackedOrder
    ? steps.indexOf(trackedOrder.orderStatus) > -1
      ? steps.indexOf(trackedOrder.orderStatus)
      : 2
    : 0;

  return (
    <>
      <SEOHead title="Track Your Order | Natural Mantra" />

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
        <Breadcrumb items={[{ label: 'Track Order' }]} />

        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-3xl font-bold font-serif-heading text-brand-700">Track Order Status</h1>
          <p className="text-xs text-gray-500">
            Enter your Order ID and registered mobile number/email to check real-time shipment status.
          </p>
        </div>

        {/* TRACK FORM */}
        <form onSubmit={handleTrack} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft max-w-xl mx-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Order ID *</label>
              <input
                type="text"
                placeholder="e.g. ORD-984210"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Mobile / Email</label>
              <input
                type="text"
                placeholder="e.g. 9876543210"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>{loading ? 'TRACKING...' : 'TRACK SHIPMENT'}</span>
          </button>
          {error && <p className="text-xs text-red-600 text-center font-semibold">{error}</p>}
        </form>

        {/* ORDER TIMELINE RESULT */}
        {trackedOrder && (
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-card space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
              <div>
                <span className="text-xs text-gray-400 font-mono">ORDER ID: #{trackedOrder._id}</span>
                <h3 className="text-lg font-bold text-brand-700 mt-0.5">
                  Current Status: <span className="text-brand-gold uppercase">{trackedOrder.orderStatus}</span>
                </h3>
              </div>
              {trackedOrder.trackingNumber && (
                <div className="bg-brand-50 p-3 rounded-xl border border-brand-100 text-xs">
                  <span className="text-gray-500 block">AWB Tracking Number:</span>
                  <span className="font-mono font-bold text-brand-700">{trackedOrder.trackingNumber}</span>
                </div>
              )}
            </div>

            {/* Step Timeline */}
            <div className="relative py-4">
              <div className="flex items-center justify-between relative z-10">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  return (
                    <div key={step} className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          isCompleted
                            ? 'bg-brand-700 text-white ring-4 ring-brand-100'
                            : 'bg-gray-100 text-gray-400 border border-gray-300'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span className={`text-[11px] font-bold ${isCompleted ? 'text-brand-700' : 'text-gray-400'}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Summary */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase">Package Contents</h4>
              {trackedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs text-gray-600 py-1">
                  <span>{item.quantity}x {item.name} ({item.variant})</span>
                  <span className="font-bold text-brand-700">{DEFAULT_CURRENCY}{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TrackOrderPage;
