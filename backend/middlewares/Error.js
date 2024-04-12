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
    if (err.code === 'ERR_NETWORK') {
        // Handle network error
        res.status(500).json({
            success: false,
            error: 'Network Error: Unable to connect to the server. Please try again later.'
        });
    } else if (err.response && err.response.data && err.response.data.message) {
        // If the error has a response and the response has a message, send that message
        res.status(err.status || 500).json({
            success: false,
            error: err.response.data.message
        });
    } else {
        // Otherwise, send a generic error message
        res.status(err.status || 500).json({
            success: false,
            error: err.message || "Internal Server Error"
        });
    }
};


  export default ErrorHandler