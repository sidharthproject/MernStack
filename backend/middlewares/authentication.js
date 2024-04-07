import { asyncHndler } from "./asyncHandler.js";
import ErrorHandler from "./Error.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const isAuthorized = asyncHndler(async(req,res,next)=>{

    const token = req.cookies.token;
   // console.log(token);     
   

    if(!token){
        throw  new ErrorHandler("Unauthorized request",400)
    }

    const decodeToken =jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)

    req.user = await User.findById((decodeToken._id))
    next()
})