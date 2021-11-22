const express = require('express');

const server = require('./server.js');
const validator = require('./utils/validator');
const userRouter = require('./router/userRoute');
const taskRouter = require('./router/taskRoute');
const authRouter = require('./router/authRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  server();
});
