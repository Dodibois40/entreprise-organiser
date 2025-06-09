const express = require('express');
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Routes protégées
router.get('/me', auth, authController.getCurrentUser);
router.put('/me', auth, authController.updateProfile);
router.put('/password', auth, authController.changePassword);
router.post('/resend-verification', auth, authController.resendVerificationEmail);
router.post('/enable-2fa', auth, authController.enableTwoFactor);

module.exports = router;
