const Sequelize = require('sequelize')
const sequelize = new Sequelize('db', null, null, {
  dialect: 'postgres',
  define: { timestamps: true }
})

module.exports = sequelize
