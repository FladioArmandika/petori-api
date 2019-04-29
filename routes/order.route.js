const express   = require('express');
const app       = express.Router();

const User  = require('../models/User');
const Order = require('../models/Order');



app.get('/u/:userid', (req,res) => {

    // Order.find({ user: "5c9cd427aac061161c602380" })
    //     .populate('items')
    //     .then((order) => {
    //         res.send(order);
    //     }).catch(err => console.log(err));
    require('mongoose').set('debug', true);
    ObjectId = require('mongoose').Types.ObjectId;
 
    Order.find({user: req.params.userid}, (err,order) => {
        res.send(order);
    }) 
})

app.get('/u/:userid/:status', (req,res) => {
    Order.find({
        user: req.params.userid,
        status: req.params.status})
        .populate('user')
        .populate('items')
        .then(orders => {
            res.send(orders);
        });
})


app.get('/', (req,res) => {
    Order.find({})
        .populate('items')
        .populate('user')
        .then((order) => {
            res.send(order);
        })
})



// make order
app.post('/make', (req,res) => {
    var userId = req.query.userid;

    var city = req.body.city;
    var address = req.body.address;
    var items = req.body.items;


    var order = new Order({
        user: userId, 
        dateOrdered: new Date().toISOString().toString(),
        city: city,
        dateConfirm: '',
        dateComplete: '',
        status: 'ordered', 
        address: address,
        items: items 
    })  

    order.save()
        .then( o => {
            User.findByIdAndUpdate(userId, { '$push': {'orders': o._id}})
                .then(() => {
                    console.log("push success");
                });

        }) 
        .catch((err) => {
            console.log(err);
        }) 
 
    // User.findOne({_id: userId}) 
        // .then((user) => {
            

            // user.orders.push(order); 
            // user.save();
        // }) 

    return order;
})

app.get('/o/:orderid', (req,res) => {
    Order.findOne({_id:req.params.orderid})
        .populate('items')
        .populate('user')
        .then(order => {
            res.send(order);
        })
})

// ORDER CONFIRM BY 
app.get('/o/:orderid/confirm', (req,res) => {
    Order.findOneAndUpdate({_id: req.params.orderid}, 
        {'$set': {status: "confirm",dateConfirm: new Date().toISOString()}})
        .then( (o) => {
            res.send(o);
        })
})


// ORDER COMPLETE
app.get('/o/:orderid/complete', (req,res) => {
    Order.findOneAndUpdate({_id: req.params.orderid}, 
        {'$set': {status: "complete",dateConfirm: new Date().toISOString()}})
        .then( (o) => {
            res.send(o);
        })
})




module.exports = app; 