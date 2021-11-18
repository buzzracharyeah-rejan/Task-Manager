const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must require a name'],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: (email) => {
      if (!validator.isEmail(email)) {
        throw new Error('Email is invalid');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate: (value) => {
      if (value < 0) {
        throw new Error('Age must be a positive number  ');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [6, 'Password must be at least 6 characters'],
    validate: (value) => {
      if (value === 'password') {
        throw new Error(`Password cannot be ${value}`);
      }
    },
  },
});

module.exports = mongoose.model('User', userSchema);
