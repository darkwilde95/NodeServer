const passport = require('passport')
const User = require('../models/user')
const secret = require('./initializers').secret
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJWT

//Use strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}
passport.use(new JWTStrategy(options, (jwtPayload, done) => {
  User.findById(jwtPayload.sub, (error, user) => {
    if (error) {
      return done(error, false, { message: 'DB error' })
    }
    if (!user) {
      done(null, false, { message: 'User doesn\'t exist' })
    } else {
      done(null, user)
    }
  })
}))

module.exports = passport
