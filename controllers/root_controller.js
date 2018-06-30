const bcrypt = require('bcrypt')
const User = require('../models/user')
const root_controller = require('express').Router()

root_controller.get('/',
  (req, res) => {
    res.render('index')
  }
)

root_controller.route('/login')
.get((req, res) => {
  res.render('login')
})
.post((req, res) => {
  User.findOne({ email: req.body.email }, 'password_digest').then(
    user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password_digest).then(
          valid => {
            if (valid) {
              req.session.user_id = user._id
              res.redirect('/dashboard')
            } else {
              res.send('Invalid credentials')
            }
          }
        ).catch(
          error => {
            res.send(error)
          }
        )
      } else {
        res.send('Account not registered')
      }
    }
  ).catch(
    error => {
      res.send(error)
    }
  )
})

root_controller.route('/register')
.get((req, res) => {
  res.render('register')
})

module.exports = root_controller
