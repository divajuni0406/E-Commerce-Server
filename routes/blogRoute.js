const route = require('express').Router()
const { createArticle,getAllArticle,getArticleById,editArticleById,deleteArticle } = require('../controller/BlogController')
const { authApiAdmin } = require('../controller/authorizeRoutes')


route.post('/api/blog/create-article', authApiAdmin, createArticle);
route.get('/api/blog/articles', getAllArticle);
route.get('/api/blog/articles/:id', getArticleById);
route.patch('/api/blog/articles/update/:id', authApiAdmin, editArticleById);
route.delete('/api/blog/articles/delete/:id', authApiAdmin, deleteArticle);
module.exports = route