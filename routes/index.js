const route = require('express').Router()
const HomeRoute = require('./homeRoute')
const ProfileRoute = require('./profileRoute')


route.use(HomeRoute)
route.use(ProfileRoute)


module.exports = route