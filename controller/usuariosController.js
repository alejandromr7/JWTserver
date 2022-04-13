const Usuarios = require("../models/Usuario")
const bcrypt = require('bcrypt');
const generarJWT = require("../helpers/generarJWT");
const generarId = require("../helpers/generarId");
const emailRegistro = require("../helpers/emailRegistro");
const emailOlvidePassword = require("../helpers/emailOlvidePassword");
const encryptarPassword = require("../helpers/hashearPassword");


const registrar = async (req, res) => {
    const { email, nombre } = req.body;
    const usuario = await Usuarios.findOne({ where: { email } });

    if (usuario) {
        return res.json({ msg: 'Este usuario ya se encuentra registrado', error: true });
    }

    try {
        const usuarioGuardado = await Usuarios.create(req.body);

        emailRegistro({
            nombre,
            email,
            token: usuarioGuardado.token,
        });
        res.json({ msg: 'Usuario registrado correctamente, Revisa tu email' });
    } catch (error) {
        console.log(error)
    }
}


const autenticar = async (req, res) => {

    const { email, password } = req.body;

    // Comprobar si el usuario existe //
    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
        return res.json({ msg: 'Usuario no existe', error: true });
    }

    // Comprobar si el usuario esta confirmado //
    if (!usuario.confirmar) {
        return res.json({ msg: 'No has confirmado tu usuario', error: true });
    }

    // Comprobar su password //
    const compararPassword = await bcrypt.compare(password, usuario.password);

    if (!compararPassword) {
        return res.json({ msg: 'Contraseña incorrecta', error: true });
    }

    const usuarioS = {
        id: usuario.id,
        nombre: usuario.nombre,
        usuario: usuario.email,
        token: generarJWT(usuario.id)
    }

    res.json(usuarioS);
}



const confirmar = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Usuarios.findOne({ where: { token } });

    if (!usuarioConfirmar) {
        return res.json({ msg: 'Token no válido', error: true });
    }

    try {
        //await Usuarios.update({ token: '', confirmar: true }, { where: { token } });
        usuarioConfirmar.token = '';
        usuarioConfirmar.confirmar = true;
        res.json({ msg: 'Usuario confirmado correctamente', error: false });
    } catch (error) {
        console.log(error)
    }

}


const olvidePassword = async (req, res) => {
    const { email } = req.body;

    // Comprobar si el usuario existe //
    const usuario = await Usuarios.findOne({ where: { email } });

    if (!usuario) {
        return res.json({ msg: 'Cuenta no existe', error: true });
    }

    try {
        usuario.token = generarId();
        await usuario.save();

        // Enviar email con instrucciones //
        emailOlvidePassword({ email, nombre: usuario.nombre, token: usuario.token });

        res.json({ msg: 'Hemos enviado un email con las instrucciones', error: false });
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const usuarioConfirmar = await Usuarios.findOne({ where: { token } });

    if (!usuarioConfirmar) {
        return res.json({ msg: 'Token no válido', error: true });
    }

    res.json({ msg: 'Coloca tu nuevo Password', error: false });
}


const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuarios.findOne({ where: { token } });

    if (!usuario) {
        return res.json({ msg: 'Token no válido', error: true });
    }

    try {
        usuario.password = encryptarPassword(password);
        usuario.token = '';
        await usuario.save();

        res.json({ msg: 'Password actualizada correctamente', error: false });
    } catch (error) {
        console.log(error);
    }
}


const perfil = async (req, res) => {
    let usuario = req.usuario;
    res.json(usuario);
}


module.exports = { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil }