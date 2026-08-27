import axios from 'axios';
import { API_BASE_URL } from '../config';
import {
  MOCK_PRODUCTS,
  MOCK_CATEGORIES,
  MOCK_BLOGS,
  MOCK_FAQS,
  MOCK_SITE_SETTINGS,
  MOCK_HERO_SLIDES
} from '../data/mockData';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Fallback helper wrapper
const withFallback = async (requestFn, mockFallbackData) => {
  try {
    const response = await requestFn();
    return response.data;
  } catch (error) {
    console.warn('API call failed or offline, returning mock fallback data:', error?.message);
    return mockFallbackData;
  }
};

export const productService = {
  getProducts: (params = {}) =>
    withFallback(
      () => api.get('/products', { params }),
      { success: true, count: MOCK_PRODUCTS.length, products: MOCK_PRODUCTS }
    ),
  getProductBySlug: (slug) =>
    withFallback(
      () => api.get(`/products/${slug}`),
      {
        success: true,
        product: MOCK_PRODUCTS.find(p => p.slug === slug) || MOCK_PRODUCTS[0]
      }
    ),
  createProduct: (data) =>
    withFallback(
      () => api.post('/products', data),
      { success: true, product: { ...data, _id: 'prod_' + Date.now() } }
    ),
  updateProduct: (id, data) =>
    withFallback(
      () => api.put(`/products/${id}`, data),
      { success: true, product: { ...data, _id: id } }
    ),
  deleteProduct: (id) =>
    withFallback(
      () => api.delete(`/products/${id}`),
      { success: true, id }
    )
};

export const categoryService = {
  getCategories: () =>
    withFallback(
      () => api.get('/categories'),
      { success: true, categories: MOCK_CATEGORIES }
    ),
  createCategory: (data) =>
    withFallback(
      () => api.post('/categories', data),
      { success: true, category: { ...data, _id: 'cat_' + Date.now() } }
    ),
  updateCategory: (id, data) =>
    withFallback(
      () => api.put(`/categories/${id}`, data),
      { success: true, category: { ...data, _id: id } }
    ),
  deleteCategory: (id) =>
    withFallback(
      () => api.delete(`/categories/${id}`),
      { success: true, id }
    )
};

export const orderService = {
  createOrder: (orderData) =>
    withFallback(
      () => api.post('/orders', orderData),
      {
        success: true,
        order: {
          ...orderData,
          _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
          createdAt: new Date().toISOString(),
          orderStatus: 'Confirmed',
          paymentStatus: orderData.paymentMethod === 'COD' ? 'Pending' : 'Paid'
        }
      }
    ),
  getOrders: () =>
    withFallback(
      () => api.get('/orders'),
      { success: true, orders: [] }
    ),
  trackOrder: (orderId, contact) =>
    withFallback(
      () => api.get(`/orders/track?orderId=${orderId}&contact=${contact}`),
      {
        success: true,
        order: {
          _id: orderId || 'ORD-984210',
          customer: { name: 'Customer', mobile: contact || '9876543210' },
          totalAmount: 520,
          orderStatus: 'Shipped',
          trackingNumber: 'DEL-NM-9823412',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          items: [
            { name: 'Organic Chhole Masala (Stone Ground)', quantity: 2, variant: '100g', price: 180 },
            { name: 'Organic Turmeric Powder', quantity: 1, variant: '250g', price: 160 }
          ]
        }
      }
    )
};

export const blogService = {
  getBlogs: () =>
    withFallback(
      () => api.get('/blogs'),
      { success: true, blogs: MOCK_BLOGS }
    ),
  getBlogBySlug: (slug) =>
    withFallback(
      () => api.get(`/blogs/${slug}`),
      { success: true, blog: MOCK_BLOGS.find(b => b.slug === slug) || MOCK_BLOGS[0] }
    )
};

export const faqService = {
  getFaqs: () =>
    withFallback(
      () => api.get('/faqs'),
      { success: true, faqs: MOCK_FAQS }
    )
};

export const cmsService = {
  getSettings: () =>
    withFallback(
      () => api.get('/settings'),
      { success: true, settings: MOCK_SITE_SETTINGS }
    ),
  getHeroSlides: () =>
    withFallback(
      () => api.get('/cms/hero'),
      { success: true, slides: MOCK_HERO_SLIDES }
    ),
  submitContactForm: (data) =>
    withFallback(
      () => api.post('/contact', data),
      { success: true, message: 'Message sent successfully!' }
    ),
  subscribeNewsletter: (email) =>
    withFallback(
      () => api.post('/newsletter', { email }),
      { success: true, message: 'Subscribed to newsletter!' }
    )
};

export default api;
