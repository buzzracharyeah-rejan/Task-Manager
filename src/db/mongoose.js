const mongoose = require('mongoose');
const validator = require('validator');
const dotenv = require('dotenv').config();

mongoose
  .connect(
    'mongodb+srv://test123:test123@cluster0.zzetb.mongodb.net/task-manager-api?retryWrites=true&w=majority'
  )
  .catch((err) => {
    console.log(err);
  });

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

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task name required'],
    trim: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  describe: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      console.log(value);
    },
  },
});

const Task = new mongoose.model('Task', taskSchema);
const task = new Task({
  task: 'summer proj report submission',
  done: true,
  describe: 'The report on project Yatra was submitted today',
});

task
  .save()
  .then(() => console.log(task))
  .catch((err) => console.log(`Error: ${err}`));

// const User = new mongoose.model('User', userSchema);

// const user = new User({
//   name: 'test',
//   email: 'test@test.com',
//   password: 'test123',
// });
// user
//   .save()
//   .then(() => console.log(user))
//   .catch((error) => {
//     console.log(`Error: ${error}`);
//   });
