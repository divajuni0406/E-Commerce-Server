const route = require('express').Router()
const { getToken } = require('../controller/MidtransController')
const {authApiGeneral} = require('../controller/authorizeRoutes');

route.post('/getTokenPayment', authApiGeneral, getToken)


module.exports = route