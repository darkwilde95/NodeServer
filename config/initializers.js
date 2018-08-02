const http = require('http')
const express = require('express')
// const session = require('express-session')

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

app.use(express.json())
// app.use(session({
//   secret: 'lsjddjk2kj4o3904j1nd1092',
//   resave: true,
//   saveUninitialized: true
// }))
// app.set('view engine', 'pug')
app.use(passport.initialize())
// app.use(passport.session())

const secret = 'unaminiaplicaciondepruebaNODE'
module.exports = { io, server, app, secret }
