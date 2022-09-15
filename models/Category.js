const { model, Schema } = require('mongoose')

const categorySchema = new Schema({
    categoryName:Schema.Types.ObjectId,
})

const Category = model('Category', categorySchema);

module.exports = Category