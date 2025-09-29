const { register, update, verify, resendOtp } = require('../controllers/user');
const uploads = require('../middleware/multer');
const { registerValidator, verifyValidator, resendValidator } = require('../middleware/validator');

const router = require('express').Router();

router.post('/register', uploads.single('profilePicture'), registerValidator, register);

router.post('/verify', verifyValidator, verify);

router.post('/resent-otp', resendValidator,resendOtp);

module.exports = router;