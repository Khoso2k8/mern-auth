const User = require('../models/userModel');
const createToken = require('../utils/jwtToken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;
    if ((!name, !email, !password, !passwordConfirm)) {
      throw new Error(
        'Please fill name, email, password and password confirm fields to register'
      );
    }
    const newUser = await User.create({
      name,
      password,
      email,
      passwordConfirm,
    });
    // const { _id, name: newUserName, email: newUserEmail } = newUser;
    const { name: userName, email: userEmail, _id } = newUser;
    const token = createToken(res, _id);
    res.status(201).json({
      status: 'success',
      data: {
        token,
        user: {
          _id,
          name: userName,
          email: userEmail,
        },
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      err: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Please enter email and password to login');
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.checkPassword(password, user.password))) {
      throw new Error('Id or Password does not match');
    }
    const { name, email: userEmail, _id } = user;
    const token = createToken(res, _id);
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          _id,
          email: userEmail,
          name,
        },
      },
    });
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      err: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax' });
    req.user = null;
    res.status(200).json({
      status: 'success',
      message: 'logged out successfully',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      err: err.message,
    });
  }
};
