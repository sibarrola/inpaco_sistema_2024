import {Router} from 'express';
import { check } from 'express-validator';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuarios';
import {esRolValido, existeIdUsuario, existeUsuario} from '../helpers/db-validators'
import validarCampos from '../middlewares/validar-campos';
const router  =Router();

router.get('/',getUsuarios);
router.get('/:id',   getUsuario);
router.post('/',[
    check('apellido','el apellido es obligatorio').not().isEmpty(),
    check('nombres','el nombre es obligatorio').not().isEmpty(),
    check('email','el correo no es valido').isEmail(),
    check('nombre_usuario','el usuario debe ser su dni').isLength({min:7,max:8}),
    check('nombre_usuario').custom(existeUsuario),
    check('password','la contraseña debe tener mas de 4 caracteres').isLength({min:6}),
   // check('rol','no es un rol valido').isIn(['administrador','administrativo','invitado']), //VER EN OTRO SISTEMA , SE PUEDE CHEQUEAR CONTRA UNA TABLA DE ROLES
  // check('rol').custom((rol)=>{esRolValido(rol)}),  //cuando recibimos el mismo argumento, se puede simplificar:
  check('rol').custom(esRolValido),
   
   validarCampos]  ,  postUsuario);
router.put('/:id', [
    check('id').custom(existeIdUsuario),
    check('email','el correo no es valido').isEmail(),
    check('email','el correo no es valido').isEmail(),
] , putUsuario);
router.delete('/:id',deleteUsuario);





export default router;