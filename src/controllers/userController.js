const debug = require('debug')('user');
const { User } = require('../models/user');

exports.getUsers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
};

exports.getUser = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({
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

// exports.createUser = (req, res, next) => {
//   const user = new User({ ...req.body });
//   user
//     .save()
//     .then(() => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           user,
//         },
//       });
//     })
//     .catch((err) => {
//       res.status(400).json({
//         status: 'failed',
//         error: err.message,
//       });
//     });
// };

exports.updateUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'age', 'email', 'password'];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) throw new Error();

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(201).json({ user: req.user });
  } catch (err) {
    console.log();
    res.status(500).json({ error: 'Invalid updates!' });
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    // const user = await User.findByIdAndDelete({_id: user._id})
    const user = await req.user.remove();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
