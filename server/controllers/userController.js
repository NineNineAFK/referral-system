const User = require('../models/User');
const Order = require('../models/Order');

/**
 * Get user profile details
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      referralCode: user.referralCode,
      referralEarnings: user.referralEarnings,
      referralsCount: user.referralsCount,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
  }
};

/**
 * Get user's referral details
 */
exports.getReferralDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const referrals = await Order.find({ referrerId: user._id }).populate('userId', 'name email');
    const totalEarnings = referrals.reduce((sum, order) => sum + order.amount * 0.1, 0);

    res.status(200).json({
      totalEarnings,
      referrals: referrals.map(ref => ({
        orderId: ref._id,
        referredUser: ref.userId,
        amount: ref.amount,
        date: ref.createdAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching referral details:', error.message);
    res.status(500).json({ message: 'Failed to fetch referral details', error: error.message });
  }
};

/**
 * Update user profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error.message);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

/**
 * Delete user account
 */
exports.deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await Order.deleteMany({ userId: req.user.id });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error deleting account:', error.message);
    res.status(500).json({ message: 'Failed to delete account', error: error.message });
  }
};
