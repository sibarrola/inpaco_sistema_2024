import dotenv from 'dotenv';
 
dotenv.config();

const SECRET_KEY:string|any = process.env.SECRET_KEY;
export default SECRET_KEY;
