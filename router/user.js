const { register, update, verify, resendOtp, login, getAll, makeAdmin } = require('../controllers/user');
const { authenticate, adminAuth } = require('../middleware/authentication');
const uploads = require('../middleware/multer');
const { registerValidator, verifyValidator, resendValidator } = require('../middleware/validator');

const router = require('express').Router();

router.post('/register', uploads.single('profilePicture'), registerValidator, register);

router.post('/verify', verifyValidator, verify);

router.post('/resend-otp', resendValidator, resendOtp);

router.post('/login', login);

router.get('/users', authenticate, adminAuth, getAll);

router.patch('/users/:id', authenticate, adminAuth, makeAdmin);

module.exports = router;