const express = require('express');
const debug = require('debug');
const morgan = require('morgan');
const multer = require('multer');

const server = require('./server.js');
const userRouter = require('./router/userRoute');
const taskRouter = require('./router/taskRoute');
const authRouter = require('./router/authRoute');

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(doc|docx)$/)) {
      return cb(new Error('Please upload a word document'));
    }

    cb(undefined, true);
  },
});

app.post(
  '/upload',
  upload.single('upload'),
  (req, res) => {
    res.send();
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  const mode = process.argv[2] || '';
  if (mode === '--prod') {
    return res.status(503).json({
      message: 'The site is under maintenance. Please try again later',
    });
  }
  next();
});

app.use(authRouter);
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  server();
});
