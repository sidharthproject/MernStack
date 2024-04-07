import ErrorHandler,{errorMiddleware} from "../middlewares/Error.js";
import { asyncHndler } from "../middlewares/asyncHandler.js";
import { User } from "../models/user.model.js";
import { sendToken } from "../utils/jwtTokens.js";



export const register = asyncHndler(async(req,res)=>{

    const {name,email,phone,role,password} = req.body;
    if(!name||!email||!phone||!role||!password) 
    // [name,email,phone,role,password].some((field) => field.trim() === " ")
 {
     throw new ErrorHandler("All fields are required",400)
 }
const isEmail = await User.findOne({email})
if(isEmail){
    throw new ErrorHandler("Email already exist",400)
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

export const login = asyncHndler(async(req,res)=>{

    const {email,password,role} = req.body;
    if(!email || !password|| !role){
        throw new ErrorHandler("All fields are required for login",400)
    }
    const user = await User.findOne({
        $or: [{password}, {email}]
    })
    if(!user){
        throw new ErrorHandler( "User with this Email does not exist",400)
    }

    const isPasswordValid = await user.ispasswordCorrect(password)
    if(!isPasswordValid){
        throw new ErrorHandler("Invalid Email or Password",400)
    }
    if(user.role !== role){
        throw new ErrorHandler("User with this role doesn't exist")
    }
    sendToken(user,201,res,"User logged In Successfully")
})


export const logout =asyncHndler(async(req,res)=>{
   res
   .status(201)
   .cookie("token"," ",{
    httpOnly:true,
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