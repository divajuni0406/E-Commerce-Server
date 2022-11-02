const route = require('express').Router()
const {
    createBanner,
    updateBanner,
    findBannerById,
    deleteBanner,
    getAllBanner
} = require('../controller/BannerController')

route.post('/api/banner/create-banner', createBanner)
route.patch('/api/banner/update-banner/:id', updateBanner)
route.get('/api/banner/:id', findBannerById)
route.delete('/api/banner/delete/:id', deleteBanner)
route.get('/api/banners/all', getAllBanner)


module.exports = route