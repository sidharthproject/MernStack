import ErrorHandler from "../middlewares/Error.js";
import { asyncHndler } from "../middlewares/asyncHandler.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/jwtTokens.js";



export const register = asyncHndler(async(req,res,next)=>{

    const {name,email,phone,role,password} = req.body;
    if(!name||!email||!phone||!role||!password) 
    // [name,email,phone,role,password].some((field) => field.trim() === " ")
 {
      return next(
      new ErrorHandler("All fields are required ", 400)
    );
 }
const isEmail = await User.findOne({email})
if(isEmail){
    return next(
        new ErrorHandler("Email already exist", 400)
      );
}
const user = await User.create({
    name,
    email,
    phone,
    role,
    password
});

   sendToken(user,200,res,"User Registered Successfully")
});

export const login = asyncHndler(async(req,res,next)=>{

    const {email,password,role} = req.body;
    if(!email || !password|| !role){
        return next(
            new ErrorHandler("All fields are required ", 400)
          );
    }
    const user = await User.findOne({
        $or: [{password}, {email}]
    })
    if(!user){
        return next(
            new ErrorHandler("User with this doesn't email exist", 400)
          );
    }

    const isPasswordValid = await user.ispasswordCorrect(password)
    if(!isPasswordValid){
        return next(
            new ErrorHandler("Invalid email or password", 400)
          );
    }
    if(user.role !== role){
        return next(
            new ErrorHandler("user with this role does not exist", 400)
          );
    }
    sendToken(user,201,res,"User logged In Successfully")
})


export const logout =asyncHndler(async(req,res,next)=>{
   res
   .status(201)
   .cookie("token"," ",{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    expires:new Date(Date.now())
   })
   .json({
    success:true,
    message:"User is loggedOut successfully"
   }
    )
})


export const getCurrentUser = asyncHndler(async(req,res)=>{
    const user = await req.user;
    res.status(200)
    .json(
        {
            success:true,
            user
        }
    )
    
    }
    )