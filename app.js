// Imports
const Mongo = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const User = require('./models/user')

// Mounting server with middlewares
const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')

// Database connection
Mongo.connect('mongodb://localhost/prueba').catch(
  error => {
    console.log(error);
  }
)

// Enable routes
app.get('/',
  (req, res) => {
    res.render('index')
  }
)
app.get('/login',
  (req, res) => {
    res.render('login')
  }
)
app.post('/login',
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
            console.log(doc)
            res.send(doc)
          } else {
            res.send('account not registered')
          }
        }
      }
    )
  }
)

app.get('/register',
  (req, res) => {
    res.render('register')
  }
)
app.post('/register',
  (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const password_confirmation = req.body.password_confirmation
    const userFields = { email, password, password_confirmation }
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
app.listen(3000)
