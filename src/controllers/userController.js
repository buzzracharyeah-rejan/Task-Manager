exports.getUsers = (req, res, next) => {
  userModel
    .find({})
    .then((user) => {
      res.status(200).json({
        status: 'success',
        data: {
          users: user,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: 'failed',
        error: error.message,
      });
    });
};

exports.getUser = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const user = await userModel.findOne({ _id });
    if (!user) {
      res.status(404).json({
        status: 'failed',
        error: 'user not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failed',
      error: error.message,
    });
  }
};

exports.createUser = (req, res, next) => {
  const { name, age, email, password } = req.body;

  const user = new userModel({
    name,
    age,
    email,
    password,
  });

  user
    .save()
    .then((data) => {
      console.log(data);
      res.status(201).json({
        status: 'success',
        data: {
          user,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
