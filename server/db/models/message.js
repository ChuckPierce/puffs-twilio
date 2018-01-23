const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
    text: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
      defaultValue: process.env.TWILIO_NUMBER,
    }
  })
  module.exports = Message

