const bcrypt = require('bcryptjs');

const password = 'pass1234';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const doSomething = async () => {
  const hash = await hashPassword(password);
  const isValid = await bcrypt.compare('password', hash);
  console.log(isValid);
};

doSomething();
