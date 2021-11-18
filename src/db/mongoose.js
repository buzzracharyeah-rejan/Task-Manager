const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

mongoose
  .connect(
    'mongodb+srv://test123:test123@cluster0.zzetb.mongodb.net/task-manager?retryWrites=true&w=majority'
  )
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const User = new mongoose.model('User', userSchema);

const user = new User({ name: 'rejan bajrachayra', age: 22 });
user
  .save()
  .then(() => console.log(user))
  .catch((error) => {
    console.log(`Error: ${error}`);
  });
