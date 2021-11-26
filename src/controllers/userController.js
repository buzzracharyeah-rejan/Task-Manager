const debug = require('debug')('user');
const sharp = require('sharp');
const { User } = require('../models/user');
const { sendCancellationEmail } = require('../emails/accounts');

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
    sendCancellationEmail(user.email, user.name);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadAvatar = async (req, res, next) => {
  // req.user.avatar = req.file.buffer;
  try {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  } catch (err) {
    console.log(err);
  }
};

exports.removeAvatar = async (req, res, next) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
};

exports.getAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) throw new Error();

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {
    console.log(error);
    res.status(404).send();
  }
};
