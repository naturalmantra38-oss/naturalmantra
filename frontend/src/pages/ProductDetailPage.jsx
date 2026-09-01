import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import { productService } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { MOCK_PRODUCTS } from '../data/mockData';
import { DEFAULT_CURRENCY } from '../config';
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Share2
} from 'lucide-react';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('benefits');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', title: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.getProductBySlug(slug);
        if (res?.product) {
          setProduct(res.product);
          setSelectedVariant(res.product.variants?.[0] || null);
          setSelectedImage(res.product.images?.[0] || res.product.image);
        }
      } catch (err) {
        console.error('Error fetching product detail:', err);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  const price = selectedVariant ? selectedVariant.price : product.price;
  const mrp = selectedVariant ? selectedVariant.mrp : product.mrp;
  const isFavorited = isInWishlist(product._id);

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    setIsCartOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.comment.trim()) {
      setReviews((prev) => [
        {
          _id: 'rev_' + Date.now(),
          userName: 'Verified Customer',
          rating: Number(newReview.rating),
          title: newReview.title || 'Great organic product!',
          comment: newReview.comment,
          createdAt: new Date().toISOString()
        },
        ...prev
      ]);
      setNewReview({ rating: 5, comment: '', title: '' });
      setReviewSubmitted(true);
      setTimeout(() => setReviewSubmitted(false), 4000);
    }
  };

  // Product Schema Markup
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'image': selectedImage,
    'description': product.description,
    'sku': product.sku,
    'brand': {
      '@type': 'Brand',
      'name': 'Natural Mantra'
    },
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'INR',
      'price': price,
      'availability': 'https://schema.org/InStock',
      'url': window.location.href
    },
    'aggregateRating': product.rating ? {
      '@type': 'AggregateRating',
      'ratingValue': product.rating,
      'reviewCount': product.numReviews
    } : undefined
  };

  const relatedProducts = MOCK_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <SEOHead
        title={product.seoTitle || `${product.name} | Natural Mantra`}
        description={product.seoDescription || product.shortDescription}
        keywords={product.seoKeywords}
        ogImage={selectedImage}
        schemaData={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-12">
        <Breadcrumb
          items={[
            { label: 'Shop', link: '/shop' },
            { label: product.category?.name || 'Wellness', link: `/shop?category=${product.category?.slug}` },
            { label: product.name }
          ]}
        />

        {/* MAIN PRODUCT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* GALLERY SECTION */}
          <div className="space-y-4">
            <div className="aspect-square bg-brand-50 rounded-3xl overflow-hidden border border-gray-100 shadow-soft relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-md transition-all ${
                  isFavorited ? 'bg-red-50 text-red-600' : 'bg-white/90 text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImage === img ? 'border-brand-600 scale-105 shadow-sm' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS & BUY BOX */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-50 px-3 py-1 rounded-md border border-brand-100">
                {product.category?.name || 'Organic Products'}
              </span>
              <h1 className="text-2xl md:text-4xl font-bold font-serif-heading text-brand-700 mt-2">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3 mt-3">
                <div className="flex items-center text-amber-500 bg-amber-50 px-2.5 py-1 rounded-md">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-1 text-xs font-bold text-gray-800">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Based on <strong>{product.numReviews}</strong> verified reviews
                </span>
                <span className="text-xs font-mono text-gray-400">SKU: {product.sku}</span>
              </div>
            </div>

            {/* PRICE & DISCOUNT */}
            <div className="flex items-baseline justify-between p-4 bg-brand-cream rounded-2xl border border-brand-100">
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-extrabold text-brand-700">
                  {DEFAULT_CURRENCY}{price}
                </span>
                {mrp > price && (
                  <span className="text-lg text-gray-400 line-through">
                    {DEFAULT_CURRENCY}{mrp}
                  </span>
                )}
                {mrp > price && (
                  <span className="text-xs font-extrabold bg-red-700 text-white px-2.5 py-1 rounded-md uppercase">
                    Save {Math.round(((mrp - price) / mrp) * 100)}%
                  </span>
                )}
              </div>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-md">
                COD Available
              </span>
            </div>

            {/* PRODUCT METADATA */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-3.5 rounded-xl border border-gray-200">
              <div><span className="text-gray-500">Brand:</span> <strong className="text-gray-800">Natural Mantra</strong></div>
              <div><span className="text-gray-500">Net Weight / Qty:</span> <strong className="text-gray-800">{product.weightQty ? `${product.weightQty} ${product.unit || ''}` : 'Standard Pack'}</strong></div>
              <div><span className="text-gray-500">Product Code / SKU:</span> <strong className="text-gray-800 font-mono">{product.sku}</strong></div>
              <div>
                <span className="text-gray-500">Availability:</span>{' '}
                <strong className={product.stock > 0 ? 'text-emerald-700' : 'text-red-600'}>
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </strong>
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* VARIANTS SELECTOR */}
            {product.variants?.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                  Select Pack Size / Weight:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedVariant?.name === variant.name
                          ? 'bg-brand-700 text-white border-brand-700 shadow-md'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-brand-600'
                      }`}
                    >
                      {variant.name} — {DEFAULT_CURRENCY}{variant.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY & ACTION BUTTONS */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-4">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="flex items-center border border-gray-300 rounded-xl bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={product.stock === 0}
                    className="px-3.5 py-2 text-gray-600 font-bold hover:bg-gray-200 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-sm font-bold text-gray-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                    disabled={product.stock === 0 || quantity >= product.stock}
                    className="px-3.5 py-2 text-gray-600 font-bold hover:bg-gray-200 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => product.stock > 0 && addToCart(product, selectedVariant, quantity)}
                  disabled={product.stock === 0}
                  className={`py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                    product.stock === 0
                      ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed'
                      : 'bg-brand-50 hover:bg-brand-100 text-brand-700 border-2 border-brand-700'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}</span>
                </button>
                <button
                  onClick={() => product.stock > 0 && handleBuyNow()}
                  disabled={product.stock === 0}
                  className={`py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md ${
                    product.stock === 0
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-brand-700 hover:bg-brand-800 text-white'
                  }`}
                >
                  <span>{product.stock === 0 ? 'OUT OF STOCK' : 'BUY IT NOW'}</span>
                </button>
              </div>
            </div>

            {/* VALUE PROPOSITIONS */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 text-xs text-gray-600">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>100% Stone Ground & Chemical Free</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-brand-gold" />
                <span>Dispatch within 24 Hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-brand-gold" />
                <span>Easy 7-Day Replacement Guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-brand-gold" />
                <span>NABL Lab Tested Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* TABBED INFORMATION SECTION (Benefits, Ingredients, How to Use, FAQs, Reviews) */}
        <section className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-soft space-y-8">
          <div className="flex border-b border-gray-200 overflow-x-auto space-x-8">
            {['benefits', 'ingredients', 'how-to-use', 'faqs', 'reviews'].map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`py-3 text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                  activeTab === tabKey
                    ? 'border-brand-gold text-brand-700'
                    : 'border-transparent text-gray-400 hover:text-gray-700'
                }`}
              >
                {tabKey.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="text-sm text-gray-700 leading-relaxed max-w-4xl">
            {activeTab === 'benefits' && (
              <ul className="space-y-3">
                {product.benefits?.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                )) || <p>{product.description}</p>}
              </ul>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-3">
                <h4 className="font-bold text-brand-700">Purity Statement & Ingredients:</h4>
                <p className="bg-brand-50 p-4 rounded-xl border border-brand-100 font-mono text-xs text-brand-800">
                  {product.ingredients || '100% Pure, unadulterated organic raw ingredients without additives.'}
                </p>
              </div>
            )}

            {activeTab === 'how-to-use' && (
              <div className="space-y-3">
                <h4 className="font-bold text-brand-700">Recommended Usage Instructions:</h4>
                <p>{product.howToUse || 'Incorporate into your daily cooking or wellness routine as desired.'}</p>
              </div>
            )}

            {activeTab === 'faqs' && (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                  <h5 className="font-bold text-brand-700">Q: Does this product contain added preservatives or salt fillers?</h5>
                  <p className="text-xs text-gray-600">A: No. Natural Mantra products are 100% natural, stone-ground without synthetic preservatives or cheap fillers.</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Submit Form */}
                <form onSubmit={handleReviewSubmit} className="bg-brand-50 p-6 rounded-2xl border border-brand-100 space-y-4">
                  <h4 className="font-bold font-serif-heading text-brand-700">Write a Customer Review</h4>
                  {reviewSubmitted && (
                    <div className="p-3 bg-green-100 text-green-800 rounded-lg text-xs font-bold">
                      Thank you! Your review has been submitted for approval.
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <label className="text-xs font-bold text-gray-700">Rating:</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                      className="p-2 bg-white border border-gray-300 rounded-lg text-xs font-bold"
                    >
                      <option value="5">★★★★★ (5/5)</option>
                      <option value="4">★★★★☆ (4/5)</option>
                      <option value="3">★★★☆☆ (3/5)</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Review title (e.g. Authentic traditional flavor!)"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs"
                    required
                  />
                  <textarea
                    placeholder="Write your experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full p-3 bg-white border border-gray-300 rounded-xl text-xs h-24"
                    required
                  />
                  <button type="submit" className="px-6 py-2.5 bg-brand-700 text-white text-xs font-bold rounded-xl">
                    SUBMIT REVIEW
                  </button>
                </form>

                {/* Review Feed */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev._id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span className="font-bold text-gray-800">{rev.userName}</span>
                        <span>{new Date(rev.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex text-amber-500 text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                      <h5 className="font-bold text-sm text-brand-700">{rev.title}</h5>
                      <p className="text-xs text-gray-600">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* RELATED PRODUCTS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold font-serif-heading text-brand-700">
            You Might Also Like
          </h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      </div>
    </>
  );
};

export default ProductDetailPage;
