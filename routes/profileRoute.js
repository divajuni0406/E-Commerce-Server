const route = require('express').Router()
const { Profile, updateProfile, updatePass } = require('../controller/ProfileController')
const User = require('../models/User');
const { authApiGeneral } = require('../controller/authorizeRoutes')


route.get('/api/profile/:id', Profile)
route.post('/api/profile/update/:id', updateProfile)
route.post('/api/profile/settings/:id', updatePass)

module.exports = route
