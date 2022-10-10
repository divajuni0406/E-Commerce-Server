const route = require('express').Router()
const { createArticle,getAllArticle,getArticleById,editArticleById,deleteArticle } = require('../controller/BlogController')


route.post('/api/blog/create-article', createArticle);
route.get('/api/blog/articles', getAllArticle);
route.get('/api/blog/articles/:id', getArticleById);
route.patch('/api/blog/articles/update/:id', editArticleById);
route.delete('/api/blog/articles/delete/:id', deleteArticle);
module.exports = route