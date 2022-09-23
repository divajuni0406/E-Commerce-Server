const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.port || 5000
const router = require('./routes/index')
const { main } = require('./config/mongodb')
const cors = require('cors')


app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors())


app.use(router)


main()
.then(()=>{
    app.listen(port, function () {
        console.log(`server is running in port: ${port}`)
    })
})
.catch((err)=>{
    console.log(err)
})