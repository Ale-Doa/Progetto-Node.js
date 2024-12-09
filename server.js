require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connessione al database MongoDB
connectDB();

app.use(bodyParser.json());

// Rotte
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Middleware gestione errori
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Qualcosa è andato storto!', 
        error: process.env.NODE_ENV === 'development' ? err : {} 
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});