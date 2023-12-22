"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("../routes/usuarios")); // defino el alias de una vez: userRoutes en lugar de poner import * as userRoutes
const cors_1 = __importDefault(require("cors")); // el cors es una funcion
//import createPool  from '../db/conection';
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: 'api/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // this.initDB(),
        this.middlewares();
        this.routes();
    }
    // conectar base de datos
    /* async initDB() {
        try {
            const pool = createPool(); // Crear y verificar el pool
            console.log('Pool de conexiones a la base de datos establecido');
        } catch (error) {
            console.error('Error al establecer el pool de conexiones:', error);
        }
    }
     */
    middlewares() {
        //cors
        this.app.use((0, cors_1.default)());
        // lectura del body
        this.app.use(express_1.default.json());
        // carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto!!', this.port);
        });
    }
}
exports.default = Server;
