const bcrypt = require('bcryptjs');
const { User } = require('../models/user');

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        status: 'failed',
        error: 'user not found for the email',
      });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } else {
      res.status(400).json({
        status: 'failed',
        error: 'invalid password',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};
