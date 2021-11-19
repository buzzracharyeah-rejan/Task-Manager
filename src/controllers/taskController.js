const taskModel = require('../models/task');

exports.createTask = async (req, res, next) => {
  const task = new taskModel({ ...req.body });
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
    const task = await taskModel.findById(_id);
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
    const tasks = await taskModel.find();
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
