const express = require('express');
const router = express.Router();
const { resetPassword, signup, signin, logout } = require('../Controllers/authController');

router.post('/signup', signup);

router.post('/signin', signin);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

module.exports = router;