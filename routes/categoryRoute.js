const route = require('express').Router()
const { getAllCategory, addCategory, editCategory,deleteCategory } = require('../controller/CategoryController')

route.get('/category', getAllCategory)
route.post ('/add-category', addCategory)
route.patch('/edit-category/:id', editCategory)
route.delete('/delete-category/:id', deleteCategory)

module.exports = route