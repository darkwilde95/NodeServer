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
      res.render(error)
    }
  )
})
.post((req, res) => {
  const password = req.body.password
  const password_confirmation = req.body.password_confirmation
  if (password === password_confirmation) {

    const userFields = {
      username: req.body.username,
      email: req.body.email,
      password_digest: password
    }

    const user = new User(userFields)
    user.save().then(
      user => {
        req.session.user_id = user._id
        res.json(user)
      }
    ).catch(
      error => {
        res.render(error)
      }
    )
  } else {
    res.send('Passwords mismatch')
  }
})

module.exports = users_controller
