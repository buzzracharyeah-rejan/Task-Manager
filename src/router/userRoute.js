const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { schema } = require('../models/user');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');

router
  .route('/user/me')
  .get(auth, userController.getUsers)
  .delete(auth, userController.deleteUser)
  .patch([auth, validator.validate(schema)], userController.updateUser);

module.exports = router;
