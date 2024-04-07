class ErrorHandler extends Error{
    constructor(message,statuscode,stack=""){
        super(message)
        this.statuscode = statuscode
        //Unused the code
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
        //
    }
}


export const errorMiddleware = (err,res) => {
    err.message = err.message || "Internal Server Error";
    err.statuscode = err.statuscode || 500;
    
    let errorMessage = err.message;
    if (err.name === "CaseError") {
        errorMessage = `Duplicate ${Object.keys(err.keyValue)}`;
    } else if (err.code === 11000) {
        errorMessage = `Resource not Found.Invalid ${err.path}`;
    } else if (err.name === "JsonWebToken") {
        errorMessage = `Json web token is invalid, Try Again`;
    } else if (err.name === "TokenExpiredError") {
        errorMessage = `Json web token is expired, Try Again`;
    }

    res.status(err.statuscode).json({
        success: false,
        message: errorMessage
    });
};

  export default ErrorHandler