const route = require('express').Router()
const { Profile, updateProfile, updatePass } = require('../controller/ProfileController')
const User = require('../models/User');
const { authApiGeneral } = require('../controller/authorizeRoutes')


route.get('/api/profile/:id', authApiGeneral, Profile)
route.post('/api/profile/update/:id', authApiGeneral, updateProfile)
route.post('/api/profile/settings/:id', authApiGeneral, updatePass)

module.exports = route
