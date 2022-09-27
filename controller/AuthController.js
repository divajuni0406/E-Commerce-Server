const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Cryptr = require("cryptr");
const SecretKey = "secretKey";
const passConverter = new Cryptr(SecretKey);

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: passConverter.encrypt(req.body.password),
            name: req.body.name,
            birthdate: req.body.birthdate,
        });

        const token = jwt.sign(
            { username: newUser.username, email: newUser.email, id: newUser._id },
            process.env.JWT_SECRET
        );

        newUser.password = undefined;

        res.status(200).json({
            status: 'success',
            token,
            newUser,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,
        });
    }
};
