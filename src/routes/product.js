const express = require('express')
const route = express.Router()

const {postData,getData,deleteById,editProduct,addCategory,deletePincode,getPincode,getCategory,postPincode,deleteCategory, dealOfDay, sale, removeDealOfDay, removeSale, topSale, removeTopSale, addOrder, deleteOrder, addCoupons, getCoupons} = require('../controller/product')

route.post('/post',postData)
route.get('/get',getData)
route.delete('/delete/:id',deleteById)
route.patch('/edit/:id',editProduct)
route.post('/category',addCategory)
route.get('/category',getCategory)
route.delete('/category/:id',deleteCategory)
route.post('/pincode',postPincode)
route.get('/pincode',getPincode)
route.delete('/pincode/:id',deletePincode)
route.patch('/dealofday/:id',dealOfDay)
route.patch('/sale/:id',sale)
route.patch('/nodealofday/:id',removeDealOfDay)
route.patch('/nosale/:id',removeSale)
route.patch('/topf/:id',topSale)
route.patch('/notopf/:id',removeTopSale)
route.get('/order',addOrder)
route.delete('/order/:id',deleteOrder)
route.post('/coupons',addCoupons)
route.get('/coupons/:name',getCoupons)

module.exports = route



