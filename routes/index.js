const route = require('express').Router();
// const HomeRoute = require('./homeRoute');
const UserRoute = require('./userRoute');
const ProductListRoute = require('./productListRoute');
const ProfileRoute = require('./profileRoute');
const CartRoute = require('./cartRoute');
const AuthRender = require('./authRender');

const Route = require('./route')
const ProductRoute = require('./productRoute')
const midtransRoute = require('./midtrans')
const MailRoute = require('./mailerRoute')
const BannerRoute = require('./bannerRoute')
const BlogRoute = require('./blogRoute')
const CategoryRoute = require('./categoryRoute')

route.use(UserRoute);
route.use(ProductListRoute);
route.use(midtransRoute);
// route.use(HomeRoute)
route.use(ProductRoute)
route.use(ProfileRoute)
route.use(Route)
route.use(BlogRoute)
route.use(AuthRender)
route.use(CartRoute)
route.use(MailRoute)
route.use(BannerRoute)
route.use(CategoryRoute)

module.exports = route;
