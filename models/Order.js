const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const OrderSchema = new Schema({
    dateOrdered: {
        type: Schema.Types.Date,
        required: true,
    },
    dateConfirm: {
        type: Schema.Types.Date
    },
    dateComplete: {
        type: Schema.Types.Date
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref:'Item',
            required: true
        }
    ]
})


module.exports = mongoose.model('Order', OrderSchema)