const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH
const { Message, Subscriber } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
    const twiml = new MessagingResponse()
    const message = twiml.message()
    let text = req.body.Body || ''
    text = text.toLowerCase().trim()
    const fromNumber = req.body.From
    if (text === 'puffs') {
      Message.findOne({where: {primary: true}}).then(data => {
        console.log(data.text)
        console.log(data.url)
        console.log(message)
        message.body(data.text)
        message.media(data.url)
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
        Subscriber.findOne({ where: { phone: fromNumber }}).then(sub => {
          if (!sub) {
            Subscriber.create({ phone: fromNumber, subscribed: true })
          } else {
            sub.updateAttributes({ subscribed: true })
          }
        })
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
  })


const client = require('twilio')(accountSid, authToken);
router.post('/send', (req, res, next) => {
  const msg = req.body
  Subscriber.findAll({
    attributes: ['phone']
  }).then(numbers => {
    return Promise.all(numbers.map(num => {
      return client.messages
        .create({
          to: num.phone,
          from: process.env.TWILIO_NUMBER,
          body: msg.text,
          mediaUrl: msg.url,
        })
    }))
    .then(() => {
      res.json(msg)
    })
  })
  .catch(next)
})
