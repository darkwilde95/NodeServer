const User = require('../models/user')
const root_router = require('express').Router()

root_router.get('/',
  (req, res) => {
    res.render('index')
  }
)

root_router.get('/login',
  (req, res) => {
    if ('user_id' in req.session && req.session.user_id) {
      res.send('Ya hay una sesion iniciada')
    } else {
      res.render('login')
    }
  }
)

root_router.post('/login',
  (req, res) => {
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
            res.send(doc)
          } else {
            res.send('account not registered')
          }
        }
      }
    )
  }
)

root_router.get('/register',
  (req, res) => {
    if ('user_id' in req.session && req.session.user_id) {
      res.send('Ya hay una sesion iniciada')
    } else {
      res.render('register')
    }
  }
)

root_router.post('/register',
  (req, res) => {
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
          res.send(doc)
        }
      }
    )
  }
)

module.exports = root_router
