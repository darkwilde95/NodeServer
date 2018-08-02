const passport = require('passport')
const User = require('../models/user')
const secret = require('../assets/values').secret
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

//Use strategy
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
}

passport.use(new JWTStrategy(options, (jwtPayload, done) => {
  User.findById(jwtPayload.sub, '-password_digest' ,(error, user) => {
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
