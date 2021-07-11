const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    customerDetail:{type:Object, required:true},
    customerOrder:{type:Array, required:true},
    totolPrice:{type:Number, required:true},
    paymentstatus:{type:Boolean, required:true}
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order