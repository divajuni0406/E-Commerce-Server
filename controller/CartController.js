const { Cart, CartDetail } = require('../models')
const { ObjectId } = require('mongodb')

const getCart=async(req,res)=>{
    let userId = req.params.userId
    try {
        const getCart = await Cart.findOne({userId:userId, status:'unpaid'})
        if(getCart){
            const carts = await CartDetail.aggregate([
                {$match:{cartId:getCart._id}},
                {$lookup:{
                    from:'products',
                    localField:'productId',
                    foreignField:'_id',
                    as:'product'
                }}
            ])
            
            carts.forEach((val)=>{
                val.timestamp = ObjectId(val._id).getTimestamp()
            })
            return res.status(200).json({carts:carts})
        }
        return res.json({message:'no cart', carts:[]})
    } catch (error) {
        console.log('error test', error)
        res.status(500).json({message:error})        
    }
}



const postCart=async(req,res)=>{
    try {
        let {productId, quantity, userId, size} = req.body
        let cartIsAvailable = await Cart.findOne({userId:userId, status:'unpaid'})

            if(!cartIsAvailable){
                cartIsAvailable = await Cart.create({userId:userId, status:'unpaid'})
            }

            
        let dataDetail = {
            cartId:cartIsAvailable._id,
            productId,quantity,size
        }

        await CartDetail.create(dataDetail)
        const carts = await CartDetail.aggregate([
            {$match:{cartId:cartIsAvailable._id}},
            {$lookup:{
                from:'products',
                localField:'productId',
                foreignField:'_id',
                as:'product'
            }}
        ])
        return res.status(201).json({message:'post cart berhasil', carts:carts})
    } catch (error) {
        console.log(error)
    }
}

const changeQtyProductInCart=async(req,res)=>{
    const { cartId, productId, quantity, size } = req.body

    console.log('masuk', cartId, productId, quantity, size)

    try {
        await CartDetail.findOneAndUpdate({cartId, productId,size}, {$set:{quantity:quantity}})
        res.json({message:'berhasil update'})
    } catch (error) {
        console.log(error, 'error')
    }
}

const deleteProductInCart=async(req,res)=>{
    const { cartId, productId, size } = req.body
    try {
        await CartDetail.findOneAndRemove({cartId, productId, size})
        res.json({message:'berhasil delete'})
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getCart,postCart,changeQtyProductInCart,deleteProductInCart
}