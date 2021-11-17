const { MongoClient: client, ObjectId } = require('mongodb');

const connectionURI =
  'mongodb+srv://test123:test123@cluster0.zzetb.mongodb.net/task-manager?retryWrites=true&w=majority';

client.connect(connectionURI, { useNewURLParser: true }, (error, client) => {
  if (error) {
    console.log('failed to connect to db');
  }
  const db = client.db('task-manager');
  db.collection('users').insertOne(
    {
      _id: new ObjectId(),
      name: 'rejan bajracharya',
      age: 22,
    },
    (error, data) => {
      console.log(data);
    }
  );
});
