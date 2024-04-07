export const sendToken =(user,statuscode,res,message) =>{
    const token = user.generateRefreshToken();
    console.log(token);
    const options ={
        expires:new Date(
           Date.now()+ process.env.COOKIE_EXPIRY *24*60*60*1000
        ), 
        httpOnly:true,
        secure:true,
        sameSite:"none"
        // secure:true  Only for https request not in http
    }
   

    res.status(statuscode)
       .cookie("token",token,options)
       .json({
        sucess:true,
        user,
        message,
        token
       })
    
}