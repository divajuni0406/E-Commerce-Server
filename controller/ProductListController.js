const Product = require('../models/Product');

exports.ProductListController = async (req, res) => {
	try {
		const product = await Product.find({});
		res.status(200).json({ message: "succes", data: product })
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: "failed" })
	}
}

