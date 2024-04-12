class ErrorHandler extends Error{
    constructor(message,statuscode ,errors =[],
        stack =""){
        super(message)
        this.statuscode = statuscode

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
// export const Handler = (err, req, res, next) => {
//     console.error(err.stack); // Log the error stack trace
    
//     let statusCode = err.status || 500;
//     let errorMessage = err.message || "Internal Server Error";
    
//     if (err.code === 'ERR_NETWORK') {
//         // Handle network error
//         statusCode = 500;
//         errorMessage = "Network Error: Unable to connect to the server. Please try again later.";
//     } else if (err.response && err.response.data && err.response.data.message) {
//         // If the error has a response and the response has a message, send that message
//         errorMessage = err.response.data.message;
//     }
    
//     res.status(statusCode).json({
//         success: false,
//         error: errorMessage
//     });
// }; 
export default ErrorHandler;