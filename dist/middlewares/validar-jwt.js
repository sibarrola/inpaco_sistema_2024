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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const usuario_1 = __importDefault(require("../models/usuario"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // tengo que ser capaz de obtener el token de cualquier lugar
    // esto se pone en el header de la peticion  delete
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }
    try {
        // const payload = jwt.verify(token,SECRET_KEY);
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default);
        // Aquí se decodifica el token y se asume que el payload contiene pares clave-valor
        //const payload = decodedToken.payload; // Suponiendo que el payload está en la propiedad "payload" del token decodificado
        const { id } = decodedToken;
        console.log('decodedTocken:', decodedToken); // asi muestra en consola decodedTocken: { id: 12, iat: 1686750181, exp: 1686757381 }
        // busco el usuario de este id
        const usuario1 = yield usuario_1.default.findByPk(id);
        if (!usuario1) {
            return res.status(401).json({
                msg: "el usuario no es valido"
            });
        }
        // esta forma de guardar en res.locals lo saqué de otro lado, porque me daba error trabajar con el req.
        res.locals.usuario1 = usuario1;
        //  const datos=res.locals.usuario1.dataValues;  // acá me guarda en datos como un objeto que traigo del res
        // console.log("datos",datos)
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "token no válido"
        });
    }
});
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map