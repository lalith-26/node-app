const JwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../config');

const authenticateAPI = (passport) => { 
  const opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: config.tokenSecret,
  };
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload.data._id, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      return done(null, false);
    });
  }));
};

module.exports = authenticateAPI;
