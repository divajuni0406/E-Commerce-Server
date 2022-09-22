const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.username,
            password: req.body.password,
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
