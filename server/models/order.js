const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    products: [{
        product: { type: mongoose.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        color: String,
        price: Number,
        thumbnail: String,
        title: String
    }],
    status: {
        type: String,
        default: 'Proccessing',
        enum: ['Cancelled', 'Proccessing', 'Succeed']
    },
    total: Number,
    orderBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Order', orderSchema);