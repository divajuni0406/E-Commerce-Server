const route = require('express').Router();
const HomeRoute = require('./homeRoute');
const UserRoute = require('./userRoute');
const ProductListRoute = require('./productListRoute');
const ProfileRoute = require('./profileRoute')

const ProductRoute = require('./productRoute')

route.use(UserRoute);
route.use(ProductListRoute);

route.use(HomeRoute)
route.use(ProductRoute)
route.use(ProfileRoute)


module.exports = route
