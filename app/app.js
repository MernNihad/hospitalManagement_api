const express = require('express')
const app = express()
const port = 4000
const db = require('../mongodb/connection')
const userRoute = require('../routes/userRoute')
const adminRoute = require('../routes/adminRoute')
const errorHandler = require('../middleware/user/userErrorHandle')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', userRoute )
app.use('/admin', adminRoute)

app.use(errorHandler)


// app.post('/signup', (req, res) => {
//   // db.collection('user').insertOne({name:'nihad'})
//   console.log(req.body,'post request data')
// res.send('Hello World!, Home Page')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})