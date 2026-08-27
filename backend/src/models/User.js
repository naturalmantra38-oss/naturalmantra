import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['CUSTOMER', 'ADMIN'], default: 'CUSTOMER' },
  phone: { type: String },
  addresses: [{
    street: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
