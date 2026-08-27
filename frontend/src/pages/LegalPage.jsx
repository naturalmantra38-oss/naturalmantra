import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';

const LegalPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'privacy');

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) setActiveTab(tabParam);
  }, [searchParams]);

  const titles = {
    privacy: 'Privacy Policy',
    terms: 'Terms & Conditions',
    shipping: 'Shipping & Delivery Policy',
    returns: 'Returns & Refund Policy',
    cancellation: 'Cancellation Policy'
  };

  return (
    <>
      <SEOHead title={`${titles[activeTab] || 'Legal Policies'} | Natural Mantra`} />

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
        <Breadcrumb items={[{ label: titles[activeTab] || 'Legal Policies' }]} />

        <h1 className="text-3xl font-bold font-serif-heading text-brand-700">
          {titles[activeTab] || 'Legal Policies'}
        </h1>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
          {Object.keys(titles).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === key
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-600'
              }`}
            >
              {titles[key]}
            </button>
          ))}
        </div>

        {/* Legal Text Content */}
        <div className="bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-soft space-y-4 text-xs md:text-sm text-gray-700 leading-relaxed font-sans">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-brand-700">1. Information We Collect</h3>
              <p>Natural Mantra respects your privacy. When you place an order or create an account, we collect your name, shipping address, email, phone number, and order history strictly to fulfill your orders and provide customer support.</p>
              <h3 className="text-base font-bold text-brand-700">2. Security & Data Protection</h3>
              <p>We do not store your payment credentials on our servers. All online transactions are processed through encrypted payment gateways.</p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-brand-700">1. Usage Agreement</h3>
              <p>By accessing or purchasing from Natural Mantra, you agree to comply with our store policies. All products are intended for personal use and organic wellness.</p>
              <h3 className="text-base font-bold text-brand-700">2. Intellectual Property</h3>
              <p>All brand graphics, Natural Mantra logo, text, and product photography are proprietary intellectual property.</p>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-brand-700">1. Pan-India Delivery</h3>
              <p>We ship to all serviceable pincodes across India. Orders above ₹500 qualify for FREE Shipping. Orders below ₹500 incur a flat shipping charge of ₹60.</p>
              <h3 className="text-base font-bold text-brand-700">2. Dispatch Timeline</h3>
              <p>Orders are dispatched within 24 business hours from our Zirakpur warehouse and typically arrive within 2 to 5 business days.</p>
            </div>
          )}

          {activeTab === 'returns' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-brand-700">1. 7-Day Replacement Policy</h3>
              <p>If you receive a damaged, leaked, or incorrect item, please notify us within 7 days of delivery at Mayank2june@gmail.com with photos for an immediate free replacement or full refund.</p>
            </div>
          )}

          {activeTab === 'cancellation' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-brand-700">1. Order Cancellation</h3>
              <p>You may cancel an order before it is dispatched from our facility by contacting customer care at +91 98765 43210.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LegalPage;
