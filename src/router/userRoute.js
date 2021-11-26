const express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require('../controllers/userController');
const errorController = require('../controllers/errorController');
const { schema } = require('../models/user');
const auth = require('../middlewares/auth');
const validator = require('../middlewares/validator');

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      return cb(new Error('File must be of type jpg | jpeg | png'));
    }
    cb(undefined, true);
  },
});
router
  .route('/user/me')
  .get(auth, userController.getUsers)
  .delete(auth, userController.deleteUser)
  .patch([auth, validator.validate(schema)], userController.updateUser);

router
  .route('/user/me/avatar')
  .post(
    auth,
    upload.single('avatar'),
    userController.uploadAvatar,
    errorController.handleError
  )
  .delete(auth, userController.removeAvatar);

router.get('/user/:id/avatar', userController.getAvatar);

module.exports = router;
