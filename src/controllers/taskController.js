const Task = require('../models/task');

exports.createTask = async (req, res, next) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getTask = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) throw new Error();

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    // await req.user.populate('tasks').execPopulate();
    // const task = await Task.find({ owner: req.user._id });
    // const task = await Task.find({
    //   owner: req.user._id,
    //   completed: req.query.completed,
    // });
    const match = { completed: req.query.completed || false };
    const sortType = req.query.sort || 'asc';

    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort: {
          createdAt: sortType === 'asc' ? 1 : -1,
        },
      },
    });

    res.status(200).json({ task: req.user.tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res, next) => {
  const allowedUpdates = ['task', 'description', 'completed'];
  const updates = Object.keys(req.body);
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  try {
    if (!isValid) throw new Error('Updates not allowed');

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) res.status(404).json({ error: 'Task not found' });

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
