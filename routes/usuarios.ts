import { Router } from 'express';
const router =Router();

/*import { check } from 'express-validator';

 const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator'); */

import {
//getUsuario,
getUsuarios,
postUsuario,
//putUsuario,
//deleteUsuario 
 } from '../controllers/usuarios';

/* router.get('/:id',[
 
    check('id','no es un id válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], getUsuario ); */

router.get('/', getUsuarios );
/* 
router.put('/:id', [
    validarJWT,  
  check('id','no es un id válido').isMongoId(),
  check('id').custom(existeUsuarioPorId),
  check('rol').custom(esRoleValido),
  tieneRole('ADMIN'),
  validarCampos
], putUsuario); */

// el tercero es el controlador, en el medio el midleware. Pero si son varios midleware pongo un arreglo. 
// aQUI GENERA UN ARREGLO CON LOS ERRORES Y LO ENVIA EN EL REQ
/*  router.post('/',[
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
   check('correo', 'El correo no es válido').isEmail(),
   check('correo', 'El correo es obligatorio').not().isEmpty(),
   check('correo').custom( emailExiste ),  
  // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
   //check('rol').custom((rol)=>esRoleValido(rol))  esto se simplifica como abajo:
   check('rol').custom(esRoleValido),
  validarCampos
], postUsuario );   */
router.post('/',postUsuario);

// no deja borrarlo si se cambia el token, debe corresponder al token. Entiendo que cuando me logueo me genera el token, 
/* router.delete('/:id',[
 validarJWT,
// esAdminRole, // SOLO SI ES ADMINISTRADOR LO DEJA BORRAR
 tieneRole('ADMIN'),  // lo hago mas flexible que el de arriba y permito que mas de un rol pueda borrar
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
],deleteUsuario );
 */
 
export default router;

