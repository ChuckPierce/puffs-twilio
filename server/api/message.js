const router = require('express').Router()
const { Message } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    console.log(req.body)
    Message.create(req.body)
      .then(message => {
        res.json(message)
      })
      .catch(err => {
          next(err)
      })
  })

// router.get('/message', (req, res, next) => {
//     res.json(req.text)
// })
