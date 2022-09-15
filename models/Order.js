const { model, Schema } = require('mongoose')

const orderSchema = new Schema({
    cartId:Schema.Types.ObjectId,
    price:Number
})

const Order = model('Order', orderSchema);

module.exports = Order