const User = require('../models/User');
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);
const JWT = require("jsonwebtoken");

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


exports.updateProfile = async (req, res) => {
	const id = req.params.id
	const data = req.body
	const dataUpdate = {
		username:data.username,
		email: data.email,
		name: data.name,
		birthdate: data.birthdate
	}
	console.log(data)
	try {	
			const getDataUser = await User.updateOne({ _id: id }, {$set: dataUpdate });
			res.status(200).json({message: "successfully update", result: getDataUser})
			console.log(getDataUser)
	} catch (error) {
		console.log(error)
		res.status(400).json({ message: "error" })
	}

}

exports.updatePass = async (req, res) => {
	const id = req.params.id
	const { oldPassword, newPassword } = req.body

	try {
		const findUser = await User.findById({ _id: id })
		if (passConverter.decrypt(findUser.password) === oldPassword) {
			const changePass = await User.updateOne({ _id: id }, { $set: { password: passConverter.encrypt(newPassword) } })
			return res.status(200).json({message: "successfully change password"})
		} else {
			return res.status(400).json({message: "Wrong old Password"})
		}
	} catch (error) {
		
		return res.status(400).json({message: "Wrong old Password"})
	}
}


