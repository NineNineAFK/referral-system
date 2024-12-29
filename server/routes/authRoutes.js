const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Render Signup Page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Render Login Page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle Signup Logic
router.post('/signup', signup);

// Handle Login Logic
router.post('/login', login);

module.exports = router;
