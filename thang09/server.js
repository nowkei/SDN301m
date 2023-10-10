import express from "express";
import * as dotenv from 'dotenv'
import { userRouter, productRouter, studentRouter } from "./routes/index.js";
import connectDB from "./database/database.js";
//khai bao 1 middleware
import checkToken from "./auth/authentication.js";
import cookieParser from "cookie-parser";
dotenv.config()
const app = express();
app.use(express.json()) // Config cho express server lam viec voi du lieu theo dinh dang json

// Thiet lap 1 middleware de kiem soat moi request di den express server
app.use(checkToken)
app.use(cookieParser())

//Routes: Root Router
app.get('/', (req, res)=>{
    res.send("Welcome to Homepage RESTful API")
})

//Routers:
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/students', studentRouter)

const port = process.env.PORT || 8080
app.listen(port, ()=>{
    
    connectDB()
    console.log(`Server is running on port ${port}`);
})
