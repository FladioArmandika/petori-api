const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const OrderSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    Items: [
        {
            type: Schema.Types.ObjectId,
            ref:'Item',
            required: true
        }
    ]
})


module.exports = mongoose.model('Order', OrderSchema)