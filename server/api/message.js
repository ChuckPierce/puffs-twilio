const router = require('express').Router()
const { Message } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log(req.body)
  Message.findById(req.body.msg.id)
      .then(message => {
        console.log(message)
        return message.updateAttributes({ text: req.body.msg.text })
      })
      .then(msg => {
        res.json(msg)
      })
      .catch(err => {
          next(err)
      })
  })

router.get('/:messageId', (req, res, next) => {
  Message.findOne({ where: { id: req.params.messageId }}).then(message => {
    res.json(message)
  }).catch(err => next(err))
})

// router.get('/message', (req, res, next) => {
//     res.json(req.text)
// })