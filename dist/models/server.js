"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("../routes/usuario"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            roles: '/api/roles'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //métodos iniciales
        this.dbConnection();
        this.middlewares(); // a esta la tuve que llamar antes de routes(), porque sino no me traia el body
        this.routes(); //llamo al método en el constructor
    }
    // conectar base de datos
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('database on line');
                connection_1.default.sync().then(() => {
                    console.log('table created successfully!');
                }).catch((error) => {
                    console.error('Unable to create table : ', error);
                });
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    //---------------metodos----------------------------------------
    // middlewares son funciones que se ejecutan antes de las rutas o de otros procedimientos
    middlewares() {
        //CORS   
        // el cors es una funcion
        this.app.use((0, cors_1.default)());
        // LECTURA DEL BODY
        // para poder parsear el body
        this.app.use(express_1.default.json());
        // CARPETA PUBLICA
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}
exports.default = Server;
// tuviera otras clases  podria poner el export antes de cada clase, como tengo una sola exporto por defecto
//# sourceMappingURL=server.js.map