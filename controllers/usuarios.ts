 import { Request,Response} from "express";
//import  getConnection   from '../db/conection';
 // listar usuarios---------------------------
 
 
  const getUsuarios = async (req: Request, res: Response) => {
   // let conn;
    console.log("llegue al principio");
    res.json({
        msg:`get usuarios`
    });
}

// buscar un usuario por id---------------------
 const getUsuario =(req:Request,res:Response)=>{
    console.log(req);
    const {id}=req.params;
    res.json({
        msg:`getUsuario ${id} `
    })
 }
// crear usuario ----------------------------------
 const postUsuario =(req:Request,res:Response)=>{
    const {body}=req;
    const {id}=req.params;
    res.json({
        msg:`postUsuario ${id} `,
        body
    })
 }

 // actualizar usuario-------------------------
 const putUsuario =(req:Request,res:Response)=>{
    const {body}=req;
    res.json({
        msg:`posttUsuario`,
        body
    })
 }

 //eliminar usuario--------------------------------
 const deleteUsuario =(req:Request,res:Response)=>{
    const {id}=req.params;
    res.json({
        msg:`deleteUsuario ${id} `
    })
 }

 export {
    getUsuario,
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario
 }