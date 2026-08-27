import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { cmsService } from '../../services/api';
import {
  Instagram,
  Facebook,
  Youtube,
  Send,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Award,
  Truck,
  RotateCcw
} from 'lucide-react';

const Footer = () => {
  const { settings } = useSettings();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedMessage, setSubscribedMessage] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      await cmsService.subscribeNewsletter(newsletterEmail);
      setSubscribedMessage('Thank you for subscribing to Natural Mantra!');
      setNewsletterEmail('');
      setTimeout(() => setSubscribedMessage(''), 4000);
    }
  };

  return (
    <footer className="bg-brand-800 text-gray-300 pt-16 pb-8 border-t border-brand-700">
      {/* Top Value Proposition Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-12 border-b border-brand-700/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-brand-900/40 border border-brand-700/40">
          <ShieldCheck className="w-8 h-8 text-brand-gold" />
          <h4 className="text-sm font-bold text-white">100% Pure & Organic</h4>
          <p className="text-xs text-gray-400">Zero artificial colors, flavors or preservatives</p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-brand-900/40 border border-brand-700/40">
          <Award className="w-8 h-8 text-brand-gold" />
          <h4 className="text-sm font-bold text-white">Lab Certified Quality</h4>
          <p className="text-xs text-gray-400">NABL tested for guaranteed purity & potency</p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-brand-900/40 border border-brand-700/40">
          <Truck className="w-8 h-8 text-brand-gold" />
          <h4 className="text-sm font-bold text-white">Free Shipping Over ₹500</h4>
          <p className="text-xs text-gray-400">Fast pan-India delivery straight to your doorstep</p>
        </div>
        <div className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-brand-900/40 border border-brand-700/40">
          <RotateCcw className="w-8 h-8 text-brand-gold" />
          <h4 className="text-sm font-bold text-white">Easy Returns & Support</h4>
          <p className="text-xs text-gray-400">Dedicated customer care assistance</p>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <Link to="/" className="inline-block">
            <img src="/assets/natural-mantra-logo.svg" alt="Natural Mantra" className="h-12 w-auto brightness-200" />
          </Link>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            {settings.taglineEn || 'Pure, authentic and natural products for a healthy you and a healthy planet.'}
          </p>
          <p className="text-sm font-semibold text-brand-gold font-serif italic">
            "{settings.taglineHi || 'जिएं प्रकृति के मंत्र के साथ'}"
          </p>

          <div className="pt-2 space-y-2 text-xs text-gray-300">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>{settings.address || '28 Mapple Residency, Peer Muchhala, Zirakpur, Punjab - 140603'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-brand-gold shrink-0" />
              <a href={`mailto:${settings.email}`} className="hover:text-brand-gold">{settings.email || 'Mayank2june@gmail.com'}</a>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-brand-gold shrink-0" />
              <a href={`tel:${settings.phone}`} className="hover:text-brand-gold">{settings.phone || '+91 98765 43210'}</a>
            </div>
            <p className="text-[11px] text-gray-400 font-mono pt-1">GSTIN: {settings.gstin || '03BEVPM2912R1ZV'}</p>
          </div>
        </div>

        {/* Column 1: Shop */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-brand-700 pb-2">
            Shop Categories
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/shop?category=spices-masalas" className="hover:text-brand-gold transition-colors">Spices & Masalas</Link></li>
            <li><Link to="/shop?category=cold-pressed-oils" className="hover:text-brand-gold transition-colors">Cold Pressed Oils</Link></li>
            <li><Link to="/shop?category=herbal-teas" className="hover:text-brand-gold transition-colors">Herbal Teas & Infusions</Link></li>
            <li><Link to="/shop?category=supplements" className="hover:text-brand-gold transition-colors">Supplements & Wellness</Link></li>
            <li><Link to="/shop?category=food-wellness" className="hover:text-brand-gold transition-colors">Food & Groceries</Link></li>
            <li><Link to="/shop?category=personal-care" className="hover:text-brand-gold transition-colors">Personal Care</Link></li>
            <li><Link to="/shop" className="hover:text-brand-gold font-bold text-brand-gold">Browse All Products →</Link></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-brand-700 pb-2">
            Company & Care
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/our-story" className="hover:text-brand-gold transition-colors">Our Story & Purity</Link></li>
            <li><Link to="/blogs" className="hover:text-brand-gold transition-colors">Wellness Blog</Link></li>
            <li><Link to="/track-order" className="hover:text-brand-gold transition-colors">Track Your Order</Link></li>
            <li><Link to="/faqs" className="hover:text-brand-gold transition-colors">FAQs & Support</Link></li>
            <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
            <li><Link to="/legal?tab=shipping" className="hover:text-brand-gold transition-colors">Shipping & Delivery Policy</Link></li>
            <li><Link to="/legal?tab=returns" className="hover:text-brand-gold transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/legal?tab=privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/legal?tab=terms" className="hover:text-brand-gold transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Column 3: Newsletter */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-brand-700 pb-2">
            Stay Connected
          </h4>
          <p className="text-xs text-gray-300 mb-3">
            Subscribe for exclusive organic discounts, wellness tips & new product releases.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-3.5 py-2.5 bg-brand-900/80 border border-brand-700 rounded-lg text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-gold"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-brand-gold hover:bg-brand-goldHover text-brand-800 rounded-md transition-colors flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5 font-bold" />
              </button>
            </div>
            {subscribedMessage && (
              <p className="text-[11px] text-green-400 font-semibold">{subscribedMessage}</p>
            )}
          </form>

          <div className="pt-6">
            <span className="text-xs font-semibold text-gray-400 block mb-2">Follow Natural Mantra:</span>
            <div className="flex space-x-3 text-gray-300">
              <a href={settings.socialLinks?.instagram || '#'} target="_blank" rel="noreferrer" className="p-2 bg-brand-900 hover:text-brand-gold hover:bg-brand-700 rounded-full transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={settings.socialLinks?.facebook || '#'} target="_blank" rel="noreferrer" className="p-2 bg-brand-900 hover:text-brand-gold hover:bg-brand-700 rounded-full transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={settings.socialLinks?.youtube || '#'} target="_blank" rel="noreferrer" className="p-2 bg-brand-900 hover:text-brand-gold hover:bg-brand-700 rounded-full transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-brand-700/60 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Natural Mantra Organic Brand. All Rights Reserved.</p>
        <p className="mt-2 md:mt-0 font-serif italic text-brand-gold">
          Designed with 💚 for a healthier India & sustainable planet.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
