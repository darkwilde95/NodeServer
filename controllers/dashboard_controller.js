const dashboard_controller = require('express').Router()
const session_validator = require('../middlewares/session_validator')

dashboard_controller.use(session_validator)
dashboard_controller.route('/')
.get((req, res) => {
  res.render('dashboard', { user: req.user })
})

module.exports = dashboard_controller
