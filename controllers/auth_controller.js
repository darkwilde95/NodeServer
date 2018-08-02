const User = require('../models/user')
const status = require('../assets/status')
const jwtSign = require('../config/jwt_sign')
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

    user.compare_password(password, (valid) => {
      if (valid) {
        jwtSign(id, (error, token) => {
          if (error) {
            return next(error)
          }
          if (token) {
            res.status(status.ok.code).json({ jwt: token })
            return next()
          }
        })
      }
      res.status(status.not_found.code).send(status.not_found.msg)
      next()
    })
  })
})

module.exports = auth_controller
