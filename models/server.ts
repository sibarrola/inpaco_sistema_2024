import express ,{Application} from 'express';
import userRoutes from '../routes/usuarios'; // defino el alias de una vez: userRoutes en lugar de poner import * as userRoutes
import cors from 'cors' ; // el cors es una funcion
//import createPool  from '../db/conection';

class Server {
   private app:Application;
   private port:string;
   private apiPaths ={
       usuarios:'api/usuarios'
   }

  constructor(){
     this.app=express();
     this.port=process.env.PORT || '8000';
    // this.initDB(),
     this.middlewares();
     this.routes();
     

  }

 

// conectar base de datos
/* async initDB() {
    try {
        const pool = createPool(); // Crear y verificar el pool
        console.log('Pool de conexiones a la base de datos establecido');
    } catch (error) {
        console.error('Error al establecer el pool de conexiones:', error);
    }
}
 */
  
  middlewares(){  //funciones que se ejecutan antes de la ruta
       //cors
      this.app.use(cors());
       // lectura del body
      this.app.use(express.json());
     

       // carpeta pública
       this.app.use(express.static('public'));
  }
  routes(){
    this.app.use(this.apiPaths.usuarios,userRoutes)
  }
  listen(){
      this.app.listen(this.port,()=>{
          console.log('Servidor corriendo en puerto!!',this.port);
      })
  }

}

export default Server;
