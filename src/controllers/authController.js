const debug = require('debug')('auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models/user');
const { sendWelcomeEmail } = require('../emails/accounts');

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    // await user.save();
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const user = new User({ ...req.body });
    // await user.save();
    const token = await user.generateAuthToken();
    sendWelcomeEmail(req.body.email, req.body.name);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { user, token } = req;
    user.tokens = user.tokens.filter((t) => t.token !== token);
    // req.user.tokens = req.user.tokensreq.((token) => token.token !== req.token);
    // console.log(req.user.tokens);
    // console.log(req.user);
    await user.save();
    res.status(200).send();
  } catch (err) {
    debug(err);
    res.status(500).send({ error: err.message });
  }
};

exports.logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
