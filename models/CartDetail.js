const Mongoose = require("mongoose");

const cartDetailSchema = new Mongoose.Schema({
  productId: { type: Mongoose.Schema.Types.ObjectId },
  userId: { type: Mongoose.Schema.Types.ObjectId },
  quantity: { type: Number },
});

const CartDetail = Mongoose.model("CartDetail", cartDetailSchema);

module.exports = CartDetail;
