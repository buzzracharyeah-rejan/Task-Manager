const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const userModel = require('./models/user');

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

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'say hi',
  });
});

app.listen(port, () => {
  mongoose
    .connect(
      'mongodb+srv://test123:test123@cluster0.zzetb.mongodb.net/task-manager-api?retryWrites=true&w=majority'
    )
    .then(() => {
      console.log('connected to the db successfully');
    })
    .catch((err) => {
      console.log(err);
    });
});
