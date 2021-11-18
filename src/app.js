const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const userModel = require('./models/user');
const taskModel = require('./models/task');
const server = require('./server.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/users', (req, res, next) => {
  const { name, age, email, password } = req.body;

  const user = new userModel({
    name,
    age,
    email,
    password,
  });

  user
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/tasks', async (req, res, next) => {
  const task = new taskModel({ ...req.body });
  try {
    const response = await task.save();
    console.log(response);
    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      error: err.message,
    });
  }
});

app.listen(port, () => {
  server();
});
