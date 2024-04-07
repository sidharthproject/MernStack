import mongoose from "mongoose";



export const dbConnection = async ()=>{
   try{ 
     await mongoose.connect(process.env.MONGO_URI,{dbName:"MERN_STACK_JOB_SEEKING",})
      console.log("MongoDb connected")
   }
catch(err){
    console.log(`Something error occoured while connecting to database: ${err}`);
}
}
