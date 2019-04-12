const express   = require('express');
const app       = express.Router();

const User      = require('../models/User');
const Order    = require('../models/Order');

app.get('/', (req,res) => {
    User.find({}).then((users) => {
            res.send(users);
        });
});

app.get('/:userid', (req,res) => {
    User.findOne({_id: req.params.userid}, (err,user) => {
        //
        // need to fetch data from Orders
        //

        
        res.send(user)
    })
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