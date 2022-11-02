const { Blog } = require('../models')

const getAllArticle = async (req, res) => {


    if (req?.query?.page === undefined) {
        try {
            const getAlldata = await Blog.find()

            res.status(200).json({
                message: "successfully get data",
                result: getAlldata
            })
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "faile to get data" })
        }
    }
    else {
        const page = req?.query?.page || 1
        const limitBlog = 5

        console.log("page", page)

        const countBlog = await Blog.count()
        const maxPage = Math.ceil(countBlog / limitBlog)
        console.log("maxPage", maxPage)

        const pageStartOne = parseInt(page) === 1 ? 0 * limitBlog : page * limitBlog - limitBlog

        try {
            const getAlldata = await Blog
                .find()
                .skip(pageStartOne)
                .limit(limitBlog)

            res.status(200).json({
                message: "successfully get data",
                result: getAlldata,
                maxPage
            })
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: "faile to get data" })
        }
    }
}


const createArticle = async (req, res) => {
    const data = req.body
    const dataArticle = {
        title: data.title,
        content: data.content,
        category: data.category,
        tag: data.tag,
        image: data.image
    }
    try {
        const createData = await Blog.create(dataArticle)
        res.status(200).json({
            message: "succesfully create data"
        })
    } catch (error) {
        console.log(error);
        res.send({ message: error })
    }
}

const getArticleById = async (req, res) => {
    const id = req.params.id
    try {
        const getDataById = await Blog.findById({ _id: id });
        res.status(200).json({
            message: "successfully get data",
            result: getDataById
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "faile to get data" })
    }
}

const editArticleById = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const editData = await Blog.updateOne({ _id: id }, { $set: data })
        res.status(200).json({
            message: "successfully edit data",
            result: editData
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "failed to edit data" })
    }
}

const deleteArticle = async (req, res) => {
    const id = req.params.id
    try {
        const deletById = await Blog.findByIdAndDelete({ _id: id });
        res.status(200).json({
            message: "successfully delete data"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "failed to delete data" })
    }
}


module.exports = { getAllArticle, createArticle, getArticleById, editArticleById, deleteArticle }