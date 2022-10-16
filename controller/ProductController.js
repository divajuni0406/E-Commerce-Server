const { Product } = require('../models/index')

const getAllProduct = async (req, res) => {
    try {
        let product = await Product.find()
        res.status(200).json({
            statusCode: 200,
            message: 'successfully get data',
            result: product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            statusCode: 500,
            message: 'failed to get data'
        })
    }
}

const createProduct = async (req, res) => {

    const { name, detail, summary, category, recommendation, price, discountId, images, size, deleted } = req.body
    const dataProduct = {
        name: name, detail: detail, summary: summary, category: category, recommendation: recommendation, price: price, discountId: discountId, images: images, size: size, deleted: deleted, category
    }
    try {
        const addProduct = await Product.create(dataProduct)
        res.status(200).json({
            message: "successfully create data"
        })
    } catch (error) {
        res.status(500).json({ message: 'failed to create data' })
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findById({ _id: id })
        res.status(200).json(
            {
                statusCode: 200,
                message: 'successfully get data',
                product: product
            })
    } catch (error) {
        res.status(500).json({ message: 'failed to get data' })
    }
}

const editProduct = async (req, res) => {
    const data = req.body
    // const { name, detail, thumbnail, recommendation, price, images, deleted } = req.body
    // const dataProduct = {
    //     name: name, detail:detail, thumbnail: thumbnail, recommendation: recommendation, price: price, discountId: discountId, images: images, deleted: deleted
    // }
    const id = req.params.id
    try {
        const editedProduct = await Product.updateOne({ _id: id }, { $set: data })
        res.status(201).json({ message: 'successfully edit data', data: editedProduct })
    } catch (error) {
        res.status(500).json({ message: "failed edit data" })
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    try {
        const deletedProduct = await Product.findByIdAndDelete({ _id: id })
        res.status(401).json({ message: 'successfully delete data', deletedProduct: deletedProduct })
    } catch (error) {
        res.status(500).json({ message: 'failed to delete data' })
    }
}

const findProductCategory = async (req, res) => {
    const { category } = req.body;
    try {
        const findProducts = await Product.find({ category: { $regex: new RegExp(category, "i") } })
        if (findProducts) {
            res.send({ message: "Successfull to get product by category", statusCode: 200, result: findProducts })
        } else {
            res.status(404).send({ message: "Products Not Found" })
        }
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error)
    }
}

const searchProduct = async (req, res) => {
    const { search } = req.body;
    try {
        const searchProduct = await Product.find({ $text: { $search: search } })
        if (searchProduct) {
            res.send({ message: "Successfull to get products", statusCode: 200, result: searchProduct })
        } else {
            res.status(404).send({ message: "Products Not Found" })
        }
    } catch (error) {
        res.status(500).send(error.message)
        console.log(error)
    }
}

module.exports = {
    getAllProduct, createProduct, getProductById, deleteProduct, editProduct, findProductCategory, searchProduct
}