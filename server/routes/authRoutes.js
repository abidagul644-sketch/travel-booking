const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile, changePassword, resetPassword } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile/:id', updateProfile);
router.put('/change-password/:id', changePassword);
router.post('/reset-password', resetPassword);

module.exports = router;