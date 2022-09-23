const route = require('express').Router()
const HomeRoute = require('./homeRoute')
const CartRoute = require('./cartRoute')

route.use(HomeRoute)
route.use(CartRoute)


module.exports = route