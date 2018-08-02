// Imports
const Mongo = require('mongoose')
const controllers = require('./controllers')
const passport = require('./config/passport')
const app = require('./config/initializers').app
const server = require('./config/initializers').server
const userStatus = require('./middlewares/user_status')

// App server config
const MONGO_URL = 'mongodb://localhost/prueba'

// Database connection
Mongo.connect(MONGO_URL).catch(
  error => {
    console.log(error)
  }
)

// App main
// app.use(userStatus)
// app.get('/', (req, res, next) => {
//     if (req.isAuthenticated()) {
//       res.redirect('/dashboard')
//     } else {
//       res.render('index')
//     }
//   }
// )

// Mounting Controllers
controllers.forEach( module => app.use(module.path, module.controller) )

server.listen(3000, (error) => {
  console.log('\n    Running on http://localhost:3000')
})
