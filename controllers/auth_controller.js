const User = require('../models/user')
const status = require('../assets/status')
const sign = require('../config/jwt').sign
const verify = require('../config/jwt').verify
const passport = require('../config/passport')
const auth_controller = require('express').Router()

auth_controller.route('/login')
.post((req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  User.findOne({ email }, (error, user) => {
    if (error) {
      return next(error)
    }
    if (!user) {
      res.status(status.not_found.code).send(status.not_found.msg)
      return next()
    }
    user.compare_password(password, (error, valid) => {
      if (error) {
        return next(error)
      }
      if (!valid) {
        res.status(status.not_found.code).send(status.not_found.msg)
        return next()
      }
      sign(user._id, (error, token) => {
        if (error) {
          return next(error)
        }
        if (!token) {
          res.status(status.internal_error.code).send(status.internal_error.msg)
          return next(new Error('Token not generated'))
        }
        res.status(status.ok.code).json({ jwt: token })
        next()
      })
    })
  })
})

auth_controller.route('/validate_token')
.get((req, res, next) => {
  const token = req.headers.authorization.split(' ')
  if (token.length !== 2 && token[0] !== 'Bearer') {
    res.json({ valid: false })
    return next()
  }
  verify(token[1], (userId) => {
    if (!userId) {
      res.json({ valid: false })
      return next()
    }
    User.findById(userId, (error, user) => {
      if (error) {
        return next(error)
      }
      if (!user) {
        res.json({ valid: false })
        return next()
      }
      res.json({ valid: true })
      return next()
    })
  })
})

module.exports = auth_controller
