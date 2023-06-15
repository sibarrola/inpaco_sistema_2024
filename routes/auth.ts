import {Router} from 'express';
import { check } from 'express-validator';
import login from '../controllers/auth'
//import { existeUsuario } from '../helpers/db-validators';
import validarCampos from '../middlewares/validar-campos';

const router = Router();
 
router.post('/login', [
    // si el usuario fuera el correo, debería validar que sea obligatorio y valido
    // seria :   check('email', "el correo es obligatorio").isEmail();
    check('nombre_usuario','el usuario debe ser su dni').isLength({min:7,max:8}),
    check('password','la contraseña debe tener mas de 4 caracteres').isLength({min:4}),
    check('password', 'la contraseña es obligatoria').not().isEmpty(), 
    validarCampos
]
, login);   

export default router;
