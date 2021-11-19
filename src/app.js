const express = require('express');
const debug = require('debug')('app');

const server = require('./server.js');
const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const validator = require('./utils/validator');
const { schema } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;
debug('test app');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/users', userController.getUsers);
app.get('/users/:id', userController.getUser);
app.post('/users', validator.validate(schema), userController.createUser);

app.get('/tasks', taskController.getTasks);
app.get('/tasks/:id', taskController.getTask);
app.post('/tasks', taskController.createTask);

app.listen(port, () => {
  server();
});
