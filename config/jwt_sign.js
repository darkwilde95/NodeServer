const jwt = require('jsonwebtoken')
const secret = require('../assets/values').secret

module.exports = (id, done) => {
  jwt.sign({ sub: id }, secret, { expiresIn: '1d'}, (error, token) => {
    if (error) {
      return done(error, null)
    }
    return done(null, token)
  })
}
