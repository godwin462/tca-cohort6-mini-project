const userModel = require('../models/user');
const bcrypt = require('bcrypt');


exports.register = async (req, res) => {
  try {
    const { fullName, email, password, age, phoneNumber } = req.body;
    const existEmail = await userModel.findOne({ email: email.toLowerCase() });
    const existPhoneNumber = await userModel.findOne({ phoneNumber: phoneNumber });

    if (existEmail || existPhoneNumber) {
      return res.status(400).json({
        message: 'User already exist'
      })
    };
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRound);


    const user = new userModel({
      fullName,
      email,
      password: hashPassword,
      age,
      phoneNumber
    });

    // await user.save();
    res.status(201).json({
      message: 'Created successfully',
      data: user
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    })
  }
};