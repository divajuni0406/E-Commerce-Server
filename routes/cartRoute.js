const route = require('express').Router()
const { getCart,postCart, checkoutCart, changeQtyProductInCart, deleteProductInCart } = require('../controller/CartController')

route.get('/cart/:userId', getCart)
route.post('/cart', postCart)
route.post('/delete-product-incart', deleteProductInCart)
route.patch('/cart', changeQtyProductInCart)
route.delete('/checkout-cart', checkoutCart)

module.exports = route