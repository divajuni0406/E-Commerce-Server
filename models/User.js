const { model, Schema } = require('mongoose')

const userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    role:String,
    deleted:Boolean
})

const User = model('User', userSchema);

module.exports = User