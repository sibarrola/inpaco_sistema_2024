import {Router} from 'express';
import { check } from 'express-validator';
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from '../controllers/usuarios';
import {esRolValido, existeIdUsuario} from '../helpers/db-validators';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import {esRolRequerido } from '../middlewares/validar-roles';
const router  =Router();

router.get('/',getUsuarios);
router.get('/:id',   getUsuario);
// post-----------------------------------------------------  
router.post('/',[
    check('apellido','el apellido es obligatorio').not().isEmpty(),
    check('nombres','el nombre es obligatorio').not().isEmpty(),
    check('email','el correo no es valido').isEmail(),
    check('nombre_usuario','el usuario debe ser su dni').isLength({min:7,max:8}),
    check('password','la contraseña debe tener mas de 4 caracteres').isLength({min:4}),
   // check('rol','no es un rol valido').isIn(['administrador','administrativo','invitado']), //VER EN OTRO SISTEMA , SE PUEDE CHEQUEAR CONTRA UNA TABLA DE ROLES
  // check('rol').custom((rol)=>{esRolValido(rol)}),  //cuando recibimos el mismo argumento, se puede simplificar:
    check('rol').custom(esRolValido),
    validarCampos]  ,  postUsuario);

// put-----------------------------------------------------    
  router.put('/:id', [
    check('id').custom(existeIdUsuario),
    check('email','el correo no es valido').isEmail()
    ] , putUsuario);

// delete-----------------------------------------------------  
  router.delete('/:id',[
    validarJWT,  //aqui estoy mandando una referencia a la funcion
    esRolRequerido('administrativo','administrador'),  // es admin o administrativo
    check('id').custom(existeIdUsuario),
    validarCampos
],deleteUsuario);

 
export default router;