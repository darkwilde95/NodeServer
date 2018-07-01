const User = require('../models/user')

module.exports = (req, res, next) => {
  if(!req.session.user_id) {
    res.locals = null
    res.redirect('/login')
  } else {
    User.findById(req.session.user_id, 'username').then(
      user => {
        res.locals = { user }
        next()
      }
    ).catch(
      error => {
        console.log(error)
        res.redirect('/login')
      }
    )
  }
}
