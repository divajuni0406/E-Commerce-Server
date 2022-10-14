const mailer = require('nodemailer')

const transporter = mailer.createTransport({
    service:'gmail',
    auth:{
        user:'idhamdummy1@gmail.com',
        pass:'ygmtqbosnfqpcafq'
    },
    tls:{
        rejectUnauthorized:false
    }
})


module.exports = transporter