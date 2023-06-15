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
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generar_jwt_1 = require("../helpers/generar-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_usuario, password } = req.body;
    try {
        // verificar si existe ese usuario (que podría ser el mail, yo aca trabaje con nombre_usuario)
        const usuario = yield usuario_1.default.findOne({
            where: {
                nombre_usuario
            }
        });
        // si no existe --------------------------------   
        if (!usuario) {
            return res.status(400).json({
                msg: 'usuario o password incorrecto'
            });
        }
        // verificar si está activo
        if (!usuario.getDataValue('estado')) {
            return res.status(400).json({
                msg: 'usuario inactivo'
            });
        }
        console.log('password:', usuario.getDataValue('password'));
        // verificar contraseña --------------------------
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.getDataValue('password'));
        if (!validPassword) {
            return res.status(400).json({
                msg: 'password incorrecta'
            });
        }
        /* const  datos={
           id: usuario.getDataValue('id'),
           usuario:usuario.getDataValue('nombre_usuario')
          } */
        // generar JWT
        // tengo que crear primero esa funcion en la carpeta de los helpers
        const token = yield (0, generar_jwt_1.generarJwt)(usuario.getDataValue('id'));
        res.json({
            // solo puede ejecutar un res a la vez. Por eso aqui pongo el res solo y abajo el return (sino  de error)
            msg: 'login ok',
            usuario: usuario,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'hable con el adminstrador'
        });
    }
});
exports.default = login;
//# sourceMappingURL=auth.js.map