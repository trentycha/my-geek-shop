const express = require('express');
const cors = require('cors');

const app = express();

const productRoutes = require('./routes/product.js');
const userRoutes = require('./routes/user.js');
const cartRoutes = require('./routes/cart.js');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json())

app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
// app.use('/api', cartRoutes);

module.exports = app;