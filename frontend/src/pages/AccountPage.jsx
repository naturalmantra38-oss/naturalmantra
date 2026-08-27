import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SEOHead from '../components/common/SEOHead';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { User, Package, Heart, LogOut, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { DEFAULT_CURRENCY } from '../config';

const AccountPage = () => {
  const [searchParams] = useSearchParams();
  const { user, login, register, logout } = useAuth();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const [isLoginMode, setIsLoginMode] = useState(true);

  // Auth Form State
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [authError, setAuthError] = useState('');

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      if (isLoginMode) {
        const res = await login(authForm.email, authForm.password);
        if (res?.user?.role === 'ADMIN') {
          navigate('/admin');
        }
      } else {
        await register(authForm.name, authForm.email, authForm.password, authForm.phone);
      }
    } catch (err) {
      setAuthError('Authentication failed. Please check your details.');
    }
  };

  if (!user) {
    return (
      <>
        <SEOHead title="Customer Login & Registration | Natural Mantra" />
        <div className="max-w-md mx-auto px-4 py-16 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold font-serif-heading text-brand-700">
              {isLoginMode ? 'Sign In to Natural Mantra' : 'Create Customer Account'}
            </h1>
            <p className="text-xs text-gray-500">
              {isLoginMode
                ? 'Access your order history, track deliveries, and saved items.'
                : 'Join our community for exclusive organic offers and fast checkout.'}
            </p>
          </div>

          <form onSubmit={handleAuthSubmit} className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-card space-y-4">
            {authError && <p className="text-xs text-red-600 font-bold bg-red-50 p-2.5 rounded-lg">{authError}</p>}

            {!isLoginMode && (
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  required
                  className="w-full p-3 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Email Address *</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                required
                className="w-full p-3 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">Password *</label>
              <input
                type="password"
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                required
                className="w-full p-3 text-xs bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>

            {!isLoginMode && (
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="10-digit mobile"
                  value={authForm.phone}
                  onChange={(e) => setAuthForm({ ...authForm, phone: e.target.value })}
                  className="w-full p-3 text-xs bg-gray-50 border border-gray-300 rounded-xl"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
            >
              {isLoginMode ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-xs font-bold text-brand-gold hover:underline"
              >
                {isLoginMode ? "Don't have an account? Register here" : 'Already have an account? Sign In'}
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead title="My Account | Natural Mantra" />

      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-8">
        <Breadcrumb items={[{ label: 'My Account' }]} />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-200 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif-heading text-brand-700">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 ${
              activeTab === 'profile' ? 'border-brand-gold text-brand-700' : 'border-transparent text-gray-400'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Addresses</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 ${
              activeTab === 'orders' ? 'border-brand-gold text-brand-700' : 'border-transparent text-gray-400'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 text-xs md:text-sm font-bold uppercase tracking-wider border-b-2 flex items-center space-x-2 ${
              activeTab === 'wishlist' ? 'border-brand-gold text-brand-700' : 'border-transparent text-gray-400'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* TAB CONTENTS */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft max-w-xl space-y-4 text-xs">
            <h3 className="text-base font-bold font-serif-heading text-brand-700">Account Details</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-soft text-center py-12 space-y-3">
            <Package className="w-12 h-12 text-brand-400 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No past orders yet</h3>
            <p className="text-xs text-gray-500">Your recent orders and tracking links will appear here.</p>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-serif-heading text-brand-700">Your Saved Favorite Items</h3>
            {wishlist.length === 0 ? (
              <p className="text-xs text-gray-500">No items saved in wishlist yet.</p>
            ) : (
              <ProductGrid products={wishlist} columns={4} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AccountPage;
