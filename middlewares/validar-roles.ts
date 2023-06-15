import { Request,Response,NextFunction } from 'express';
   

export const esAdminRole = (req:Request,res:Response,next:NextFunction)=>{
  if(!res.locals.usuario1) {
      return res.status(500).json({
        msg:"se quiere verificar rol sin validad el token primero"
      });
  }
    const usuario =res.locals.usuario1.dataValues;
    if(usuario.Rol != "administrativo" && usuario.rol!='administrador') {
        res.status(401).json({
            msg:`este usuario ${usuario.apellido} no puede hacer esta operación/no es administrativo ni administrador`
        })
    }
    next()
}

export const esRolRequerido= (...roles:any) =>{           //lo que la persona manda, queda almacenado en roles
     return (req:Request,res:Response,next:NextFunction)=>{   // pero tengo que retornan una función , que se va a ejecutar con los argum rep, res
        if(!res.locals.usuario1) {
            return res.status(500).json({
              msg:"se quiere verificar rol sin validad el token primero"
            });
        }
          const usuario =res.locals.usuario1.dataValues;
          const rolu=res.locals.usuario1.dataValues['rol'];
          if(roles.includes(rolu)) {
              res.status(401).json({
                  msg:`este usuario ${usuario.apellido} no tiene un rol habilitado: (${roles} )`
              })
          }
          next()
      }
     


}


 