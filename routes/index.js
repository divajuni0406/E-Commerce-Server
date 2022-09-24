const route = require('express').Router();
const HomeRoute = require('./homeRoute');
const UserRoute = require('./userRoute');
const ProductListRoute = require('./productListRoute');
const ProfileRoute = require('./profileRoute')

const Route = require('./route')

const ProductRoute = require('./productRoute')

route.use(UserRoute);
route.use(ProductListRoute);

route.use(HomeRoute)
route.use(ProductRoute)
route.use(ProfileRoute)
route.use(Route)


module.exports = route
