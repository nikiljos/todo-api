const express=require('express');
const app=express()

const dotenv = require("dotenv");
dotenv.config();

const router=require('./routes.js')

app.use(express.json())
app.use(router)

const port = process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`Server running on Port ${port}`);
})