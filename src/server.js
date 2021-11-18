const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

module.exports = () => {
  mongoose
    .connect(process.env.CONNECTION_URI)
    .then(() => {
      console.log('connected to the database');
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    });
};
