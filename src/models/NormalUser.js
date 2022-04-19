const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types

const normalSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    
    buyitem:[{
        data:{
            type:Object
        }
        
    }],
    address:{
        type:Array
    }
})

const Normal = mongoose.model("Normal", normalSchema)
module.exports = Normal