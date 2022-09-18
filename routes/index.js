const route = require('express').Router();
const HomeRoute = require('./homeRoute');
const UserRoute = require('./userRoute');

route.use(HomeRoute);
route.use(UserRoute);

module.exports = route;
