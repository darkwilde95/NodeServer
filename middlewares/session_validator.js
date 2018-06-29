const User = require('../models/user')

module.exports = (req, res, next) => {
  console.log('Validando sesion...')
  if(!req.session.user_id) {
    res.redirect('/login')
  } else {
    User.findById(req.session.user_id, 'email username gender',
      (error, doc) => {
        if (error) {
          console.log(error)
          res.redirect('/login')
        } else {
          console.log(req.route)
          console.log(req.path)
          res.locals = { user: doc }
          next()
        }
      }
    )
  }
}
