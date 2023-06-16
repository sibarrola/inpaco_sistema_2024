import {OAuth2Client} from 'google-auth-library'
import  { GOOGLE_CLIENT_ID}  from '../config';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

 export async function googleVerify(token='') {    
    
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
          // Or, if multiple clients access the backend:
          //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload:any = ticket.getPayload();
       console.log("payload",payload)
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
      
      const {given_name,family_name,picture,email}= payload;
      return {
        nombres:family_name,
        apellido:given_name,
        img:picture,
        email:email
      }

   //

}


 

