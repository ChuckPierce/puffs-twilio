const router = require('express').Router()
const { Message } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Message.findById(req.body.msg.id)
      .then(message => {
        return message.updateAttributes({ text: req.body.msg.text, url: req.body.msg.url, primary: req.body.msg.primary, keyword: req.body.msg.keyword })
      })
      .then(msg => {
        res.json(msg)
      })
      .catch(err => {
          next(err)
      })
  })

router.post('/new', (req, res, next) => {
  Message.create({ text: '' }).then(newMessage => {
    res.json({ id: newMessage.id, text: newMessage.text, keyword: newMessage.keyword, url: newMessage.url, primary: newMessage.primary })
  }).catch(err => {
    next(err)
  })
})

router.get('/:messageId', (req, res, next) => {
  Message.findOne({ where: { id: req.params.messageId }}).then(message => {
    res.json(message)
  }).catch(err => next(err))
})

router.get('/', (req, res, next) => {
  Message.findAll({
    attributes: ['id', 'text', 'keyword', 'url', 'primary']
  })
    .then(messages => res.json(messages))
    .catch(next)
})
