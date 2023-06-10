"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const db_validators_1 = require("../helpers/db-validators");
const validar_campos_1 = __importDefault(require("../middlewares/validar-campos"));
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/', [
    (0, express_validator_1.check)('apellido', 'el apellido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('nombres', 'el nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'el correo no es valido').isEmail(),
    (0, express_validator_1.check)('nombre_usuario', 'el usuario debe ser su dni').isLength({ min: 7, max: 8 }),
    (0, express_validator_1.check)('nombre_usuario').custom(db_validators_1.existeUsuario),
    (0, express_validator_1.check)('password', 'la contraseña debe tener mas de 4 caracteres').isLength({ min: 6 }),
    // check('rol','no es un rol valido').isIn(['administrador','administrativo','invitado']), //VER EN OTRO SISTEMA , SE PUEDE CHEQUEAR CONTRA UNA TABLA DE ROLES
    // check('rol').custom((rol)=>{esRolValido(rol)}),  //cuando recibimos el mismo argumento, se puede simplificar:
    (0, express_validator_1.check)('rol').custom(db_validators_1.esRolValido),
    validar_campos_1.default
], usuarios_1.postUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('id').custom(db_validators_1.existeIdUsuario),
    (0, express_validator_1.check)('email', 'el correo no es valido').isEmail(),
    (0, express_validator_1.check)('email', 'el correo no es valido').isEmail(),
], usuarios_1.putUsuario);
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map