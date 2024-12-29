const User = require('../models/User');
const Order = require('../models/Order');

exports.generateLink = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const referralLink = `${process.env.BASE_URL}/?ref=${user.referralCode}`;
    res.status(200).json({ referralLink });
  } catch (error) {
    console.error('Error generating referral link:', error.message);
    res.status(500).json({ message: 'Failed to generate referral link', error: error.message });
  }
};

exports.getReferralStats = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const referrals = await Order.find({ referrerId: user._id });
    const totalEarnings = referrals.reduce((sum, order) => sum + order.amount * 0.1, 0);

    res.status(200).json({
      referrals: referrals.length,
      totalEarnings,
    });
  } catch (error) {
    console.error('Error fetching referral stats:', error.message);
    res.status(500).json({ message: 'Failed to fetch referral stats', error: error.message });
  }
};
