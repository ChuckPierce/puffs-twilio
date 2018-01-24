const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
    text: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    primary: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  })
  module.exports = Message

