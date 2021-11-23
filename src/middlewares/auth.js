const debug = require('debug')('auth');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const auth = async (req, res, next) => {
  try {
    // const token = req.headers.authorization.replace('Bearer ', '');
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token, 'shhh');
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) throw new Error();

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(403).json({
      status: 'failed',
      error: 'Please authenticate',
    });
  }
};

module.exports = auth;
