const Paciente = require("../models/Paciente");

const obtenerPacientes = async (req, res) => {
    const { id } = req.usuario;

    if (!id) {
        return res.json({ msg: 'No hay sesion' })
    }

    try {
        const pacientes = await Paciente.findAll({ where: { UsuarioId: id } });
        res.json(pacientes);
    } catch (error) {
        console.log(error)
    }
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
        return res.json({ msg: 'Paciente no fué encontrado', error: true });
    }

    if (paciente.UsuarioId !== req.usuario.id) {
        return res.json({ msg: 'No eres el Propietario de este Paciente', error: true });
    }

    res.json(paciente);
}

const agregarPaciente = async (req, res) => {
    const { id } = req.usuario;
    const paciente = req.body;
    paciente.UsuarioId = id;

    try {
        await Paciente.create(paciente);
        res.json({ msg: 'Paciente agregado correctamente', error: false });
    } catch (error) {
        console.log(error)
    }
}

const actualizarPaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, propietario, sintomas } = req.body;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
        return res.json({ msg: 'Paciente no fué encontrado', error: true });
    }

    if (paciente.UsuarioId !== req.usuario.id) {
        return res.json({ msg: 'No eres el Propietario de este Paciente', error: true });
    }

    try {
        await Paciente.update({ nombre, propietario, sintomas }, { where: { id } });
        res.json({ msg: 'Paciente modificado correctamente', error: false });
    } catch (error) {
        console.log(error)
    }
}

const eliminarPaciente = async (req, res) => {
    const { id } = req.params;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
        return res.json({ msg: 'Paciente no fué encontrado', error: true });
    }

    if (paciente.UsuarioId !== req.usuario.id) {
        return res.json({ msg: 'No eres el Propietario de este Paciente', error: true });
    }

    try {
        await Paciente.destroy({ where: { id } });
        res.json({ msg: 'Paciente eliminado correctamente', error: false });
    } catch (error) {
        console.log(error)
    }
}


module.exports = { obtenerPacientes, agregarPaciente, actualizarPaciente, eliminarPaciente, obtenerPaciente }


