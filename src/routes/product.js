const express = require('express')
const route = express.Router()
const PdtDetail = require("./../models/productdetail")
const Category = require('../models/Category');
const Order = require('../models/Order')

route.get('/',(req,res)=>{
    res.send('hello from pdt side')
})

route.post('/post', async(req,res)=>{
    try {
        const {name,price,pimg, type, stock,detail} = req.body
        if(!name && !price && !pimg && !type && !stock && !detail){
            res.json("fill all the feilds")
        }
        else{
            const data = new PdtDetail({name,price,pimg,type,stock,detail,"dealofday":false,"sale":false})
            const savedata = await data.save()
            res.json(savedata)
        }
        
    } catch (error) {
        console.log(error)
    }
})
route.get('/get', async(req,res)=>{
    try {
        const data = await PdtDetail.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

route.delete('/delete/:id', async(req,res)=>{
    try {
        const data = await PdtDetail.findByIdAndRemove(req.params.id)
        // const dataa = await Tproduct.findOneAndRemove({"by":req.params.id})
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})
route.patch('/edit/:id', async(req,res)=>{
    try {
        const update = await PdtDetail.findByIdAndUpdate(req.params.id, req.body)
    } catch (error) {
        console.log(error)
    }
})


route.post('/category', async (req, res) => {
    try {
        const category = req.body.category
        // console.log(category)
        const excath = await Category.findOne({ "category": category })
        if (excath) {
            return res.json("already exists")
        } else {
            const data = new Category({ category })
            const savedata = await data.save()
            res.json(savedata)
        }

    } catch (error) {
        console.log(error)
    }
})
route.get('/category', async (req, res) => {
    try {
        const data = await Category.find()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})

route.delete('/category/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await Category.findByIdAndRemove(req.params.id)
        res.json(data)
    } catch (error) {
        console.log(error)
    }
})
route.patch('/dealofday/:id', async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"dealofday":true})
    res.json(dealupdate)
})
route.patch('/sale/:id', async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"sale":true})
    res.json(dealupdate)
})

route.patch('/nodealofday/:id', async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"dealofday":false})
    res.json(dealupdate)
})
route.patch('/nosale/:id', async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"sale":false})
    res.json(dealupdate)
})
route.patch('/topf/:id', async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"topf":true})
    res.json(dealupdate)
})
route.patch('/notopf/:id', async (req,res)=>{
    const dealupdate = await  PdtDetail.findByIdAndUpdate(req.params.id, {"topf":false})
    res.json(dealupdate)
})
route.get('/order', async (req, res) => {
    try {
        const order = await Order.find()
        res.json(order)

    } catch (error) {
        console.log(error)
    }

})
route.delete('/order/:id', async (req, res) => {

    try {
        console.log(req.params.id)
        const delorder = await Order.findByIdAndRemove(req.params.id)
        res.json(delorder)
    } catch (error) {
        console.log(error)
    }
})

module.exports = route