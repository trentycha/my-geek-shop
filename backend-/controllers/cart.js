require('dotenv').config();
const { prisma } = require('../lib/prisma');

exports.getCart = async (req, res, next) => {

    try {
        const cart = await prisma.cart.findMany();
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({error: "Aucun produit trouvé"});
    }
};

exports.addProduct = async (req, res, next) => {

    try {

        const {userId, productId, quantity} = req.body;

        const newProduct = await prisma.cart.create({
            body: {
                userId,
                productId,
                quantity
            },
        });

        res.status(200).json(newProduct);
    } catch (error) {
        res.status(400).json({error : "Le produit n'a pas été ajouté."});
    }
}