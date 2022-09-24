const User = require('../models/User');

exports.Profile = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { username, email, name, birthdate } = user;
		res.status(200).json({ message: "succes", data: { username, email, name, birthdate } })
	} catch (e) {
		console.log(e)
		res.status(400).json({ message: "error" })
	}
}

