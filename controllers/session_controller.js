const bcrypt = require('bcrypt')
const User = require('../models/user')
const session_controller = require('express').Router()

//TODO: hacer el logout en este controller

session_controller.route('/login')
.get((req, res) => {
  if (req.session.user_id) {
    res.redirect('/dashboard')
  } else {
    res.render('login')
  }
})
.post((req, res) => {
  User.findOne({ email: req.body.email }, 'password_digest').then(
    user => {
      if (user) {
        user.compare_password(req.body.password, (error, valid) => {
          if (error) {
            console.log(error.message)
            res.send(error.message)
          } else {
            if (valid) {
              req.session.user_id = user._id
              res.redirect('/dashboard')
            } else {
              res.send('Invalid credentials')
            }
          }
        })
      } else {
        res.send('Account not registered')
      }
    }
  ).catch(
    error => {
      console.log(error.message)
      res.send(error.message)
    }
  )
})

session_controller.route('/register')
.get((req, res) => {
  if (req.session.user_id) {
    res.redirect('/dashboard')
  } else {
    res.render('register')
  }
})
.post((req, res) => {
  const password_digest = req.body.password
  const password_confirmation = req.body.password_confirmation
  if (password_digest === password_confirmation) {
    const userFields = {
      username: req.body.username,
      email: req.body.email,
      password_digest,
    }
    const user = new User(userFields)
    user.save().then(
      user => {
        req.session.user_id = user._id
        res.redirect('/dashboard')
      }
    ).catch(
      error => {
        console.log(error.message)
        res.send(error.message)
      }
    )
  } else {
    res.send('Passwords mismatch')
  }
})

session_controller.route('/logout')
.get((req, res) => {
  if (req.session.user_id) {
    req.session.destroy((error) => {
      res.redirect('/')
    })
  } else {
    res.redirect('/login')
  }
})

module.exports = session_controller
