const User = require('../models/user')

module.exports = (req, res, next) => {
  console.log('Validando sesion...')
  if(!req.session.user_id) {
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
