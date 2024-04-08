import express from "express";
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from"./routes/userRouter.js"
import applicationRouter from"./routes/applicationRouter.js"
import jobRouter from"./routes/jobRouter.js"
import { dbConnection } from "./database/dbConnection.js";


const app = express()
dotenv.config({path: "./config/.env"})

app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:['GET','POST','DELETE','PUT'],
    credentials:true
}))
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/temp/'
    }))
app.use(express.json());
app.use(express.urlencoded(
    {
        extended:true,
        limit:"16kb"}))
app.use('/api/v1/user',userRouter)
app.use('/api/v1/application',applicationRouter)
app.use('/api/v1/job',jobRouter)
dbConnection()
.then(
    ()=>{
        app.listen(process.env.PORT || 8000,()=>{
            console.log('Server is running at port :',process.env.PORT);
        })
    }
)
.catch((error)=>{
    console.log("mongodb connection error", error);
}) 




export default app;