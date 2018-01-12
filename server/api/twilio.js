const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse
module.exports = router

router.post('/', (req, res, next) => {
    const twiml = new MessagingResponse()
    twiml.message('The Robots are coming! Head for the hills!')
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString())
  })
