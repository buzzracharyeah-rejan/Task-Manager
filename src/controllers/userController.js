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
    .then((data) => {
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
