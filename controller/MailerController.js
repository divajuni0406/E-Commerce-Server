const { Mail } = require('../models')
const transporter = require('../helper/mailer')
const newMail=async(req,res)=>{
    const { email } = req.body
    try {
        const findEmail = await Mail.findOne({email:email})

        if(findEmail) return res.status(200).json({message:'already subs'})

        const postEmail = await Mail.create({email})

        const mailBody = {
            from:'TEAM 1 FSW 23 C10 <idhamdummy1@gmail.com>',
            to:email,
            subject:`congrats succeed subs to soberfsw23 `,
            html:`thanks for subs on soberfsw23, stay with us for the good deals`
        }

        transporter.sendMail(mailBody, (err, result)=>{
            if(err){
                console.log(err)
                return res.status(500).json({status:'error', message:err})
            }else{
                return res.status(200).json({message:'success subs', data:postEmail, result:result})
            }
        })

        
    } catch (error) {
        console.log(error)        
    }
}



module.exports = {
    newMail
}