const route = require('express').Router()
const {
    createBanner,
    updateBanner,
    findBannerById,
    deleteBanner,
    getAllBanner
} = require('../controller/BannerController')
const { authApiAdmin } = require('../controller/authorizeRoutes')


route.post('/api/banner/create-banner', authApiAdmin,createBanner)
route.patch('/api/banner/update-banner/:id', authApiAdmin,updateBanner)
route.get('/api/banner/:id', authApiAdmin,findBannerById)
route.delete('/api/banner/delete/:id', authApiAdmin,deleteBanner)
route.get('/api/banners/all', getAllBanner)


module.exports = route