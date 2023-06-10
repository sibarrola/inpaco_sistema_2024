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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// get usuarios paginado
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // a esto lo saque de https://chat.openai.com/, pues en sequelize es diferente a mongo...
    const page = req.query.page || 1; // Página actual
    const perPage = req.query.limit || 3; // Cantidad de usuarios por página   
    try {
        const { count, rows } = yield usuario_1.default.findAndCountAll({
            where: {
                estado: 1 //los que esten activos
            },
            limit: perPage,
            offset: (page - 1) * perPage,
        });
        res.json({
            totalPages: Math.ceil(count / perPage),
            currentPage: page,
            cant_por_pag: perPage,
            tot_usuarios: count,
            usuarios: rows,
        });
    }
    catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
    }
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.json({
            msg: `no existe el usuario con el id ${id}`
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Obtener los campos del cuerpo de la solicitud
    const { apellido, nombres, email, nombre_usuario, password, rol } = req.body;
    try {
        // ver si existe ese nombre de usuario
        // Encriptar la contraseña
        const salt = bcryptjs_1.default.genSaltSync();
        const usuarioPassword = yield bcryptjs_1.default.hash(password, salt);
        // Crear un nuevo usuario en la base de datos utilizando el modelo de Sequelize
        const nuevoUsuario = yield usuario_1.default.create({
            apellido,
            nombres,
            email,
            nombre_usuario,
            password: usuarioPassword,
            rol
        });
        // Enviar una respuesta exitosa
        res.status(200).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
    }
    catch (error) {
        // Manejar errores
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});
exports.postUsuario = postUsuario;
//---------------------------------PUT--------------------------
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { password } = _a, resto = __rest(_a, ["password"]);
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ms: 'No existe ese id ' + id
            });
        }
        if (password) {
            const salt = bcryptjs_1.default.genSaltSync();
            //resto.setDataValue('password',bcryptjs.hashSync(password,salt));
            resto.password = bcryptjs_1.default.hashSync(password, salt);
        }
        yield usuario.update({
            apellido: resto.apellido,
            nombres: resto.nombres,
            email: resto.email,
            rol: resto.rol,
            estado: resto.estado
        });
        res.json(usuario); // envio el usario ya actualziado
    }
    catch (error) {
        console.log(console.error);
        res.status(500).json({
            msg: 'no puedo actualizar, hable con el administrador',
            id: id,
            resto: resto
        });
    }
});
exports.putUsuario = putUsuario;
//---------------------------------delete-------------------------
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params; //{{url}}/api/usuarios/40    (aqui traigo el id del params, que en este caso es 40)
    try {
        const usuario1 = yield usuario_1.default.findByPk(id);
        if (!usuario1) {
            return res.status(404).json({
                ms: 'No existe ese id ' + id
            });
        }
        // await usuario1.destroy() //ESTA ES LA ELIMINICACION FISICA
        yield usuario1.update({ estado: 0 });
        const { usuario } = req.body;
        res.json({ "usuario_borrado": usuario1, "usuario_autentificado": usuario }); // envio el usario ya actualziado
    }
    catch (error) {
        console.log(console.error);
        res.status(500).json({
            msg: 'no puedo grabar, hable con el administrador',
            body
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map