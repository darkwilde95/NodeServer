// Imports
const Mongo = require('mongoose')
const app = require('./config/initialize')
const controllers = require('./controllers')

// Database connection
const MONGO_URL = process.env.MONGODB_URL || 'mongodb://localhost/db'
const API_URL = process.env.API_URL || 'localhost'
const PORT = process.env.PORT || 3000


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

console.log('LOADING...')
// Run app
app.listen(PORT, () => {
  console.log('App running on http://'+ API_URL + ':' + PORT)
})
