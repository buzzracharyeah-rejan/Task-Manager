const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
  const task = new Task({ ...req.body });
  try {
    const response = await task.save();
    console.log(response);
    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      error: err.message,
    });
  }
};

exports.getTask = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (task) {
      res.status(200).json({
        status: 'success',
        data: {
          task,
        },
      });
    }
    res.status(404).json({
      status: 'failed',
      error: 'task not found',
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err.message,
    });
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'failed',
      error: err.message,
    });
  }
};

exports.updateTask = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['task', 'done', 'describe'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    return res.status(400).json({
      status: 'failed',
      error: 'Invalid update operation',
    });
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
};
