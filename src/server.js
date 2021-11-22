const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const rootDir = require('../rootdir');

dotenv.config(path.join(rootDir, '/.env'));

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
