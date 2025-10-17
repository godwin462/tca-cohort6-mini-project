const joi = require('joi');


exports.registerValidator = (req, res, next) => {
  const schema = joi.object({
    fullName: joi.string().min(3).trim().required().pattern(/^[A-Za-z\s]+$/).messages({
      'string.empty': 'Full name is required',
      'string.min': 'Full name must be at least 3 characters long',
      'string.pattern.base': 'Fullname can only contain letters'
    }),
    email: joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
    phoneNumber: joi.string().trim().pattern(/^[0-9]{11}$/).required().messages({
      'string.empty': 'Phone number is required',
      'string.pattern.base': 'Phone number must be 11 digits',
    }),
    age: joi.number().min(10).required().messages({
      'number.min': 'Only 10 years above',
      'number.empty': 'Age is required'
    }),
    password: joi.string().required().messages({
      'string.empty': 'Password is required',
      'string.pattern.base': 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, a number, and a special character (@$!%_*#?&)',
    }),
    confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
      'any.only': 'Passwords do not match',
      'string.empty': 'Confirm password cannot be empty',
      'any.required': 'Confirm password is required'
    }),
    profile: joi.optional()
  });

  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({
      message: 'Validation error: ' + error.message
    });
  }

  next();
};


exports.verifyValidator = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    }),
    otp: joi.string().trim().required().messages({
      'string.empty': 'OTP is required',
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({
      message: 'Validation error: ' + error.message
    });
  }

  next();
};


exports.resendValidator = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().trim().required().messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address',
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({
      message: 'Validation error: ' + error.message
    });
  }

  next();
};
