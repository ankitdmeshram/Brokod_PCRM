const express = require('express');
const router = express.Router();
const { resetPassword, signup, signin } = require('../Controllers/authController');

// Register route
router.post('/signup', signup);

// Login route
router.post('/signin', signin);
router.post('/reset-password', resetPassword);

module.exports = router;