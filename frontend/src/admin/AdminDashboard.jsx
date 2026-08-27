import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService, orderService, categoryService, blogService } from '../services/api';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import {
  Package,
  ShoppingBag,
  FolderTree,
  DollarSign,
  Clock,
  AlertTriangle,
  FileText,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { DEFAULT_CURRENCY } from '../config';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: MOCK_PRODUCTS.length,
    totalCategories: MOCK_CATEGORIES.length,
    totalOrders: 18,
    pendingOrders: 4,
    totalRevenue: 24650,
    lowStockCount: 2
  });

  const lowStockProducts = MOCK_PRODUCTS.filter((p) => (p.stock || 50) < 50);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold font-serif-heading text-white">Dashboard Overview</h2>
        <p className="text-xs text-gray-400">Real-time metrics for Natural Mantra organic store.</p>
      </div>

      {/* METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Total Revenue</span>
            <DollarSign className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">
            {DEFAULT_CURRENCY}{stats.totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-green-400 font-semibold flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +14.2% from last month
          </span>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold font-serif">Total Orders</span>
            <ShoppingBag className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.totalOrders}</div>
          <span className="text-[11px] text-brand-gold font-semibold">{stats.pendingOrders} Orders Pending Processing</span>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Live Products</span>
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{stats.totalProducts}</div>
          <span className="text-[11px] text-gray-400">{stats.totalCategories} Active Categories</span>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold">Low Stock Warnings</span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">{lowStockProducts.length}</div>
          <span className="text-[11px] text-amber-400 font-semibold">Needs Inventory Replenishment</span>
        </div>
      </div>

      {/* TABLES SECTION: RECENT ORDERS & LOW STOCK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Orders</h3>
            <Link to="/admin/orders" className="text-xs font-bold text-brand-gold hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-gray-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-white">#ORD-984210</span>
                <p className="text-gray-400 text-[11px]">Rahul Sharma • 2 items</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-brand-gold">{DEFAULT_CURRENCY}520</span>
                <span className="block text-[10px] font-bold text-green-400 uppercase">Shipped</span>
              </div>
            </div>

            <div className="p-3 bg-gray-800/60 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-white">#ORD-984209</span>
                <p className="text-gray-400 text-[11px]">Priya Patel • 1 item</p>
              </div>
              <div className="text-right">
                <span className="font-bold text-brand-gold">{DEFAULT_CURRENCY}340</span>
                <span className="block text-[10px] font-bold text-amber-400 uppercase">Processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Inventory Warnings */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl space-y-4">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Low Stock Inventory</h3>
            <Link to="/admin/products" className="text-xs font-bold text-brand-gold hover:underline">
              Manage Products →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {lowStockProducts.map((prod) => (
              <div key={prod._id} className="p-3 bg-gray-800/60 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={prod.images?.[0] || prod.image} alt="" className="w-9 h-9 object-cover rounded-lg" />
                  <div>
                    <span className="font-bold text-white">{prod.name}</span>
                    <p className="text-gray-400 text-[11px]">SKU: {prod.sku}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-amber-950 text-amber-300 font-bold rounded-md">
                  Stock: {prod.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
