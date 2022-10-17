const Mongoose = require("mongoose");

const cartDetailSchema = new Mongoose.Schema({
  productId: { type: Mongoose.Schema.Types.ObjectId },
  userId: { type: Mongoose.Schema.Types.ObjectId },
  quantity: { type: Number },
  cartId: { type: Mongoose.Schema.Types.ObjectId },
  size: { type: String }
});

const CartDetail = Mongoose.model("CartDetail", cartDetailSchema);

module.exports = CartDetail;