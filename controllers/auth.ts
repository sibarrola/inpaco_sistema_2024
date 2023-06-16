import { Request ,Response } from "express";
import Usuario from '../models/usuario'
import bcryptjs from 'bcryptjs';
import {generarJwt} from '../helpers/generar-jwt';
import { googleVerify } from "../helpers/google-verify";
// LOGIN --------------------------------------
export const login = async (req:Request, res:Response)=>{
 
     const {nombre_usuario, password} =req.body;

     try {

        // verificar si existe ese usuario (que podría ser el mail, yo aca trabaje con nombre_usuario)
      //TENDRIA QUE HACERLO CON EL MAIL PARA QUE LUEGO ME COINCIDA CON GOOGLE 
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
// GOOGLE SIGN IN --------------------------------------
export  const googleSignIn = async (req:Request, res:Response)=>{
    const {id_token}= req.body;
    try {
         const googleUser = await googleVerify(id_token);
       //mejor desestructuramos:
       const {apellido,nombres,email,img} = googleUser;
       let  usuario = await Usuario.findOne({
        where:{
            email
        }
       })
       // si el usuario no existe, tengo que crearlo
        if(!usuario){
             const data ={
                apellido,
                nombres,
                nombre_usuario:13589028,
                email,
                password: ':P',//no importa lo que almacene aqui, pongo carita con lengua afuera
                rol:'administrativo',
                img,
                google:true,
                estado:1
             }
            let usuario=await Usuario.create(data);
        }
          
           if(usuario==null||usuario.getDataValue('estado')==0) {
            return res.status(401).json({
                msg:'hable con el administrador- usuario bloqueado'
            })
           }
        // generar el JWT
        const token = await generarJwt(usuario.getDataValue('id'))
        res.json({
            usuario,
            token,
             
        })
    } catch (error){
        res.status(400).json({
          ok:false,
          msg:'El token no se puedo verificar'
        })

    }
    
 }