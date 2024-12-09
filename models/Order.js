const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    }],
    users: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    totalPrice: Number,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Order', orderSchema);