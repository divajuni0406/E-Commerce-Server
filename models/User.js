const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username must not empty'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password must not empty'],
        minLength: [7, 'Password must have at least 7 character'],
    },
    email: {
        type: String,
        required: [true, 'Email must not empty'],
        lowercase: true,
        trim: true,
    },
    role: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        trim: true,
        required: [true, 'Name must not empty'],
    },
    birthdate: {
        type: Date,
        validate: {
            validator: (doc) => new Date(doc).getTime() < Date.now(),
            message: 'Birthdate must earlier than today',
        },
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const User = model('User', userSchema);

module.exports = User;
