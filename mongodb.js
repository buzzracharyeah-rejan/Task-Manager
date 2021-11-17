// CRUD Operation
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionURL =
  'mongodb+srv://test123:test123@cluster0.zzetb.mongodb.net/task-manager?retryWrites=true&w=majority';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to connect to database');
    }
    const db = client.db('task-manager');

    db.collection('users').insertOne(
      {
        name: 'rejan',
        age: 22,
      },
      (error, result) => {
        if (error) {
          return console.log('unable to insert user');
        }
        console.log(result);
        console.log(result.insertedId);
      }
    );
  }
);
