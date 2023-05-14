const PdtDetail = require("../models/productdetail")
const Category = require('../models/Category');
const Order = require('../models/Order')
const Coupons = require('../models/Coupons')
const Pincode = require('../models/Pincode')

//TODO : Post Product Data

exports.postData= async(req,res)=>{
    try {
        const {name,price,pimg, type, stock,detail,highlight,alldetail,discount,brand} = req.body
        if(!name && !price && !pimg && !type && !stock && !detail && !brand){
            res.json("fill all the feilds")
        }
        else{
            const data = new PdtDetail({name,price,pimg,type,stock,detail,"dealofday":false,"sale":false,alldetail,highlight,discount,brand})
            const savedata = await data.save()
            res.json(savedata)
        }
        
    } catch (error) {
        console.log(error)
    }
}

//TODO : Get Product Data

exports.getData= async(req,res)=>{
    try {
        const data = await PdtDetail.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
//TODO : Delete Product Data
exports.deleteById = async(req,res)=>{
    try {
        const data = await PdtDetail.findByIdAndRemove(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

//TODO : Edit Product Data 

exports.editProduct=async(req,res)=>{
    console.log('ccc',req.body)
    try {
        const update = await PdtDetail.findByIdAndUpdate(req.params.id, req.body)
    } catch (error) {
        console.log(error)
    }
}
//TODO : Add Category Data 
exports.addCategory=async (req, res) => {
    try {
        const category = req.body.category
        // console.log(category)
        const excath = await Category.findOne({ "category": category })
        if (excath) {
            return res.json("already exists")
        } else {
            const data = new Category({ "category":category })
            const savedata = await data.save()
            res.json(savedata)
        }

    } catch (error) {
        console.log(error)
    }
}
//TODO : Update Category Data 
exports.updateCategory=async (req, res) => {
    try {
        const {category,brand} = req.body
        console.log(req.body)
        if(category==''){
            return res.status(400).json('choose category')
        }
        const excath = await Category.findOne({ "category": category })
        console.log(excath)
        if (excath) {
            const categoryFind= await Category.findOneAndUpdate({"category": category},{
                $addToSet:{
                    'brand':brand
                }
            },{
                new:true
            })
            console.log('done',categoryFind)
        } 

    } catch (error) {
        console.log(error)
    }
}
//TODO : Get category Data 
exports.getCategory= async (req, res) => {
    try {
        const data = await Category.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

//TODO : Delete category Data 
exports.deleteCategory= async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await Category.findByIdAndRemove(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}



//TODO : Post PinCode Data 

exports.postPincode=async (req, res) => {
    try {
        const {pincode,time} = req.body
        
        const excath = await Pincode.findOne({ "pincode": pincode })
        if (excath) {
            return res.json("already exists")
        } else {
            const data = new Pincode({ pincode,time })
            const savedata = await data.save()
            res.json(savedata)
        }

    } catch (error) {
        console.log(error)
    }
}

//TODO : Get PinCode Data 
exports.getPincode= async (req, res) => {
    try {
        const data = await Pincode.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
//TODO : Delete PinCode Data 
exports.deletePincode= async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await Pincode.findByIdAndRemove(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}

//TODO:Add to  Deal of the Day
exports.dealOfDay= async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"dealofday":true})
    res.json(dealupdate)
}
//TODO:Add to  Sale
exports.sale=async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"sale":true})
    res.json(dealupdate)
}
//TODO:Remove from  Deal of the Day
exports.removeDealOfDay=async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"dealofday":false})
    res.json(dealupdate)
}
//TODO:Remove from  Sale
exports.removeSale= async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"sale":false})
    res.json(dealupdate)
}
//TODO:Add to  TOPSale

exports.topSale= async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"topf":true})
    res.json(dealupdate)
}
//TODO:Remove from  TOPSale
exports.removeTopSale=async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"topf":false})
    res.json(dealupdate)
}

//TODO:Orders Data
exports.addOrder= async (req, res) => {
    try {
        const order = await Order.find()
        res.json(order)

    } catch (error) {
        console.log(error)
    }

}

//TODO: Delete Order Data
exports.deleteOrder=async (req, res) => {

    try {
        console.log(req.params.id)
        const delorder = await Order.findByIdAndRemove(req.params.id)
        res.json(delorder)
    } catch (error) {
        console.log(error)
    }
}

//TODO:Add Coupons
exports.addCoupons=async(req,res)=>{
    try {
        const {name, discount} = req.body
        if(name && discount){
        const findx = await Coupons.findOne({name})
        if(findx){
            res.status(400).json("Code already exist")
        }else{
            const newdata = new Coupons({
                name,
                discount
            })
            const savedata = await newdata.save()
            res.json('coupons added succesfully')
        }
    }else{
        res.status(400).json('fill all fields')
    }

       console.log({name,discount})
    } catch (error) {
        
    }
}
//TODO:GET Coupon

exports.getCoupons= async(req,res)=>{
    try {
        const {name} = req.params
        const findx = await Coupons.findOne({name})
        if(findx){
            res.json(findx)
        }else{
            res.status(400).json('Coupons not valid')
        }
    } catch (error) {
        console.log('error')
    }
}
