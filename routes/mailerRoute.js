const route = require('express').Router()
const Mailer = require('../controller/MailerController')
route.post('/newmail', Mailer.newMail)


module.exports = route