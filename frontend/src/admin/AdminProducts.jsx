import React, { useState, useEffect } from 'react';
import { productService, categoryService } from '../services/api';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import { Plus, Edit2, Trash2, X, Search, Image as ImageIcon } from 'lucide-react';
import { DEFAULT_CURRENCY } from '../config';

const AdminProducts = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    sku: '',
    category: '',
    price: '',
    mrp: '',
    stock: 50,
    shortDescription: '',
    description: '',
    ingredients: '',
    howToUse: '',
    imageUrl: '',
    isFeatured: false,
    isBestSeller: false,
    seoTitle: '',
    seoDescription: ''
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          productService.getProducts(),
          categoryService.getCategories()
        ]);
        if (pRes?.products) setProducts(pRes.products);
        if (cRes?.categories) setCategories(cRes.categories);
      } catch (err) {
        console.error('Failed loading admin products:', err);
      }
    };
    load();
  }, []);

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      sku: 'NM-SP-' + Math.floor(100 + Math.random() * 900),
      category: categories[0]?._id || '',
      price: '',
      mrp: '',
      stock: 50,
      shortDescription: '',
      description: '',
      ingredients: '',
      howToUse: '',
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      isFeatured: false,
      isBestSeller: false,
      seoTitle: '',
      seoDescription: ''
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      category: product.category?._id || product.category || '',
      price: product.price,
      mrp: product.mrp,
      stock: product.stock || 50,
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      ingredients: product.ingredients || '',
      howToUse: product.howToUse || '',
      imageUrl: product.images?.[0] || product.image || '',
      isFeatured: product.isFeatured || false,
      isBestSeller: product.isBestSeller || false,
      seoTitle: product.seoTitle || '',
      seoDescription: product.seoDescription || ''
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const productPayload = {
      ...formData,
      price: Number(formData.price),
      mrp: Number(formData.mrp),
      stock: Number(formData.stock),
      images: [formData.imageUrl]
    };

    if (editingProduct) {
      await productService.updateProduct(editingProduct._id, productPayload);
      setProducts(products.map((p) => (p._id === editingProduct._id ? { ...p, ...productPayload } : p)));
    } else {
      const slugGenerated = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newProd = {
        _id: 'prod_' + Date.now(),
        ...productPayload,
        slug: slugGenerated,
        rating: 5.0,
        numReviews: 1
      };
      await productService.createProduct(newProd);
      setProducts([newProd, ...products]);
    }
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await productService.deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif-heading text-white">Product Catalog Management</h2>
          <p className="text-xs text-gray-400">Add, edit, or remove organic products and set pricing & stock.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-brand-gold hover:bg-brand-goldHover text-brand-950 font-bold text-xs rounded-xl flex items-center space-x-1.5 shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PRODUCT</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="max-w-md relative">
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
        <input
          type="text"
          placeholder="Search product by name or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs text-white"
        />
      </div>

      {/* PRODUCTS TABLE */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-soft">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-800/80 text-gray-300 uppercase tracking-wider text-[10px]">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Price</th>
              <th className="p-4">MRP</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Flags</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-gray-200">
            {filtered.map((prod) => (
              <tr key={prod._id} className="hover:bg-gray-800/40">
                <td className="p-4 flex items-center space-x-3">
                  <img src={prod.images?.[0] || prod.image} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-800" />
                  <span className="font-bold text-white max-w-xs truncate">{prod.name}</span>
                </td>
                <td className="p-4 font-mono text-gray-400">{prod.sku}</td>
                <td className="p-4 font-bold text-brand-gold">{DEFAULT_CURRENCY}{prod.price}</td>
                <td className="p-4 text-gray-400 line-through">{DEFAULT_CURRENCY}{prod.mrp}</td>
                <td className="p-4">
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    prod.stock < 30 ? 'bg-amber-950 text-amber-300' : 'bg-green-950 text-green-300'
                  }`}>
                    {prod.stock || 50} in stock
                  </span>
                </td>
                <td className="p-4 space-x-1">
                  {prod.isBestSeller && <span className="bg-brand-gold text-brand-950 font-bold px-2 py-0.5 rounded text-[9px]">BEST SELLER</span>}
                  {prod.isFeatured && <span className="bg-blue-950 text-blue-300 font-bold px-2 py-0.5 rounded text-[9px]">FEATURED</span>}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(prod)}
                    className="p-1.5 text-gray-400 hover:text-brand-gold bg-gray-800 rounded-lg"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="p-1.5 text-gray-400 hover:text-red-400 bg-gray-800 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-2xl text-xs space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-300 block mb-1">SKU *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    required
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-300 block mb-1">MRP (₹) *</label>
                  <input
                    type="number"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    required
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-300 block mb-1">Image URL *</label>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Short Description</label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="font-bold text-gray-300 block mb-1">Full Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white h-24"
                />
              </div>

              <div className="flex space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="accent-brand-gold"
                  />
                  <span className="text-gray-300 font-bold">Best Seller Flag</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-brand-gold"
                  />
                  <span className="text-gray-300 font-bold">Featured Product Flag</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-gold text-brand-950 font-bold rounded-xl"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
