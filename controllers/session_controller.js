const User = require('../models/user')
const passport = require('../config/passport')
const session_controller = require('express').Router()

session_controller.route('/login')
.get((req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/dashboard')
  } else {
    res.render('login')
  }
})
.post((req, res, next) => {

  passport.authenticate('local', (error, user, info) => {
    if (error) {
      next(error)
    }
    if (!user) {
      res.status(400).send('Email or password not valid')
    } else {
      req.logIn(user, (error) => {
        if (error) {
          next(error)
        }
        console.log('User logged in succesfully');
        res.redirect('/dashboard')
      })
    }
  })(req, res, next)
})

session_controller.route('/register')
.get((req, res) => {
  if (req.isAuthenticated()) {
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
        req.logIn(user, (error) => {
          if (error) {
            next(error)
          }
          console.log('User created succesfully');
          res.redirect('/dashboard')
        })
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
.get((req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout()
    console.log('User logged out succesfully');
    res.redirect('/')
    return next()
  }
  res.status(401).send('Unauthorized')
})

module.exports = session_controller
