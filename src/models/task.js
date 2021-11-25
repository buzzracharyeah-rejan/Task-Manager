const mongoose = require('mongoose');
const validator = require('validator');
const { User } = require('./user');

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Task name required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Task description required'],
    trim: true,
  },
  completed: {
    type: Boolean,
    required: [true, 'Task completion status required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

const Task = new mongoose.model('Task', taskSchema);
module.exports = Task;
