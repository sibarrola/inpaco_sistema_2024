import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Usuario =db.define('Usuario', {
         // id no lo pongo porque lo maneja automatico

         apellido: {
            type:DataTypes.STRING
         },
         nombres: {
            type:DataTypes.STRING
         },
         email: {
            type:DataTypes.STRING
         },
         nombre_usuario: {
            type:DataTypes.STRING
         },
         password: {
            type:DataTypes.STRING
         },
         google: {
            type:DataTypes.BOOLEAN
         },
         rol: {
            type:DataTypes.STRING
         },
         estado: {
            type:DataTypes.TINYINT //puedo poner booleano
         }
       

})
 

 
export default Usuario;
// este va a estar conectado a la bd. La idea de hacer un modelo es que esta va a hacer 
// va a impedir que se ingrese basura...