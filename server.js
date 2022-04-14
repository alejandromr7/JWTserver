const express = require('express');
const cors = require('cors');
const db = require('./db/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.host = process.env.HOST;

        this.dbConnection();
        this.middlewares();
        this.routes();
        this.listen();
    }

    async dbConnection() {
        try {
            require('./models/Usuario');
            require('./models/Paciente');
            await db.sync();
        } catch (error) {
            console.log(error)
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/usuarios', require('./routes/usuariosRouters'));
        this.app.use('/api/pacientes', require('./routes/pacienteRoutes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`http://${this.host}:${this.port}/api/pacientes`);
        });
    }
}


module.exports = Server;