import React, { useState, useEffect, useRef } from 'react';
import { productService, categoryService, uploadService } from '../services/api';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import { Plus, Edit2, Trash2, X, Search, Image as ImageIcon, Upload, Link as LinkIcon, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { DEFAULT_CURRENCY } from '../config';

const AdminProducts = () => {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [showUrlFallback, setShowUrlFallback] = useState(false);
  const fileInputRef = useRef(null);

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
    setUploadError(null);
    setShowUrlFallback(false);
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
      imageUrl: '',
      isFeatured: false,
      isBestSeller: false,
      seoTitle: '',
      seoDescription: ''
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setUploadError(null);
    setShowUrlFallback(false);
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

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image type
    if (!file.type.startsWith('image/')) {
      setUploadError('Invalid file type. Please select an image (JPEG, PNG, WebP, GIF, SVG).');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size too large (max 5MB). Please select a smaller image.');
      return;
    }

    setUploadError(null);
    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const rawDataUrl = event.target.result;

        // Resize & compress via Canvas for quick performance and clean Data URL payload
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          // Upload image via service (returns static URL or Data URL)
          const uploadRes = await uploadService.uploadImage(compressedDataUrl);
          const finalUrl = uploadRes?.url || compressedDataUrl;

          setFormData((prev) => ({ ...prev, imageUrl: finalUrl }));
          setUploading(false);
        };

        img.onerror = () => {
          setFormData((prev) => ({ ...prev, imageUrl: rawDataUrl }));
          setUploading(false);
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Failed processing image upload:', err);
      setUploadError('Failed to process image. Please try again.');
      setUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Fallback default image if no image was uploaded or entered
    const finalImg = formData.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';

    const productPayload = {
      ...formData,
      price: Number(formData.price),
      mrp: Number(formData.mrp),
      stock: Number(formData.stock),
      imageUrl: finalImg,
      images: [finalImg]
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
                  <img src={prod.images?.[0] || prod.image || prod.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-800 border border-gray-700" />
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
              {/* IMAGE UPLOAD SECTION */}
              <div className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-4 space-y-3">
                <label className="font-bold text-gray-200 block text-xs uppercase tracking-wider">
                  Product Image *
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/png, image/jpeg, image/webp, image/gif, image/svg+xml"
                  className="hidden"
                />

                {/* PREVIEW VIEW (If image uploaded or exists) */}
                {formData.imageUrl ? (
                  <div className="flex items-center space-x-4 bg-gray-900/80 p-3 rounded-xl border border-gray-700">
                    <img
                      src={formData.imageUrl}
                      alt="Product Preview"
                      className="w-20 h-20 object-cover rounded-xl border border-gray-700 shadow-md bg-gray-800"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-1.5 text-green-400 font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>Product Image Ready</span>
                      </div>
                      <p className="text-[11px] text-gray-400 truncate max-w-xs">
                        {formData.imageUrl.startsWith('data:') ? 'Uploaded image file' : formData.imageUrl}
                      </p>
                      <div className="flex items-center space-x-2 pt-1">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-[11px] rounded-lg border border-gray-600 flex items-center space-x-1"
                        >
                          <RefreshCw className={`w-3 h-3 ${uploading ? 'animate-spin' : ''}`} />
                          <span>Change Image</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, imageUrl: '' })}
                          className="px-3 py-1 bg-red-950/60 hover:bg-red-900/80 text-red-300 font-semibold text-[11px] rounded-lg border border-red-800/50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* DROPZONE / UPLOAD BUTTON AREA */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-700 hover:border-brand-gold bg-gray-900/50 hover:bg-gray-800/40 rounded-xl p-6 text-center cursor-pointer transition-all duration-200 group"
                  >
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 bg-gray-800 group-hover:bg-brand-gold/20 rounded-full flex items-center justify-center transition-colors">
                        {uploading ? (
                          <RefreshCw className="w-6 h-6 text-brand-gold animate-spin" />
                        ) : (
                          <Upload className="w-6 h-6 text-brand-gold group-hover:scale-110 transition-transform" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white text-xs">
                          {uploading ? 'Processing Image...' : 'Click to Upload Product Image'}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Select JPEG, PNG, WebP, GIF or SVG (max 5MB)
                        </p>
                      </div>
                      <button
                        type="button"
                        className="mt-1 px-4 py-1.5 bg-brand-gold hover:bg-brand-goldHover text-brand-950 font-bold text-[11px] rounded-lg shadow-sm"
                      >
                        Choose File from Computer
                      </button>
                    </div>
                  </div>
                )}

                {/* ERROR BANNER */}
                {uploadError && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-950/40 border border-red-800/60 p-2.5 rounded-xl text-[11px]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* OPTIONAL EXTERNAL IMAGE URL FALLBACK TOGGLE */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowUrlFallback(!showUrlFallback)}
                    className="text-[11px] text-gray-400 hover:text-brand-gold flex items-center space-x-1 underline decoration-dotted"
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>{showUrlFallback ? 'Hide URL link field' : 'Or paste an external image URL link'}</span>
                  </button>

                  {showUrlFallback && (
                    <div className="mt-2 space-y-1">
                      <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        value={formData.imageUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, imageUrl: e.target.value });
                          setUploadError(null);
                        }}
                        className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white text-xs placeholder:text-gray-600"
                      />
                      <p className="text-[10px] text-gray-500">
                        Optional fallback: Direct image link from Unsplash, CDN, or hosted server.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* PRODUCT DETAILS FORM FIELDS */}
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
                  <label className="font-bold text-gray-300 block mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
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
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2 bg-brand-gold hover:bg-brand-goldHover text-brand-950 font-bold rounded-xl disabled:opacity-50 flex items-center space-x-2"
                >
                  {uploading && <RefreshCw className="w-4 h-4 animate-spin" />}
                  <span>Save Product</span>
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
