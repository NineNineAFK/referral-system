const express = require('express');
const { generateLink, getReferralStats } = require('../controllers/referralController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/generate-link', protect, generateLink);
router.get('/stats', protect, getReferralStats);

module.exports = router;
