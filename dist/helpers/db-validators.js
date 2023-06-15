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
exports.existeIdUsuario = exports.existeUsuario = exports.esRolValido = void 0;
const rol_1 = __importDefault(require("../models/rol"));
const usuario_1 = __importDefault(require("../models/usuario"));
const esRolValido = (rol = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeRol = yield rol_1.default.findOne({
        where: { rol: rol }
    });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
});
exports.esRolValido = esRolValido;
const existeUsuario = (nombre_usuario = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeNombreUsuario = yield usuario_1.default.findOne({
        where: { nombre_usuario }
    });
    if (!existeNombreUsuario) {
        throw new Error(`El usuario ${nombre_usuario} NO está registrado en la BD`);
    }
});
exports.existeUsuario = existeUsuario;
const existeIdUsuario = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existeIdusu = yield usuario_1.default.findOne({
        where: { id }
    });
    if (!existeIdusu) {
        throw new Error(`El usuario ${id} noa está registrado en la BD`);
    }
});
exports.existeIdUsuario = existeIdUsuario;
//# sourceMappingURL=db-validators.js.map