import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../frontend/src/data/mockData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database (non-blocking try-catch)
try {
  connectDB();
} catch (e) {
  console.warn('MongoDB connection skipped or failed, using high-performance memory store:', e.message);
}

// In-memory data store for backend API
let productsStore = [...MOCK_PRODUCTS];
let categoriesStore = [...MOCK_CATEGORIES];
let ordersStore = [];

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Upload Endpoint
app.post('/api/upload', (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }
    res.json({ success: true, url: image });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Health & Info Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    brand: 'Natural Mantra',
    tagline: 'जिएं प्रकृति के मंत्र के साथ',
    timestamp: new Date().toISOString(),
    totalProducts: productsStore.length
  });
});

// GET /api/products - Get all 42 products with optional filtering
app.get('/api/products', (req, res) => {
  try {
    const { category, search, featured, bestSeller } = req.query;
    let filtered = [...productsStore];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => {
        const catSlug = p.category?.slug || p.category;
        return catSlug === category;
      });
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.sku || '').toLowerCase().includes(q)
      );
    }

    if (featured === 'true') {
      filtered = filtered.filter(p => p.isFeatured);
    }

    if (bestSeller === 'true') {
      filtered = filtered.filter(p => p.isBestSeller);
    }

    res.json({
      success: true,
      count: filtered.length,
      products: filtered
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/products/:slug - Get product detail by slug
app.get('/api/products/:slug', (req, res) => {
  try {
    const product = productsStore.find(p => p.slug === req.params.slug || p._id === req.params.slug);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/products - Create product (Admin)
app.post('/api/products', (req, res) => {
  try {
    const newProduct = {
      _id: 'prod_' + Date.now(),
      sku: req.body.sku || 'NM-' + Math.floor(1000 + Math.random() * 9000),
      brand: 'Natural Mantra',
      status: 'Active',
      codAvailable: true,
      rating: 4.8,
      numReviews: 0,
      ...req.body
    };
    productsStore.unshift(newProduct);
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/products/:id - Update product (Admin)
app.put('/api/products/:id', (req, res) => {
  try {
    const index = productsStore.findIndex(p => p._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    productsStore[index] = { ...productsStore[index], ...req.body };
    res.json({ success: true, product: productsStore[index] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE /api/products/:id - Delete product (Admin)
app.delete('/api/products/:id', (req, res) => {
  try {
    productsStore = productsStore.filter(p => p._id !== req.params.id);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/categories - Get categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, categories: categoriesStore });
});

// POST /api/orders - Create Order & Reduce Inventory
app.post('/api/orders', (req, res) => {
  try {
    const { items, customer, paymentMethod, shippingAddress, totalAmount } = req.body;

    // Reduce stock for purchased items
    if (Array.isArray(items)) {
      items.forEach(item => {
        const prod = productsStore.find(p => p._id === item._id || p.sku === item.sku || p.slug === item.slug);
        if (prod) {
          prod.stock = Math.max(0, prod.stock - (item.quantity || 1));
        }
      });
    }

    const order = {
      _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: items || [],
      customer: customer || {},
      shippingAddress: shippingAddress || {},
      totalAmount: totalAmount || 0,
      paymentMethod: paymentMethod || 'COD',
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    ordersStore.unshift(order);
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders - Admin Get Orders
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders: ordersStore });
});

// Serve frontend build if deployed together
app.use(express.static('../frontend/dist'));

app.listen(PORT, () => {
  console.log(`🌿 Natural Mantra API Server running on port ${PORT} with ${productsStore.length} products loaded`);
});

export default app;

