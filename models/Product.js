const { model, Schema } = require('mongoose')

const productSchema = new Schema({
    name: String,
    detail:String,
    thumbnail:String,
    recommendation:Boolean,
    price: Number,
    discountId:Schema.Types.ObjectId,
    images:[],
    stock:Number,
    deleted:Boolean
})

const Product = model('Product', productSchema);

module.exports = Product