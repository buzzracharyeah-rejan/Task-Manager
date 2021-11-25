const express = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');
const router = express.Router();

router
  .route('/task')
  .get(auth, taskController.getTasks)
  .post(auth, taskController.createTask);

router
  .route('/task/:id')
  .get(auth, taskController.getTask)
  .patch(auth, taskController.updateTask);

module.exports = router;
