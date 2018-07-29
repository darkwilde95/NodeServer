// Imports
const http = require('http')
const Mongo = require('mongoose')
const express = require('express')
const session = require('express-session')
const controllers = require('./controllers')
const passport = require('./config/passport')
const userStatus = require('./middlewares/user_status')

// App server config
const MONGO_URL = 'mongodb://localhost/prueba'
const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)
app.use('/assets', express.static('assets'))
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'lsjddjk2kj4o3904j1nd1092',
  resave: true,
  saveUninitialized: true
}))
app.set('view engine', 'pug')
app.use(passport.initialize())
app.use(passport.session())

// Database connection
Mongo.connect(MONGO_URL).catch(
  error => {
    console.log(error)
  }
)

// App main
app.use(userStatus)
app.get('/',
  (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard')
    } else {
      res.render('index')
    }
  }
)

// Mounting Controllers
controllers.forEach( module => app.use(module.path, module.controller) )

server.listen(3000, (error) => {
  console.log('\n    Running on http://localhost:3000')
})
