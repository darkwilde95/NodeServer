// Imports
const Mongo = require('mongoose')
const express = require('express')
const session = require('express-session') // Ver si se puede cambiar por 'passport'
const controllers = require('./controllers')

// Mounting server with middlewares
const MONGO_URL = 'mongodb://localhost/prueba'
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'lsjddjk2kj4o3904j1nd1092',
  resave: false,
  saveUninitialized: true
}))
app.set('view engine', 'pug')

// Database connection
Mongo.connect(MONGO_URL).catch(
  error => {
    console.log(error)
  }
)

app.get('/',
  (req, res) => {
    res.render('index')
  }
)

// Mounting Controllers
controllers.forEach( module => app.use(module.path, module.controller) )

app.listen(3000)
