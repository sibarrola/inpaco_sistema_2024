"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = __importDefault(require("../controllers/auth"));
//import { existeUsuario } from '../helpers/db-validators';
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
router.post('/login', [
    // si el usuario fuera el correo, debería validar que sea obligatorio y valido
    // seria :   check('email', "el correo es obligatorio").isEmail();
    (0, express_validator_1.check)('nombre_usuario', 'el usuario debe ser su dni').isLength({ min: 7, max: 8 }),
    (0, express_validator_1.check)('password', 'la contraseña debe tener mas de 4 caracteres').isLength({ min: 4 }),
    (0, express_validator_1.check)('password', 'la contraseña es obligatoria').not().isEmpty(),
    validar_campos_1.default
], auth_1.default);
exports.default = router;
//# sourceMappingURL=auth.js.map