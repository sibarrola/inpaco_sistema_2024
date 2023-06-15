import express , {Application} from 'express';
import login from '../routes/auth';
import userRoutes from '../routes/usuario';

import cors from 'cors';
import db from '../db/connection';
 
class Server {
    //Aqui en typescript hay que definir las propiedades antes de usarla 
  private app: Application;  //defino app del tipo Application que lo traigo de express
  private port:string //
  private apiPaths = {
         auth:'/api/auth',
         usuarios:'/api/usuarios',
         roles:'/api/roles'
         
  }
  constructor() {
       this.app =express();
       this.port= process.env.PORT || '8000' ;
       //métodos iniciales
       this.dbConnection();
       this.middlewares();  // a esta la tuve que llamar antes de routes(), porque sino no me traia el body
       this.routes(); //llamo al método en el constructor
      
  }

// conectar base de datos
 async dbConnection(){
    try {
             

         await db.authenticate();
         console.log('database on line');
         db.sync().then(() => {
            console.log('table created successfully!');
         }).catch((error) => {
            console.error('Unable to create table : ', error);
         });


    } catch(error:any) {
        throw new Error(error )

    }
 }
  //---------------metodos----------------------------------------
  // middlewares son funciones que se ejecutan antes de las rutas o de otros procedimientos
  middlewares(){
     //CORS   
     // el cors es una funcion
      this.app.use(cors());
     // LECTURA DEL BODY
     // para poder parsear el body
     this.app.use(express.json());
     // CARPETA PUBLICA

     this.app.use(express.static('public'));
  }
  routes(){
    this.app.use(this.apiPaths.usuarios,userRoutes);
    this.app.use(this.apiPaths.auth,login);
} 
  
  listen() {
      this.app.listen(this.port, ()=> {
          console.log('Servidor corriendo en puerto '+ this.port);
      })
  }
}

export default Server; 
// tuviera otras clases  podria poner el export antes de cada clase, como tengo una sola exporto por defecto