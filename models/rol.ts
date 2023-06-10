import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Rol =db.define('Rol', {

    rol: {
        type:DataTypes.STRING,
        allowNull: false     },
     
    })



    export default Rol;

// si quisiera  crear desde aqui,  tendria que correr solo este programa  
// ir a la carpeta dist/models
// y hacer nodemon rol.js

   /*  db.sync().then(() => {
        console.log('table created successfully!');
     }).catch((error) => {
        console.error('Unable to create table : ', error);
     });
      */