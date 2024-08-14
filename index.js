const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const vendorRoutes = require('./routes/vendorRoutes')
const bodyParser = require('body-parser')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes = require('./routes/productRoutes')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 4100

dotEnv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected Sucessfully")
})
.catch((error)=>{
    console.log(error)
})

app.use(bodyParser.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uplaods',express.static('uploads'))  //standard format//


app.listen(PORT,()=>{
    console.log(`Server started and Running at ${PORT}`)
})

app.use('/',(req,res)=>{
    res.send("<h1> Welcome to FoodRush </h1>")
})
