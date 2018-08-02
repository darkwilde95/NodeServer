const jwt = require('jsonwebtoken')
const secret = require('./initializers').secret

module.exports = (id, done) => {
  jwt.sign(secret, { expiresIn: '1d', subject: id }, (error, token) => {
    if (error) {
      return done(error, null)
    }
    return done(null, token)
  })
})
