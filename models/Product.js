const Mongoose = require('mongoose')

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
const productSchema = new Schema({
    name: String,
    detail:String,
    thumbnail:String,
    recommendation:Boolean,
    price: Number,
    discountId:Schema.Types.ObjectId,
=======
=======
>>>>>>> origin/api-forgotPassword
=======
>>>>>>> origin/api-order
const productSchema = new Mongoose.Schema({
    name:{type: String},
    detail:{type: String},
    thumbnail:{type: String},
    recommendation:{type: Boolean},
    price:{Number},
    discountId:{type: Mongoose.Schema.Types.ObjectId},
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/api-login
=======
>>>>>>> origin/api-forgotPassword
=======
>>>>>>> origin/api-order
    images:[],
    stock:{type: Number},
    deleted:{type: Boolean}
})

const Product = Mongoose.model('Product', productSchema);

module.exports = Product