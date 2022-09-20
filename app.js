const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const port = process.env.port || 5000
const router = require('./routes/index')
const cors = require('cors')


app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)


app.listen(port, ()=>{
    console.log(`listen on port ${port}`)
})
const mongoConnection = require('./config/mongodb')
mongoConnection()

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })