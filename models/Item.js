const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    }
})


module.exports = mongoose.model('Item', ItemSchema)