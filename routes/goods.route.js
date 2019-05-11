const express   = require('express');
const app       = express.Router();

const Goods     = require('../models/Goods');
const Category  = require('../models/Category');

// get all goods by category
app.get('/:categoryid', (req,res) => {
    Goods.find({category:req.params.categoryid})
        .populate('category')
        .then(goods => {
            res.send(goods);
        });
})

//get all goods
app.get('/', (req,res) => {
    Goods.find({})
        .populate('category')
        .then((goods) => {
            res.send(goods);
        });
})

//get a goods by goodsid
app.get('/i/:goodsid', (req,res) => {
    Goods.findOne({_id: req.params.goodsid})
        .populate('category')
        .then(goods => {
            res.send(goods);
        });
})

//add a goods
app.post('/add', (req,res) => {
    var {name,description,price,category} = req.body;
    var goods = new Goods({
        name,description,price,category
    });

    goods.save()
        .then(good => res.send(good))
        .catch(err => res.send(err));
    
})

//delete a goods
//update a goods




module.exports = app;


