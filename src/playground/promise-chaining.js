const dotenv = require('dotenv').config();
const server = require('../server');

server();
console.log(process.env.CONNECTION_URI);
const userModel = require('../models/user');

// 61973dea26dfa44df6b377bd
const _id = '61973dea26dfa44df6b377bd';
userModel
  .findByIdAndUpdate(_id, { age: 1 })
  .then((user) => {
    console.log(user);
    return userModel.countDocuments({ age: 1 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
