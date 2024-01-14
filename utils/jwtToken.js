const jwt = require('jsonwebtoken');

const createToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.cookie('jwt', token, { httpOnly: true, sameSite: 'lax' });
  return token;
};

module.exports = createToken;
