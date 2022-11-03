const { Blog } = require('../models')
const path = '/blog/images'
const {uploader} = require('../helper/uploader')
const upload = uploader(path, 'BLOG').single('image')


const getAllArticle = async (req, res) => {
    try {
        const getAlldata = await Blog.find()
        res.status(200).json({
            message: "successfully get data",
            result: getAlldata
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "faile to get data"})
    }
}


const createArticle = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ message: "Image must one" })
    })
        
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
        res.send({message:error})
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
        res.status(404).json({message: "faile to get data"})
    }
}

const editArticleById = async (req, res) => {
    const id = req.params.id
    const data = req.body
    try {
        const editData = await Blog.updateOne({ _id: id }, {$set:data})
        res.status(200).json({
            message: "successfully edit data",
            result: editData
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "failed to edit data"})
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
        res.status(404).json({message: "failed to delete data"})
    }
}


module.exports = {getAllArticle,createArticle,getArticleById,editArticleById,deleteArticle}