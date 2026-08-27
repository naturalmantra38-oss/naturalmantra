import React, { useState } from 'react';
import { MOCK_HERO_SLIDES } from '../data/mockData';
import { Sliders, Save, CheckCircle2 } from 'lucide-react';

const AdminHomepageCMS = () => {
  const [slides, setSlides] = useState(MOCK_HERO_SLIDES);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold font-serif-heading text-white">Homepage CMS Manager</h2>
        <p className="text-xs text-gray-400">Edit hero banners, taglines, headlines, and call-to-actions live.</p>
      </div>

      {saved && (
        <div className="p-3 bg-green-950 text-green-300 rounded-xl text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>Homepage CMS settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4 text-xs">
            <h3 className="font-bold text-brand-gold uppercase text-sm">Hero Slide #{idx + 1}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-gray-300 block mb-1">Headline Text</label>
                <input
                  type="text"
                  value={slide.headline}
                  onChange={(e) => {
                    const copy = [...slides];
                    copy[idx].headline = e.target.value;
                    setSlides(copy);
                  }}
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Hindi Tagline</label>
                <input
                  type="text"
                  value={slide.taglineHi}
                  onChange={(e) => {
                    const copy = [...slides];
                    copy[idx].taglineHi = e.target.value;
                    setSlides(copy);
                  }}
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="font-bold text-gray-300 block mb-1">Subheading / Description</label>
                <input
                  type="text"
                  value={slide.subheading}
                  onChange={(e) => {
                    const copy = [...slides];
                    copy[idx].subheading = e.target.value;
                    setSlides(copy);
                  }}
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={slide.ctaText}
                  onChange={(e) => {
                    const copy = [...slides];
                    copy[idx].ctaText = e.target.value;
                    setSlides(copy);
                  }}
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Background Image URL</label>
                <input
                  type="text"
                  value={slide.bgImage}
                  onChange={(e) => {
                    const copy = [...slides];
                    copy[idx].bgImage = e.target.value;
                    setSlides(copy);
                  }}
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="px-6 py-3 bg-brand-gold hover:bg-brand-goldHover text-brand-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>SAVE HOMEPAGE CMS CHANGES</span>
        </button>
      </form>
    </div>
  );
};

export default AdminHomepageCMS;
