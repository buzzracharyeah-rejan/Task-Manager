const { MongoClient: client, ObjectId } = require('mongodb');

const connectionURI =
  'mongodb+srv://test123:test123@cluster0.zzetb.mongodb.net/task-manager?retryWrites=true&w=majority';

client.connect(connectionURI, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    return console.log('Failed to connect to the server');
  }
  const db = client.db('task-manager');
  db.collection('task').insert([
    {
      task: 'update report',
      describe: 'to update the college report for submission',
      done: false,
    },
    {
      task: 'clean',
      describe: 'to clean the room',
      done: false,
    },
    {
      task: 'exam preparation',
      describe: 'to prepare for the upcoming exams',
      done: true,
    },
  ]);

  db.collection('task')
    .find({ done: false })
    .toArray((err, tasks) => {
      console.log(tasks);
    });
  //   const db = client.db('task-manager');
  //   db.collection('users')
  //     .find({ age: 22 })
  //     .toArray((err, users) => {
  //       console.log(users);
  //     });

  //   db.collection('users')
  //     .find({ age: 22 })
  //     .count((err, count) => {
  //       console.log(count);
  //     });
});
