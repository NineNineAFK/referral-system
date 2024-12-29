const User = require('../models/User');

exports.validateReferralCode = async (req, res, next) => {
  const { referralCode } = req.body;

  if (!referralCode) {
    req.referrer = null;
    return next();
  }

  try {
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      return res.status(400).json({ message: 'Invalid referral code' });
    }

    req.referrer = referrer;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Failed to validate referral code', error: error.message });
  }
};
