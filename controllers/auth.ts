import { Request ,Response } from "express";
import Usuario from '../models/usuario'
import bcryptjs from 'bcryptjs';
import {generarJwt} from '../helpers/generar-jwt';
 

const login = async (req:Request, res:Response)=>{
 
     const {nombre_usuario, password} =req.body;

     try {

        // verificar si existe ese usuario (que podría ser el mail, yo aca trabaje con nombre_usuario)
       const  usuario = await Usuario.findOne({
            where:{
                nombre_usuario
            }
           })

        // si no existe --------------------------------   
        if(!usuario){
              return res.status(400).json({
                msg:'usuario o password incorrecto'
              })
            }

       // verificar si está activo
       if(!usuario.getDataValue('estado')){
        return res.status(400).json({
          msg:'usuario inactivo'
        })
      }
      console.log('password:',usuario.getDataValue('password'));
       // verificar contraseña --------------------------
       const validPassword = bcryptjs.compareSync(password, usuario.getDataValue('password'));
       if (!validPassword) {
        return res.status(400).json({
            msg:'password incorrecta'
          })

       }
     /* const  datos={
        id: usuario.getDataValue('id'),
        usuario:usuario.getDataValue('nombre_usuario')
       } */
    // generar JWT
    // tengo que crear primero esa funcion en la carpeta de los helpers
     const token = await generarJwt(usuario.getDataValue('id'))


            res.json({            // aqui no le pongo return porque es el ultimo procedim que hago
                                  // solo puede ejecutar un res a la vez. Por eso aqui pongo el res solo y abajo el return (sino  de error)
                msg: 'login ok',
                usuario:usuario,
                token:token
            })
       
        
     }catch(error) {
          console.log(error);
          
          return res.status(500).json({
            msg:'hable con el adminstrador'
          });

     }
    
}

export default login;