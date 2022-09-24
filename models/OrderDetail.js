const Mongoose = require('mongoose')

const OrderDetailSchema = new Mongoose.Schema({
    orderId:{type: Mongoose.Schema.Types.ObjectId, ref: "Order"},
    productId:{type: Mongoose.Schema.Types.ObjectId, ref:"Product"},
    quantity:{type: Number},
    price:{type: Number},
    subtotal:{type: Number}
})

const OrderDetail = Mongoose.model('OrderDetail', OrderDetailSchema);

module.exports = OrderDetail


