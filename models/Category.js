const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    goods: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Goods'
        }
    ]
})

module.exports = mongoose.model('Goods', CategorySchema);
