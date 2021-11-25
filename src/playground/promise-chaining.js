const server = require('../server')();
const Task = require('../models/task');
const User = require('../models/user');

const populateTasks = async () => {
  try {
    // const task = await Task.populate('owner').execPopulate();
    const task = await Task.findOne({ _id: '619f4d09a8e866a293790df4' });
    await task.populate('owner');
    console.log(task);
  } catch (err) {
    console.log(err);
  }
};

populateTasks();
