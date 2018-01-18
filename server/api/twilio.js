const router = require('express').Router()
const MessagingResponse = require('twilio').twiml.MessagingResponse
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH
module.exports = router

router.post('/', (req, res, next) => {
    console.log(req.body.Body === 'PUFFS')
    console.log(req)
    const twiml = new MessagingResponse()
    if (req.body.Body === 'PUFFS') {
      const message = twiml.message()
      message.body('This is a cool code!')
      message.media('https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg')
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  })


const client = require('twilio')(accountSid, authToken);
router.post('/send', (req, res, next) => {
  const number = req.body.phoneNumber
  client.messages
    .create({
      to: `+1${number}`,
      from: process.env.TWILIO_NUMBER,
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      mediaUrl: 'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg',
    })
    .then(message => {
      console.log(message.sid)
      res.end()
    })
    .catch(next)
})
