const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.port || 5000
const router = require('./routes/index')


app.use(router)


app.listen(port, ()=>{
    console.log(`listen on port ${port}`)
})