const { MongoClient: client, ObjectID } = require('mongodb');

const connectionURI =
  'mongodb+srv://test123:test123@cluster0.zzetb.mongodb.net/task-manager?retryWrites=true&w=majority';

client.connect(connectionURI, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Failed to connect to the server');
  }
  const db = client.db('task-manager');
  db.collection('users')
    .deleteMany({
      name: 'rajive luitel',
    })
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
  // db.collection('task')
  //   .updateMany(
  //     { done: false },
  //     {
  //       $set: {
  //         done: true,
  //       },
  //     }
  //   )
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // // db.collection('users')
  //   .updateOne(
  //     {
  //       _id: new ObjectID('6194adeec2dccdbc6498faf7'),
  //     },
  //     {
  //       $set: {
  //         name: 'rajive luitel',
  //         age: 25,
  //       },
  //     }
  //   )
  //   .then((user) => {
  //     console.log(user);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
