const User = require('../models/user')
const status = require('../assets/status')
const jwtSign = require('../config/jwt_sign')
const users_controller = require('express').Router()

users_controller.route('/')
.get((req, res, next) => {
  User.find({}, (error, users) => {
    if (error) {
      return next(error)
    }
    res.status(status.ok.code).json(users)
  })
})
.post((req, res, next) => {
  const password_digest = req.body.password
  const password_confirmation = req.body.password_confirmation
  if (password_digest !== password_confirmation) {
    res.status(status.bad_request.code).send(status.bad_request.msg)
    return next()
  }
  const userFields = {
    username: req.body.username,
    email: req.body.email,
    password_digest,
  }
  const user = new User(userFields)
  user.save((error, user) => {
    if (error) {
      return next(error)
    }
    jwtSign(user._id, (error, token) => {
      if (error) {
        return next(error)
      }
      if (!token) {
        res.status(status.internal_error.code).send(status.internal_error.msg)
        return next(new Error('Token not generated'))
      }
      res.status(status.created.code).json({ jwt: token })
      next()
    })
  })
})

module.exports = users_controller
