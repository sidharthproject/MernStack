import mongoose, { Schema } from "mongoose";
import validator from "validator";

export const applicationSchema = new Schema({
      name:{
        type:String,
        required:[true,"Please provide your name"],
        minLength:[3,"Name must contain at least 3 charecter !"],
        maxlength:[30,"Name must contain at least 3 charexter !"],
       
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    coverLetter:{
        type:String,
        required:[true,"Please provide your CV"],

    },
    phone:{
        type:Number,
        required:[true,"Please Enter Your Phone number"]
    },
    address:{
        type:String,

    },
    resume:{
       public_id:{
        type:String,
        required:true
       },
       url:{
        type:String,
        required:true
       }
    },
    applicantId:{
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["JobSeeker"]
        }
    },
    employerId:{
        user:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["Employer"]
        }
    }

}) 

export const Application = mongoose.model("Application",applicationSchema)