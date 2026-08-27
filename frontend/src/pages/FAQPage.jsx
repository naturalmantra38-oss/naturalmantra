import React, { useState, useEffect } from 'react';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import { faqService } from '../services/api';
import { MOCK_FAQS } from '../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [faqs, setFaqs] = useState(MOCK_FAQS);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await faqService.getFaqs();
        if (res?.faqs) setFaqs(res.faqs);
      } catch (err) {
        console.error('Error fetching FAQs:', err);
      }
    };
    fetchFaqs();
  }, []);

  // FAQ Schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions | Natural Mantra"
        description="Find answers about Natural Mantra organic products, stone ground milling, cold pressed oils, shipping thresholds, and order returns."
        schemaData={faqSchema}
      />

      <div className="max-w-4xl mx-auto px-4 pb-20 space-y-10">
        <Breadcrumb items={[{ label: 'FAQs' }]} />

        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">HELP CENTER</span>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif-heading text-brand-700">Frequently Asked Questions</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Have questions regarding our organic certification, traditional processing, or shipping?
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={faq._id || idx}
              className="bg-white rounded-2xl border border-gray-100 shadow-soft overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full p-6 text-left flex items-center justify-between space-x-4 hover:bg-brand-50/50 transition-colors"
              >
                <span className="text-sm md:text-base font-bold text-brand-700">{faq.question}</span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-brand-gold shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100/60 pt-4 font-sans">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQPage;
