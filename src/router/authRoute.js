const router = require('express').Router();
const authController = require('../controllers/authController');
const { schema } = require('../models/user');
const validator = require('../utils/validator');

router.post('/login', authController.login);
router.post('/signup', validator.validate(schema), authController.signup);

module.exports = router;
