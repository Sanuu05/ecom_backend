const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
})

const Coupons = mongoose.model('Coupons', orderSchema)
module.exports = Coupons