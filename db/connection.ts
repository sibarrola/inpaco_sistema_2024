import {Sequelize} from 'sequelize';
const db=new Sequelize('expedienteshcm','root','gitano',{
    host:'localhost',
    dialect:'mysql',
   // dialect:'mysql'
    //logging:false
});



 export default db;