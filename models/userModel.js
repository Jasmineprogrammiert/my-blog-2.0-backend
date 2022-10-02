const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: '',
  },
}, { timestamps: true });

// static signup method 
UserSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is invalid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  const exists = await this.findOne({ username, email });
  if (exists) {
    throw Error('Username or email is already taken');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash });

  return user;
}

// static login method
UserSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ username });
  if (!user) {
    throw Error('Incorrect username');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', UserSchema);