const route = require('express').Router()
const HomeRoute = require('./homeRoute')
const ProductRoute = require('./productRoute')


route.use(HomeRoute)
route.use(ProductRoute)


module.exports = route