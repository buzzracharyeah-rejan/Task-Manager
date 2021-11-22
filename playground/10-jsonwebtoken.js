const jwt = require('jsonwebtoken');

const signToken = () => {
  const token = jwt.sign({ _id: '3213432' }, 'shhh', { expiresIn: '1hr' });
  console.log(token);

  jwt.verify(token, 'shhh', (err, result) => {
    if (err) {
      return console.log(`Error: ${err}`);
    }
    console.log(result);
  });
};

signToken();
