const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cart.js');

router.get('/cart', cartController.getCart);

router.post('/cart', cartController.addProduct);