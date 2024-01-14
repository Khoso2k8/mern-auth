const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name register'],
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: [true, 'Please enter your email to register'],
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Plesae enter a password for your account'],
    trim: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please re-enter your password to confirm'],
    trime: true,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: 'Both password are not same',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.checkPassword = async function (bodyPassword, dbPassword) {
  if (await bcrypt.compare(bodyPassword, dbPassword)) {
    return true;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
