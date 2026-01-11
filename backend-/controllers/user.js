require('dotenv').config();
const { prisma } = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserById = async (req, res, next) => {

    try {
        const user = await prisma.user.findUnique({
        where: {id: parseInt(req.params.id)},
        });

        res.status(200).json(user);
    }
    catch(error) {
        res.status(400).json({error: "Aucun utilisateur trouvé"});
    }
    
};

exports.register = async (req, res, newt) => {

    try {
        const {name, firstname, mail, phone, address, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const crypted = await bcrypt.hash(req.body.password, salt);

        const checkMail = await prisma.user.findUnique({
            where: {mail},
        });
        if(checkMail) {
            return res.status(400).json({error : "Cet email est déjà associé à un utilisateur"});
        };

        const newUser = await prisma.user.create( {
            data: {
                name,
                firstname,
                mail,
                phone,
                address,
                password: crypted,
            },
        });

        const access_token = jwt.sign({id: newUser.id}, process.env.JWT, {expiresIn: '1h'});

        res.status(201).json({
            message: "Utilisateur crée !",
            id: newUser.id,
            name: newUser.name,
            firstname: newUser.firstname,
            mail: newUser.mail,
            phone: newUser.phone,
            address: newUser.address,
            token: access_token,
        })

    } catch(error) {
        res.status(400).json({error: error.message});
    }

};

exports.login = async (req, res, next) => {

    try {
        const {mail, password} = req.body;

        const user = await prisma.user.findUnique({
            where: {mail},
        });
        if(!user) {
            return res.status(400).json({error: "L'email ne correspond à aucun compte"});
        };

        const check = await bcrypt.compare(password, user.password);
        if(!check) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
        }

        const access_token = jwt.sign({id: user.id}, process.env.JWT, {expiresIn: '1h'});

        res.status(200).json({
            id: user.id,
            name: user.name,
            firstname: user.firstname,
            mail: user.mail,
            token: access_token,
        })
    } catch (error) {
        res.status(400).json( {error : error.message});
    }
};

exports.updateUser = async (req, res, next) => {

try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "Token manquant" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT);

        if (decoded.id !== parseInt(req.params.id)) {
            return res.status(403).json({ error: "Vous ne pouvez modifier que votre propre profil" });
        }

        const { id } = req.params;
        const {name, firstname, mail, phone, address, password} = req.body;

        const updateData = {};
        if (name) updateData.name = name;
        if (firstname) updateData.firstname = firstname;
        if (mail) updateData.mail = mail;
        if (phone) updateData.phone = phone;
        if (address) updateData.address = address;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        if (mail) {
            const checkMail = await prisma.user.findUnique({
                where: {mail},
            });
            if (checkMail && checkMail.id !== parseInt(id)) {
                return res.status(400).json({error : "Cet email est déjà associé à un utilisateur"});
            }
        }

        const updateUser = await prisma.user.update({
            where: {id: parseInt(id)},
            data: updateData,
        });

        const access_token = jwt.sign({id: updateUser.id}, process.env.JWT, {expiresIn: '1h'});

        res.status(200).json({
            message: "Utilisateur modifié !",
            id: updateUser.id,
            name: updateUser.name,
            firstname: updateUser.firstname,
            mail: updateUser.mail,
            phone: updateUser.phone,
            address: updateUser.address,
            token: access_token,
        })

    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

exports.deleteUser = async (req, res, next) => {

    try {
        const {id} = req.params;

        const deleteUser = await prisma.user.delete( {
            where: {id: parseInt(id)},
        });

        res.status(204).json({
            message: "Utilisateur supprimé !",
        });

    } catch(error) {
        res.status(400).json({error: error.message});
    }
}