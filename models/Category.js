const Mongoose = require("mongoose");

const categorySchema = new Mongoose.Schema({
  categoryName: { type: Mongoose.Schema.Types.ObjectId },
});

const Category = Mongoose.model("Category", categorySchema);

module.exports = Category;
