const Mongoose = require('mongoose')

const orderSchema = new Mongoose.Schema({
    order_id:String,
    token:String,
    total_order:{type: Number}
})

const Order = Mongoose.model('PaymentTransaction', orderSchema);

module.exports = Order