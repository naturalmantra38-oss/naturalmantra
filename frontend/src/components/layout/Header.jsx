import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  Truck,
  Phone,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const Header = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, isAdmin, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearchModal(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop All', path: '/shop' },
    { label: 'Best Sellers', path: '/shop?filter=best-sellers' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'Blogs', path: '/blogs' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="w-full z-40 sticky top-0 font-sans shadow-soft transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-brand-700 text-white text-xs py-2 px-4 border-b border-brand-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
          <div className="flex items-center space-x-2 text-brand-gold font-medium">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-gold animate-ping" />
            <span className="text-white font-normal">
              {settings.announcementText || '✨ Free Shipping on orders above ₹500 across India!'}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-gray-200">
            <Link to="/contact" className="hover:text-brand-gold transition-colors flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>Store Locator</span>
            </Link>
            <Link to="/track-order" className="hover:text-brand-gold transition-colors flex items-center space-x-1">
              <Truck className="w-3.5 h-3.5 text-brand-gold" />
              <span>Track Order</span>
            </Link>
            <a href={`tel:${settings.phone}`} className="hover:text-brand-gold transition-colors flex items-center space-x-1">
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>{settings.phone || '+91 98765 43210'}</span>
            </a>
            <span className="font-semibold text-brand-gold">🇮🇳 India (INR)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div
        className={`bg-brand-cream border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? 'py-2.5 shadow-md bg-white/95 backdrop-blur-md' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-brand-700 hover:bg-brand-50 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/assets/natural-mantra-logo.svg"
              alt="Natural Mantra Logo"
              className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold tracking-wide transition-colors relative py-1 ${
                  location.pathname === link.path
                    ? 'text-brand-700 font-bold border-b-2 border-brand-gold'
                    : 'text-gray-700 hover:text-brand-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-2 text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-full transition-colors"
              title="Search Products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/account?tab=wishlist"
              className="hidden sm:flex relative p-2 text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-full transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            <div className="relative group">
              <Link
                to={user ? (isAdmin ? '/admin' : '/account') : '/account'}
                className="p-2 text-gray-700 hover:text-brand-700 hover:bg-brand-50 rounded-full transition-colors flex items-center space-x-1"
                title={user ? user.name : 'Account Login'}
              >
                <User className="w-5 h-5" />
              </Link>
              {user && (
                <div className="absolute right-0 top-full hidden group-hover:block w-48 bg-white border border-gray-100 shadow-xl rounded-xl py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm font-bold text-brand-700 truncate">{user.name}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 text-[10px] font-extrabold bg-brand-gold text-white px-2 py-0.5 rounded">
                        ADMIN
                      </span>
                    )}
                  </div>
                  {isAdmin ? (
                    <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 font-medium">
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 font-medium">
                      My Orders & Profile
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Cart Drawer Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-brand-700 hover:bg-brand-800 text-white rounded-xl transition-all shadow-sm flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Cart</span>
              <span className="bg-brand-gold text-white text-xs font-extrabold px-2 py-0.5 rounded-full">
                {totalItemsCount}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Nav Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-brand-cream shadow-2xl flex flex-col justify-between p-6 z-50">
            <div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <img src="/assets/natural-mantra-logo.svg" alt="Natural Mantra" className="h-9 w-auto" />
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-base font-bold text-brand-700 hover:text-brand-gold py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-3">
              <Link
                to="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
              >
                <Truck className="w-4 h-4 text-brand-gold" />
                <span>Track Order</span>
              </Link>
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
              >
                <Phone className="w-4 h-4 text-brand-gold" />
                <span>{settings.phone}</span>
              </a>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 bg-red-100 text-red-700 text-sm font-bold rounded-lg"
                >
                  Logout ({user.name})
                </button>
              ) : (
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2.5 bg-brand-700 text-white text-sm font-bold rounded-xl"
                >
                  SIGN IN / REGISTER
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal Overlay */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl shadow-2xl relative">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-serif-heading font-bold text-brand-700 mb-3">
              Search Natural Mantra Products
            </h3>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Chhole Masala, Mustard Oil, Tulsi Tea..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 text-sm"
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 bg-brand-700 text-white rounded-xl font-bold text-sm hover:bg-brand-800 transition-colors"
              >
                SEARCH
              </button>
            </form>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-brand-700">Popular:</span>
              <button onClick={() => { setSearchQuery('Masala'); }} className="px-2.5 py-1 bg-brand-50 rounded-full hover:bg-brand-100">Chhole Masala</button>
              <button onClick={() => { setSearchQuery('Mustard Oil'); }} className="px-2.5 py-1 bg-brand-50 rounded-full hover:bg-brand-100">Mustard Oil</button>
              <button onClick={() => { setSearchQuery('Turmeric'); }} className="px-2.5 py-1 bg-brand-50 rounded-full hover:bg-brand-100">Turmeric</button>
              <button onClick={() => { setSearchQuery('Honey'); }} className="px-2.5 py-1 bg-brand-50 rounded-full hover:bg-brand-100">Wild Honey</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
