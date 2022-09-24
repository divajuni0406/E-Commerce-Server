const Mongoose = require('mongoose')

const orderSchema = new Mongoose.Schema({
    userId:{type: Mongoose.Schema.Types.ObjectId, ref: "Cart"},
    total_order:{type: Number}
})

const Order = Mongoose.model('Order', orderSchema);

module.exports = Order