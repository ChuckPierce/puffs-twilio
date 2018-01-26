const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH
const { Message, Subscriber } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    let text = req.body.Body || ''
    text = text.toLowerCase().trim()
    const fromNumber = req.body.From
    Message.findAll().then(messages => {
      const twiml = new MessagingResponse()
      messages.forEach(data => {
        const keyword = data.keyword && data.keyword.toLowerCase().trim()
        if (text === keyword) {
          const message = twiml.message()
          message.body(data.text)
          if (data.url) message.media(data.url)
          Subscriber.findOne({ where: { phone: fromNumber }}).then(sub => {
            if (!sub) {
              Subscriber.create({ phone: fromNumber, subscribed: true })
            } else {
              sub.updateAttributes({ subscribed: true })
            }
          })
        }
      })
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    })
  })


const client = require('twilio')(accountSid, authToken);
router.post('/send', (req, res, next) => {
  const msg = req.body
  Subscriber.findAll({
    attributes: ['phone']
  }).then(numbers => {
    return Promise.all(numbers.map(num => {
      const obj = {
        to: num.phone,
        from: process.env.TWILIO_NUMBER,
        body: msg.text,
      }
      if (msg.url) obj.mediaUrl = msg.url
      return client.messages.create(obj)
    }))
    .then(() => {
      res.json(msg)
    })
  })
  .catch(next)
})
