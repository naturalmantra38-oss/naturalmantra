import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Health & Info Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'UP',
    brand: 'Natural Mantra',
    tagline: 'जिएं प्रकृति के मंत्र के साथ',
    timestamp: new Date().toISOString()
  });
});

// REST API Routes Mock / Dynamic Fallbacks
app.get('/api/products', (req, res) => {
  res.json({ success: true, count: 6, products: [] });
});

app.get('/api/categories', (req, res) => {
  res.json({ success: true, categories: [] });
});

app.post('/api/orders', (req, res) => {
  const order = {
    _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    ...req.body,
    orderStatus: 'Confirmed',
    createdAt: new Date().toISOString()
  };
  res.status(201).json({ success: true, order });
});

// Serve frontend build if deployed together
app.use(express.static('../frontend/dist'));

app.listen(PORT, () => {
  console.log(`🌿 Natural Mantra API Server running on port ${PORT}`);
});
