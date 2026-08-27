import React from 'react';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { Sprout, Droplet, Award, ShieldCheck, Heart, Users } from 'lucide-react';

const OurStoryPage = () => {
  return (
    <>
      <SEOHead
        title="Our Story & Purity Philosophy | Natural Mantra"
        description="Learn about Natural Mantra's commitment to traditional stone-ground milling, wooden cold-pressed oils, and supporting organic farmer cooperatives."
      />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-16">
        <Breadcrumb items={[{ label: 'Our Story' }]} />

        {/* HERO STORY BANNER */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
            OUR SACRED ROOT
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-heading text-brand-700 leading-tight">
            Connecting You to Nature's Ancient Wisdom
          </h1>
          <p className="text-base text-gray-600 font-serif italic">
            "जिएं प्रकृति के मंत्र के साथ" — Live with the sacred mantra of nature.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed pt-2">
            Natural Mantra was born out of a deep reverence for traditional Indian food wisdom. In an era dominated by hyper-processed foods, high-heat solvent extraction, and synthetic flavor enhancers, we stand committed to unadulterated purity.
          </p>
        </section>

        {/* 4 PILLARS OF PURITY */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft space-y-3">
            <Sprout className="w-8 h-8 text-brand-gold" />
            <h3 className="text-base font-bold font-serif-heading text-brand-700">1. Organic Sourcing</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We partner directly with certified organic farmer cooperatives across Meghalaya, Odisha, Rajasthan, and Himachal Pradesh.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft space-y-3">
            <Droplet className="w-8 h-8 text-brand-gold" />
            <h3 className="text-base font-bold font-serif-heading text-brand-700">2. Wooden Cold Pressing</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our oils are extracted slowly in traditional wooden expellers (Kacchi Ghani) at ambient temperature, keeping natural antioxidants intact.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft space-y-3">
            <Award className="w-8 h-8 text-brand-gold" />
            <h3 className="text-base font-bold font-serif-heading text-brand-700">3. Stone Ground Milling</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our spices are ground slowly using stone mills (sil-batta principle) to retain essential aromatic oils destroyed by fast high-heat pulverizers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand-gold" />
            <h3 className="text-base font-bold font-serif-heading text-brand-700">4. NABL Lab Certified</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Every production batch undergoes strict NABL accredited laboratory testing for pesticide residue, heavy metals, and adulteration.
            </p>
          </div>
        </section>

        {/* FARMER COMMUNITY SECTION */}
        <section className="bg-brand-700 text-white rounded-3xl p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">SUSTAINABLE IMPACT</span>
            <h2 className="text-2xl sm:text-4xl font-serif-heading font-bold">Empowering Smallholder Farmers</h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              By choosing Natural Mantra, you directly support fair wages, soil regeneration, and biodiversity for over 500 organic farming families across India.
            </p>
          </div>
          <div className="aspect-video bg-brand-800 rounded-2xl overflow-hidden border border-brand-600">
            <img
              src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
              alt="Organic Spices Farmers"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default OurStoryPage;
