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
    
    const { name, detail, thumbnail, recommendation, price, discountId, images, deleted } = req.body
    const dataProduct = {
        name: name, detail:detail, thumbnail: thumbnail, recommendation: recommendation, price: price, discountId: discountId, images: images, deleted: deleted
    }
    try {
        const addProduct = await Product.create(dataProduct)
        const getdata = await Product.find()
        res.status(200).json({
            message: "successfully create data",
        })
    } catch (error) {
        res.status(500).json({message: 'failed to create data'})
    }
}

const getProductById = async (req, res) =>{
    const  id  = req.params.id
    try {
        const product = await Product.findById({ _id:id })
        res.status(200).json(
            {
                statusCode: 200,
                message: 'successfully get data',
                product: product
            })
    } catch (error) {
        res.status(500).json({message: 'failed to get data'})
    }
}
const deleteProduct = async( req, res) => {
    const id = req.params.id
    try {
        const deletedProduct = await Product.findByIdAndDelete({ _id:id })
        res.status(401).json({message:'successfully delete data', deletedProduct:deletedProduct})    
    } catch (error) {
        res.status(500).json({message: 'failed to delete data'})
    }
}


module.exports = {
    getAllProduct , createProduct, getProductById, deleteProduct
}