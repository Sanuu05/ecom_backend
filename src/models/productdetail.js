const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types
const ProductSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pimg:{
        type:Array,
        required:true
    },
    type:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        require:true
    },
    highlight:{
        type:Array,


    },
    alldetail:{
        type:Array,
        

    },
    stock:{
        type:Number,
        require:true
    },
    discount:{
        type:Number,
        require:true
    },
    detail:{
        type:String,
        require:true
    },
    dealofday:{
        type:Boolean,
        default:false
    },
    sale:{
        type:Boolean,
        default:false
    },
    topf:{
        type:Boolean,
        default:false
    },buyer:[{
        by:{type:ObjectId, ref:"Normal"}
    }]
})

const Productdetail = mongoose.model('Productdetail',ProductSchema)
module.exports= Productdetail;