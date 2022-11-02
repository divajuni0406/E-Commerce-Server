const { Product } = require('../models/index')
const { uploader } = require('../helper/uploader')
const fs = require('fs')
const multer = require('multer')

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

const createProduct = (req, res) => {
    const path = '/product/images'
    const upload = uploader(path, 'PRODUCT').fields([{ name: 'images' }]) 
    upload(req, res, async (err) => {
        if(err) return res.status(500).json({message: "Failed"})
        const { name, detail, summary, category, recommendation, price, discountId, size, deleted } = req.body
        const imagesLink = req.body.imagesLink
        const { images } = req.files
        try {
        if (!images) {
            const img = imagesLink
            const dataProduct = {
                name: name,
                detail: detail,
                summary: summary,
                category: category,
                recommendation: recommendation,
                price: price,
                images: img,
                size: size
            }
            const addProduct = await Product.create(dataProduct)
                res.json({
                    message: "succesfull",
                    result: addProduct
                })
  
        } else {
            const imagesFile = images.map(element => {
                return `${path}/${element.filename}`
            });
            const imgMix = imagesFile.concat(imagesLink)
            const dataProduct = {
                name: name,
                detail: detail,
                summary: summary,
                category: category,
                recommendation: recommendation,
                price: price,
                images: imgMix,
                size: size
            }
                const addProduct = await Product.create(dataProduct)
                res.json({
                    message: "succesfull",
                    result: addProduct
                })
            }
        } catch (error) {
            res.send({err})
        }
    })
    
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

const updateImgProduct = (req, res) => {
    const path = '/product/images'
    const upload = uploader(path, 'PRODUCT').fields([{ name: 'images' }])
    upload(req, res, async (err) => {
        if(err) return res.status(500).json({message: "ada yang salah"})
        const id = req.params.id
        const { name, detail, summary, category, recommendation, price, discountId, size, deleted } = req.body
        const imagesLink = req.body.images
        const { images } = req.files
        try {
            if (!images) {
                const img = imagesLink
                const dataProduct = {
                    name: name,
                    detail: detail,
                    summary: summary,
                    category: category,
                    recommendation: recommendation,
                    price: price,
                    images: img,
                    size: size
                }
                const addProduct = await Product.updateOne({ _id: id }, { $set: dataProduct }, { new: true })
                    res.status(200).json({
                        message: "succesfull",
                        result: addProduct
                    })
            } else {
                const imagesFile = images.map(element => {
                    return `${path}/${element.filename}`
                });
                const imgMix = imagesFile.concat(imagesLink)
                const dataProduct = {
                    name: name,
                    detail: detail,
                    summary: summary,
                    category: category,
                    recommendation: recommendation,
                    price: price,
                    images: imgMix,
                    size: size
                }
                    const addProduct = await Product.updateOne({ _id: id }, { $set: dataProduct }, { new: true })
                    res.json({
                        message: "succesfull",
                        result: addProduct
                    })
                
            }
        } catch (error) {
            res.send(error)
        }
    })
}

const editProduct = async (req, res) => {
   res.send("okey")
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
    getAllProduct,
    createProduct,
    getProductById,
    deleteProduct,
    editProduct,
    findProductCategory,
    searchProduct,
    updateImgProduct
}