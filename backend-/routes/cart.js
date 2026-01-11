const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cart.js');

router.get('/', cartController.getCart);
router.post('/', cartController.addProduct);
router.put('/:userId/:productId', cartController.updateQuantity);

module.exports = router;