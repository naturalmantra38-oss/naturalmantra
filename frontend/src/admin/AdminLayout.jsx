import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  FileText,
  Sliders,
  Settings,
  LogOut,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Users
} from 'lucide-react';

const AdminLayout = () => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-center space-y-4 max-w-md">
          <h2 className="text-xl font-bold text-white">Access Denied</h2>
          <p className="text-xs text-gray-400">You must be logged in as an Administrator to view this dashboard.</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="px-6 py-2.5 bg-brand-gold text-brand-900 font-bold text-xs rounded-xl"
          >
            GO TO ADMIN LOGIN
          </button>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard },
    { label: 'Manage Products', path: '/admin/products', icon: Package },
    { label: 'Manage Categories', path: '/admin/categories', icon: FolderTree },
    { label: 'Manage Orders', path: '/admin/orders', icon: ShoppingBag },
    { label: 'Manage Blogs', path: '/admin/blogs', icon: FileText },
    { label: 'Homepage CMS', path: '/admin/cms', icon: Sliders },
    { label: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col justify-between p-5 shrink-0 hidden md:flex">
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center space-x-3 pb-4 border-b border-gray-800">
            <div className="w-9 h-9 rounded-xl bg-brand-gold text-brand-900 font-bold flex items-center justify-center">
              NM
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Natural Mantra</h2>
              <span className="text-[10px] font-extrabold text-brand-gold uppercase tracking-wider">
                ADMIN CMS PANEL
              </span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 text-xs font-semibold">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-brand-700 text-white font-bold shadow-sm'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 text-brand-gold" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center space-x-2 text-xs text-gray-400 hover:text-brand-gold p-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View Live Customer Store</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full flex items-center space-x-2 text-xs font-bold text-red-400 hover:bg-red-950/40 p-2 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-gray-900 border-b border-gray-800 p-4 px-6 flex items-center justify-between">
          <h1 className="text-base font-bold text-white uppercase tracking-wider">
            {menuItems.find((m) => m.path === location.pathname)?.label || 'Admin Control Center'}
          </h1>

          <div className="flex items-center space-x-4 text-xs">
            <span className="text-gray-400">
              Signed in: <strong className="text-white">{user?.name || 'Admin'}</strong>
            </span>
            <Link to="/" target="_blank" className="px-3 py-1.5 bg-gray-800 text-brand-gold hover:bg-gray-700 rounded-lg font-bold flex items-center space-x-1">
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="p-6 md:p-8 space-y-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
