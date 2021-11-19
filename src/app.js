const express = require('express');
const dotenv = require('dotenv').config();

const userModel = require('./models/user');
const taskModel = require('./models/task');
const server = require('./server.js');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/users', userController.createUser());

app.get('/users', userController.getUsers());

app.get('/users/:id', userController.getUser());
// app.get('/users/:id', async (req, res, next) => {
//   const _id = req.params.id;
//   userModel
//     .findById(_id)
//     .then((user) => {
//       if (!user) {
//         res.status(404).json({
//           status: 'failed',
//           error: 'User not found',
//         });
//         res.status(200).json({
//           status: 'success',
//           data: {
//             user,
//           },
//         });
//       }
//     })
//     .catch((error) => {
//       res.status(500).json({
//         status: 'failed',
//         error: error.message,
//       });
//     });
// });

app.get('/tasks', taskController.getTasks());

app.get('/tasks/:id', taskController.getTask());

app.post('/tasks', taskController.createTask());

app.listen(port, () => {
  server();
});
