const Mongoose = require("mongoose");

const productSchema = new Mongoose.Schema({
  name: { type: String },
  detail: { type: String },
  summary: { type: String },
  category: { type: String },
  recommendation: { type: Boolean },
  price: { type: Number },
  discountId: { type: Mongoose.Schema.Types.ObjectId },
  images: [],
  size: { type: Object },
  deleted: { type: Boolean },
});

const Product = Mongoose.model("Product", productSchema);

module.exports = Product;
