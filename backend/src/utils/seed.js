import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import bcrypt from 'bcryptjs';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../../frontend/src/data/mockData.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/natural_mantra');
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // Create Admin User
    const hashedPassword = await bcrypt.hash('Admin@123456', 10);
    const adminUser = await User.create({
      name: 'Natural Mantra Admin',
      email: 'admin@naturalmantra.com',
      password: hashedPassword,
      role: 'ADMIN',
      phone: '+919876543210'
    });

    console.log('Admin user created:', adminUser.email);

    // Insert Categories
    const insertedCategories = await Category.insertMany(MOCK_CATEGORIES);
    console.log(`${insertedCategories.length} categories inserted.`);

    // Map & Insert Products
    const productsToInsert = MOCK_PRODUCTS.map((prod) => {
      const matchedCat = insertedCategories.find(c => c.slug === (prod.category?.slug || prod.category));
      return {
        ...prod,
        _id: undefined,
        category: matchedCat ? matchedCat._id : insertedCategories[0]._id
      };
    });

    const insertedProducts = await Product.insertMany(productsToInsert);
    console.log(`${insertedProducts.length} products inserted.`);

    console.log('✅ Database seeding complete!');
    process.exit();
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
