require('dotenv').config();
const { prisma } = require('../lib/prisma');

exports.getCart = async (req, res, next) => {

    try {
        const cart = await prisma.cart.findMany({
            include: {
                product:true
            }}
        );
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({error: "Aucun produit trouvé"});
    }
};

exports.addProduct = async (req, res, next) => {

    try {

        const {userId, productId, quantity} = req.body;

        const newProduct = await prisma.cart.create({
            data: {
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

exports.updateQuantity = async (req, res, next) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        if (quantity <= 0) {
            await prisma.cart.delete({
                where: { 
                    userId_productId: {
                    userId: parseInt(userId),
                    productId: parseInt(productId)
                    } 
                }
            });
            return res.status(200).json({ message: "Produit retiré du panier" });
        }

        const updatedItem = await prisma.cart.update({
            where: { 
                userId_productId: {
                userId: parseInt(userId),
                productId: parseInt(productId)
                }
             },
            data: { quantity: quantity }
        });

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de la mise à jour", details: error.message });
    }
};