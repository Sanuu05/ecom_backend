require('dotenv').config()
const express = require('express')
const app = express()
port = process.env.PORT || 1988
const db = require('./db/db')
const pdt = require('./routes/product')
const cors = require('cors')
const normal = require('./routes/normaluser')
const cart = require('./routes/cart')

app.use(express.json())
app.use(cors())
app.use('/pdt', pdt)
app.use('/normal',normal)
app.use('/cart',cart)
app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})