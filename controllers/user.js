
const User = require("../models/user");

const Order = require("../models/order")

exports.getUserByID = (req,res,next,id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            })
        }

        req.profile = user
        next();
    })
}


exports.getUser = (req,res) => {
    req.profile.salt = undefined;
    req.profile.encpassword = undefined;

    return res.json(req.profile)
}


exports.updateUser = (req,res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) => {
            if(err){
                return res.status(400).json({
                    error: "Not authorized"
                })
            }
            user.salt = undefined;
            user.encpassword = undefined
            res.json(user)
        }
    )
}

exports.userPurchaseList = (req,res) => {
    Order.find({ user: req.profile._id }).populate("user","_id name").exec((err,order) => {
        if(err){
            return res.status(400).json({
                error:"No order"
            })
        }

        return res.json(order);
    })

}

exports.pushOrderInPurchaseList = (req,res, next) => {
    
    
    let purchases = []
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transactio_id: req.body.order.transactio_id
        })
    })
   
    next()
}