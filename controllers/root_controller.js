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
  const query = {
    email: req.body.email,
    password: req.body.password
  }
  User.findOne( query, 'username email').then(
    user => {
      if (user) {
        req.session.user_id = user._id
        res.json(user)
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
