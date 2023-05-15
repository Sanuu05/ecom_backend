const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')
const { getData, postData,deleteById,deleteAfterOrder }= require('../controller/cart')

route.post('/post',auth,postData)
route.get('/get',auth,getData)
route.delete('/del/:id',auth,deleteById)
route.delete('/delete',auth,deleteAfterOrder)


module.exports = route


