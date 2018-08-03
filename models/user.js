const bcrypt = require('bcrypt')
const Mongo = require('mongoose')
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
    minlength: [ 8, 'Password must have 8 characters or more' ],
    required: 'Password is required'
  }
})

userSchema.pre('save', function(next) {  //No podia ser funcion anonima de es6 por contexto
  if (!this.isModified('password_digest')) {
    return next()
  }
  bcrypt.hash(this.password_digest, 12, (error, hash) => {
    if (error) {
      return next(error)
    }
    this.password_digest = hash
    return next()
  })
})

userSchema.method('compare_password', function(password, done) {
  bcrypt.compare(password, this.password_digest, (error, valid) => {
    if (error) {
      return done(error, null)
    }
    return done(null, valid)
  })
})

module.exports = Mongo.model('User', userSchema)
