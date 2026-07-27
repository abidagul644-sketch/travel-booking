const express = require('express');
const router = express.Router();
const { registerUser, loginUser, updateProfile, changePassword, resetPassword, getAllUsers, deleteUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile/:id', updateProfile);
router.put('/change-password/:id', changePassword);
router.post('/reset-password', resetPassword);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;