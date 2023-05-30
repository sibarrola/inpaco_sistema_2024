require('dotenv').config();
const express = require('express');

const app=express();
const port =process.env.PORT;

console.log(port);
app.get("/", (req,res)=>{
   /*  res.send(`el puerto es ${port}`) */
   res.sendFile(__dirname +'/public/index.html')
})
app.get("*", (req,res)=>{
    res.sendFile(__dirname +'/public/404.html')
})

app.listen(port);
