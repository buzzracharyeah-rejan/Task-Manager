const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router
  .route('/task')
  .get(taskController.getTasks)
  .post(taskController.createTask);

router
  .route('/task/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask);

module.exports = router;
