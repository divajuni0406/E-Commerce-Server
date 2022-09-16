const route = require('express').Router()
const { Home } = require('../controller/HomeController')

route.get('/', Home)


module.exports = route