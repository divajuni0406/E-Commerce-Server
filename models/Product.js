const Mongoose = require('mongoose')

<<<<<<< HEAD
const productSchema = new Schema({
    name: String,
    detail:String,
    thumbnail:String,
    recommendation:Boolean,
    price: Number,
    discountId:Schema.Types.ObjectId,
=======
const productSchema = new Mongoose.Schema({
    name:{type: String},
    detail:{type: String},
    thumbnail:{type: String},
    recommendation:{type: Boolean},
    price:{Number},
    discountId:{type: Mongoose.Schema.Types.ObjectId},
>>>>>>> origin/api-login
    images:[],
    stock:{type: Number},
    deleted:{type: Boolean}
})

const Product = Mongoose.model('Product', productSchema);

module.exports = Product