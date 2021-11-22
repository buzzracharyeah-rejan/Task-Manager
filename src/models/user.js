const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

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
  },
  age: {
    type: Number,
    default: 0,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().min(0).max(100),
  password: Joi.string().alphanum().min(8).max(30).required(),
  email: Joi.string().email(),
});

userSchema.pre('save', async function (next) {
  console.log('just before saving!');
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});
const User = mongoose.model('User', userSchema);

module.exports = { schema, User };
