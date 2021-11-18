const mongoose = require('mongoose');
const validator = require('validator');
const dotenv = require('dotenv').config();

const Task = new mongoose.model('Task', taskSchema);
const task = new Task({
  task: 'summer proj report submission',
  done: true,
  describe: 'The report on project Yatra was submitted today',
});

task
  .save()
  .then(() => console.log(task))
  .catch((err) => console.log(`Error: ${err}`));

// const User = new mongoose.model('User', userSchema);

// const user = new User({
//   name: 'test',
//   email: 'test@test.com',
//   password: 'test123',
// });
// user
//   .save()
//   .then(() => console.log(user))
//   .catch((error) => {
//     console.log(`Error: ${error}`);
//   });
