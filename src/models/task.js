const mongoose = require('mongoose');
const validator = require('validator');

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
module.exports = Task;