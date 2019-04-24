const express   = require('express');
const app       = express.Router();

const User  = require('../models/User');
const Order = require('../models/Order');



app.get('/:userid', (req,res) => {

    // Order.find({ user: "5c9cd427aac061161c602380" })
    //     .populate('items')
    //     .then((order) => {
    //         res.send(order);
    //     }).catch(err => console.log(err));
    require('mongoose').set('debug', true);
    ObjectId = require('mongoose').Types.ObjectId;
 
    Order.find({_id: req.params.userid}, (err,order) => {
        res.send(order);
    }) 


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
    var userId = req.query('userid');
    var {
        items,
        address,
        city
    } = req.body;


    var order = new Order({
        user: userId,
        dateOrdered: new Date().toISOString(),
        city: city,
        address: address,
        items: items
    })

    User.findOne({_id: userId})
        .then((user) => {
            order.save();

            user.orders.push(order);
            user.save();
        }).catch(err => {
            console.log(err);
        })

})




module.exports = app; 