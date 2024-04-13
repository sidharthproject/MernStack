import mongoose, { Schema } from "mongoose";
import  jwt  from "jsonwebtoken";
import bcrypt, {compare } from "bcrypt"
import validator from "validator";

 const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        minLength:[3,"Name must contain at least 3 charecter !"],
        maxlength:[30,"Name must contain at least 3 charexter !"],       
        lowercase: true,
        trim: true, 
     
    },
    email:{
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    phone:{
        type:Number,
        required:[true,"Please Provide your phone number"]
    },
    password:{
        type:String,
        required:[true,"Please Provide a Valid Password"],
        minLength:[8,"Password must contain at least 3 charecter !"],
        maxlength:[12,"Password must contain at least 3 charexter !"],        
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["JobSeeker","Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
 })

 //Hasing the password
 userSchema.index({ name: 1, email: 1 }, { unique: true });

 userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return  next()
    }
        this.password = await bcrypt.hash(this.password,10)
      next()
    
 });

 //Cmparing password
  userSchema.methods.ispasswordCorrect = async function(password){
 return await bcrypt.compare(password,this.password)
    
  }
  //generating a JWT Token

  userSchema.methods.generateRefreshToken =  function(){
    try {
        const token = jwt.sign(
            { _id: this._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
        console.log("Generated Token:", token);
        return token;
    } catch (error) {
        console.error("Error generating refresh token:", error);
        throw error;
    }

  }


 export const User = mongoose.model("User", userSchema)