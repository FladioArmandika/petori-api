const serverless    = require('serverless-http');
const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');
const app   = express();

const UserIndex     = require('./routes/user.route')
const ServiceIndex  = require('./routes/service.route')
const ItemIndex     = require('./routes/item.route')
const OrderIndex     = require('./routes/order.route')

mongoose
    .connect('mongodb://fladioarmandika:91378531fladioarmandika@ds227146.mlab.com:27146/petori')
    .then(() => console.log("Database connected"))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/user',UserIndex);
app.use('/service', ServiceIndex);
app.use('/item', ItemIndex);
app.use('/order', OrderIndex);

app.get('/', (req,res) => {
    res.json({hello: "HELLO WORLD"})
})

app.listen(process.env.PORT || 3000,(err) => {
    console.log("server on");
})

// module.exports.handler = serverless(app);
