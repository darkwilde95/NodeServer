const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')

//Serialization
passport.serializeUser(
  (user, done) => {
    // done (error, user)
    done(null, user._id)
  }
)

passport.deserializeUser(
  (id, done) => {
    User.findById(id,
      (error, user) => {
        done(error, user)
      }
    )
  }
)

//Use strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password_digest'
  },
  (email, password, done) => {
    User.findOne({ email },
      function (error, user) {
        if (!user) {
          return done(null, false, { message: 'The email is not registered' })
        } else {
          user.compare_password(password,
            (error, valid) => {
              if (valid) {
                return done(null, user)
              } else {
                return done(null, false, { message: 'Password is not correct' })
              }
            }
          )
        }
      }
    )
  }
))

module.exports = passport
