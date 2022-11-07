const Mongoose = require("mongoose");

const categorySchema = new Mongoose.Schema({
  name: { type: String },
  deleted: {type: Boolean}
});

const Category = Mongoose.model("Category", categorySchema);

module.exports = Category;
