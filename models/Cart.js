const Mongoose = require('mongoose')

const cartSchema = new Mongoose.Schema({
    userId:{type: Mongoose.Schema.Types.ObjectId},
    status:{type: String}
})

const Cart = Mongoose.model('Cart', cartSchema);

module.exports = Cart