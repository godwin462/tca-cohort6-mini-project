const userModel = require('../models/user');
const cloudinary = require('../config/cloudinary');
const bcrypt = require('bcrypt');
const { registerOTP } = require('../utils/email');
const { sendMail } = require('../utils/nodemailer');


exports.register = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, age, phoneNumber } = req.body;
    const existUser = await userModel.findOne({ email: email.toLowerCase() });

    if (existUser) {
      return res.status(400).json({
        message: 'User already exist'
      })
    };

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const otp = Math.round(Math.random() * 1e6).toString().padStart(6, "0");

    const user = new userModel({
      fullName,
      email,
      password: hashPassword,
      age,
      phoneNumber: `+234${phoneNumber.slice(1)}`,
      otp: otp,
      otpExpiredAt: Date.now() + 1000 * 120
    });

    const detail = {
      email: user.email,
      subject: 'Email Verification',
      html: registerOTP(user.otp, `${user.fullName.split(' ')[0]}`)
    };

    await sendMail(detail);
    await user.save();
    const response = {
      fullName: user.fullName,
      email: user.email
    };
    res.status(201).json({
      message: 'User created successfully',
      data: response
    })
  } catch (error) {
    res.status(500).json({
      mesaage: 'Error creating user' + error.message
    })
  }
};


exports.verify = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: 'user not found'
      })
    };

    if (Date.now() > user.otpExpiredAt) {
      return res.status(400).json({
        message: 'OTP expired'
      })
    };

    if (otp !== user.otp) {
      return res.status(400).json({
        message: 'Invalid otp'
      })
    };

    Object.assign(user, { isVerified: true, otp: null, otpExpiredAt: null });
    await user.save();
    res.status(200).json({
      message: 'User verified successfully'
    })
  } catch (error) {
    res.status(500).json({
      mesaage: 'Error verifying user' + error.message
    })
  }
};


exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        message: 'user not found'
      })
    };

    const otp = Math.round(Math.random() * 1e6).toString().padStart(6, "0");
    Object.assign(user, {otp: otp, otpExpiredAt: Date.now() + 1000 * 120});

      const detail = {
      email: user.email,
      subject: 'Resend: Email Verification',
      html: registerOTP(user.otp, `${user.fullName.split(' ')[0]}`)
    };

    await sendMail(detail);
    await user.save();
    res.status(200).json({
      message: 'Otp sent, kindly check your email'
    })
  } catch (error) {
    res.status(500).json({
      mesaage: 'Error resending otp' + error.message
    })
  }
};