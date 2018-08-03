const jwt = require('jsonwebtoken')
const secret = require('../assets/values').secret

module.exports = {
  sign: (id, done) => {
    jwt.sign({ sub: id }, secret, { expiresIn: '1d'}, (error, token) => {
      if (error) {
        return done(error, null)
      }
      return done(null, token)
    })
  },
  verify: (token, done) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return done(false)
      }
      return done(decoded.sub)
    })
  }
}
