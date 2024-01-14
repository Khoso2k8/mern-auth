const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
exports.protect = async (req, res, next) => {
  try {
    let token = '';
    if (req.headers.cookie.split('=').at(1)) {
      token = req.headers.cookie.split('=').at(1);
    }
    if (!token) {
      throw new Error(
        'You are not logged in. Please login to perform this action'
      );
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('Invalid Token or token has expired');
    }
    const { name: userName, email: userEmail, _id } = user;
    req.user = { name: userName, email: userEmail, _id };
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      err: err.message,
    });
  }
};
