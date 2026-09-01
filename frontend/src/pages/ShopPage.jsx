import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import { productService, categoryService } from '../services/api';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import { Filter, SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);

  // Active Filter States
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [onlyBestSellers, setOnlyBestSellers] = useState(searchParams.get('filter') === 'best-sellers');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const filterParam = searchParams.get('filter');
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
    if (filterParam === 'best-sellers') setOnlyBestSellers(true);
    else setOnlyBestSellers(false);
  }, [searchParams]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ]);
        if (prodRes?.products) setProducts(prodRes.products);
        if (catRes?.categories) setCategories(catRes.categories);
      } catch (err) {
        console.error('Failed to load shop products:', err);
      }
    };
    loadData();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Best Sellers filter
        if (onlyBestSellers && !p.isBestSeller) return false;

        // Category check
        if (selectedCategory !== 'all') {
          const catSlug = p.category?.slug || p.category;
          if (catSlug !== selectedCategory) return false;
        }

        // Search query check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = (p.description || '').toLowerCase().includes(q);
          const matchCat = (p.category?.name || '').toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCat) return false;
        }

        // Price check
        if (p.price > maxPrice) return false;

        // Rating check
        if (minRating > 0 && (p.rating || 0) < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        if (sortBy === 'newest') return b._id.localeCompare(a._id);
        return 0; // Default featured
      });
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, sortBy, onlyBestSellers]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(3000);
    setMinRating(0);
    setSortBy('featured');
    setOnlyBestSellers(false);
    setSearchParams({});
  };

  return (
    <>
      <SEOHead
        title="Shop Pure Organic Products | Natural Mantra"
        description="Browse authentic stone-ground masalas, kacchi ghani mustard oils, organic herbal teas, and natural wellness supplements."
      />

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Breadcrumb items={[{ label: 'Shop All Products' }]} />

        {/* Page Title & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold font-serif-heading text-brand-700">
              {selectedCategory === 'all'
                ? 'All Organic Products'
                : categories.find((c) => c.slug === selectedCategory)?.name || 'Category Shop'}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Showing {filteredProducts.length} pure & unadulterated items
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-700 flex items-center space-x-2 shadow-xs"
            >
              <Filter className="w-4 h-4 text-brand-700" />
              <span>FILTERS</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium">
              <SlidersHorizontal className="w-4 h-4 text-brand-700 hidden sm:inline" />
              <label className="text-gray-500 font-semibold hidden sm:inline">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-brand-700 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured & Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block space-y-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-soft h-fit">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-700">Filter By</h3>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-brand-gold hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Categories</h4>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-brand-700 text-white font-bold'
                      : 'text-gray-700 hover:bg-brand-50'
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-brand-700 text-white font-bold'
                        : 'text-gray-700 hover:bg-brand-50'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs font-bold text-gray-800">
                <span>Max Price:</span>
                <span className="text-brand-700">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>₹100</span>
                <span>₹3,000</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Minimum Rating</h4>
              <div className="space-y-1 text-xs">
                {[4.5, 4.0, 3.0].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setMinRating(minRating === stars ? 0 : stars)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-colors ${
                      minRating === stars ? 'bg-brand-50 text-brand-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-amber-500 font-bold">★ {stars}+</span>
                    <span>& Above</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCT LISTING CONTAINER */}
          <main className="lg:col-span-3">
            <ProductGrid products={filteredProducts} columns={3} />
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div onClick={() => setMobileFilterOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 overflow-y-auto space-y-6 z-50">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="text-base font-bold text-brand-700">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 text-gray-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category Selection */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-gray-700">Category</h4>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-xl text-xs"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Mobile Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Max Price:</span>
                <span className="text-brand-700">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-brand-700"
              />
            </div>

            <div className="pt-4 border-t border-gray-200 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-bold border border-gray-300 rounded-xl text-gray-700"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 text-xs font-bold bg-brand-700 text-white rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopPage;
