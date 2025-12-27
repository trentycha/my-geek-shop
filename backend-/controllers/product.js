require('dotenv').config();
const { prisma } = require('../lib/prisma');

exports.getAllProducts = async (req, res, next) => {

    try{
        const products = await prisma.product.findMany();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(400).json({error : "Produits non trouvés"});
    }
    
};

exports.getProductById = async (req, res, next) => {

    try {
        const product = await prisma.product.findUnique({
            where: {id: parseInt(req.params.id)},
        });
        res.status(200).json(product);
    }
    catch(error) {
        res.status(400).json({error : "Pas de produit trouvé"});
    }
};