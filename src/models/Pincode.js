const mongoose = require('mongoose')

const PincodeSchema = mongoose.Schema({
    pincode:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    }
})

const Pincode = mongoose.model("Pincode", PincodeSchema)
module.exports = Pincode;