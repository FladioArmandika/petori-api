const express   = require('express')
const app       = express.Router();

// MODEL
const Item      = require('../models/Item');

app.get('/', (req,res) => {
    Item.find({}).then(item => {
        res.send(item);
    })
})

app.get('/:itemid', (req,res) => {
    Item.findOne({_id: req.params.itemid}, (err,item) => {
        res.send(item);
    })
})


module.exports = app;

