class ErrorHandler extends Error{
    constructor(message,statuscode ,errors =[],
        stack =""){
        super(message)
        this.statuscode = statuscode
        this.data = null,
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}  
export const Handler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(err.status || 500).json({
        success: false,
        error: err.message || "Internal Server Error"
    });
};

    
   


  export default ErrorHandler