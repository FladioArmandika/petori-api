const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
})


module.exports = mongoose.model('Service', ServiceSchema)