const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductStock = new Schema(
    {
        productId: {
            type: String,
            required: true,
            index: {unique: true, dropDups: true},
        },
        currentStock: {
            type: Number,
            required: true,
        }
    }
);

module.exports = mongoose.model('productStock', ProductStock);
