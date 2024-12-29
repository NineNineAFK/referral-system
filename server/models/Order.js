const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{ name: String, price: Number, quantity: Number }],
  amount: { type: Number, required: true },
  referralCode: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
