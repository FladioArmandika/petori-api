const express   = require('express');
const app       = express.Router();

const bcrypt    = require('bcryptjs');
const jwt       = require('jsonwebtoken');

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

app.get('/e/:email', (req,res) => {
    User.findOne({email: req.params.email})
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
    var {email,name,password,city} = req.body;
    var user = new User({
        email: email,
        name: name,
        password: password,
        city: city
    });

    console.log(email+','+name+','+password);
    

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err,hash) => {
            console.log(hash);
            
            user.password = hash;

            user.save()
                .then(user => res.send(user))
                .catch(err => res.send(err));
        });
    });
    
    
});

app.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password; 


    User.findOne({email})
        .then((user) => { 
            if(user) {
                if( bcrypt.compare(req.body.password,user.password) ) {
                    let token = jwt.sign({email: email},
                        'SUPERSECRET', 
                        {'expiresIn': '24h'}
                        );
     
                    res.json({
                        success: true, 
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    return res.send('wrong pass');
                }
                
            } else {
                res.send('no user');
            }
        });
})



module.exports = app;