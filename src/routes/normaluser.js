const express = require("express")
const route = express.Router()
const Normal = require("../models/NormalUser")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const Razorpay = require("razorpay");
const crypto = require('crypto')
const Order = require('../models/Order')
const Productdetail = require('../models/productdetail')

// signup 
route.get('/',()=>{
    res.json("hello normal")
})
route.post('/signup', async (req, res) => {
    try {
        const { name, email, password, cpassword, mobile } = req.body
        if (!name) {
            return res.status(400).json({
                msg: "enter name"
            })
        }
        if (!email) {
            return res.status(400).json({
                msg: "enter email"
            })
        } if (!mobile) {
            return res.status(400).json({
                msg: "enter mobile number"
            })
        }
        if (!password) {
            return res.status(400).json({
                msg: "enter password"
            })
        }
        if (!cpassword) {
            return res.status(400).json({
                msg: "enter confirm password"
            })
        }
        const user = await Normal.findOne({ email })
        if (user) {
            return res.status(400).json({
                msg: "user exists"
            })
        }
        if (password !== cpassword) {
            return res.status(400).json({
                msg: "enter the same password"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const userRes = new Normal({
            name,
            email,
            password: hashPassword,
            mobile

        })
        const userSave = await userRes.save()
        console.log(userSave)
        res.json("signup sucesfully")
    } catch (error) {
        console.log(error)
    }
})

// login 

route.post('/login', async (req, res) => {
    try {
        // console.log(req.body)
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({
                msg: "fill the email feild"
            })
        }
        if (!password) {
            return res.status(400).json({
                msg: "fill the password feild"
            })
        }
        const exuser = await Normal.findOne({ email })
        if (!exuser) {
            return res.status(400).json({
                msg: "user does not exits"
            })
        }
        const isMatch = await bcrypt.compare(password, exuser.password)
        if (!isMatch) {
            return res.status(400).json({
                msg: "details doesnt match"
            })
        }
        const token = await jwt.sign({ id: exuser._id }, process.env.SEC_KEY)
        // console.log(token)
        exuser.password = undefined
        console.log(token)
        res.json({
            token,
            user: exuser
        })

    } catch (error) {
        console.log(error)
    }

})
//getuser

route.get('/getuser', auth, async(req,res)=>{
    try {
        const userRes = await Normal.findById(req.user)
        if (!userRes) {
            return res.status(400).json({
                msg: "not auth user"
            })
        }
        res.json({
            user:userRes
        })
        
    } catch (error) {
        console.log(error)
    }
})
route.post("/orders", async (req, res) => {
    try {
        console.log("body",req.body)
        const instance = new Razorpay({
            key_id: "rzp_test_fvOAKuvkkgRaoU",
            key_secret: "dbY34WVDWmoEItESZTx3qWMV",
        });

        const options = {
            amount: (req.body.total+(req.body.total*0.05) )* 100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
        
    } catch (error) {
        res.status(500).send(error);
    }
});
route.post("/success",auth ,async (req, res) => {
    try {
        // getting the details back from our font-end
        console.log("sucess", req.body)
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        console.log(req.body.totaldata.totalcart
            )

        const shasum = crypto.createHmac("sha256", "dbY34WVDWmoEItESZTx3qWMV");
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });
        
        const neworder = new Order({
            customerDetail:req.body.totaldata.user,
            customerOrder:req.body.totaldata.totalcart,
            totolPrice:req.body.totaldata.total,
            paymentstatus:true
        })
        const saveorder = await neworder.save()
        const buyuser = await Normal.findById(req.user)
        const buyer = {
            by: buyuser
        }
        req.body.totaldata.totalcart.map(async (val, index) => {
            // console.log(val)

            const user = await Productdetail.findById(val.cartitem)
            const update = await Productdetail.findByIdAndUpdate(val.cartitem, {
                stock: user.stock - val.qyt
            }, { new: true })
            const paybuyer = await Productdetail.findByIdAndUpdate(val.cartitem, {
                $push: {
                    buyer: buyer
                }
            })
            const buyitem={
                data: val
            }
            const buyitems = await Normal.findByIdAndUpdate(req.user, {
                $push: {
                    buyitem: buyitem
                }
            },{
                new:true
            })
            // console.log(buyitems)
            // console.log(index,user)

        })
        res.json({
            msg: "success", 
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
route.get('/orderitem',auth, async(req,res)=>{
    try {
        console.log(req.user)
        const data = await Normal.findById(req.user)
        res.json(data)
        console.log(data)
    } catch (error) {
        console.log(error)
    }
})



module.exports = route