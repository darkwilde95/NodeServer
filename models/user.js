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
  password: {
    type: String,
    minlength: [ 8, 'Password must have 8 characters or more' ],
    required: 'Password is required',
    validate: {
      validator: password => this.pass_confirm === password,
      message: 'Passwords mismatch'
    }
  },
  gender: {
    type: String,
    enum: { values: [ 'M', 'F', 'O' ], message: 'Invalid Option' }
  }
})

userSchema.virtual('password_confirmation').get(
  () => this.pass_confirm
).set(
  password => { this.pass_confirm = password }
)

const User = Mongo.model('User', userSchema)
module.exports = User
