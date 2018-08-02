const http = require('http')
const express = require('express')
const passport = require('./passport')
const errorHandler = require('../middlewares/errorHandler')

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

app.use(express.json())
app.use(passport.initialize())
app.use(errorHandler)

module.exports = { io, server, app }
