const route = require('express').Router()
const { getToken } = require('../controller/MidtransController')

route.post('/getTokenPayment', getToken)


module.exports = route