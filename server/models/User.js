/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    unique: true,
    required: true
  },
});

userSchema.plugin(uniqueValidator);

const User = module.exports = mongoose.model('User', userSchema)

module.exports.addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) callback(err);
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) callback(err);
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByName = (userName, callback) => {
  const query = {
    name: userName,
  };
  User.findOne(query, callback);
};

module.exports.comparePassword = (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) callback(err);
    callback(null, isMatch);
  });
};

module.exports.getUserById = (userId, callback) => {
  User.findById(userId,callback);
}