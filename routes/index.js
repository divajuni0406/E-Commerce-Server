const route = require('express').Router()
const HomeRoute = require('./homeRoute')


route.use(HomeRoute)


module.exports = route