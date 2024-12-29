const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true },
  referralEarnings: { type: Number, default: 0 },
  referralsCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
