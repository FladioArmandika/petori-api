const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

var PetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
})

module.exports = mongoose.model('Pet', PetSchema);
