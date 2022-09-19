const route = require('express').Router()
const { Profile } = require('../controller/ProfileController')
const User = require('../models/User');


route.get('/api/profile/:id', Profile)

module.exports = route