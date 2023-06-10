"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Rol = connection_1.default.define('Rol', {
    rol: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
});
exports.default = Rol;
// si quisiera  crear desde aqui,  tendria que correr solo este programa  
// ir a la carpeta dist/models
// y hacer nodemon rol.js
/*  db.sync().then(() => {
     console.log('table created successfully!');
  }).catch((error) => {
     console.error('Unable to create table : ', error);
  });
   */ 
//# sourceMappingURL=rol.js.map