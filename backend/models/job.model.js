import mongoose, { Schema } from "mongoose";
const jobSchema = new Schema({
    title:{
        type:String,
        required:[true,"Please Provide Job title"],
        minLength:[3,"Job title must contain at least 3 characters!"],
        maxLength:[50,"job titel cannot exceed %0 chareacter!"]
    },
    description:{
        type:String,
        required:[true,"Please Provide Job Description"],
        minLength:[50,"Job Description must contain at least 50 words!"],
        maxLength:[500,"job Description cannot exceed 500 words!"]
    },
    category:{
        type:String,
        required:[true,"Job category is required"]
    },
    country:{
        type:String,
        required:[true,"Job Country is required"]
    },
    city:{
        type:String,
        required:[true,"Job City is Required"]
    },
    location:{
        type:String,
        required:[true,"Job Location is required"],
        minLength:[4,"job location must contain at least 5 chareacter!"]
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Fixed salary must contain at least 4 digits !"],
        maxLength:[9,"Fixed Salary cannot exceed 9 digits"]
    },
     salaryFrom:{
        type:Number,
        minLength:[4,"Fixed salary must contain at least 4 digits !"],
        maxLength:[9,"Fixed Salary cannot exceed 9 digits"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Fixed salary must contain at least 4 digits !"],
        maxLength:[9,"Fixed Salary cannot exceed 9 digits"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})

export const Job =  mongoose.model("Job",jobSchema)