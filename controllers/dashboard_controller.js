const dashboard_router = require('express').Router()
const session_validator = require('../middlewares/session_validator')

dashboard_router.use(session_validator)
dashboard_router.route('/')
.get((req, res) => {
  res.render('dashboard')
})

module.exports = dashboard_router
