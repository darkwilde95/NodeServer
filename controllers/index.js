const users_controller = require('./users_controller')
const session_controller = require('./session_controller')
const dashboard_controller = require('./dashboard_controller')

module.exports = [
  { path: '/', controller: session_controller },
  { path: '/users', controller: users_controller },
  { path: '/dashboard', controller: dashboard_controller }
]
