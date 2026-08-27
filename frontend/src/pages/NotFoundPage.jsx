import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import { Sprout, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-6">
      <SEOHead title="404 — Page Not Found | Natural Mantra" />
      <div className="w-20 h-20 bg-brand-50 text-brand-700 rounded-full flex items-center justify-center mx-auto">
        <Sprout className="w-10 h-10" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold font-serif-heading text-brand-700">404</h1>
      <h2 className="text-xl font-bold text-gray-800">Oops! Page Not Found</h2>
      <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
        The page you are looking for might have been moved or does not exist. Let's get you back to natural wellness.
      </p>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO HOMEPAGE</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
