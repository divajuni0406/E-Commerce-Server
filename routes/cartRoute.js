const route = require('express').Router()
const { getCart,postCart, checkoutCart, changeQtyProductInCart, deleteProductInCart } = require('../controller/CartController')
const {authApiGeneral} = require('../controller/authorizeRoutes');

route.get('/cart/:userId', authApiGeneral, getCart)
route.post('/cart', authApiGeneral, postCart)
route.post('/delete-product-incart', authApiGeneral, deleteProductInCart)
route.patch('/cart', authApiGeneral, changeQtyProductInCart)

module.exports = route