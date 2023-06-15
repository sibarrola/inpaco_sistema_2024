import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';
import   SECRET_KEY  from '../config';
import Usuario from '../models/usuario';
  
const validarJWT = async (req:Request, res:Response, next:NextFunction)=>{
// tengo que ser capaz de obtener el token de cualquier lugar
// esto se pone en el header de la peticion  delete
  const token = req.header('x-token');
 if(!token){
    return res.status(401).json({
        msg:'no hay token en la peticion'
    })
   }
   try {
    // const payload = jwt.verify(token,SECRET_KEY);
    const decodedToken =  jwt.verify(token, SECRET_KEY) as { [key: string]: any };
  // Aquí se decodifica el token y se asume que el payload contiene pares clave-valor

     //const payload = decodedToken.payload; // Suponiendo que el payload está en la propiedad "payload" del token decodificado
    const{id} = decodedToken; 
    console.log('decodedTocken:', decodedToken);  // asi muestra en consola decodedTocken: { id: 12, iat: 1686750181, exp: 1686757381 }
     // busco el usuario de este id
     const usuario1 =await  Usuario.findByPk(id)
      if (!usuario1){
        return  res.status(401).json({
            msg:"el usuario no es valido"
        })
      } 
     // esta forma de guardar en res.locals lo saqué de otro lado, porque me daba error trabajar con el req.
       res.locals.usuario1=usuario1
       //  const datos=res.locals.usuario1.dataValues;  // acá me guarda en datos como un objeto que traigo del res
      // console.log("datos",datos)
     next();
   } catch(error) {
        console.log(error);
       return  res.status(401).json({
            msg:"token no válido"
        })
   }
  
}

export default validarJWT;