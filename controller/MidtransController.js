const { Cart, PaymentTransaction } = require('../models')

const midtransClient = require('midtrans-client');
let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction : false,
    serverKey : 'SB-Mid-server-4B4yXVIv1C80XmqtjbePLmAM'
})



const getToken=async(req,res)=>{
    const { userId, total_order } = req.body
    try {
        const cart = await Cart.findOne({userId:userId, status:'unpaid'})
        let parameter = {
            "transaction_details": {
                "order_id": cart._id,
                "gross_amount": total_order
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "userId":"userId"
            }
        };

        const tokenDb = await PaymentTransaction.findOne({order_id:cart._id})

        if(!tokenDb){
            snap.createTransaction(parameter)
            .then(async(transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
                await PaymentTransaction.create({order_id:cart._id, token:transactionToken, total_order})
                console.log('transactionToken:',transactionToken);
                res.json(transactionToken)
            })
        }else{
            console.log('token udah ada')
            res.json(tokenDb.token)
        }

    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getToken
}