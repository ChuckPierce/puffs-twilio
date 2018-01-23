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
      message.body('This is a cool code! To be removed from the list text "STOP"')
      // message.media('https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg')
      Subscriber.findOne({ where: { phone: fromNumber }}).then(sub => {
        if (!sub) {
          Subscriber.create({ phone: fromNumber, subscribed: true })
        } else {
          sub.updateAttributes({ subscribed: true })
        }
      })
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  })


const client = require('twilio')(accountSid, authToken);
router.post('/send', (req, res, next) => {
  const body = req.body.phoneNumber
  Subscriber.findAll({
    attributes: ['value']
  }).then(numbers => {
    return Promise.all(numbers.map(num => {
      return client.messages
        .create({
          to: num.value,
          from: process.env.TWILIO_NUMBER,
          body,
          // mediaUrl: 'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg',
        })
    }))
    .then(() => {
      res.end()
    })
  })
  .catch(next)
})
