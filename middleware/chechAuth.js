const jwt = require('jsonwebtoken');
const Usuarios = require('../models/Usuario');

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);

            const respuesta = await Usuarios.findByPk(decoded.id);

            req.usuario = {
                id: respuesta.id,
                nombre: respuesta.nombre,
                email: respuesta.email,
            }

            console.log(`Desde checkAuth `, req.usuario);

            return next();

        } catch (error) {
            console.log('Session expired');
            return res.status(400).send('Session expired');
        }
    }

    if (!token) {
        return res.json({ msg: 'No hay token', error: true })
    }


    next();
}

module.exports = checkAuth;