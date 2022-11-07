const { Banner } = require('../models')
const path = '/banner/images'
const { uploader } = require('../helper/uploader')
const upload = uploader(path, 'BANNER').single('image')

const createBanner = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ message: "Image must one" })
        try {
            const image = req.file
            const imgLink = req.body.image
            if (!image) {
                if(!req.body.image && !req.body.active){throw Error}
                const data = {
                    image: imgLink,
                    active: req.body.active
                }
                const addBanner = await Banner.create(data)
                res.status(200).json({
                    message: "succes create",
                    result: addBanner
                }) 
            } else {
                const imgBanner = `https://api-v2-sober.herokuapp.com/${path}/${image.filename}`
                const data = {
                    image: imgBanner,
                    active: req.body.active
                }
               
                const addBanner = await Banner.create(data)
                res.status(200).json({
                    message: "succes create",
                    result: addBanner
                })
            }
        } catch (error) {
            res.status(500).json({ message: "failed Create Banner" })
        }
    })
}

const updateBanner = (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(500).json({ message: "Image must one" })
        try {
            const id = req.params.id
            const image = req.file
            const imgLink = req.body.image
            if (!image) {
                if(!req.body.image && !req.body.active){throw Error}
                const { active } = req.body
                const data = {
                    image: imgLink,
                    active: active
                }
                const editBanner = await Banner.updateOne({ _id: id }, { $set: data }, { new: true })
                res.status(200).json({
                    message: "succes update",
                    result: editBanner
                })
            } else {
                if(!req.body.active){throw Error}
                const imgBanner = `http://localhost:5000${path}/${image.filename}`
                const { active } = req.body
                const data = {
                    image: imgBanner,
                    active: active
                }
                const editBanner = await Banner.updateOne({ _id: id }, { $set: { active:active, image: imgBanner } }, { new: true })
                res.status(200).json({
                    message: "succes update",
                    result: editBanner
                })
            }
        } catch (error) {
            res.status(500).json({ message: "failed Update Banner" })
        }
    })
}

const deleteBanner = async (req, res) => {
    const id = req.params.id
    try {
        const deleteBanner = await Banner.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: 'successfully delete data', deletedProduct: deleteBanner })
    } catch (error) {
        res.status(500).json({ message: 'failed to delete data' })
    }
}

const findBannerById = async (req, res) => {
    const id = req.params.id
    try {
        const findBanner = await Banner.findById({ _id: id })
        res.status(200).json(
            {
                statusCode: 200,
                message: 'successfully get data',
                product: findBanner
            })
    } catch (error) {
        res.status(500).json({ message: 'failed to get data' })
    }
}

const getAllBanner = async (req, res) => {
    try {
        const getBanner = await Banner.find()
        res.status(200).json({
            statusCode: 200,
            message: 'successfully get data',
            result: getBanner
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            statusCode: 500,
            message: 'failed to get data',
            result: error
        })
    }
}
module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    findBannerById,
    getAllBanner
}