const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.js');
const auth = require('../middlewares/auth.js');

router.get('/:id', userController.getUserById);
// router.get('/:id', auth, userController.getAllProductsFromUser);

router.post('/', userController.register);
router.post('/login', userController.login);

router.put('/update/:id', auth, userController.updateUser);

router.delete('/:id', auth, userController.deleteUser);

module.exports = router;