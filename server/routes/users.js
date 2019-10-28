const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

const router = express.Router();


router.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  User.addUser(newUser, (err, user) => {
    if (err) {
      return res.json({ message: `Unable to create user ${err}` });
    }
    return res.json({ message: `Registered user ${user.name}` });
  });
});

router.post('/login', (req, res) => {
  const { name } = req.body;
  const { password } = req.body;
  User.getUserByName(name, (err, user) => {
    if (err) return res.json({ message: 'unable to login' });
    if (!user) return res.json({ message: 'invalid user' });
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        return res.json({message: 'unable to login'}) 
      }
      if (!isMatch) {
        return res.json({ message: 'incorrect password' });
      }
      const token = jwt.sign({
        type: 'user',
        data: {
          // eslint-disable-next-line no-underscore-dangle
          _id: user._id,
          name: user.name,
          email: user.email
        }
      }, config.tokenSecret, { expiresIn: 3600 });
      return res.json({ message: 'authenicated', accessToken: `JWT ${token}` });
    });
  });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({});
});

module.exports = router;
