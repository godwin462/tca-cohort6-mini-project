const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String
  },
  otpExpiredAt: {
    type: Number
  },
  profilePicture: {
    imageUrl: { type: String },
    publicId: { type: String }
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isGoogle: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
