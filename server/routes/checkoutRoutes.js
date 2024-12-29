const express = require('express');
const { checkout } = require('../controllers/checkoutController');
const { validateReferralCode } = require('../middleware/referralMiddleware');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, validateReferralCode, checkout);

module.exports = router;
