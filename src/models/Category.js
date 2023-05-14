const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category:{
        type:String
    },
    brand:{
        type:Array
    }
})

const Category = mongoose.model("Category", categorySchema)
module.exports = Category;