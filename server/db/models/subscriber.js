const Sequelize = require('sequelize')
const db = require('../db')

const Subscriber = db.define('subscriber', {
    phone: {
      type: Sequelize.STRING,
      unique: true,
    },
    subscribed: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    }
  })
  module.exports = Subscriber
