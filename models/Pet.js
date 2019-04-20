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
    }
})

module.exports = mongoose.model('Pet', PetSchema);




