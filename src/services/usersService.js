const bcrypt = require('bcrypt');

const User = require('../models/User');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/constants');

exports.register = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (user) {
    throw new Error('User already exist!');
  }

  await User.create(userData);
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid email or password!');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password!');
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

  return token;
};
