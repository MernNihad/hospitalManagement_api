const express = require('express')
const app = express()
const port = 4000


const adminRoute = require('../routes/adminRoute')
const { connectMongo } = require('../config/config')
const errorHandler = require('../middleware/errorHandle')

const startup = async () => {
  await connectMongo()
}

startup()


// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// routes
app.use('/admin', adminRoute)

app.use(errorHandler)
// loisten port
app.listen(port, () =>console.log(`Example app listening on port ${port}`))