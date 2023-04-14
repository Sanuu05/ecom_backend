require('dotenv').config()
const express = require('express')
const app = express()
port = process.env.PORT || 1988
const normal = require('./routes/user')
const cart = require('./routes/cart')
const product = require('./routes/product')
const db = require('./db/db')

const cors = require('cors')


app.use(express.json())
app.use(cors())
app.use('/pdt', product)
app.use('/normal',normal)
app.use('/cart',cart)
app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})