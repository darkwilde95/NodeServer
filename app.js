// Imports
const Mongo = require('mongoose')
const controllers = require('./controllers')
const port = require('./assets/values').port
const passport = require('./config/passport')
const app = require('./config/initialize').app
const server = require('./config/initialize').server

// Database connection
const MONGO_URL = 'mongodb://localhost/db'
Mongo.connect(MONGO_URL).catch(
  error => {
    console.log(error)
  }
)

// App main
app.get('/', (req, res, next) => {
  res.send('Holi, estoy funcionando!')
})

// Mounting Controllers
controllers.forEach( module => app.use(module.path, module.controller) )

// Run app
server.listen(port, (error) => {
  console.log(`\n    Running on http://localhost:${port}\n`)
})
