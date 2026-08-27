import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import { Save, CheckCircle2 } from 'lucide-react';

const AdminSettings = () => {
  const { settings, updateSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold font-serif-heading text-white">Store & Business Settings</h2>
        <p className="text-xs text-gray-400">Manage store details, GSTIN, Zirakpur address, and shipping thresholds.</p>
      </div>

      {savedMessage && (
        <div className="p-3 bg-green-950 text-green-300 rounded-xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>Business settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-gray-300 block mb-1">Business Name *</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              required
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-gray-300 block mb-1">GSTIN Number *</label>
            <input
              type="text"
              value={formData.gstin}
              onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
              required
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-gray-300 block mb-1">Customer Care Phone *</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="font-bold text-gray-300 block mb-1">Official Support Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-gray-300 block mb-1">Registered Business Address *</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
            />
          </div>

          <div>
            <label className="font-bold text-gray-300 block mb-1">Free Shipping Threshold (₹)</label>
            <input
              type="number"
              value={formData.freeShippingThreshold}
              onChange={(e) => setFormData({ ...formData, freeShippingThreshold: Number(e.target.value) })}
              required
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-gray-300 block mb-1">Flat Shipping Fee (₹)</label>
            <input
              type="number"
              value={formData.flatShippingFee}
              onChange={(e) => setFormData({ ...formData, flatShippingFee: Number(e.target.value) })}
              required
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-gray-300 block mb-1">Top Announcement Bar Text</label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) => setFormData({ ...formData, announcementText: e.target.value })}
              className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <button
            type="submit"
            className="px-6 py-3 bg-brand-gold hover:bg-brand-goldHover text-brand-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE STORE SETTINGS</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
