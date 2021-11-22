const debug = require('debug')('user');
const { User } = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      debug(user);
      res.status(200).json({
        status: 'success',
        data: {
          users: user,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'failed',
        error: error.message,
      });
    });
};

exports.getUser = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      res.status(404).json({
        status: 'failed',
        error: 'user not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};

exports.createUser = (req, res, next) => {
  console.log('create user');
  const user = new User({ ...req.body });

  user
    .save()
    .then(() => {
      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'age', 'password'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).json({
      status: 'error',
      error: 'Invalid update operation',
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        error: 'no user with the id found',
      });
    }
    return res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({
        status: 'failed',
        error: 'user not found',
      });
    }
    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};
