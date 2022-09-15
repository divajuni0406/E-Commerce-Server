const { model, Schema } = require('mongoose')

const OrderDetailSchema = new Schema({
    orderId:Schema.Types.ObjectId,
    productId:Schema.Types.ObjectId,
    quantity:Number,
    price:Number
})

const OrderDetail = model('OrderDetail', OrderDetailSchema);

module.exports = OrderDetail


