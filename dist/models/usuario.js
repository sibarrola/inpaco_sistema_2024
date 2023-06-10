"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('Usuario', {
    // id no lo pongo porque lo maneja automatico
    apellido: {
        type: sequelize_1.DataTypes.STRING
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    },
    nombre_usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    google: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    rol: {
        type: sequelize_1.DataTypes.STRING
    },
    estado: {
        type: sequelize_1.DataTypes.TINYINT //puedo poner booleano
    }
});
exports.default = Usuario;
// este va a estar conectado a la bd. La idea de hacer un modelo es que esta va a hacer 
// va a impedir que se ingrese basura...
//# sourceMappingURL=usuario.js.map