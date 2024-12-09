const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: true 
    },
    cognome: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        index: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', userSchema);