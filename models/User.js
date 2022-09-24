const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    username:{type: String, require: true},
    password:{type: String, require: true},
    email:{type: String, require: true},
    role:{type: String},
    deleted:{type: Boolean}
})

const User = Mongoose.model('User', userSchema);

module.exports = User