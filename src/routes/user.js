const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')
const {signUp,Login,getUser,Orders,Success,orderItem,Address}  = require('../controller/normaluser') 

route.post('/signup',signUp)
route.post('/login',Login)
route.get('/getuser',auth,getUser)
route.post('/orders',Orders)
route.post('/success',auth,Success)
route.get('/orderitem',auth,orderItem)
route.patch('/address',auth,Address)


module.exports = route