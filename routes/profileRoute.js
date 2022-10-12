const route = require('express').Router()
const { Profile } = require('../controller/ProfileController')


route.get('/api/profile/:id', Profile)

module.exports = route