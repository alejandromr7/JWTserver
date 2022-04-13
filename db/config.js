const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.BD, process.env.USER, process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mssql',

    define: {
        timestamps: false
    },

    logging: false
});

module.exports = db;