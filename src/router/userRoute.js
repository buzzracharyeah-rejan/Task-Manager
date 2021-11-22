const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { schema } = require('../models/user');
const validator = require('../utils/validator');

router
  .route('/user')
  .get(userController.getUsers)
  .post(validator.validate(schema), userController.createUser);

router
  .route('/user/:id')
  .get(userController.getUser)
  .delete(userController.deleteUser)
  .patch(validator.validate(schema), userController.updateUser);

module.exports = router;
