const passport = require('../config/passport')
const dashboard_controller = require('express').Router()

dashboard_controller.use(passport.authenticate('jwt', { session: false }))
dashboard_controller.route('/')
.get((req, res, next) => {
  res.json(req.user)
})

module.exports = dashboard_controller
