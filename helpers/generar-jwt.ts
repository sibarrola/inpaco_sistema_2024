import jwt from 'jsonwebtoken';
 
 
import   SECRET_KEY  from '../config';
 
/* 
export function generarJwt(payload: any): string {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
  return token;
} */

export function generarJwt(id=''):any {
// la convierto en una promesa-----------------------------------------------
    return new Promise((resolve,reject)=>{
         const payload= {id}
         const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' }, (err:any,token)=>{
              if(err) {
                  console.log(err);
                  reject('no se pudo generar el token');
              } else {
            resolve(token)
              }
         });
    })
}
     
 



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
 

 