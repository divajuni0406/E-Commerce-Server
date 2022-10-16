const Mongoose = require('mongoose')

const mailSchema = new Mongoose.Schema({
    email:{type: String}
})

const Mail = Mongoose.model('Mail', mailSchema);

module.exports = Mail