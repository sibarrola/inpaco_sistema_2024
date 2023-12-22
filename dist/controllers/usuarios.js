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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuarios = exports.getUsuario = void 0;
//import  getConnection   from '../db/conection';
// listar usuarios---------------------------
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let conn;
    console.log("llegue al principio");
    res.json({
        msg: `get usuarios`
    });
});
exports.getUsuarios = getUsuarios;
// buscar un usuario por id---------------------
const getUsuario = (req, res) => {
    console.log(req);
    const { id } = req.params;
    res.json({
        msg: `getUsuario ${id} `
    });
};
exports.getUsuario = getUsuario;
// crear usuario ----------------------------------
const postUsuario = (req, res) => {
    const { body } = req;
    const { id } = req.params;
    res.json({
        msg: `postUsuario ${id} `,
        body
    });
};
exports.postUsuario = postUsuario;
// actualizar usuario-------------------------
const putUsuario = (req, res) => {
    const { body } = req;
    res.json({
        msg: `posttUsuario`,
        body
    });
};
exports.putUsuario = putUsuario;
//eliminar usuario--------------------------------
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: `deleteUsuario ${id} `
    });
};
exports.deleteUsuario = deleteUsuario;
