const { register, update, verify, resendOtp, login, getAll, makeAdmin, googleAuthLogin } = require('../controllers/user');
const { authenticate, adminAuth } = require('../middleware/authentication');
const uploads = require('../middleware/multer');
const { registerValidator, verifyValidator, resendValidator } = require('../middleware/validator');
const {loginProfile, profile} = require('../middleware/passport');

const router = require('express').Router();

router.post('/register', uploads.single('profilePicture'), registerValidator, register);

router.post('/verify', verifyValidator, verify);

router.post('/resend-otp', resendValidator, resendOtp);

router.post('/login', login);

router.get('/users', authenticate, adminAuth, getAll);

router.patch('/users/:id', authenticate, adminAuth, makeAdmin);

router.get('/auth/google', profile);

router.get('/auth/google/callback',loginProfile, googleAuthLogin);


module.exports = router;