const {model, Schema, Types} = require('mongoose');

const carSchema = new Schema({
    model: {type: String, required: true},
    year: {type: Number, required: true},
    price: {type: Number, required: true},
    user: {type: Types.ObjectId, ref: 'User'},
}, {
    timestamps: true
});

module.exports = model('Car', carSchema);