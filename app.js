// Imports
const Mongo = require('mongoose')
const express = require('express')
const Session = require('express-session')
const controllers = require('./controllers')

// Mounting server with middlewares
const app = express()
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(Session({
  secret: 'lsjddjk2kj4o3904j1nd1092',
  resave: true,
  saveUninitialized: false
}))
app.set('view engine', 'pug')


// Database connection
Mongo.connect('mongodb://localhost/prueba').catch(
  error => {
    console.log(error);
  }
)

// Mounting Controllers
controllers.forEach( module => app.use(module.path, module.controller) )

app.listen(3000)
