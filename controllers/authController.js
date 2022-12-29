const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = _id => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '1d' });
}

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);
    res.status(200).json({ username, email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

const logIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(400).json({ error: err.message });;
  }
}

module.exports = {
  signUp,
  logIn
}