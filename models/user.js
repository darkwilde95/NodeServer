const Mongo = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = Mongo.Schema

const userSchema = new Schema({
  name: String,
  username: {
    type: String,
    minlength: [ 5, 'Username must have 5 characters or more' ],
    maxlength: [ 20, 'Username must have 20 characters or less' ],
  },
  email: {
    type: String,
    required: 'email is required',
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email is not valid'
    ]
  },
  password_digest: {
    type: String,
    required: 'Password is required',
    set: password => bcrypt.hashSync(password, 11)
  }
})

const User = Mongo.model('User', userSchema)
module.exports = User
