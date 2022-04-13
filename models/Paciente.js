const { Sequelize } = require('sequelize');
const db = require('../db/config');
const fechaActual = require('../helpers/generarFecha');


const Paciente = db.define('Pacientes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },

    propietario: {
        type: Sequelize.STRING,
        allowNull: false
    },


    fecha: {
        type: Sequelize.STRING,
        defaultValue: fechaActual()
    },

    sintomas: Sequelize.STRING
});

module.exports = Paciente;