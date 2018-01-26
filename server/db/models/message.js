const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
    text: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    keyword: {
      type: Sequelize.STRING,
      defaultValue: '',
      unique: true,
    },
    url: {
      type: Sequelize.STRING,
      defaultValue: '',
    },
    primary: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }
  })
  module.exports = Message

