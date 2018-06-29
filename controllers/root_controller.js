const User = require('../models/user')
const root_router = require('express').Router()

root_router.get('/',
  (req, res) => {
    res.render('index')
  }
)

root_router.route('/login')
.get((req, res) => {
  res.render('login')
})
.post((req, res) => {
  const email = req.body.email
  const password = req.body.password
  const query = { email, password }
  User.findOne( query, 'email',
    (error, doc) => {
      if (error) {
        console.log(error)
        res.send('Error')
      } else {
        if (doc) {
          req.session.user_id = doc._id
          // res.json(doc)
          res.redirect('/dashboard')
        } else {
          res.send('account not registered')
        }
      }
    }
  )
})

root_router.route('/register')
.get((req, res) => {
  res.render('register')
})
.post((req, res) => {
  const email = req.body.email
  const password = req.body.password
  const password_confirmation = req.body.password_confirmation
  const userFields = { email, password, password_confirmation }
  console.log(userFields);
  const user = new User(userFields)
  user.save(
    (err, doc) => {
      if (err) {
        console.log(err);
        res.send('Error')
      } else {
        req.session.user_id = doc._id
        // res.json(doc)
        res.redirect('/dashboard')
      }
    }
  )
})

module.exports = root_router
