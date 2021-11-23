const router = require('express').Router();
const authController = require('../controllers/authController');
const { schema } = require('../models/user');
const validator = require('../middlewares/validator');
const auth = require('../middlewares/auth');

router.post('/login', authController.login);
router.post('/signup', validator.validate(schema), authController.signup);
router.post('/logout', auth, authController.logout);
router.post('/logoutAll', auth, authController.logoutAll);

module.exports = router;
