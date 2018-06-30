const root_controller = require('./root_controller')
const users_controller = require('./users_controller')
const dashboard_controller = require('./dashboard_controller')

module.exports = [
  { path: '/', controller: root_controller },
  { path: '/users', controller: users_controller },
  { path: '/dashboard', controller: dashboard_controller }
]
