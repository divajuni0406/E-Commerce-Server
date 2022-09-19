const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    deleted: Boolean,
    name: String,
    birthdate: Date
})

const User = model('User', userSchema);

module.exports = User