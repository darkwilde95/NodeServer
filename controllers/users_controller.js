const User = require('../models/user')
const status = require('../assets/status')
const sign = require('../config/jwt').sign
const users_controller = require('express').Router()

users_controller.route('/')
.get((req, res, next) => {
  User.find({}, '-password_digest', (error, users) => {
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
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password_digest,
  }
  const user = new User(userFields)
  user.save((error, user) => {
    if (error) {
      return next(error)
    }
    sign(user._id, (error, token) => {
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

users_controller.route('/:user_id')
.get((req, res, next) => {
  User.findOne({ _id: req.params.user_id }, '-password_digest', (error, user) => {
    if (error) {
      return next(error)
    }
    if (!user) {
      res.status(status.not_found.code).send(status.not_found.msg)
    } else {
      res.status(status.ok.code).json(user)
    }
  })
})
.put((req, res, next) => {
  User.findById(req.params.user_id, '-password_digest', (error, user) => {
    if (error) {
      return next(error)
    }
    if (!user) {
      res.status(status.not_found.code).send(status.not_found.msg)
      return next()
    }
    const user_updates = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.emai
    }
    for (let key of Object.keys(user_updates)) {
      if (user_updates[key]) {
        user[key] = user_updates[key]
      }
    }
    user.save((error, user_updated) => {
      if (error) {
        return next(error)
      }
      res.status(status.ok.code).json(user_updated)
    })
  })
})
.delete((req, res, next) => {
  User.findById(req.params.user_id, '-password_digest', (error, user) => {
    if (error) {
      return next(error)
    }
    if (!user) {
      res.status(status.not_found.code).send(status.not_found.msg)
      return next()
    }
    user.remove((error, user_removed) => {
      if (error) {
        return next(error)
      }
      res.status(status.ok.code).json(user_removed)
    })
  })
})

module.exports = users_controller
