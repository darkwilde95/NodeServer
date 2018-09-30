// Imports
const Mongo = require('mongoose')
const app = require('./config/initialize')
const controllers = require('./controllers')
const port = require('./assets/values').port

// Database connection
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost/db'
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
controllers.forEach( module => app.use( module.path, module.controller) )

// Run app
app.listen(port, () => {
  console.log('App running on http://localhost:' + port)
})
