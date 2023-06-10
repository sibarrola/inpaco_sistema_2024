import {Sequelize} from 'sequelize';
const db=new Sequelize('expedienteshcm','root','gitano',{
    host:'localhost',
    dialect:'mariadb',
   // dialect:'mysql'
    //logging:false
});



 export default db;