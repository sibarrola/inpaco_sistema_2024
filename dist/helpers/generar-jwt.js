"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
/*
export function generarJwt(payload: any): string {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
  return token;
} */
function generarJwt(id = '') {
    // la convierto en una promesa-----------------------------------------------
    return new Promise((resolve, reject) => {
        const payload = { id };
        const token = jsonwebtoken_1.default.sign(payload, config_1.default, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
}
exports.generarJwt = generarJwt;
/* export function verifyToken(token: string): any {

  //la convierto en una promesa-----------------------------------------------
    return new Promise((resolve,reject)=>{
        const decoded = jwt.verify(token, SECRET_KEY,(err:any, decoded:any)=>{
            if(err) {
                console.log(err);
                reject('token invalido');
            } else {
              resolve(decoded)
            }
       });

        });
          
    }
   */
//# sourceMappingURL=generar-jwt.js.map