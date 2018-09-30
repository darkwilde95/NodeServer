const auth_controller = require('./auth_controller')
const users_controller = require('./users_controller')

module.exports = [
  { path: '/', controller: auth_controller },
  { path: '/users', controller: users_controller }
]
