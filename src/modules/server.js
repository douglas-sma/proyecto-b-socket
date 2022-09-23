const express = require('express');
const sequelize = require('../config/config');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3500;
        this.server = require('http').createServer( this.app );
        this.io = require('socket.io')(this.server);

        //Rutas

        //Conectar a base de datos
        //this.conectarDB();

        //Conexión Socket
        this.socket();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json({ limit: '50mb' }));

        this.app.use(express.urlencoded({
            limit: '50mb',
            extended: false
        }));
    }

    conectarDB = async () => {
        try {

            await sequelize.sync({ force: false })
            console.log('Nos hemos conectado a la bd');

        } catch (error) {
            console.log(error);
            throw new Error('Error en conectar la base de datos.')
        }
    }

    socket() {
        console.log('Escuchando conexiones')
        this.io.on('connection', socket => { 
            console.log('cliente conectado', socket.id)

            socket.on('disconnect', () => {
                console.log('cliente desconectado', socket.id)
            })
         });
    }

    routes() {
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;