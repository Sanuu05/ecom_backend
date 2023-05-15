const Normal = require("../models/NormalUser")
const Cart = require('../models/Cart')


// TODO : Create Cart 

exports.postData = async (req, res) => {
    try {
        const { cart } = req.body
        const user = await Normal.findById(req.user)
        const cartuser = await Cart.findOne({ by: req.user })

        if (cartuser) {
            const product = req.body.cart.cartitem
            // console.log(product)
            const item = await cartuser.cart.find(c => c.cartitem == product)
            console.log("item", item)
            if (item) {
                const excart = await Cart.findOneAndUpdate({ "by": req.user, "cart.cartitem": product }, {
                    $set: {
                        "cart.$": {
                            ...cart,
                            qyt: Number(req.body.cart.qyt)
                        }
                    }
                })
                res.json(excart)
            }
            else {
                console.log("new")
                const excart = await Cart.findOneAndUpdate({ by: req.user }, {
                    $push: {
                        cart
                    }
                })
                res.json(excart)

            }

        } else {
            const cartres = new Cart({
                cart: cart,
                by: user
            })
            const cartsave = await cartres.save()
            res.json({
                cartsave
            })
        }
    } catch (error) {
        console.log(error)
    }
}
// TODO : GET Cart Data
exports.getData = async (req, res) => {
    try {
        const get = await Cart.find({ by: req.user })
        // console.log("fget", get)
        res.json(get)
    } catch (error) {
        console.log(error)
    }
}

// TODO : Delete Cart item by Id 

exports.deleteById = async (req, res) => {
    try {
        const { id } = req.params
        if (id) {
            const del = await Cart.update({ by: req.user }, {
                $pull: {
                    cart: {
                        cartitem: id

                    }
                }
            })
            res.json(del)
        }

    } catch (error) {

    }
}

// TODO : Delete Cart after payment completion

exports.deleteAfterOrder = async (req, res) => {
    try {
        // const {id} = req.params
        console.log("after",req.user)
        const del = await Cart.findOneAndRemove({ "by": req.user })
        res.json(del)
        console.log("deleted")
    } catch (error) {
        console.log(error)
    }
}


