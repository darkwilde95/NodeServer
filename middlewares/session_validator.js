const User = require('../models/user')

module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).send('Unauthorized')
  }
}
