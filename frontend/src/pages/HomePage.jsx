import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import ProductGrid from '../components/product/ProductGrid';
import { productService, categoryService, cmsService, blogService } from '../services/api';
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_HERO_SLIDES,
  MOCK_BLOGS
} from '../data/mockData';
import {
  ShieldCheck,
  Leaf,
  Award,
  Sparkles,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Users,
  Sprout,
  Droplet
} from 'lucide-react';

const HomePage = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [heroSlides, setHeroSlides] = useState(MOCK_HERO_SLIDES);
  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, heroRes, blogRes] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories(),
          cmsService.getHeroSlides(),
          blogService.getBlogs()
        ]);
        if (prodRes?.products) setProducts(prodRes.products);
        if (catRes?.categories) setCategories(catRes.categories);
        if (heroRes?.slides) setHeroSlides(heroRes.slides);
        if (blogRes?.blogs) setBlogs(blogRes.blogs);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      }
    };
    fetchData();
  }, []);

  // Automatic hero slider transition
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[currentSlideIndex] || MOCK_HERO_SLIDES[0];

  const filteredBestSellers = activeCategoryTab === 'all'
    ? products
    : products.filter(p => p.category?.slug === activeCategoryTab || p.category === activeCategoryTab);

  // JSON-LD Organization Schema for SEO
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Natural Mantra',
    'url': window.location.origin,
    'logo': `${window.location.origin}/assets/natural-mantra-logo.svg`,
    'description': 'Pure, authentic and stone-ground organic products brand in India.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+91-9876543210',
      'contactType': 'customer service',
      'areaServed': 'IN',
      'availableLanguage': ['en', 'hi']
    }
  };

  return (
    <>
      <SEOHead
        title="Natural Mantra — जिएं प्रकृति के मंत्र के साथ | Organic Spices, Oils & Teas"
        description="Shop 100% pure stone-ground spices, wooden cold-pressed oils, organic A2 ghee, and herbal teas from Natural Mantra. Free shipping over ₹500."
        schemaData={orgSchema}
      />

      <div className="space-y-16 md:space-y-24 pb-16">
        {/* HERO CAROUSEL SECTION */}
        <section className="relative w-full h-[540px] md:h-[640px] bg-brand-900 overflow-hidden">
          {/* Slide Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
            style={{ backgroundImage: `url('${currentSlide.bgImage}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 via-brand-900/70 to-transparent" />
          </div>

          {/* Hero Content Overlay */}
          <div className="relative max-w-7xl mx-auto h-full px-4 flex items-center">
            <div className="max-w-2xl text-white space-y-5 animate-fade-in">
              <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{currentSlide.taglineHi || 'जिएं प्रकृति के मंत्र के साथ'}</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-heading leading-tight whitespace-pre-line text-white">
                {currentSlide.headline}
              </h1>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans max-w-lg">
                {currentSlide.subheading}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to={currentSlide.ctaLink || '/shop'}
                  className="px-8 py-3.5 bg-brand-gold hover:bg-brand-goldHover text-brand-900 font-extrabold text-sm rounded-xl transition-all shadow-lg hover:shadow-2xl flex items-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <span>{currentSlide.ctaText || 'SHOP NOW'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/our-story"
                  className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-all border border-white/30 backdrop-blur-xs"
                >
                  OUR PURITY STORY
                </Link>
              </div>
            </div>
          </div>

          {/* Hero Carousel Navigation Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-3">
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
              className="p-3 rounded-full bg-black/40 text-white hover:bg-brand-gold hover:text-brand-900 transition-colors backdrop-blur-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-white font-bold tracking-widest">
              0{currentSlideIndex + 1} / 0{heroSlides.length}
            </span>
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length)}
              className="p-3 rounded-full bg-black/40 text-white hover:bg-brand-gold hover:text-brand-900 transition-colors backdrop-blur-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* HERO TRUST INDICATORS (100% Natural, No Added Preservatives, etc.) */}
        <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-white rounded-2xl shadow-card border border-brand-100 p-6 md:p-8 grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-brand-gold transition-all duration-300">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider">100% Natural</h4>
              <p className="text-[11px] text-gray-500">Pure farm ingredients</p>
            </div>

            <div className="flex flex-col items-center space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-brand-gold transition-all duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider">No Preservatives</h4>
              <p className="text-[11px] text-gray-500">Zero added chemicals</p>
            </div>

            <div className="flex flex-col items-center space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-brand-gold transition-all duration-300">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider">Authentic & Pure</h4>
              <p className="text-[11px] text-gray-500">Stone ground masalas</p>
            </div>

            <div className="flex flex-col items-center space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-brand-gold transition-all duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider">Good For Nature</h4>
              <p className="text-[11px] text-gray-500">Eco friendly packaging</p>
            </div>

            <div className="col-span-2 md:col-span-1 flex flex-col items-center space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center group-hover:bg-brand-700 group-hover:text-brand-gold transition-all duration-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-brand-700 uppercase tracking-wider">Lab Tested</h4>
              <p className="text-[11px] text-gray-500">Certified purity</p>
            </div>
          </div>
        </section>

        {/* SHOP BY CATEGORY GRID */}
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              CURATED SELECTION
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-heading text-brand-700">
              Shop By Organic Category
            </h2>
            <p className="text-sm text-gray-600">
              Explore our wide array of stone-ground masalas, wooden pressed oils, and herbal wellness teas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="group relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="aspect-[4/3] bg-brand-50 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-lg font-bold font-serif-heading text-brand-700 group-hover:text-brand-gold transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {cat.shortDescription}
                    </p>
                  </div>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="inline-flex items-center text-xs font-bold text-brand-700 hover:text-brand-gold uppercase tracking-wider pt-2 border-t border-gray-100"
                  >
                    <span>EXPLORE CATEGORY</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BEST SELLERS SECTION WITH TAB FILTERS */}
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                CUSTOMER FAVORITES
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif-heading text-brand-700 mt-1">
                Natural Mantra Best Sellers
              </h2>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategoryTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategoryTab === 'all'
                    ? 'bg-brand-700 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-600'
                }`}
              >
                All Best Sellers
              </button>
              {categories.slice(0, 3).map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategoryTab(cat.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategoryTab === cat.slug
                      ? 'bg-brand-700 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <ProductGrid products={filteredBestSellers.slice(0, 4)} columns={4} />

          <div className="text-center pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 px-8 py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* BRAND STORY & PURITY COMMITMENT BANNER */}
        <section className="bg-brand-700 text-white py-16 md:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest px-3 py-1 bg-brand-800 rounded-full">
                OUR SACRED PHILOSOPHY
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-heading font-bold leading-tight">
                Authentic Ayurveda & Sustainable Living
              </h2>
              <p className="text-sm md:text-base text-gray-200 leading-relaxed font-sans">
                At Natural Mantra, we believe that true wellness comes from honoring Mother Earth. Our masalas are stone-ground in traditional sil-battas, oils are pressed gently in wooden expellers (Kacchi Ghani), and herbs are shade-dried naturally.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold pt-2">
                <div className="flex items-center space-x-2">
                  <Sprout className="w-5 h-5 text-brand-gold" />
                  <span>Sourced from Farmer Cooperatives</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="w-5 h-5 text-brand-gold" />
                  <span>Zero Solvent Extraction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold" />
                  <span>Heavy Metal & Pesticide Tested</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-brand-gold" />
                  <span>Cruelty Free & Sustainable</span>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  to="/our-story"
                  className="px-6 py-3 bg-brand-gold hover:bg-brand-goldHover text-brand-900 font-extrabold text-xs rounded-xl transition-all shadow-md inline-block uppercase tracking-wider"
                >
                  READ OUR STORY
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800"
                  alt="Organic Spices & Purity"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT & SUSTAINABILITY SECTION */}
        <section className="max-w-7xl mx-auto px-4 text-center space-y-10">
          <div className="max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              OUR REAL IMPACT
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif-heading text-brand-700">
              Good for You. Good for Earth.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft">
              <span className="text-3xl md:text-4xl font-extrabold text-brand-700 font-serif">500+</span>
              <p className="text-xs font-bold text-gray-700 mt-2 uppercase tracking-wider">Organic Farmers Supported</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft">
              <span className="text-3xl md:text-4xl font-extrabold text-brand-700 font-serif">100%</span>
              <p className="text-xs font-bold text-gray-700 mt-2 uppercase tracking-wider">Plastic-Free Glass Jars</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft">
              <span className="text-3xl md:text-4xl font-extrabold text-brand-700 font-serif">50,000+</span>
              <p className="text-xs font-bold text-gray-700 mt-2 uppercase tracking-wider">Happy Indian Households</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-soft">
              <span className="text-3xl md:text-4xl font-extrabold text-brand-700 font-serif">0%</span>
              <p className="text-xs font-bold text-gray-700 mt-2 uppercase tracking-wider">Artificial Preservatives</p>
            </div>
          </div>
        </section>

        {/* BLOG HIGHLIGHTS SECTION */}
        <section className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
                WELLNESS KNOWLEDGE
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif-heading text-brand-700 mt-1">
                From Our Ayurveda Experts
              </h2>
            </div>
            <Link to="/blogs" className="text-xs font-bold text-brand-700 hover:text-brand-gold uppercase tracking-wider">
              VIEW ALL ARTICLES →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-soft flex flex-col md:flex-row">
                <div className="md:w-1/2 aspect-video md:aspect-auto">
                  <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider">{blog.category}</span>
                    <h3 className="text-base font-bold font-serif-heading text-brand-700 mt-1 line-clamp-2">{blog.title}</h3>
                    <p className="text-xs text-gray-600 mt-2 line-clamp-3">{blog.excerpt}</p>
                  </div>
                  <Link to={`/blogs/${blog.slug}`} className="text-xs font-bold text-brand-700 hover:text-brand-gold inline-flex items-center space-x-1 pt-2">
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
