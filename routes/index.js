const route = require('express').Router();
const HomeRoute = require('./homeRoute');
const UserRoute = require('./userRoute');
const ProductListRoute = require('./productListRoute');

const ProductRoute = require('./productRoute')

route.use(UserRoute);
route.use(ProductListRoute);

route.use(HomeRoute)
route.use(ProductRoute)


module.exports = route
