const { model, Schema } = require('mongoose')

const cartSchema = new Schema({
    userId:Schema.Types.ObjectId,
    status:String
})

const Cart = model('Cart', cartSchema);

module.exports = Cart