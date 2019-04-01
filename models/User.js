const mongoose  = require('mongoose')
const Schema    = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
})


module.exports = mongoose.model('User', UserSchema)