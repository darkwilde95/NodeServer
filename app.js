// Imports
const Mongo = require('mongoose')
const express = require('express')
const session = require('express-session') // Ver si se puede cambiar por 'passport'
const controllers = require('./controllers')

// Mounting server with middlewares
const MONGO_URL = 'mongodb://localhost/prueba'
const app = express()
app.use('/assets', express.static('assets'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'lsjddjk2kj4o3904j1nd1092',
  resave: true,
  saveUninitialized: true
}))
app.set('view engine', 'pug')

// Database connection
Mongo.connect(MONGO_URL).catch(
  error => {
    console.log(error)
  }
)
app.use((req, res, next) => {
  console.log(`\nGetting a request: ${ new Date().toLocaleTimeString()}`)
  if (req.session.user_id) {
    console.log("There's a user logged")
  } else {
    console.log("There isn't a user logged")
  }
  next()
})
app.get('/',
  (req, res) => {
    if (req.session.user_id) {
      res.redirect('/dashboard')
    } else {
      res.render('index')
    }
  }
)

// Mounting Controllers
controllers.forEach( module => app.use(module.path, module.controller) )

app.listen(3000, (error) => {
  console.log('\n    Running on http://localhost:3000')
})
