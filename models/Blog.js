const Mongoose = require("mongoose");

const blogSchema = new Mongoose.Schema({
	title: { type: String },
	content: { type: String },
	category: { type: String },
	tag: [],
	timestamp: { type: Date, default: Date.now },
	image: { type: String }
});

const Blog = Mongoose.model("Blog", blogSchema);

module.exports = Blog;
