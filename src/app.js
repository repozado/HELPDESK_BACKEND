const express = require('express');
const cors = require('cors');
require('dotenv').config();

const personaRoutes = require('./routes/persona.route');
const productRoutes = require('./routes/product.route');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/persona', personaRoutes);
app.use('/api/product', productRoutes);

module.exports = app;