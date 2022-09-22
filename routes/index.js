const route = require('express').Router();
const HomeRoute = require('./homeRoute');
const UserRoute = require('./userRoute');
const ProductListRoute = require('./productListRoute');

route.use(HomeRoute);
route.use(UserRoute);
route.use(ProductListRoute);

module.exports = route;
