const User = require('../models/user')
const users_controller = require('express').Router()

users_controller.route('/')
.get((req, res) => {
  User.find({}).then(
    users => {
      res.json(users)
    }
  ).catch(
    error => {
      console.log(error.message)
      res.send(error.message)
    }
  )
})


module.exports = users_controller
