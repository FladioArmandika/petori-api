const express   = require('express');
const app       = express.Router();

const Service   = require('../models/Service');
const Item      = require('../models/Item');

app.get('/', (req,res) => {
    Service.find({})
        .populate('items')
        .then((service) => {
            res.send(service);
        }).catch(err=>console.log(err));
}) 

app.post('/add', (req,res) => {
    var {name,description} = req.body;

    var service = new Service({
        name: name,
        description: description
    });

    service.save();
})


module.exports = app;
