const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, null]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password_digest: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, null]
      }
    }
  }, {
    setterMethods: {
      password(value) {
        bcrypt.hash(value, 12, (error, hash) => {
          if (error) {
            this.setDataValue('password_digest', null)
            return null
          }
          this.setDataValue('password_digest', hash)
        })
      }
    }
  })
}
