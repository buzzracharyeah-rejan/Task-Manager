const server = require('../server')();
// const server = require('../server')();

// dotenv.config({ path: path.join(rootDir, '.env') });
// dotenv.config();

// const uri = process.env.CONNECTION_URI;

// mongoose
//   .connect(uri)
//   .then(() => console.log('connected successfully'))
//   .catch((err) => console.log(err));
// const userModel = require('../models/user');

// // 61973dea26dfa44df6b377bd
// const _id = '61973dea26dfa44df6b377bd';
// userModel
//   .findByIdAndUpdate(_id, { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return userModel.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
