import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  stock: { type: Number, default: 50 },
  sku: { type: String }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  sku: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  discountPercentage: { type: Number, default: 0 },
  stock: { type: Number, default: 50 },
  rating: { type: Number, default: 5.0 },
  numReviews: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  images: [{ type: String }],
  shortDescription: { type: String },
  description: { type: String },
  benefits: [{ type: String }],
  ingredients: { type: String },
  howToUse: { type: String },
  variants: [variantSchema],
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
