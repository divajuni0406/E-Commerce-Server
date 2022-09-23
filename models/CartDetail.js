const { model, Schema } = require('mongoose')

const cartDetailSchema = new Schema({
    productId:Schema.Types.ObjectId,
    cartId:Schema.Types.ObjectId,
    quantity:Number,
})

const CartDetail = model('CartDetail', cartDetailSchema);

module.exports = CartDetail