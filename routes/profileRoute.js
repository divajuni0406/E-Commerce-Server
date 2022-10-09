const route = require('express').Router()
const { Profile } = require('../controller/ProfileController')
const User = require('../models/User');
const {authApiGeneral} = require('../controller/authorizeRoutes')


route.get('/api/profile/:id', authApiGeneral, Profile)

module.exports = route