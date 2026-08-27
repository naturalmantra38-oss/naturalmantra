import React, { useState } from 'react';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { useSettings } from '../context/SettingsContext';
import { cmsService } from '../services/api';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

const ContactPage = () => {
  const { settings } = useSettings();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await cmsService.submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Contact submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Natural Mantra Organic Brand"
        description="Get in touch with Natural Mantra. Located in Peer Muchhala, Zirakpur Punjab. Email: Mayank2june@gmail.com. GSTIN: 03BEVPM2912R1ZV."
      />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-12">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">WE ARE HERE FOR YOU</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-heading text-brand-700">Get In Touch</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Have questions about our organic products, bulk orders, or shipment status? Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* BUSINESS DETAILS CARD */}
          <div className="bg-brand-700 text-white p-8 rounded-3xl space-y-6 shadow-card">
            <h2 className="text-xl font-bold font-serif-heading border-b border-brand-600 pb-3">
              Headquarters Info
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-white">Registered Address:</span>
                  <span className="text-gray-200 leading-relaxed">{settings.address || '28 Mapple Residency, Peer Muchhala, Zirakpur, Punjab - 140603'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <div>
                  <span className="font-bold block text-white">Email Us:</span>
                  <a href={`mailto:${settings.email}`} className="text-brand-gold hover:underline">{settings.email || 'Mayank2june@gmail.com'}</a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <div>
                  <span className="font-bold block text-white">Customer Phone:</span>
                  <a href={`tel:${settings.phone}`} className="text-brand-gold hover:underline">{settings.phone || '+91 98765 43210'}</a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-brand-gold shrink-0" />
                <div>
                  <span className="font-bold block text-white">Working Hours:</span>
                  <span className="text-gray-200">Mon - Sat: 9:00 AM - 7:00 PM IST</span>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-600 font-mono text-[11px] text-gray-300">
                GSTIN: {settings.gstin || '03BEVPM2912R1ZV'}
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-soft space-y-4">
            <h2 className="text-xl font-bold font-serif-heading text-brand-700 border-b border-gray-100 pb-3">
              Send Message
            </h2>

            {submitted && (
              <div className="p-4 bg-green-100 text-green-800 rounded-xl text-xs font-bold flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Thank you! Your inquiry has been sent. Our team will reach out shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Your Name *</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Product Inquiry / Order Support"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">Message *</label>
                <textarea
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl h-32"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'SENDING...' : 'SEND MESSAGE'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* MAP PREVIEW CONTAINER */}
        <div className="bg-brand-50 rounded-3xl p-6 border border-brand-100 text-center space-y-3">
          <MapPin className="w-8 h-8 text-brand-gold mx-auto" />
          <h3 className="text-base font-bold text-brand-700">Located in Peer Muchhala, Zirakpur, Punjab</h3>
          <p className="text-xs text-gray-500">28 Mapple Residency, Peer Muchhala, Zirakpur - 140603</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
