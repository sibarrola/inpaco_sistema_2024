import { Request ,Response } from "express";
import Usuario from '../models/usuario';
import bcryptjs from 'bcryptjs';
 
// get usuarios paginado
export const getUsuarios = async (req:Request, res:Response)=>{
       
       // a esto lo saque de https://chat.openai.com/, pues en sequelize es diferente a mongo...

        const page:any = req.query.page || 1; // Página actual
        const perPage:any = req.query.limit || 3; // Cantidad de usuarios por página   
      
        try {
          const { count, rows } = await Usuario.findAndCountAll({
         where: {
                estado:1   //los que esten activos
            },
            limit: perPage,
            offset: (page - 1) * perPage,
          });
      
          res.json({
            totalPages: Math.ceil(count / perPage),
            currentPage: page,
            cant_por_pag:perPage,
            tot_usuarios:count,  //cuenta los registros
            usuarios: rows,
          });
        } catch (error) {
          console.error('Error al obtener la lista de usuarios:', error);
          res.status(500).json({ error: 'Error al obtener la lista de usuarios' });
        }
              
  
}

export const getUsuario = async (req:Request, res:Response)=>{
   
    const {id}= req.params;
    const usuario = await  Usuario.findByPk(id);

    if(usuario){
        res.json(usuario);
    }
    else
    {
        res.json({
            msg:`no existe el usuario con el id ${id}`
        })
    }
  
}

export const postUsuario = async (req:Request, res:Response)=>{
    
     // Obtener los campos del cuerpo de la solicitud
    const { apellido, nombres, email, nombre_usuario, password, rol } = req.body;
     
        try {
          // ver si existe ese nombre de usuario
       
         
          // Encriptar la contraseña
          const salt =bcryptjs.genSaltSync();
          const usuarioPassword = await bcryptjs.hash(password, salt);
      
          // Crear un nuevo usuario en la base de datos utilizando el modelo de Sequelize
          const nuevoUsuario = await Usuario.create({
            apellido,
            nombres,
            email,
            nombre_usuario,
            password: usuarioPassword,
            rol
          });
      
          // Enviar una respuesta exitosa
          res.status(200).json({ message: 'Usuario creado exitosamente', usuario: nuevoUsuario });
        } catch (error) {
          // Manejar errores
          console.error('Error al crear el usuario:', error);
          res.status(500).json({ error: 'Error al crear el usuario' });
        }
      };

 
   
 //---------------------------------PUT--------------------------
export const putUsuario = async(req:Request,res:Response)=>{
    const {password, ... resto} = req.body;
    const {id} = req.params;


    try {
        const usuario= await Usuario.findByPk(id);
       if (!usuario){
            return res.status(404).json({
                ms:'No existe ese id '+id
     
        }) 
    } 
       if(password) {
        const salt = bcryptjs.genSaltSync(); 
         //resto.setDataValue('password',bcryptjs.hashSync(password,salt));
          resto.password=bcryptjs.hashSync(password,salt)
       }
       
       /* await usuario.update({
                           apellido:resto.apellido,
                           nombres:resto.nombres,
                           email:resto.email,
                           rol: resto.rol,
                           estado:resto.estado}); */

         await usuario.update( resto);
         res.json({
         msg: `actualizado id: ${id}`,
        datos:resto
    })
                       
      
    }
     catch (error) {
        console.log(error);

       return res.status(500).json({
            msg:'no puedo actualizar, hable con el administrador',
            id: id,
            resto:resto
    
        })
    }
  
}


 //---------------------------------delete-------------------------

export const deleteUsuario = async (req:Request,res:Response)=>{
    const {body} = req;
    const {id} = req.params;  //{{url}}/api/usuarios/40    (aqui traigo el id del params, que en este caso es 40)

    try {
        const usuario1= await Usuario.findByPk(id);
        if (!usuario1){
            return res.status(404).json({
                ms:'No existe ese id '+id
            })
        
        }
     // await usuario1.destroy() //ESTA ES LA ELIMINICACION FISICA
           await usuario1.update({estado: 0});
       
      const usuariotoken= res.locals.usuario1.dataValues 
         //    console.log(usuariotoken)
        res.json({"usuario_borrado":usuario1,"usuariotoken":usuariotoken} );  // envio el usario ya actualziado
    }
    catch (error) {
        console.log(console.error);

        res.status(500).json({
            msg:'no puedo grabar, hable con el administrador',
            body
    
        })
    }
  
}