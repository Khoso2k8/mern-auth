const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const filteredUsers = users.map(user => {
      const { name, email, _id } = user;
      return { name, email, _id };
    });

    res.status(200).json({
      status: 'success',
      data: {
        users: filteredUsers,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err: err.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { email, name, _id } = user;
    res.status(200).json({
      status: 'success',
      data: {
        user: { email, name, _id },
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      err: err.message,
    });
  }
};
