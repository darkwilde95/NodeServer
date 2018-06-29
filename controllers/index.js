const root_controller = require('./root_controller')
const dashboard_controller = require('./dashboard_controller')

module.exports = [
  { path: '/', controller: root_controller },
  { path: '/dashboard', controller: dashboard_controller }
]
