const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    minLength: [10, 'Email should be atleast ten characters long!'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email',
    ],
  },
  username: {
    type: String,
    requred: [true, 'Username is required!'],
    minLength: [5, 'The username should be at least five characters long!'],
  },
  password: {
    type: String,
    minlength: [4, 'The password should be at least four characters long!'],
    required: [true, 'Password is required!'],
  },
});

userSchema.virtual('repeatPassword').set(function (value) {
  if (value !== this.password) {
    throw new Error("Passwords don't match!");
  }
});

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
