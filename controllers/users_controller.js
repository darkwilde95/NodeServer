const bcrypt = require('bcrypt')
const User = require('../models/user')
const users_controller = require('express').Router()

users_controller.route('/')
.get((req, res) => {
  User.find({}).then(
    users => {
      res.json(users)
    }
  ).catch(
    error => {
      res.send(error)
    }
  )
})
.post((req, res) => {
  const password = req.body.password
  const password_confirmation = req.body.password_confirmation
  if (password === password_confirmation) {

    bcrypt.hash(password, 12).then(
      password_digest => {
        const userFields = {
          username: req.body.username,
          email: req.body.email,
          password_digest
        }
        const user = new User(userFields)
        user.save().then(
          user => {
            req.session.user_id = user._id
            res.redirect('/dashboard')
          }
        ).catch(
          error => {
            res.send(error)
          }
        )
      }
    ).catch(
      error => {
        res.send(error)
      }
    )
  } else {
    res.send('Passwords mismatch')
  }
})

module.exports = users_controller
