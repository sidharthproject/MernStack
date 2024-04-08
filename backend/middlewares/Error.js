class ErrorHandler extends Error{
    constructor(message,statuscode=500){
        super(message)
        this.statuscode = statuscode
        
    }
}
   export const Error = (err, req, res, next) => {
        let statusCode = err.statusCode || 500;
        let message = err.message || "Internal Server Error";
        if (process.env.NODE_ENV === "development") {
            // In development environment, send stack trace along with error message
            message = err.message;
        }
        res.status(statusCode).json({ success: false, error: message });
    };
    
   


  export default ErrorHandler