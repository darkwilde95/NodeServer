const http = require('http')
const express = require('express')
const passport = require('./passport')
const errorHandler = require('../middlewares/errorHandler')
const responseHeaders = require('../middlewares/responseHeaders')

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)

app.use(express.json())
app.use(errorHandler)
app.use(responseHeaders)
app.use(passport.initialize())

module.exports = { io, server, app }
