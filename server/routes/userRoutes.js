const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getProfile,
  getReferralDetails,
  updateProfile,
  deleteAccount,
} = require('../controllers/userController');

const router = express.Router();

router.get('/profile', protect, getProfile);
router.get('/referrals', protect, getReferralDetails);
router.put('/profile', protect, updateProfile);
router.delete('/account', protect, deleteAccount);

module.exports = router;
