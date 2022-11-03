const Mongoose = require("mongoose");

const bannerSchema = new Mongoose.Schema({
    image: { type: String },
    active: { type: Boolean },
    deleted:{ type: Boolean }
})

const Banner = Mongoose.model('Banner', bannerSchema);

module.exports = Banner