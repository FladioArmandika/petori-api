const express   = require('express');
const app       = express.Router();

const User      = require('../models/User');
const Order    = require('../models/Order');

app.get('/', (req,res) => {
    User.find({})
        .populate('orders')
        .then((users) => {
            res.send(users);
        });
});

app.get('/:userid', (req,res) => {
    User.findOne({_id: req.params.userid})
        .populate('orders')
        .populate({
            path: 'orders',
            populate: { path: 'items'}
        })
        .then((user) => {
            res.send(user);
        }).catch(err => console.log(err));
})

app.get('/:userid/order', (req,res) => {
    Order.find({user:req.params.userid})
        .then(order => {
            res.send(order);
        })
})


// ADD USER
app.post('/add', (req,res) => {
    var {email,name,password} = req.body;
    var user = new User({
        email: email,
        name: name,
        password: password
    });

    user.save();
});



module.exports = app;